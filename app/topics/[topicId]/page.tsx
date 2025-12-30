import { getTopicById, getAllTopics } from '@/lib/topics'
import { notFound } from 'next/navigation'
import TopicPageClient from '@/components/TopicPageClient'
import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const topics = getAllTopics()
  return topics.map((topic) => ({
    topicId: topic.id,
  }))
}

export default async function TopicPage({
  params,
}: {
  params: { topicId: string }
}) {
  const topic = getTopicById(params.topicId)

  if (!topic) {
    notFound()
  }

  const processedContent = await remark()
    .use(html)
    .process(topic.content)

  const contentHtml = processedContent.toString()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TopicPageClient topic={topic} contentHtml={contentHtml} />
    </div>
  )
}

