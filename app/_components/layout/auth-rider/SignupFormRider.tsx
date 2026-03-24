"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, Mail, Lock, Phone, MapPin,
  ArrowRight, ArrowLeft, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BACKEND_BASE_URL, config, media } from "@/constant"
import { useRouter } from "next/navigation"
import { riderSignupSchema, RiderSignupSchema } from "@/app/validations/riderSignupValidations"
import toast from "react-hot-toast"


interface ServiceCity {
  _id: string
  city: string
  label: string
  value: string
  status: boolean
}

interface SignupFormRiderProps {
  company_code?: string
}


const SignupFormRider = ({ company_code }: SignupFormRiderProps) => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [serviceCities, setServiceCities] = useState<ServiceCity[]>([])
  const [cityLoading, setCityLoading] = useState(true)

  useEffect(() => {
    const fetchServiceCities = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${config.getServiceCity}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
            },
          }
        )
        const data = await response.json()

        if (Array.isArray(data)) {
          // Filter only active cities
          const activeCities = data.filter(city => city.status === true)
          setServiceCities(activeCities)
        }
      } catch (error) {
        console.error('Failed to fetch service cities:', error)
      } finally {
        setCityLoading(false)
      }
    }

    fetchServiceCities()
  }, [])

  const form = useForm<RiderSignupSchema>({
    resolver: zodResolver(riderSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      serviceCity: "",
    },
  })

  const onSubmit = async (values: RiderSignupSchema) => {
    setLoading(true)
    try {
      // Find the selected city object from serviceCities
      const selectedCity = serviceCities.find(city => city.city === values.serviceCity)

      if (!selectedCity) {
        throw new Error("Selected city not found")
      }

      const payload = {
        email: values.email,
        fname: values.firstName,
        lname: values.lastName,
        password: values.password,
        phone: values.phone,
        scId: selectedCity._id,
        scIds: [{
          _id: selectedCity._id,
          label: selectedCity.label
        }],
        scity: selectedCity.label,
        company_code: company_code
      }

      const response = await fetch(`${BACKEND_BASE_URL}${config.signUpRider}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY || ""
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success && data.token) {
        // Store token in cookie
        document.cookie = `token=${data.token}; path=/`
        toast.success('Account created successfully!')

        setTimeout(() => {
          window.open(`${media.OIOT_PLAYSTORE}`, '_blank', 'noopener,noreferrer')
        }, 1000)

      } else {

        toast.error(data?.message)
        // Handle error - you might want to show an error message
        form.setError('root', {
          type: 'manual',
          message: data.message || 'Signup failed. Please try again.'
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      form.setError('root', {
        type: 'manual',
        message: 'Something went wrong. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: "Personal Information",
      description: "Let's start with your basic details",
      fields: ["firstName", "lastName"],
    },
    {
      title: "Contact Details",
      description: "How can we reach you?",
      fields: ["email", "phone"],
    },
    {
      title: "Final Steps",
      description: "Almost there! Just a few more details",
      fields: ["password", "serviceCity"],
    },
  ]

  const currentStep = steps[step - 1]

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full mx-1 ${i + 1 <= step ? "bg-[#5444FB]" : "bg-gray-200"
                }`}
            />
          ))}
        </div>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#5444FB]">{currentStep.title}</h2>
          <p className="text-gray-500 mt-1">{currentStep.description}</p>
        </motion.div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="First Name *"
                              className="pl-10 bg-white/50"
                            />
                          </FormControl>
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Last Name *"
                              className="pl-10 bg-white/50"
                            />
                          </FormControl>
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Email Address *"
                              className="pl-10 bg-white/50"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Phone Number *"
                              className="pl-10 bg-white/50"
                            />
                          </FormControl>
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Password *"
                              className="pl-10 bg-white/50"
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceCity"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={cityLoading}
                            >
                              <SelectTrigger className="pl-10 bg-white/50">
                                <SelectValue placeholder={cityLoading ? "Loading cities..." : "Select Service City *"} />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceCities.map((city) => (
                                  <SelectItem key={city._id} value={city.city}>
                                    {city.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
            <Button
              type={step === 3 ? "submit" : "button"}
              onClick={() => step < 3 && setStep(step + 1)}
              className="bg-[#5444FB] text-white hover:bg-[#5444FB]/90 ml-auto flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : step === 3 ? (
                "Complete Signup"
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignupFormRider