"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, Quote, User } from "lucide-react";
import { HiOutlineSpeakerXMark, HiOutlineSpeakerWave } from "react-icons/hi2";
import { TiMediaPause } from "react-icons/ti";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { RiDownloadCloudLine } from "react-icons/ri";
import Image from "next/image";

const RideInfo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const handleVolume = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const progressValue = (video.currentTime / video.duration) * 100;
    setProgress(progressValue);
  };

  return (
    <section className=" py-5 md:py-24  relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />


      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5">
        <User className="w-96 h-96 text-[#8dc720] rotate-12" />
      </div>


      {/* Rest of the component remains the same */}
      <div className="container mx-auto px-4  relative">
        <Image
          src="/icons/spark1.png"
          alt="Logo"
          className="object-cover hidden md:block cursor-pointer rounded-xl absolute top-3 left-[42%] "
          width={65}
          height={65}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Video and content sections remain unchanged */}
          <div className="hidden md:block relative h-[300px] w-[90%] rounded-2xl overflow-hidden shadow-xl group">
            <video
              ref={videoRef}
              src="/assets/introvideo.MP4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />

            {/* Video Controls */}
            <div className="absolute bottom-12 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleVolume}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <HiOutlineSpeakerXMark className="text-lg text-white" />
                ) : (
                  <HiOutlineSpeakerWave className="text-lg text-white" />
                )}
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <TiMediaPause className="text-lg text-white" />
                ) : (
                  <IoPlayOutline className="text-lg text-white" />
                )}
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <AiOutlineFullscreen className="text-lg text-white" />
              </button>
              <a
                href="/assets/introvideo.MP4"
                download
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <RiDownloadCloudLine className="text-lg text-white" />
              </a>
            </div>

            {/* Video Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-300 rounded-full overflow-hidden group-hover:opacity-100 transition-opacity opacity-0">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#8dc720]"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 relative">
            <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-[#8dc720] to-transparent" />

            <div className="transform hover:-translate-x-2 transition-transform duration-300">
              <h2 className="text-4xl font-bold leading-tight text-gray-900 flex items-center gap-4">
                A PERSONAL RIDE
                <ArrowRight className="w-8 h-8 text-[#8dc720]" />
              </h2>
              <h3 className="text-2xl font-semibold text-[#8dc720] mt-2">
                AT ALL TIMES
              </h3>
            </div>

            <div className="space-y-6 text-gray-600 pl-6 border-l-2 border-dashed border-green-200">
              <p className="text-lg transform hover:-translate-x-2 transition-transform duration-300">
                The smart way of travelling, all with your smart phone and three
                little taps. Tap and look for your ride, Tap and book your ride
                and Tap and complete your ride. Your tap brings the driver to
                you for the best riding experience.
              </p>
              <p className="text-lg transform hover:-translate-x-2 transition-transform duration-300">
                No hassles of direction giving as your driver know exactly where
                you want to go. Payment completed via your credit card. Just sit
                back and enjoy your ride!
              </p>
            </div>

            {/* Interactive Elements */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <div className="h-3 w-20 bg-[#a8ff01] rounded-full transform hover:scale-110 transition-transform" />
                <div className="h-3 w-10 bg-[#8dc720] rounded-full transform hover:scale-110 transition-transform" />
                <div className="h-3 w-5 bg-[#6b9917] rounded-full transform hover:scale-110 transition-transform" />
              </div>
              <ArrowRight className="w-6 h-6 text-[#67911a] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RideInfo;
