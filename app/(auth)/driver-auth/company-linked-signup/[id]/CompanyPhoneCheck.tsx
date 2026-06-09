"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  isDriverNotFoundError,
  isRecentlyActiveError,
  validateInactiveDriverPhone,
} from "./inactive-driver-api";
import type { DriverValidationResult } from "./types";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

interface CompanyPhoneCheckProps {
  businessId: string;
  onInactiveDriverFound: (
    phone: string,
    preview: DriverValidationResult,
  ) => void;
  onNewDriver: (phone: string) => void;
}

export default function CompanyPhoneCheck({
  businessId,
  onInactiveDriverFound,
  onNewDriver,
}: CompanyPhoneCheckProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setLoading(true);
    try {
      const preview = await validateInactiveDriverPhone(
        values.phone,
        businessId,
      );
      onInactiveDriverFound(values.phone, preview);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      if (isDriverNotFoundError(message)) {
        onNewDriver(values.phone);
        return;
      }

      if (isRecentlyActiveError(message)) {
        form.setError("phone", {
          type: "manual",
          message,
        });
        return;
      }

      form.setError("phone", {
        type: "manual",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold text-black">Verify Phone Number</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Please enter your phone number to continue
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-[#f8fff0] border border-[#A8FF01]/30 p-3 text-xs text-gray-700">
        <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
        <p>
          Existing drivers inactive for 30+ days can rejoin this distributor.
          New drivers can register with the same number.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter 10-digit phone number"
                      className="pl-10 bg-white/50 h-11"
                      maxLength={10}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </FormControl>
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A8FF01] text-black hover:bg-[#A8FF01]/90 flex items-center justify-center gap-2 h-11"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
