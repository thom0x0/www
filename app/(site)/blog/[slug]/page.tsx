import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, TagIcon, UserIcon } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/sanity/queries'
import { portableTextComponents } from './portable-text-components'
import { BlogPostActions } from './blog-post-actions'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post nao encontrado' }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const tagIds = post.tags?.map((t) => t._id) || []
  const relatedPosts = tagIds.length > 0 ? await getRelatedPosts(post._id, tagIds) : []

  return (
    <div className="py-6">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        aria-label="Voltar para o blog"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
        voltar ao blog
      </Link>

      {/* Article Header */}
      <header className="mb-10 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
          {post.title}
        </h1>

        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </span>

          {post.author?.name && (
            <span className="inline-flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {post.author.name}
            </span>
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag._id}
                href={`/blog?tag=${tag.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                <TagIcon className="h-2.5 w-2.5" aria-hidden="true" />
                {tag.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="h-px bg-zinc-200/60 dark:bg-zinc-800/60" />

      {/* Article Body */}
      <article className="mt-8 max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </article>

      <div className="mt-12 h-px bg-zinc-200/60 dark:bg-zinc-800/60" />

      {/* Actions */}
      <BlogPostActions />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12" aria-label="Artigos relacionados">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            artigos relacionados
          </h2>
          <ul className="space-y-3" role="list">
            {relatedPosts.map((related) => (
              <li key={related._id}>
                <Link
                  href={`/blog/${related.slug}`}
                  className="group block rounded-xl border border-zinc-200/60 bg-white/50 px-4 py-3 transition-all hover:border-zinc-300/70 hover:bg-zinc-50/80 hover:shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-zinc-700/70 dark:hover:bg-zinc-800/50"
                  prefetch={false}
                >
                  <h3 className="text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {related.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
