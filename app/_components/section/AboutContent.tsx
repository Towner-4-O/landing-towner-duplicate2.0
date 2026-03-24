'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Users, History, Sparkles } from 'lucide-react'
import { media } from '@/constant'

const AboutContent = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />
      
      <div className="container mx-auto px-4 relative">
        {/* Who We Are Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <Users className="w-5 h-5 text-[#8dc720]" />
              <span className="text-sm font-medium text-[#8dc720]">Who We Are</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Empowering Drivers with <span className="text-[#8dc720]">Independence</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Towner, we are passionate about empowering taxi and auto-rickshaw drivers with tools that let them manage their businesses independently. Unlike traditional aggregator platforms, Towner is a SaaS-based solution that provides flexibility, transparency, and fairness for both drivers and commuters.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#8dc720]/10 rounded-3xl transform rotate-3" />
            <Image
              src="/assets/autos/autos1.jpg"
              alt="Towner Drivers"
              width={600}
              height={350}
              className="rounded-2xl shadow-xl relative h-[320px] object-cover"
            />
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
              <History className="w-5 h-5 text-[#8dc720]" />
              <span className="text-sm font-medium text-[#8dc720]">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Story of <span className="text-[#8dc720]">Innovation</span> & Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
              <p className="text-gray-600 leading-relaxed">
                Drivers have long struggled under the constraints of aggregator platforms, facing challenges such as high commission fees, lack of transparency, and loss of control over their earnings. These platforms often prioritize profits over drivers' welfare, leaving them with unfair pricing structures and limited independence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                Towner was created to address these growing challenges. Our platform stands for independence, innovation, saving money for children's bright future, and inclusivity, ensuring that every driver becomes an entrepreneur in their own right.
              </p>
            </div>
          </div>
        </div>

        {/* The Towner Edge Section */}
        <div className="bg-gradient-to-br from-[#8dc720]/10 via-transparent to-[#8dc720]/5 rounded-3xl p-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-[#8dc720]" />
              <span className="text-sm font-medium text-[#8dc720]">The Towner Edge</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Makes Us <span className="text-[#8dc720]">Different</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Unlike aggregators, Towner believes in fostering independence. Drivers stay in control, commuters enjoy fair pricing, and everyone benefits from transparency.
            </p>
            <button onClick={()=> window.open(`${media.YOUTUBE_VIDEO2}`,'_blank')} className="inline-flex items-center gap-2 bg-[#8dc720] text-white px-6 py-3 rounded-full hover:bg-[#7ab118] transition-all duration-300 group">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutContent