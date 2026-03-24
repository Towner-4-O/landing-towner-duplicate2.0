import React from 'react'
import QrScanSection from '@/app/_components/section/protected-sections/QrScanSection'
import BacktoHome from '@/app/_components/layout/BacktoHome'


const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BacktoHome />
      <QrScanSection />
    </div>
  )
}

export default Page