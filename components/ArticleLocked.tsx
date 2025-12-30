'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Topic } from '@/lib/topics-client'

interface ArticleLockedProps {
  requiredTopics: string[]
}

export default function ArticleLocked({ requiredTopics }: ArticleLockedProps) {
  const [topics, setTopics] = useState<Record<string, Topic>>({})

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetch('/api/topics')
        if (response.ok) {
          const topicsList = await response.json()
          const topicsMap: Record<string, Topic> = {}
          topicsList.forEach((topic: Topic) => {
            topicsMap[topic.id] = topic
          })
          setTopics(topicsMap)
        }
      } catch (err) {
        console.error('Failed to load topics:', err)
      }
    }
    loadTopics()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 md:p-12 border border-border-light dark:border-border-dark text-center"
    >
      <Lock className="w-16 h-16 text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
        Article Locked
      </h2>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
        You need to unlock the following topics before reading this article:
      </p>
      <div className="space-y-3 mb-6">
        {requiredTopics.map((topicId) => {
          const topic = topics[topicId]
          if (!topic) return null
          return (
            <Link
              key={topicId}
              href={`/topics/${topicId}`}
              className="block p-4 bg-primary-light dark:bg-border-dark rounded-xl border border-border-light dark:border-border-dark hover:border-primary transition"
            >
              <h3 className="font-semibold text-primary dark:text-primary mb-1">
                {topic.name}
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {topic.description}
              </p>
            </Link>
          )
        })}
      </div>
      <Link
        href="/"
        className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
      >
        Back to Articles
      </Link>
    </motion.div>
  )
}

