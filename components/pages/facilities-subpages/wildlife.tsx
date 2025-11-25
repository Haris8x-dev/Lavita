'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for wildlife
const wildlifeObservation = '/images/facilities/wildlife/observation-deck.jpg';
const plantEducation = '/images/facilities/wildlife/plant-education.jpg';
const animalGuidance = '/images/facilities/wildlife/wildlife-guidance.jpg';
const naturePhotography = '/images/facilities/wildlife/photography.jpg';
const wildlifeVideo = '/videos/wildlife.mp4';
const wildlifeFallback = '/images/facilities/wildlife/observation-deck.jpg';

// Wildlife experiences data
const wildlifeExperiences = [
  {
    id: 1,
    title: "Wildlife Observation Deck",
    description: "Experience unparalleled wildlife viewing from our elevated observation decks strategically located throughout Malam Jabba. Using high-quality binoculars and spotting scopes, observe native species in their natural habitat without disturbing their environment. Perfect for photography and nature study.",
    features: ["Elevated viewing platforms", "High-quality binoculars", "Non-intrusive observation", "Photography opportunities"],
    image: wildlifeObservation,
    icon: "🔭",
    experienceType: "Observation",
    bestTime: "Early Morning & Dusk",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Expert Wildlife Guidance",
    description: "Learn from our knowledgeable naturalists about Malam Jabba's diverse wildlife. Our guides provide fascinating insights about animal behaviors, habitats, and conservation efforts. Discover the stories behind each species and understand their role in this delicate ecosystem.",
    features: ["Knowledgeable naturalists", "Behavior insights", "Habitat education", "Conservation awareness"],
    image: animalGuidance,
    icon: "👨‍🏫",
    experienceType: "Education",
    bestTime: "Daylight Hours",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Flora & Fauna Education",
    description: "Discover the rich botanical diversity of Malam Jabba through guided plant identification walks. Learn about medicinal plants, native species, and the intricate relationships between local flora and fauna. Our experts share traditional knowledge and scientific insights.",
    features: ["Plant identification", "Medicinal plants", "Native species", "Traditional knowledge"],
    image: plantEducation,
    icon: "🌿",
    experienceType: "Botanical",
    bestTime: "Morning Hours",
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "Nature Photography Workshops",
    description: "Capture stunning wildlife and landscape photographs with guidance from professional photographers. Learn techniques for wildlife photography, composition, and using natural light. Our workshops cater to all skill levels from beginners to advanced photographers.",
    features: ["Professional guidance", "Wildlife photography", "Composition techniques", "All skill levels"],
    image: naturePhotography,
    icon: "📸",
    experienceType: "Photography",
    bestTime: "Golden Hours",
    difficulty: "Easy"
  },
];

const Wildlife: React.FC = () => {
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which experiences are currently displayed
  const displayedExperiences = useMemo(() => {
    return showAllExperiences ? wildlifeExperiences : wildlifeExperiences.slice(0, 3);
  }, [showAllExperiences]);

  // Toggle handler
  const toggleShowAll = () => {
    setShowAllExperiences(!showAllExperiences);
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
                Natural Wonders
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
                Wildlife & Nature
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Discover Malam Jabba's rich biodiversity through guided exploration and educational experiences
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              From wildlife observation with binoculars to educational sessions about local flora and fauna, 
              our wildlife experiences offer deep insights into Malam Jabba's natural environment. Explore 
              geographic wonders and learn about conservation in this unique mountain ecosystem.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Experience Sections - Compact */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {displayedExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View More/Less Button - Compact */}
      {wildlifeExperiences.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllExperiences ? 'Show Less Experiences' : `View All ${wildlifeExperiences.length} Experiences`}
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
                Natural Heritage
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Explore the rich biodiversity and natural wonders of Malam Jabba through educational wildlife experiences
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
              poster={wildlifeFallback}
            >
              <source src={wildlifeVideo} type="video/mp4" />
              <Image
                src={wildlifeFallback}
                loading='lazy'
                alt="Wildlife & Nature Video"
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
                <span className="text-emerald-300 text-xs md:text-sm font-medium">Wildlife Preview</span>
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
                Connect with Nature
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our wildlife experiences to deepen your understanding of Malam Jabba's natural environment. 
              From guided observations to educational sessions, discover the wonders of this mountain ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/wildlife-booking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Book Wildlife Tour
                </motion.button>
              </Link>
              <Link href="/wildlife-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Nature Gallery
                </motion.button>
              </Link>
              <Link href="/contact-wildlife">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Get Expert Guidance
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
                <div className="text-2xl mb-2">🔭</div>
                <p className="text-slate-400 text-sm">Wildlife Observation</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <p className="text-slate-400 text-sm">Expert Guidance</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🌿</div>
                <p className="text-slate-400 text-sm">Plant Education</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🗺️</div>
                <p className="text-slate-400 text-sm">Geographic Exploration</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Experience Card Component - Compact
interface ExperienceCardProps {
  experience: typeof wildlifeExperiences[0];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
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
          <div className="text-3xl">{experience.icon}</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
                {experience.experienceType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-400 text-sm">{experience.bestTime}</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{experience.difficulty}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {experience.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-300">Key Features:</h3>
          <div className="grid grid-cols-1 gap-2">
            {experience.features.map((feature, featureIndex) => (
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
              src={experience.image}
              loading='lazy'
              alt={experience.title}
              fill
              className="object-cover"
              priority={index < 2}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
            <span className="text-emerald-300 text-sm font-medium">{experience.experienceType}</span>
          </div>

          {/* Best Time Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">⏰ {experience.bestTime}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Wildlife;