'use client'

import { useMemo } from 'react'
import GraphRenderer from './graphs/GraphRenderer'

interface ArticleContentWithTooltipsProps {
  html: string
}

export default function ArticleContentWithTooltips({ html }: ArticleContentWithTooltipsProps) {
  const processedHtml = useMemo(() => {
    let processed = html
    const tooltipText = 'Voltage is analogous to potential gravitational energy. Applying a voltage allows electrons to flow just like placing a ball at the top of a hill allows it to move downhill.'
    
    // Replace voltage with tooltip spans
    processed = processed.replace(
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
    
    // Replace [[Graph:graphId]] with placeholders
    processed = processed.replace(/\[\[Graph:([^\]]+)\]\]/g, (match, graphId) => {
      return `<div data-graph-id="${graphId.trim()}" class="graph-placeholder"></div>`
    })
    
    return processed
  }, [html])

  // Split HTML and insert graph components
  const renderContent = () => {
    const parts = processedHtml.split(/<div data-graph-id="([^"]+)"[^>]*><\/div>/)
    const result: React.ReactNode[] = []
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular HTML content
        if (parts[i]) {
          result.push(
            <div
              key={`html-${i}`}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: parts[i] }}
            />
          )
        }
      } else {
        // Graph component
        const graphId = parts[i]
        result.push(
          <GraphRenderer key={`graph-${i}`} graphId={graphId} />
        )
      }
    }
    
    return result
  }

  return <>{renderContent()}</>
}

