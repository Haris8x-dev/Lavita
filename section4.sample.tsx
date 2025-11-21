'use client'

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

// Images from public folder
const box1Img = '/images/box1.jpg'
const box2Img = '/images/box2.jpg'
const box3Img = '/images/box3.jpg'

// Video from public folder
const hotelVideo = '/videos/hotel-video.mp4'
const hotelFallback = '/images/hotel-fallback.jpg'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [currentPoint, setCurrentPoint] = useState(0)
  const [isTimelineInView, setIsTimelineInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Animation for section2 to overlay section1
  const section2Y = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  
  // Track when section2 ends to properly position section3 and section4
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end end"]
  })

  // Timeline scroll progress within section 2
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })

  // Track when timeline is in view for navigation dots
  const { scrollYProgress: timelineViewProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })

  useMotionValueEvent(timelineViewProgress, "change", (latest) => {
    setIsTimelineInView(latest > 0.1 && latest < 0.9)
  })

  // Image data
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

  // Timeline points data
  const timelinePoints = [
    {
      id: 1,
      title: "Mountain Luxury",
      description: "Experience unparalleled comfort in our premium suites with panoramic mountain views",
      image: box1Img,
      position: "left"
    },
    {
      id: 2,
      title: "Adventure Awaits",
      description: "Guided expeditions and outdoor activities for every skill level",
      image: box2Img,
      position: "right"
    },
    {
      id: 3,
      title: "Culinary Excellence",
      description: "Gourmet dining with locally sourced ingredients and international flavors",
      image: box3Img,
      position: "left"
    },
    {
      id: 4,
      title: "Wellness & Spa",
      description: "Rejuvenate your senses with our world-class spa treatments and facilities",
      image: box1Img,
      position: "right"
    }
  ]

  // Navigation functions with direction tracking
  const nextSlide = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  // Handle timeline point navigation
  useMotionValueEvent(timelineScrollProgress, "change", (latest) => {
    // Calculate current point based on scroll progress
    const pointIndex = Math.floor(latest * (timelinePoints.length - 1))
    setCurrentPoint(Math.min(pointIndex, timelinePoints.length - 1))
  })

  const navigateToPoint = (index: number) => {
    setCurrentPoint(index)
    // Scroll to the specific point in the timeline
    const pointElement = document.getElementById(`point-${index}`)
    pointElement?.scrollIntoView({ behavior: 'smooth' })
  }

  // Ultra-smooth transition config
  const smoothTransition = {
    ease: [0.25, 0.1, 0.25, 1.0] as const,
    duration: 0.8
  }

  // Content fade transition
  const contentTransition = {
    duration: 0.4,
    delay: 0.15
  }

  // Split the main title into words for word-by-word animation
  const titleWords = "Lavita Malam Jabba".split(" ")

  return (
    <div ref={containerRef} className="relative">
      {/* ============================================= */}
      {/* SECTION 1: FIXED VIDEO BACKGROUND */}
      {/* ============================================= */}
      <section className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        >
          <source src={hotelVideo} type="video/mp4" />
          {/* Fallback using CSS background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hotelFallback})` }}
          />
        </video>

        {/* Vignette Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/50 to-transparent z-20" />

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center z-30">
          <div className="ml-8 lg:ml-16 xl:ml-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 overflow-hidden">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    className="inline-block mr-2 last:mr-0 logo text-green-400"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6"
              >
                Discover the ultimate Mountain Escape at Lavita Malam Jabba
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                className="h-0.5 bg-white mb-6 max-w-md"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed max-w-3xl"
              >
                Lavita Malam Jabba presents the region's only fully serviced luxury hotel appartments, perfectly positioned on Malam Jabba Road, Swat.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SPACER: PUSHES CONTENT BELOW FIXED SECTION 1 */}
      {/* ============================================= */}
      <div className="h-screen" />

      {/* ============================================= */}
      {/* SECTION 2: STICKY CONTAINER WITH CAROUSEL + TIMELINE */}
      {/* ============================================= */}
      <motion.section
        ref={section2Ref}
        style={{
          y: section2Y
        }}
        className="sticky top-0 w-full min-h-[200vh] bg-black overflow-hidden"
      >
        {/* Background that covers entire page immediately */}
        <div className="absolute inset-0 bg-black" />

        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          
          {/* ============================================= */}
          {/* PART 1: CAROUSEL SECTION */}
          {/* ============================================= */}
          <div className="min-h-screen flex flex-col justify-center">
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400"></div>
                <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Premium Experience</span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400"></div>
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

            {/* Carousel Container */}
            <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center perspective-1000">
              {/* Navigation Arrows */}
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

              {/* Cards Carousel */}
              <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center h-full px-4">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    layout
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 120 : -120,
                        scale: 0.95,
                        rotateY: dir > 0 ? -10 : 10,
                        opacity: 0,
                        filter: "blur(4px)"
                      }),
                      center: {
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        opacity: 1,
                        filter: "blur(0px)"
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? -180 : 180,
                        scale: 0.85,
                        rotateY: dir > 0 ? 12 : -12,
                        opacity: 0.4,
                        filter: "blur(6px)"
                      })
                    }}
                    transition={smoothTransition}
                    className="absolute w-full max-w-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      layout
                      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-800/95 to-slate-900/98 backdrop-blur-md border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/30"
                      whileHover={{
                        scale: 1.02,
                        transition: { 
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }}
                      transition={{
                        scale: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative h-80 lg:h-96 overflow-hidden">
                        <Image
                          src={experiences[activeIndex].image}
                          alt={experiences[activeIndex].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

                        {/* Icon */}
                        <div className="absolute top-6 right-6 w-16 h-16 bg-emerald-400/30 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/25 flex items-center justify-center">
                          <span className="text-3xl">
                            {experiences[activeIndex].icon}
                          </span>
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                            {experiences[activeIndex].title}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={contentTransition}
                        className="p-8"
                      >
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                          {experiences[activeIndex].description}
                        </p>

                        {/* Action Button */}
                        <motion.button
                          className="px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            scale: { duration: 0.2, ease: "easeOut" }
                          }}
                        >
                          Discover More
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center items-center gap-4 mt-16">
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full transition-all duration-300 ${index === activeIndex
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: index === activeIndex ? 1.2 : 1,
                    width: index === activeIndex ? 16 : 12,
                    height: index === activeIndex ? 16 : 12,
                  }}
                  transition={{
                    scale: { duration: 0.2, ease: "easeOut" }
                  }}
                />
              ))}
            </div>

            {/* Carousel CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mt-20 lg:mt-28"
            >
              <motion.button
                className="px-12 py-5 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" }
                }}
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          </div>

          {/* ============================================= */}
          {/* PART 2: TIMELINE SECTION */}
          {/* ============================================= */}
          <div ref={timelineRef} className="min-h-screen pt-32">
            {/* Timeline Header */}
            <div className="text-center mb-20">
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
                  <br />
                  <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                    Extra Ordinary Services
                  </span>
                </motion.h2>
              </motion.div>
            </div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-500/30 transform -translate-x-1/2 z-0">
                <motion.div
                  style={{ scaleY: timelineScrollProgress }}
                  className="h-full w-full bg-gradient-to-b from-emerald-400 to-green-500 origin-top shadow-[0_0_20px_5px_rgba(52,211,153,0.4)]"
                />
              </div>

              {/* Timeline Points */}
              {timelinePoints.map((point, index) => (
                <div
                  key={point.id}
                  id={`point-${index}`}
                  className={`relative flex items-center justify-between mb-40 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full max-w-lg z-20 ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}
                  >
                    <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-emerald-400/30 shadow-2xl shadow-emerald-500/20">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {point.title}
                      </h3>
                      <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        {point.description}
                      </p>
                      <motion.button
                        className="px-6 py-3 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Central Dot with Connecting Line BEHIND the card */}
                  <div className="relative z-10 flex-shrink-0">
                    {/* Connecting Line to Central Timeline - BEHIND the card */}
                    <div className={`absolute top-1/2 w-32 h-1 bg-emerald-400/50 ${
                      index % 2 === 0 ? 'right-full' : 'left-full'
                    } transform -translate-y-1/2 z-0`} />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`w-8 h-8 rounded-full border-4 border-white shadow-2xl relative z-20 ${
                        currentPoint === index 
                          ? 'bg-emerald-400 scale-125 shadow-emerald-500/50' 
                          : 'bg-slate-700'
                      } transition-all duration-300`}
                    />
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full max-w-md z-20 ${
                      index % 2 === 0 ? 'ml-8' : 'mr-8'
                    }`}
                  >
                    <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl">
                      <Image
                        src={point.image}
                        alt={point.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Timeline CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <motion.button
                className="px-12 py-5 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Timeline Navigation Dots - Only show when timeline is in view */}
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
                  className={`relative rounded-full transition-all duration-300 ${
                    currentPoint === index 
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
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

      {/* ============================================= */}
      {/* SPACER: PUSHES SECTION 3 BELOW STICKY SECTION 2 */}
      {/* ============================================= */}
      <div className="h-screen" />

      {/* ============================================= */}
      {/* SECTION 3: LAVITA MALAM JABBA INTRODUCTION */}
      {/* ============================================= */}
      <section ref={section3Ref} className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
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
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400"></div>
                  <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">About Us</span>
                  <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400"></div>
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
                we provide a sanctuary for those seeking both adventure and relaxation in one of Pakistan's most breathtaking locations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-8 mt-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
                  <div className="text-slate-400">Luxury Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                  <div className="text-slate-400">Premium Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">5★</div>
                  <div className="text-slate-400">Rated Resort</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                  <div className="text-slate-400">Satisfaction</div>
                </div>
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
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Resort
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Image */}
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
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-emerald-400/20 backdrop-blur-lg rounded-2xl border-2 border-emerald-400/30 flex items-center justify-center">
                  <span className="text-2xl">🏔️</span>
                </div>
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-linear-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/30 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">Best Mountain View</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 4: CONTINUE YOUR JOURNEY */}
      {/* ============================================= */}
      <section className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        
        <div className="text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Continue Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
          >
            Discover more amazing experiences waiting for you at Lavita Malam Jabba
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="px-12 py-5 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Stay
          </motion.button>
        </div>
      </section>
    </div>
  )
}

export default Home