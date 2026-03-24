import type { Metadata } from 'next'
import SignupClient from './SignupClient'

export const metadata: Metadata = {
  title: 'Driver Signup - Towner',
  description: 'Join Towner as an independent driver. Zero commission, transparent pricing, keep 100% earnings.',
  keywords: [
    'driver signup',
    'taxi driver registration',
    'independent driver join',
    'no commission signup',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Join Towner as Driver - Keep All Your Earnings',
    description: 'Zero commission platform with transparent pricing. Register as driver today.',
    type: 'website',
  },
}

export default function SignupPage() {
  return <SignupClient />
}
