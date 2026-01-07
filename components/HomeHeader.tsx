'use client'

import { motion } from 'framer-motion'

export default function HomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary">
        Welcome to My Private Blog
      </h1>
      <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
        Exploring science, concepts, and ideas through thoughtful articles
      </p>
    </motion.div>
  )
}




