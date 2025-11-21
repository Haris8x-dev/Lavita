'use client'

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect, useActionState } from "react"
import Image from "next/image"

// Images from public folder
const box1Img = '/images/box1.jpg'
const box2Img = '/images/box2.jpg'
const box3Img = '/images/box3.jpg'

// Video from public folder
const hotelVideo = '/videos/hotel-video.mp4'
const hotelFallback = '/images/hotel-fallback.jpg'

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
      const increment = end / (duration * 60); // 60 frames per second
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

// Carousel state management with React 19 useActionState
function carouselReducer(state: { activeIndex: number; direction: number }, action: 'next' | 'prev' | number) {
  const totalSlides = 3;
  
  if (action === 'next') {
    const nextIndex = (state.activeIndex + 1) % totalSlides;
    return { activeIndex: nextIndex, direction: 1 };
  }
  
  if (action === 'prev') {
    const prevIndex = (state.activeIndex - 1 + totalSlides) % totalSlides;
    return { activeIndex: prevIndex, direction: -1 };
  }
  
  if (typeof action === 'number') {
    const direction = action > state.activeIndex ? 1 : -1;
    return { activeIndex: action, direction };
  }
  
  return state;
}

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  
  // Mount state to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false)
  
  // React 19 useActionState for carousel
  const [carouselState, carouselAction] = useActionState(carouselReducer, {
    activeIndex: 0,
    direction: 0
  });
  
  const [currentPoint, setCurrentPoint] = useState(0)
  const [isTimelineInView, setIsTimelineInView] = useState(false)

  // Set mounted state on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Safe useScroll hooks with mounted checks
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  // Animation for section2 to overlay section1
  const section2Y = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  
  // Timeline scroll progress
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: isMounted ? timelineRef : undefined,
    offset: ["start center", "end center"]
  })

  // Track when timeline is in view for navigation dots
  const { scrollYProgress: timelineViewProgress } = useScroll({
    target: isMounted ? timelineRef : undefined,
    offset: ["start center", "end center"]
  })

  // Safe event listeners
  useMotionValueEvent(timelineViewProgress, "change", (latest) => {
    if (isMounted) {
      setIsTimelineInView(latest > 0.05 && latest < 0.98)
    }
  })

  useMotionValueEvent(timelineScrollProgress, "change", (latest) => {
    if (!isMounted) return;

    const total = timelinePoints.length;
    const adjusted = Math.min(Math.max(latest, 0), 1);
    const pointIndex = Math.floor(adjusted * (total - 1) + 0.0001);
    setCurrentPoint(pointIndex);
  })

  // Data
  const experiences = [
    {
      id: 1,
      title: "Peak Experiences",
      description: "Unforgettable mountain adventures and exclusive activities designed for the discerning traveler",
      image: box1Img,
      icon: "🏔️"
    },
    {
      id: 2,
      title: "Premium Amenities",
      description: "World-class facilities and services that redefine luxury mountain living",
      image: box2Img,
      icon: "⭐"
    },
    {
      id: 3,
      title: "Premium Hospitality",
      description: "Personalized service and attention to detail that exceeds every expectation",
      image: box3Img,
      icon: "👑"
    }
  ]

  const timelinePoints = [
    {
      id: 1,
      title: "Mountain Luxury",
      description: "Experience unparalleled comfort in our premium suites with panoramic mountain views",
      image: box1Img,
      position: "left" as const
    },
    {
      id: 2,
      title: "Adventure Awaits",
      description: "Guided expeditions and outdoor activities for every skill level",
      image: box2Img,
      position: "right" as const
    },
    {
      id: 3,
      title: "Culinary Excellence",
      description: "Gourmet dining with locally sourced ingredients and international flavors",
      image: box3Img,
      position: "left" as const
    },
    {
      id: 4,
      title: "Wellness & Spa",
      description: "Rejuvenate your senses with our world-class spa treatments and facilities",
      image: box1Img,
      position: "right" as const
    }
  ]

  const stats = [
    { value: 50, suffix: "+", label: "Luxury Rooms" },
    { value: 24, suffix: "/7", label: "Premium Service" },
    { value: 5, suffix: "★", label: "Rated Resort" },
    { value: 100, suffix: "%", label: "Satisfaction" }
  ]

  // Navigation functions
  const nextSlide = () => carouselAction('next')
  const prevSlide = () => carouselAction('prev')
  const goToSlide = (index: number) => carouselAction(index)

  const navigateToPoint = (index: number) => {
    if (!isMounted) return;
    setCurrentPoint(index)
    const pointElement = document.getElementById(`point-${index}`)
    pointElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
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
    }
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/98 backdrop-blur-md border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/30"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-6 right-6 w-16 h-16 bg-emerald-400/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/25 flex items-center justify-center">
            <span className="text-3xl">{experience.icon}</span>
          </div>
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
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30"
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

  // Loading state during hydration
  // if (!isMounted) {
  //   return (
  //     <div className="relative">
  //       <section className="fixed top-0 left-0 w-full h-screen -z-10">
  //         <video
  //           autoPlay
  //           loop
  //           muted
  //           playsInline
  //           className="absolute top-0 left-0 w-full h-full object-cover z-10"
  //           preload="metadata"
  //         >
  //           <source src={hotelVideo} type="video/mp4" />
  //         </video>
  //         <div className="absolute inset-0 bg-black/30 flex items-center z-30">
  //           <div className="ml-8 lg:ml-16 xl:ml-24 max-w-2xl">
  //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 logo">
  //               Lavita Malam Jabba
  //             </h1>
  //             <p className="text-lg md:text-xl lg:text-2xl text-white/90">
  //               Discover the ultimate Mountain Escape at Lavita Malam Jabba
  //             </p>
  //           </div>
  //         </div>
  //       </section>
  //       <div className="h-screen" />
  //       <section className="min-h-screen bg-black" />
  //     </div>
  //   )
  // }

  return (
    <div ref={containerRef} className="relative">
      {/* SECTION 1: PROFESSIONAL HERO WITH VIDEO BACKGROUND */}
      <section className="fixed top-0 left-0 w-full h-screen -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          preload="metadata"
        >
          <source src={hotelVideo} type="video/mp4" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hotelFallback})` }}
          />
        </video>

        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-20" />
        
        <div className="absolute inset-0 flex items-center z-30">
          <div className="ml-8 lg:ml-16 xl:ml-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Professional Title Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6"
              >
                <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent logo">
                    Lavita Malam Jabba
                  </span>
                  <br />
                  {/* <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent logo">
                    Malam Jabba
                  </span> */}
                </h1>
              </motion.div>

              {/* Professional Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4">
                  Discover the Ultimate Mountain Escape
                </p>
                
                {/* Elegant Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                  className="h-px bg-gradient-to-r from-emerald-400 to-transparent w-64"
                />
              </motion.div>

              {/* Professional Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
                  The region&apos;s premier fully serviced luxury hotel apartments, 
                  perfectly positioned on Malam Jabba Road amidst the breathtaking Swat Valley.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.button
                  className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 border border-emerald-400/40"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Luxury
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div> */}
      </section>

      {/* SPACER */}
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
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-400" />
                <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Premium Experience</span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
              >
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  Unforgettable
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
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

            {/* CAROUSEL DOTS */}
            <div className="flex justify-center items-center gap-4 mt-16">
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full transition-all duration-300 ${index === carouselState.activeIndex ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-slate-600 hover:bg-slate-500'}`}
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

          {/* TIMELINE SECTION */}
          <div ref={timelineRef} className="min-h-screen pt-32">
            <div className="text-center mb-20" id="services">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3"
              >
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-400" />
                <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Premium Services</span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                >
                  <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                    Extra Ordinary Services
                  </span>
                </motion.h2>
              </motion.div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-500/30 transform -translate-x-1/2 z-0">
                <motion.div
                  style={{ scaleY: timelineScrollProgress }}
                  className="h-full w-full bg-gradient-to-b from-emerald-400 to-green-500 origin-top shadow-[0_0_20px_5px_rgba(52,211,153,0.4)]"
                />
              </div>

              {timelinePoints.map((point, index) => (
                <div
                  key={point.id}
                  id={`point-${index}`}
                  className={`relative flex flex-col lg:flex-row items-center justify-between mb-24 lg:mb-40 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full lg:max-w-lg z-20 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} order-2 lg:order-1`}
                  >
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border-2 border-emerald-400/30 shadow-2xl shadow-emerald-500/20 w-full">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{point.title}</h3>
                      <p className="text-base lg:text-lg text-slate-300 leading-relaxed mb-6">{point.description}</p>
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 w-full lg:w-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>

                  <div className="relative z-10 flex-shrink-0 order-1 lg:order-2 mb-6 lg:mb-0">
                    <div className={`absolute top-1/2 w-8 lg:w-32 h-1 bg-emerald-400/50 ${index % 2 === 0 ? 'right-full' : 'left-full'} transform -translate-y-1/2 z-0 hidden lg:block`} />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`w-8 h-8 rounded-full border-4 border-white shadow-2xl relative z-20 ${currentPoint === index ? 'bg-emerald-400 scale-125 shadow-emerald-500/50' : 'bg-slate-700'} transition-all duration-300`}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full lg:max-w-md z-20 ${index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'} order-3 hidden lg:block`}
                  >
                    <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl">
                      <Image
                        src={point.image}
                        alt={point.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <motion.button
                className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
                whileHover={{ scale: 1.08, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>

          {/* ABOUT SECTION WITH ANIMATED STATS */}
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
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-400" />
                    <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">About Us</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-400" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                      Lavita
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
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

                {/* ANIMATED STATS */}
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
                    className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
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
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-6 right-6 w-16 h-16 bg-emerald-400/20 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 flex items-center justify-center">
                    <span className="text-2xl">🏔️</span>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/30 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Best Mountain View</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* TIMELINE NAVIGATION DOTS */}
        <AnimatePresence>
          {isTimelineInView && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-4"
            >
              {timelinePoints.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigateToPoint(index)}
                  className={`relative rounded-full transition-all duration-300 ${currentPoint === index ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-slate-600 hover:bg-slate-500'}`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: currentPoint === index ? 1.2 : 1,
                    width: currentPoint === index ? 16 : 12,
                    height: currentPoint === index ? 16 : 12,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  )
}

export default Home