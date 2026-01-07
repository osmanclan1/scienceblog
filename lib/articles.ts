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
  requiredTopics?: string[],
  quiz?: any
): void {
  const dir = getArticlesDirectory()
  const articleDate = date || new Date().toISOString()
  
  // Properly format YAML frontmatter with quotes for strings that might contain special characters
  const frontMatterParts = [
    `title: ${JSON.stringify(title)}`,
    `date: ${articleDate}`,
    `topic: ${JSON.stringify(topic)}`,
  ]
  
  if (excerpt) {
    frontMatterParts.push(`excerpt: ${JSON.stringify(excerpt)}`)
  }
  
  if (requiredTopics && requiredTopics.length > 0) {
    frontMatterParts.push(`requiredTopics: ${JSON.stringify(requiredTopics)}`)
  }
  
  if (quiz) {
    // Format quiz as YAML (properly indented, matching gray-matter format)
    // Use JSON.stringify but format as YAML block
    const quizJson = JSON.stringify(quiz, null, 2)
    const quizLines = quizJson.split('\n')
    const quizFormatted = quizLines.map((line, index) => {
      if (index === 0) {
        return `quiz: ${line}`
      }
      return '  ' + line
    }).join('\n')
    frontMatterParts.push(quizFormatted)
  }
  
  const frontMatter = `---
${frontMatterParts.join('\n')}
---

${content}
`

  const fullPath = path.join(dir, `${slug}.md`)
  
  try {
    fs.writeFileSync(fullPath, frontMatter, 'utf8')
  } catch (error) {
    // On Vercel/serverless, filesystem is read-only
    if (error instanceof Error && (error.message.includes('EACCES') || error.message.includes('read-only'))) {
      throw new Error('Filesystem is read-only. Article updates are not supported in serverless environments. Use a database or external storage instead.')
    }
    throw error
  }
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

