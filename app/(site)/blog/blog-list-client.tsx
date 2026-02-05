'use client'

import { memo, useCallback, useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { SearchIcon, XIcon, TagIcon, CalendarIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { BlogPostCard, Tag } from '@/lib/sanity/types'

interface BlogListClientProps {
  posts: BlogPostCard[]
  tags: Tag[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const SearchBar = memo(function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="pesquisar artigos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200/70 bg-white py-2.5 pr-10 pl-10 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800/70 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
        aria-label="Pesquisar artigos"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-0.5 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          aria-label="Limpar pesquisa"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})

const TagFilter = memo(function TagFilter({
  tags,
  activeTag,
  onTagChange,
}: {
  tags: Tag[]
  activeTag: string | null
  onTagChange: (slug: string | null) => void
}) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tag">
      <button
        onClick={() => onTagChange(null)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          activeTag === null
            ? 'bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
            : 'bg-zinc-100 text-zinc-600 ring-1 ring-zinc-900/5 hover:bg-zinc-200 hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'
        }`}
        aria-pressed={activeTag === null}
      >
        todos
      </button>
      {tags.map((tag) => (
        <button
          key={tag._id}
          onClick={() => onTagChange(activeTag === tag.slug ? null : tag.slug)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTag === tag.slug
              ? 'bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-600 ring-1 ring-zinc-900/5 hover:bg-zinc-200 hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'
          }`}
          aria-pressed={activeTag === tag.slug}
        >
          <TagIcon className="h-3 w-3" aria-hidden="true" />
          {tag.title}
        </button>
      ))}
    </div>
  )
})

const PostCard = memo(function PostCard({ post }: { post: BlogPostCard }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-zinc-200/60 bg-white/50 px-5 py-4 shadow-sm transition-all hover:border-zinc-300/70 hover:bg-zinc-50/80 hover:shadow-md focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-zinc-700/70 dark:hover:bg-zinc-800/50"
        prefetch={false}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
              {post.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <CalendarIcon className="h-3 w-3" aria-hidden="true" />
              {formatDate(post.publishedAt)}
            </span>
            {post.author?.name && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                por {post.author.name}
              </span>
            )}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.li>
  )
})

const EmptyState = memo(function EmptyState({
  hasSearch,
  hasTag,
}: {
  hasSearch: boolean
  hasTag: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 rounded-full border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <SearchIcon
          className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
          aria-hidden="true"
        />
      </div>
      <p className="mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {hasSearch || hasTag
          ? 'nenhum artigo encontrado'
          : 'nenhum artigo publicado ainda'}
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {hasSearch || hasTag
          ? 'tente uma pesquisa diferente ou remova os filtros.'
          : 'volte em breve para novos conteudos.'}
      </p>
    </motion.div>
  )
})

export function BlogListClient({ posts, tags }: BlogListClientProps) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSearchChange = useCallback(
    (value: string) => {
      startTransition(() => {
        setSearch(value)
      })
    },
    [startTransition]
  )

  const handleTagChange = useCallback(
    (slug: string | null) => {
      startTransition(() => {
        setActiveTag(slug)
      })
    },
    [startTransition]
  )

  const filteredPosts = useMemo(() => {
    let result = posts

    if (search.trim()) {
      const query = search.toLowerCase().trim()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      )
    }

    if (activeTag) {
      result = result.filter((post) =>
        post.tags?.some((tag) => tag.slug === activeTag)
      )
    }

    return result
  }, [posts, search, activeTag])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SearchBar value={search} onChange={handleSearchChange} />
        <TagFilter
          tags={tags}
          activeTag={activeTag}
          onTagChange={handleTagChange}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <ul className="space-y-3" role="list">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <EmptyState hasSearch={!!search.trim()} hasTag={!!activeTag} />
      )}

      {filteredPosts.length > 0 && (
        <p
          className="text-center text-xs text-zinc-400 dark:text-zinc-500"
          aria-live="polite"
        >
          {filteredPosts.length}{' '}
          {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
          {(search || activeTag) && ' encontrados'}
        </p>
      )}
    </div>
  )
}
