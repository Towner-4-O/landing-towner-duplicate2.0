"use client"

import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Car,
  User,
  Activity,
  Wallet,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const menuItems = [
  { icon: User, label: 'Profile', path: '/userspace/profile' },
  { icon: Car, label: 'Trip History', path: '/userspace/trips' },
  { icon: Wallet, label: 'Wallet', path: '/userspace/wallet' },
  // { icon: Activity, label: 'Activity', path: '/userspace/activity' },
]

export function DriverSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = () => {
    // document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    // router.push('/driver-auth/login')
    // router.refresh()

    const confirmLogout = window.confirm("Are you sure you want to sign out?");

    if (confirmLogout) {
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      router.push('/driver-auth/login')
      router.refresh()
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40
          md:translate-x-0 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          w-[280px] 
          ${collapsed ? 'md:!w-20' : 'md:!w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 ${collapsed ? 'md:justify-center' : ''} flex items-center`}>
            <Image
              src="/icons/Logo.png"
              alt="Towner Logo"
              width={collapsed ? 40 : 50}
              height={collapsed ? 40 : 50}
              className="object-contain"
            />
            {!collapsed && (
              <span className="ml-3 text-xl font-semibold text-black">
                Towner Driver
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 mt-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.path

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors
                      ${isActive
                        ? 'bg-[#A8FF01] text-black'
                        : 'text-gray-600 hover:bg-[#A8FF01]/10 hover:text-black'
                      }
                      ${collapsed ? 'md:justify-center' : ''}`}
                  >
                    <Icon className={`h-5 w-5 ${collapsed ? 'md:mx-auto' : 'mr-3'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200">
            {/* Only show collapse button on desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-[#A8FF01]/10 hover:text-black rounded-xl
                  ${collapsed ? 'justify-center' : ''}`}
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5 mr-3" />
                    <span>Collapse</span>
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleSignOut}
              className={`w-full flex items-center px-4 py-3 mt-2 text-red-600 hover:bg-red-50 rounded-xl
                ${collapsed ? 'md:justify-center' : ''}`}
            >
              <LogOut className={`h-5 w-5 ${collapsed ? 'md:mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default DriverSidebar