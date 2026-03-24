// 'use client'

// import React from 'react'
// import { FaTaxi, FaMapMarkerAlt, FaUsers, FaMoneyBillWave } from 'react-icons/fa'
// import { motion } from 'framer-motion'

// interface CityData {
//   cities: Array<{
//     name: string;
//     totalTrip: string;
//     activeDrivers: string;
//     completedTrips: string;
//   }>;
// }

// const StatBox = ({ icon: Icon, label, value, color }: {
//   icon: any;
//   label: string;
//   value: string;
//   color?: string;
// }) => (
//   <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
//     <div className="p-2 bg-[#fcfff2] rounded-lg">
//       <Icon className="w-4 h-4 text-[#8b9164]" />
//     </div>
//     <div>
//       <p className="text-xs text-[#6b6e5a]">{label}</p>
//       <p className="text-sm font-bold text-[#2d2f25]">{value}</p>
//     </div>
//   </div>
// )

// const CityCard = ({ name, totalTrip, activeDrivers, completedTrips }: {
//   name: string;
//   totalTrip: string;
//   activeDrivers: string;
//   completedTrips: string;
// }) => (
//   <motion.div
//     className="relative p-6 rounded-xl border border-[#e8ebd7] overflow-hidden cursor-pointer
//       bg-white/70  hover:shadow-lg transition-all duration-300"
//   >
//     <div className="relative z-10">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-2xl font-bold text-[#2d2f25]">{name}</h3>
//           <div className="flex items-center space-x-2 mt-1">
//             <span className="text-sm font-medium text-[#4a4d3c]">City Performance</span>
//           </div>
//         </div>
//         <div className="p-2 bg-[#fcfff2] rounded-lg">
//           <FaMapMarkerAlt className="w-6 h-6 text-[#8b9164]" />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-3">
//         <StatBox icon={FaTaxi} label="Total Trips" value={totalTrip} />
//         <StatBox icon={FaUsers} label="Active Drivers" value={activeDrivers} />
//         <StatBox
//           icon={FaMoneyBillWave}
//           label="Completed Trips"
//           value={completedTrips}
//         />
//         <div className="col-span-2 mt-2 p-3 rounded-lg bg-[#fcfff2] border border-gray-200">
//           <div className="flex justify-between items-center text-[#4a4d3c]">
//             <span className="text-sm">Trip Completion Rate</span>
//             <span className="text-lg font-bold text-green-600">
//               {((parseInt(completedTrips.replace(/,/g, '')) / parseInt(totalTrip.replace(/,/g, ''))) * 100).toFixed(1)}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="absolute right-0 top-0 -mt-4 -mr-4 opacity-5">
//       <FaMapMarkerAlt className="w-24 h-24" />
//     </div>
//   </motion.div>
// )

// const CityStats = ({ data }: { data: CityData }) => {
//   return (
//     <div className="space-y-8 py-10">
//       <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between bg-white/70  p-6 rounded-2xl border border-[#e8ebd7]">
//         <div className="space-y-3">
//           <div className="flex items-center space-x-3">
//             <span className="px-3 py-1 text-xs font-semibold bg-[#fcfff2] text-[#4a4d3c] rounded-full">
//               Cities
//             </span>
//           </div>
//           <h2 className="text-2xl font-bold text-[#2d2f25]">City-wise Statistics</h2>
//           <p className="text-[#6b6e5a]">Performance metrics across major operational cities</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {data.cities.map((city, index) => (
//           <motion.div
//             key={city.name || index}
//             // whileHover={{ scale: 1.02 }}
//             // whileTap={{ scale: 0.98 }}
//           >
//             <CityCard {...city} />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default CityStats
