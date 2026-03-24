"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Eye,
  Shield,
  MapPin,
  IndianRupee,
  Smartphone,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import BacktoHome from "@/app/_components/layout/BacktoHome";

export default function MeterTaxi() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any },
    },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut"  as any},
    },
  };

  const bounceIn = {
    initial: { scale: 0.3, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.7, type: "spring", stiffness: 300 },
    },
  };

  const floatAnim = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as any},
    },
  };

  const features = [
    {
      title: "Digital Fare Meter",
      description:
        "Accurately track every trip with a government-compliant digital meter",
      icon: Gauge,
      image:
        "https://images.pexels.com/photos/1386649/pexels-photo-1386649.jpeg",
    },
    {
      title: "Seamless Booking",
      description:
        "Accept bookings via QR scan, street-hails, and mobile app integration",
      icon: Smartphone,
      image:
        "https://images.pexels.com/photos/5835577/pexels-photo-5835577.jpeg",
    },
    {
      title: "Smart Payments",
      description:
        "Effortless invoice generation with transparent digital billing",
      icon: IndianRupee,
      image:
        "https://images.pexels.com/photos/3943741/pexels-photo-3943741.jpeg",
    },
    {
      title: "Business Dashboard",
      description:
        "Monitor earnings, trip logs, and real-time business insights",
      icon: TrendingUp,
      image: "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg",
    },
    {
      title: "Zero Commission",
      description:
        "Keep 100% of your earnings with transparent flat subscription",
      icon: CheckCircle,
      image:
        "https://images.pexels.com/photos/20500268/pexels-photo-20500268.jpeg",
    },
    {
      title: "Full Compliance",
      description: "Ensure all operations meet government regulatory standards",
      icon: Shield,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BacktoHome />
      <div className="relative w-full min-h-[500px] md:h-[600px] bg-gradient-to-br from-white via-gray-50 to-green-50 overflow-hidden border-b border-gray-200">
        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-20 flex items-center">
          <motion.div
            className="max-w-full lg:max-w-3xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
              <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 animate-spin-slow" />
              <span className="text-green-600 font-semibold tracking-wide text-sm sm:text-base">
                INTRODUCING DIGITAL METER
              </span>
            </div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
            >
              Meter Taxi{" "}
              <span className="text-green-600 block sm:inline">
                Where Tradition Meets Innovation
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              Experience the familiar comfort of traditional meter taxis, now
              powered by cutting-edge digital technology. Real-time fare
              tracking, complete transparency, and the trust you've always
              known.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-6 mb-6 sm:mb-8"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-green-100 px-3 sm:px-4 py-2 rounded-full border border-green-200">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-black font-medium text-sm sm:text-base">
                  100% Transparent
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 px-3 sm:px-4 py-2 rounded-full border border-blue-200">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span className="text-black font-medium text-sm sm:text-base">
                  GPS Accurate
                </span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-3 sm:px-4 py-2 rounded-full border border-yellow-200">
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                <span className="text-black font-medium text-sm sm:text-base">
                  Fair Pricing
                </span>
              </div>
            </motion.div>

            <a
              href="https://play.google.com/store/apps/details?id=com.towner.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 transform shadow-lg"
                variants={bounceIn}
                initial="initial"
                animate="animate"
              >
                Start Your Meter Ride
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Floating Images - Hidden on mobile, visible on larger screens */}
        <motion.div
          className="absolute top-40 right-4 md:right-10 lg:right-40 z-30 hidden md:block"
          {...floatAnim}
        >
          <Image
            width={200}
            height={280}
            src="/icons/metertaxi2.png"
            alt="Meter Taxi Service"
            className="object-contain lg:w-[250px] lg:h-[350px]"
          />
        </motion.div>
        <motion.div
          className="absolute top-28 right-2 md:right-6 lg:right-32 z-20 hidden md:block"
          {...floatAnim}
          transition={{ delay: 0.3, ...floatAnim.animate.transition }}
        >
          <Image
            width={200}
            height={280}
            src="/icons/metertaxi1.png"
            alt="Meter Taxi Service"
            className="object-contain lg:w-[250px] lg:h-[350px]"
          />
        </motion.div>
      </div>
      <div className="bg-white text-black py-12 sm:py-16 lg:py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 animate-pulse" />
              <span className="text-green-600 font-semibold tracking-wide text-sm sm:text-base">
                FOR DRIVERS & OWNERS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Meter App for <span className="text-green-600">Auto & Taxi</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
              The Ultimate Digital Meter & Management Solution. Take control of
              your auto and taxi business with a next-generation Meter App
              designed to empower independent drivers and owners.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-0"
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group w-full h-[480px] rounded-3xl relative overflow-hidden shadow-xl border border-gray-200 hover:shadow-emerald-300/30 transition-all duration-700 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 group-hover:from-black/50 transition-all duration-500" />

                {/* Blur circle background - only on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 0.25, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-black blur-3xl z-0 pointer-events-none"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white bg-black/20">
                  <div className="mb-4">
                    <feature.icon className="w-8 h-8 text-white drop-shadow-md mb-2" />
                    <h3 className="text-2xl font-bold leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200">
                    {feature.description}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Section */}
          <motion.div
            className="bg-green-50 rounded-3xl p-6 sm:p-8 border border-green-200 mt-10 mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-green-600">
              Why Choose Our Meter App?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-black">
                  More Income
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Earn up to 30% more by cutting out aggregator commissions.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-black">
                  Transparent Records
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Always know your earnings, expenses, and receipts in one
                  place.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-black">
                  Integrated Support
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Access legal compliance, GST invoicing, and tax support within
                  the app.
                </p>
              </div>
            </div>
          </motion.div>

          {/* User-Friendly Experience */}
          <motion.div
            className="text-center bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-600">
              User-Friendly Experience
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-3xl mx-auto">
              Three simple taps: find a ride, book, and get paid. Your business,
              your rules—powered by smart technology.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-black">
              Start every trip with confidence and make every journey smarter
              for you and your passengers
            </p>
          </motion.div>

          {/* CTA Section */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-5">
        <div className="relative mx-auto mt-6 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-green-600 to-green-700 px-6 sm:px-10 py-6 rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
          <Smartphone className="h-8 w-8 text-white animate-bounce" />
          <div className="text-center sm:text-left">
            <div className="text-white font-bold text-base sm:text-lg">
              Ready to take control?
            </div>
            <div className="text-green-100 text-sm">
              Join thousands of independent drivers
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.towner.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors duration-300 hover:scale-105 transform text-sm sm:text-base"
          >
            Get Meter App
          </a>
        </div>
      </div>
    </main>
  );
}
