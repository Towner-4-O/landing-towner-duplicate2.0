"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Building2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { media, referral } from "@/constant";
import type { AssignDriverResult } from "./types";

const PLAY_STORE_URL = media.TOWNER_PLAYSTORE;
const AUTO_REDIRECT_MS = referral.autoRedirectMs;

interface JoinSuccessProps {
  result: AssignDriverResult;
  onDone: () => void;
}

export default function JoinSuccess({ result, onDone }: JoinSuccessProps) {
  const [secondsLeft, setSecondsLeft] = useState(AUTO_REDIRECT_MS / 1000);
  const [redirecting, setRedirecting] = useState(false);
  const redirectedRef = useRef(false);

  const goToPlayStore = useCallback(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    setRedirecting(true);
    window.location.replace(PLAY_STORE_URL);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, AUTO_REDIRECT_MS - elapsed);
      setSecondsLeft(Math.max(1, Math.ceil(remaining / 1000)));

      if (remaining <= 0) {
        window.clearInterval(interval);
        goToPlayStore();
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [goToPlayStore]);

  return (
    <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-[#A8FF01]/30 animate-ping" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#A8FF01]/20 ring-4 ring-[#A8FF01]/40">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 text-center">
        Welcome Back!
      </h2>
      <p className="mt-2 text-sm text-gray-600 text-center max-w-sm leading-relaxed">
        You have successfully rejoined{" "}
        <span className="font-semibold text-gray-900">Towner</span>.
        Install the Towner Driver app to start accepting trips.
      </p>

      <p className="mt-4 text-xs text-gray-500 text-center">
        {redirecting
          ? "Redirecting to Google Play…"
          : `Opening Google Play in ${secondsLeft}s…`}
      </p>

      <div className="mt-6 w-full rounded-xl border border-[#A8FF01]/40 bg-[#f8fff0] p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4 text-emerald-600" />
          <span>Assignment details</span>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-gray-500">Driver code</dt>
            <dd className="font-semibold text-gray-900">{result.driver_code}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Name</dt>
            <dd className="font-semibold text-gray-900">{result.driver_name}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-gray-500">Joined on</dt>
            <dd className="font-semibold text-gray-900">
              {new Date(result.assigned_at).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
        </dl>
      </div>

      <Button
        onClick={goToPlayStore}
        disabled={redirecting}
        className="mt-6 w-full bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90 h-11 gap-2"
      >
        <Download className="h-4 w-4" />
        Install Towner on Google Play
      </Button>

      <Button
        onClick={onDone}
        variant="outline"
        className="mt-3 w-full h-11"
      >
        Done
      </Button>
    </div>
  );
}
