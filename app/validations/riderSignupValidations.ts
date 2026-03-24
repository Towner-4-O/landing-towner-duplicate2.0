// import * as z from "zod"

// export const riderSignupSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//       "Password must contain at least one uppercase letter, one lowercase letter, and one number"
//     ),
//   phone: z
//     .string()
//     .min(10, "Phone number must be 10 digits")
//     .regex(/^\d+$/, "Phone number must contain only digits"),
//   serviceCity: z.string().min(1, "Service city is required"),
// })

// export type RiderSignupSchema = z.infer<typeof riderSignupSchema>

import * as z from "zod";

export const riderSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must be at least 2 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  serviceCity: z.string().min(1, "Service city is required"),
});

export type RiderSignupSchema = z.infer<typeof riderSignupSchema>;
