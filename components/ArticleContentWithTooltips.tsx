'use client'

import { useMemo } from 'react'

interface ArticleContentWithTooltipsProps {
  html: string
}

export default function ArticleContentWithTooltips({ html }: ArticleContentWithTooltipsProps) {
  const processedHtml = useMemo(() => {
    const tooltipText = 'Voltage is analogous to potential gravitational energy. Applying a voltage allows electrons to flow just like placing a ball at the top of a hill allows it to move downhill.'
    
    // Replace voltage with tooltip spans
    return html.replace(
      /voltage/gi,
      (match) => {
        return `<span class="underline decoration-dotted decoration-primary cursor-help relative group" title="${tooltipText.replace(/"/g, '&quot;')}">
          ${match}
          <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
            <span class="bg-surface-dark dark:bg-surface-light text-text-primary-dark dark:text-text-primary-light px-4 py-2 rounded-lg shadow-xl border border-border-dark dark:border-border-light max-w-xs text-sm block whitespace-normal">
              ${tooltipText}
              <span class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <span class="w-2 h-2 bg-surface-dark dark:bg-surface-light border-r border-b border-border-dark dark:border-border-light transform rotate-45 block"></span>
              </span>
            </span>
          </span>
        </span>`
      }
    )
  }, [html])

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}

