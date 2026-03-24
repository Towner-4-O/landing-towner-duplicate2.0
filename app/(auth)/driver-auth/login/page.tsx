import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Driver Login - Towner',
  description: 'Login to your Towner driver account',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginClient />
}
