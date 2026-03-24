// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { setCookie } from 'cookies-next'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { driverLoginSchema, type DriverLoginSchema } from "@/app/validations/driverLoginValidation"
// import { BACKEND_BASE_URL } from "@/constant"

// const LoginFormDriver = () => {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm<DriverLoginSchema>({
//     resolver: zodResolver(driverLoginSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   })

//   const onSubmit = async (values: DriverLoginSchema) => {
//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await fetch(`${BACKEND_BASE_URL}/api/driverlogin/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       })

//       const data = await response.json()

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Login failed")
//       }

//       // Store token in cookie
//       // document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days expiry


//       setCookie('token', data.token, {
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: '/',
//         sameSite: 'strict',
//       })


//       // Redirect to dashboard
//       router.push("/userspace/profile")
//     } catch (error: any) {
//       setError(error.message || "Invalid credentials. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="space-y-6"
//       >
//         <div className="space-y-2 text-center">
//           <h1 className="text-3xl font-bold tracking-tight">Driver Login</h1>
//           <p className="text-gray-500">Enter your credentials to continue</p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="relative">
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="Email or Phone number or Code"
//                         className="pl-10 bg-white/50 border-gray-200"
//                       />
//                     </FormControl>
//                     <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="relative">
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="password"
//                         placeholder="Password"
//                         className="pl-10 bg-white/50 border-gray-200"
//                       />
//                     </FormControl>
//                     <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}


// <FormField
//   control={form.control}
//   name="password"
//   render={({ field }) => (
//     <FormItem>
//       <div className="relative">
//         <FormControl>
//           <Input
//             {...field}
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="pl-10 bg-white/50 border-gray-200"
//           />
//         </FormControl>
//         <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//         >
//           {showPassword ? (
//             <EyeOff className="h-5 w-5" />
//           ) : (
//             <Eye className="h-5 w-5" />
//           )}
//         </button>
//       </div>
//       <FormMessage />
//     </FormItem>
//   )}
// />

//             {error && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-red-500 text-sm text-center"
//               >
//                 {error}
//               </motion.p>
//             )}

//             <Button
//               type="submit"
//               className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//             <p className="text-center text-sm">
//               <a 
//                 href="/driver-auth/forgotpassword" 
//                 className="text-blue hover:underline"
//               >
//                 Forgot Password?
//               </a>
//             </p>
//             <p className="text-center text-sm text-gray-500">
//                 Don't have an account?{" "}
//                 <a 
//                   href="/driver-auth/signup" 
//                   className="text-black hover:underline"
//                 >
//                   Sign up
//                 </a>
//               </p>
//           </form>
//         </Form>
//       </motion.div>
//     </div>
//   )
// }

// export default LoginFormDriver
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { driverLoginSchema, type DriverLoginSchema } from "@/app/validations/driverLoginValidation"
import { BACKEND_BASE_URL } from "@/constant"
import toast from "react-hot-toast"

const LoginFormDriver = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<DriverLoginSchema>({
    resolver: zodResolver(driverLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: DriverLoginSchema) => {
    setIsLoading(true)
    setError("")

    try {
      console.log("🚀 Attempting login...")
      console.log("📞 Phone:", values.username)

      const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
        },
        body: JSON.stringify({
          phone_number: values.username,
          password: values.password,
        }),
      })

      const data = await response.json()
      console.log("📦 Login Response:", data)

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed")
      }

      // Store tokens in localStorage
      if (data.data?.tokens) {
        console.log("💾 Storing tokens in localStorage...")

        localStorage.setItem('access_token', data.data.tokens.access_token)
        localStorage.setItem('refresh_token', data.data.tokens.refresh_token)
        localStorage.setItem('token_type', data.data.tokens.token_type || 'Bearer')
        localStorage.setItem('expires_in', data.data.tokens.expires_in.toString())

        // Calculate and store expiry timestamp
        const expiryTime = Date.now() + (data.data.tokens.expires_in * 1000)
        localStorage.setItem('token_expiry', expiryTime.toString())

        console.log("✅ Access token stored")
        console.log("✅ Refresh token stored")
      }

      // Store driver_id in localStorage
      if (data.data?.driver_id) {
        localStorage.setItem('driver_id', data.data.driver_id)
        console.log("✅ Driver ID stored")
      }

      toast.success(data.message || "Login successful!")

      console.log("🔄 Redirecting to profile...")
      // Redirect to profile
      setTimeout(() => {
        router.push("/userspace/profile")
      }, 500)

    } catch (error: any) {
      console.error("❌ Login error:", error)
      setError(error.message || "Invalid credentials. Please try again.")
      toast.error(error.message || "Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Driver Login</h1>
          <p className="text-gray-500">Enter your credentials to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone number"
                        className="pl-10 bg-white/50 border-gray-200"
                        maxLength={10}
                      />
                    </FormControl>
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-10 pr-10 bg-white/50 border-gray-200"
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center text-sm">
              <a
                href="/driver-auth/forgotpassword"
                className="text-blue hover:underline"
              >
                Forgot Password?
              </a>
            </p>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/driver-auth/signup"
                className="text-black hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}

export default LoginFormDriver
