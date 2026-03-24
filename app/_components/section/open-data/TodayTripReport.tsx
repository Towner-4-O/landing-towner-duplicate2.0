// 'use client'

// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js'
// import { FaTaxi, FaCheck, FaSpinner, FaBan } from 'react-icons/fa'
// import { motion } from 'framer-motion'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// )

// interface TripReportData {
//   finishedTrips: string;
//   todayOngoingTrips: string;
//   hailTrips: string;
//   nonResponseTrips: string;
// }

// const TripSummaryCard = ({ title, value, icon: Icon }: {
//   title: string;
//   value: string;
//   icon: any;
// }) => (
//   <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#e8ebd7] hover:shadow-lg transition-all duration-300">
//     <div className="flex items-center space-x-3">
//       <div className="p-2 bg-[#fcfff2] rounded-lg">
//         <Icon className="w-5 h-5 text-[#8b9164]" />
//       </div>
//       <div>
//         <p className="text-sm text-[#6b6e5a]">{title}</p>
//         <p className="text-xl font-bold text-[#2d2f25]">{value}</p>
//       </div>
//     </div>
//   </div>
// )

// const TodayTripReport = ({ data }: { data: TripReportData }) => {
//   // Reorder the data to show progression from lowest to highest
//   const values = [
//     { label: 'Non-Responsive', value: parseInt(data.nonResponseTrips) || 0 },
//     { label: 'Hail', value: parseInt(data.hailTrips) || 0 },
//     { label: 'Ongoing', value: parseInt(data.todayOngoingTrips) || 0 },
//     { label: 'Finished', value: parseInt(data.finishedTrips) || 0 }
//   ].sort((a, b) => a.value - b.value);

//   const chartData = {
//     labels: values.map(item => item.label),
//     datasets: [
//       {
//         label: 'Trip Distribution',
//         data: values.map(item => item.value),
//         borderColor: '#4ade80',
//         backgroundColor: 'rgba(74, 222, 128, 0.1)',
//         fill: true,
//         tension: 0.4,
//         pointBackgroundColor: '#4ade80',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2,
//         pointRadius: 6,
//         pointHoverRadius: 8
//       }
//     ]
//   }

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         titleColor: '#2d2f25',
//         bodyColor: '#4a4d3c',
//         borderColor: '#e8ebd7',
//         borderWidth: 1,
//         padding: 12,
//         displayColors: true,
//         callbacks: {
//           label: (context: any) => {
//             return `${context.raw} trips`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0,0,0,0.05)'
//         },
//         ticks: {
//           precision: 0,
//           font: {
//             size: 12
//           }
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         },
//         ticks: {
//           font: {
//             size: 12,
//             weight: 'bold'
//           }
//         }
//       }
//     },
//     interaction: {
//       intersect: false,
//       mode: 'index' as const
//     }
//   }

//   return (
//     <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#e8ebd7]">
//       <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between mb-6">
//         <div className="space-y-3">
//           <div className="flex items-center space-x-3">
//             <span className="px-3 py-1 text-xs font-semibold bg-[#fcfff2] text-[#4a4d3c] rounded-full">
//               Today
//             </span>
//           </div>
//           <h2 className="text-2xl font-bold text-[#2d2f25]">Today's Trip Report</h2>
//           <p className="text-[#6b6e5a]">Real-time trip statistics across all cities</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <TripSummaryCard
//           title="Finished Trips"
//           value={data.finishedTrips}
//           icon={FaCheck}
//         />
//         <TripSummaryCard
//           title="Ongoing Trips"
//           value={data.todayOngoingTrips}
//           icon={FaTaxi}
//         />
//         <TripSummaryCard
//           title="Hail Trips"
//           value={data.hailTrips}
//           icon={FaSpinner}
//         />
//         <TripSummaryCard
//           title="Non-Responsive"
//           value={data.nonResponseTrips}
//           icon={FaBan}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="hidden md:block lg:col-span-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#e8ebd7] h-[400px]">
//           <Line
//             data={chartData}
//             options={{
//               ...options,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   grid: {
//                     color: 'rgba(0,0,0,0.05)'
//                   },
//                   ticks: {
//                     precision: 0,
//                     font: {
//                       size: 12
//                     }
//                   }
//                 },
//                 x: {
//                   type: 'category',
//                   grid: {
//                     display: false
//                   },
//                   ticks: {
//                     font: {
//                       size: 12,
//                       weight: 'bold' as const
//                     }
//                   }
//                 }
//               }
//             }}
//           />
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#e8ebd7]">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-[#fcfff2] rounded-lg">
//                   <FaCheck className="w-5 h-5 text-[#8b9164]" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-[#2d2f25]">Quick Stats</h3>
//               </div>
//               <span className="px-3 py-1 text-xs font-semibold bg-[#fcfff2] text-[#4a4d3c] rounded-full">
//                 Today
//               </span>
//             </div>
//             <div className="space-y-3 ">
//               <div className="flex justify-between items-center p-3 bg-[#fcfff2] rounded-lg">
//                 <span className="text-sm text-[#6b6e5a]">Success Rate</span>
//                 <span className="text-sm font-bold text-[#2d2f25]">
//                   {Math.round((parseInt(data.finishedTrips) /
//                     (parseInt(data.finishedTrips) + parseInt(data.nonResponseTrips))) * 100)}%
//                 </span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-[#fcfff2] rounded-lg">
//                 <span className="text-sm text-[#6b6e5a]">Response Rate</span>
//                 <span className="text-sm font-bold text-[#2d2f25]">
//                   {Math.round((1 - (parseInt(data.nonResponseTrips) /
//                     (parseInt(data.finishedTrips) + parseInt(data.todayOngoingTrips) +
//                      parseInt(data.hailTrips) + parseInt(data.nonResponseTrips)))) * 100)}%
//                 </span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-[#fcfff2] rounded-lg">
//                 <span className="text-sm text-[#6b6e5a]">Active Rate</span>
//                 <span className="text-sm font-bold text-[#2d2f25]">
//                   {Math.round((parseInt(data.todayOngoingTrips) /
//                     (parseInt(data.finishedTrips) + parseInt(data.todayOngoingTrips))) * 100)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TodayTripReport
