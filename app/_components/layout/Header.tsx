// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { LuLanguages } from "react-icons/lu";
// import { RiUserSmileFill, RiCloseLine } from "react-icons/ri";
// import { CgMenuRight } from "react-icons/cg";
// import { useRouter } from "next/navigation";
// import { media } from "@/constant";

// declare global {
//   interface Window {
//     googleTranslateElementInit: () => void;
//     google: any;
//   }
// }

// export function Header() {
//   const router = useRouter()
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);

//   const toggleMobileNav = () => {
//     setMobileNavOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     // Add Google Translate script
//     const style = document.createElement('style');
//     style.textContent = `
//       /* Hide Google Translate original elements */
//       .goog-te-gadget-simple {
//         background-color: transparent !important;
//         border: none !important;
//         padding: 0 !important;
//         font-size: 14px !important;
//         display: flex !important;
//         align-items: center !important;
//         color: #4B5563 !important;
//       }
//       .goog-te-gadget-simple img {
//         display: none !important;
//       }
//       .goog-te-gadget-simple .goog-te-menu-value {
//         color: #4B5563 !important;
//         display: flex !important;
//         align-items: center !important;
//         gap: 4px !important;
//         margin: 0 !important;
//       }
//       .goog-te-gadget-simple .goog-te-menu-value span {
//         border: none !important;
//         color: #4B5563 !important;
//       }
//       .goog-te-banner-frame {
//         display: none !important;
//       }
//       body {
//         top: 0 !important;
//       }
//     `;
//     document.head.appendChild(style);
//     const script = document.createElement('script');
//     script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.async = true;
//     document.body.appendChild(script);

//     // Initialize Google Translate
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement({
//         pageLanguage: 'en',
//         includedLanguages: 'en,hi,kn,ml,ta,te', // Limiting to specific languages
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
//       }, 'google_translate_element');
//     };
//   }, []);

//   const scrollToFooter = () => {
//     const footer = document.getElementById('footer');
//     if (footer) {
//       // Close mobile menu if it's open
//       setMobileNavOpen(false);

//       // Add a small delay to ensure mobile menu is closed
//       setTimeout(() => {
//         // Calculate offset to account for sticky header
//         const headerHeight = document.querySelector('header')?.offsetHeight || 0;
//         const footerPosition = footer.offsetTop - headerHeight;

//         window.scrollTo({
//           top: footerPosition,
//           behavior: 'smooth'
//         });
//       }, 100);
//     }
//   };

//   return (
//     <header className="sticky top-0 w-full backdrop-blur-md z-50 overflow-hidden">
//       <div className="flex justify-between items-center p-2">
//         <div className="flex items-center gap-2 md:flex p-2">
//           <Link href="/" className="flex-shrink-0">
//             <div className="hidden md:block">
//               <Image
//                 // src="/icons/Logo.png"
//                 src="/assets/HDTOWNER-LOGO.png"
//                 alt="Logo"
//                 className="object-cover cursor-pointer rounded-xl"
//                 width={65}
//                 height={65}
//                 priority
//               />
//             </div>
//             <div className="block md:hidden">
//               <Image
//                 // src="/icons/Logo.png"
//                 src="/assets/HDTOWNER-LOGO.png"
//                 alt="Logo"
//                 className="object-cover cursor-pointer rounded-xl"
//                 width={50}
//                 height={50}
//                 priority
//               />
//             </div>
//           </Link>

//           <ul className="flex gap-1 md:gap-3 font-semibold">
//             <li>
//               <Button
//                 variant="outline"
//                 onClick={() => router.push('/metertaxi')}
//                 className="bg-[#b2f536] text-black font-bold hover:bg-[#b2f536] hover:text-black border-none rounded-lg py-2 px-4 text-sm transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
//               >
//                 Meter Taxi
//               </Button>
//             </li>
//             <li>
//               <Button
//                 variant="outline"
//                 onClick={() => window.open(`${media.OIOT_URL}`, '_blank')}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//               >
//                 <span className="hidden md:inline">Looking for a</span> Ride?
//               </Button>
//             </li>
//             <li>
//               <Button
//                 variant="outline"
//                 onClick={() => router.push('/about')}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//               >
//                 About
//               </Button>
//             </li>
//             <li>
//               <Button
//                 variant="outline"
//                 onClick={() => router.push('/openData')}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//               >
//                 Open Data
//               </Button>
//             </li>
//             <li>
//               <Button
//                 variant="outline"
//                 onClick={() => router.push('/b2b')}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//               >
//                 Marcket Place
//               </Button>
//             </li>
//           </ul>
//         </div>

//         <div className="flex items-center gap-3 p-2">
//           <div className="hidden md:flex items-center gap-4">
//             {/* Language selector */}
//             <div className="relative">
//               <div
//                 className="flex items-center gap-2 border hover:border-[#8dc720] text-black rounded-lg cursor-pointer py-1.5 px-3 transition-colors duration-300"
//               >
//                 <LuLanguages className="text-lg text-gray-600" />
//                 <div id="google_translate_element" className="!font-medium"></div>
//               </div>
//             </div>

//             {/* Auth buttons */}
//             {/* {["Sign In", "Help"].map((item) => (
//               <Button
//                 key={item}
//                 variant="outline"
//                 onClick={() => router.push(item === "Sign In" ? "/driver-auth/login" : "/help")}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-4 text-sm transition-all duration-300"
//               >
//                 {item}
//               </Button>
//             ))} */}

//             {["Sign In", "Help"].map((item) => (
//               <Button
//                 key={item}
//                 variant="outline"
//                 onClick={() => item === "Sign In" ? router.push("/driver-auth/login") : scrollToFooter()}
//                 className="text-black hover:text-white hover:bg-black rounded-lg py-2 px-4 text-sm transition-all duration-300"
//               >
//                 {item}
//               </Button>
//             ))}

//             {/* User icon */}
//             <div
//               onClick={() => router.push("/driver-auth/login")}
//               className="flex items-center gap-2 border hover:border-[#8dc720] text-black rounded-lg cursor-pointer py-1.5 px-3 transition-all duration-300">
//               <RiUserSmileFill className="text-xl text-gray-600" />
//               <span className="text-sm font-medium">Account</span>
//             </div>
//           </div>
//           {/* Mobile menu toggle */}
//           <div className="md:hidden mx-4">
//             <button onClick={toggleMobileNav} className="text-3xl">
//               {mobileNavOpen ? <RiCloseLine /> : <CgMenuRight />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile navigation menu */}
//       {mobileNavOpen && (
//         <nav className="md:hidden bg-white shadow-md">
//           <ul className="flex flex-col gap-2 p-4 font-semibold">
//             {/* {["Sign In", "Help", "Open Data"].map((item) => (
//               <Link
//                 key={item}
//                 href={
//                   item === "Sign In"
//                     ? "/driver-auth/login"
//                     : item === "Open Data"
//                       ? "/openData"
//                       : `/${item.toLowerCase().replace(" ", "-")}`
//                 }
//               >
//                 <li>
//                   <Button
//                     variant="outline"
//                     className="w-full text-black hover:text-white hover:bg-black rounded-full py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//                   >
//                     {item}
//                   </Button>
//                 </li>
//               </Link>
//             ))} */}

//             {["Sign In", "Help"].map((item) => (
//               <li key={item}>
//                 {item === "Help" ? (
//                   <Button
//                     variant="outline"
//                     onClick={scrollToFooter}
//                     className="w-full text-black hover:text-white hover:bg-black rounded-full py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//                   >
//                     {item}
//                   </Button>
//                 ) : (
//                   <Link
//                     href={
//                       item === "Sign In"
//                         ? "/driver-auth/login"
//                         : item === "Open Data"
//                           ? "/openData"
//                           : `/${item.toLowerCase().replace(" ", "-")}`
//                     }
//                   >
//                     <Button
//                       variant="outline"
//                       className="w-full text-black hover:text-white hover:bg-black rounded-full py-2 px-3 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
//                     >
//                       {item}
//                     </Button>
//                   </Link>
//                 )}
//               </li>
//             ))}
//             <li className="flex justify-start px-2 bg-gray-200 rounded-full py-1">
//               <div className="flex items-center">
//                 <RiUserSmileFill className="text-4xl cursor-pointer" />
//                 <span className="text-sm">Login Your Account</span>
//               </div>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuCarTaxiFront, LuLanguages, LuSparkles } from "react-icons/lu";
import { RiUserSmileFill, RiCloseLine } from "react-icons/ri";
import { CgMenuRight } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { media } from "@/constant";
import { BsSpeedometer } from "react-icons/bs";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function Header() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Add Google Translate script
    const style = document.createElement("style");
    style.textContent = `
      /* Hide Google Translate original elements */
      .goog-te-gadget-simple {
        background-color: transparent !important;
        border: none !important;
        padding: 0 !important;
        font-size: 14px !important;
        display: flex !important;
        align-items: center !important;
        color: #4B5563 !important;
      }
      .goog-te-gadget-simple img {
        display: none !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value {
        color: #4B5563 !important;
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        margin: 0 !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value span {
        border: none !important;
        color: #4B5563 !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
    `;
    document.head.appendChild(style);
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (!document.querySelector(".goog-te-combo")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,kn,ml,ta,te",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      setMobileNavOpen(false);
      setTimeout(() => {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const footerPosition = footer.offsetTop - headerHeight;
        window.scrollTo({
          top: footerPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 mr-4">
              <div className="relative group">
                <div className="relative">
                  <Image
                    src="/assets/HDTOWNER-LOGO.png"
                    alt="HDT Owner Logo"
                    className="object-cover cursor-pointer rounded-xl transition-transform duration-300 group-hover:scale-105"
                    width={60}
                    height={60}
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Featured Meter Taxi Button */}
              <div className="relative mr-2">
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#A8FF01] via-yellow-300 to-[#A8FF01] rounded-xl blur opacity-30 animate-pulse"></div> */}
                <Button
                  onClick={() => router.push("/metertaxi")}
                  className="relative bg-gradient-to-r from-[#A8FF01] via-yellow-300 to-[#A8FF01] text-black font-bold border border-black/30 rounded-xl py-2.5 px-6 text-sm transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <BsSpeedometer className="text-lg" />
                  <span>Meter Taxi</span>
                  <LuSparkles className="text-sm animate-pulse" />
                </Button>
              </div>

              {/* Regular Navigation Items */}
              <Button
                variant="ghost"
                onClick={() => window.open(`${media.OIOT_URL}`, "_blank")}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <HiOutlineLocationMarker className="mr-2 text-lg" />
                <span className="hidden xl:inline">Looking for a</span> Ride?
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/about")}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                About
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/openData")}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Open Data
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/b2b")}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Market Place
              </Button>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative">
                <div className="flex items-center gap-2 border border-gray-200 hover:border-green-400 bg-white/50 hover:bg-white/80 text-gray-700 rounded-lg cursor-pointer py-2 px-3 transition-all duration-300 hover:shadow-md">
                  <LuLanguages className="text-lg text-gray-600" />
                  <div
                    id="google_translate_element"
                    className="!font-medium"
                  ></div>
                </div>
              </div>

              {/* Auth Buttons */}
              <Button
                variant="outline"
                onClick={() => router.push("/driver-auth/login")}
                className="text-gray-700 hover:text-white hover:bg-gray-900 border-gray-200 hover:border-gray-900 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>

              <Button
                variant="outline"
                onClick={scrollToFooter}
                className="text-gray-700 hover:text-white hover:bg-gray-900 border-gray-200 hover:border-gray-900 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Help
              </Button>

              {/* User Account */}
              <div
                onClick={() => router.push("/driver-auth/login")}
                className="flex items-center gap-2 border border-gray-200 hover:border-green-400 bg-white/50 hover:bg-white/80 text-gray-700 rounded-lg cursor-pointer py-2 px-3 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <RiUserSmileFill className="text-xl text-gray-600" />
                <span className="text-sm font-medium">Account</span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileNav}
                className="text-3xl text-gray-700 hover:text-gray-900 transition-colors duration-200 p-1"
              >
                {mobileNavOpen ? <RiCloseLine /> : <CgMenuRight />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/20 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            <div className="space-y-3">
              {/* Featured Meter Taxi - Mobile */}
              <div className="relative">
                <Button
                  onClick={() => {
                    router.push("/metertaxi");
                    setMobileNavOpen(false);
                  }}
                  className="relative w-full bg-gradient-to-r from-[#A8FF01] via-yellow-300 to-[#A8FF01] text-black font-bold border border-black/30 rounded-xl py-3 px-4 text-sm transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center gap-2"
                >
                  <LuCarTaxiFront className="text-lg" />
                  <span>Meter Taxi</span>
                  <LuSparkles className="text-sm animate-pulse" />
                </Button>
              </div>

              {/* Other Navigation Items */}
              <Button
                variant="ghost"
                onClick={() => {
                  window.open(`${media.OIOT_URL}`, "_blank");
                  setMobileNavOpen(false);
                }}
                className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <HiOutlineLocationMarker className="text-lg" />
                Looking for a Ride?
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/about");
                  setMobileNavOpen(false);
                }}
                className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200"
              >
                About
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/openData");
                  setMobileNavOpen(false);
                }}
                className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200"
              >
                Open Data
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/b2b");
                  setMobileNavOpen(false);
                }}
                className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200"
              >
                Market Place
              </Button>

              {/* Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push("/driver-auth/login");
                    setMobileNavOpen(false);
                  }}
                  className="w-full text-gray-700 hover:text-white hover:bg-gray-900 border-gray-200 hover:border-gray-900 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-300"
                >
                  Sign In
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    scrollToFooter();
                    setMobileNavOpen(false);
                  }}
                  className="w-full text-gray-700 hover:text-white hover:bg-gray-900 border-gray-200 hover:border-gray-900 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-300"
                >
                  Help
                </Button>

                <div
                  onClick={() => {
                    router.push("/driver-auth/login");
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg py-3 px-4 cursor-pointer transition-all duration-200"
                >
                  <RiUserSmileFill className="text-xl text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Login Your Account
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
