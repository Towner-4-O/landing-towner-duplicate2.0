import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#8dc720]" />
    </div>
  )
}