"use client";

import React, { useEffect, useState } from "react";
import {
  FaCar,
  FaUserFriends,
  FaRoute,
  FaBuilding,
  FaCity,
  FaMoneyCheck,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { MdLocalTaxi } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { Icon, TrendingUp } from "lucide-react";

type TimeFilter = "today" | "7d" | "30d" | "90d" | "lifetime";

const TIME_FILTERS: { label: string; value: TimeFilter }[] = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "Lifetime", value: "lifetime" },
];

// Mock data for the chart
interface HeroData {
  totalTrips: string;
  activeDrivers: string;
  ongoingTrips: string;
  totalDrivers: string;
  completedTrips: string;
  citiesCovered: string;
  driverEarnings: string;
  registrationCount: string;
  earningsChanged: string;
}

interface OpenDataHeroCardsProps {
  data: HeroData | null;
  activeFilter: TimeFilter;
  onFilterChange: (f: TimeFilter) => void;
  isRefreshing: boolean;
  lastUpdated: string;
  countdown: number;
  isLoading?: boolean;
}

// ── Shimmer pulse helper ──
const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-[#e8ebd7] ${className}`} />
);

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  live?: boolean;
  trend?: number;
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  live = false,
  trend,
}: StatCardProps) => {
  // Strip currency symbols and commas to attempt a numeric parse
  const sanitizedValue =
    typeof value === "string" ? value.replace(/[$,]/g, "") : "0";
  const parsedNumeric = parseInt(sanitizedValue);
  const isNumeric = !isNaN(parsedNumeric);

  // Use the raw string for display when the value contains non-numeric chars (e.g. "$205,242")
  const [displayValue, setDisplayValue] = useState<string | number>(
    isNumeric ? parsedNumeric : value
  );

  useEffect(() => {
    setDisplayValue(isNumeric ? parsedNumeric : value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div
      // className={`relative overflow-hidden p-6 rounded-xl border hover:shadow-lg transition-all duration-300 ${
      //   title === "Earnings Changed"
      //     ? "bg-green-50 border-green-200 text-green-600 font-bold"
      //     : "bg-white/70 backdrop-blur-sm border-[#e8ebd7]"
      // }`}

      className={`relative overflow-hidden p-8 rounded-2xl border hover:shadow-2xl transition-all duration-300 ${title === "Earnings Changed"
        ? "bg-gradient-to-br from-emerald-10 via-green-100 to-teal-100 text-green-950 font-bold shadow-3xl scale-115 max-w-4xl w-full mx-auto backdrop-blur-lg relative overflow-hidden rounded-3xl border-2 border-green-400/60 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-300/40 before:via-emerald-300/30 before:to-green-300/40 before:rounded-3xl after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-b after:from-white/30 after:to-transparent after:rounded-t-3xl transform hover:scale-120 hover:rotate-2 hover:shadow-4xl transition-all duration-300 ease-out animate-pulse-gentle ring-6 ring-green-300/40 ring-offset-3 ring-offset-green-50 glow-green-enhanced"
        : "bg-white/85 backdrop-blur-md shadow-lg max-w-xl w-full mx-auto hover:scale-105 hover:shadow-xl text-gray-700 transition-all duration-200"
        }`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#fcfff2] rounded-lg">
              <Icon className="w-6 h-6 text-[#8b9164]" />
            </div>
            {/* <h3 className="font-medium">{title}</h3> */}
            <h3
              className={`${title === "Earnings Changed"
                ? "text-2xl font-black text-green-900 animate-pulse tracking-wide"
                : "font-medium"
                }`}
            >
              {title}
            </h3>
          </div>
          {live && (
            <span className="flex items-center px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
              <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-green-700 text-xs font-semibold">Live</span>
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div
              className={`font-bold  ${title === "Earnings Changed"
                ? "text-4xl text-green-600 animate-bounce font-black tracking-tight"
                : "text-3xl text-[#2d2f25]"
                }`}
            >
              {displayValue}
            </div>
            <p className="text-sm text-[#6b6e5a] mt-1">{subtitle}</p>
          </div>

          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 ${trend >= 0 ? "text-green-600" : "text-red-500"
                }`}
            >
              {trend >= 0 ? (
                <div className="relative w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-6 h-6 text-white animate-pulse" />
                </div>
              ) : (
                // or: <TbWaveSine className="text-base animate-pulse" />
                <FaArrowDown className="text-sm" />
              )}
              <span className=" font-medium text-2xl">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-0 top-0 -mt-4 -mr-4 opacity-5 ">
        <Icon className="w-24 h-24 " />
      </div>
    </div>
  );
};

const OpenDataHeroCards = ({
  data,
  activeFilter,
  onFilterChange,
  isRefreshing,
  lastUpdated,
  countdown,
  isLoading = false,
}: OpenDataHeroCardsProps) => {
  const statsData = data
    ? [
      {
        title: "Total Trips",
        value: data.totalTrips,
        subtitle: "Ongoing & Finished",
        icon: FaRoute,
        trend: 25,
      },
      {
        title: "Micro-Entrepreneurs",
        value: data.registrationCount,
        subtitle: "Registered drivers",
        icon: FaUserFriends,
        trend: 20,
      },
      {
        title: "Completed Trips",
        value: data.completedTrips,
        subtitle: "Meter & Online Booking",
        icon: BsCheckCircleFill,
        trend: 10,
      },
      {
        title: "Driver Earnings",
        value: data.driverEarnings,
        subtitle: "Total earnings",
        icon: FaMoneyCheck,
        trend: 35,
      },
    ]
    : [];

  return (
    <div className="relative space-y-8 py-10">
      {/* ── Sticky Platform Statistics Header ── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border border-[#e8ebd7] rounded-2xl shadow-md px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: title + live badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold bg-[#fcfff2] text-[#4a4d3c] rounded-full shrink-0">
                  Dashboard
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold bg-green-50 border border-green-200 rounded-full text-green-700 min-w-[72px] justify-center shrink-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isRefreshing
                        ? "bg-yellow-400 animate-ping"
                        : "bg-green-500 animate-pulse"
                      }`}
                  />
                  <span>{isRefreshing ? "Refreshing" : "Live Data"}</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#2d2f25] mt-1 leading-tight">
                Platform Statistics
              </h1>
            </div>
          </div>

          {/* Centre: filter tabs */}
          <div className="flex items-center gap-1 bg-[#f5f7ee] border border-[#e0e3d0] rounded-xl p-1 self-start sm:self-auto">
            {TIME_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => onFilterChange(f.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${activeFilter === f.value
                    ? "bg-[#A7FF03] text-[#2d2f25] shadow-sm scale-[1.04]"
                    : "text-[#6b6e5a] hover:text-[#2d2f25] hover:bg-white/60"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right: last updated + countdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-[11px] text-[#8b9164]">Last updated</span>
              <span className="text-xs font-semibold text-[#4a4d3c] tabular-nums">
                {lastUpdated}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full border-2 border-[#e0e3d0] bg-white shadow-sm flex-shrink-0">
              <span className="text-[11px] font-bold text-[#4a4d3c] leading-none tabular-nums w-5 text-center">
                {countdown}
              </span>
              <span className="text-[9px] text-[#8b9164] leading-none">sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-8 rounded-2xl border border-[#e8ebd7] bg-white/80 space-y-4">
              <div className="flex items-center gap-3">
                <Sk className="w-10 h-10 rounded-lg" />
                <Sk className="h-4 w-28" />
              </div>
              <Sk className="h-9 w-24 mt-2" />
              <Sk className="h-3 w-36" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* ── Earnings Growth Card ── */}
      {isLoading ? (
        <div className="w-full rounded-3xl border border-[#e8ebd7] bg-white/80 p-8 space-y-5">
          <div className="flex items-center gap-4">
            <Sk className="w-14 h-14 rounded-xl" />
            <Sk className="h-6 w-40" />
          </div>
          <Sk className="h-12 w-48" />
          <Sk className="h-4 w-64" />
        </div>
      ) : (
        data && (
          <div className="flex justify-center items-center">
            <div className="relative w-full overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/80 opacity-60" />
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-200 rounded-full animate-ping opacity-30" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-pulse opacity-40" />
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-teal-200 rounded-full animate-bounce opacity-25" />
              </div>
              <div className="absolute right-0 top-0 -mt-6 -mr-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <TrendingUp className="w-32 h-32 text-green-600 transform rotate-12" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OpenDataHeroCards;
