import React from "react";
import AdminAuthForm from "@/app/_components/layout/AdminAuthForm";
import BacktoHome from "@/app/_components/layout/BacktoHome";

const AdminLogin = () => {
  return (
    <>
      <BacktoHome />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <AdminAuthForm />
      </div>
    </>
  );
};

export default AdminLogin;
