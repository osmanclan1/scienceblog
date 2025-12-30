# Private Blog Website

A modern, private blog website built with Next.js, TypeScript, and Tailwind CSS. Upload and manage articles about science and various concepts.

## Features

- 📝 Create and manage articles with Markdown support
- 🎨 Beautiful, modern UI with Tailwind CSS
- 📱 Responsive design
- 🔍 Article listing with topics and dates
- ✏️ Admin panel for article management
- 📄 Individual article pages with formatted content

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Articles

1. Navigate to the Admin panel at `/admin`
2. Click "New Article"
3. Fill in the form:
   - **Slug**: URL-friendly identifier (e.g., `quantum-mechanics-basics`)
   - **Title**: Article title
   - **Topic**: Category (e.g., Physics, Biology, Mathematics)
   - **Excerpt**: Optional brief description
   - **Content**: Article content in Markdown format
4. Click "Create Article"

### Article Format

Articles are stored as Markdown files in the `articles/` directory. They use frontmatter for metadata:

```markdown
---
title: Your Article Title
date: 2024-01-01T00:00:00.000Z
topic: Physics
excerpt: Brief description
---

Your article content here...
```

### Markdown Support

Articles support full Markdown syntax:
- Headers (#, ##, ###)
- **Bold** and *italic* text
- Code blocks and inline code
- Lists (ordered and unordered)
- Links and images
- Blockquotes

## Project Structure

```
blogsite/
├── app/
│   ├── admin/          # Admin panel
│   ├── articles/       # Article pages
│   ├── api/            # API routes
│   └── page.tsx        # Homepage
├── articles/           # Article markdown files (created automatically)
├── lib/
│   └── articles.ts     # Article utilities
└── public/             # Static assets
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Gray Matter** - Frontmatter parsing
- **Remark** - Markdown processing

