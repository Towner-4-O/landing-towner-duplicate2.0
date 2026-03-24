"use client"

import WalletProfileSection from "@/app/_components/section/protected-sections/WalletProfileSection"
import { Wallet } from "lucide-react"

export default function WalletPage() {
    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#A7FF03] p-3 rounded-2xl shadow-lg shadow-[#A7FF03]/20">
                    <Wallet className="w-7 h-7 text-black" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Driver Wallet</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your earnings and subscription details</p>
                </div>
            </div>

            <WalletProfileSection />
        </div>
    )
}
