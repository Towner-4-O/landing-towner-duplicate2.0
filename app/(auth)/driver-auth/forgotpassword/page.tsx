// import DriverForgotPassword from "@/app/_components/layout/auth-driver/DriverForgotPassword"

// const ForgotPasswordPage = () => {
//   return <DriverForgotPassword />
// }

// export default ForgotPasswordPage
// /driver-auth/forgotpassword/page.tsx (Server Component)
import type { Metadata } from 'next'
import DriverForgotPassword from "@/app/_components/layout/auth-driver/DriverForgotPassword"

export const metadata: Metadata = {
  // title: 'Reset Driver Password',
  description: 'Reset your Towner driver account password securely.',
  robots: { index: false, follow: false },
}

const ForgotPasswordPage = () => {
  return <DriverForgotPassword />
}

export default ForgotPasswordPage
