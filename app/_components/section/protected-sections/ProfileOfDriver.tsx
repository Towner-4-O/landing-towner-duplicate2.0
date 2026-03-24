"use client"

import { useEffect, useState } from "react"
import {
  MapPin,
  Car,
  Phone,
  Mail,
  Calendar,
  User,
  AlertCircle,
  Building2,
  Shield,
  Smartphone,
} from "lucide-react"
import { BACKEND_BASE_URL } from "@/constant"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import toast from "react-hot-toast"


interface DriverProfileData {
  tenant_id: string
  driver_code: string
  current_status: string
  status: boolean
  soft_delete: boolean
  version: string
  personal_info: {
    full_name: string
    email: string
    phone: string
    country_code: string
    gender: string
    date_of_birth: string
    profile_image_url: string
    address: string
  }
  service_area: {
    city_id: string
    city_name: string
    state_id: string
    state_name: string
    country_id: string
    country_name: string
  }
  business_profile: {
    profile_name: string
    business_type: string
    registration_date: string
    tax_available: boolean
    igst_percentage: string
    cgst_percentage: string
    sgst_percentage: string
    pan_encrypted: string
    gst_number_encrypted: string
  }
  device_info: {
    device_type: string | null
  }
  verification: {
    overall_status: string | null
    driver_doc_status: string | null
    vehicle_doc_status: string | null
  }
  security: {
    login_type: string | null
    two_factor_enabled: boolean | null
    failed_login_attempts: number | null
  }
  metrics: Record<string, any>
  referral: {
    referral_code: string | null
  }
  createdAt: string
  updatedAt: string
}

const ProfileOfDriver = () => {
  const router = useRouter()
  const [driverData, setDriverData] = useState<DriverProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        // ✅ FIXED: Use cookies instead of localStorage
        const accessToken = await getCookie('access_token') as string

        if (!accessToken) {
          toast.error("Please login again")
          router.push('/driver-auth/login')
          return
        }

        const url = `${BACKEND_BASE_URL}/drivers-profile`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,  // ✅ Uses cookie token
            "Content-Type": "application/json",
          },
        })

        if (response.status === 403 || response.status === 401) {
          toast.error("Session expired. Redirecting to login...")
          router.push('/driver-auth/login')
          return
        }

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch profile")
        }

        setDriverData(result.data)
        setError(null)

      } catch (error: any) {
        console.error("❌ Error fetching driver profile:", error)
        toast.error(error.message || "Error loading profile")
        setError(error.message || "Error loading profile. Please try again.")
        // Redirect after 2 seconds
        setTimeout(() => router.push('/driver-auth/login'), 2000)
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndFetchProfile()
  }, [router])
  useEffect(() => {
    const blockBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
      window.history.pushState(null, '', window.location.href);
    };

    blockBackNavigation();

    const handlePopState = (event: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
      toast("Please use logout button to exit", { duration: 2000 });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Safe helper functions with null checks
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200'

    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'OFFLINE': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getVerificationColor = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-600'

    switch (status.toUpperCase()) {
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatStatus = (status: string | null | undefined) => {
    if (!status) return 'N/A'
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' ')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A8FF01]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-2">Error Loading Profile</h3>
              <p className="text-red-800 text-sm mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!driverData) {
    return (
      <div className="text-center text-gray-600 p-6">
        <p>No profile data available</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="relative h-[280px] sm:h-64 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#A7FF03]/20 to-transparent" />

          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-gray-500" />
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 sm:right-6 flex flex-col sm:flex-row items-end sm:items-center gap-2">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700">
              <p className="text-[#A7FF03] text-xs sm:text-sm">Gender</p>
              <p className="text-white text-sm sm:text-base font-medium capitalize">
                {driverData.personal_info.gender.toLowerCase()}
              </p>
            </div>
            <div className={`backdrop-blur-sm px-3 py-2 rounded-lg border ${getStatusColor(driverData.current_status)}`}>
              <p className="text-xs font-medium capitalize">
                {formatStatus(driverData.current_status)}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 sm:pb-8 pt-32 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl mx-auto sm:mx-0">
                <img
                  src={driverData.personal_info.profile_image_url || "/icons/Logo.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/icons/Logo.png"
                  }}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {driverData.personal_info.full_name}
                </h1>
                <p className="text-gray-200 mt-1 text-sm sm:text-base">
                  Driver Code: {driverData.driver_code}
                </p>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-[#A7FF03]" />
                  <span className="text-white text-sm">
                    {driverData.service_area.city_name}, {driverData.service_area.state_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 sm:px-8 py-6">
          {/* Verification Status Banner */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-4 rounded-lg ${getVerificationColor(driverData.verification.overall_status)}`}>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <div>
                  <p className="text-xs opacity-75">Overall Status</p>
                  <p className="font-semibold">{formatStatus(driverData.verification.overall_status)}</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${getVerificationColor(driverData.verification.driver_doc_status)}`}>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <div>
                  <p className="text-xs opacity-75">Driver Docs</p>
                  <p className="font-semibold">{formatStatus(driverData.verification.driver_doc_status)}</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${getVerificationColor(driverData.verification.vehicle_doc_status)}`}>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                <div>
                  <p className="text-xs opacity-75">Vehicle Docs</p>
                  <p className="font-semibold">{formatStatus(driverData.verification.vehicle_doc_status)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">
                      {driverData.personal_info.country_code} {driverData.personal_info.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{driverData.personal_info.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium">{driverData.personal_info.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(driverData.personal_info.date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {driverData.device_info.device_type && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Device Type</p>
                      <p className="font-medium">{driverData.device_info.device_type}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Profile */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-500" />
                Business Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Profile Name</p>
                  <p className="font-medium">{driverData.business_profile.profile_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Business Type</p>
                  <p className="font-medium">{driverData.business_profile.business_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Registration Date</p>
                  <p className="font-medium">
                    {new Date(driverData.business_profile.registration_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tax Available</p>
                  <p className="font-medium">
                    {driverData.business_profile.tax_available ? 'Yes' : 'No'}
                  </p>
                </div>
                {driverData.business_profile.tax_available && (
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-500">IGST</p>
                      <p className="font-medium">{driverData.business_profile.igst_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CGST</p>
                      <p className="font-medium">{driverData.business_profile.cgst_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">SGST</p>
                      <p className="font-medium">{driverData.business_profile.sgst_percentage}%</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">PAN</p>
                  <p className="font-medium font-mono">{driverData.business_profile.pan_encrypted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">GST Number</p>
                  <p className="font-medium font-mono">{driverData.business_profile.gst_number_encrypted}</p>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                Service Area
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">City</p>
                  <p className="font-medium">{driverData.service_area.city_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">State</p>
                  <p className="font-medium">{driverData.service_area.state_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="font-medium">{driverData.service_area.country_name}</p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-500" />
                Account Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Account Created</p>
                  <p className="font-medium">
                    {new Date(driverData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {new Date(driverData.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {driverData.referral.referral_code && (
                  <div>
                    <p className="text-xs text-gray-500">Referral Code</p>
                    <p className="font-medium">{driverData.referral.referral_code}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileOfDriver
