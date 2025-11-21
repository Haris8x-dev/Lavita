'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Animation for section2 to overlay section1 - always full opacity
  const section2Y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  // Subtle scroll animations for cards
  const card1Y = useTransform(scrollYProgress, [0.2, 0.5], [30, 0])
  const card2Y = useTransform(scrollYProgress, [0.3, 0.6], [30, 0])
  const card3Y = useTransform(scrollYProgress, [0.4, 0.7], [30, 0])

  // Floating animation for cards
  const floatingY = useTransform(scrollYProgress, [0.2, 1], [0, -10])

  // Split the main title into words for word-by-word animation
  const titleWords = "Lavita Malam Jabba".split(" ")

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

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1 - Fixed Video Background */}
      <section className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={hotelVideo} type="video/mp4" />
          {/* Fallback Image using Next.js Image */}
          <Image 
            src={hotelFallback} 
            alt="Lavita Malam Jabba" 
            fill
            className="object-cover"
            priority
          />
        </video>

        {/* Vignette Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black via-black/50 to-transparent z-10" />

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center z-20">
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

      {/* Spacer to push content below fixed section */}
      <div className="h-screen" />

      {/* Section 2 - Sticky Premium Experiences */}
      <motion.section 
        ref={section2Ref}
        style={{
          y: section2Y
        }}
        className="sticky top-0 w-full min-h-screen bg-black overflow-hidden rounded-4xl"
      >
        {/* Background that covers entire page immediately */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="group"
                style={{
                  y: index === 0 ? card1Y : index === 1 ? card2Y : card3Y
                }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 group-hover:border-emerald-400/30 transition-all duration-500 ease-out h-full"
                  style={{ y: floatingY }}
                  whileHover={{ 
                    y: -8,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }
                  }}
                >
                  {/* Card Background Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image Container */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { 
                          duration: 0.8,
                          ease: "easeOut"
                        }
                      }}
                    >
                      <Image 
                        src={experience.image} 
                        alt={experience.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-6 right-6 w-14 h-14 bg-emerald-400/10 backdrop-blur-sm rounded-xl border border-emerald-400/20 flex items-center justify-center group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-500">
                      <span className="text-2xl">{experience.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 relative z-10">
                    <motion.h3 
                      className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-500"
                      whileHover={{ x: 3 }}
                    >
                      {experience.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-500"
                      whileHover={{ x: 3 }}
                    >
                      {experience.description}
                    </motion.p>

                    {/* Action Button */}
                    <motion.button
                      className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors duration-500"
                      whileHover={{ x: 3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Discover More</span>
                      <motion.svg 
                        className="w-4 h-4"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        whileHover={{ x: 2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-emerald-400/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-16 lg:mt-24"
          >
            <motion.button
              className="px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-105"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>
      </motion.section>    
    </div>
  )
}

export default Home