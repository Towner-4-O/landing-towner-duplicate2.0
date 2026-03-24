"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Phone, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BACKEND_BASE_URL } from "@/constant"
import toast from "react-hot-toast"
import Link from "next/link"

const LoginClient = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          purpose: "login",
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        if (data.message?.includes("not registered") || data.message?.includes("not found")) {
          toast.error("Phone number not registered. Please sign up first.")
          setError("Phone number not registered")
          return
        }
        throw new Error(data.message || "Failed to send OTP")
      }

      toast.success(data.message || "OTP sent successfully!")
      router.push(`/driver-auth/verify-otp?phone=${phoneNumber}&purpose=login`)

    } catch (error: any) {
      console.error("Send OTP error:", error)
      setError(error.message || "Failed to send OTP. Please try again.")
      toast.error(error.message || "Failed to send OTP")
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
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Driver Login</h1>
          <p className="text-gray-500">Enter your phone number to continue</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 10) {
                    setPhoneNumber(value)
                    setError("")
                  }
                }}
                className="pl-10 bg-white/50 border-gray-200"
                maxLength={10}
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>

          <Button
            onClick={handleSendOTP}
            className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
            disabled={isLoading || phoneNumber.length !== 10}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Get OTP
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              New to Towner?{" "}
              <Link
                href="/driver-auth/signup"
                className="text-black font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginClient
