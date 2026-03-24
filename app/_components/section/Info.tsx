'use client'

import React from "react";
import { ArrowUpRight, Banknote, Cpu, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const Info = () => {
  const router =  useRouter()
  const videoUrls = [
    'https://youtu.be/B81lDc5viJs?si=086GhGTZqnzY_hyw',
    'https://youtu.be/8sgyNS7tjA4?si=3qtmpNjomzsp3SKv',
    'https://youtu.be/4zHY0cSB480?si=FJw053Q297wVrl33'
  ];

  const handleRedirect = (index: number) => {
    window.open(videoUrls[index], '_blank');
  };


  return (
    <section className="py-5 md:py-24 relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-[#8dc720]">Towner</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Experience the future of taxi business with our innovative platform
            that puts you in control
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-100 hover:-translate-y-1">
            <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Banknote className="h-7 w-7 text-[#8dc720]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#8dc720] transition-colors">
              Take Back Control of Your Taxi Business
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Earn Up To 30% More with Towner. Towner's commission-free model
              eliminates middlemen, letting you keep more of what you earn. Set
              your own rates, manage your finances, and enjoy transparency with
              e-invoicing and tax support.
            </p>
            <button onClick={() => handleRedirect(0)}  className="flex items-center text-[#8dc720] font-medium hover:gap-3 transition-all group-hover:font-semibold">
              Learn More <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-100 hover:-translate-y-1">
            <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="h-7 w-7 text-[#8dc720]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#8dc720] transition-colors">
              Upgrade Your Business with Cutting-Edge Technology
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Towner provides access to advanced technology like QR code
              booking, customizable settings, and seamless integration with
              platforms like ONDC and Web3. Offer a modern and convenient
              experience to your customers.
            </p>
            <button    onClick={() => handleRedirect(1)}  className="flex items-center text-[#8dc720] font-medium hover:gap-3 transition-all group-hover:font-semibold">
              Learn More <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-100 hover:-translate-y-1">
            <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-7 w-7 text-[#8dc720]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#8dc720] transition-colors">
              Serve the Unorganized Taxi Market
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Reach a vast untapped market of 12.5 million taxi owners and serve
              the essential transportation needs of 140 crore people. Towner
              empowers you to operate independently and expand your business in
              smaller cities and beyond.
            </p>
            <button onClick={() => handleRedirect(2)}  className="flex items-center text-[#8dc720] font-medium hover:gap-3 transition-all group-hover:font-semibold">
              Learn More <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
