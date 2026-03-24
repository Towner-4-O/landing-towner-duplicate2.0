'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { FaUserPlus, FaCheckCircle, FaPause, FaClock } from 'react-icons/fa'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface RegisterData {
  totalToday: string;
  approved: string;
  pending: string;
  inProgress: string;
}

const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-[#e8ebd7] ${className}`} />
);

const DailyDriverRegister = ({
  data,
  isLoading = false,
}: {
  data: RegisterData | null;
  isLoading?: boolean;
}) => {
  if (isLoading || !data) {
    return (
      <section className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#e8ebd7] py-10">
        <div className="flex flex-col space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Sk className="h-7 w-64" />
              <Sk className="h-4 w-48" />
            </div>
            <Sk className="h-8 w-44 rounded-xl" />
          </div>
          {/* Stat cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#fcfff2] border border-[#e8ebd7]">
                <Sk className="w-10 h-10 rounded-lg flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Sk className="h-3 w-20" />
                  <Sk className="h-6 w-12" />
                </div>
              </div>
            ))}
          </div>
          {/* Chart skeleton */}
          <Sk className="h-[300px] w-full rounded-xl" />
        </div>
      </section>
    );
  }
  // Convert string values to numbers for the chart
  const chartData = {
    labels: ['In Progress', 'Pending', 'Approved', 'Total Today'],
    datasets: [
      {
        label: 'Driver Registration Status',
        data: [
          parseInt(data.inProgress) || 0,
          parseInt(data.pending) || 0,
          parseInt(data.approved) || 0,
          parseInt(data.totalToday) || 0
        ],
        fill: true,
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#4ade80',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          precision: 0,
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2d2f25',
        bodyColor: '#4a4d3c',
        borderColor: '#e8ebd7',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `Count: ${value} drivers`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  return (
    <section className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#e8ebd7] py-10">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#2d2f25]">Driver Today Registration Trends</h2>
            <p className="text-[#6b6e5a]">Daily registration activity overview</p>
          </div>
          <span className="px-3 py-1.5 text-xs font-semibold bg-green-100 text-green-700 rounded-xl md:rounded-full border border-green-200">
            Today: {data.totalToday} New Registrations
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#fcfff2] border border-[#e8ebd7]">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaUserPlus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[#6b6e5a]">Total Today</p>
              <p className="text-xl font-bold text-[#2d2f25]">{data.totalToday}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#fcfff2] border border-[#e8ebd7]">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaCheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[#6b6e5a]">Approved</p>
              <p className="text-xl font-bold text-[#2d2f25]">{data.approved}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0,0,0,0.05)'
                  },
                  ticks: {
                    precision: 0
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  titleColor: '#2d2f25',
                  bodyColor: '#4a4d3c',
                  borderColor: '#e8ebd7',
                  borderWidth: 1,
                  padding: 12,
                  displayColors: false,
                  callbacks: {
                    label: (context: any) => {
                      const value = context.raw;
                      return `Count: ${value} drivers`;
                    }
                  }
                }
              },
              interaction: {
                intersect: false,
                mode: 'index' as const
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default DailyDriverRegister