"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BacktoHome from "@/app/_components/layout/BacktoHome";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
  
  <>
  <BacktoHome/>
     <div className="min-h-screen bg-gradient-to-br from-[#5444FB]/5 to-white">
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
              src="/icons/oiotlogo.png"
              alt="Towner Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold text-[#5444FB]">
              Welcome to OIOT Rider Portal
            </h1>
            <p className="text-black text-lg">
              Your journey towards a better experience starts here. Join our community of happy riders.
            </p>

           
          </motion.div>

          {/* Right side - Auth Form */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#5444FB]/20 w-full max-w-md"
            >
              <div className="lg:hidden flex justify-center mb-6">
                <Image
                  src="/icons/oiotlogo.png"
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
  </>
 
  );
};

export default Layout;