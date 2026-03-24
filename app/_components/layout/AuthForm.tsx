// "use client";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   User,
//   Phone,
//   MapPin,
//   Building2,
//   Lock,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";

// type FormType = "sign-in" | "sign-up";

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

// const authSchema = (formType: FormType) => {
//   if (formType === "sign-in") {
//     return z.object({
//       emailOrPhone: z.string().min(1, "Email or phone is required"),
//       password: z.string().min(6, "Password must be at least 6 characters"),
//     });
//   }

//   return z.object({
//     firstName: z.string().min(2, "First name must be at least 2 characters"),
//     lastName: z.string().min(2, "Last name must be at least 2 characters"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().regex(phoneRegex, "Invalid phone number"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number")
//       .regex(
//         /[^A-Za-z0-9]/,
//         "Password must contain at least one special character"
//       ),
//     gender: z.enum(["male", "female", "other"]),
//     country: z.string().min(1, "Country is required"),
//     state: z.string().min(1, "State is required"),
//     city: z.string().min(1, "City is required"),
//     serviceCity: z.string().min(1, "Service city is required"),
//     company: z.string().optional(),
//   });
// };

// const AuthForm = ({ type }: { type: FormType }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const formSchema = authSchema(type);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues:
//       type === "sign-in"
//         ? {
//             emailOrPhone: "",
//             password: "",
//           }
//         : {
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             password: "",
//             gender: "male",
//             country: "",
//             state: "",
//             city: "",
//             serviceCity: "",
//             company: "",
//           },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsLoading(true);
//     setErrorMessage("");
//     try {
//       // ==========>>>
//     } catch (error: any) {
//       setErrorMessage("Failed to create account");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <>
//       <Form {...form}>
//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6"
//         >
//           <motion.h1
//             className="text-3xl font-bold text-black text-center mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             {type === "sign-in" ? "Sign In" : "Create Account"}
//           </motion.h1>

//           {type === "sign-in" ? (
//             <>
//               <FormField
//                 control={form.control}
//                 name="emailOrPhone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email or Phone</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Enter email or phone"
//                         className="pl-10"
//                       />
//                       <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         type="password"
//                         placeholder="Enter password"
//                         className="pl-10"
//                       />
//                       <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl shadow-md">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">First Name</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="First name"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Last Name</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Last name"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Email</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Email"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Phone</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Phone"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Password</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         type="password"
//                         placeholder="Password"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Gender</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all">
//                         <SelectValue placeholder="Select Gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="country"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Country</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Country"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="state"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">State</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="State"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="city"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">City</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="City"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="serviceCity"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">
//                       Service City
//                     </FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Service City"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="company"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <FormLabel className="font-semibold">Company</FormLabel>
//                     <div className="relative">
//                       <Input
//                         {...field}
//                         placeholder="Company"
//                         className="pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8FF01] transition-all"
//                       />
//                       <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           )}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Button
//               type="submit"
//               className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300 font-medium"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   {type === "sign-in" ? "Sign In" : "Create Account"}
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </Button>
//           </motion.div>

//           {errorMessage && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-red-400 text-center text-sm"
//             >
//               *{errorMessage}
//             </motion.p>
//           )}

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="flex justify-center gap-2 text-black/70"
//           >
//             {/* <p className="text-sm">
//               {type === "sign-in"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//             </p> */}
//             {/* <Link
//               href={type === "sign-in" ? "/sign-up" : "/sign-in"}
//               className="text-sm font-medium text-[#A8FF01] hover:text-[#86cc01] transition-colors"
//             >
//               {type === "sign-in" ? "Sign Up" : "Sign In"}
//             </Link> */}
//           </motion.div>
//         </motion.form>
//       </Form>

//       {/* {accountId && (
//         <OTPModal
//           email={form.getValues("email")}
//           accountId={accountId}
//           open={isOtpDialogOpen}
//           onClose={() => setIsOtpDialogOpen(false)}
//         />
//       )} */}
//     </>
//   );
// };

// export default AuthForm;
