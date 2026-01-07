'use client'

import { motion } from 'framer-motion'
import { Topic } from '@/lib/topics'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'
import GraphRenderer from './graphs/GraphRenderer'

interface TopicContentProps {
  topic: Topic
  contentHtml: string
}

export default function TopicContent({ topic, contentHtml }: TopicContentProps) {
  // Replace graph placeholders with React components
  const processedHtml = useMemo(() => {
    let html = contentHtml
    
    // Replace [[Graph:graphId]] with a placeholder that we'll replace with React components
    html = html.replace(/\[\[Graph:([^\]]+)\]\]/g, (match, graphId) => {
      return `<div data-graph-id="${graphId.trim()}" class="graph-placeholder"></div>`
    })
    
    return html
  }, [contentHtml])

  // Extract graph IDs and render them
  const graphMatches = useMemo(() => {
    const matches: Array<{ id: string; index: number }> = []
    const regex = /data-graph-id="([^"]+)"/g
    let match
    let index = 0
    
    while ((match = regex.exec(processedHtml)) !== null) {
      matches.push({ id: match[1], index: index++ })
    }
    
    return matches
  }, [processedHtml])

  // Split HTML and insert graph components
  const renderContent = () => {
    const parts = processedHtml.split(/<div data-graph-id="([^"]+)"[^>]*><\/div>/)
    const result: React.ReactNode[] = []
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular HTML content
        if (parts[i]) {
          result.push(
            <div
              key={`html-${i}`}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: parts[i] }}
            />
          )
        }
      } else {
        // Graph component
        const graphId = parts[i]
        result.push(
          <GraphRenderer key={`graph-${i}`} graphId={graphId} />
        )
      }
    }
    
    return result
  }

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

        {renderContent()}
      </motion.article>
    </>
  )
}

