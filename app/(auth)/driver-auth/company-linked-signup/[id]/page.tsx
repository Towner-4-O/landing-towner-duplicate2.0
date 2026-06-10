// /driver-auth/company-linked-signup/page.tsx (Server Component)
import type { Metadata } from 'next'
import CompanySignupClient from './CompanySignupClient'


export const metadata: Metadata = {
  // title: 'Company Driver Registration',
  description: 'Register as a company-affiliated driver on Towner. Zero commission platform for taxi companies and their drivers. Join established fleet operators.',
  keywords: [
    'company driver signup',
    'fleet driver registration', 
    'taxi company partnership',
    'corporate driver join',
    'company linked driver',
    'fleet management signup'
  ],
  robots: { index: true, follow: true },
  openGraph: {
    // title: 'Join Towner as Company Driver - Zero Commission',
    description: 'Partner with established taxi companies on our transparent platform. Register now.',
    type: 'website',
  },
}

export default function CompanySignupPage() {
  return <CompanySignupClient />
}

