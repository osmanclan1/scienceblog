// Client-side only utilities for topics
// This file can be safely imported in client components

export interface Topic {
  id: string
  name: string
  description: string
  content: string
  quiz?: {
    questions: Array<{
      question: string
      type: 'multiple-choice' | 'free-response'
      options?: string[]
      correctAnswer: string | string[]
      explanation?: string
    }>
  }
}

export function getUnlockedTopics(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('unlocked-topics')
  return stored ? JSON.parse(stored) : []
}

export function unlockTopic(topicId: string): void {
  if (typeof window === 'undefined') return
  const unlocked = getUnlockedTopics()
  if (!unlocked.includes(topicId)) {
    unlocked.push(topicId)
    localStorage.setItem('unlocked-topics', JSON.stringify(unlocked))
  }
}

export function isTopicUnlocked(topicId: string): boolean {
  if (typeof window === 'undefined') return false
  return getUnlockedTopics().includes(topicId)
}




