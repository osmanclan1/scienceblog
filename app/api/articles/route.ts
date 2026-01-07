import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles, saveArticle } from '@/lib/articles'

export async function GET() {
  try {
    const articles = getAllArticles()
    // Remove content from response to reduce payload
    const articlesList = articles.map(({ content, ...rest }) => rest)
    return NextResponse.json(articlesList)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, topic, content, excerpt, requiredTopics, quiz } = body

    if (!slug || !title || !topic || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      )
    }

    saveArticle(slug, title, topic, content, excerpt, undefined, requiredTopics, quiz)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create article' },
      { status: 500 }
    )
  }
}

