import { DISTRIBUTOR_API_BASE_URL } from "@/constant";
import type {
  ApiResponse,
  AssignDriverResult,
  DriverValidationResult,
} from "./types";

const BASE = `${DISTRIBUTOR_API_BASE_URL}/public/company-linked-signup`;

async function post<T>(path: string, body: Record<string, string>): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(-10);
}

export async function validateInactiveDriverPhone(
  phone_number: string,
  business_id: string,
): Promise<DriverValidationResult> {
  const result = await post<DriverValidationResult>("/validate-phone", {
    phone_number: normalizePhone(phone_number),
    business_id,
  });
  return result.data!;
}

export async function sendInactiveDriverOtp(
  phone_number: string,
  business_id: string,
): Promise<{ expires_in: number; otp?: number }> {
  const result = await post<{ expires_in: number; otp?: number }>("/send-otp", {
    phone_number: normalizePhone(phone_number),
    business_id,
  });
  return result.data ?? { expires_in: 600 };
}

export async function resendInactiveDriverOtp(
  phone_number: string,
  business_id: string,
): Promise<{ expires_in: number; otp?: number }> {
  const result = await post<{ expires_in: number; otp?: number }>("/resend-otp", {
    phone_number: normalizePhone(phone_number),
    business_id,
  });
  return result.data ?? { expires_in: 600 };
}

export async function assignInactiveDriver(
  phone_number: string,
  otp: string,
  business_id: string,
): Promise<AssignDriverResult> {
  const result = await post<AssignDriverResult>("/assign", {
    phone_number: normalizePhone(phone_number),
    otp,
    business_id,
  });
  return result.data!;
}

export function isDriverNotFoundError(message: string): boolean {
  return message.toLowerCase().includes("no driver found");
}

export function isRecentlyActiveError(message: string): boolean {
  return (
    message.toLowerCase().includes("within the last") ||
    message.toLowerCase().includes("last completed trip")
  );
}
