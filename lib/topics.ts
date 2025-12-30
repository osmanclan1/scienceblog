import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const topicsDirectory = path.join(process.cwd(), 'topics')

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

export function getTopicsDirectory(): string {
  if (!fs.existsSync(topicsDirectory)) {
    fs.mkdirSync(topicsDirectory, { recursive: true })
  }
  return topicsDirectory
}

export function getAllTopics(): Topic[] {
  const dir = getTopicsDirectory()
  
  if (!fs.existsSync(dir)) {
    return []
  }

  const fileNames = fs.readdirSync(dir)
  const topics = fileNames
    .filter(name => name.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(dir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        id,
        name: data.name || 'Untitled Topic',
        description: data.description || '',
        content,
        quiz: data.quiz || undefined,
      }
    })

  return topics
}

export function getTopicById(id: string): Topic | null {
  const dir = getTopicsDirectory()
  const fullPath = path.join(dir, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id,
    name: data.name || 'Untitled Topic',
    description: data.description || '',
    content,
    quiz: data.quiz || undefined,
  }
}

export function saveTopic(
  id: string,
  name: string,
  description: string,
  content: string,
  quiz?: any
): void {
  const dir = getTopicsDirectory()
  
  const frontMatter: any = {
    name,
    description,
  }

  if (quiz) {
    frontMatter.quiz = quiz
  }

  const frontMatterString = Object.entries(frontMatter)
    .map(([key, value]) => {
      if (key === 'quiz') {
        return `quiz: ${JSON.stringify(value)}`
      }
      return `${key}: ${JSON.stringify(value)}`
    })
    .join('\n')

  const fileContent = `---
${frontMatterString}
---

${content}
`

  const fullPath = path.join(dir, `${id}.md`)
  fs.writeFileSync(fullPath, fileContent, 'utf8')
}

export function deleteTopic(id: string): boolean {
  const dir = getTopicsDirectory()
  const fullPath = path.join(dir, `${id}.md`)
  
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath)
    return true
  }
  
  return false
}

// Re-export Topic type for server-side use
// Client components should import from topics-client.ts instead
