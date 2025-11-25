"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// TypeScript Interfaces
interface FooterLink {
  id: string;
  label: string;
  href: string;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Footer data
  const footerData: FooterSection[] = [
    {
      id: '1',
      title: 'Explore',
      links: [
        { id: '1-1', label: 'Home', href: '/' },
        { id: '1-2', label: 'About Us', href: '/#about' },
        { id: '1-3', label: 'Services', href: '/#services' },
        { id: '1-4', label: 'Facilities', href: '/facilities' },
        { id: '1-5', label: 'Contact', href: '/contact' },
      ],
    },
{
  id: '3',
  title: 'Facilities',
  links: [
    { id: '3-1', label: 'Kids Activity Zone', href: '/facilities/kids-activity-zone' },
    { id: '3-2', label: 'Conference Halls', href: '/facilities/conference-halls' },
    { id: '3-3', label: 'Swimming Pool', href: '/facilities/swimming-pool' },
    { id: '3-4', label: 'Special Events', href: '/facilities/special-events' },
    { id: '3-5', label: 'Health Clubs', href: '/facilities/health-clubs' },
    { id: '3-6', label: 'Indoor Activities', href: '/facilities/indoor-activities' },
    { id: '3-7', label: 'Outdoor Activities', href: '/facilities/outdoor-activities' },
    { id: '3-8', label: 'WildLife', href: '/facilities/wildlife-exploration' },
  ],
},
    {
      id: '4',
      title: 'Support',
      links: [
        { id: '4-1', label: 'Contact Us', href: '/contact' },
        { id: '4-2', label: 'FAQ', href: '/faq' },
        { id: '4-3', label: 'Privacy Policy', href: '/privacy' },
        { id: '4-4', label: 'Terms of Service', href: '/terms' },
        { id: '4-5', label: 'Careers', href: '/careers' },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      id: 'twitter',
      label: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297zm8.062-5.598c0 .683-.554 1.237-1.237 1.237s-1.237-.554-1.237-1.237c0-.683.554-1.237 1.237-1.237s1.237.554 1.237 1.237zm2.323-4.553c0 .683-.554 1.237-1.237 1.237s-1.237-.554-1.237-1.237c0-.683.554-1.237 1.237-1.237s1.237.554 1.237 1.237z"/>
        </svg>
      ),
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  // Contact information
  const contactInfo = [
    {
      id: 'address',
      label: 'Address',
      value: 'Malam Jabba Road, Swat Valley, Khyber Pakhtunkhwa, Pakistan',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+92 123 456 7890',
      href: 'tel:+921234567890',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      value: 'info@lavitamalamjabba.com',
      href: 'mailto:info@lavitamalamjabba.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Check if a link is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t-2 border-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-400/3 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-green-300/3 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <h1 className="font-semibold text-green-400 text-4xl logo">Lavita</h1>
              </Link>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Experience unparalleled luxury in the heart of Swat Valley. Lavita Malam Jabba offers 
                premium accommodations, world-class amenities, and unforgettable mountain adventures.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-green-400 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-green-400/50"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              {/* <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Stay Updated
                </h4>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-400 transition-colors duration-200 flex-1 min-w-0"
                  />
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div> */}
            </div>

            {/* Footer Links Sections */}
            {footerData.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-green-400 font-semibold text-lg uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className={`group flex items-center space-x-2 text-slate-300 hover:text-green-400 transition-colors duration-200 ${
                          isActive(link.href) ? 'text-green-400' : ''
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive(link.href) 
                            ? 'bg-green-400 opacity-100 scale-150 shadow-[0_0_8px_rgba(74,222,128,0.6)]' 
                            : 'bg-green-400 opacity-0 group-hover:opacity-100 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(74,222,128,0.6)]'
                        }`} />
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-8 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact) => (
              <div key={contact.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center text-green-400 mt-1 shrink-0">
                  {contact.icon}
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
                    {contact.label}
                  </p>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="text-white hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{contact.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Lavita Malam Jabba. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-green-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-green-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-slate-400 hover:text-green-400 transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>Made with</span>
              <div className="w-4 h-4 text-red-500">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span>in Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;