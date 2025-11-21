"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Memberships: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'gold'>('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const membershipPlans = {
    basic: {
      name: 'Basic',
      description: 'Perfect for solo travelers and short stays',
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        'Luxury Room Accommodation',
        'Complimentary Breakfast',
        'Access to Fitness Center',
        'Wi-Fi Access',
        'Swimming Pool Access',
        '24/7 Concierge Service'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: '⭐',
      popular: false
    },
    premium: {
      name: 'Premium',
      description: 'Ideal for couples and extended stays with enhanced amenities',
      monthlyPrice: 199,
      yearlyPrice: 1999,
      features: [
        'All Basic Features',
        'Deluxe Suite Accommodation',
        'Full Board Meal Plan',
        'Spa Access (2 sessions/month)',
        'Adventure Activity Discounts',
        'Private Balcony with Mountain View',
        'Priority Restaurant Reservations',
        'Complimentary Airport Transfer'
      ],
      color: 'from-emerald-500 to-green-500',
      icon: '👑',
      popular: true
    },
    gold: {
      name: 'Gold',
      description: 'Ultimate luxury experience with exclusive privileges',
      monthlyPrice: 399,
      yearlyPrice: 3999,
      features: [
        'All Premium Features',
        'Executive Suite Accommodation',
        'Butler Service',
        'Unlimited Spa Access',
        'Private Guided Tours',
        'Helicopter Transfer Service',
        'Fine Dining Experiences',
        'Personalized Adventure Planning',
        'Exclusive Event Access',
        'Luxury Car Service'
      ],
      color: 'from-amber-500 to-yellow-500',
      icon: '💎',
      popular: false
    }
  };

  const currentPlan = membershipPlans[selectedPlan];
  const price = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
  const savings = billingCycle === 'yearly' ? Math.round((currentPlan.monthlyPrice * 12 - currentPlan.yearlyPrice) / (currentPlan.monthlyPrice * 12) * 100) : 0;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
          >
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400"></div>
            <span className="text-emerald-400 font-light tracking-widest text-xs md:text-sm uppercase">Exclusive Memberships</span>
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-4"
          >
            <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Choose the perfect membership tier to unlock unparalleled luxury and exclusive benefits 
            at Lavita Malam Jabba. Your gateway to extraordinary mountain living awaits.
          </motion.p>
        </motion.div>

        {/* Mobile Plan Selection - Only on small screens */}
        <div className="lg:hidden mb-8">
          <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/30">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Select Your Plan</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(membershipPlans).map(([key, plan]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedPlan(key as any)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlan === key
                      ? `border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-500/25`
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-xl mb-1">{plan.icon}</div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-[10px] sm:text-xs bg-emerald-500 text-white px-1 sm:px-2 py-0.5 rounded-full mt-1 inline-block">
                        Popular
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            {/* Desktop Plan Selection - Hidden on mobile */}
            <div className="hidden lg:block space-y-6">
              <h2 className="text-2xl font-bold text-white">Select Your Plan</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(membershipPlans).map(([key, plan]) => (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedPlan(key as any)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedPlan === key
                        ? `border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-500/25`
                        : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{plan.icon}</div>
                      <h3 className="font-semibold text-white mb-1">{plan.name}</h3>
                      {plan.popular && (
                        <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-white font-semibold text-sm md:text-base">Billing Cycle</span>
                {billingCycle === 'yearly' && (
                  <span className="text-emerald-400 text-xs md:text-sm font-medium bg-emerald-400/20 px-2 md:px-3 py-1 rounded-full">
                    Save {savings}%
                  </span>
                )}
              </div>
              <div className="flex bg-slate-700 rounded-lg md:rounded-xl p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-md md:rounded-lg transition-all duration-300 text-xs md:text-sm ${
                    billingCycle === 'monthly'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-md md:rounded-lg transition-all duration-300 text-xs md:text-sm ${
                    billingCycle === 'yearly'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Plan Description */}
            <motion.div
              key={selectedPlan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${currentPlan.color} rounded-xl flex items-center justify-center text-white text-lg md:text-2xl`}>
                  {currentPlan.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{currentPlan.name} Membership</h3>
                  <p className="text-emerald-400 text-xs md:text-sm">{currentPlan.description}</p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <h4 className="text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">What's Included:</h4>
                <div className="max-h-48 md:max-h-64 overflow-y-auto pr-2">
                  {currentPlan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-slate-300 mb-2"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5" />
                      <span className="text-xs md:text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Benefits */}
            <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30">
              <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">All Members Enjoy:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Priority Check-in</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Member Discounts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Exclusive Events</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                  <span>Flexible Cancellation</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Membership Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="sticky top-24 order-1 lg:order-2 mb-6 lg:mb-0"
          >
            <motion.div
              key={selectedPlan}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Membership Card */}
              <div className={`bg-gradient-to-br ${currentPlan.color} rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-emerald-500/25 border-2 border-white/20`}>
                {/* Popular Badge */}
                {currentPlan.popular && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-400 text-black px-4 md:px-6 py-1 md:py-2 rounded-full font-semibold text-xs md:text-sm shadow-lg whitespace-nowrap">
                      🏆 MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="text-3xl md:text-4xl mb-2">{currentPlan.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentPlan.name}</h2>
                  <p className="text-white/80 text-xs md:text-sm">{currentPlan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold">${price}</span>
                    <span className="text-white/60 text-sm md:text-base">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-emerald-200 text-xs md:text-sm mt-2">
                      Save ${currentPlan.monthlyPrice * 12 - currentPlan.yearlyPrice} annually
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full py-3 md:py-4 bg-white text-black font-bold rounded-lg md:rounded-xl hover:shadow-2xl transition-all duration-300 mb-4 md:mb-6 text-sm md:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>

                {/* Quick Features */}
                <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <div className="flex items-center justify-between">
                    <span>Best Value</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((star) => (
                        <div key={star} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Member Satisfaction</span>
                    <span className="text-emerald-200">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Flexibility</span>
                    <span className="text-emerald-200">High</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-linear-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-4 border-2 border-emerald-400/30 shadow-2xl hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white text-xs md:text-sm font-semibold whitespace-nowrap">No Setup Fee</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -top-4 -right-4 bg-linear-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-4 border-2 border-emerald-400/30 shadow-2xl hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white text-xs md:text-sm font-semibold whitespace-nowrap">Cancel Anytime</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 md:mt-8 text-center space-y-3 md:space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-slate-400 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Memberships;