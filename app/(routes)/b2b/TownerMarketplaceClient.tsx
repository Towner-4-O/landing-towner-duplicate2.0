// TownerMarketplaceClient.tsx (Client Component)
"use client";

import React from "react";
import {
  Play,
  Heart,
  Shield,
  Wrench,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BacktoHome from "@/app/_components/layout/BacktoHome";

const TownerMarketplaceClient = () => {
  const router = useRouter();
  
  const handlePlayStoreRedirect = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.towner.app",
      "_blank"
    );
  };
  
  const handleYoutubeRedirect = () => {
    window.open("https://www.youtube.com/@TownerTaxi", "_blank");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const cardFeatures = [
    {
      title: "Health Insurance",
      description:
        "Access affordable, comprehensive health insurance plans tailored for drivers and their families. Stay protected against medical emergencies and focus on your business with peace of mind.",
      icon: Heart,
      image:
        "https://images.pexels.com/photos/4021809/pexels-photo-4021809.jpeg",
    },
    {
      title: "Vehicle Insurance",
      description:
        "Get the best deals on vehicle insurance—whether you drive a 3-wheeler or 4-wheeler. Compare plans, renew policies, and file claims easily, all from your app.",
      icon: Shield,
      image: "https://images.pexels.com/photos/193993/pexels-photo-193993.jpeg",
    },
    {
      title: "Vehicle Maintenance",
      description:
        "Find trusted service centers, schedule maintenance, and get exclusive discounts on repairs and parts. Keep your vehicle in top shape and avoid costly breakdowns.",
      icon: Wrench,
      image:
        "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
    },
    {
      title: "Finance & Loans",
      description:
        "Need funds to upgrade your vehicle or manage cash flow? Explore flexible loan options and financial products designed specifically for drivers.",
      icon: DollarSign,
      image:
        "https://images.pexels.com/photos/8293638/pexels-photo-8293638.jpeg",
    },
    {
      title: "Profit & Loss Tracking",
      description:
        "Use our built-in tools to track your daily earnings, expenses, and profits. Get clear insights into your business performance and make smarter decisions.",
      icon: TrendingUp,
      image:
        "https://images.pexels.com/photos/4968384/pexels-photo-4968384.jpeg",
    },
    {
      title: "ITR Filing & Compliance",
      description:
        "Simplify your tax filing with expert support and digital tools. Generate e-invoices, maintain records, and file your Income Tax Returns (ITR) with ease.",
      icon: FileText,
      image:
        "https://images.pexels.com/photos/4386374/pexels-photo-4386374.jpeg",
    },
  ];

  // All your existing JSX code here...
  return (
    <div className="min-h-screen bg-white">
      {/* All your existing component JSX remains exactly the same */}
      <BacktoHome />
      {/* Rest of your component code... */}
    </div>
  );
};

export default TownerMarketplaceClient;
