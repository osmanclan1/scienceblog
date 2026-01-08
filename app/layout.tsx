import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'My Science Blog',
  description: 'A personal blog about science and concepts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
              © {new Date().getFullYear()} My Science Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
