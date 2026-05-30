"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Download, Smartphone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  REFERRAL_AUTO_REDIRECT_MS,
  buildPlayStoreReferralUrl,
  normalizeReferralCode,
} from "@/lib/referral";

export default function ReferralLandingClient() {
  const searchParams = useSearchParams();
  const rawCode = searchParams.get("code") ?? searchParams.get("ref") ?? "";
  const code = useMemo(() => normalizeReferralCode(rawCode), [rawCode]);
  const playStoreUrl = code ? buildPlayStoreReferralUrl(code) : null;

  const [secondsLeft, setSecondsLeft] = useState(
    REFERRAL_AUTO_REDIRECT_MS / 1000
  );
  const [redirecting, setRedirecting] = useState(false);
  const redirectedRef = useRef(false);

  const goToPlayStore = useCallback(() => {
    if (!playStoreUrl || redirectedRef.current) return;
    redirectedRef.current = true;
    setRedirecting(true);
    window.location.replace(playStoreUrl);
  }, [playStoreUrl]);

  useEffect(() => {
    if (!code || !playStoreUrl) return;

    const start = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, REFERRAL_AUTO_REDIRECT_MS - elapsed);
      setSecondsLeft(Math.max(1, Math.ceil(remaining / 1000)));

      if (remaining <= 0) {
        window.clearInterval(interval);
        goToPlayStore();
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [code, playStoreUrl, goToPlayStore]);

  const progress =
    code && !redirecting
      ? ((REFERRAL_AUTO_REDIRECT_MS / 1000 - secondsLeft) /
          (REFERRAL_AUTO_REDIRECT_MS / 1000)) *
        100
      : 100;

  if (!code) {
    return (
      <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#A8FF01/12_0%,_transparent_55%)]" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md w-full text-center"
        >
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Invalid invite link</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            This referral link is missing or has an invalid code. Ask your
            friend to share their invite link again.
          </p>
          <Button
            asChild
            className="bg-[#A8FF01] text-black hover:bg-[#95e603] h-11 rounded-xl font-semibold"
          >
            <a href="/">Go to Towner home</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#A8FF01/15_0%,_transparent_50%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[400px] bg-[#A8FF01]/20 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Image
              src="/icons/Logo.png"
              alt="Towner"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#A8FF01]/15 border border-[#A8FF01]/35 flex items-center justify-center">
                <Gift className="w-7 h-7 text-[#A8FF01]" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">
              You&apos;re invited!
            </h1>
            <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
              Install Towner with your friend&apos;s referral code. It will
              auto-fill when you register.
            </p>

            <div className="rounded-2xl bg-black/40 border border-[#A8FF01]/25 px-4 py-4 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8FF01]/80 text-center mb-2 font-medium">
                Referral code
              </p>
              <p className="text-center text-2xl font-bold tracking-[0.35em] text-[#A8FF01] font-mono">
                {code}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!redirecting ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 mb-6"
                >
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="4"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#A8FF01"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={
                          2 * Math.PI * 28 * (1 - progress / 100)
                        }
                        className="transition-[stroke-dashoffset] duration-100"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                      {secondsLeft}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Opening Google Play in {secondsLeft}s…
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="redirecting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-400 text-center mb-6"
                >
                  Redirecting to Google Play…
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              onClick={goToPlayStore}
              disabled={redirecting}
              className="w-full h-12 rounded-xl bg-[#A8FF01] text-black hover:bg-[#95e603] font-semibold text-base gap-2 shadow-lg shadow-[#A8FF01]/20"
            >
              <Download className="w-5 h-5" />
              Get Towner on Google Play
            </Button>

            <div className="mt-5 flex items-center justify-center gap-2 text-gray-500 text-xs">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android · Install referrer applied</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-600 mt-6 px-4 leading-relaxed">
            For the code to apply automatically, continue from this page to the
            Play Store — don&apos;t search for the app manually.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 h-1 bg-white/5">
        <motion.div
          className="h-full bg-[#A8FF01]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
