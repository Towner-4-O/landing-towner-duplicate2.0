import Image from "next/image";
import Link from "next/link";
import { GoDot } from "react-icons/go";
import { HiArrowSmRight } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { media, social } from "@/constant";

const Footer = () => {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      // Add a small delay to ensure smooth scrolling
      setTimeout(() => {
        // Calculate offset to account for sticky header
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const sectionPosition = section.offsetTop - headerHeight;

        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <footer className="bg-black text-gray-300" id="footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/Logo.png"
                alt="Logo"
                className="object-cover cursor-pointer rounded-xl"
                width={45}
                height={45}
              />
              <h3 className="text-2xl font-bold text-white">Towner</h3>
            </div>
            <p className="text-sm">
              BMTC Complex, CA,31 Main 100 Feet Road,
              <br />
              Madivala, Bangalore South,
              <br />
              Bangalore-560068, Karnataka
            </p>
            <p className="text-sm">
              <span className="font-semibold text-[#a8ff01]">
                Registered Address:
              </span>{" "}
              <br />
              #32, 1st Floor, 1st Cross <br />
              Gandadhar nagar, Below JP Nagar Metro Station, <br />
              Bangalore - 560068, Karnataka
            </p>

            <div className="flex items-center gap-2 mb-4">
              <FaPhone className="text-[#a8ff01] h-4 w-4" />
              <a
                href="tel:+919346102995"
                className="hover:text-[#a8ff01] transition-colors"
              >
                +91 9364102995
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#a8ff01] h-4 w-4" />
              <a
                href="mailto:info@towner.taxi"
                className="hover:text-[#a8ff01] transition-colors"
              >
                info@towner.taxi
              </a>
            </div>

            <div className="flex space-x-4">
              <a
                onClick={() =>
                  window.open(social.facebook, "_blank", "noopener,noreferrer")
                }
                className="hover:text-[#a8ff01] transition-colors cursor-pointer"
              >
                <FaFacebookF />
              </a>
              <a
                onClick={() =>
                  window.open(social.twitter, "_blank", "noopener,noreferrer")
                }
                className="hover:text-[#a8ff01] transition-colors cursor-pointer"
              >
                <FaTwitter />
              </a>
              <a
                onClick={() =>
                  window.open(social.instagram, "_blank", "noopener,noreferrer")
                }
                className="hover:text-[#a8ff01] transition-colors cursor-pointer"
              >
                <FaInstagram />
              </a>
              <a
                onClick={() =>
                  window.open(social.linkedin, "_blank", "noopener,noreferrer")
                }
                className="hover:text-[#a8ff01] transition-colors cursor-pointer"
              >
                <FaLinkedinIn />
              </a>
              <a
                onClick={() =>
                  window.open(social.whatsapp, "_blank", "noopener,noreferrer")
                }
                className="hover:text-[#a8ff01] transition-colors cursor-pointer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mt-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <GoDot />
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              {/* <li className="flex items-center gap-2">
                <GoDot />
                <Link
                    href="/about"
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </Link>
              </li> */}
              <li className="flex items-center gap-2">
                <GoDot />
                <Link
                  href="/termsandconditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <GoDot />
                <Link
                  href="/privacyandpolicy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <GoDot />
                <a
                  href="#Faq"
                  onClick={() => {
                    scrollToSection("Faq");
                    router.push("/#Faq");
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mt-2">Products</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <GoDot />
                Rider app - powered by OIOT
              </li>
              <li className="flex items-center gap-2">
                <GoDot />
                Driver app - powered by Towner
              </li>
              <li className="flex items-center gap-2">
                <GoDot />
                Towner for Business - B2B
              </li>
              <li className="flex items-center gap-2">
                <GoDot />
                Vehicle Type - 3 wheeler and 4 wheeler
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mt-2">
              Download App
            </h3>
            <div className="flex gap-4 flex-col">
              <div className="group flex items-center gap-2 bg-white rounded-lg p-2 relative cursor-pointer">
                <Image
                  src="/icons/qr-towner.png"
                  alt="Driver QR Code"
                  width={80}
                  height={80}
                  className="object-contain rounded-lg shadow-sm"
                />
                <div className="text-black">
                  <h1 className="font-semibold">Download The Driver App</h1>
                  <p className="text-sm">Scan to download</p>
                  <HiArrowSmRight
                    onClick={() =>
                      window.open(
                        `${media.TOWNER_PLAYSTORE}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="absolute right-5 bottom-2 text-xl transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
              <div className="group flex items-center gap-2 bg-white rounded-lg p-2 relative cursor-pointer">
                <Image
                  src="/icons/qr-oiot.png"
                  alt="Driver QR Code"
                  width={80}
                  height={80}
                  className="object-contain rounded-lg shadow-sm"
                />
                <div className="text-black">
                  <h1 className="font-semibold">Download The OIOT App</h1>
                  <p className="text-sm">Scan to download</p>
                  <HiArrowSmRight
                    onClick={() =>
                      window.open(
                        `${media.OIOT_PLAYSTORE}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="absolute right-5 bottom-2 text-xl transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <HiLocationMarker className="text-[#a8ff01]" />
            <p>Bangalore, India</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold">TOWNER</span> Solutions Private Limited.
            All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">
            Version <span className="font-semibold">v2.0.0</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
