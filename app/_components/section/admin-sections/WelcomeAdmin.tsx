'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  "Leadership is the capacity to translate vision into reality.",
  "The best way to predict the future is to create it.",
  "Innovation distinguishes between a leader and a follower.",
  "Management is doing things right; leadership is doing the right things."
];

const WelcomeAdmin = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const currentTime = new Date();
  const hours = currentTime.getHours();
  
  const greeting = hours < 12 ? 'Good Morning' : hours < 17 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, <span className="text-[#A7FF03]">Admin</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard. Here's your daily inspiration:
        </p>
        <motion.blockquote 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-l-4 border-[#A7FF03] pl-4 italic text-gray-700"
        >
          "{quote}"
        </motion.blockquote>
      </div>
    </motion.div>
  );
};

export default WelcomeAdmin;