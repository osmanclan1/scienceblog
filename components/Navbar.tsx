'use client'

import Link from 'next/link'
import ThemeToggle from './common/ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary hover:opacity-80 transition-opacity"
          >
            My Blog
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-text-primary-light dark:text-text-primary-dark hover:text-primary font-medium transition-colors hidden sm:block"
            >
              Articles
            </Link>
            <Link
              href="/admin"
              className="text-text-primary-light dark:text-text-primary-dark hover:text-primary font-medium transition-colors hidden sm:block"
            >
              Admin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

