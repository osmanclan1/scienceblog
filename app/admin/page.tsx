'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Plus, Trash2, Eye, Edit2, X, LogOut } from 'lucide-react'
import { Topic } from '@/lib/topics-client'
import { useRouter } from 'next/navigation'

interface Article {
  slug: string
  title: string
  date: string
  topic: string
  excerpt?: string
  requiredTopics?: string[]
  content?: string
}

export default function AdminPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [activeTab, setActiveTab] = useState<'articles' | 'topics'>('articles')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  
  // Article state
  const [isCreatingArticle, setIsCreatingArticle] = useState(false)
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null)
  const [articleFormData, setArticleFormData] = useState({
    slug: '',
    title: '',
    topic: '',
    excerpt: '',
    content: '',
    requiredTopics: [] as string[],
  })
  
  // Topic state
  const [isCreatingTopic, setIsCreatingTopic] = useState(false)
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null)
  const [topicFormData, setTopicFormData] = useState({
    id: '',
    name: '',
    description: '',
    content: '',
    quiz: null as any,
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          router.push('/login?redirect=/admin')
        }
      } else {
        router.push('/login?redirect=/admin')
      }
    } catch (err) {
      router.push('/login?redirect=/admin')
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Failed to logout:', err)
    }
  }

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (err) {
      console.error('Failed to load articles:', err)
    }
  }

  const loadTopics = async () => {
    try {
      const response = await fetch('/api/topics')
      if (response.ok) {
        const data = await response.json()
        setTopics(data)
      }
    } catch (err) {
      console.error('Failed to load topics:', err)
    }
  }

  const loadArticleForEdit = async (slug: string) => {
    try {
      const response = await fetch(`/api/articles/${slug}`)
      if (response.ok) {
        const article = await response.json()
        setArticleFormData({
          slug: article.slug,
          title: article.title,
          topic: article.topic,
          excerpt: article.excerpt || '',
          content: article.content || '',
          requiredTopics: article.requiredTopics || [],
        })
        setEditingArticleSlug(slug)
        setIsCreatingArticle(true)
      }
    } catch (err) {
      setError('Failed to load article for editing')
    }
  }

  const loadTopicForEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/topics/${id}`)
      if (response.ok) {
        const topic = await response.json()
        setTopicFormData({
          id: topic.id,
          name: topic.name,
          description: topic.description,
          content: topic.content || '',
          quiz: topic.quiz || null,
        })
        setEditingTopicId(id)
        setIsCreatingTopic(true)
      }
    } catch (err) {
      setError('Failed to load topic for editing')
    }
  }

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!articleFormData.slug || !articleFormData.title || !articleFormData.topic || !articleFormData.content) {
      setError('Please fill in all required fields')
      return
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(articleFormData.slug)) {
      setError('Slug must contain only lowercase letters, numbers, and hyphens')
      return
    }

    try {
      const url = editingArticleSlug ? `/api/articles/${editingArticleSlug}` : '/api/articles'
      const method = editingArticleSlug ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleFormData),
      })

      if (response.ok) {
        setSuccess(editingArticleSlug ? 'Article updated successfully!' : 'Article created successfully!')
        setArticleFormData({
          slug: '',
          title: '',
          topic: '',
          excerpt: '',
          content: '',
          requiredTopics: [],
        })
        setIsCreatingArticle(false)
        setEditingArticleSlug(null)
        loadArticles()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save article')
      }
    } catch (err) {
      setError('Failed to save article')
    }
  }

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!topicFormData.id || !topicFormData.name || !topicFormData.description || !topicFormData.content) {
      setError('Please fill in all required fields')
      return
    }

    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!idRegex.test(topicFormData.id)) {
      setError('ID must contain only lowercase letters, numbers, and hyphens')
      return
    }

    try {
      const url = editingTopicId ? `/api/topics/${editingTopicId}` : '/api/topics'
      const method = editingTopicId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicFormData),
      })

      if (response.ok) {
        setSuccess(editingTopicId ? 'Topic updated successfully!' : 'Topic created successfully!')
        setTopicFormData({
          id: '',
          name: '',
          description: '',
          content: '',
          quiz: null,
        })
        setIsCreatingTopic(false)
        setEditingTopicId(null)
        loadTopics()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save topic')
      }
    } catch (err) {
      setError('Failed to save topic')
    }
  }

  const handleDeleteArticle = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Article deleted successfully!')
        loadArticles()
      } else {
        setError('Failed to delete article')
      }
    } catch (err) {
      setError('Failed to delete article')
    }
  }

  const handleDeleteTopic = async (id: string) => {
    if (!confirm(`Are you sure you want to delete "${id}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/topics/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Topic deleted successfully!')
        loadTopics()
      } else {
        setError('Failed to delete topic')
      }
    } catch (err) {
      setError('Failed to delete topic')
    }
  }

  const toggleRequiredTopic = (topicId: string) => {
    setArticleFormData(prev => ({
      ...prev,
      requiredTopics: prev.requiredTopics.includes(topicId)
        ? prev.requiredTopics.filter(id => id !== topicId)
        : [...prev.requiredTopics, topicId]
    }))
  }

  const cancelArticleEdit = () => {
    setArticleFormData({
      slug: '',
      title: '',
      topic: '',
      excerpt: '',
      content: '',
      requiredTopics: [],
    })
    setIsCreatingArticle(false)
    setEditingArticleSlug(null)
  }

  const cancelTopicEdit = () => {
    setTopicFormData({
      id: '',
      name: '',
      description: '',
      content: '',
      quiz: null,
    })
    setIsCreatingTopic(false)
    setEditingTopicId(null)
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles()
      loadTopics()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Admin Panel
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Manage your articles and topics</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-error/10 hover:bg-error/20 text-error rounded-xl font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border-light dark:border-border-dark">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'articles'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'topics'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
          }`}
        >
          Topics
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6"
        >
          {success}
        </motion.div>
      )}

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div className="glass rounded-2xl p-6 mb-8 border border-border-light dark:border-border-dark">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark">Articles</h2>
            <button
              onClick={() => {
                if (isCreatingArticle) {
                  cancelArticleEdit()
                } else {
                  setIsCreatingArticle(true)
                }
              }}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              {isCreatingArticle ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isCreatingArticle ? 'Cancel' : 'New Article'}
            </button>
          </div>

          {isCreatingArticle && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleArticleSubmit}
              className="mb-8 p-6 bg-primary-light/30 dark:bg-border-dark/30 rounded-xl border border-border-light dark:border-border-dark"
            >
              {editingArticleSlug && (
                <div className="mb-4 p-3 bg-primary-light dark:bg-border-dark rounded-lg">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Editing: <span className="font-mono font-semibold">{editingArticleSlug}</span>
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                    Slug * (e.g., "quantum-mechanics-basics")
                  </label>
                  <input
                    type="text"
                    value={articleFormData.slug}
                    onChange={(e) => setArticleFormData({ ...articleFormData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="article-slug"
                    required
                    disabled={!!editingArticleSlug}
                  />
                  {editingArticleSlug && (
                    <p className="text-xs text-text-tertiary-light dark:text-text-tertiary-dark mt-1">
                      Slug cannot be changed when editing
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                    Topic * (e.g., "Physics", "Biology", "Mathematics")
                  </label>
                  <input
                    type="text"
                    value={articleFormData.topic}
                    onChange={(e) => setArticleFormData({ ...articleFormData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Topic"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={articleFormData.title}
                  onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Article Title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Excerpt (optional)
                </label>
                <textarea
                  value={articleFormData.excerpt}
                  onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Brief description of the article"
                  rows={2}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Required Topics (optional)
                </label>
                <div className="space-y-2 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark max-h-40 overflow-y-auto">
                  {topics.map((topic) => (
                    <label
                      key={topic.id}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-primary-light/20 dark:hover:bg-border-dark/20"
                    >
                      <input
                        type="checkbox"
                        checked={articleFormData.requiredTopics.includes(topic.id)}
                        onChange={() => toggleRequiredTopic(topic.id)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary-light dark:text-text-primary-dark">
                        {topic.name}
                      </span>
                    </label>
                  ))}
                  {topics.length === 0 && (
                    <p className="text-sm text-text-tertiary-light dark:text-text-tertiary-dark">
                      No topics available. Create topics first.
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm"
                  placeholder="# Your Article Title

Write your article content here using Markdown..."
                  rows={15}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              >
                {editingArticleSlug ? 'Update Article' : 'Create Article'}
              </button>
            </motion.form>
          )}

          {articles.length === 0 ? (
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-8">
              No articles yet. Create your first one!
            </p>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-primary-light/20 dark:bg-border-dark/20 rounded-xl border border-border-light dark:border-border-dark hover:bg-primary-light/30 dark:hover:bg-border-dark/30 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                        {article.title}
                      </h3>
                      <span className="bg-primary-light dark:bg-border-dark text-primary dark:text-primary text-xs font-semibold px-2 py-1 rounded-full">
                        {article.topic}
                      </span>
                      {article.requiredTopics && article.requiredTopics.length > 0 && (
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          🔒 {article.requiredTopics.length} prerequisite{article.requiredTopics.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="font-mono">{article.slug}</span> • {format(new Date(article.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadArticleForEdit(article.slug)}
                      className="text-primary hover:text-primary-hover p-2 rounded-lg hover:bg-primary-light/20 dark:hover:bg-border-dark/20 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <a
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover p-2 rounded-lg hover:bg-primary-light/20 dark:hover:bg-border-dark/20 transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => handleDeleteArticle(article.slug)}
                      className="text-error hover:text-error/80 p-2 rounded-lg hover:bg-red-50/20 dark:hover:bg-red-950/20 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topics Tab */}
      {activeTab === 'topics' && (
        <div className="glass rounded-2xl p-6 mb-8 border border-border-light dark:border-border-dark">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark">Topics</h2>
            <button
              onClick={() => {
                if (isCreatingTopic) {
                  cancelTopicEdit()
                } else {
                  setIsCreatingTopic(true)
                }
              }}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              {isCreatingTopic ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isCreatingTopic ? 'Cancel' : 'New Topic'}
            </button>
          </div>

          {isCreatingTopic && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleTopicSubmit}
              className="mb-8 p-6 bg-primary-light/30 dark:bg-border-dark/30 rounded-xl border border-border-light dark:border-border-dark"
            >
              {editingTopicId && (
                <div className="mb-4 p-3 bg-primary-light dark:bg-border-dark rounded-lg">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Editing: <span className="font-mono font-semibold">{editingTopicId}</span>
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                    ID * (e.g., "lorentz-force")
                  </label>
                  <input
                    type="text"
                    value={topicFormData.id}
                    onChange={(e) => setTopicFormData({ ...topicFormData, id: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="topic-id"
                    required
                    disabled={!!editingTopicId}
                  />
                  {editingTopicId && (
                    <p className="text-xs text-text-tertiary-light dark:text-text-tertiary-dark mt-1">
                      ID cannot be changed when editing
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={topicFormData.name}
                    onChange={(e) => setTopicFormData({ ...topicFormData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Topic Name"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Description *
                </label>
                <textarea
                  value={topicFormData.description}
                  onChange={(e) => setTopicFormData({ ...topicFormData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Brief description of the topic"
                  rows={2}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  value={topicFormData.content}
                  onChange={(e) => setTopicFormData({ ...topicFormData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm"
                  placeholder="# Topic Title

Write your topic content here using Markdown..."
                  rows={15}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Quiz (optional - JSON format)
                </label>
                <textarea
                  value={topicFormData.quiz ? JSON.stringify(topicFormData.quiz, null, 2) : ''}
                  onChange={(e) => {
                    try {
                      const quiz = e.target.value ? JSON.parse(e.target.value) : null
                      setTopicFormData({ ...topicFormData, quiz })
                    } catch (err) {
                      // Invalid JSON, keep as is
                    }
                  }}
                  className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-tertiary-light dark:placeholder-text-tertiary-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-xs"
                  placeholder='{"questions": [{"question": "...", "type": "multiple-choice", "options": [...], "correctAnswer": "...", "explanation": "..."}]}'
                  rows={10}
                />
                <p className="text-xs text-text-tertiary-light dark:text-text-tertiary-dark mt-1">
                  Leave empty if no quiz. Use JSON format for quiz structure.
                </p>
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              >
                {editingTopicId ? 'Update Topic' : 'Create Topic'}
              </button>
            </motion.form>
          )}

          {topics.length === 0 ? (
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-8">
              No topics yet. Create your first one!
            </p>
          ) : (
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-primary-light/20 dark:bg-border-dark/20 rounded-xl border border-border-light dark:border-border-dark hover:bg-primary-light/30 dark:hover:bg-border-dark/30 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                        {topic.name}
                      </h3>
                      {topic.quiz && (
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          📝 Quiz
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                      {topic.description}
                    </p>
                    <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="font-mono">{topic.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadTopicForEdit(topic.id)}
                      className="text-primary hover:text-primary-hover p-2 rounded-lg hover:bg-primary-light/20 dark:hover:bg-border-dark/20 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <a
                      href={`/topics/${topic.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover p-2 rounded-lg hover:bg-primary-light/20 dark:hover:bg-border-dark/20 transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="text-error hover:text-error/80 p-2 rounded-lg hover:bg-red-50/20 dark:hover:bg-red-950/20 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
