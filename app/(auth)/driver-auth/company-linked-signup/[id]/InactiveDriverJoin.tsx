"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Loader2,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  assignInactiveDriver,
  resendInactiveDriverOtp,
  sendInactiveDriverOtp,
} from "./inactive-driver-api";
import type {
  AssignDriverResult,
  DriverValidationResult,
  InactiveJoinStep,
} from "./types";
import JoinSuccess from "./JoinSuccess";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

interface InactiveDriverJoinProps {
  businessId: string;
  phoneNumber: string;
  driverPreview: DriverValidationResult;
  onBack: () => void;
}

export default function InactiveDriverJoin({
  businessId,
  phoneNumber,
  driverPreview,
  onBack,
}: InactiveDriverJoinProps) {
  const [step, setStep] = useState<InactiveJoinStep>("preview");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpExpiresIn, setOtpExpiresIn] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [assignResult, setAssignResult] = useState<AssignDriverResult | null>(
    null,
  );
  const [error, setError] = useState("");

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (otpExpiresIn <= 0) return;
    const timer = setInterval(() => {
      setOtpExpiresIn((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpExpiresIn]);

  const maskedPhone = `******${phoneNumber.slice(-4)}`;

  const handleConfirmJoin = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    setError("");
    try {
      const otpResponse = await sendInactiveDriverOtp(phoneNumber, businessId);
      setOtpExpiresIn(otpResponse.expires_in ?? 600);
      setResendCooldown(60);
      setStep("otp");
      otpForm.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError("");
    try {
      const otpResponse = await resendInactiveDriverOtp(phoneNumber, businessId);
      setOtpExpiresIn(otpResponse.expires_in ?? 600);
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true);
    setError("");
    try {
      const result = await assignInactiveDriver(
        phoneNumber,
        values.otp,
        businessId,
      );
      setAssignResult(result);
      setStep("success");
    } catch (err) {
      otpForm.setError("otp", {
        type: "manual",
        message: err instanceof Error ? err.message : "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === "success" && assignResult) {
    return <JoinSuccess result={assignResult} onDone={onBack} />;
  }

  if (step === "otp") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold text-black">Verify OTP</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Enter the 6-digit code sent to +91 {maskedPhone}
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {otpExpiresIn > 0 && (
          <p className="text-blue-600 text-sm text-center">
            OTP expires in {Math.floor(otpExpiresIn / 60)}:
            {(otpExpiresIn % 60).toString().padStart(2, "0")}
          </p>
        )}

        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading || otpExpiresIn === 0}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-11 w-10 text-lg font-semibold"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading || otpExpiresIn === 0}
              className="w-full bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90 h-11"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify & Assign"
              )}
            </Button>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || loading}
                className={`w-full text-sm flex items-center justify-center gap-1 ${
                  resendCooldown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:text-gray-700"
                }`}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
              <button
                type="button"
                onClick={() => setStep("preview")}
                className="w-full text-sm text-gray-500 hover:text-black flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold text-black">Welcome Back, Driver</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Your account is eligible to rejoin under this company
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-[#A8FF01]/60 bg-[#f8fff0]/80 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <UserCheck className="h-4 w-4 text-emerald-600" />
            Driver found
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-semibold">{driverPreview.driver_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Driver code</span>
              <span className="font-semibold">{driverPreview.driver_code}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Last trip
              </span>
              <span className="font-medium text-right">
                {driverPreview.last_trip_at
                  ? new Date(driverPreview.last_trip_at).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" },
                    )
                  : "No completed trips"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Drivers whose last completed trip was more than{" "}
            {driverPreview.inactive_days_required} days ago can rejoin under a
            new company. OTP verification is required to confirm.
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <Button
          onClick={() => setShowConfirmDialog(true)}
          disabled={loading}
          className="w-full bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90 h-11"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Please wait...
            </>
          ) : (
            "Welcome Back to Towner"
          )}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm text-gray-500 hover:text-black flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Use a different number
        </button>
      </motion.div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              Confirm joining Towner
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-left text-sm text-gray-600">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-900 text-xs leading-relaxed">
                  An OTP will be sent to <strong>+91 {phoneNumber}</strong> to
                  verify your identity. By continuing, you agree to operate
                  under this company&apos;s fleet.
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmJoin}
              className="bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90"
            >
              Send OTP & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
