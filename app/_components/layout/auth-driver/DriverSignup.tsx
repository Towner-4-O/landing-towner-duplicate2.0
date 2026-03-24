"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import {
  driverSignupSchema,
  type DriverSignupFormData
} from '@/app/validations/driverSignupValidations'
import { BACKEND_BASE_URL } from '@/constant'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { setCookie } from 'cookies-next'

interface Country {
  _id: string;
  country_name: string;
  phone_code: string;
  currency_code: string;
  status: string;
}

interface State {
  _id: string;
  state_name: string;
  country_id: string;
  status: string;
}

interface City {
  _id: string;
  city_name: string;
  state_id: string;
  country_id: string;
  status: string;
}

interface DriverSignupProps {
  verifiedPhone: string;
  verifiedOTP: string;
  businessIdFromPath?: string;
}

const DriverSignup = ({ verifiedPhone, verifiedOTP, businessIdFromPath }: DriverSignupProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  // Extract business_id from URL
  const getBusinessIdFromUrl = (): string => {
    // Priority 1: Path parameter (passed as prop)
    if (businessIdFromPath) return businessIdFromPath;

    if (typeof window === 'undefined') return '';

    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('business_id') || urlParams.get('businessId') || '';

    console.log("Business ID extracted from URL:", businessId);
    return businessId;
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location captured:", position.coords.latitude, position.coords.longitude)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const form = useForm<DriverSignupFormData>({
    resolver: zodResolver(driverSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: verifiedPhone || "",
      password: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      referral_code: "",
      business_id: getBusinessIdFromUrl(), // Auto-populate from URL
      business_name: "",
    },
    mode: "onSubmit",
  })

  // Lock business_id field if it comes from URL
  const isBusinessIdFromUrl = !!getBusinessIdFromUrl()

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true)
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/utility/countries`)
        const data = await response.json()

        if (data.success) {
          setCountries(data.data)
          console.log("Countries loaded:", data.data.length)
        }
      } catch (error) {
        console.error('Error fetching countries:', error)
        toast.error('Failed to load countries')
      } finally {
        setIsLoadingCountries(false)
      }
    }
    fetchCountries()
  }, [])

  const handleCountryChange = async (countryId: string) => {
    console.log("Country selected:", countryId)
    form.setValue('country', countryId, { shouldValidate: true })
    form.setValue('state', '', { shouldValidate: false })
    form.setValue('city', '', { shouldValidate: false })
    setStates([])
    setCities([])

    setIsLoadingStates(true)
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/utility/states/get-all-by-country/${countryId}`
      )
      const data = await response.json()

      if (data.success) {
        setStates(data.data)
        console.log("States loaded:", data.data.length)
      }
    } catch (error) {
      console.error('Error fetching states:', error)
      toast.error('Failed to load states')
    } finally {
      setIsLoadingStates(false)
    }
  }

  const handleStateChange = async (stateId: string) => {
    console.log("State selected:", stateId)
    form.setValue('state', stateId, { shouldValidate: true })
    // Reset dependent field
    form.setValue('city', '', { shouldValidate: false })
    setCities([])

    setIsLoadingCities(true)
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/utility/cities/get-all-by-state/${stateId}`
      )
      const data = await response.json()

      if (data.success) {
        setCities(data.data)
        console.log("Cities loaded:", data.data.length)
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
      toast.error('Failed to load cities')
    } finally {
      setIsLoadingCities(false)
    }
  }

  const handleCityChange = (cityId: string) => {
    console.log("City selected:", cityId)
    form.setValue('city', cityId, { shouldValidate: true })
  }

  const onSubmit = async (values: DriverSignupFormData) => {
    setIsLoading(true)

    try {
      const selectedCountry = countries.find(c => c._id === values.country)
      const selectedState = states.find(s => s._id === values.state)
      const selectedCity = cities.find(c => c._id === values.city)

      const payload: any = {
        tenant_id: "towner_driver",
        otp: verifiedOTP || "",
        personal_info: {
          full_name: `${values.firstName} ${values.lastName}`.trim(),
          phone: values.phone,
          email: values.email || "",
          password: values.password || "towner",
          country_code: selectedCountry?.phone_code || "+91",
          gender: values.gender?.toLowerCase() || "",
        },
        service_area: {
          city_id: selectedCity?._id || "",
          city_name: selectedCity?.city_name || "",
          city_code: (selectedCity?.city_name || "BLR").substring(0, 3).toUpperCase(),
          state_id: selectedState?._id || "",
          state_name: selectedState?.state_name || "",
          country_id: selectedCountry?._id || "",
          country_name: selectedCountry?.country_name || "",
          accept_daily: true,
          accept_rentals: true,
          accept_outstation: false,
          service_city_id: selectedCity?._id || "",
          service_city_name: selectedCity?.city_name || "",
        },
        device_info: {
          device_id: typeof window !== "undefined" ? window.navigator.userAgent : "Web-Browser",
          device_type: "web",
          device_model: typeof window !== "undefined" ? window.navigator.platform : "Web",
          os_version: "Web",
          app_version: "1.2.0",
          network_type: "wifi",
        },
      }

      if (values.referral_code) {
        payload.referral_code = values.referral_code;
      }

      // Explicitly handle business_profile
      if (values.business_id && values.business_id.trim() !== "") {
        payload.business_profile = {
          business_id: values.business_id.trim()
        };
      }

      if (location) {
        payload.location = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }

      console.log("Payload being sent:", JSON.stringify(payload, null, 2))

      const response = await fetch(`${BACKEND_BASE_URL}/driver-auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signup failed')
      }

      // Handle successful signup
      if (data.data?.tokens) {
        const { tokens } = data.data;

        setCookie('access_token', tokens.access_token, {
          maxAge: tokens.expires_in,
          path: '/',
          sameSite: 'strict',
        })

        setCookie('refresh_token', tokens.refresh_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          sameSite: 'strict',
        })
      }

      if (data.data?.driver_id) {
        setCookie('driver_id', data.data.driver_id, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
        })
      }

      toast.success(data.message || 'Signup successful. Your account is pending approval.')

      router.push("/userspace/profile")

    } catch (error: any) {
      console.error('Signup failed:', error)
      toast.error(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
      console.log("=== FORM SUBMISSION ENDED ===")
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("Submit button clicked!")
    console.log("Form is valid:", form.formState.isValid)
    console.log("Form errors:", form.formState.errors)
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Account</h2>

      <Form {...form}>
        <form onSubmit={(e) => {
          handleFormSubmit(e)
          form.handleSubmit(onSubmit)(e)
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter firstname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter number"
                      type="tel"
                      maxLength={10}
                      disabled={!!verifiedPhone}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={handleCountryChange}
                    value={field.value}
                    disabled={isLoadingCountries}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingCountries ? "Loading..." : "Select country"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country._id} value={country._id}>
                          {country.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={handleStateChange}
                    value={field.value}
                    disabled={!form.getValues('country') || isLoadingStates}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingStates ? "Loading..." : "Select state"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state._id} value={state._id}>
                          {state.state_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={handleCityChange}
                  value={field.value}
                  disabled={!form.getValues('state') || isLoadingCities}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoadingCities ? "Loading..." : "Select city"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city._id} value={city._id}>
                        {city.city_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#A8FF01] hover:bg-[#86cc01] text-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default DriverSignup