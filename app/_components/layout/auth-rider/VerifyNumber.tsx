// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Phone, Loader2, ArrowRight, KeyRound } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { BACKEND_BASE_URL, config } from "@/constant"
// import { motion, AnimatePresence } from "framer-motion"

// const formSchema = z.object({
//   phone: z.string()
//     .min(10, "Phone number must be 10 digits")
//     .max(10, "Phone number must be 10 digits")
//     .regex(/^\d+$/, "Phone number must contain only digits"),
//   otp: z.string().optional(),  // Remove length validation for initial render
// })

// interface VerifyNumberProps {
//   onVerificationSuccess: () => void,
//   color?: string;
//   text?: string;
// }

// const VerifyNumber = ({ onVerificationSuccess, color, text }: VerifyNumberProps) => {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [showOTP, setShowOTP] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       phone: "",
//       otp: "",
//     },
//     mode: "onChange"  // Add this line for real-time validation
//   })

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoading(true);
//     try {
//       if (!showOTP) {
//         // Verify phone number
//         const response = await fetch(
//           // `${BACKEND_BASE_URL}${config.verifyNumber}`, temporarily using nimmavahana instead of production --- >>>
//           `https://api.nimmavahana.com${config.verifyNumber}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ phone: values.phone }),
//           }
//         );

//         const data = await response.json();

//         if (data.success === true) {

//           setShowOTP(true);
//           setCountdown(120)
//         } else {
//           form.setError("phone", {
//             type: "manual",
//             message: "This number is already registered",
//           });
//         }
//       } else {
//         const response = await fetch(
//           // `${BACKEND_BASE_URL}${config.verifyOTP}`, temporarily using nimmavahana instead of production --- >>>
//           `https://api.nimmavahana.com${config.verifyOTP}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               phone: form.getValues("phone"),
//               otp: values.otp
//             }),
//           }
//         );

//         const data = await response.json();

//         if (data.success) {
//           onVerificationSuccess();
//         } else {
//           form.setError("otp", {
//             type: "manual",
//             message: data.message || "Invalid OTP. Please try again.",
//           });
//         }
//       }
//     } catch (error) {
//       form.setError(showOTP ? "otp" : "phone", {
//         type: "manual",
//         message: "Something went wrong. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [countdown, setCountdown] = useState(0);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleResendOTP = async () => {
//     try {
//       const response = await fetch(
//         `${BACKEND_BASE_URL}${config.verifyNumber}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone: form.getValues("phone") }),
//         }
//       );

//       const data = await response.json();

//       if (data.success === true) {

//         setCountdown(120); // Start 30 second countdown
//       }
//     } catch (error) {
//       console.error("Failed to resend OTP");
//     }
//   };


//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={showOTP ? "otp" : "phone"}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="text-center mb-6">
//               <h1 className={`text-2xl font-bold text-black`}>
//                 {showOTP ? "Enter OTP" : "Verify Phone Number"}
//               </h1>
//               <p className="text-gray-500 mt-1 text-sm">
//                 {showOTP
//                   ? `We've sent a code to +91 ${form.getValues("phone")}`
//                   : "Please enter your phone number to continue"
//                 }
//               </p>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-5">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                   {showOTP ? (
//                     <FormField
//                       control={form.control}
//                       name="otp"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="relative">
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 type="text"
//                                 placeholder="Enter 4-digit OTP"
//                                 className="pl-10 bg-white/50 h-11 text-center"
//                                 maxLength={4}
//                               />
//                             </FormControl>
//                             <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   ) : (
//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="relative">
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 placeholder="Enter Phone Number"
//                                 className="pl-10 bg-white/50 h-11"
//                                 maxLength={10}
//                               />
//                             </FormControl>
//                             <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   )}

//                   <Button
//                     type="submit"
//                     className={`w-full bg-[${color}] text-[${text}] hover:bg-[${color}]/90 flex items-center justify-center gap-2 h-11`}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Verifying...
//                       </>
//                     ) : showOTP ? (
//                       "Verify OTP"
//                     ) : (
//                       <>
//                         Verify Number <ArrowRight className="h-4 w-4" />
//                       </>
//                     )}
//                   </Button>

//                   {showOTP && (
//                     <div className="space-y-2">
//                       <button
//                         type="button"
//                         onClick={handleResendOTP}
//                         disabled={countdown > 0}
//                         className={`w-full text-sm ${countdown > 0
//                           ? "text-gray-400 cursor-not-allowed"
//                           : `text-black hover:text-black`
//                           }`}
//                       >
//                         {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setShowOTP(false)
//                           form.setValue("otp", "")
//                           setCountdown(0)
//                         }}
//                         className={`w-full text-sm text-gray-500 hover:text-[${color}]`}
//                       >
//                         Change Phone Number
//                       </button>
//                     </div>
//                   )}
//                 </form>
//               </Form>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// export default VerifyNumber
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Phone, Loader2, ArrowRight, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BACKEND_BASE_URL } from "@/constant"
import { motion, AnimatePresence } from "framer-motion"

const phoneSchema = z.object({
  phone: z.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
})

const otpSchema = z.object({
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
})

interface VerifyNumberProps {
  onVerificationSuccess: (phone: string, otp: string) => void,
  color?: string;
  text?: string;
}

const VerifyNumber = ({ onVerificationSuccess, color = "#A8FF01", text = "#000000" }: VerifyNumberProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [showOTPMessage, setShowOTPMessage] = useState(false)

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onChange"
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange"
  })

  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: values.phone,
            purpose: "signup"
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setPhoneNumber(values.phone);
        setShowOTP(true);
        setCountdown(data.data.expires_in || 600); // 600 seconds = 10 minutes
        setShowOTPMessage(true);
        setTimeout(() => {
          setShowOTPMessage(false);
        }, 5000);
      } else {
        phoneForm.setError("phone", {
          type: "manual",
          message: data.message || "Failed to send OTP. Please try again.",
        });
      }
    } catch (error) {
      phoneForm.setError("phone", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // In VerifyNumber.tsx - around line 80
  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phoneNumber,
            otp: values.otp
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ Pass both phone and OTP
        onVerificationSuccess(phoneNumber, values.otp);
      } else {
        otpForm.setError("otp", {
          type: "manual",
          message: data.message || "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      otpForm.setError("otp", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/driver-auth/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phoneNumber,
            purpose: "signup"
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCountdown(data.data.expires_in || 600);
        setShowOTPMessage(true);
        setTimeout(() => {
          setShowOTPMessage(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setShowOTP(false);
    setPhoneNumber("");
    setCountdown(0);
    otpForm.reset();
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={showOTP ? "otp" : "phone"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black">
                {showOTP ? "Enter OTP" : "Verify Phone Number"}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {showOTP
                  ? `We've sent a code to +91 ${phoneNumber}`
                  : "Please enter your phone number to continue"
                }
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5">
              {!showOTP ? (
                <Form {...phoneForm}>
                  <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                    <FormField
                      control={phoneForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Phone Number"
                                className="pl-10 bg-white/50 h-11"
                                maxLength={10}
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
                      style={{ backgroundColor: color, color: text }}
                      className="w-full hover:opacity-90 flex items-center justify-center gap-2 h-11"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Verify Number <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...otpForm}>
                  {showOTPMessage && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-600 text-sm text-center mb-4 bg-green-50 p-3 rounded-lg"
                    >
                      OTP has been sent to ******{phoneNumber.slice(-4)}
                    </motion.p>
                  )}

                  {countdown > 0 && (
                    <p className="text-blue-600 text-sm text-center mb-4">
                      OTP expires in {Math.floor(countdown / 60)}:
                      {(countdown % 60).toString().padStart(2, "0")}
                    </p>
                  )}

                  {countdown === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg"
                    >
                      OTP expired. Please request a new one.
                    </motion.p>
                  )}

                  <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className="pl-10 bg-white/50 h-11 text-center tracking-widest text-lg"
                                maxLength={6}
                                disabled={countdown === 0}
                              />
                            </FormControl>
                            <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      style={{ backgroundColor: color, color: text }}
                      className="w-full hover:opacity-90 flex items-center justify-center gap-2 h-11"
                      disabled={loading || countdown === 0}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={countdown > 0 || loading}
                        className={`w-full text-sm ${countdown > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black hover:text-gray-700"
                          }`}
                      >
                        {countdown > 0
                          ? `Resend OTP in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
                          : "Resend OTP"
                        }
                      </button>

                      <button
                        type="button"
                        onClick={handleChangeNumber}
                        className="w-full text-sm text-gray-500 hover:text-black"
                      >
                        Change Phone Number
                      </button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default VerifyNumber
