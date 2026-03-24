// page.tsx (Server Component - handles SEO)
import type { Metadata } from 'next'
import OpenDataClient from './OpenDataClient'


export const metadata: Metadata = {
  // title: 'Open Data Dashboard',
  description: 'Real-time statistics and data insights from Towner platform. Track driver registrations, trip statistics, city coverage, and platform performance metrics.',

  keywords: [
    'transportation data',
    'taxi statistics',
    'platform analytics',
    'ride sharing data',
    'driver statistics',
    'taxi platform metrics',
    'transportation analytics',
    'taxi industry data',
    'ride hailing statistics',
    'real time taxi data',
    'platform performance data',
    'taxi market analytics',
    'driver platform metrics',
    'transparent taxi data',
    'taxi booking analytics'
  ],


  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    // title: 'Towner Open Data Dashboard - Real-time Platform Statistics',
    description: 'Live data and analytics from our zero-commission taxi platform. See driver growth, trip statistics, and city coverage.',
    type: 'website',
    url: 'https://website.towner.taxi/open-data',
    images: [
      {
        url: '/og-open-data-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'Towner open data dashboard showing platform statistics and analytics',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Towner Open Data - Platform Analytics',
    description: 'Real-time statistics from our transparent taxi platform. Driver registrations, trips, and city coverage data.',
    images: ['/twitter-open-data.jpg'],
  },

  alternates: {
    canonical: 'https://website.towner.taxi/open-data',
  },
}

export default function OpenDataPage() {
  return <OpenDataClient />
}
