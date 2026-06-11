"use client";

import { CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AssignDriverResult } from "./types";

interface JoinSuccessProps {
  result: AssignDriverResult;
  onDone: () => void;
}

export default function JoinSuccess({ result, onDone }: JoinSuccessProps) {
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
        Open the Towner Driver app to start accepting trips.
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
        onClick={onDone}
        className="mt-6 w-full bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90 h-11"
      >
        Done
      </Button>
    </div>
  );
}
