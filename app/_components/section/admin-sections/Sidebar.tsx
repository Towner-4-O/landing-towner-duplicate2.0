'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoAtOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: HiHome, label: 'Home', path: '/adminspace/home' },
    { icon: TbWorldWww, label: 'Towner Web', path: '/adminspace/towner-open-data' },
    { icon: IoAtOutline, label: 'OIOT Web', path: '/adminspace/oiot-open-data' },
    { icon: MdOutlineEmail, label: 'Email Push', path: '/adminspace/email-push' },
  ];

  const handleSignOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");

    if (confirmLogout) {
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "rider_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";


      toast.success("Signed out successfully");


      router.push("/driver-auth/login");
      router.refresh();
    }
  };

  return (
    <div 
      className={`h-screen bg-white border-r transition-all duration-300 ease-in-out flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b shrink-0">
        <div className="flex items-center justify-center">
          <div className="bg-[#A7FF03] p-2 rounded-xl">
            <span className={`font-bold text-black ${isCollapsed ? 'text-sm' : 'text-xl'}`}>
              {isCollapsed ? 'T' : 'TOWNER'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-[#A7FF03] text-black' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }`}
              >
                <item.icon className={`text-2xl ${
                  isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'
                }`} />
                {!isCollapsed && (
                  <span className={`font-medium ${
                    isActive ? 'text-black' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Action Buttons */}
          <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              {isCollapsed ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
              {!isCollapsed && <span className="font-medium">Collapse</span>}
            </button>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-xl transition-all duration-200 hover:bg-red-50"
            >
              <FiLogOut className="text-2xl" />
              {!isCollapsed && <span className="font-medium">Sign Out</span>}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;