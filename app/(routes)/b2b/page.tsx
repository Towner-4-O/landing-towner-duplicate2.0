// "use client";

// import React from "react";
// import {
//   Play,
//   Heart,
//   Shield,
//   Wrench,
//   DollarSign,
//   TrendingUp,
//   FileText,
//   CheckCircle,
//   Users,
//   Star,
//   ArrowRight,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import BacktoHome from "@/app/_components/layout/BacktoHome";

// const TownerMarketplace = () => {
//   const router = useRouter();
//   const handlePlayStoreRedirect = () => {
//     window.open(
//       "https://play.google.com/store/apps/details?id=com.towner.app",
//       "_blank"
//     );
//   };
//   const handleYoutubeRedirect = () => {
//     window.open("https://www.youtube.com/@TownerTaxi", "_blank");
//   };

//   const handleBackToHome = () => {
//     router.push("/");
//   };

//   const cardFeatures = [
//     {
//       title: "Health Insurance",
//       description:
//         "Access affordable, comprehensive health insurance plans tailored for drivers and their families. Stay protected against medical emergencies and focus on your business with peace of mind.",
//       icon: Heart,
//       image:
//         "https://images.pexels.com/photos/4021809/pexels-photo-4021809.jpeg",
//     },
//     {
//       title: "Vehicle Insurance",
//       description:
//         "Get the best deals on vehicle insurance—whether you drive a 3-wheeler or 4-wheeler. Compare plans, renew policies, and file claims easily, all from your app.",
//       icon: Shield,
//       image: "https://images.pexels.com/photos/193993/pexels-photo-193993.jpeg",
//     },
//     {
//       title: "Vehicle Maintenance",
//       description:
//         "Find trusted service centers, schedule maintenance, and get exclusive discounts on repairs and parts. Keep your vehicle in top shape and avoid costly breakdowns.",
//       icon: Wrench,
//       image:
//         "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
//     },
//     {
//       title: "Finance & Loans",
//       description:
//         "Need funds to upgrade your vehicle or manage cash flow? Explore flexible loan options and financial products designed specifically for drivers.",
//       icon: DollarSign,
//       image:
//         "https://images.pexels.com/photos/8293638/pexels-photo-8293638.jpeg",
//     },
//     {
//       title: "Profit & Loss Tracking",
//       description:
//         "Use our built-in tools to track your daily earnings, expenses, and profits. Get clear insights into your business performance and make smarter decisions.",
//       icon: TrendingUp,
//       image:
//         "https://images.pexels.com/photos/4968384/pexels-photo-4968384.jpeg",
//     },
//     {
//       title: "ITR Filing & Compliance",
//       description:
//         "Simplify your tax filing with expert support and digital tools. Generate e-invoices, maintain records, and file your Income Tax Returns (ITR) with ease.",
//       icon: FileText,
//       image:
//         "https://images.pexels.com/photos/4386374/pexels-photo-4386374.jpeg",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <BacktoHome />
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 w-full h-full">
//           <video
//             className="w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src="/assets/b2bvideo.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Dark overlay for better text readability */}
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="mb-12">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               Towner Marketplace
//               <span style={{ color: "#A7FF03" }} className="block">
//                 Everything You Need, All in One Place
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
//               Empowering Drivers Beyond the Road - Your one-stop solution for
//               health insurance, vehicle insurance, maintenance, finance, and
//               more
//             </p>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <button
//               onClick={handlePlayStoreRedirect}
//               className="px-10 py-5 rounded-full font-semibold text-black transition-all duration-300 hover:shadow-2xl hover:scale-105 transform text-lg"
//               style={{ backgroundColor: "#A7FF03" }}
//             >
//               Explore Marketplace
//             </button>
//             <button
//               onClick={handleBackToHome}
//               className="px-10 py-5 rounded-full border-2 border-white font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg"
//             >
//               Back to home
//             </button>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
//           <div className="flex flex-col items-center text-white">
//             <span className="text-sm mb-2">Scroll Down</span>
//             <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
//             Empowering Drivers Beyond the Road
//           </h2>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             We understand that being an independent driver means more than just
//             driving—it's about managing your health, your vehicle, your
//             finances, and your future. That's why we've brought together trusted
//             partners and digital tools to support every aspect of your journey.
//           </p>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
//               What's Inside the Towner Marketplace?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Everything you need to run your business smoothly and keep your
//               life secure
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {cardFeatures.map((card, index) => (
//               <div
//                 key={index}
//                 className="group relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
//                 style={{
//                   backgroundImage: `url(${card.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl z-0 group-hover:bg-black/60 transition-all duration-300" />

//                 {/* Content */}
//                 <div className="relative z-10">
//                   <div
//                     className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
//                     style={{ backgroundColor: "#A7FF03" }}
//                   >
//                     <card.icon className="w-8 h-8 text-black" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     {card.title}
//                   </h3>
//                   <p className="text-gray-100 mb-6">{card.description}</p>
//                   <div className="flex items-center text-sm font-semibold text-lime-300">
//                     Learn More
//                     <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Use Towner Marketplace Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
//               Why Use Towner Marketplace?
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#A7FF03" }}
//               >
//                 <CheckCircle className="w-8 h-8 text-black" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Curated Services
//               </h3>
//               <p className="text-gray-600">
//                 From trusted partners you can rely on
//               </p>
//             </div>

//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#A7FF03" }}
//               >
//                 <Star className="w-8 h-8 text-black" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Exclusive Offers
//               </h3>
//               <p className="text-gray-600">
//                 Special discounts for Towner users
//               </p>
//             </div>

//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#A7FF03" }}
//               >
//                 <Play className="w-8 h-8 text-black" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Seamless Experience
//               </h3>
//               <p className="text-gray-600">
//                 No paperwork, no hassle - all digital
//               </p>
//             </div>

//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#A7FF03" }}
//               >
//                 <Users className="w-8 h-8 text-black" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 24/7 Support
//               </h3>
//               <p className="text-gray-600">Guidance every step of the way</p>
//             </div>
//           </div>

//           <div className="text-center mt-12">
//             <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 Empowerment
//               </h3>
//               <p className="text-lg text-gray-700">
//                 Spend less time on admin, more time on the road earning.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//             Take Charge of Your Business and Your Future
//           </h2>
//           <p className="text-xl text-gray-300 mb-8">
//             Explore the Towner Marketplace today and unlock a world of benefits
//             designed just for you!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={handlePlayStoreRedirect}
//               className="px-8 py-4 rounded-full font-semibold text-black transition-all duration-300 hover:shadow-lg hover:scale-105 transform text-lg"
//               style={{ backgroundColor: "#A7FF03" }}
//             >
//               Start Your Journey Today
//             </button>
//             <button
//               onClick={handleYoutubeRedirect}
//               className="px-8 py-4 rounded-full border-2 border-white font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
//             >
//               Watch Demo
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default TownerMarketplace;
// page.tsx (Server Component)
import type { Metadata } from 'next'
import TownerMarketplaceClient from './TownerMarketplaceClient'



export const metadata: Metadata = {
  // title: 'Towner Marketplace - Complete Driver Services & Support',
  description: 'Comprehensive marketplace for taxi drivers featuring health insurance, vehicle insurance, maintenance services, finance solutions, ITR filing, and business management tools. Everything drivers need in one place.',
  
keywords: [
  
  'driver marketplace',
  'taxi driver services',
  'driver business tools',
  'commercial driver insurance',
  'taxi driver health insurance',
  'vehicle maintenance drivers',
  'driver finance solutions',
  'ITR filing taxi drivers',
  'profit tracking drivers',
  'driver support services',
  
  
  'taxi business management',
  'driver compliance services',
  'commercial vehicle maintenance',
  'driver financial services',
  'taxi fleet services'
]

,
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  
  openGraph: {
    // title: 'Towner Marketplace - Complete Driver Support Ecosystem',
    description: 'One-stop marketplace for taxi drivers: health insurance, vehicle maintenance, finance solutions, and business management tools. Everything you need beyond driving.',
    type: 'website',
    url: 'https://website.towner.taxi/marketplace',
    images: [
      {
        url: '/og-towner-marketplace.jpg',
        width: 1200,
        height: 630,
        alt: 'Towner Marketplace - Complete driver services including insurance, maintenance, and finance',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Towner Marketplace - Driver Services & Support',
    description: 'Complete ecosystem for taxi drivers: insurance, maintenance, finance, and business tools. Everything beyond driving in one place.',
    images: ['/twitter-marketplace.jpg'],
  },
  
  alternates: {
    canonical: 'https://website.towner.taxi/marketplace',
  },
}

export default function MarketplacePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Marketplace',
    'name': 'Towner Marketplace',
    'description': 'Comprehensive marketplace offering services for taxi and auto-rickshaw drivers including insurance, maintenance, finance, and business tools',
    'url': 'https://website.towner.taxi/marketplace',
    'provider': {
      '@type': 'Organization',
      'name': 'Towner',
      'url': 'https://website.towner.taxi'
    },
    'offers': [
      {
        '@type': 'Service',
        'name': 'Health Insurance for Drivers',
        'description': 'Comprehensive health insurance plans for drivers and families'
      },
      {
        '@type': 'Service', 
        'name': 'Vehicle Insurance',
        'description': 'Insurance coverage for 3-wheelers and 4-wheelers'
      },
      {
        '@type': 'Service',
        'name': 'Vehicle Maintenance',
        'description': 'Trusted service centers and maintenance solutions'
      },
      {
        '@type': 'Service',
        'name': 'Finance & Loans',
        'description': 'Flexible loan options for vehicle upgrades and cash flow'
      },
      {
        '@type': 'Service',
        'name': 'Business Analytics',
        'description': 'Profit & loss tracking tools for drivers'
      },
      {
        '@type': 'Service',
        'name': 'Tax Filing Services',
        'description': 'ITR filing and compliance support for drivers'
      }
    ],
    'audience': {
      '@type': 'Audience',
      'audienceType': ['Taxi Drivers', 'Auto-rickshaw Drivers', 'Commercial Vehicle Operators']
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TownerMarketplaceClient />
    </>
  )
}
