"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BacktoHome from "@/app/_components/layout/BacktoHome";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fff0] to-[#ffffff]">
      <BacktoHome />
      <div className="container mx-auto px-4 py-8 h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Left side - Image and Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-center space-y-6 p-8"
          >
            <Image
              src="/icons/Logo.png"
              alt="Towner Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to Towner Driver Portal
            </h1>
            <p className="text-gray-600 text-lg">
              Your journey towards better earnings starts here. Join our
              community of professional drivers.
            </p>
            <div className="mt-8">
              <Image
                src="/assets/auth/logindriver3d.png"
                alt="Driver Illustration"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Auth Form */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-md"
            >
              <div className="lg:hidden flex justify-center mb-6">
                <Image
                  src="/icons/Logo.png"
                  alt="Towner Logo"
                  width={60}
                  height={60}
                />
              </div>
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
