"use client"

import { useState } from 'react'
import DriverSidebar from "@/app/_components/layout/protected-component/DriverSidebar"
import { Menu } from 'lucide-react'
import Image from 'next/image'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Mobile Header */}
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/Logo.png"
              alt="Towner Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-sm font-semibold">Towner Driver</span>
          </div>
        </div>
      </div>

    <div className="flex">
      <DriverSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main 
        className={`flex-1 transition-all duration-300
          ${collapsed ? 'md:ml-20' : 'md:ml-64'}
          pt-20 md:pt-8 px-4 md:px-8`}
      >
        {children}
      </main>
    </div>
  </div>
  )
}

export default DashboardLayout