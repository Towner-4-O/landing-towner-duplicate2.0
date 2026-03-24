import * as z from "zod";

// First slide validation schema

const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

export const firstSlideSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First Name cannot exceed 50 characters")
    .transform((value) => value.trim())
    .refine(
      (value) => nameRegex.test(value),
      "First Name should contain only letters and single spaces between words"
    ),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last Name cannot exceed 50 characters")
    .transform((value) => value.trim())
    .refine(
      (value) => nameRegex.test(value),
      "Last Name should contain only letters and single spaces between words"
    ),

  email: z.string().email("Invalid email address").optional().or(z.literal("")),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => /^\d{10,11}$/.test(value),
      "Enter a valid 10 or 11-digit phone number"
    )
    .refine(
      (value) => /^[2-9]/.test(value),
      "Phone number cannot start with 0 or 1"
    )
    .refine(
      (value) => /^\d+$/.test(value),
      "Phone number can only contain numbers"
    )
    .transform((value) => value.replace(/\D/g, "")),

  password: z
    .string()
    .max(15, "Password must not exceed 15 characters")
    .optional()
    .or(z.literal("")),

  gender: z.string().optional().or(z.literal("")),
  referral_code: z.string().optional().or(z.literal("")),
  
  // Business profile fields (optional)
  business_id: z
    .string()
    .max(50, "Business ID cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
    
  business_name: z
    .string()
    .max(100, "Business Name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
});

// Second slide validation schema
export const secondSlideSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
});

// Complete form schema combining both slides
export const driverSignupSchema = z.object({
  ...firstSlideSchema.shape,
  ...secondSlideSchema.shape,
});

// Type for the form data
export type DriverSignupFormData = z.infer<typeof driverSignupSchema>;
//=================================