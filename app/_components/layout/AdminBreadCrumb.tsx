'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';

const AdminBreadCrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  return (
    <div className="flex items-center gap-2 py-4 text-sm">
      <Link 
        href="/adminspace/home" 
        className="text-gray-600 hover:text-black transition-colors"
      >
        Admin
      </Link>
      {paths.slice(1).map((path, index) => (
        <React.Fragment key={path}>
          <HiChevronRight className="text-gray-400" />
          <Link
            href={`/${paths.slice(0, index + 2).join('/')}`}
            className={`capitalize ${
              index === paths.length - 2 
                ? 'text-black font-medium' 
                : 'text-gray-600 hover:text-black transition-colors'
            }`}
          >
            {path.replace(/-/g, ' ')}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AdminBreadCrumb;