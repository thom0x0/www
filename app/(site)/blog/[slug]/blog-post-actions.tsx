'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { CheckIcon, LinkIcon } from 'lucide-react'

const COPY_TIMEOUT_MS = 2000

export const BlogPostActions = memo(function BlogPostActions() {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPY_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = useCallback(async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
    }
  }, [url])

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={handleCopy}
        type="button"
        aria-label={copied ? 'Link copiado' : 'Copiar link do artigo'}
        aria-live="polite"
        disabled={!url}
        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-2 text-xs font-medium text-zinc-600 ring-1 ring-zinc-900/5 transition-colors hover:bg-zinc-200 hover:text-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
      >
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? 'copiado!' : 'copiar link'}
      </button>
    </div>
  )
})
