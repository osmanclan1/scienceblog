import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import ArticleHeader from '@/components/ArticleHeader'
import ArticleContent from '@/components/ArticleContent'
import ArticleLocked from '@/components/ArticleLocked'
import ArticlePageClient from '@/components/ArticlePageClient'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Get required topics from article frontmatter
  const requiredTopics = (article as any).requiredTopics || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ArticleHeader />
      <ArticlePageClient article={article} requiredTopics={requiredTopics} />
    </div>
  )
}
