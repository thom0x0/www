'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CheckIcon, LinkIcon } from 'lucide-react'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'

// ============================================================================
// Constants
// ============================================================================

const COPY_TIMEOUT_MS = 2000

const PROSE_CLASSES = [
  'prose',
  'prose-zinc',
  'prose-base',
  'dark:prose-invert',
  // Headings
  'prose-headings:scroll-mt-20',
  'prose-h1:text-2xl',
  'prose-h1:font-medium',
  'prose-h1:tracking-tight',
  'sm:prose-h1:text-3xl',
  'prose-h2:mt-12',
  'prose-h2:text-xl',
  'prose-h2:tracking-tight',
  'prose-h3:mt-8',
  'prose-h3:text-lg',
  // Paragraphs
  'prose-p:leading-relaxed',
  'prose-p:text-zinc-600',
  'dark:prose-p:text-zinc-400',
  // Links
  'prose-a:font-medium',
  'prose-a:no-underline',
  'hover:prose-a:underline',
  // Code
  'prose-code:rounded',
  'prose-code:bg-zinc-100',
  'prose-code:px-1.5',
  'prose-code:py-0.5',
  'prose-code:text-sm',
  "prose-code:before:content-['']",
  "prose-code:after:content-['']",
  'dark:prose-code:bg-zinc-800',
  // Pre
  'prose-pre:rounded-lg',
  'prose-pre:border',
  'prose-pre:border-zinc-200',
  'dark:prose-pre:border-zinc-800',
  // Images
  'prose-img:rounded-lg',
  'prose-img:shadow-sm',
  // HR
  'prose-hr:border-zinc-200',
  'dark:prose-hr:border-zinc-800',
].join(' ')

// ============================================================================
// Copy Button Component
// ============================================================================

const CopyButton = memo(function CopyButton() {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')

  // Set URL only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href)
    }
  }, [])

  // Auto-reset copied state
  useEffect(() => {
    if (!copied) return

    const timer = setTimeout(() => {
      setCopied(false)
    }, COPY_TIMEOUT_MS)

    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = useCallback(async () => {
    if (!url) return

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch (error) {
      console.error('Erro ao copiar link:', error)
      // Optionally: Show error toast/notification
    }
  }, [url])

  const buttonLabel = copied ? 'Link copiado' : 'Copiar link do artigo'
  const buttonText = copied ? 'Copiado!' : 'Copiar link'

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={buttonLabel}
      aria-live="polite"
      disabled={!url}
      className="group flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm outline-none ring-1 ring-zinc-900/5 transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <TextMorph className="min-w-[52px]">{buttonText}</TextMorph>
    </button>
  )
})

// ============================================================================
// Gradient Overlay Component
// ============================================================================

const GradientOverlay = memo(function GradientOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent dark:from-zinc-950"
      aria-hidden="true"
    />
  )
})

// ============================================================================
// Article Actions Component
// ============================================================================

const ArticleActions = memo(function ArticleActions() {
  return (
    <aside
      className="fixed top-20 right-4 z-20 sm:right-6 lg:right-8"
      aria-label="Ações do artigo"
    >
      <CopyButton />
    </aside>
  )
})

// ============================================================================
// Main Layout Component
// ============================================================================

interface LayoutBlogPostProps {
  children: ReactNode
}

export default function LayoutBlogPost({ children }: LayoutBlogPostProps) {
  return (
    <>
      <GradientOverlay />

      {/* Progress Bar */}
      <ScrollProgress
        className="fixed top-0 left-0 z-20 h-0.5 bg-zinc-400 dark:bg-zinc-600"
        springOptions={{ bounce: 0 }}
      />

      <ArticleActions />

      {/* Main Content */}
      <main className="relative mx-auto mt-16 max-w-2xl px-4 pb-24 sm:px-6 lg:px-8">
        <article className={PROSE_CLASSES}>{children}</article>
      </main>
    </>
  )
}