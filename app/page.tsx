
import { Header } from "./_components/layout/Header";
import Faq from "./_components/section/Faq";
import { Hero } from "./_components/section/Hero";
import Highlights from "./_components/section/Highlights";
import Info from "./_components/section/Info";
import VideoShowcase from "./_components/section/VideoShowcase";
import Offerings from "./_components/section/Offerings";
import RideInfo from "./_components/section/RideInfo";
import Testimonials from "./_components/section/Testimonials";
import type { Metadata } from 'next'
import Vision from "./_components/section/Vision";

export const metadata: Metadata = {
  // Works with layout template: "No Commission Platform | Towner - Book Your Ride at Your Price"
  // title: 'No Commission Platform',

  description: 'Join Towner - 100% commission-free taxi platform. No surge charges, transparent billing, keep all your earnings. Independent taxi business with fair pricing and complete transparency.',

  // Updated keywords focusing on no commission and transparent pricing
  keywords: [
    'no commission taxi',
    'zero commission platform',
    'no surge pricing',
    'transparent billing',
    'taxi driver',
    'taxi job',
    'keep 100% earnings',
    'fair taxi platform',
    'driver app',
    'independent taxi',
    'transparent pricing',
    'commission free',
    'no hidden charges',
    'uber alternative',
    'taxi business',
    'driver platform',
    'honest pricing',
    'driver earnings',
    'taxi work',
    'full fare',
    'taxi driver platform',
    'auto-rickshaw management system',
    'independent taxi service',
    'driver empowerment platform',
    'taxi business management',
    'SaaS for drivers',
    'taxi driver entrepreneurship',
    'ride-hailing alternative',
    'transparent taxi platform',
    'low commission taxi app',
    'driver-first platform',
    'taxi management software',
    'independent cab service',
    'driver business tools',
  ],
  verification: {
    google: '32ho-b-uhFGkBpYV7F1Hr7YXzz_9cz-Lzhl5buF-fis',


  },

  openGraph: {
    title: 'Towner - 100% Commission-Free Taxi Platform',
    description: 'Zero commission, no surge charges, transparent billing. Keep 100% of your earnings with India\'s most driver-friendly platform.',
    url: 'https://website.towner.taxi',
    images: [
      {
        url: '/og-no-commission-platform.jpg',
        width: 1200,
        height: 630,
        alt: 'Towner zero commission taxi platform with transparent pricing for drivers',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Towner - Zero Commission Taxi Platform',
    description: '100% commission-free platform. No surge pricing, transparent bills, keep all earnings. Join thousands of independent drivers.',
    images: ['/twitter-no-commission.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },


  alternates: {
    canonical: 'https://website.towner.taxi',
  },

}

export default function Home() {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "LocalBusiness"],
    "name": "Towner - Zero Commission Taxi Platform",
    "description": "100% commission-free SaaS platform for taxi and auto-rickshaw drivers with transparent billing, no surge charges, and complete fare transparency",
    "url": "https://website.towner.taxi",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["Web", "iOS", "Android"],
    "serviceType": "Commission-Free Transportation Platform",

    "audience": {
      "@type": "Audience",
      "audienceType": ["Taxi Drivers", "Auto-rickshaw Drivers", "Independent Transport Operators"]
    },

    "offers": {
      "@type": "Offer",
      "name": "Zero Commission Driver Registration",
      "description": "Join the only platform where drivers keep 100% of their earnings",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },

    "featureList": [
      "100% commission-free platform",
      "Zero surge pricing policy",
      "Transparent billing system",
      "Keep all your earnings",
      "No hidden charges",
      "Fair pricing always",
      "Independent business control",
      "Real-time transparent earnings",
      "Honest fare calculation",
      "Driver-first approach",
      "Complete pricing transparency",
      "No middleman commissions"
    ],

    "provider": {
      "@type": "Organization",
      "name": "Towner",
      "url": "https://website.towner.taxi",
      "description": "India's first truly commission-free taxi platform"
    },

    "mainEntityOfPage": {
      "@type": "WebPage",
      "name": "Zero Commission Taxi Platform",
      "description": "The only platform where taxi drivers keep 100% earnings with transparent billing"
    },

    "potentialAction": {
      "@type": "JoinAction",
      "target": "https://website.towner.taxi/driver-signup",
      "name": "Join as Driver"
    },

    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <VideoShowcase />
        <Info />
        <Offerings />
        <Highlights />
        <Vision />
        <RideInfo />
        <Testimonials />
        <Faq />
      </main>
    </>
  );
}
