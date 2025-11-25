"use client"

import React, { useState } from 'react';
import {
  User,
  Calendar,
  Ticket,
  Gift,
  Settings,
  LogOut,
  Bell,
  Star,
  Clock,
  MapPin
} from 'lucide-react';

const MemberPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [member] = useState({
    name: 'Ahmed Khan',
    tier: 'Premium Member',
    memberSince: '2023',
    points: 1250,
    guestPasses: 2
  });

  const upcomingBookings = [
    {
      id: 1,
      event: "Traditional Music & Dance Nights",
      date: "Dec 15, 2024",
      time: "7:00 PM",
      guests: 3,
      status: "Confirmed"
    },
    {
      id: 2,
      event: "Mountain Fine Dining Experience",
      date: "Dec 20, 2024",
      time: "8:00 PM",
      guests: 2,
      status: "Confirmed"
    }
  ];

  const memberBenefits = [
    {
      icon: <Ticket className="w-6 h-6" />,
      title: 'Available Tickets',
      count: '4',
      action: 'Book Now'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Guest Passes',
      count: member.guestPasses.toString(),
      action: 'Manage'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Reward Points',
      count: member.points.toString(),
      action: 'Redeem'
    }
  ];

  const quickActions = [
    { icon: <Calendar />, label: 'Book Event', color: 'bg-blue-500' },
    { icon: <Ticket />, label: 'My Tickets', color: 'bg-green-500' },
    { icon: <Gift />, label: 'Guest Passes', color: 'bg-purple-500' },
    { icon: <User />, label: 'Profile', color: 'bg-amber-500' }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {member.name}! 👑
        </h2>
        <p className="text-gray-300">
          Your {member.tier} privileges are active. You have {member.guestPasses} guest passes available.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {memberBenefits.map((benefit, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="text-amber-400">{benefit.icon}</div>
              <span className="text-2xl font-bold text-white">{benefit.count}</span>
            </div>
            <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
            <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
              {benefit.action} →
            </button>
          </div>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Upcoming Bookings</h3>
          <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{booking.event}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {booking.date} at {booking.time}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {booking.guests} guests
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {booking.status}
                </span>
                <button className="block text-amber-400 hover:text-amber-300 text-sm mt-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-amber-400/30"
            >
              <div className={`${action.color} p-3 rounded-lg mb-2`}>
                {action.icon}
              </div>
              <span className="text-white text-sm font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Member Portal</h1>
            <p className="text-gray-400">Welcome to your exclusive club experience</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors border border-white/20 rounded-lg">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-amber-400 text-sm">{member.tier}</p>
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                <p>Member since {member.memberSince}</p>
                <p className="mt-1">{member.points} reward points</p>
              </div>
            </div>

            <nav className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <User className="w-5 h-5" /> },
                { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-5 h-5" /> },
                { id: 'tickets', label: 'My Tickets', icon: <Ticket className="w-5 h-5" /> },
                { id: 'benefits', label: 'Member Benefits', icon: <Gift className="w-5 h-5" /> },
                { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-200 mb-2 ${
                    activeTab === item.id
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-h-[600px]">
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'bookings' && (
                <div className="text-center text-gray-400 py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
                  <p>Your booking history and upcoming reservations will appear here.</p>
                </div>
              )}
              {/* Add other tab contents as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;