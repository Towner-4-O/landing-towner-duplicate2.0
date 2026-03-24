"use client";

import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoaderSpinner";

export default function TemplateWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isUserspace =
    pathname?.startsWith("/userspace") || pathname?.startsWith("/driver-auth/");
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  // useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const hash = window.location.hash
  //       if (hash.startsWith("#/company-driversignup/")) {
  //         const companyId = hash.split("/").pop()
  //         router.replace(`/driver-auth/company-linked-signup/${companyId}`)
  //       }
  //     }
  //     setIsRedirecting(false)
  //   }, [router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.startsWith("#/company-driversignup/")) {
        const companyId = hash.split("/").pop();
        router.replace(`/driver-auth/company-linked-signup/${companyId}`);
      } else if (hash.startsWith("#/company-ridersignup/")) {
        const companyId = hash.split("/").pop();
        router.replace(`/rider-auth/company-linked-signup/${companyId}`);
      }
    }
    setIsRedirecting(false);
  }, [router]);

  if (
    isRedirecting &&
    typeof window !== "undefined" &&
    window.location.hash.startsWith("#/company-driversignup/")
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {children}
      {!isUserspace && <Footer />}
    </>
  );
}
