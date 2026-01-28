'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Icon } from '@iconify/react'

export default function NotFound() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }, 6767)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border border-zinc-800 bg-zinc-900 p-4">
            <Icon
              icon="ph:warning-circle-duotone"
              className="h-7 w-7 text-zinc-400"
            />
          </div>
        </div>

        <p className="mb-2 text-xs tracking-widest text-zinc-500 uppercase">
          erro 404
        </p>

        <h1 className="mb-3 text-4xl font-light tracking-tight">
          página não encontrada
        </h1>

        <p className="mb-6 text-sm leading-relaxed text-zinc-400">
          esse caminho não existe. :(
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-5 py-2 text-sm transition hover:border-zinc-700 hover:bg-zinc-800"
          >
            <Icon icon="ph:arrow-left" className="h-4 w-4" />
            voltar para a home
          </Link>
        </div>
      </div>
    </div>
  )
}
