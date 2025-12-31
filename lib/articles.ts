import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const articlesDirectory = path.join(process.cwd(), 'articles')

export interface Article {
  slug: string
  title: string
  date: string
  topic: string
  excerpt?: string
  content: string
  contentHtml?: string
}

export function getArticlesDirectory(): string {
  // Create articles directory if it doesn't exist
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true })
  }
  return articlesDirectory
}

export function getAllArticles(): Article[] {
  const dir = getArticlesDirectory()
  
  if (!fs.existsSync(dir)) {
    return []
  }

  const fileNames = fs.readdirSync(dir)
  const articles = fileNames
    .filter(name => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(dir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        topic: data.topic || 'General',
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        content,
      }
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return articles
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const dir = getArticlesDirectory()
  const fullPath = path.join(dir, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    topic: data.topic || 'General',
    excerpt: data.excerpt || content.substring(0, 150) + '...',
    content,
    contentHtml,
    requiredTopics: data.requiredTopics || [],
    quiz: data.quiz || null,
  } as Article & { requiredTopics?: string[], quiz?: any }
}

export function saveArticle(
  slug: string, 
  title: string, 
  topic: string, 
  content: string, 
  excerpt?: string,
  date?: string,
  requiredTopics?: string[]
): void {
  const dir = getArticlesDirectory()
  const articleDate = date || new Date().toISOString()
  
  const frontMatter = `---
title: ${title}
date: ${articleDate}
topic: ${topic}
${excerpt ? `excerpt: ${excerpt}` : ''}
${requiredTopics && requiredTopics.length > 0 ? `requiredTopics: ${JSON.stringify(requiredTopics)}` : ''}
---

${content}
`

  const fullPath = path.join(dir, `${slug}.md`)
  fs.writeFileSync(fullPath, frontMatter, 'utf8')
}

export function deleteArticle(slug: string): boolean {
  const dir = getArticlesDirectory()
  const fullPath = path.join(dir, `${slug}.md`)
  
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath)
    return true
  }
  
  return false
}

