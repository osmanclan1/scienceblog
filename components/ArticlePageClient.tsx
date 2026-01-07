'use client'

import { useEffect, useState } from 'react'
import { Article } from '@/lib/articles'
import { isTopicUnlocked } from '@/lib/topics-client'
import ArticleContent from './ArticleContent'
import ArticleLocked from './ArticleLocked'
import Quiz from './Quiz'

interface ArticlePageClientProps {
  article: Article
  requiredTopics: string[]
}

export default function ArticlePageClient({ article, requiredTopics }: ArticlePageClientProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkUnlocked = () => {
      if (requiredTopics.length === 0) {
        setUnlocked(true)
      } else {
        const allUnlocked = requiredTopics.every(topicId => isTopicUnlocked(topicId))
        setUnlocked(allUnlocked)
      }
    }

    checkUnlocked()

    // Listen for topic unlock events
    const handleTopicUnlocked = () => {
      checkUnlocked()
    }

    window.addEventListener('topic-unlocked', handleTopicUnlocked)
    return () => {
      window.removeEventListener('topic-unlocked', handleTopicUnlocked)
    }
  }, [requiredTopics])

  if (!mounted) {
    return (
      <div className="glass rounded-2xl p-8 border border-border-light dark:border-border-dark">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!unlocked && requiredTopics.length > 0) {
    return <ArticleLocked requiredTopics={requiredTopics} />
  }

  // Check if article has a quiz
  const articleQuiz = (article as any).quiz

  return (
    <>
      <ArticleContent article={article} requiredTopics={requiredTopics} />
      {articleQuiz && (
        <Quiz
          questions={articleQuiz.questions}
          onComplete={(passed) => {
            // Quiz completion logic if needed
            console.log('Quiz completed:', passed)
          }}
        />
      )}
    </>
  )
}

