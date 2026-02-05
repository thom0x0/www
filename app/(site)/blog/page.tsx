import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/sanity/queries'
import { BlogListClient } from './blog-list-client'

export const metadata: Metadata = {
  title: 'blog',
  description:
    'textos sobre historia, politica, tecnologia e ideias que ficam rodando na minha cabeca.',
}

async function BlogContent() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()])

  return <BlogListClient posts={posts} tags={tags} />
}

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800/60" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800/60"
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800/60"
          />
        ))}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="space-y-8 py-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          blog
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          textos sobre historia, politica, tecnologia e outras coisas que ficam
          rodando na minha cabeca...
        </p>
      </div>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent />
      </Suspense>
    </div>
  )
}
