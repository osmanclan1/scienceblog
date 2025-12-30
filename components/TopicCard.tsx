'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Topic, isTopicUnlocked } from '@/lib/topics-client'
import { Lock, CheckCircle2 } from 'lucide-react'

interface TopicCardProps {
  topic: Topic
  index: number
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setUnlocked(isTopicUnlocked(topic.id))
  }, [topic.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/topics/${topic.id}`}
        className="block glass rounded-xl hover:shadow-xl transition-all p-6 border border-border-light dark:border-border-dark group h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {unlocked ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : (
              <Lock className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            )}
            <span className="inline-block bg-primary-light dark:bg-border-dark text-primary dark:text-primary px-3 py-1 rounded-full text-xs font-semibold">
              Topic
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3 group-hover:text-primary transition">
          {topic.name}
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
          {topic.description}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {unlocked ? (
            <span className="text-success font-medium">✓ Unlocked</span>
          ) : (
            <span className="text-text-tertiary-light dark:text-text-tertiary-dark">
              {topic.quiz ? 'Complete quiz to unlock' : 'Click to view'}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

