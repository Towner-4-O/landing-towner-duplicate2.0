"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Phone, Loader2, ArrowRight, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { BACKEND_BASE_URL } from "@/constant"
import toast from "react-hot-toast"
import Link from "next/link"

const SignupClient = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!termsAccepted) {
      toast.error("Please accept terms and conditions")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const payload: any = {
        phone_number: phoneNumber,
        purpose: "signup",
      }
      if (referralCode.trim()) {
        payload.referral_code = referralCode.trim().toUpperCase()
      }

      const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP")
      }

      toast.success(data.message || "OTP sent successfully!")

      // Pass all signup data to OTP page
      const params = new URLSearchParams({
        phone: phoneNumber,
        purpose: "signup",
        name: fullName.trim(),
      })
      if (referralCode.trim()) {
        params.append("referral", referralCode.trim())
      }

      router.push(`/driver-auth/verify-otp?${params.toString()}`)

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
          <h1 className="text-3xl font-bold tracking-tight">Join Towner</h1>
          <p className="text-gray-500">Create your driver account - Zero commission</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <div className="relative">
              <Input
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  setError("")
                }}
                className="pl-10 bg-white/50 border-gray-200"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Referral Code (Optional)</label>
            <Input
              type="text"
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              className="bg-white/50 border-gray-200"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              I agree to Towner{" "}
              <Link href="/terms" className="text-black underline">Terms & Conditions</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-black underline">Privacy Policy</Link>
            </label>
          </div>

          <Button
            onClick={handleSendOTP}
            className="w-full bg-[#A8FF01] text-black hover:bg-[#86cc01] transition-all duration-300"
            disabled={isLoading || phoneNumber.length !== 10 || !fullName.trim() || !termsAccepted}
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

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/driver-auth/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupClient
