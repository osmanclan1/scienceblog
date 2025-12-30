'use client'

import { useState, useEffect } from 'react'
import { Topic } from '@/lib/topics-client'
import TopicCard from './TopicCard'

export default function TopicList() {
  const [topicsList, setTopicsList] = useState<Topic[]>([])

  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    try {
      const response = await fetch('/api/topics')
      if (response.ok) {
        const data = await response.json()
        setTopicsList(data)
      }
    } catch (err) {
      console.error('Failed to load topics:', err)
    }
  }

  if (topicsList.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
        Topics
      </h2>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
        Learn foundational concepts that unlock advanced articles
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topicsList.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  )
}

