
'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { media } from '@/constant'
import { useRouter } from 'next/navigation'

const QrScanSection = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-80px)] flex items-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mt-12 mb-4">
         
          <p className="text-lg text-gray-600">
            Scan the QR code or click the button below to download our app
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Section */}
          <div className="flex flex-col items-center space-y-8 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">iOS App</h2>
            <Image
              src="/icons/qr-towner.png"
              alt="App Store QR Code"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <Button 
              className="w-72 h-14 text-lg bg-black text-white hover:bg-gray-800"
              onClick={() => window.open(`${media.TOWNER_PLAYSTORE}`,'_blank','noopener,noreferrer')}
            >
              Download on App Store
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center space-y-8 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Android App</h2>
            <Image
              src="/icons/qr-towner.png"
              alt="Play Store QR Code"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <Button 
              className="w-72 h-14 text-lg bg-[#8dc720] hover:bg-[#7ab118] text-white"
              onClick={() => window.open(`${media.TOWNER_PLAYSTORE}`,'_blank','noopener,noreferrer')}
            >
              Get it on Play Store
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            className="w-48 md:w-72 h-10 mb-5 md:h-14 text-sm md:text-lg bg-[#8dc720] hover:bg-[#7ab118] text-white"
            onClick={() => router.push('/driver-auth/login')}
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QrScanSection