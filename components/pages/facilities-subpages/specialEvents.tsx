'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Static images for special events
const mountainWedding = '/images/facilities/special-events/mountain-wedding.jpg';
const traditionalConcert = '/images/facilities/special-events/traditional-concert.jpg';
const attan = '/images/facilities/special-events/attan.jpg';
const mouSigning = '/images/facilities/special-events/mou-signing.jpg';
const bonfire = '/images/facilities/special-events/bonfire-night.jpg';
const seasonalAdventure = '/images/facilities/special-events/seasonal-adventure.jpg';
const foodFestival = '/images/facilities/special-events/food-festival.jpg';
const specialEventsVideo = '/videos/special-events.mp4';
const specialEventsFallback = '/images/facilities/special-events/mountain-wedding.jpg';

// Special events data
const specialEvents = [
  {
    id: 1,
    title: "Mountain Destination Weddings",
    description: "Exchange vows amidst the breathtaking beauty of Malam Jabba's majestic mountains. Our destination wedding packages offer complete event planning, traditional KPK wedding rituals, luxury accommodations, and stunning outdoor ceremony setups with panoramic mountain views. Create unforgettable memories in nature's grand cathedral.",
    features: ["Complete wedding planning", "Traditional KPK rituals", "Luxury accommodations", "Mountain ceremony setups"],
    image: mountainWedding,
    icon: "💍",
    eventType: "Wedding",
    season: "All Seasons",
    capacity: "50-300 Guests"
  },
  {
    id: 2,
    title: "Traditional KPK Attan Concerts",
    description: "Experience the electrifying energy of traditional Khattak Attan dance performances under the stars. Our cultural concerts feature professional dance troupes, live folk music, traditional drummers, and audience participation sessions. A vibrant celebration of Pashtun culture and heritage.",
    features: ["Professional Attan troupes", "Live folk music", "Traditional drummers", "Audience participation"],
    image: attan,
    icon: "💃",
    eventType: "Cultural",
    season: "Spring & Summer",
    capacity: "200-1000 Guests"
  },
  {
    id: 3,
    title: "Travel Partnerships MOU Signing",
    description: "Host your corporate partnership signings and business meetings in our sophisticated conference facilities with mountain views. We provide state-of-the-art AV equipment, professional event coordination, and luxurious networking spaces for successful business collaborations in an inspiring environment.",
    features: ["Conference facilities", "AV equipment", "Event coordination", "Networking spaces"],
    image: mouSigning,
    icon: "📝",
    eventType: "Corporate",
    season: "All Year",
    capacity: "20-100 Delegates"
  },
  {
    id: 4,
    title: "Mountain Bonfire Nights",
    description: "Gather around crackling bonfires under the starry mountain sky for unforgettable evenings of storytelling, traditional music, and authentic barbecue. Our bonfire events feature local storytellers, musical performances, and delicious traditional cuisine in cozy outdoor settings.",
    features: ["Traditional storytelling", "Live music performances", "Authentic barbecue", "Stargazing sessions"],
    image: bonfire,
    icon: "🔥",
    eventType: "Social",
    season: "Autumn & Winter",
    capacity: "30-150 Guests"
  },
  {
    id: 5,
    title: "Seasonal Adventure Competitions",
    description: "Participate in thrilling seasonal adventure competitions including mountain biking races, trekking challenges, skiing tournaments, and photography contests. Each season brings new competitive events with professional organization, safety measures, and exciting prizes for winners.",
    features: ["Skiing tournaments", "Trekking challenges", "Photography contests", "Professional organization"],
    image: seasonalAdventure,
    icon: "🏆",
    eventType: "Sports",
    season: "Seasonal",
    capacity: "50-500 Participants"
  },
  {
    id: 6,
    title: "Mountain Food & Music Festival",
    description: "Savor the flavors of KPK at our mountain food festival featuring local chefs, traditional recipes, live cooking demonstrations, and musical performances. A gastronomic journey through Pashtun cuisine accompanied by soulful mountain melodies.",
    features: ["Local chef demonstrations", "Traditional recipes", "Live cooking shows", "Musical performances"],
    image: foodFestival,
    icon: "🍲",
    eventType: "Food & Music",
    season: "Summer",
    capacity: "100-800 Guests"
  },
  {
  id: 7,
  title: "Concerts",
  description: "An intimate concert series showcasing the soulful music of KPK. Featuring masterful Rubab and Tabla performances intertwined with vibrant folk dances, these nights are a deep dive into the region's rich musical heritage.",
  features: ["Live Rubab & Tabla Sets", "Folk Dance Interludes", "Renowned Local Artists", "Acoustic Mountain Setting"],
  image: traditionalConcert,
  icon: "🎵",
  eventType: "Concert",
  season: "All Seasons",
  capacity: "50-300 Guests"
 }
];

const SpecialEvents: React.FC = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Which events are currently displayed
  const displayedEvents = useMemo(() => {
    return showAllEvents ? specialEvents : specialEvents.slice(0, 3);
  }, [showAllEvents]);

  // Toggle handler
  const toggleShowAll = () => {
    setShowAllEvents(!showAllEvents);
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
                Unforgettable Experiences
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
                Special Events
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6"
            >
              Celebrate life's special moments amidst the majestic mountains of Malam Jabba
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              From dream mountain weddings and traditional Attan concerts to corporate retreats and cultural festivals, 
              our special events are designed to create unforgettable memories. Experience the perfect blend of natural 
              beauty and cultural richness in every celebration.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Event Sections - Compact */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {displayedEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View More/Less Button - Compact */}
      {specialEvents.length > 3 && (
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40"
            >
              {showAllEvents ? 'Show Less Events' : `View All ${specialEvents.length} Special Events`}
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
                Moments to Remember
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Watch how we transform ordinary moments into extraordinary memories in the heart of Malam Jabba
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
              poster={specialEventsFallback}
            >
              <source src={specialEventsVideo} type="video/mp4" />
              <Image
                src={specialEventsFallback}
                loading='lazy'
                alt="Special Events Video"
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
                <span className="text-emerald-300 text-xs md:text-sm font-medium">Event Highlights</span>
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
                Plan Your Special Event
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let us help you create unforgettable memories in the majestic mountains of Malam Jabba. 
              From intimate gatherings to grand celebrations, we handle every detail with perfection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/event-planning">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl border-2 border-emerald-400/40 w-full sm:w-auto"
                >
                  Plan Your Event
                </motion.button>
              </Link>
              <Link href="/event-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  View Event Gallery
                </motion.button>
              </Link>
              <Link href="/contact-events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 md:px-12 py-4 border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-xl hover:border-emerald-400 hover:text-emerald-400 w-full sm:w-auto"
                >
                  Contact Event Team
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
                <div className="text-2xl mb-2">💍</div>
                <p className="text-slate-400 text-sm">Wedding Planning</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎪</div>
                <p className="text-slate-400 text-sm">Cultural Events</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">👔</div>
                <p className="text-slate-400 text-sm">Corporate Events</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎵</div>
                <p className="text-slate-400 text-sm">Music & Dance</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Event Card Component - Compact
interface EventCardProps {
  event: typeof specialEvents[0];
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
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
          <div className="text-3xl">{event.icon}</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">
                {event.eventType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-400 text-sm">{event.season}</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 text-sm">{event.capacity}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {event.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-300">Event Features:</h3>
          <div className="grid grid-cols-1 gap-2">
            {event.features.map((feature, featureIndex) => (
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
              src={event.image}
              alt={event.title}
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
            <span className="text-emerald-300 text-sm font-medium">{event.eventType}</span>
          </div>

          {/* Season Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
              <span className="text-white text-xs font-medium">📅 {event.season}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SpecialEvents;