"use client"


import SignupFormRider from '@/app/_components/layout/auth-rider/SignupFormRider'
import VerifyNumber from '@/app/_components/layout/auth-rider/VerifyNumber'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
  const [isVerified, setIsVerified] = useState(false)

  const params = useParams()
  const company_code = params.id as string


  const handleVerificationSuccess = () => {
    setIsVerified(true)
  }

  return (
    <>
      {!isVerified ? (
        <VerifyNumber color="#5444FB" text='white' onVerificationSuccess={handleVerificationSuccess} />
      ) : (
        <SignupFormRider company_code={company_code}/>
      )}
    </>
  )
}

export default Page

