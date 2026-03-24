"use client";

import React from "react";
import { Crown, Wallet, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const highlightsData = [
  {
    icon: Crown,
    title: "Not an Aggregator",
    description:
      "Take control of your business with Towner. You are the Boss of your business.",
    color: "from-[#8dc720] to-green-600",
    delay: 0.1,
  },
  {
    icon: Wallet,
    title: "Affordable SaaS",
    description: "Access professional business management tools.",
    color: "from-green-400 to-[#8dc720]",
    delay: 0.2,
  },
  {
    icon: LineChart,
    title: "Transparent Pricing",
    description: "Say goodbye to surge fees and hidden costs.",
    color: "from-[#8dc720] to-green-600",
    delay: 0.3,
  },
  {
    icon: Users,
    title: "Direct Connections",
    description:
      "Build relationships with your customers, without intermediaries.",
    color: "from-green-400 to-[#8dc720]",
    delay: 0.4,
  },
];

const Highlights = () => {
  return (
    <section className=" py-5 md:py-24  relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Towner is <span className="text-[#8dc720]">Different</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Experience a revolutionary approach to managing your taxi business
          </p>
          <svg width="100" height="20" viewBox="0 0 100 20" className="mx-auto">
            <path
              d="M0 10 Q50 0 100 10"
              stroke="#a8ff01"
              strokeWidth="3.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Hexagon Grid */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-4 max-w-7xl mx-auto">
          {highlightsData.map((item, index) => (
            <div key={index} className="group relative w-full md:w-72 max-w-sm mx-auto">
              <div className=" hidden md:block absolute inset-0 bg-gradient-to-br from-[#a8ff01] to-[#679415] rounded-[32px] rotate-45 group-hover:rotate-[35deg] transition-transform duration-300" />
              <div className="relative bg-white p-6 rounded-[32px] border border-gray-100 shadow-lg group-hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 -rotate-12 group-hover:rotate-0 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-[#8dc720]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>

                {/* Connecting Lines */}
                <div className="absolute -inset-4 border-2 border-dashed border-green-200 rounded-[40px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-br from-green-50 to-transparent opacity-50 blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default Highlights;
