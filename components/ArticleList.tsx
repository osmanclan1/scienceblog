'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ArticleCard from './ArticleCard'
import { Article } from '@/lib/articles'

interface ArticleListProps {
  articles: Article[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto glass rounded-2xl p-8 border border-border-light dark:border-border-dark">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
            No articles yet
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Start writing by going to the admin panel and uploading your first article.
          </p>
          <Link
            href="/admin"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Go to Admin
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} index={index} />
      ))}
    </div>
  )
}

