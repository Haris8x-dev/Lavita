'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for swimming pool
const heatedPool = '/images/facilities/swimming-pool/heated.jpg';
const transparentRoof = '/images/facilities/swimming-pool/transparent-roof.jpg';
const ambientLighting = '/images/facilities/swimming-pool/ambient-lighting.jpg';
const filter = '/images/facilities/swimming-pool/filter.jpg';
const poolSafety = '/images/facilities/swimming-pool/pool-safety.jpg';
const poolRelaxation = '/images/facilities/swimming-pool/pool-relaxation.jpg';
const night = '/images/facilities/swimming-pool/night.jpg';
const poolVideo = '/videos/swimming-pool.mp4';
const poolFallback = '/images/facilities/swimming-pool/heated.jpg';

// Swimming pool features data
const poolFeatures = [
  {
    id: 1,
    title: "Temperature Controlled Heated Water",
    description: "Experience year-round swimming comfort with our advanced temperature control system. The water is maintained at a perfect 28-30°C (82-86°F) regardless of the season, allowing you to enjoy a refreshing swim even during chilly mountain evenings. Our eco-friendly heating system ensures consistent warmth while being energy efficient.",
    features: ["Year-round swimming", "28-30°C optimal temperature", "Eco-friendly heating", "24/7 temperature monitoring"],
    image: heatedPool,
    icon: "🌡️",
    featureType: "Comfort",
    bestFor: "All Seasons",
    availability: "24/7"
  },
  {
    id: 2,
    title: "Crystal Clear Transparent Rooftop",
    description: "Swim under the stars or bask in daylight through our stunning transparent rooftop. Made from reinforced safety glass with UV protection, the rooftop offers panoramic views of the Malam Jabba sky while protecting you from the elements. Experience the magic of swimming while watching clouds drift by or stargazing at night.",
    features: ["Panoramic sky views", "UV protected glass", "Reinforced safety design", "Weather protection"],
    image: transparentRoof,
    icon: "🔮",
    featureType: "Architecture",
    bestFor: "Day & Night",
    availability: "Always Visible"
  },
  {
    id: 3,
    title: "Dynamic Ambient Lighting System",
    description: "Immerse yourself in our sophisticated LED lighting system that transforms the pool area with customizable color themes. From serene blue hues for morning swims to vibrant multicolor displays for evening parties, the lighting creates the perfect atmosphere for every mood and occasion.",
    features: ["Customizable color themes", "Mood-based lighting", "Energy-efficient LEDs", "Remote control access"],
    image: ambientLighting,
    icon: "💡",
    featureType: "Atmosphere",
    bestFor: "All Moods",
    availability: "Dusk to Dawn"
  },
  {
    id: 4,
    title: "Curated Soft Music Experience",
    description: "Enjoy a carefully curated audio experience with our surround sound system featuring relaxing ambient music, soothing nature sounds, or your favorite playlists. The acoustically optimized space ensures perfect sound quality whether you're swimming laps or lounging by the poolside.",
    features: ["Surround sound system", "Curated playlists", "Bluetooth connectivity", "Acoustic optimization"],
    image: poolRelaxation,
    icon: "🎵",
    featureType: "Entertainment",
    bestFor: "Relaxation",
    availability: "Scheduled Hours"
  },
  {
    id: 5,
    title: "Comprehensive Safety & Accessibility",
    description: "Your safety is our priority. Our pool features certified lifeguards, anti-slip surfaces, accessible entry points, and state-of-the-art water quality monitoring. We ensure a secure environment for swimmers of all ages and abilities with wheelchair accessibility and family-friendly facilities.",
    features: ["Certified lifeguards", "Anti-slip surfaces", "Wheelchair accessible", "Water quality monitoring"],
    image: poolSafety,
    icon: "🛡️",
    featureType: "Safety",
    bestFor: "All Ages",
    availability: "Always"
  },
  {
    id: 6,
    title: "Advanced Water Filtration",
    description: "Swim in crystal-clear water purified by our state-of-the-art filtration and sanitation system. Using ozone technology and UV sterilization, we maintain the highest water quality standards while minimizing chemical usage for a healthier swimming experience.",
    features: ["Ozone purification", "UV sterilization", "Minimal chemicals", "Crystal-clear water"],
    image: filter,
    icon: "💧",
    featureType: "Water Quality",
    bestFor: "Health & Hygiene",
    availability: "Continuous"
  },
  {
    id: 7,
    title: "Night Swimming Experience",
    description: "Transform your evening with our magical night swimming experience. The pool area comes alive with special lighting effects, underwater LED displays, and enhanced audio for an unforgettable nocturnal aquatic adventure under the starry Malam Jabba sky.",
    features: ["Underwater LED lights", "Enhanced audio system", "Starry sky views", "Themed nights"],
    image: night,
    icon: "🌙",
    featureType: "Experience",
    bestFor: "Evening Entertainment",
    availability: "Evening Hours"
  }
];

const SwimmingPool: React.FC = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which features are currently displayed
  const displayedFeatures = useMemo(() => {
    return showAllFeatures ? poolFeatures : poolFeatures.slice(0, 3);
  }, [showAllFeatures]);

  // Toggle handler
  const toggleShowAll = () => {
    setShowAllFeatures(!showAllFeatures);
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
              <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent to-blue-400" />
              <span className="text-blue-400 font-light tracking-widest text-xs md:text-sm uppercase">
                Luxury Aquatic Experience
              </span>
              <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-blue-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Lavita Sky Pool
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Swim among the clouds in our breathtaking rooftop infinity pool with panoramic mountain views
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the ultimate luxury at Lavita Sky Pool, where heated waters, transparent rooftops, 
              and ambient lighting create an unforgettable swimming experience. Relax to soft music while 
              enjoying complete safety and accessibility in our state-of-the-art aquatic facility.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections - Compact */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {displayedFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View More/Less Button - Compact */}
      {poolFeatures.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl border-2 border-blue-400/40"
            >
              {showAllFeatures ? 'Show Less Features' : `View All ${poolFeatures.length} Features`}
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
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sky High Swimming
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Watch how we've redefined luxury swimming with our stunning rooftop pool experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border-2 border-blue-400/30 shadow-2xl shadow-blue-500/20 mx-auto"
            style={{ height: '800px', maxHeight: '70vh' }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={poolFallback}
            >
              <source src={poolVideo} type="video/mp4" />
              <Image
                src={poolFallback}
                loading='lazy'
                alt="Lavita Sky Pool Video"
                fill
                className="object-cover"
                priority
              />
            </video>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Play Button */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-blue-400/30">
                <span className="text-blue-300 text-xs md:text-sm font-medium">Pool Experience</span>
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
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Dive In?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience luxury swimming like never before at Lavita Sky Pool. Book your session today 
              and immerse yourself in our heated waters with stunning mountain views and premium amenities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/pool-booking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl border-2 border-blue-400/40 w-full sm:w-auto"
                >
                  Book Pool Session
                </motion.button>
              </Link>
              <Link href="/pool-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-blue-400 hover:text-blue-400 w-full sm:w-auto"
                >
                  View Pool Gallery
                </motion.button>
              </Link>
              <Link href="/contact-pool">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-blue-400 hover:text-blue-400 w-full sm:w-auto"
                >
                  Contact Pool Team
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
                <div className="text-2xl mb-2">🌡️</div>
                <p className="text-slate-400 text-sm">Heated Water</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🔮</div>
                <p className="text-slate-400 text-sm">Transparent Roof</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">💡</div>
                <p className="text-slate-400 text-sm">Ambient Lighting</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-slate-400 text-sm">Safety First</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component - Compact
interface FeatureCardProps {
  feature: typeof poolFeatures[0];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
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
          <div className="text-3xl">{feature.icon}</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-blue-400 font-light tracking-widest text-sm uppercase">
                {feature.featureType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 text-sm">{feature.bestFor}</span>
              <span className="text-slate-500">•</span>
              <span className="text-green-400 text-sm">{feature.availability}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {feature.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {feature.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-300">Feature Highlights:</h3>
          <div className="grid grid-cols-1 gap-2">
            {feature.features.map((featureItem, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                <span>{featureItem}</span>
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
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-xl shadow-blue-500/20">
          <div className="aspect-4/3 relative">
            <Image
              src={feature.image}
              alt={feature.title}
              loading='lazy'
              fill
              className="object-cover"
              priority={index < 2}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/30">
            <span className="text-blue-300 text-sm font-medium">{feature.featureType}</span>
          </div>

          {/* Availability Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">⏰ {feature.availability}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwimmingPool;