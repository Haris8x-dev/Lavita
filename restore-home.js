const fs = require('fs');
const path = require('path');

const content = `'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from 'next/link';

// Images from public folder
const box1Img = '/images/box1.jpg'
const box2Img = '/images/box2.jpg'
const box3Img = '/images/box3.jpg'

// Video from public folder
const hotelVideo = '/videos/hotel-video.mp4'
const hotelFallback = '/images/box3.jpg'

// CountUp Component
const CountUp = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  
  const [isMounted, setIsMounted] = useState(false)
  const [carouselState, setCarouselState] = useState({
    activeIndex: 0,
    direction: 0
  });
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4); // 4 testimonials
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  const section2Y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  // Data
  const experiences = [
    {
      id: 1,
      title: "Peak Experiences",
      description: "Unforgettable mountain adventures and exclusive activities designed for the discerning traveler",
      image: box1Img,
    },
    {
      id: 2,
      title: "Premium Amenities",
      description: "World-class facilities and services that redefine luxury mountain living",
      image: box2Img,
    },
    {
      id: 3,
      title: "Premium Hospitality",
      description: "Personalized service and attention to detail that exceeds every expectation",
      image: box3Img,
    }
  ]

 const extraordinaryServices = [
  {
    id: 1,
    title: "Personal Adventure Concierge",
    description: "Your dedicated adventure planner who curates personalized outdoor experiences. From arranging private skiing lessons to organizing exclusive wildlife tours, we handle every detail so you can focus on creating memories.",
    image: box1Img,
    highlight: "Tailored Experiences"
  },
  {
    id: 2,
    title: "Family Activity Coordination",
    description: "Seamless family fun with coordinated schedules for all ages. While kids enjoy supervised playground activities, adults can relax knowing every family member is engaged in age-appropriate, exciting experiences.",
    image: box2Img,
    highlight: "Multi-Generational Fun"
  },
  {
    id: 3,
    title: "Corporate Retreat Planning",
    description: "End-to-end corporate event management in our premium conference facilities. We transform business meetings into inspiring experiences with team-building activities, gourmet catering, and professional AV support.",
    image: box3Img,
    highlight: "Productive Luxury"
  },
  {
    id: 4,
    title: "Wellness Journey Guidance",
    description: "Holistic wellness programs combining gym sessions, yoga classes, and spa treatments. Our wellness coaches create personalized fitness journeys that align with your health goals and schedule.",
    image: box1Img,
    highlight: "Mind-Body Balance"
  },
  {
    id: 5,
    title: "Celebration Experience Curator",
    description: "Turn special moments into unforgettable memories with our event specialists. From intimate poolside dinners to grand wedding celebrations, we orchestrate every detail for flawless execution.",
    image: box2Img,
    highlight: "Memorable Events"
  },
  {
    id: 6,
    title: "Adventure Safety & Logistics",
    description: "Professional guidance and equipment management for all outdoor activities. Our certified experts ensure your mountain climbing, hiking, and adventure sports are both thrilling and completely safe.",
    image: box3Img,
    highlight: "Safe Exploration"
  },
  {
    id: 7,
    title: "Nature Education Programs",
    description: "Interactive learning experiences with our wildlife experts. Transform simple observation into deep understanding through guided sessions about local flora, fauna, and conservation efforts.",
    image: box1Img,
    highlight: "Educational Discovery"
  },
  {
    id: 8,
    title: "All-Weather Activity Coordination",
    description: "Seamless transition between indoor and outdoor fun regardless of weather conditions. We ensure your itinerary remains exciting with our diverse range of facilities and activities.",
    image: box2Img,
    highlight: "Weather-Proof Fun"
  }
];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Family Vacation Guest",
      rating: 5,
      comment: "An absolutely magical experience! The views are breathtaking, the staff is incredibly attentive, and the facilities are world-class. Our family had the best vacation we've ever had.",
      initials: "SA"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Event Organizer",
      rating: 5,
      comment: "Hosted our annual company retreat at Lavita and it exceeded all expectations. The conference facilities are top-notch, and the team-building activities in the mountains were unforgettable.",
      initials: "MC"
    },
    {
      id: 3,
      name: "Fatima Khan",
      role: "Honeymoon Couple",
      rating: 5,
      comment: "The perfect honeymoon destination! Lavita Malam Jabba provided us with privacy, luxury, and romance. The sunset views from our room were spectacular. Highly recommended!",
      initials: "FK"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Adventure Enthusiast",
      rating: 5,
      comment: "As someone who's visited mountain resorts worldwide, Lavita stands out. The adventure activities are thrilling, the safety standards impeccable, and the hospitality genuinely warm.",
      initials: "DT"
    }
  ];

  const stats = [
    { value: 50, suffix: "+", label: "Luxury Rooms" },
    { value: 24, suffix: "/7", label: "Premium Service" },
    { value: 5, suffix: "★", label: "Rated Resort" },
    { value: 100, suffix: "%", label: "Satisfaction" }
  ]

  // Navigation functions
  const nextSlide = () => {
    const totalSlides = experiences.length;
    const nextIndex = (carouselState.activeIndex + 1) % totalSlides;
    setCarouselState({ activeIndex: nextIndex, direction: 1 });
  }

  const prevSlide = () => {
    const totalSlides = experiences.length;
    const prevIndex = (carouselState.activeIndex - 1 + totalSlides) % totalSlides;
    setCarouselState({ activeIndex: prevIndex, direction: -1 });
  }

  const goToSlide = (index: number) => {
    const direction = index > carouselState.activeIndex ? 1 : -1;
    setCarouselState({ activeIndex: index, direction });
  }

  // Animation configs
  const carouselTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const
  }

  const cardVariants = {
    left: {
      x: -160,
      scale: 0.75,
      opacity: 0.5,
      filter: "blur(4px)",
      rotateY: -12,
      zIndex: 10,
      transition: carouselTransition
    },
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotateY: 0,
      zIndex: 30,
      transition: carouselTransition
    },
    right: {
      x: 160,
      scale: 0.75,
      opacity: 0.5,
      filter: "blur(4px)",
      rotateY: 12,
      zIndex: 10,
      transition: carouselTransition
    },
    // Entry animations for swipe effect
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      filter: "blur(6px)",
      rotateY: direction > 0 ? 15 : -15,
    }),
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      filter: "blur(6px)",
      rotateY: direction > 0 ? -15 : 15,
      transition: { ...carouselTransition, duration: 0.5 }
    })
  }

  // Helper functions
  const getCardIndices = () => {
    const total = experiences.length;
    const current = carouselState.activeIndex;

    return {
      leftIndex: (current - 1 + total) % total,
      centerIndex: current,
      rightIndex: (current + 1) % total
    };
  };

  const { leftIndex, centerIndex, rightIndex } = getCardIndices();

  // Get services to display
  const displayedServices = useMemo(() => (
    showAllServices ? extraordinaryServices : extraordinaryServices.slice(0, 3)
  ), [showAllServices, extraordinaryServices]);

  // Service Card Component
  const ServiceCard = ({
    service,
    index,
    isAdditional = false,
    totalCount = 0
  }: {
    service: typeof extraordinaryServices[0];
    index: number;
    isAdditional?: boolean;
    totalCount?: number;
  }) => {
    const isEven = index % 2 === 0;

    return (
      <motion.div
        key={\`\${service.id}-\${index}\`}
        initial={{ opacity: 0, y: isAdditional ? 50 : 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: isAdditional ? index * 0.1 : index * 0.2,
          ease: "easeOut"
        }}
        viewport={{ once: true, margin: "-100px" }}
        className={\`relative group \${isEven ? 'lg:pr-12' : 'lg:pl-12'}\`}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className={\`relative flex flex-col lg:flex-row items-center gap-12 \${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }\`}>
          {/* Image Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400/20 bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <Image
                src={service.image}
                alt={service.title}
                loading="lazy"
                width={600}
                height={400}
                className="w-full h-80 lg:h-96 object-cover"
              />
              {/* Thin Border Overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

              {/* Highlight Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-6 left-6"
              >
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/30">
                  <span className="text-emerald-300 text-sm font-medium">{service.highlight}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6"
          >
            {/* Hover Border Container */}
            <div className="relative p-8 rounded-2xl border border-transparent group-hover:border-emerald-400/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-500">
              {/* Service Number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center border border-emerald-400/40">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div className="h-px flex-1 bg-linear-to-r from-emerald-400/40 to-transparent" />
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 pt-4">
                {service.highlight && (
                  <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-300 text-sm">
                    {service.highlight}
                  </span>
                )}
                <span className="px-4 py-2 bg-slate-700/50 border border-slate-600/30 rounded-full text-slate-300 text-sm">
                  Luxury Experience
                </span>
                <span className="px-4 py-2 bg-slate-700/50 border border-slate-600/30 rounded-full text-slate-300 text-sm">
                  Personalized
                </span>            
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connecting Line (except for last item) */}
        {index < (totalCount - 1) && (
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-20 w-px h-20 bg-linear-to-b from-emerald-400/30 to-transparent" />
        )}
      </motion.div>
    );
  };

  // Card component
  const ExperienceCard = ({
    experience,
    position
  }: {
    experience: typeof experiences[0];
    position: 'left' | 'center' | 'right'
  }) => (
    <motion.div
      variants={cardVariants}
      initial={position}
      animate={position}
      className="absolute w-full max-w-2xl"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-800/95 to-slate-900/98 backdrop-blur-md border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/30"
        whileHover={{
          scale: position === 'center' ? 1.02 : 1,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        transition={{ scale: { duration: 0.3, ease: "easeOut" } }}
      >
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority={position === 'center'}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {experience.title}
            </h3>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-8"
        >
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {experience.description}
          </p>
          <motion.button
            className="px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ scale: { duration: 0.2, ease: "easeOut" } }}
          >
            Discover More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="relative">
      {/* SECTION 1: PROFESSIONAL HERO WITH VIDEO BACKGROUND - FIXED */}
      <section className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* FIXED: Removed invalid div inside video and used poster attribute */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          preload="metadata"
          poster={hotelFallback} // CORRECT: Using poster attribute for fallback image
        >
          <source src={hotelVideo} type="video/mp4" />
          {/* The invalid div has been removed */}
        </video>

        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/20 to-transparent z-20" />

        <div className="absolute inset-0 flex items-center z-30">
          <div className="ml-8 lg:ml-16 xl:ml-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6"
              >
                <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent logo">
                    Lavita Malam Jabba
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4">
                  Discover the Ultimate Mountain Escape
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                  className="h-px bg-linear-to-r from-emerald-400 to-transparent w-64"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
                  The region&apos;s premier fully serviced luxury hotel apartments, perfectly positioned on Malam Jabba Road amidst the breathtaking Swat Valley.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.button
                  className="px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 border border-emerald-400/40"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Luxury
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-screen" />

      {/* SECTION 2: MAIN CONTENT */}
      <motion.section
        ref={section2Ref}
        style={{ y: section2Y }}
        className="sticky top-0 w-full min-h-[300vh] bg-black overflow-hidden rounded-tr-4xl rounded-tl-4xl"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

          {/* CAROUSEL SECTION */}
          <div className="min-h-screen flex flex-col justify-center">
            <div className="text-center mb-16 lg:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
                <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Premium Experience</span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
              >
                <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  Unforgettable
                </span>
                <br />
                <span className="bg-linear-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  Moments
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              >
                Discover the pinnacle of luxury and comfort in the heart of Malam Jabba, where every detail is crafted for your ultimate satisfaction.
              </motion.p>
            </div>

            {/* CAROUSEL */}
            <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center perspective-1000">
              <motion.button
                onClick={prevSlide}
                className="absolute left-4 lg:left-8 z-50 w-14 h-14 bg-black/60 backdrop-blur-xl border border-emerald-400/40 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/25 hover:border-emerald-400/60 hover:text-white transition-all duration-300 group shadow-2xl shadow-black/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-4 lg:right-8 z-50 w-14 h-14 bg-black/60 backdrop-blur-xl border border-emerald-400/40 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/25 hover:border-emerald-400/60 hover:text-white transition-all duration-300 group shadow-2xl shadow-black/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center h-full px-4">
                <ExperienceCard experience={experiences[leftIndex]} position="left" />
                <ExperienceCard experience={experiences[centerIndex]} position="center" />
                <ExperienceCard experience={experiences[rightIndex]} position="right" />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-16">
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={\`relative rounded-full transition-all duration-300 \${index === carouselState.activeIndex ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-slate-600 hover:bg-slate-500'}\`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: index === carouselState.activeIndex ? 1.2 : 1,
                    width: index === carouselState.activeIndex ? 16 : 12,
                    height: index === carouselState.activeIndex ? 16 : 12,
                  }}
                  transition={{ scale: { duration: 0.2, ease: "easeOut" } }}
                />
              ))}
            </div>
          </div>

          {/* ENHANCED EXTRA ORDINARY SERVICES SECTION */}
          <div className="min-h-screen pt-32" id="extraordinary-services">
            <div className="text-center mb-20" id="services">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
                <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Beyond Excellence</span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              >
                <span className="bg-linear-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Extra Ordinary Services
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
              >
                Experience services that transcend ordinary luxury, crafted with meticulous attention to detail and designed to create unforgettable moments.
              </motion.p>
            </div>

            {/* Services */}
            <div className="space-y-20">
              {displayedServices.map((service, index) => (
                <ServiceCard
                  key={\`\${service.id}-\${index}\`}
                  service={service}
                  index={index}
                  totalCount={displayedServices.length}
                />
              ))}
            </div>

            {/* View More Button */}
            {extraordinaryServices.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mt-20"
              >
                <motion.button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="px-12 py-5 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40 group"
                  whileHover={{ scale: 1.08, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-3">
                    {showAllServices ? 'Show Less Services' : 'View More Services'}
                    <motion.svg
                      className="w-5 h-5 transform transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ rotate: showAllServices ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* ABOUT SECTION */}
          <div className="min-h-screen pt-32 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" id="about">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 mb-6"
                  >
                    <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
                    <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">About Us</span>
                    <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                      Lavita
                    </span>
                    <br />
                    <span className="bg-linear-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                      Malam Jabba
                    </span>
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-300 leading-relaxed"
                >
                  Nestled in the heart of Swat Valley, Lavita Malam Jabba stands as a testament to luxury and natural beauty.
                  Our resort offers an unparalleled experience where modern comfort meets the majestic Himalayan landscape.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-300 leading-relaxed"
                >
                  With panoramic views of the surrounding mountains, world-class amenities, and exceptional hospitality,
                  we provide a sanctuary for those seeking both adventure and relaxation in one of Pakistan&apos;s most breathtaking locations.
                </motion.p>

                <motion.div
                  ref={statsRef}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-8 mt-12"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="pt-8"
                >
                  <motion.button
                    className="px-12 py-5 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Our Resort
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl shadow-emerald-500/20">
                  <Image
                    src={box1Img}
                    alt="Lavita Malam Jabba Resort"
                    width={600}
                    loading="lazy"
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-6 bg-linear-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/30 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Best Mountain View</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* TESTIMONIALS SECTION */}
          <div className="min-h-screen pt-32 flex items-center">
            <div className="w-full">
              {/* Section Header */}
              <div className="text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
                  <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Guest Experiences</span>
                  <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                >
                  <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                    What Our Guests Say
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                >
                  Real experiences from real guests who have discovered the magic of Lavita Malam Jabba
                </motion.p>
              </div>

              {/* Testimonial Carousel */}
              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Testimonial Card */}
                    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-emerald-400/20 shadow-2xl shadow-emerald-500/10">
                      {/* Quote Icon */}
                      <div className="absolute top-8 right-8 opacity-10">
                        <svg className="w-20 h-20 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.svg
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="w-6 h-6 text-emerald-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 relative z-10"
                      >
                        "{testimonials[activeTestimonial].comment}"
                      </motion.p>

                      {/* Author Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center gap-4"
                      >
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-2 border-emerald-400/40">
                          <span className="text-white font-bold text-lg">
                            {testimonials[activeTestimonial].initials}
                          </span>
                        </div>

                        {/* Name and Role */}
                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <p className="text-emerald-300 text-sm">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center gap-6 mt-12">
                  <motion.button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-12 h-12 bg-slate-800/60 backdrop-blur-xl border border-emerald-400/30 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/20 hover:border-emerald-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  {/* Pagination Dots */}
                  <div className="flex gap-3">
                    {testimonials.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={\`rounded-full transition-all duration-300 \${
                          index === activeTestimonial
                            ? 'bg-emerald-400 w-10 h-3'
                            : 'bg-slate-600 w-3 h-3 hover:bg-slate-500'
                        }\`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="w-12 h-12 bg-slate-800/60 backdrop-blur-xl border border-emerald-400/30 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/20 hover:border-emerald-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.section>
    </div>
  );
};

export default Home;`;

fs.writeFileSync(path.join(__dirname, 'components', 'pages', 'Home.tsx'), content);
console.log('Home.tsx restored and updated successfully!');
