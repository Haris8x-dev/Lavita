// components/pages/FacilitiesSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from "next/link";

// static images data
const conference = '/images/facilities/conference.jpg'
const kidsActivity = '/images/facilities/kids.jpg'
const outdoorActivity = '/images/facilities/outdoor.jpg'
const healthClubs = '/images/facilities/healthclubs.jpg'
const wildlife = '/images/facilities/wildlife.jpg'
const swimmingPool = '/images/facilities/swimmingpool.jpg'
const events = '/images/facilities/events.jpg'


// Types
export interface Facility {
  id: string;
  title: string;
  heading: string;
  description: string;
  buttonText: string;
  videoUrl: string;
  imageUrl: string;
  link: string; // 🔥 Added for static routing
}

// Default images and videos from your code
const hotelVideo = '/videos/hotel-video.mp4';
const hotelFallback = '/images/hotel-fallback.jpg';

// Facilities data using your default assets
export const facilities: Facility[] = [
  {
    id: "1",
    title: "Kids Activity Zone",
    heading: "PlayGrounds | Board Games | Story Telling Nights & More",
    description:
      "A vibrant space where kids can enjoy and learn with exciting activities. Our playgrounds are designed with safety and fun in mind, featuring modern equipment and supervised areas.",
    buttonText: "Explore More",
    videoUrl: hotelVideo,
    imageUrl: kidsActivity,
    link: "/facilities/kids-activity-zone", // 🔥 Added
  },
  {
    id: "2",
    title: "Conference Halls",
    heading: "Meetings & Events | Workshops | Corporate Events",
    description:
      "Elegant and fully equipped halls for corporate and private events. Featuring state-of-the-art audio-visual systems and flexible seating arrangements.",
    buttonText: "Learn More",
    videoUrl: hotelVideo,
    imageUrl: conference,
    link: "/facilities/conference-halls", // 🔥 Added
  },
  {
    id: "3",
    title: "Swimming Pool",
    heading: "Heated Water | Transparent Rooftop | Safety & Accessibility",
    description:
      "Olympic-sized swimming pool with temperature control and professional instructors. Perfect for recreation and professional training.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: swimmingPool,
    link: "/facilities/swimming-pool", // 🔥 Added
  },
  {
    id: "4",
    title: "Special Events",
    heading: "Destination Wedding | Bonfire Area | Concerts",
    description:
      "Memorable events with scenic backdrops, themed setups, and cultural experiences like traditional Attan performances.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: events,
    link: "/facilities/special-events", // 🔥 Added
  },
  {
    id: "5",
    title: "Health Clubs",
    heading: "GYM | Yoga Programs | Wellness Coaching",
    description:
      "State-of-the-art training zones, yoga clubs, and premium wellness programs designed for complete mind-body rejuvenation.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: healthClubs,
    link: "/facilities/health-clubs", // 🔥 Added
  },
  {
    id: "6",
    title: "Indoor Activities",
    heading: "Board Games | VR Gaming | Cozy Lounges",
    description:
      "Relax and unwind indoors with premium board games, an immersive VR gaming zone, reading lounges, and cozy indoor relaxation spaces perfect for families and friends.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: outdoorActivity,
    link: "/facilities/indoor-activities", // 🔥 Added
  },
  {
    id: "7",
    title: "Outdoor Activities",
    heading: "Mountain Climbing | Horse Riding & Much More",
    description:
      "Thrilling outdoor adventures including trekking, climbing, guided horseback tours, and scenic trails with breathtaking mountain views.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: outdoorActivity,
    link: "/facilities/outdoor-activities", // 🔥 Added
  },
  {
    id: "8",
    title: "WildLife Exploration",
    heading: "Binocular Viewing | Flora & Fauna Education",
    description:
      "Get closer to nature with guided wildlife exploration, binocular observation points, and educational sessions about Malam Jabba’s rich biodiversity.",
    buttonText: "View Details",
    videoUrl: hotelVideo,
    imageUrl: wildlife,
    link: "/facilities/wildlife-exploring", // 🔥 Added
  },
];

const FacilitiesSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Animated Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
            <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
              Premium Facilities
            </span>
            <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
          </motion.div>

          {/* Horizontal Line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full h-px bg-linear-to-r from-transparent via-emerald-400/50 to-transparent mb-8"
          />

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              Explore the Unmatched
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Discover our world-class amenities designed to provide exceptional experiences for every guest.
          </motion.p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="space-y-20">
          {facilities.map((facility, index) => (
            <FacilityBlock
              key={facility.id}
              facility={facility}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Facility Block Component
interface FacilityBlockProps {
  facility: Facility;
  index: number;
}

const FacilityBlock: React.FC<FacilityBlockProps> = ({ facility, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-center gap-8 lg:gap-12`}
    >

      {/* Text Content */}
      <div className={`flex-1 ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
        {/* Facility Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
          <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
            {facility.title}
          </span>
          <div className="w-8 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
        </motion.div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          <span className="bg-linear-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            {facility.heading}
          </span>
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-slate-300 mb-8 leading-relaxed"
        >
          {facility.description}
        </motion.p>

        {/* Button - FIXED: Removed invalid 'hover' property from transition */}
        <Link href={facility.link}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30 inline-block"
          >
            {facility.buttonText}
          </motion.button>
        </Link>
      </div>

      {/* Video/Media Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
        className="flex-1 w-full"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/30 bg-slate-800 aspect-video">
          {/* Video Fallback Image */}
          <Image
            src={facility.imageUrl}
            alt={facility.heading}
            loading='lazy'
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FacilitiesSection;