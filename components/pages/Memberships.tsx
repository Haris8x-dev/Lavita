"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Memberships: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'gold'>('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const membershipPlans = {
    basic: {
      name: 'Essential',
      description: 'Perfect for solo travelers and short stays',
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        'Luxury Room Accommodation',
        'Complimentary Breakfast',
        'Access to Fitness Center',
        'Wi-Fi Access',
      ],
      color: 'from-slate-600 to-slate-700',
      popular: false
    },
    premium: {
      name: 'Premium',
      description: 'Ideal for couples and extended stays',
      monthlyPrice: 199,
      yearlyPrice: 1999,
      features: [
        'All Essential Features',
        'Deluxe Suite Accommodation',
        'Full Board Meal Plan',
        'Spa Access (2 sessions/month)'
      ],
      color: 'from-emerald-600 to-emerald-700',
      popular: true
    },
    gold: {
      name: 'Elite',
      description: 'Ultimate luxury experience',
      monthlyPrice: 399,
      yearlyPrice: 3999,
      features: [
        'All Premium Features',
        'Executive Suite Accommodation',
        'Personal Butler Service',
        'Unlimited Spa Access',
      ],
      color: 'from-amber-600 to-amber-700',
      popular: false
    }
  };

  const currentPlan = membershipPlans[selectedPlan];
  const savings = billingCycle === 'yearly' ? Math.round((currentPlan.monthlyPrice * 12 - currentPlan.yearlyPrice) / (currentPlan.monthlyPrice * 12) * 100) : 0;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section - More Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent to-emerald-400"></div>
            <span className="text-emerald-400 font-light tracking-widest text-xs uppercase">Exclusive Memberships</span>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent to-emerald-400"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            <span className="bg-linear-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Choose the perfect membership tier to unlock unparalleled luxury and exclusive benefits 
            at Lavita Malam Jabba.
          </motion.p>
        </motion.div>

        {/* Billing Cycle Toggle - More Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl p-1 border border-slate-700/50">
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 text-xs font-medium ${
                  billingCycle === 'monthly'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 text-xs font-medium ${
                  billingCycle === 'yearly'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Yearly
                {savings > 0 && (
                  <span className="ml-1 bg-emerald-400 text-black px-1.5 py-0.5 rounded-full text-[10px]">
                    Save {savings}%
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Compact Membership Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(membershipPlans).map(([key, plan]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + Number(key) * 0.1 }}
              className={`relative ${
                selectedPlan === key 
                  ? 'scale-102 z-10' 
                  : 'hover:scale-101'
              } transition-transform duration-300`}
            >
              {/* Popular Badge - Smaller */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-linear-to-r from-emerald-500 to-green-500 text-white px-4 py-1.5 rounded-full font-semibold text-xs shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Compact Plan Card */}
              <div
                className={`h-full bg-linear-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 ${
                  selectedPlan === key
                    ? 'border-emerald-400 shadow-xl shadow-emerald-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                } transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedPlan(key as any)}
              >
                {/* Plan Header - Compact */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-xs leading-tight">{plan.description}</p>
                </div>

                {/* Price - Compact */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-white">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-slate-400 text-sm">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-emerald-400 text-xs mt-1">
                      Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}
                    </p>
                  )}
                </div>

                {/* Features - More Compact */}
                <div className="space-y-2 mb-6 max-h-32 overflow-y-auto pr-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0 mt-1.5" />
                      <span className="text-slate-300 text-xs leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Compact */}
                <motion.button
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 text-sm ${
                    selectedPlan === key
                      ? 'bg-linear-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg hover:shadow-emerald-500/30'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPlan === key ? 'Selected' : 'Select Plan'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Additional Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-2">All Members Enjoy</h2>
            <p className="text-slate-400 text-sm">Premium benefits included with every membership</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Priority Service',
                description: 'Expedited check-in and support'
              },
              {
                title: 'Flexible Access',
                description: '24/7 facility access'
              },
              {
                title: 'Member Discounts',
                description: 'Exclusive rates'
              },
              {
                title: 'Event Access',
                description: 'Members-only events'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-8 h-8 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                <p className="text-slate-400 text-xs">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compact Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 text-xs">
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
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Memberships;