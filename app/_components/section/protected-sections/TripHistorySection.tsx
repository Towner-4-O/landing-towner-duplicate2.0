"use client"

import { useEffect, useState, useCallback } from "react"
import {
    History,
    Calendar,
    Clock,
    Car,
    ChevronRight,
    AlertCircle,
    TrendingUp,
    ChevronLeft,
    X,
    Info,
    Hash,
    Navigation,
    Timer,
    CheckCircle2,
    MoreHorizontal,
    RefreshCw,
    MapPin
} from "lucide-react"
import { BACKEND_BASE_URL } from "@/constant"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

interface TripHistory {
    request_id: string
    trip_main_id: string
    service_city_id: string
    service_city_name: string
    vehicle_type_id: string
    vehicle_type_name: string
    user_id: string
    trip_type: string
    booking_type: string
    request_type: string
    journey_type: string | null
    schedule_date_and_time: string | null
    pickup_latitude: string
    pickup_longitude: string
    pickup_address: string
    drop_address: string
    created_at: string
    trip_code: string
    trip_status: string
    driver_id: string
    rider_id: string | null
    vehicle_id: string
    start_time: string | null
    end_time: string | null
    actual_distance_km: string
    actual_duration_min: number
}

interface PaginationData {
    current: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
    nextPage: number | null
    prevPage: number | null
}

const ITEMS_PER_PAGE = 10

export default function TripHistorySection({ compact = false }: { compact?: boolean }) {
    const router = useRouter()
    const [trips, setTrips] = useState<TripHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedTrip, setSelectedTrip] = useState<TripHistory | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState<PaginationData | null>(null)
    const [maxDataPage, setMaxDataPage] = useState(1) // highest page that actually returned data

    const fetchTrips = useCallback(async (page: number) => {
        setLoading(true)
        setError(null)
        try {
            const token = await getCookie('access_token') as string
            if (!token) {
                setError("Authentication required")
                return
            }

            const limit = compact ? 5 : ITEMS_PER_PAGE
            const res = await fetch(
                `${BACKEND_BASE_URL}/trip-histories?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            const result = await res.json()

            if (!res.ok || !result.success) {
                throw new Error(result.message || "Failed to fetch trip history")
            }

            if (result.data.length === 0 && page > 1) {
                // Permanently cap pages to maxDataPage so UI never shows empty pages again
                setPagination(prev => prev ? { ...prev, pages: maxDataPage, hasNext: false, nextPage: null } : null)
                setCurrentPage(maxDataPage)
                toast("No more trips found", { icon: "📋" })
                return
            }

            // Successful fetch — record this as the highest known page with real data
            const newMaxDataPage = Math.max(maxDataPage, page)
            setMaxDataPage(newMaxDataPage)
            setTrips(result.data)
            // If we previously discovered the real last page is lower than what
            // the API claims, keep our discovered cap. Otherwise trust the API.
            const apiPages = result.pagination.pages
            const cappedPages = maxDataPage > 1 && maxDataPage < apiPages ? maxDataPage : apiPages
            const hasNext = result.pagination.hasNext && page < cappedPages
            setPagination({ ...result.pagination, pages: cappedPages, hasNext })
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [compact])

    // Whenever currentPage changes, we hit the API for THAT specific page only
    useEffect(() => {
        fetchTrips(currentPage)
    }, [currentPage, fetchTrips])

    const goToPage = (page: number) => {
        if (!pagination) return
        if (page < 1 || page > pagination.pages) return
        setCurrentPage(page)
        if (!compact) window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const getStatusBadge = (status: string) => {
        const s = status.toUpperCase()
        if (s.includes("FINISHED")) return { bg: "bg-emerald-50 border-emerald-200 text-emerald-700", dot: "bg-emerald-500" }
        if (s.includes("CANCEL")) return { bg: "bg-red-50 border-red-200 text-red-700", dot: "bg-red-500" }
        if (s.includes("STARTED") || s.includes("ONGOING")) return { bg: "bg-blue-50 border-blue-200 text-blue-700", dot: "bg-blue-500" }
        return { bg: "bg-gray-50 border-gray-200 text-gray-600", dot: "bg-gray-400" }
    }

    const formatStatusLabel = (status: string) =>
        status.replace(/^(DRN_|RM_)/, "").replace(/_/g, " ").toLowerCase()

    // ─── Loading skeleton 
    if (loading && trips.length === 0) {
        return (
            <div className="space-y-3 animate-pulse p-1">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-28 bg-gray-100 rounded-2xl" />
                ))}
            </div>
        )
    }

    // ─── Error state 
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Failed to load trips</h3>
                <p className="text-sm text-gray-400 mb-6 max-w-xs">{error}</p>
                <button
                    onClick={() => fetchTrips(currentPage)}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                </button>
            </div>
        )
    }

    // ─── Empty state 
    if (!loading && trips.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <Car className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-2">No trips yet</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                    Your trip history will appear here once you complete your first ride.
                </p>
            </div>
        )
    }

    // ─── Trip list 
    return (
        <>
            {/* Header summary */}
            {pagination && !compact && trips.length > 0 && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">All Trips</h3>
                        <p className="text-sm text-gray-400 mt-0.5">
                            <span className="font-bold text-black">{pagination.total.toLocaleString()}</span> total • Page{" "}
                            <span className="font-bold text-black">{pagination.current}</span> of {pagination.pages}
                        </p>
                    </div>
                    <button
                        onClick={() => fetchTrips(currentPage)}
                        className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Trip cards */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {trips.map((trip, i) => {
                        const badge = getStatusBadge(trip.trip_status)
                        return (
                            <motion.div
                                key={trip.request_id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => setSelectedTrip(trip)}
                                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#A7FF03] hover:shadow-lg hover:shadow-[#A7FF03]/10 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    {/* Left: status + addresses */}
                                    <div className="flex-1 min-w-0 space-y-3">
                                        {/* Badges row */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${badge.bg}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                                {formatStatusLabel(trip.trip_status)}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                <Hash className="w-2.5 h-2.5" />
                                                {trip.trip_code}
                                            </span>
                                            <span className="text-[10px] font-black bg-black text-[#A7FF03] px-2 py-1 rounded-lg uppercase">
                                                {trip.vehicle_type_name}
                                            </span>
                                        </div>

                                        {/* Route */}
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-3 min-w-0">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                                                <p className="text-sm font-semibold text-gray-700 truncate">{trip.pickup_address}</p>
                                            </div>
                                            <div className="ml-[3.5px] w-[1px] h-3 bg-gradient-to-b from-emerald-300 to-rose-300 ml-[5px]" />
                                            <div className="flex items-start gap-3 min-w-0">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                                                <p className="text-sm font-semibold text-gray-700 truncate">{trip.drop_address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: metrics */}
                                    <div className="flex items-center gap-6 sm:gap-8 px-4 py-3 bg-gray-50 rounded-xl sm:bg-transparent sm:p-0 flex-shrink-0">
                                        <div className="text-center">
                                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Dist.</p>
                                            <p className="text-base font-black text-gray-900 leading-tight">
                                                {parseFloat(trip.actual_distance_km).toFixed(1)}
                                                <span className="text-[9px] font-bold text-gray-400 ml-0.5">km</span>
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Time</p>
                                            <p className="text-base font-black text-gray-900 leading-tight">
                                                {trip.actual_duration_min}
                                                <span className="text-[9px] font-bold text-gray-400 ml-0.5">min</span>
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#A7FF03] group-hover:border-[#A7FF03] transition-all">
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-semibold">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(trip.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {new Date(trip.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3" />
                                            {trip.service_city_name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-gray-300 group-hover:text-[#A7FF03] transition-colors flex items-center gap-1">
                                        <Info className="w-3 h-3" /> Details
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/*  Pagination  */}
            {!compact && pagination && trips.length > 0 && pagination.pages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                    <p className="text-sm font-bold text-gray-400 order-2 sm:order-1">
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, pagination.total)} of {pagination.total.toLocaleString()} trips
                    </p>

                    <div className="flex items-center gap-1.5 order-1 sm:order-2">
                        {/* Prev */}
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={!pagination.hasPrev}
                            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#A7FF03] hover:bg-[#A7FF03]/5 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Smart page numbers */}
                        <div className="flex items-center gap-1">
                            {(() => {
                                const total = pagination.pages
                                const cur = currentPage
                                let pages: (number | "...")[] = []

                                if (total <= 7) {
                                    pages = Array.from({ length: total }, (_, i) => i + 1)
                                } else {
                                    if (cur <= 4) {
                                        pages = [1, 2, 3, 4, 5, "...", total]
                                    } else if (cur >= total - 3) {
                                        pages = [1, "...", total - 4, total - 3, total - 2, total - 1, total]
                                    } else {
                                        pages = [1, "...", cur - 1, cur, cur + 1, "...", total]
                                    }
                                }

                                return pages.map((p, idx) =>
                                    p === "..." ? (
                                        <div key={`dot-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-300">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => goToPage(p as number)}
                                            className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${currentPage === p
                                                ? "bg-[#A7FF03] text-black shadow-md shadow-[#A7FF03]/20 scale-110"
                                                : "text-gray-400 hover:text-black hover:bg-gray-50 border border-transparent hover:border-gray-100"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )
                            })()}
                        </div>

                        {/* Next */}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={!pagination.hasNext}
                            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#A7FF03] hover:bg-[#A7FF03]/5 transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Jump to page */}
                        <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Go to</span>
                            <input
                                type="number"
                                min={1}
                                max={pagination.pages}
                                placeholder="—"
                                className="w-14 h-10 rounded-xl border border-gray-100 text-center text-sm font-black outline-none focus:border-[#A7FF03] focus:ring-2 focus:ring-[#A7FF03]/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        const val = parseInt((e.target as HTMLInputElement).value)
                                        if (val >= 1 && val <= pagination.pages) {
                                            goToPage(val)
                                                ; (e.target as HTMLInputElement).value = ""
                                        } else {
                                            toast.error(`Page must be 1–${pagination.pages}`)
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* View all button (compact mode) */}
            {compact && trips.length > 0 && (
                <div className="mt-6 pt-5 border-t border-gray-50 flex justify-center">
                    <button
                        onClick={() => router.push("/userspace/trips")}
                        className="group flex items-center gap-2 bg-black text-white text-sm font-black px-8 py-3.5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10"
                    >
                        View All Trips
                        <TrendingUp className="w-4 h-4 text-[#A7FF03] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            )}

            {/*  Trip Details Modal  */}
            <AnimatePresence>
                {selectedTrip && (
                    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTrip(null)}
                            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="relative bg-white w-full sm:max-w-xl rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
                        >
                            {/* Modal header */}
                            <div className="bg-black p-6 relative overflow-hidden flex-shrink-0">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#A7FF03]/10 rounded-full blur-3xl" />
                                <div className="flex items-start justify-between relative z-10">
                                    <div>
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase border bg-white/10 text-white border-white/20 inline-block mb-2`}>
                                            {formatStatusLabel(selectedTrip.trip_status)}
                                        </span>
                                        <h3 className="text-2xl font-black text-white">Trip Details</h3>
                                        <p className="text-gray-500 text-xs mt-1 font-mono">{selectedTrip.trip_code}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTrip(null)}
                                        className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal body */}
                            <div className="overflow-y-auto flex-1 p-6 space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                                        <div className="bg-[#A7FF03] p-2.5 rounded-xl flex-shrink-0">
                                            <Navigation className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Distance</p>
                                            <p className="text-xl font-black">{selectedTrip.actual_distance_km}<span className="text-xs text-gray-400 ml-1">km</span></p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                                        <div className="bg-[#A7FF03] p-2.5 rounded-xl flex-shrink-0">
                                            <Timer className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Duration</p>
                                            <p className="text-xl font-black">{selectedTrip.actual_duration_min}<span className="text-xs text-gray-400 ml-1">min</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                            <div className="w-px flex-1 bg-gradient-to-b from-emerald-300 to-rose-300 min-h-[2rem]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <p className="text-[9px] text-emerald-600 uppercase font-black tracking-widest mb-1">Pickup</p>
                                                <p className="text-sm font-bold text-gray-800 leading-snug">{selectedTrip.pickup_address}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-rose-600 uppercase font-black tracking-widest mb-1">Drop-off</p>
                                                <p className="text-sm font-bold text-gray-800 leading-snug">{selectedTrip.drop_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trip details grid */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#A7FF03] rounded-sm" />
                                        System Information
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5">
                                        {[
                                            { label: "Service City", value: selectedTrip.service_city_name },
                                            { label: "Vehicle Type", value: selectedTrip.vehicle_type_name },
                                            { label: "Trip Type", value: selectedTrip.trip_type },
                                            { label: "Booking Type", value: selectedTrip.booking_type },
                                            { label: "Request Type", value: selectedTrip.request_type },
                                            { label: "Journey Type", value: selectedTrip.journey_type || "N/A" },
                                            { label: "Start Time", value: selectedTrip.start_time ? new Date(selectedTrip.start_time).toLocaleString() : "N/A" },
                                            { label: "End Time", value: selectedTrip.end_time ? new Date(selectedTrip.end_time).toLocaleString() : "N/A" },
                                            { label: "Created", value: new Date(selectedTrip.created_at).toLocaleDateString() },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{label}</p>
                                                <p className="text-sm font-bold text-gray-800 capitalize">{value.toLowerCase()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                </div>
                                <button
                                    onClick={() => setSelectedTrip(null)}
                                    className="bg-black text-white px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
