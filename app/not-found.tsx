'use client'

import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'

const REDIRECT_DELAY = 6767

export default function NotFound() {
  const handleRedirect = useCallback(() => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }, [])

  useEffect(() => {
    const timer = setTimeout(handleRedirect, REDIRECT_DELAY)
    return () => clearTimeout(timer)
  }, [handleRedirect])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <Icon
              icon="ph:warning-circle-duotone"
              className="h-7 w-7 text-zinc-500 dark:text-zinc-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mb-2 text-xs tracking-widest text-zinc-500 uppercase">
          erro 404
        </p>

        <h1 className="mb-3 text-4xl font-light tracking-tight text-balance">
          pagina nao encontrada
        </h1>

        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          esse caminho nao existe. :(
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 px-5 py-2 text-sm transition-colors hover:border-zinc-300 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Icon icon="ph:arrow-left" className="h-4 w-4" aria-hidden="true" />
            voltar para a home
          </Link>
        </div>
      </div>
    </div>
  )
}
