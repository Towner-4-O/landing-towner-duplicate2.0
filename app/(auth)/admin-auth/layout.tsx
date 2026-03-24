import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md -mt-20"> {/* Added negative margin to reduce gap */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#A7FF03] p-3 rounded-xl">
              <h2 className="text-2xl font-bold text-black">TOWNER</h2>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;