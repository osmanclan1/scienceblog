import { getAllArticles } from '@/lib/articles'
import { motion } from 'framer-motion'
import ArticleList from '@/components/ArticleList'
import HomeHeader from '@/components/HomeHeader'
import TopicList from '@/components/TopicList'

export default function Home() {
  const articles = getAllArticles()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <HomeHeader />
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
          Articles
        </h2>
        <ArticleList articles={articles} />
      </div>
      <TopicList />
    </div>
  )
}
