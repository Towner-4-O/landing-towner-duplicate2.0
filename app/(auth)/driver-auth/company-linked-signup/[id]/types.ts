export type SignupFlow = "phone-check" | "inactive-join" | "new-signup" | "signup-form";

export type InactiveJoinStep = "preview" | "otp" | "success";

export interface DriverValidationResult {
  eligible: boolean;
  driver_code: string;
  driver_name: string;
  last_trip_at: string | null;
  completed_trips_count: number;
  inactive_days_required: number;
  already_assigned: boolean;
  business_id: string;
  business_name: string;
}

export interface AssignDriverResult {
  driver_id: string;
  driver_code: string;
  driver_name: string;
  business_id: string;
  business_name: string;
  assigned_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
