'use client'

import React, { useState } from 'react'
import { ArrowLeft, Play, Target, Lightbulb, Shield, Compass, Eye } from 'lucide-react'

const visionData = [
  {
    title: "Transform",
    description: "To transform every driver into an independent entrepreneur.",
    image: "/assets/autos/autos1.jpg"
  },
  {
    title: "Establish",
    description: "To establish a platform that ensures compliance with legal regulations and supports seamless on-ground implementation for drivers.",
    image: "/assets/vision/establish.jpg"
  },
  {
    title: "Empower",
    description: "To empower drivers to operate independently, free from dependence on any other organization, and make their businesses profitable.",
    image: "/assets/vision/empower.jpg"
  },
  {
    title: "Guide",
    description: "To serve as a guiding light for the growth and prosperity of drivers, their families, and their children's future.",
    image: "/assets/vision/guide.jpg"
  }
]

const Vision = () => {
    const [flippedCard, setFlippedCard] = useState<number | null>(null)
  
    return (
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0" />
        <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />
 

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Vision & <span className="text-[#8dc720]">Mission</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
              Driving the future of independent transportation
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
  
          {/* Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {visionData.map((item, index) => (
              <div 
                key={index}
                className="relative h-[480px] group perspective"
              >
                <div 
                  className={`absolute inset-0 transition-all duration-500 preserve-3d ${
                    flippedCard === index ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-xl">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(/assets/autos/autos${index + 1}.jpg)` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full p-8 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => setFlippedCard(index)}
                            className="w-12 h-12 rounded-full bg-[#8dc720] text-white flex items-center justify-center group-hover:scale-110 transition-transform"
                          >
                            <ArrowLeft className="w-6 h-6 rotate-180" />
                          </button>
                        </div>
                        
                        <div className="mt-auto">
                          <p className="text-gray-200 text-lg line-clamp-2 h-[3.5rem]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {/* Back of Card */}
                  <div className="absolute inset-0 rotate-y-180 backface-hidden">
                    <div className="h-full w-full rounded-3xl bg-white p-6 shadow-xl border border-gray-100 flex flex-col">
                      {/* Icon Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                          {index === 0 && <Target className="w-7 h-7 text-[#8dc720]" />}
                          {index === 1 && <Shield className="w-7 h-7 text-[#8dc720]" />}
                          {index === 2 && <Lightbulb className="w-7 h-7 text-[#8dc720]" />}
                          {index === 3 && <Compass className="w-7 h-7 text-[#8dc720]" />}
                        </div>
                        <div className="w-20 h-1 bg-green-100 rounded-full mt-3" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm text-[#8dc720] font-medium">Vision {index + 1}</span>
                        </div>
                        <button
                          onClick={() => setFlippedCard(null)}
                          className="text-[#8dc720] hover:text-green-600 flex items-center gap-1 group"
                        >
                          <span className="text-sm font-medium">Back</span>
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

export default Vision