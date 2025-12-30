'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-4">
          Article Not Found
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
          The article you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  )
}
