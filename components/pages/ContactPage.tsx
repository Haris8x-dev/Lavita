"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
  };

  // Contact information
  const contactInfo = [
    {
      id: 'address',
      title: 'Visit Us',
      description: 'Malam Jabba Road, Swat Valley',
      details: 'Khyber Pakhtunkhwa, Pakistan',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'phone',
      title: 'Call Us',
      description: '+92 123 456 7890',
      details: 'Mon - Sun, 8:00 AM - 10:00 PM',
      href: 'tel:+921234567890',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'email',
      title: 'Email Us',
      description: 'info@lavitamalamjabba.com',
      details: 'We respond within 24 hours',
      href: 'mailto:info@lavitamalamjabba.com',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Social Media Links
  const socialLinks = [
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://facebook.com/lavitamalamjabba',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'hover:bg-blue-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://instagram.com/lavitamalamjabba',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297zm8.062-5.598c0 .683-.554 1.237-1.237 1.237s-1.237-.554-1.237-1.237c0-.683.554-1.237 1.237-1.237s1.237.554 1.237 1.237zm2.323-4.553c0 .683-.554 1.237-1.237 1.237s-1.237-.554-1.237-1.237c0-.683.554-1.237 1.237-1.237s1.237.554 1.237 1.237z"/>
        </svg>
      ),
      color: 'hover:bg-pink-600'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      url: 'https://twitter.com/lavitamalamjabba',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'hover:bg-blue-400'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/lavitamalamjabba',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: 'hover:bg-red-600'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Reservation Request',
    'Group Booking',
    'Event Planning',
    'Spa & Wellness',
    'Adventure Activities',
    'Dining Reservations',
    'Other'
  ];

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
            <span className="text-emerald-400 font-light tracking-widest text-xs md:text-sm uppercase">Get In Touch</span>
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Lavita Malam Jabba
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Ready to experience luxury in the heart of Swat Valley? Reach out to us for reservations, 
            inquiries, or to plan your perfect mountain getaway.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Left Side - Contact Information & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-1 space-y-6 md:space-y-8"
          >
            {/* Contact Information Cards */}
            <div className="space-y-4 md:space-y-6 mb-20">
              <h2 className="text-xl md:text-2xl font-bold text-white">Contact Information</h2>
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30 hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base md:text-lg mb-1">{item.title}</h3>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="text-emerald-400 font-medium text-sm md:text-base hover:text-emerald-300 transition-colors block mb-1 break-words"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <p className="text-emerald-400 font-medium text-sm md:text-base mb-1">{item.description}</p>
                      )}
                      <p className="text-slate-400 text-xs md:text-sm">{item.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30">
              <h3 className="text-white font-semibold text-lg md:text-xl mb-4 md:mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-3 md:p-4 bg-slate-700/50 rounded-lg md:rounded-xl border border-slate-600 hover:border-emerald-400/50 transition-all duration-300 ${social.color} hover:scale-105`}
                  >
                    <div className="text-white group-hover:text-white mb-2">
                      {social.icon}
                    </div>
                    <span className="text-xs md:text-sm text-slate-300 group-hover:text-white text-center">
                      {social.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Contact
            <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30">
              <h3 className="text-white font-semibold text-lg md:text-xl mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <motion.button
                  className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-300 text-sm md:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📞 Call Now
                </motion.button>
                <motion.button
                  className="w-full py-3 border border-emerald-400 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-400/10 transition-all duration-300 text-sm md:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  💬 WhatsApp
                </motion.button>
              </div>
            </div> */}
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-linear-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-emerald-400/30 shadow-2xl shadow-emerald-500/20">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Send us a Message</h2>
              <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 text-sm md:text-base"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 text-sm md:text-base"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 text-sm md:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 text-sm md:text-base"
                      placeholder="+92 123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 text-sm md:text-base"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 border border-slate-600 rounded-lg md:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-200 resize-none text-sm md:text-base"
                    placeholder="Tell us about your inquiry, special requests, or any questions you might have..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 border-2 border-emerald-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm md:text-base">Sending Message...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
      </div>
    </div>
  );
};

export default ContactPage;