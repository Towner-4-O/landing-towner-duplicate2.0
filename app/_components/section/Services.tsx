'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Users, Receipt, Handshake, Clock, DollarSign, Shield, BadgeCheck } from 'lucide-react'

const serviceData = {
  owners: [
    {
      icon: Car,
      title: "Business Management Tools",
      description: "Manage fares, track earnings, and ensure compliance."
    },
    {
      icon: Receipt,
      title: "Transparent Pricing",
      description: "Operate with government-regulated rates and zero hidden fees."
    },
    {
      icon: Shield,
      title: "Invoice Management",
      description: "Generate and track invoices with ease."
    },
    {
      icon: Handshake,
      title: "Direct Customer Connections",
      description: "Build long-term relationships with riders without platform interference."
    }
  ],
  commuters: [
    {
      icon: Clock,
      title: "Flexible Booking Options",
      description: "Hail a ride on the street or book through the OIOT app."
    },
    {
      icon: DollarSign,
      title: "No Surge Pricing",
      description: "Enjoy fair fares at all times."
    },
    {
      icon: BadgeCheck,
      title: "Transparent Transactions",
      description: "Direct payments with no hidden charges."
    },
    {
      icon: Users,
      title: "Reliable Rides",
      description: "Partnered with government-regulated and monitored services."
    }
  ]
}

const Services = () => {
  const [activeTab, setActiveTab] = useState<'owners' | 'commuters'>('owners')

  return (
    <section className="py-5 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Our <span className="text-[#8dc720]">Services</span>
          </h2>
          <div className="w-24 h-1 bg-[#8dc720] mx-auto rounded-full" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-16">
          {['owners', 'commuters'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'owners' | 'commuters')}
              className={`px-8 py-4 rounded-xl md:rounded-full text-sm md:text:lg font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[#8dc720] text-white shadow-lg shadow-[#8dc720]/20'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              For {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {serviceData[activeTab].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[180px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8dc720]/5 to-transparent rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2" />
              <div className="relative h-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#8dc720]/10 flex items-center justify-center group-hover:bg-[#8dc720]/20 transition-colors">
                    <service.icon className="w-6 h-6 text-[#8dc720]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services