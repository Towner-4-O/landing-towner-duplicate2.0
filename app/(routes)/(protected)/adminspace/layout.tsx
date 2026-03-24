import React from 'react';
import Sidebar from '@/app/_components/section/admin-sections/Sidebar';
import AdminBreadCrumb from '@/app/_components/layout/AdminBreadCrumb';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
        <Toaster position="top-right" />
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-4">
          <AdminBreadCrumb />
        </div>
        <div className="px-8 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;