'use client'

import React from 'react'
import { FaGithub, FaDatabase, FaChartLine, FaUsers, FaDownload, FaShieldAlt } from 'react-icons/fa'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { media } from '@/constant'

interface AchievementData {
  tripsCompleted: string;
  achievementTotalDrivers: string;
  platformUptime: string;
  completedTrips: string
  activeDrivers: string;
  totalDrivers: string
}

const AchievementCard = ({ title, subtitle, description, icon: Icon }: {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-[#e8ebd7] hover:shadow-lg transition-all duration-300"
  >
    <div className="p-2 bg-[#fcfff2] rounded-lg inline-block mb-4">
      <Icon className="w-6 h-6 text-[#8b9164]" />
    </div>
    <h3 className="text-3xl font-bold text-[#2d2f25] mb-2">{title}</h3>
    <p className="text-lg font-semibold text-[#4a4d3c] mb-2">{subtitle}</p>
    <p className="text-[#6b6e5a]">{description}</p>
  </motion.div>
)

const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-[#e8ebd7] ${className}`} />
);

const EndDetailsStatics = ({
  data,
  isLoading = false,
}: {
  data: AchievementData | null;
  isLoading?: boolean;
}) => {
  if (isLoading || !data) {
    return (
      <div className="space-y-8 py-10">
        {/* Section header skeleton */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#e8ebd7]">
          <div className="space-y-3">
            <Sk className="h-5 w-20 rounded-full" />
            <Sk className="h-7 w-56" />
            <Sk className="h-4 w-44" />
          </div>
        </div>
        {/* Achievement cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-[#e8ebd7] space-y-4">
              <Sk className="w-10 h-10 rounded-lg" />
              <Sk className="h-9 w-28" />
              <Sk className="h-5 w-36" />
              <Sk className="h-4 w-52" />
            </div>
          ))}
        </div>
        {/* Transparency block skeleton */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-[#e8ebd7]">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3">
              <Sk className="w-10 h-10 rounded-lg" />
              <Sk className="h-6 w-56" />
            </div>
            <Sk className="h-4 w-full max-w-lg" />
            <Sk className="h-4 w-4/5 max-w-md" />
            <Sk className="w-48 h-48 rounded-xl" />
            <Sk className="h-11 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const achievements = [
    {
      title: `${data.completedTrips}`,
      subtitle: "Trips Completed",
      description: "Successfully completed rides across all cities",
      icon: FaChartLine
    },
    {
      title: `${data.totalDrivers}`,
      subtitle: "Micro-Entrepreneurs",
      description: "Total Registered drivers",
      icon: FaUsers
    },
    {
      title: `${data.platformUptime}`,
      subtitle: "Platform Uptime",
      description: "Ensuring reliable service round the clock",
      icon: FaDatabase
    }
  ]

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#e8ebd7]">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold bg-[#fcfff2] text-[#4a4d3c] rounded-full">
              Overview
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#2d2f25]">Platform Achievements</h2>
          <p className="text-[#6b6e5a]">Key metrics and milestones reached</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item, index) => (
          <AchievementCard key={index} {...item} />
        ))}
      </div>

      {/* Rest of the component remains the same */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-[#e8ebd7]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-[#fcfff2] rounded-lg">
              <FaShieldAlt className="w-6 h-6 text-[#8b9164]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2d2f25]">
              Committed to Transparency
            </h2>
          </div>

          <div className="text-center">
            <p className="text-[#6b6e5a] mb-8">
              We believe in open data and transparency. These statistics are publicly available
              to help researchers, developers, and enthusiasts understand urban mobility patterns
              and contribute to improving transportation systems.
            </p>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-48 h-48 bg-[#fcfff2] p-4 rounded-xl border border-[#e8ebd7]">
                <Image
                  src="/icons/qr-towner.png"
                  alt="Download App QR Code"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>

              <div className="flex items-center gap-4">

                <a
                  onClick={() => window.open(
                    `${media.TOWNER_PLAYSTORE}`,
                    '_blank',
                    'noopener,noreferrer'
                  )}
                  className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 bg-[#fcfff2] text-[#2d2f25] rounded-xl hover:bg-[#f5f9e5] transition-colors border border-gray-200"
                >
                  <FaDownload className="w-5 h-5" />
                  <span>Download App</span>
                </a>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-[#fcfff2] rounded-lg">
                <FaDatabase className="w-4 h-4 text-[#8b9164]" />
                <p className="text-sm text-[#6b6e5a]">
                  Last Updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EndDetailsStatics