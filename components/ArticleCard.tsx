'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Article } from '@/lib/articles'

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="block glass rounded-xl hover:shadow-xl transition-all p-6 border border-border-light dark:border-border-dark group h-full"
      >
        <div className="mb-3">
          <span className="inline-block bg-primary-light dark:bg-border-dark text-primary dark:text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {article.topic}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3 group-hover:text-primary transition">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="text-sm text-text-tertiary-light dark:text-text-tertiary-dark">
          {format(new Date(article.date), 'MMMM d, yyyy')}
        </div>
      </Link>
    </motion.div>
  )
}

