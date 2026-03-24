"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import OpenDataHeroCards from "@/app/_components/section/open-data/OpenDataHero";
import DailyDriverRegister from "@/app/_components/section/open-data/DailyDriverRegister";
import EndDetailsStatics from "@/app/_components/section/open-data/EndDetailsStatics";
import BacktoHome from "@/app/_components/layout/BacktoHome";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/constant";

type TimeFilter = "today" | "7d" | "30d" | "90d" | "lifetime";

const TIME_FILTERS: { label: string; value: TimeFilter }[] = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "Lifetime", value: "lifetime" },
];

const REFRESH_INTERVAL_MS = 10_000;

interface ApiData {
  heroData: {
    totalTrips: string;
    activeDrivers: string;
    ongoingTrips: string;
    totalDrivers: string;
    completedTrips: string;
    citiesCovered: string;
    driverEarnings: string;
    registrationCount: string;
    earningsChanged: string;
  } | null;
  registerData: {
    totalToday: string;
    approved: string;
    pending: string;
    inProgress: string;
  } | null;
  cityData: {
    cities: Array<{
      name: string;
      totalTrip: string;
      activeDrivers: string;
      completedTrips: string;
    }>;
  } | null;
  tripReportData: {
    finishedTrips: string;
    todayOngoingTrips: string;
    hailTrips: string;
    nonResponseTrips: string;
  } | null;
  achievementData: {
    tripsCompleted: string;
    achievementTotalDrivers: string;
    platformUptime: string;
    completedTrips: string;
    activeDrivers: string;
    totalDrivers: string;
  } | null;
}

const OpenDataClient = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("today");
  const [data, setData] = useState<ApiData>({
    heroData: null,
    registerData: null,
    cityData: null,
    tripReportData: null,
    achievementData: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFetchingRef = useRef(false);

  const formatValue = useCallback((value: unknown, isCurrency = false): string => {
    if (value === undefined || value === null) return "0";
    if (typeof value === "number") {
      const formatted = value.toLocaleString();
      return isCurrency ? `${formatted}` : formatted;
    }
    return String(value);
  }, []);

  const buildApiData = useCallback(
    (apiData: Record<string, unknown>): ApiData => ({
      heroData: {
        totalTrips: formatValue(apiData.totalTrips),
        activeDrivers: formatValue(apiData.activeDrivers),
        ongoingTrips: formatValue(apiData.ongoingTrips),
        totalDrivers: formatValue(apiData.totalDrivers),
        completedTrips: formatValue(apiData.completedTrips),
        citiesCovered: formatValue(apiData.citiesCovered),
        driverEarnings: formatValue(apiData.driverEarnings, true),
        registrationCount: formatValue(apiData.registrationCount),
        earningsChanged: `${apiData.earningsChanged ?? 0}%`,
      },
      registerData: {
        totalToday: formatValue(apiData.registrationCount),
        approved: formatValue(apiData.approved ?? 0),
        pending: formatValue(apiData.pending ?? 0),
        inProgress: formatValue(apiData.inProgress ?? 0),
      },
      cityData: {
        cities: [
          {
            name: (apiData.cityOne as string) || "City A",
            totalTrip: formatValue(apiData.cityOneTotalTrip ?? 0),
            activeDrivers: formatValue(apiData.cityOneActiveDrivers ?? 0),
            completedTrips: formatValue(apiData.cityOneCompletedTrips ?? 0),
          },
        ],
      },
      tripReportData: {
        finishedTrips: formatValue(apiData.completedTrips),
        todayOngoingTrips: formatValue(apiData.ongoingTrips),
        hailTrips: formatValue(apiData.hailTrips ?? 0),
        nonResponseTrips: formatValue(apiData.nonResponseTrips ?? 0),
      },
      achievementData: {
        tripsCompleted: formatValue(apiData.completedTrips),
        achievementTotalDrivers: formatValue(apiData.achievementTotalDrivers),
        platformUptime: `${apiData.platformUptime ?? 0}%`,
        completedTrips: formatValue(apiData.totalTrips),
        activeDrivers: formatValue(apiData.activeDrivers),
        totalDrivers: formatValue(apiData.totalDrivers),
      },
    }),
    [formatValue]
  );

  const fetchData = useCallback(
    async (filter: TimeFilter, silent = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (!silent) setIsLoading(true);
      else setIsRefreshing(true);

      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/open-data/group-data`,
          { params: { rangeType: filter } }
        );
        const result = response?.data?.data;

        if (response?.data?.success && result) {
          setData(buildApiData(result as Record<string, unknown>));
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Error fetching open data:", error);
      } finally {
        isFetchingRef.current = false;
        if (!silent) setIsLoading(false);
        else setIsRefreshing(false);
      }
    },
    [buildApiData]
  );

  const resetCountdown = useCallback(() => {
    setCountdown(REFRESH_INTERVAL_MS / 1000);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? REFRESH_INTERVAL_MS / 1000 : prev - 1));
    }, 1000);
  }, []);

  // On filter change: immediate full fetch + restart polling
  useEffect(() => {
    fetchData(activeFilter, false);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchData(activeFilter, true);
      resetCountdown();
    }, REFRESH_INTERVAL_MS);

    resetCountdown();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    : "—";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <BacktoHome />
        <OpenDataHeroCards
          data={null}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isRefreshing={false}
          lastUpdated="—"
          countdown={countdown}
          isLoading
        />
        <DailyDriverRegister data={null} isLoading />
        <EndDetailsStatics data={null} isLoading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <BacktoHome />

      {/* ── Content Sections ── */}
      <OpenDataHeroCards
        data={data.heroData}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        isRefreshing={isRefreshing}
        lastUpdated={formattedLastUpdated}
        countdown={countdown}
      />
      <DailyDriverRegister data={data.registerData} />
      <EndDetailsStatics data={data.achievementData} />
    </div>
  );
};

export default OpenDataClient;
