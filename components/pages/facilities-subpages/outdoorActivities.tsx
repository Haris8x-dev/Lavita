'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for outdoor activities
const jeepRide = '/images/facilities/outdoor-activities/jeep-ride.jpg';
const skiing = '/images/facilities/outdoor-activities/skiing.jpg';
const chairLift = '/images/facilities/outdoor-activities/chairlift.jpg';
const horseRiding = '/images/facilities/outdoor-activities/horse-riding.jpg';
const zipLining = '/images/facilities/outdoor-activities/zipline.jpg';
const hiking = '/images/facilities/outdoor-activities/hiking.jpg';
const snowTubing = '/images/facilities/outdoor-activities/snow-tubing.jpg';
const snowWalk = '/images/facilities/outdoor-activities/snow-walk.jpg';
const forestTherapy = '/images/facilities/outdoor-activities/forest-therapy.jpg';
const snowboarding = '/images/facilities/outdoor-activities/snowboarding.jpg';
const mountainClimbing = '/images/facilities/outdoor-activities/mountain-climbing.jpg';
const outdoorVideo = '/videos/outdoor-activity.mp4';
const outdoorFallback = '/images/facilities/outdoor-activities/jeep-ride.jpg';

// Outdoor activities data
const outdoorActivities = [
  {
    id: 1,
    title: "Jeep Forest Adventure",
    description: "Embark on an exhilarating jeep ride through dense forests and rugged mountain trails. Our experienced drivers navigate challenging terrain while you enjoy breathtaking views of Malam Jabba's wilderness. Perfect for adventure seekers and nature lovers looking for an exciting off-road experience.",
    features: ["Off-road adventure", "Experienced drivers", "Forest exploration", "Mountain trails"],
    image: jeepRide,
    icon: "🚙",
    activityType: "Adventure",
    season: "All Seasons",
    intensity: "Moderate"
  },
  {
    id: 2,
    title: "Alpine Skiing",
    description: "Experience world-class skiing on Malam Jabba's pristine slopes. With varying difficulty levels from beginner to expert, our ski resort offers perfectly groomed trails and professional instructors. Equipment rental and lessons available for all skill levels.",
    features: ["Varied difficulty levels", "Professional instructors", "Equipment rental", "Groomed trails"],
    image: skiing,
    icon: "⛷️",
    activityType: "Winter Sports",
    season: "Winter",
    intensity: "Beginner to Expert"
  },
  {
    id: 3,
    title: "Scenic Chair Lift",
    description: "Soar above the stunning landscape in our comfortable chair lifts offering panoramic views of Malam Jabba valley. The ride provides access to hiking trails, skiing areas, and breathtaking viewpoints perfect for photography and nature appreciation.",
    features: ["Panoramic views", "Mountain access", "Photography opportunities", "Comfortable ride"],
    image: chairLift,
    icon: "🚡",
    activityType: "Sightseeing",
    season: "All Seasons",
    intensity: "Easy"
  },
  {
    id: 4,
    title: "Horse Riding",
    description: "Explore scenic mountain trails on horseback with our gentle, well-trained horses. Guided tours take you through beautiful landscapes, traditional villages, and forest paths. Suitable for riders of all experience levels with safety equipment provided.",
    features: ["Guided tours", "Trained horses", "Scenic trails", "All experience levels"],
    image: horseRiding,
    icon: "🐎",
    activityType: "Equestrian",
    season: "Spring to Autumn",
    intensity: "Easy to Moderate"
  },
  {
    id: 5,
    title: "Zip Lining",
    description: "Experience the ultimate adrenaline rush with our high-speed zip line courses flying over valleys and forests. Our certified safety systems and professional guides ensure an exciting yet secure adventure through Malam Jabba's spectacular landscape.",
    features: ["High-speed courses", "Certified safety", "Valley views", "Professional guides"],
    image: zipLining,
    icon: "🪂",
    activityType: "Adventure",
    season: "Spring to Autumn",
    intensity: "Moderate to High"
  },
  {
    id: 6,
    title: "Mountain Hiking Trails",
    description: "Discover Malam Jabba's natural beauty through our network of well-marked hiking trails. From gentle walks to challenging climbs, our routes offer stunning views, diverse flora and fauna, and opportunities to connect with nature at your own pace.",
    features: ["Well-marked trails", "Diverse difficulty", "Nature observation", "Guided options"],
    image: hiking,
    icon: "🥾",
    activityType: "Hiking",
    season: "All Seasons",
    intensity: "Easy to Challenging"
  },
  {
    id: 7,
    title: "Snow Tubing Fun",
    description: "Enjoy family-friendly winter fun with our snow tubing lanes. Perfect for all ages, this activity requires no special skills - just sit back and slide down specially designed snow channels. A safe and exciting way to experience winter sports.",
    features: ["Family-friendly", "No skills required", "Safe channels", "All ages welcome"],
    image: snowTubing,
    icon: "🛷",
    activityType: "Winter Sports",
    season: "Winter",
    intensity: "Easy"
  },
  {
    id: 8,
    title: "Guided Snow Walks",
    description: "Experience the magical winter landscape with guided snow walks through pristine snow-covered forests. Our knowledgeable guides share insights about winter ecology while you enjoy the serene beauty of Malam Jabba in its winter glory.",
    features: ["Knowledgeable guides", "Winter ecology", "Serene landscapes", "Photography spots"],
    image: snowWalk,
    icon: "🚶‍♂️",
    activityType: "Winter Exploration",
    season: "Winter",
    intensity: "Easy"
  },
  {
    id: 9,
    title: "Forest Therapy Sessions",
    description: "Reconnect with nature through guided forest therapy sessions (Shinrin-yoku). These mindful walks through ancient forests help reduce stress, improve mood, and enhance overall wellbeing through sensory engagement with the natural environment.",
    features: ["Mindful walks", "Stress reduction", "Sensory engagement", "Wellbeing focus"],
    image: forestTherapy,
    icon: "🌳",
    activityType: "Wellness",
    season: "All Seasons",
    intensity: "Easy"
  },
  {
    id: 10,
    title: "Snowboarding Thrills",
    description: "Carve through fresh powder on our snowboarding slopes designed for all skill levels. From gentle slopes for beginners to challenging terrain parks for experts, our facilities offer the perfect conditions for snowboarding enthusiasts.",
    features: ["All skill levels", "Terrain parks", "Fresh powder", "Equipment rental"],
    image: snowboarding,
    icon: "🏂",
    activityType: "Winter Sports",
    season: "Winter",
    intensity: "Beginner to Expert"
  },
  {
    id: 11,
    title: "Mountain Climbing Expeditions",
    description: "Challenge yourself with guided mountain climbing expeditions to Malam Jabba's peaks. Our certified guides provide technical instruction, safety equipment, and route planning for climbers seeking to conquer new heights in the Himalayan range.",
    features: ["Certified guides", "Technical instruction", "Safety equipment", "Peak expeditions"],
    image: mountainClimbing,
    icon: "🧗",
    activityType: "Climbing",
    season: "Spring to Autumn",
    intensity: "Advanced"
  }
];

const OutdoorActivities: React.FC = () => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which activities are currently displayed
  const displayedActivities = useMemo(() => {
    return showAllActivities ? outdoorActivities : outdoorActivities.slice(0, 3);
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
                Mountain Adventures
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
                Outdoor Activities
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Experience thrilling adventures and serene nature exploration in Malam Jabba's breathtaking landscape
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              From adrenaline-pumping winter sports to peaceful forest therapy, our outdoor activities 
              cater to all adventure levels. Discover the natural wonders of Malam Jabba through guided 
              adventures and independent exploration in this mountain paradise.
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
      {outdoorActivities.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllActivities ? 'Show Less Activities' : `View All ${outdoorActivities.length} Activities`}
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
                Adventure Awaits
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Discover the thrill of outdoor adventures in Malam Jabba's spectacular natural playground
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
              poster={outdoorFallback}
            >
              <source src={outdoorVideo} type="video/mp4" />
              <Image
                src={outdoorFallback}
                loading='lazy'
                alt="Outdoor Activities Video"
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
                <span className="text-emerald-300 text-xs md:text-sm font-medium">Adventure Preview</span>
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
                Ready for Adventure?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book your outdoor adventure today and experience the thrill of Malam Jabba's natural wonders. 
              From gentle nature walks to extreme sports, we have activities for every adventure level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/outdoor-booking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Book Adventure
                </motion.button>
              </Link>
              <Link href="/outdoor-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Gallery
                </motion.button>
              </Link>
              <Link href="/contact-adventure">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Get Guidance
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
                <div className="text-2xl mb-2">⛷️</div>
                <p className="text-slate-400 text-sm">Winter Sports</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🚙</div>
                <p className="text-slate-400 text-sm">Adventure Rides</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🥾</div>
                <p className="text-slate-400 text-sm">Hiking Trails</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🌳</div>
                <p className="text-slate-400 text-sm">Nature Therapy</p>
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
  activity: typeof outdoorActivities[0];
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
              <span className="text-orange-400 text-sm">{activity.season}</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{activity.intensity}</span>
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

          {/* Season Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">📅 {activity.season}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OutdoorActivities;