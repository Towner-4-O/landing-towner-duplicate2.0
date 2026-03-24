// import React from 'react'
// import AboutHero from '../../_components/section/AboutHero'
// import AboutContent from '@/app/_components/section/AboutContent'
// import Services from '@/app/_components/section/Services'
// import BacktoHome from '@/app/_components/layout/BacktoHome'

// const page = () => {
//   return (
//     <main>
//       <BacktoHome/>
//       <AboutHero />
//       <AboutContent/>
//       <Services/>
//     </main>
//   )
// }

// export default page
import type { Metadata } from 'next'
import React from 'react'
import AboutHero from '../../_components/section/AboutHero'
import AboutContent from '@/app/_components/section/AboutContent'
import Services from '@/app/_components/section/Services'
import BacktoHome from '@/app/_components/layout/BacktoHome'

// Add metadata export here - in the page component
export const metadata: Metadata = {
  // title: 'About Towner',
  description: 'Learn about Towner - the zero commission taxi platform empowering drivers with transparency, independence, and fair pricing. Discover our mission to revolutionize the ride-hailing industry.',
  
  keywords: [
    'about towner',
    'taxi platform story', 
    'driver empowerment company',
    'zero commission platform',
    'transparent taxi service',
    'ride hailing company',
    'driver independence mission',
    'fair taxi platform'
  ],
  
  robots: {
    index: true,
    follow: true,
  },
  
  openGraph: {
    // title: 'About Towner - Empowering Independent Drivers',
    description: 'Discover how Towner is revolutionizing the taxi industry with zero commissions, transparent pricing, and driver-first approach.',
    type: 'website',
    url: 'https://website.towner.taxi/about',
    images: [
      {
        url: '/og-about-towner.jpg',
        width: 1200,
        height: 630,
        alt: 'About Towner - Driver empowerment platform story',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'About Towner - Zero Commission Driver Platform',
    description: 'Learn how we\'re empowering taxi drivers with transparency and fair pricing.',
    images: ['/twitter-about-towner.jpg'],
  },
  
  alternates: {
    canonical: 'https://website.towner.taxi/about',
  },
}

const page = () => {
  return (
    <main>
      <BacktoHome/>
      <AboutHero />
      <AboutContent/>
      <Services/>
    </main>
  )
}

export default page
