import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import TemplateWrapper from "./_components/layout/TemplateWrapper";
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: "Towner Taxi",
    template: "%s | Towner - Book Your Ride at Your Price"
  },
  description: "Book affordable rides with Towner - the ride hailing app where you set your price. Safe, reliable taxi service with real-time tracking. Available 24/7 for instant cab booking.",
  keywords: [
    "ride hailing",
    "taxi booking",
    "cab service",
    "book a ride",
    "taxi app",
    "affordable taxi",
    "ride sharing",
    "online taxi booking",
    "cheap cab service",
    "reliable taxi service",
    "instant booking",
    "24/7 taxi",
    "safe ride booking",
    "taxi near me",
    "cab booking app",
    "uber alternative",
    "local taxi service",
    "airport taxi",
    "city cab",
    "private hire",
    "chauffeur service",
    "business travel",
    "taxi rates",
    "corporate taxi",
    "taxi dispatch",
    "luxury cab service",
    "economy taxi",
    "quick ride",
    "best taxi service",
    "professional drivers"
  ],
  authors: [{ name: "Towner" }],
  creator: "Towner",
  publisher: "Towner",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://website.towner.taxi", // Replace with your actual domain
    siteName: "Towner",
    // title: "Towner - Affordable Ride Hailing & Taxi Booking App",
    description: "Book affordable rides with Towner - the ride hailing app where you set your price. Safe, reliable taxi service with real-time tracking.",
    images: [
      {
        url: "/public/icons/Logo.png", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Towner Ride Hailing App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Towner - Affordable Ride Hailing & Taxi Booking App",
    description: "Book affordable rides with Towner - the ride hailing app where you set your price. Safe, reliable taxi service.",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
    creator: "@towner", // Replace with your Twitter handle
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "32ho-b-uhFGkBpYV7F1Hr7YXzz_9cz-Lzhl5buF-fis", // Add your Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://yourdomain.com", // Replace with your actual domain
  },
  category: "Transportation",
  classification: "Ride Hailing Service",
  referrer: "origin-when-cross-origin",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <TemplateWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </TemplateWrapper>
      </body>
    </html>
  );
}
