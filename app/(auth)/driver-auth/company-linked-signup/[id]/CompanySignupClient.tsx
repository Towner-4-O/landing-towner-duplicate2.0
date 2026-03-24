// /driver-auth/company-linked-signup/CompanySignupClient.tsx
"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import DriverSignup from '@/app/_components/layout/auth-driver/DriverSignup'
import VerifyNumber from '@/app/_components/layout/auth-rider/VerifyNumber'

const CompanySignupClient = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedPhone, setVerifiedPhone] = useState("")
  const [verifiedOTP, setVerifiedOTP] = useState("")
  const params = useParams()


  const handleVerificationSuccess = (phone: string, otp: string) => {
    setVerifiedPhone(phone)
    setVerifiedOTP(otp)
    setIsVerified(true)
  }

  return (
    <>
      {!isVerified ? (
        <VerifyNumber
          color="#A8FF01"
          text='black'
          onVerificationSuccess={handleVerificationSuccess}
        />
      ) : (
        <DriverSignup
          verifiedPhone={verifiedPhone}
          verifiedOTP={verifiedOTP}
          businessIdFromPath={params.id as string}
        />
      )}
    </>
  )
}

export default CompanySignupClient
