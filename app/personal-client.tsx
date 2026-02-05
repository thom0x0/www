'use client'

import { memo } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Magnetic } from '@/components/ui/magnetic'
import { SOCIAL_LINKS } from '@/app/data'
import type { BlogPostCard } from '@/lib/sanity/types'

interface PersonalClientProps {
  posts: BlogPostCard[]
}

const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  },
  section: {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
} as const

const INTERESTS = [
  { icon: 'ph:book-open-duotone', text: 'história' },
  { icon: 'game-icons:japan', text: 'anime' },
  { icon: 'ph:scales-duotone', text: 'política' },
  { icon: 'ph:code-duotone', text: 'tecnologia' },
] as const

const ACTIVITIES = [
  { icon: 'ph:book-duotone', text: 'lendo' },
  { icon: 'basil:music-solid', text: 'ouvindo música' },
  { icon: 'ph:television-duotone', text: 'assistindo animes' },
  { icon: 'ph:game-controller-duotone', text: 'jogando' },
  { icon: 'ph:chats-circle-duotone', text: 'conversando com amigos' },
] as const

const BannerImage = memo(function BannerImage() {
  return (
    <motion.div
      variants={VARIANTS.section}
      className="relative mx-auto w-full max-w-3xl"
    >
      <div className="group relative aspect-[16/7] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
        <Image
          src="/src/banner.webp"
          alt="Banner do website"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 768px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority
          quality={85}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]" />
      </div>
    </motion.div>
  )
})

const IntroSection = memo(function IntroSection() {
  return (
    <motion.section
      variants={VARIANTS.section}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="space-y-2.5">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          👋 olá, sou o thom
        </h1>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          tenho 15 anos e moro em portugal, seja bem-vindo ao meu cantinho na
          internet! aqui compartilho meus pensamentos sobre história, política,
          tecnologia e outras coisas que me interessam.
        </p>
      </div>

      <div className="space-y-2.5">
        <h2 className="text-[0.6875rem] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          meus interesses
        </h2>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
            >
              <Icon
                icon={item.icon}
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h2 className="text-[0.6875rem] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          no meu tempo livre...
        </h2>
        <div className="flex flex-wrap gap-3">
          {ACTIVITIES.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
            >
              <Icon
                icon={item.icon}
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <nav aria-label="Redes sociais" className="space-y-2.5 pt-1">
        <h2 className="text-[0.6875rem] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          minhas redes sociais
        </h2>
        <ul className="flex items-center gap-2.5" role="list">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <Magnetic intensity={0.15} springOptions={{ bounce: 0 }}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all hover:scale-110 hover:bg-zinc-200 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                >
                  <Icon
                    icon={link.icon}
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>
    </motion.section>
  )
})

const BlogSection = memo(function BlogSection({
  posts,
}: {
  posts: BlogPostCard[]
}) {
  return (
    <motion.section
      variants={VARIANTS.section}
      className="mx-auto max-w-2xl space-y-4"
    >
      <div className="space-y-1.5">
        <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <Icon
            icon="ph:newspaper-duotone"
            className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
            aria-hidden="true"
          />
          blog
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          o meu espaço para compartilhar meus pensamentos...
        </p>
      </div>
      {posts.length > 0 ? (
        <AnimatedBackground
          enableHover
          className="rounded-2xl bg-zinc-100/60 p-1 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-900/60 dark:ring-white/10"
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
        >
          <ul
            className="flex flex-col divide-y divide-zinc-200/60 dark:divide-zinc-800/60"
            role="list"
          >
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl px-4 py-3 transition-colors outline-none hover:bg-zinc-200/50 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:hover:bg-zinc-800/50 dark:focus-visible:ring-zinc-600"
                  prefetch={false}
                >
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedBackground>
      ) : (
        <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/50 px-5 py-8 text-center dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            poxa, ainda não tem artigo aqui... mas já já vai ter, fica de olho!
            👀
          </p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ver todos os artigos
          </Link>
        </div>
      )}
    </motion.section>
  )
})

export default function PersonalClient({ posts }: PersonalClientProps) {
  return (
    <motion.div
      className="space-y-12 py-6"
      variants={VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      <BannerImage />
      <IntroSection />
      <BlogSection posts={posts} />
    </motion.div>
  )
}
