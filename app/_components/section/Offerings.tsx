import React from "react";
import { Sparkles, TrendingUp, Crown, Zap } from "lucide-react";
import Image from "next/image";

const Offerings = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements remain the same */}
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 opacity-30 bg-[length:30px_30px] bg-grid-pattern" />

      <div className="container mx-auto px-4 relative">
        {/* Header remains the same */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What We <span className="text-[#8dc720]">Offer</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Experience premium features designed to revolutionize your taxi
            business and maximize your earnings
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a8ff01] to-[#679415] rounded-2xl transform transition-transform group-hover:scale-[1.02] -z-10" />
            <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-xl border border-gray-200">
              <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/assets/taxis/taxi1.jpeg"
                  alt="Zero Commission"
                  fill
                  className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-[#8dc720]" />
                </div>
                <h3 className="text-xl font-bold">"0" COMMISSION</h3>
              </div>
              <p className="text-gray-600 flex-grow">
                Promises lifetime zero commission charges on trip transactions.
              </p>
              <div className="h-1 w-12 bg-[#8dc720] rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
            </div>
          </div>

          {/* Card 2 - Similar structure with different image and icon */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a8ff01] to-[#679415] rounded-2xl transform transition-transform group-hover:scale-[1.02] -z-10" />
            <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-xl border border-gray-200">
              <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/assets/taxis/taxi2.jpeg"
                  alt="Increase Income"
                  fill
                  className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#8dc720]" />
                </div>
                <h3 className="text-xl font-bold">Increase Your Income</h3>
              </div>
              <p className="text-gray-600 flex-grow">
                Increase your income by 30% with our innovative platform.
              </p>
              <div className="h-1 w-12 bg-[#8dc720] rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
            </div>
          </div>

          {/* Card 3 - Similar structure with different image and icon */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a8ff01] to-[#679415] rounded-2xl transform transition-transform group-hover:scale-[1.02] -z-10" />
            <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-xl border border-gray-200">
              <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/assets/taxis/taxi4.jpg"
                  alt="Become Owner"
                  fill
                  className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                  <Crown className="w-5 h-5 text-[#8dc720]" />
                </div>
                <h3 className="text-xl font-bold">Become an Owner</h3>
              </div>
              <p className="text-gray-600 flex-grow">
                Control In Your Hands! Take charge of your business.
              </p>
              <div className="h-1 w-12 bg-[#8dc720] rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
            </div>
          </div>

          {/* Card 4 - Similar structure with different image and icon */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a8ff01] to-[#679415] rounded-2xl transform transition-transform group-hover:scale-[1.02] -z-10" />
            <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-xl border border-gray-200">
              <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/assets/taxis/taxi8.jpg"
                  alt="No Interference"
                  fill
                  className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                  <Zap className="w-5 h-5 text-[#8dc720]" />
                </div>
                <h3 className="text-xl font-bold">No Interference!</h3>
              </div>
              <p className="text-gray-600 flex-grow">
                Complete freedom with Technology.
              </p>
              <div className="h-1 w-12 bg-[#8dc720] rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
