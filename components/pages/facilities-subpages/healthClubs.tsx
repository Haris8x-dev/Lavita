'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for health clubs
const mainGym = '/images/facilities/health-clubs/main-gym.jpg';
const yogaStudio = '/images/facilities/health-clubs/yoga-studio.jpg';
const cardioZone = '/images/facilities/health-clubs/cardio-zone.jpg';
const groupFitness = '/images/facilities/health-clubs/group.jpg';
const lockers = '/images/facilities/health-clubs/lockers.jpg';
const wellnessArea = '/images/facilities/health-clubs/wellness-area.jpg';
const healthClubVideo = '/videos/healthClubs.mp4';
const healthClubFallback = '/images/facilities/health-clubs/main-gym.jpg';

// Health club facilities data
const healthClubFacilities = [
  {
    id: 1,
    title: "State-of-the-Art Gym",
    description: "Our premium gym features the latest fitness equipment from leading brands. With dedicated zones for cardio, strength training, and functional fitness, you'll find everything you need for a complete workout. Our spacious layout and natural mountain views create an inspiring environment for your fitness journey.",
    features: ["Latest fitness equipment", "Cardio & strength zones", "Functional training area", "Professional guidance"],
    image: mainGym,
    icon: "💪",
    facilityType: "Fitness",
    intensity: "All Levels",
    availability: "6 AM - 10 PM"
  },
  {
    id: 2,
    title: "Serene Yoga & Meditation Studio",
    description: "Find your inner peace in our dedicated yoga studio with panoramic mountain views. Our tranquil space is perfect for yoga, meditation, and mindfulness practices. With natural lighting, peaceful ambiance, and professional instructors, you can deepen your practice and achieve mental clarity.",
    features: ["Panoramic mountain views", "Professional yoga instructors", "Meditation sessions", "Various yoga styles"],
    image: yogaStudio,
    icon: "🧘",
    facilityType: "Wellness",
    intensity: "Gentle to Advanced",
    availability: "Scheduled Classes"
  },
  {
    id: 3,
    title: "Cardio Training Zone",
    description: "Elevate your heart rate in our comprehensive cardio zone featuring treadmills, ellipticals, stationary bikes, and rowing machines. Each machine is equipped with personal entertainment systems and heart rate monitoring to keep you motivated and track your progress effectively.",
    features: ["Treadmills & ellipticals", "Heart rate monitoring", "Entertainment systems", "Personalized programs"],
    image: cardioZone,
    icon: "🏃",
    facilityType: "Cardio",
    intensity: "Customizable",
    availability: "6 AM - 10 PM"
  },
  {
    id: 4,
    title: "Group Fitness Classes",
    description: "Join our dynamic group fitness classes designed to keep you motivated and engaged. From high-intensity interval training to dance fitness and spinning, our diverse class schedule offers something for everyone. Experience the energy of group workouts in our specially designed studio.",
    features: ["HIIT classes", "Dance fitness", "Spinning sessions", "Diverse schedule"],
    image: groupFitness,
    icon: "👥",
    facilityType: "Group Fitness",
    intensity: "Various Levels",
    availability: "Scheduled Timings"
  },
  {
    id: 5,
    title: "Nutrition & Wellness Counseling",
    description: "Complement your fitness journey with professional nutrition and wellness guidance. Our certified nutritionists provide personalized diet plans, supplement advice, and lifestyle recommendations to help you achieve optimal health and fitness results.",
    features: ["Nutritionist consultations", "Diet plans", "Supplement guidance", "Lifestyle coaching"],
    image: wellnessArea,
    icon: "🥗",
    facilityType: "Nutrition",
    intensity: "Educational",
    availability: "By Appointment"
  },
  {
    id: 6,
    title: "Locker Rooms & Amenities",
    description: "Enjoy premium locker room facilities with spacious changing areas, steam rooms, saunas, and towel service. Our well-maintained amenities ensure your comfort and convenience before and after your workout sessions.",
    features: ["Spacious lockers", "Steam rooms", "Sauna facilities", "Towel service"],
    image: lockers,
    icon: "🚿",
    facilityType: "Amenities",
    intensity: "Comfort",
    availability: "6 AM - 10 PM"
  }
];

const HealthClubs: React.FC = () => {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which facilities are currently displayed
  const displayedFacilities = useMemo(() => {
    return showAllFacilities ? healthClubFacilities : healthClubFacilities.slice(0, 3);
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
                Fitness & Wellness
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
                Health Clubs
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Comprehensive fitness facilities with state-of-the-art equipment and professional guidance
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              From high-intensity gym workouts to peaceful yoga sessions, our health clubs offer everything 
              you need for your fitness journey. Experience professional training, modern equipment, and 
              wellness services in an inspiring mountain environment.
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
      {healthClubFacilities.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllFacilities ? 'Show Less Facilities' : `View All ${healthClubFacilities.length} Facilities`}
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
                Transform Your Fitness
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Discover our comprehensive health club facilities designed for all fitness levels and goals
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
              poster={healthClubFallback}
            >
              <source src={healthClubVideo} type="video/mp4" />
              <Image
                src={healthClubFallback}
                loading='lazy'
                alt="Health Clubs Video"
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
                Start Your Fitness Journey
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our health club today and experience professional fitness facilities, expert guidance, 
              and a supportive community dedicated to helping you achieve your wellness goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/membership">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Join Health Club
                </motion.button>
              </Link>
              <Link href="/fitness-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Facility Gallery
                </motion.button>
              </Link>
              <Link href="/contact-fitness">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Book Free Tour
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
                <div className="text-2xl mb-2">💪</div>
                <p className="text-slate-400 text-sm">Modern Gym</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🧘</div>
                <p className="text-slate-400 text-sm">Yoga Studio</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <p className="text-slate-400 text-sm">Personal Training</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">💆</div>
                <p className="text-slate-400 text-sm">Recovery Zone</p>
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
  facility: typeof healthClubFacilities[0];
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
              <span className="text-orange-400 text-sm">{facility.intensity}</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{facility.availability}</span>
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

          {/* Intensity Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">⚡ {facility.intensity}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HealthClubs;