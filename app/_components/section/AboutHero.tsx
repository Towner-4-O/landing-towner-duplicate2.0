'use client'

import React from 'react'
import { Play } from 'lucide-react'
import { media } from '@/constant'

const AboutHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/aboutvideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/30" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          {/* <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Transforming <span className="text-[#8dc720]">Transportation</span>
         
          </h1> */}

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            Transforming <span className="text-[#8dc720]">Transportation</span>

          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            At Towner, we empower taxi and auto-rickshaw drivers to manage their businesses independently with our SaaS solution, offering flexibility, transparency, and fairness for both drivers and commuters.
          </p>

          <button
            onClick={() => window.open(`${media.YOUTUBE_VIDEO}, '_blank`)}
            className="group flex items-center gap-3 bg-[#8dc720] text-white px-8 py-4 rounded-full hover:bg-[#7ab118] transition-all duration-300">
            <span className="font-medium">Watch More</span>
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

export default AboutHero