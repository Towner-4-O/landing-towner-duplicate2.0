import { Suspense } from "react";
import type { Metadata } from "next";
import ReferralLandingClient from "./ReferralLandingClient";

export const metadata: Metadata = {
  title: "You're invited to Towner",
  description:
    "Download Towner with a referral code. Your invite is applied automatically when you register.",
  robots: { index: false, follow: false },
};

function ReferralFallback() {
  return (
    <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-2 border-[#A8FF01]/30 border-t-[#A8FF01] animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}

export default function ReferralPage() {
  return (
    <Suspense fallback={<ReferralFallback />}>
      <ReferralLandingClient />
    </Suspense>
  );
}
