import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics, saveTopic } from '@/lib/topics'

export async function GET() {
  try {
    const topics = getAllTopics()
    return NextResponse.json(topics)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, content, quiz } = body

    if (!id || !name || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate id format
    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!idRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid id format. Use only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      )
    }

    saveTopic(id, name, description, content, quiz)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    )
  }
}

