'use client'

import { Topic, unlockTopic } from '@/lib/topics-client'
import TopicContent from './TopicContent'
import Quiz from './Quiz'

interface TopicPageClientProps {
  topic: Topic
  contentHtml: string
}

export default function TopicPageClient({ topic, contentHtml }: TopicPageClientProps) {
  return (
    <>
      <TopicContent topic={topic} contentHtml={contentHtml} />
      {topic.quiz && (
        <Quiz
          questions={topic.quiz.questions}
          onComplete={(passed) => {
            if (passed) {
              unlockTopic(topic.id)
              alert(`Congratulations! You've unlocked the ${topic.name} topic!`)
            }
          }}
        />
      )}
    </>
  )
}

