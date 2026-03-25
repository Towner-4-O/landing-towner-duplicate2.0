// 'use client'

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Download, Car } from "lucide-react";
// import { media } from "@/constant";
// import { useRouter } from "next/navigation";

// export function Hero() {
//   const router = useRouter();
//   const playStoreURL = "https://play.google.com/store/apps/details?id=com.towner.app&hl=en";

//   const handleRedirect = () => {
//     if (typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)) {
//       window.location.href = playStoreURL;
//     }
//   };

//   return (
//     <section className="relative min-h-screen md:h-[85vh] overflow-hidden p-4 mt-2 md:mt-4">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl h-full">
//         <Image
//           src="/assets/hero-bg.jpg"
//           alt="Background"
//           fill
//           className="object-cover rounded-3xl filter"
//           priority
//         />
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40 rounded-3xl w-full z-10" />
//       </div>

//       {/* Mobile View */}
//       <div className="md:hidden absolute inset-0 flex flex-col justify-center items-center p-4 z-20">
//         <div className="absolute bottom-4 z-30">
//           <h1 className="text-2xl font-bold leading-tight mb-4 text-white text-center">
//             Discover Towner:<br /> Empowering Taxi Owners, <br /> Smarter Rides!
//           </h1>

//           <p className="text-sm text-gray-100 mb-6 text-center px-14"
//             style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
//             Free yourself from the aggregators. Download the Towner App!
//           </p>

//           {/* Button Container with Higher z-index */}
//           <div className="flex flex-row gap-4 items-center justify-center px-20 z-30">
//             <Button
//               onClick={handleRedirect}
//               size="sm"
//               className="bg-[#A8FF01] text-black hover:bg-[#95e603] w-full h-10 rounded-xl"
//             >
//               Download <Download className="h-6 w-6" />
//             </Button>

//             <Button
//               onClick={handleRedirect}
//               size="sm"
//               variant="outline"
//               className="text-black hover:bg-black hover:text-white border-white w-full h-10 rounded-xl"
//             >
//               Become driver <Car className="h-6 w-6" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop View */}
//       <div className="hidden md:block absolute z-20 w-full md:w-[70%] p-8 bottom-10 md:bottom-[20%]">
//         <h1 className="text-5xl font-bold leading-tight mb-6 text-white relative">
//           Discover Towner:<br /> Empowering Taxi Owners, <br /> Smarter Rides!
//         </h1>

//         <p className="text-xl text-gray-100 mb-8"
//           style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
//           Free yourself from the aggregators. Download the Towner App!
//         </p>

//         <div className="flex flex-row gap-4">
//           <Button
//             onClick={() => window.open(
//               `${media.TOWNER_PLAYSTORE}`,
//               '_blank',
//               'noopener,noreferrer'
//             )}
//             size="lg"
//             className="bg-[#A8FF01] text-black hover:bg-[#95e603] transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Download App
//           </Button>
//           <Button
//             // onClick={() => window.open(
//             //   `${media.BECOMEADRIVER}`,
//             //   '_blank',
//             //   'noopener,noreferrer'
//             // )}
//             onClick={() => router.push('/driver-auth/signup')}
//             size="lg"
//             variant="outline"
//             className="text-black hover:bg-black hover:text-white border-none transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Become a Driver
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { media } from "@/constant";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

// Tiny 10x20 gray placeholder encoded as base64 data URL
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAYAAAC07qxWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVQokWN89+7dfwYGBgZGRkYGBgYmBjIBEwOFYNTQUUNHoqEAAPl0BAVang8bAAAAAElFTkSuQmCC";

export function Hero() {
  const router = useRouter();
  const playStoreURL =
    "https://play.google.com/store/apps/details?id=com.towner.app&hl=en";

  const slides = [
    {
      image: "/assets/hero/pexels-nishant-sharma-77755298-8701042 (2).jpg",
      title: "Your Digital Taxi Meter -",
      subtitle: "Fair, Fast,",
      highlight: "Transparent",
    },
    {
      image: "/assets/hero-bg.jpg",
      title: "Discover Towner:",
      subtitle: "Empowering Taxi Owners,",
      highlight: "Smarter Rides!",
    },
    {
      image: "/assets/hero/pexels-baakya-15000352.jpg",
      title: "Upgrade Your Business with",
      subtitle: "Cutting-Edge",
      highlight: "Technology",
    },
    {
      image: "/assets/hero/pexels-princesond-11346464.jpg",
      title: '"0" COMMISSION',
      subtitle: "Promises lifetime zero commission",
      highlight: "charges on trip transactions.",
    },
  ];

  const phoneImages = [
    "/assets/hero/slide-image/1.PNG",
    "/assets/hero/slide-image/2.PNG",
    "/assets/hero/slide-image/3.PNG",
    "/assets/hero/slide-image/34.PNG",
    "/assets/hero/slide-image/35.PNG",
    "/assets/hero/slide-image/36.PNG",
    "/assets/hero/slide-image/37.PNG",
    "/assets/hero/slide-image/38.PNG",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [phoneImageIndex, setPhoneImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Preload all phone images in the background via Image objects
  useEffect(() => {
    let loaded = 0;
    phoneImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded >= phoneImages.length) {
          setImagesReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= phoneImages.length) {
          setImagesReady(true);
        }
      };
    });
    // Mark ready after a timeout regardless (fallback)
    const timer = setTimeout(() => setImagesReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneImageIndex((prevIndex) =>
        prevIndex === phoneImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [phoneImages.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleRedirect = () => {
    if (
      typeof window !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent)
    ) {
      window.location.href = playStoreURL;
    }
  };

  return (
    <section className="relative min-h-screen md:h-[85vh] overflow-hidden p-4 mt-2 md:mt-4">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl h-full">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.image}
            alt={`Background ${index + 1}`}
            fill
            className={`object-cover rounded-3xl filter transition-all duration-1000 ease-in-out ${index === currentImageIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
              }`}
            priority={index === 0}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-3xl w-full z-10" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
              ? "bg-[#A8FF01] scale-125"
              : "bg-white/50 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden absolute inset-0 flex flex-col justify-center items-center p-4 z-20">
        <div className="absolute bottom-4 z-30">
          <h1 className="text-2xl font-bold leading-tight mb-4 text-white text-center">
            <div className="space-y-1">
              <div>{slides[currentImageIndex].title}</div>
              <div>{slides[currentImageIndex].subtitle}</div>
              <div className="inline-block bg-[#A8FF01] text-black px-2 py-1 rounded-none font-extrabold transform -skew-x-12">
                <span className="inline-block transform skew-x-12">
                  {slides[currentImageIndex].highlight}
                </span>
              </div>
            </div>
          </h1>

          <p
            className="text-sm text-gray-100 mb-6 text-center px-14"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}
          >
            Free yourself from the aggregators. Download the Towner App!
          </p>

          <div className="flex flex-row gap-4 items-center justify-center px-20 z-30">
            <Button
              onClick={handleRedirect}
              size="sm"
              className="bg-[#A8FF01] text-black hover:bg-[#95e603] w-full h-10 rounded-xl"
            >
              Download <Download className="h-6 w-6" />
            </Button>

            <Button
              onClick={handleRedirect}
              size="sm"
              variant="outline"
              className="text-black hover:bg-black hover:text-white border-white w-full h-10 rounded-xl"
            >
              Become driver <Car className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex absolute z-20 w-full h-full p-8 top-0 left-0 items-center justify-between">
        {/* Left Side Content */}
        <div className="w-1/2 pl-12 flex flex-col justify-center h-full">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-white relative">
            <div className="space-y-2">
              <div className="font-bold">{slides[currentImageIndex].title}</div>
              <div className="font-bold">
                {slides[currentImageIndex].subtitle}
              </div>
              <div className="inline-block bg-[#A8FF01] text-black px-4 py-2 rounded-none font-extrabold text-5xl transform -skew-x-12">
                <span className="inline-block transform skew-x-12">
                  {slides[currentImageIndex].highlight}
                </span>
              </div>
            </div>
          </h1>

          <p
            className="text-xl text-gray-100 mb-8 max-w-lg"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}
          >
            Free yourself from the aggregators. Download the Towner App!
          </p>

          <div className="flex flex-row gap-4">
            <Button
              onClick={() =>
                window.open(
                  `${media.TOWNER_PLAYSTORE}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              size="lg"
              className="bg-[#A8FF01] text-black hover:bg-[#95e603] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Download App
            </Button>
            <Button
              onClick={() => router.push("/driver-auth/signup")}
              size="lg"
              variant="outline"
              className="text-black hover:bg-black hover:text-white border-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              Become a Driver
            </Button>
          </div>
        </div>

        {/* Right Side Phone Mockup */}
        <div
          className="w-1/2 flex items-center justify-center p-8 relative h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Enhanced Multi-layer Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[620px] bg-[#A8FF01]/30 blur-[60px] -z-10 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[680px] bg-gradient-to-br from-[#A8FF01]/20 via-transparent to-cyan-400/10 blur-[80px] -z-20 rounded-full" />

          {/* Phone Frame with Parallax & Float */}
          <div
            className="relative w-[300px] h-[600px] bg-black border-[8px] border-gray-900 rounded-[3rem] shadow-2xl overflow-hidden z-20 ring-1 ring-gray-700/50 transition-all duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            }}
          >
            {/* Side Buttons */}
            <div className="absolute left-[-10px] top-[100px] w-[3px] h-[50px] bg-gray-800 rounded-l-sm" />
            <div className="absolute left-[-10px] top-[160px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
            <div className="absolute left-[-10px] top-[230px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
            <div className="absolute right-[-10px] top-[180px] w-[3px] h-[80px] bg-gray-800 rounded-r-sm" />

            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-gray-700 rounded-full mt-2" />
            </div>

            {/* Screen Content - Slider */}
            <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden p-3 bg-opacity-90">
              {phoneImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`App Screenshot ${index + 1}`}
                  fill
                  sizes="300px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className={`object-contain rounded-2xl transition-all duration-700 ease-in-out ${
                    index === phoneImageIndex
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 translate-x-full scale-95"
                  }`}
                  priority={index < 3}
                  loading={index < 3 ? undefined : "eager"}
                />
              ))}

              {/* Phone Screen Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {phoneImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === phoneImageIndex
                      ? "bg-[#A8FF01] w-4"
                      : "bg-white/60"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Reflection/Glare Effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[3rem] z-30" />
            <div className="absolute top-[20%] right-[10%] w-[100px] h-[100px] bg-white/5 blur-2xl rounded-full pointer-events-none z-30" />

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-100/50 rounded-full z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
