"use client";

import React, { useState, useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { IoSaveOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { toast } from "react-hot-toast";

interface StatData {
  [key: string]: string;
}

const StatCard = ({
  title,
  stats,
  formData,
  isEditing,
  onInputChange,
}: {
  title: string;
  stats: { label: string; key: string }[];
  formData: StatData;
  isEditing: boolean;
  onInputChange: (key: string, value: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, key }) => (
          <div key={key} className="space-y-1">
            <label className="text-sm text-gray-600">{label}</label>
            <input
              type="text"
              value={formData[key]}
              onChange={(e) => onInputChange(key, e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-lg border ${
                isEditing
                  ? "border-[#A7FF03] bg-white"
                  : "border-gray-100 bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-[#A7FF03]`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OiotOpenData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<StatData>({
    // Platform Statistics
    totalTrips: "",
    totalUsers: "",
    activeDrivers: "",
    ongoingTrips: "",
    totalDrivers: "",
    completedTrips: "",
    citiesCovered: "",
    partnerCompanies: "",
    earningsChanged: "",

    // Rider Registration Trends
    totalToday: "",
    approved: "",
    pending: "",
    inProgress: "",

    // Today's Report
    finishedTrips: "",
    todayOngoingTrips: "",
    hailTrips: "",
    nonResponseTrips: "",

    // Achievements
    tripsCompleted: "",
    achievementTotalRiders: "",
    platformUptime: "",
  });

  // Update fetch function name
  useEffect(() => {
    fetchOiotData();
  }, []);

  const fetchOiotData = async () => {
    try {
      const response = await fetch("/api/admin/viewOiotData");
      const result = await response.json();

      if (result.success) {
        setFormData(result.data);
      } else {
        toast.error(result.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/updateOiotData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Data updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert changes by fetching data again
    fetchOiotData();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A7FF03]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">
          Oiot Open Data Management
        </h2>
        <div className="space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#A7FF03] text-black rounded-lg hover:bg-opacity-90 transition-all"
            >
              <HiPencilAlt /> Edit Data
            </button>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-[#A7FF03] text-black rounded-xl
                    hover:shadow-lg hover:shadow-[#A7FF03]/20 transition-all duration-300 font-medium"
                >
                  <IoSaveOutline className="text-xl" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 
                    rounded-xl hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  <MdCancel className="text-xl" />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Statistics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          formData={formData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          title="Platform Statistics"
          stats={[
            { label: "Total Trips", key: "totalTrips" },
            { label: "Total Users", key: "totalUsers" },
            { label: "Active Drivers", key: "activeDrivers" },
            { label: "Ongoing Trips", key: "ongoingTrips" },
            { label: "Total Drivers", key: "totalDrivers" },
            { label: "Completed Trips", key: "completedTrips" },
            { label: "Cities Covered", key: "citiesCovered" },
            { label: "Partner Companies", key: "partnerCompanies" },
            { label: "Earnings Changed", key: "earningsChanged" },
          ]}
        />

        <StatCard
          formData={formData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          title="Rider Registration Trends"
          stats={[
            { label: "Total Today", key: "totalToday" },
            { label: "Approved", key: "approved" },
            { label: "Pending", key: "pending" },
            { label: "In Progress", key: "inProgress" },
          ]}
        />

        <StatCard
          formData={formData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          title="Today's Trip Report"
          stats={[
            { label: "Finished Trips", key: "finishedTrips" },
            { label: "Ongoing Trips", key: "todayOngoingTrips" },
            { label: "Hail Trips", key: "hailTrips" },
            { label: "Non-Response Trips", key: "nonResponseTrips" },
          ]}
        />

        <StatCard
          formData={formData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          title="Platform Achievements"
          stats={[
            { label: "Trips Completed", key: "tripsCompleted" },
            { label: "Total Riders", key: "achievementTotalRiders" },
            { label: "Platform Uptime", key: "platformUptime" },
          ]}
        />
      </div>
    </div>
  );
};

export default OiotOpenData;
