'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for indoor activities
const classicRestaurant = '/images/facilities/indoor-activities/classic-restaurant.jpg';
const panoramaRestaurant = '/images/facilities/indoor-activities/panorama-restaurant.jpg';
const verticalGarden = '/images/facilities/indoor-activities/vertical-garden.jpg';
const miniMuseum = '/images/facilities/indoor-activities/mini-museum.jpg';
const indoorSports = '/images/facilities/indoor-activities/indoor-sports.jpg';
const observatory = '/images/facilities/indoor-activities/observatory.jpg';
const swatCenter = '/images/facilities/indoor-activities/swat-center.jpg';
const wellnessClub = '/images/facilities/indoor-activities/wellness-club.jpg';
const indoorVideo = '/videos/indoor-activity.mp4';
const indoorFallback = '/images/facilities/indoor-activities/indoor-sports.jpg';

// Indoor activities data
const indoorActivities = [
  {
    id: 1,
    title: "Classic Restaurant",
    description: "Experience fine dining at our elegant Classic Restaurant featuring sophisticated ambiance, gourmet cuisine, and exceptional service. Our menu showcases both international dishes and local specialties prepared by expert chefs using fresh, locally-sourced ingredients. Perfect for romantic dinners, family celebrations, and business dinners.",
    features: ["Gourmet cuisine", "Elegant ambiance", "Local specialties", "Expert chefs"],
    image: classicRestaurant,
    icon: "🍽️",
    activityType: "Dining",
    atmosphere: "Sophisticated",
    hours: "7 AM - 11 PM"
  },
  {
    id: 2,
    title: "Panorama Restaurant",
    description: "Dine with breathtaking 360-degree mountain views at our Panorama Restaurant. Located at the highest point of our facility, this restaurant offers unparalleled vistas of Malam Jabba valley. Enjoy our signature dishes while watching spectacular sunsets and starry nights through floor-to-ceiling glass walls.",
    features: ["360-degree views", "Signature dishes", "Glass walls", "Sunset watching"],
    image: panoramaRestaurant,
    icon: "🌄",
    activityType: "Dining",
    atmosphere: "Scenic",
    hours: "12 PM - 10 PM"
  },
  {
    id: 3,
    title: "Vertical Garden",
    description: "Immerse yourself in our stunning living wall featuring hundreds of plant species in a creative vertical arrangement. This eco-friendly installation not only purifies the air but also serves as a peaceful retreat for meditation and photography. Educational tours available to learn about sustainable gardening and plant biodiversity.",
    features: ["Living wall installation", "Air purification", "Educational tours", "Meditation space"],
    image: verticalGarden,
    icon: "🌿",
    activityType: "Nature",
    atmosphere: "Tranquil",
    hours: "8 AM - 8 PM"
  },
  {
    id: 4,
    title: "Mini Museum",
    description: "Explore the rich cultural heritage of Swat Valley in our carefully curated Mini Museum. Featuring archaeological artifacts, traditional crafts, historical photographs, and interactive displays that tell the story of this ancient region. Perfect for educational visits and cultural enrichment.",
    features: ["Archaeological artifacts", "Traditional crafts", "Historical photos", "Interactive displays"],
    image: miniMuseum,
    icon: "🏛️",
    activityType: "Cultural",
    atmosphere: "Educational",
    hours: "10 AM - 6 PM"
  },
  {
    id: 5,
    title: "Indoor Sports Complex",
    description: "Stay active regardless of weather in our comprehensive Indoor Sports Complex. Featuring badminton courts, table tennis, billiards, chess, and modern fitness equipment. Regular tournaments and social sports events create a vibrant community atmosphere for guests of all ages.",
    features: ["Badminton courts", "Table tennis", "Billiards area", "Fitness equipment"],
    image: indoorSports,
    icon: "🎯",
    activityType: "Sports",
    atmosphere: "Energetic",
    hours: "7 AM - 10 PM"
  },
  {
    id: 6,
    title: "Stargazing Observatory",
    description: "Discover the wonders of the universe in our state-of-the-art observatory equipped with professional telescopes. Guided by astronomy experts, explore planets, stars, and galaxies in the clear mountain skies. Special events during meteor showers and celestial phenomena.",
    features: ["Professional telescopes", "Astronomy experts", "Celestial events", "Educational sessions"],
    image: observatory,
    icon: "🔭",
    activityType: "Astronomy",
    atmosphere: "Magical",
    hours: "Dusk - Midnight"
  },
  {
    id: 7,
    title: "Swat Traditional Centre",
    description: "Experience authentic Swati culture at our Traditional Centre showcasing local arts, crafts, music, and cuisine. Watch live demonstrations of traditional wood carving, embroidery, and pottery. Participate in cultural workshops and enjoy folk music performances in an authentic setting.",
    features: ["Traditional crafts", "Live demonstrations", "Cultural workshops", "Folk music"],
    image: swatCenter,
    icon: "🎪",
    activityType: "Cultural",
    atmosphere: "Authentic",
    hours: "9 AM - 7 PM"
  },
  {
    id: 8,
    title: "Lavita Wellness Club",
    description: "Rejuvenate your mind and body at our comprehensive Wellness Club featuring spa treatments, meditation rooms, steam baths, and therapeutic services. Our certified therapists offer traditional and modern wellness treatments in a serene environment designed for complete relaxation.",
    features: ["Spa treatments", "Meditation rooms", "Steam baths", "Therapeutic services"],
    image: wellnessClub,
    icon: "💆",
    activityType: "Wellness",
    atmosphere: "Serene",
    hours: "8 AM - 9 PM"
  }
];

const IndoorActivities: React.FC = () => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which activities are currently displayed
  const displayedActivities = useMemo(() => {
    return showAllActivities ? indoorActivities : indoorActivities.slice(0, 3);
  }, [showAllActivities]);

  // Toggle handler
  const toggleShowAll = () => {
    setShowAllActivities(!showAllActivities);
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
                Diverse Experiences
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
                Indoor Activities
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Discover diverse entertainment, dining, and cultural experiences within our world-class facilities
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              From gourmet dining and cultural exploration to sports and wellness, our indoor activities 
              offer something for every interest. Experience the perfect blend of luxury, culture, and 
              entertainment in the comfort of our premium facilities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Activity Sections - Compact */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {displayedActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View More/Less Button - Compact */}
      {indoorActivities.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllActivities ? 'Show Less Activities' : `View All ${indoorActivities.length} Activities`}
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
                World of Entertainment
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Explore our diverse indoor facilities designed for entertainment, relaxation, and cultural enrichment
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
              poster={indoorFallback}
            >
              <source src={indoorVideo} type="video/mp4" />
              <Image
                src={indoorFallback}
                loading='lazy'
                alt="Indoor Activities Video"
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
                Experience Indoor Excellence
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the perfect blend of dining, entertainment, culture, and wellness within our 
              premium indoor facilities. Book your experience today and create unforgettable memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/activities-booking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Book Activities
                </motion.button>
              </Link>
              <Link href="/indoor-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Gallery
                </motion.button>
              </Link>
              <Link href="/contact-activities">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Get Information
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
                <div className="text-2xl mb-2">🍽️</div>
                <p className="text-slate-400 text-sm">Fine Dining</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-slate-400 text-sm">Sports & Games</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎪</div>
                <p className="text-slate-400 text-sm">Cultural Center</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">💆</div>
                <p className="text-slate-400 text-sm">Wellness Club</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Activity Card Component - Compact
interface ActivityCardProps {
  activity: typeof indoorActivities[0];
  index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
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
          <div className="text-3xl">{activity.icon}</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
                {activity.activityType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-400 text-sm">{activity.atmosphere}</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{activity.hours}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {activity.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {activity.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-300">Key Features:</h3>
          <div className="grid grid-cols-1 gap-2">
            {activity.features.map((feature, featureIndex) => (
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
              src={activity.image}
              alt={activity.title}
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
            <span className="text-emerald-300 text-sm font-medium">{activity.activityType}</span>
          </div>

          {/* Hours Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">⏰ {activity.hours}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IndoorActivities;