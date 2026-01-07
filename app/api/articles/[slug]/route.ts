import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug, deleteArticle, saveArticle } from '@/lib/articles'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const article = await getArticleBySlug(slug)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    const { title, topic, content, excerpt, requiredTopics, quiz } = body

    if (!title || !topic || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get existing article to preserve date and quiz
    const existing = await getArticleBySlug(slug)
    if (!existing) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Update article (preserve original date, use provided quiz or keep existing)
    const articleQuiz = quiz !== undefined ? quiz : (existing as any).quiz
    saveArticle(slug, title, topic, content, excerpt, existing.date, requiredTopics, articleQuiz)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update article' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const deleted = deleteArticle(slug)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}
