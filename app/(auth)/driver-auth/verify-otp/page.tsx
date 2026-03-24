"use client"
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
noStore()

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BACKEND_BASE_URL } from "@/constant"
import toast from "react-hot-toast"
import { setCookie } from "cookies-next"

const VerifyOtpPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || ""
  const purpose = searchParams.get("purpose") || "login"
  const fullName = searchParams.get("name") || ""
  const referralCode = searchParams.get("referral") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!phoneNumber) {
      router.push("/driver-auth/login")
      return
    }

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(countdown)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [phoneNumber, router])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          purpose: purpose,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to resend OTP")
      }

      toast.success("OTP resent successfully!")
      setTimer(60)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()

    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP")
    } finally {
      setIsResending(false)
    }
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      toast.error("Please enter complete OTP")
      return
    }

    setIsLoading(true)

    try {
      if (purpose === "login") {
        // LOGIN API
        const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phoneNumber,
            otp: otpString,
            fcm_id: "web_fcm_token",
            device_token: "",
            device_type: "web",
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Login failed")
        }

        // Store tokens
        setCookie('access_token', data.data.tokens.access_token, {
          maxAge: data.data.tokens.expires_in,
          path: '/',
          sameSite: 'strict',
        })
        setCookie('refresh_token', data.data.tokens.refresh_token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
        })
        setCookie('driver_id', data.data.driver_id, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
        })

        toast.success("Login successful!")
        router.push("/userspace/profile")

      } else {
        // SIGNUP API - Full payload with all required fields
        const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/sign-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenant_id: "towner_driver",
            otp: otpString,
            personal_info: {
              full_name: fullName,
              email: "",
              phone: phoneNumber,
              password: "",
              country_code: "+91",
              gender: "male", // Default - can add selector later
              date_of_birth: "01-01-2000", // Default - can add later
              profile_image_url: "",
              address: "Devanahalli, Karnataka", // User's location
            },
            location: {
              latitude: "13.136178",
              longitude: "78.129155", // Devanahalli coords
            },
            device_info: {
              device_type: "web",
              device_model: "Chrome",
              os_version: "Windows/Mac",
              app_version: "1.0.0",
            },
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Signup failed")
        }

        // Store tokens (same as login)
        setCookie('access_token', data.data.tokens.access_token, {
          maxAge: data.data.tokens.expires_in,
          path: '/',
          sameSite: 'strict',
        })
        setCookie('refresh_token', data.data.tokens.refresh_token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
        })
        setCookie('driver_id', data.data.driver_id, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
        })

        toast.success("Signup successful! Account pending approval.")
        router.push("/userspace/profile")
      }

    } catch (error: any) {
      toast.error(error.message || "Verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Verify OTP</h1>
          <p className="text-gray-500">
            Enter the 6-digit code sent to<br />
            <span className="font-medium text-gray-900">******{phoneNumber.slice(-4)}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>

          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-gray-500">
                Resend OTP in <span className="font-medium text-gray-900">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-sm text-black font-medium hover:underline disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>

          <Button
            onClick={handleVerifyOTP}
            className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              purpose === "login" ? "Verify & Login" : "Verify & Sign Up"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyOtpPage
