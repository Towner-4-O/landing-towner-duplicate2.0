// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Phone, Lock, Loader2, KeyRound, ChevronLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { BACKEND_BASE_URL, config } from "@/constant";
// import { motion, AnimatePresence } from "framer-motion";

// const phoneSchema = z.object({
//   phone: z
//     .string()
//     .min(1, "Phone number is required")
//     .refine((value) => /^\d{10}$/.test(value), {
//       message: "Phone number must be exactly 10 digits",
//     }),
// });

// const otpSchema = z.object({
//   otp: z
//     .string()
//     .min(1, "OTP is required")
//     .refine((value) => /^\d{4}$/.test(value), {
//       message: "OTP must be exactly 4 digits (0-9)",
//     }),
// });

// const passwordSchema = z
//   .object({
//     newPassword: z
//       .string()
//       .min(1, "New password is required")
//       .min(2, "Password must be at least 2 characters"),
//     confirmPassword: z.string().min(1, "Confirm password is required"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// const DriverForgotPassword = () => {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [userPhone, setUserPhone] = useState("");

//   // const [resendSuccess, setResendSuccess] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [timer, setTimer] = useState(600);
//   const [isOTPExpired, setIsOTPExpired] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [showOTPMessage, setShowOTPMessage] = useState(true);

//   const phoneForm = useForm<z.infer<typeof phoneSchema>>({
//     resolver: zodResolver(phoneSchema),
//     defaultValues: { phone: "" },
//   });

//   const otpForm = useForm<z.infer<typeof otpSchema>>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: { otp: "" },
//   });

//   const passwordForm = useForm<z.infer<typeof passwordSchema>>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: { newPassword: "", confirmPassword: "" },
//   });

//   const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${BACKEND_BASE_URL}${config.forgotPassword}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             phone: values.phone,
//             phcode: "+91",
//             type: "sms",
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setUserPhone(values.phone);
//         setStep(2);
//         setShowOTPMessage(true);
//         setTimer(120); // Set to 1 minute
//         setTimeout(() => {
//           setShowOTPMessage(false);
//         }, 5000);
//       } else {
//         phoneForm.setError("phone", {
//           type: "manual",
//           message: data.message || "Please try again with a valid number.",
//         });
//       }
//     } catch (error) {
//       phoneForm.setError("phone", {
//         type: "manual",
//         message: "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onOTPVerify = async (values: z.infer<typeof otpSchema>) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${BACKEND_BASE_URL}${config.verifyOTP}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           otp: values.otp,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setStep(3);
//       } else {
//         otpForm.setError("otp", {
//           type: "manual",
//           message: data.message || "Invalid OTP",
//         });
//       }
//     } catch (error) {
//       otpForm.setError("otp", {
//         type: "manual",
//         message: "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${BACKEND_BASE_URL}${config.resetPassword}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: userPhone,
//             newPwd: values.newPassword,
//             conPwd: values.confirmPassword,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         router.push("/driver-auth/login");
//       } else {
//         passwordForm.setError("root", {
//           type: "manual",
//           message:
//             data.message === "NEW_PASSWORD_SAME_AS_OLD"
//               ? "New password cannot be the same as your old password"
//               : "Password reset failed",
//         });
//       }
//     } catch (error) {
//       passwordForm.setError("root", {
//         type: "manual",
//         message: "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (timer > 0 && !isOTPExpired) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 1) {
//             setIsOTPExpired(true);
//             setCanResend(true);
//             return 0;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [timer, isOTPExpired]);

//   useEffect(() => {
//     if (step === 2) {
//       setTimer(120);
//       setIsOTPExpired(false);
//       setCanResend(false);
//     }
//   }, [step]);

//   const handleResendOTP = async () => {
//     setLoading(true);
//     setCanResend(false);
//     setIsOTPExpired(false);
//     setTimer(120);

//     try {
//       const response = await fetch(
//         `${BACKEND_BASE_URL}${config.forgotPassword}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: userPhone,
//             phcode: "+91",
//             type: "sms",
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setShowOTPMessage(true);
//         setTimeout(() => {
//           setShowOTPMessage(false);
//         }, 5000);
//       }
//     } catch (error) {
//       console.error("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={step}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-white rounded-xl shadow-md p-6"
//           >
//             <h1 className="text-2xl font-bold text-black text-center mb-6">
//               {step === 1
//                 ? "Forgot Password"
//                 : step === 2
//                 ? "Verify OTP"
//                 : "Reset Password"}
//             </h1>

//             {step === 1 && (
//               <Form {...phoneForm}>
//                 <form
//                   onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
//                   className="space-y-4"
//                 >
//                   <FormField
//                     control={phoneForm.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <div className="relative">
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Enter Phone Number"
//                               className="pl-10 bg-white/50 h-11"
//                             />
//                           </FormControl>
//                           <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button
//                     type="submit"
//                     className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01]"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       "Send OTP"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             )}

//             {step === 2 && (
//               <Form {...otpForm}>
//                 {showOTPMessage && (
//                   <p className="text-green-600 text-sm text-center mb-4">
//                     OTP has been sent to your registered mobile number.
//                   </p>
//                 )}
//                 {!isOTPExpired && timer > 0 && (
//                   <p className="text-blue-600 text-sm text-center mb-4">
//                     OTP expires in {Math.floor(timer / 60)}:
//                     {(timer % 60).toString().padStart(2, "0")}
//                   </p>
//                 )}
//                 {isOTPExpired && (
//                   <p className="text-red-600 text-sm text-center mb-4">
//                     OTP expired. Please try again.
//                   </p>
//                 )}
//                 <form
//                   onSubmit={otpForm.handleSubmit(onOTPVerify)}
//                   className="space-y-4"
//                 >
//                   <FormField
//                     control={otpForm.control}
//                     name="otp"
//                     render={({ field }) => (
//                       <FormItem>
//                         <div className="relative">
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Enter OTP"
//                               className="pl-10 bg-white/50 h-11 text-center"
//                               disabled={isOTPExpired}
//                             />
//                           </FormControl>
//                           <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button
//                     type="submit"
//                     className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01]"
//                     disabled={isOTPExpired}
//                   >
//                     Verify OTP
//                   </Button>
//                   {canResend && (
//                     <Button
//                       type="button"
//                       onClick={handleResendOTP}
//                       className="w-full mt-2 bg-gray-100 text-[#5444FB] hover:bg-gray-200"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         "Resend OTP"
//                       )}
//                     </Button>
//                   )}
//                 </form>
//               </Form>
//             )}

//             {step === 3 && (
//               <Form {...passwordForm}>
//                 <form
//                   onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
//                   className="space-y-4"
//                 >
//                   <FormField
//                     control={passwordForm.control}
//                     name="newPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <div className="relative">
//                           <FormControl>
//                             <Input
//                               {...field}
//                               type={showNewPassword ? "text" : "password"}
//                               placeholder="New Password"
//                               className="pl-10 bg-white/50 h-11"
//                             />
//                           </FormControl>
//                           <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showNewPassword ? (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
//                                 />
//                               </svg>
//                             ) : (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                               </svg>
//                             )}
//                           </button>
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={passwordForm.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <div className="relative">
//                           <FormControl>
//                             <Input
//                               {...field}
//                               type={showConfirmPassword ? "text" : "password"}
//                               placeholder="Confirm Password"
//                               className="pl-10 bg-white/50 h-11"
//                             />
//                           </FormControl>
//                           <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setShowConfirmPassword(!showConfirmPassword)
//                             }
//                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
//                                 />
//                               </svg>
//                             ) : (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                               </svg>
//                             )}
//                           </button>
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {passwordForm.formState.errors.root && (
//                     <div className="text-sm text-red-500 text-center">
//                       {passwordForm.formState.errors.root.message}
//                     </div>
//                   )}

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01]"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       "Reset Password"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default DriverForgotPassword;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Phone, Lock, Loader2, KeyRound, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "@/constant";
import { motion, AnimatePresence } from "framer-motion";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Only digits are allowed")
    .length(10, "Phone number must be exactly 10 digits"),
});

const resetPasswordSchema = z
  .object({
    otp: z
      .string()
      .min(1, "OTP is required")
      .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const DriverForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timer, setTimer] = useState(600);
  const [isOTPExpired, setIsOTPExpired] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    mode: "onSubmit",
  });

  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onSubmit",
  });

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (step === 2 && timer > 0 && !isOTPExpired) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsOTPExpired(true);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isOTPExpired, step]);

  // Reset timer when moving to step 2
  useEffect(() => {
    if (step === 2) {
      setIsOTPExpired(false);
      setCanResend(false);
    }
  }, [step]);

  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
          },
          body: JSON.stringify({
            phone_number: values.phone,
            purpose: "forgot_password",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUserPhone(values.phone);
        setStep(2);
        setTimer(data.data.expires_in || 600);
        toast.success(`OTP sent to ******${values.phone.slice(-4)}`);
      } else {
        phoneForm.setError("phone", {
          type: "manual",
          message: data.message || "Failed to send OTP. Please try again.",
        });
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      const errorMsg = "Something went wrong. Please try again.";
      phoneForm.setError("phone", {
        type: "manual",
        message: errorMsg,
      });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
          }, body: JSON.stringify({
            phone_number: userPhone,
            otp: values.otp,
            new_password: values.newPassword,
            confirm_password: values.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successful! Redirecting to login...");

        setTimeout(() => {
          router.push("/driver-auth/login");
        }, 1500);
      } else {
        if (data.message.includes("OTP")) {
          resetForm.setError("otp", {
            type: "manual",
            message: data.message || "Invalid or expired OTP",
          });
        }
        toast.error(data.message || "Password reset failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setCanResend(false);
    setIsOTPExpired(false);

    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
          }, body: JSON.stringify({
            phone_number: userPhone,
            purpose: "forgot_password",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTimer(data.data.expires_in || 600);
        toast.success("OTP resent successfully!");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h1>
          <p className="text-gray-500">
            {step === 1
              ? "Enter your phone number to receive an OTP"
              : "Enter the OTP and your new password"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-2 w-20 rounded-full transition-all ${step >= 1 ? 'bg-[#A8FF01]' : 'bg-gray-300'}`} />
          <div className={`h-2 w-20 rounded-full transition-all ${step >= 2 ? 'bg-[#A8FF01]' : 'bg-gray-300'}`} />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Phone Number */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...phoneForm}>
                <form
                  onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter 10-digit phone number"
                              className="pl-10 bg-white/50 border-gray-200"
                              maxLength={10}
                              type="tel"
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                field.onChange(value)
                              }}
                            />
                          </FormControl>
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Send OTP"
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => router.push("/driver-auth/login")}
                      className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 mx-auto"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Login
                    </button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}

          {/* Step 2: OTP + New Password */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Timer Display */}
              {!isOTPExpired && timer > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-blue-700 text-sm font-medium">
                    OTP expires in {formatTime(timer)}
                  </p>
                </div>
              )}

              {isOTPExpired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <p className="text-red-700 text-sm font-medium">
                    OTP expired. Please request a new one.
                  </p>
                </div>
              )}

              <Form {...resetForm}>
                <form
                  onSubmit={resetForm.handleSubmit(onResetPasswordSubmit)}
                  className="space-y-4"
                >
                  {/* Phone Number Display */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-gray-900 font-medium">{userPhone}</p>
                  </div>

                  {/* OTP Field */}
                  <FormField
                    control={resetForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter 6-digit OTP"
                              className="pl-10 bg-white/50 border-gray-200 text-center tracking-widest text-lg"
                              disabled={isOTPExpired}
                              maxLength={6}
                              inputMode="numeric"
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                field.onChange(value)
                              }}
                            />
                          </FormControl>
                          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* New Password Field */}
                  <FormField
                    control={resetForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              placeholder="New Password (min 6 characters)"
                              className="pl-10 pr-10 bg-white/50 border-gray-200"
                              disabled={isOTPExpired}
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm New Password"
                              className="pl-10 pr-10 bg-white/50 border-gray-200"
                              disabled={isOTPExpired}
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
                    disabled={isOTPExpired || loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>

                  {/* Resend OTP / Request New OTP */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={canResend ? handleResendOTP : () => {
                        setStep(1)
                        phoneForm.reset()
                        resetForm.reset()
                      }}
                      className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 mx-auto"
                      disabled={loading && canResend}
                    >
                      {loading && canResend ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          {canResend ? "Resend OTP" : "Request New OTP"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DriverForgotPassword;
