"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// TypeScript Interfaces
interface DropdownOption {
  id: string;
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  dropdown?: DropdownOption[];
}

const Navbar: React.FC = () => {
  // State for navbar visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [isScrolledToSection, setIsScrolledToSection] = useState(false);

  // Use Next.js hooks to get current path and search params
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Safe navigation function
  const goToHash = (hash: string) => {
    if (pathname === '/') {
      // If we're already on home page, scroll to section
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      router.push(`/#${hash}`);
    }
  };

  // Navigation Data
  const navData: NavItem[] = [
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'Services', href: '#services' },
    { id: '3', label: 'About', href: '#about' },
    {
      id: '4',
      label: 'Facilities',
      href: '/facilities',
      dropdown: [
        { id: '4-1', label: 'Kids Activity Zone', href: '/facilities/kids-activity-zone' },
        { id: '4-2', label: 'Conference Halls', href: '/facilities/conference-halls' },
        { id: '4-3', label: 'Swimming Pool', href: '/facilities/swimming-pool' },
        { id: '4-4', label: 'Special Events', href: '/facilities/special-events' },
        { id: '4-5', label: 'Health Clubs', href: '/facilities/health-clubs' },
        { id: '4-6', label: 'Indoor Activities', href: '/facilities/indoor-activities' },
        { id: '4-7', label: 'Outdoor Activities', href: '/facilities/outdoor-activities' },
        { id: '4-8', label: 'WildLife', href: '/facilities/wildlife-exploration' },
      ],
    },
    { id: '5', label: 'Contact', href: '/contact' },
  ];

  // Scroll detection for active hash
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return; // Only handle scroll on home page

      const sections = ['services', 'about'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setIsScrolledToSection(scrollPosition > windowHeight * 0.2);

      let activeSection = '';
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          const viewportCenter = scrollPosition + (windowHeight / 2);
          const distanceToTop = Math.abs(viewportCenter - elementTop);
          const distanceToBottom = Math.abs(viewportCenter - elementBottom);
          const distance = Math.min(distanceToTop, distanceToBottom);

          const isInViewport = rect.top <= 100 && rect.bottom >= 100;

          if (isInViewport) {
            activeSection = section;
            break;
          } else if (distance < minDistance) {
            minDistance = distance;
            activeSection = section;
          }
        }
      }

      if (activeSection && minDistance < windowHeight * 2) {
        setCurrentHash(`#${activeSection}`);
      } else if (scrollPosition < 100) {
        setCurrentHash('');
      }
    };

    // Only add scroll listener if we're on home page
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  // Update hash from URL
  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      if (hash) setIsScrolledToSection(true);
    };

    updateHash();

    window.addEventListener('hashchange', updateHash);
    window.addEventListener('popstate', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
      window.removeEventListener('popstate', updateHash);
    };
  }, []);

  // Scroll hide/show navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) setIsVisible(true);
    else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Hover handlers
  const handleNavLinkHover = (id: string) => setActiveDropdown(id);
  const handleNavLinkLeave = () => !isHoveringDropdown && setActiveDropdown(null);
  const handleDropdownHover = () => setIsHoveringDropdown(true);
  const handleDropdownLeave = () => {
    setIsHoveringDropdown(false);
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Active checker - IMPROVED LOGIC
  const isActive = (href: string) => {
    const hasHash = href.includes('#');
    
    if (!hasHash) {
      return pathname === href;
    }

    // For hash links, only active on home page
    if (pathname !== '/') return false;
    
    const targetHash = href.startsWith('#') ? href : `#${href.split('#')[1]}`;
    
    // If we have a current hash and it matches the target
    if (currentHash === targetHash) return true;

    // Home link is active when no hash is present and we're at the top
    if (href === '/' && !currentHash && typeof window !== 'undefined' && window.scrollY < 100) return true;

    return false;
  };

  // RENDER DESKTOP LINK
  const renderNavLink = (item: NavItem) => {
    const isItemActive = isActive(item.href);
    const isHashLink = item.href.startsWith('#');

    return (
      <div
        key={item.id}
        className="relative group"
        onMouseEnter={() => handleNavLinkHover(item.id)}
        onMouseLeave={handleNavLinkLeave}
      >
        {/* If it's a hash link → use our custom routing */}
        {isHashLink ? (
          <a
            onClick={() => {
              goToHash(item.href);
              closeMobileMenu();
            }}
            className={`relative px-4 py-2 cursor-pointer transition-colors duration-200 font-medium flex items-center gap-2 ${
              isItemActive ? 'text-green-400' : 'text-white hover:text-green-300'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                isItemActive
                  ? 'bg-green-400 opacity-100 scale-150 shadow-[0_0_12px_rgba(74,222,128,0.8)]'
                  : 'bg-green-400 opacity-0 group-hover:opacity-100 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(74,222,128,0.8)]'
              }`}
            />
            {item.label}
          </a>
        ) : (
          <Link
            href={item.href}
            className={`relative px-4 py-2 transition-colors duration-200 font-medium flex items-center gap-2 ${
              isItemActive ? 'text-green-400' : 'text-white hover:text-green-300'
            }`}
            onClick={closeMobileMenu}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                isItemActive
                  ? 'bg-green-400 opacity-100 scale-150 shadow-[0_0_12px_rgba(74,222,128,0.8)]'
                  : 'bg-green-400 opacity-0 group-hover:opacity-100 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(74,222,128,0.8)]'
              }`}
            />
            {item.label}
          </Link>
        )}

        {/* DROPDOWN */}
        {item.dropdown && (
          <div
            className={`absolute left-0 top-full mt-1 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-xl z-50 border border-white/20 overflow-hidden transition-all duration-300 transform ${
              activeDropdown === item.id
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
            onMouseEnter={handleDropdownHover}
            onMouseLeave={handleDropdownLeave}
          >
            <ul className="py-2 group">
              {item.dropdown.map((dropdownItem, index) =>
                renderDropdownItem(dropdownItem, index)
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // RENDER MOBILE LINK
  const renderMobileNavLink = (item: NavItem) => {
    const isItemActive = isActive(item.href);
    const isHashLink = item.href.startsWith('#');

    return (
      <div key={item.id} className="relative">
        {isHashLink ? (
          <a
            onClick={() => {
              goToHash(item.href);
              closeMobileMenu();
            }}
            className={`px-4 py-3 cursor-pointer transition-colors duration-200 font-medium border-b border-white/10 flex items-center gap-2 ${
              isItemActive ? 'text-green-400' : 'text-white hover:text-green-300'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isItemActive ? 'bg-green-400' : 'bg-green-400 opacity-50'
              }`}
            />
            {item.label}
          </a>
        ) : (
          <Link
            href={item.href}
            className={`px-4 py-3 transition-colors duration-200 font-medium border-b border-white/10 flex items-center gap-2 ${
              isItemActive ? 'text-green-400' : 'text-white hover:text-green-300'
            }`}
            onClick={closeMobileMenu}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isItemActive ? 'bg-green-400' : 'bg-green-400 opacity-50'
              }`}
            />
            {item.label}
          </Link>
        )}

        {/* MOBILE DROPDOWN */}
        {item.dropdown && (
          <div className="bg-white/10 ml-4 mt-1 rounded-lg">
            {item.dropdown.map((dropdownItem) => {
              const isDropdownItemActive = isActive(dropdownItem.href);

              return (
                <Link
                  key={dropdownItem.id}
                  href={dropdownItem.href}
                  className={`px-4 py-2 transition-colors duration-200 text-sm border-b border-white/5 flex items-center gap-2 ${
                    isDropdownItemActive
                      ? 'text-green-400'
                      : 'text-white/80 hover:text-green-300'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      isDropdownItemActive
                        ? 'bg-green-400'
                        : 'bg-green-400 opacity-30'
                    }`}
                  />
                  {dropdownItem.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Dropdown item
  const renderDropdownItem = (item: DropdownOption, index: number) => {
    const isItemActive = isActive(item.href);

    return (
      <li
        key={item.id}
        style={{ transitionDelay: `${index * 50}ms` }}
        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 group/dropdown-item"
      >
        <Link
          href={item.href}
          className={`relative block px-4 py-3 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200 overflow-hidden ${
            isItemActive ? 'text-green-600' : ''
          }`}
          onClick={closeMobileMenu}
        >
          {item.label}
          <div className="absolute bottom-0 left-0 w-0 h-px bg-green-600 transition-all duration-300 ease-out group-hover/dropdown-item:w-full" />
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md border-b border-white/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* LOGO */}
            <div className="shrink-0 z-10 pr-18">
              <Link href="/" className="flex items-center">
                <h1 className="font-semibold text-green-400 text-4xl logo">Lavita</h1>
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4 xl:space-x-8">
                {navData.map(renderNavLink)}
              </div>
            </div>

            {/* DESKTOP BUTTONS */}
            <div className="hidden lg:flex items-center space-x-2 shrink-0 pl-18">
              <Link href="/memberships" className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium text-sm whitespace-nowrap">
                Become a Member
              </Link>
              <Link href="/member-portal" className="px-4 py-2 border border-green-600 text-green-600 bg-white rounded-full hover:bg-green-50 transition-colors duration-200 font-medium text-sm whitespace-nowrap">
                Member Portal
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="lg:hidden flex items-center z-50">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:text-green-300 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                      }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`
        lg:hidden fixed inset-0 z-50 transition-all duration-300
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />

        {/* MOBILE PANEL */}
        <div
          className={`
          absolute top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-white/20 transform transition-transform duration-300 ease-out overflow-y-auto
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        >
          <div className="p-6 min-h-full">
            {/* Close button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:text-green-300 transition-colors duration-200"
                aria-label="Close menu"
              >
                <div className="w-6 h-6">
                  <span className="w-full h-0.5 bg-white rotate-45 translate-y-0.5 block" />
                  <span className="w-full h-0.5 bg-white -rotate-45 -translate-y-0.5 block" />
                </div>
              </button>
            </div>

            {/* MOBILE LINKS */}
            <div className="space-y-2">
              {navData.map(renderMobileNavLink)}
            </div>

            {/* MOBILE BUTTONS */}
            <div className="mt-8 space-y-4 pb-8">
              <Link
                href="/memberships"
                className="block w-full px-4 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Become a Member
              </Link>
              <Link
                href="/member-portal"
                className="block w-full px-4 py-3 border border-green-600 text-green-600 bg-white rounded-full hover:bg-green-50 transition-colors duration-200 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Member Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;