'use client'

import { memo, type ReactNode } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { AnimatedBackground } from '@/components/ui/animated-background'

// ============================================================================
// Types
// ============================================================================

type BlogPost = {
  uid: string
  title: string
  description: string
  link: string
}

interface PersonalClientProps {
  posts: BlogPost[]
}

// ============================================================================
// Animation Variants
// ============================================================================

const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  section: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  badge: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
} as const

// ============================================================================
// Banner Section
// ============================================================================

const BannerImage = memo(function BannerImage() {
  return (
    <motion.div
      variants={VARIANTS.section}
      className="relative mx-auto w-full max-w-3xl space-y-6"
    >
      {/* Banner Image with Enhanced Effects */}
      <div className="group relative aspect-[16/7] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
        <img
          src="/src/banner.webp"
          alt="Banner do website"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="eager"
        />

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]" />
      </div>
    </motion.div>
  )
})

// ============================================================================
// Introduction Section - REDESIGNED
// ============================================================================

const IntroSection = memo(function IntroSection() {
  const interests = [
    { icon: 'ph:book-open-duotone', text: 'história' },
    { icon: 'ph:scales-duotone', text: 'política' },
    { icon: 'ph:code-duotone', text: 'tecnologia' },
  ]

  const activities = [
    { icon: 'ph:book-duotone', text: 'lendo' },
    { icon: 'ph:television-duotone', text: 'assistindo animes' },
    { icon: 'ph:game-controller-duotone', text: 'jogando' },
    { icon: 'ph:chats-circle-duotone', text: 'conversando com amigos' },
  ]

  return (
    <motion.section
      variants={VARIANTS.section}
      className="mx-auto max-w-2xl space-y-8"
    >
      {/* texto principal */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          olá, sou o thom
        </h1>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          tenho 15 anos e gosto de pensar sobre{' '}
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            história, política e tecnologia
          </span>
          . passo o tempo lendo, assistindo animes, jogando e conversando com
          amigos.
        </p>
      </div>

      {/* interesses */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
          interesses
        </h2>

        <div className="flex flex-wrap gap-3">
          {interests.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
            >
              <Icon icon={item.icon} className="h-4 w-4" />
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* atividades */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
          no tempo livre
        </h2>

        <div className="flex flex-wrap gap-3">
          {activities.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full text-sm text-zinc-500 dark:text-zinc-400"
            >
              <Icon icon={item.icon} className="h-4 w-4" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
})

// ============================================================================
// Blog Section - Enhanced
// ============================================================================

const BlogSection = memo(function BlogSection({
  posts,
}: {
  posts: BlogPost[]
}) {
  return (
    <motion.section
      variants={VARIANTS.section}
      className="mx-auto max-w-2xl space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <Icon
            icon="ph:newspaper-duotone"
            className="h-7 w-7 text-zinc-500 dark:text-zinc-400"
          />
          blog
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          textos curtos sobre ideias, história, tecnologia e outras coisas que
          ficam rodando na minha cabeça.
        </p>
      </div>

      {/* Posts */}
      <AnimatedBackground
        enableHover
        className="rounded-2xl bg-zinc-100/60 p-1.5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-900/60 dark:ring-white/10"
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      >
        <ul
          className="flex flex-col divide-y divide-zinc-200/60 dark:divide-zinc-800/60"
          role="list"
        >
          {posts.map((post) => (
            <li key={post.uid}>
              <Link
                href={post.link}
                className="group block rounded-xl px-5 py-4 transition-colors outline-none hover:bg-zinc-200/50 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:hover:bg-zinc-800/50 dark:focus-visible:ring-zinc-600"
              >
                <div className="space-y-1">
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
    </motion.section>
  )
})

// ============================================================================
// Main Component
// ============================================================================

export default function PersonalClient({ posts }: PersonalClientProps) {
  return (
    <motion.div
      className="space-y-16 py-8"
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
