// import * as z from "zod";

// export const driverLoginSchema = z.object({
//   // username: z
//   //   .string()
//   //   .min(1, "Email or phone number is required")
//   //   .refine((value) => {
//   //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   //     const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
//   //     return emailRegex.test(value) || phoneRegex.test(value)
//   //   }, "Please enter a valid email or phone number"),

//   username: z
//     .string()
//     .min(1, "Email, phone number, or driver ID is required")
//     .refine((value) => {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const phoneRegex =
//         /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
//       const driverIdRegex = /^drv\d{3}$/i; // Matches DRV001, drv001, Drv001, etc.
//       return (
//         emailRegex.test(value) ||
//         phoneRegex.test(value) ||
//         driverIdRegex.test(value)
//       );
//     }, "Please enter a valid email, phone number, or driver ID"),

//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters long"),
// });

// export type DriverLoginSchema = z.infer<typeof driverLoginSchema>;

import * as z from "zod";

export const driverLoginSchema = z.object({
  username: z
    .string()
    .min(1, "Email, phone number, or driver ID is required")
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex =
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
      const driverIdRegex = /^drv\d{3}$/i; // Matches DRV001, drv001, Drv001, etc.

      const cityCodeRegex = /^[A-Z]{5}\d{5}$/;

      if (value.match(/^\d+$/)) {
        return value.length === 10;
      }

      return (
        emailRegex.test(value) ||
        driverIdRegex.test(value) ||
        cityCodeRegex.test(value)
      );
    }, "Please enter a valid email, phone number (10 digits), or driver ID"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must be at least 2 characters long"),
});

export type DriverLoginSchema = z.infer<typeof driverLoginSchema>;
