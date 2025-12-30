'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Article } from '@/lib/articles'
import ArticleContentWithTooltips from './ArticleContentWithTooltips'

interface ArticleContentProps {
  article: Article
  requiredTopics?: string[]
}

export default function ArticleContent({ article, requiredTopics = [] }: ArticleContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 md:p-12 border border-border-light dark:border-border-dark shadow-lg"
    >
      <div className="mb-6">
        <span className="inline-block bg-primary-light dark:bg-border-dark text-primary dark:text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
          {article.topic}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {article.title}
        </h1>
        <div className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
          {format(new Date(article.date), 'MMMM d, yyyy')}
        </div>
        {requiredTopics.length > 0 && (
          <div className="mt-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <span className="font-semibold">Prerequisites:</span> {requiredTopics.join(', ')}
          </div>
        )}
      </div>

      <ArticleContentWithTooltips html={article.contentHtml || ''} />
    </motion.article>
  )
}

