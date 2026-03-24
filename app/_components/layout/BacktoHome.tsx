'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoHomeOutline } from 'react-icons/io5';
import { HiArrowLeft } from 'react-icons/hi2';

const BacktoHome = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`fixed left-6 top-6 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-20'
    }`}>
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/90 hover:bg-[#A7FF03] 
        transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <HiArrowLeft className="text-lg" />
        <IoHomeOutline className="text-lg" />
      </button>
    </div>
  );
};

export default BacktoHome;