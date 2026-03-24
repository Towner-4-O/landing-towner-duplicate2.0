"use client"

import { useEffect, useState, useCallback } from "react"
import {
    Wallet,
    CreditCard,
    Calendar,
    Clock,
    TrendingUp,
    ShieldCheck,
    MapPin,
    RefreshCw,
    ArrowUpRight,
    Shield
} from "lucide-react"
import { BACKEND_BASE_URL } from "@/constant"
import { getCookie } from "cookies-next"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

interface WalletData {
    id: string
    user_id: string
    role: string
    full_name: string
    balance: string
    currency: string
    status: string
    is_frozen: boolean
    service_city_name: string
    global_wallet_balance: string
    allocated_to_referral: string
    available_balance: string
    subscription_balance: string
    subscription_start_date: string
    subscription_end_date: string | null
    subscription_daily_deduction: string
    subscription_days_remaining: number
    last_transaction_at: string
    last_transaction_id: string
    created_at: string
}

export default function WalletProfileSection() {
    const [wallet, setWallet] = useState<WalletData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchWallet = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const token = await getCookie('access_token') as string
            if (!token) {
                setError("Authentication required")
                return
            }

            const res = await fetch(`${BACKEND_BASE_URL}/wallet/profile?role=driver`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const result = await res.json()

            if (!res.ok || !result.success) {
                throw new Error(result.message || "Failed to fetch wallet info")
            }

            setWallet(result.data)
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchWallet()
    }, [fetchWallet])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[#A7FF03]/20 border-t-[#A7FF03] rounded-full animate-spin mb-4" />
                <p className="text-gray-400 font-medium animate-pulse">Loading wallet profile...</p>
            </div>
        )
    }

    if (error || !wallet) {
        return (
            <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
                <div className="bg-red-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-red-900 font-black text-xl mb-2">Failed to Load Wallet</h3>
                <p className="text-red-600/70 mb-6">{error || "Could not retrieve wallet data"}</p>
                <button
                    onClick={fetchWallet}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" /> Try Again
                </button>
            </div>
        )
    }

    const formatCurrency = (val: string) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: wallet.currency || 'INR',
        }).format(parseFloat(val))
    }

    return (
        <div className="space-y-6">
            {/* ─── Main Balance Card  */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-black rounded-[32px] p-8 text-white shadow-2xl shadow-black/20"
            >
                {/* Background Decorative patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A7FF03] opacity-10 blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A7FF03] opacity-5 blur-[80px] -ml-24 -mb-24" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#A7FF03]/80 mb-2">
                            <Wallet className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Total Balance</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                            {formatCurrency(wallet.balance)}
                        </h2>
                        <div className="flex items-center gap-3 pt-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${wallet.is_frozen ? 'bg-red-500/20 text-red-500' : 'bg-[#A7FF03]/20 text-[#A7FF03]'}`}>
                                {wallet.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 md:flex-none h-14 px-8 bg-[#A7FF03] text-black rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#A7FF03]/20">
                            Withdraw Funds <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
            {/*  Subscription & Transactions  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subscription Plan */}
                <div className="bg-[#fbfcff] p-8 rounded-[32px] border border-blue-100/50">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight leading-none">Subscription</h3>
                                <p className="text-xs text-blue-600 font-bold mt-1">ACTIVE PLAN</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-blue-600 leading-none">{wallet.subscription_days_remaining}</p>
                            <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Days Left</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-bold text-gray-500">Daily Deduction</span>
                            </div>
                            <span className="text-sm font-black text-gray-900">{formatCurrency(wallet.subscription_daily_deduction)}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-50 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-bold text-gray-500">Start Date</span>
                            </div>
                            <span className="text-sm font-black text-gray-900">{new Date(wallet.subscription_start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="pt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase">Usage Progress</span>
                                <span className="text-[10px] font-black text-blue-600 px-2 py-0.5 bg-blue-50 rounded-lg">Healthy</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "65%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Info */}
                <div className="bg-[#fcfdfa] p-8 rounded-[32px] border border-emerald-100/50">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight leading-none">Last Transaction</h3>
                            <p className="text-xs text-emerald-600 font-bold mt-1">LATEST ACTIVITY</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm">
                        <div className="space-y-4">
                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Completed At</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {new Date(wallet.last_transaction_at).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-xl border border-emerald-100 uppercase">
                                    Verified
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
