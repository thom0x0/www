import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null

      const imageUrl = urlFor(value)
        .width(800)
        .quality(85)
        .auto('format')
        .url()

      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={value.alt || ''}
              width={800}
              height={450}
              className="w-full object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="rounded-t-lg border border-b-0 border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {value.filename}
            </div>
          )}
          <pre
            className={`overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900 ${value.filename ? 'rounded-t-none' : ''}`}
          >
            <code>{value.code}</code>
          </pre>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-base font-medium text-zinc-900 dark:text-zinc-100">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-zinc-600 dark:text-zinc-400">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-zinc-600 dark:text-zinc-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
}
