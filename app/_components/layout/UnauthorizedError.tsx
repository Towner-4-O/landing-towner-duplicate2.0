'use client'

import { motion } from 'framer-motion'
import { ShieldX } from 'lucide-react'

const UnauthorizedError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <ShieldX className="h-24 w-24 text-[#A8FF01]" />
        </motion.div>
        <h1 className="text-4xl font-bold text-[#A8FF01] mb-4">403 Unauthorized</h1>
        <p className="text-gray-400 text-lg mb-8">Sorry, you don't have permission to access this page.</p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-[#A8FF01] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#86cc01] transition-colors"
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  )
}

export default UnauthorizedError