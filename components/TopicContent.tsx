'use client'

import { motion } from 'framer-motion'
import { Topic } from '@/lib/topics'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TopicContentProps {
  topic: Topic
  contentHtml: string
}

export default function TopicContent({ topic, contentHtml }: TopicContentProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-8 md:p-12 border border-border-light dark:border-border-dark shadow-lg mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {topic.name}
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg mb-6">
          {topic.description}
        </p>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </motion.article>
    </>
  )
}

