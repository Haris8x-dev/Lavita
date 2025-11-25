'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for conference halls
const mainConferenceHall = '/images/facilities/conference-halls/whiteboards.jpg';
const whiteboards = '/images/facilities/conference-halls/whiteboards.jpg';
const theaterSetup = '/images/facilities/conference-halls/threater.jpg';
const videoConference = '/images/facilities/conference-halls/video-conferencing.jpg';
const professional = '/images/facilities/conference-halls/professional.jpg';
const wifi = '/images/facilities/conference-halls/wifi.jpg';
const techEquipment = '/images/facilities/conference-halls/tech-equipment.jpg';
const conferenceVideo = '/videos/conference.mp4';
const conferenceFallback = '/images/facilities/conference-halls/video-conferencing.jpg';

// Conference halls data
const conferenceHalls = [
  {
    id: 1,
    title: "High-Tech AV Systems",
    description: "State-of-the-art audio-visual equipment including 4K laser projectors, large LED video walls, and professional sound systems. Our advanced technology setup ensures crystal-clear presentations, video conferencing, and immersive multimedia experiences for all your business needs.",
    features: ["4K laser projectors", "Large LED video walls", "Professional PA systems", "Crystal-clear audio"],
    image: techEquipment,
    icon: "📺",
    facilityType: "Technology",
    capacity: "All Rooms",
    setup: "Permanent Installation"
  },
  {
    id: 2,
    title: "Smart Interactive Whiteboards",
    description: "Revolutionize your meetings with our smart interactive whiteboards featuring touch-screen technology, real-time collaboration, and digital annotation capabilities. Perfect for brainstorming sessions, training workshops, and interactive presentations that engage your audience.",
    features: ["Touch-screen technology", "Real-time collaboration", "Digital annotation", "Wireless connectivity"],
    image: whiteboards,
    icon: "📝",
    facilityType: "Interactive",
    capacity: "All Sizes",
    setup: "Mobile & Fixed"
  },
  {
    id: 3,
    title: "High-Speed Internet & Streaming",
    description: "Enterprise-grade fiber optic internet with dedicated bandwidth for seamless video conferencing, live streaming, and large file transfers. Our robust network infrastructure supports multiple simultaneous connections without compromising speed or reliability.",
    features: ["Fiber optic internet", "Video conferencing ready", "Live streaming support", "Dedicated bandwidth"],
    image: wifi,
    icon: "🌐",
    facilityType: "Connectivity",
    capacity: "Unlimited Devices",
    setup: "Network Infrastructure"
  },
  {
    id: 4,
    title: "Theater Style Layouts",
    description: "Professional theater-style seating arrangements perfect for large conferences, product launches, and corporate announcements. Our flexible seating can accommodate from 50 to 500 attendees with optimal visibility and comfort.",
    features: ["50-500 capacity", "Optimal visibility", "Comfortable seating", "Stage setups"],
    image: theaterSetup,
    icon: "🎭",
    facilityType: "Layout",
    capacity: "50-500 People",
    setup: "Flexible Arrangement"
  },
  {
    id: 5,
    title: "Professional Event Support",
    description: "Dedicated event support team including technical specialists, event coordinators, and hospitality staff. Our professional team ensures seamless execution of your events from setup to teardown.",
    features: ["Technical specialists", "Event coordinators", "Hospitality staff", "24/7 support"],
    image: professional,
    icon: "👨‍💼",
    facilityType: "Support",
    capacity: "All Events",
    setup: "Full Service"
  },
  {
    id: 6,
    title: "Video Conferencing Solutions",
    description: "Comprehensive video conferencing solutions with multiple camera angles, professional lighting, and studio-quality audio. Perfect for hybrid meetings connecting remote participants with in-person attendees seamlessly.",
    features: ["Multiple camera angles", "Professional lighting", "Studio-quality audio", "Hybrid meeting ready"],
    image: videoConference,
    icon: "📹",
    facilityType: "Technology",
    capacity: "All Room Sizes",
    setup: "Integrated System"
  },
];

const ConferenceHalls: React.FC = () => {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which facilities are currently displayed
  const displayedFacilities = useMemo(() => {
    return showAllFacilities ? conferenceHalls : conferenceHalls.slice(0, 3);
  }, [showAllFacilities]);

  // Toggle handler
  const toggleShowAll = () => {
    setShowAllFacilities(!showAllFacilities);
  };

  // Don't render anything until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section - Compact */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 md:gap-3 mb-6 pt-8"
            >
              <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
              <span className="text-emerald-400 font-light tracking-widest text-xs md:text-sm uppercase">
                Professional Business Solutions
              </span>
              <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Conference Halls
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              State-of-the-art meeting facilities with cutting-edge technology in the heart of Malam Jabba
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Our premium conference halls offer the perfect blend of natural mountain ambiance and modern technology. 
              From high-tech AV systems to flexible room layouts, we provide everything you need for successful 
              business meetings, corporate events, and professional gatherings.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Facility Sections - Compact */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {displayedFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View More/Less Button - Compact */}
      {conferenceHalls.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllFacilities ? 'Show Less Facilities' : `View All ${conferenceHalls.length} Facilities`}
            </motion.button>
          </div>
        </section>
      )}

      {/* Video Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Professional Environment
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Experience our world-class conference facilities designed for productivity and success
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl shadow-emerald-500/20 mx-auto"
            style={{ height: '800px', maxHeight: '70vh' }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={conferenceFallback}
            >
              <source src={conferenceVideo} type="video/m4" />
              <Image
                src={conferenceFallback}
                alt="Conference Halls Video"
                loading='lazy'
                fill
                className="object-cover"
                priority
              />
            </video>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Play Button */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-emerald-400/30">
                <span className="text-emerald-300 text-xs md:text-sm font-medium">Facility Tour</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Ready to Host Your Event?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book our state-of-the-art conference facilities for your next business meeting, corporate event, 
              or professional gathering. Experience the perfect combination of technology, comfort, and 
              professional support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/conference-booking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Book Conference Hall
                </motion.button>
              </Link>
              <Link href="/conference-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Facility Gallery
                </motion.button>
              </Link>
              <Link href="/contact-conference">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Contact Our Team
                </motion.button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="text-center p-4">
                <div className="text-2xl mb-2">📺</div>
                <p className="text-slate-400 text-sm">High-Tech AV</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🌐</div>
                <p className="text-slate-400 text-sm">High-Speed Internet</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">💼</div>
                <p className="text-slate-400 text-sm">Professional Support</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🔄</div>
                <p className="text-slate-400 text-sm">Flexible Layouts</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Facility Card Component - Compact
interface FacilityCardProps {
  facility: typeof conferenceHalls[0];
  index: number;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      {/* Left Side - Content */}
      <div className="space-y-6 order-2 lg:order-1">
        {/* Icon and Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl">{facility.icon}</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
                {facility.facilityType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{facility.capacity}</span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-400 text-sm">{facility.setup}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {facility.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {facility.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-300">Key Features:</h3>
          <div className="grid grid-cols-1 gap-2">
            {facility.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative order-1 lg:order-2"
      >
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-xl shadow-emerald-500/20">
          <div className="aspect-4/3 relative">
            <Image
              src={facility.image}
              alt={facility.title}
              loading='lazy'
              fill
              className="object-cover"
              priority={index < 2}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
            <span className="text-emerald-300 text-sm font-medium">{facility.facilityType}</span>
          </div>

          {/* Capacity Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">👥 {facility.capacity}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConferenceHalls;