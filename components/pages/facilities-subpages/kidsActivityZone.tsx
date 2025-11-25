'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for kids activities
const kidsPlayground = '/images/facilities/kids-acitivity-zone/kids-playground.jpg';
const boardGames = '/images/facilities/kids-acitivity-zone/board-games.jpg';
const storyTime = '/images/facilities/kids-acitivity-zone/story-time.jpg';
const artsCrafts = '/images/facilities/kids-acitivity-zone/arts-crafts.jpg';
const educationalWorkshops = '/images/facilities/kids-acitivity-zone/educational-workshops.jpg';
const outdoorExploration = '/images/facilities/kids-acitivity-zone/outdoor-exploration.jpg';
const kidsVideo = '/videos/kids-activity.mp4';
const kidsFallback = '/images/facilities/kids-acitivity-zone/kids-fallback.jpg';

// Kids activities data
const kidsActivities = [
  {
    id: 1,
    title: "Adventure Playground",
    description: "Safe and exciting playground equipment designed for different age groups, featuring slides, swings, climbing frames, and soft landing surfaces. Our adventure playground is carefully designed to stimulate physical development while ensuring maximum safety with certified materials and constant supervision.",
    features: ["Age-appropriate equipment", "Safety-certified materials", "Supervised play areas", "Interactive play zones"],
    image: kidsPlayground,
    icon: "🎯"
  },
  {
    id: 2,
    title: "Creative Board Games",
    description: "Educational and entertaining board games that develop critical thinking, strategy, and social skills in a fun, engaging environment. Children learn cooperation, problem-solving, and strategic thinking through our curated collection of educational games.",
    features: ["Educational games", "Strategy development", "Social interaction", "Cognitive skills"],
    image: boardGames,
    icon: "🎲"
  },
  {
    id: 3,
    title: "Magical Story Telling",
    description: "Enchanting story sessions with professional storytellers, bringing tales to life with props, voices, and interactive elements. Our magical storytelling sessions transport children to different worlds while enhancing their listening skills and imagination.",
    features: ["Professional storytellers", "Interactive sessions", "Themed storytelling", "Character engagement"],
    image: storyTime,
    icon: "📚"
  },
  {
    id: 4,
    title: "Arts & Crafts Studio",
    description: "Creative space where children can explore their artistic talents with various materials, guided by experienced art instructors. From painting to pottery, children discover their creative potential in our well-equipped studio.",
    features: ["Professional guidance", "Various materials", "Creative expression", "Take-home creations"],
    image: artsCrafts,
    icon: "🎨"
  },
  {
    id: 5,
    title: "Educational Workshops",
    description: "Fun learning sessions covering science, nature, and cultural topics designed to spark curiosity and love for learning. Hands-on experiments and interactive demonstrations make complex concepts accessible and exciting.",
    features: ["STEM activities", "Nature exploration", "Cultural learning", "Hands-on experiments"],
    image: educationalWorkshops,
    icon: "🔬"
  },
  {
    id: 6,
    title: "Outdoor Exploration",
    description: "Guided nature walks and outdoor activities that teach children about the environment while having fun in safe, controlled settings. Children connect with nature while learning about ecosystems and environmental stewardship.",
    features: ["Nature education", "Guided exploration", "Outdoor safety", "Environmental awareness"],
    image: outdoorExploration,
    icon: "🌳"
  }
];

const KidsActivityZone: React.FC = () => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which activities are currently displayed
  const displayedActivities = useMemo(() => {
    return showAllActivities ? kidsActivities : kidsActivities.slice(0, 3);
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
                Kids Paradise
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
              <span className="bg-linear-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kids Activity Zone
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Where imagination meets adventure in a safe, supervised environment
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Our dedicated Kids Activity Zone offers a world of fun, learning, and adventure for children of all ages. 
              From creative arts to educational games, every activity is designed to spark imagination while ensuring 
              complete safety under professional supervision.
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
      {kidsActivities.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllActivities ? 'Show Less Activities' : `View All ${kidsActivities.length} Activities`}
            </motion.button>
          </div>
        </section>
      )}

      {/* Video Section - Only show when viewing all activities */}
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
                <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  See the Magic Unfold
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                Watch our young adventurers explore, learn, and create unforgettable memories
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
                poster={kidsFallback}
              >
                <source src={kidsVideo} type="video/mp4" />
                <Image
                  src={kidsFallback}
                  loading='lazy'
                  alt="Kids Activity Zone Video"
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
                  <span className="text-emerald-300 text-xs md:text-sm font-medium">Live Experience</span>
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
              <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Ready for Adventure?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional supervision, age-appropriate activities, and endless fun guaranteed.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-slate-400 text-sm">Professional Supervision</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-slate-400 text-sm">Age-Appropriate Activities</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎓</div>
                <p className="text-slate-400 text-sm">Educational & Fun</p>
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
  activity: typeof kidsActivities[0];
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
            <div className="text-emerald-400 font-light tracking-widest text-sm uppercase mb-2">
              Activity {index + 1}
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
            <span className="text-emerald-300 text-sm font-medium">Featured Activity</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KidsActivityZone;