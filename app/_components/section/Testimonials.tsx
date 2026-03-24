"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonialData = [
  {
    name: "Ravi Kumar",
    role: "Auto Owner",
    image: "/assets/users/user3.jpeg",
    quote:
      "Towner gave me the freedom to run my taxi business without worrying about platform commissions. My earnings are mine, and I couldn't be happier!",
  },
  {
    name: "Priya Shah",
    role: "Commuter",
    image: "/assets/users/user2.jpg",
    quote:
      "Finally, a service that works for both drivers and riders. Transparent pricing and no hidden fees make Towner the best option for everyone!",
  },
  {
    name: "Karthik Reddy",
    role: "Taxi Driver",
    image: "/assets/users/user1.jpeg",
    quote:
      "I've been using Towner for months now, and it's completely transformed how I operate. The tools are easy to use, and I feel like I have full control of my business.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />

      {/* Large Quote Mark Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
        <Quote className="w-96 h-96 text-[#8dc720] rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our <span className="text-[#8dc720]">Users</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Real stories from real users who have transformed their business
            with Towner
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {testimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#8dc720]/10 rounded-full blur-2xl group-hover:bg-[#8dc720]/20 transition-all duration-500" />

              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-[#8dc720]/20 mb-6" />

              {/* Testimonial Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#8dc720] text-[#8dc720]"
                  />
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
