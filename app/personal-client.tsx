'use client'

import { memo } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { AnimatedBackground } from '@/components/ui/animated-background'

type BlogPost = {
  uid: string
  title: string
  description: string
  link: string
}

interface PersonalClientProps {
  posts: BlogPost[]
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
  { icon: 'ph:scales-duotone', text: 'política' },
  { icon: 'ph:code-duotone', text: 'tecnologia' },
] as const

const ACTIVITIES = [
  { icon: 'ph:book-duotone', text: 'lendo' },
  { icon: 'ph:television-duotone', text: 'assistindo animes' },
  { icon: 'ph:game-controller-duotone', text: 'jogando' },
  { icon: 'ph:chats-circle-duotone', text: 'conversando com amigos' },
] as const

const BannerImage = memo(function BannerImage() {
  return (
    <motion.div variants={VARIANTS.section} className="relative mx-auto w-full max-w-3xl space-y-6">
      <div className="group relative aspect-[16/7] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
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
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]" />
      </div>
    </motion.div>
  )
})

const IntroSection = memo(function IntroSection() {
  return (
    <motion.section variants={VARIANTS.section} className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          olá, sou o thom
        </h1>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          tenho 15 anos e gosto de pensar sobre{' '}
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            história, política e tecnologia
          </span>
          . passo o tempo lendo, assistindo animes, jogando e conversando com amigos.
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">interesses</h2>
        <div className="flex flex-wrap gap-3">
          {INTERESTS.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
            >
              <Icon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">no tempo livre</h2>
        <div className="flex flex-wrap gap-3">
          {ACTIVITIES.map((item) => (
            <span key={item.text} className="inline-flex items-center gap-2 rounded-full text-sm text-zinc-500 dark:text-zinc-400">
              <Icon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
})

const BlogSection = memo(function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.section variants={VARIANTS.section} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <Icon icon="ph:newspaper-duotone" className="h-7 w-7 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
          blog
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          textos curtos sobre ideias, história, tecnologia e outras coisas que ficam rodando na minha cabeça.
        </p>
      </div>
      <AnimatedBackground
        enableHover
        className="rounded-2xl bg-zinc-100/60 p-1.5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-900/60 dark:ring-white/10"
        transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
      >
        <ul className="flex flex-col divide-y divide-zinc-200/60 dark:divide-zinc-800/60" role="list">
          {posts.map((post) => (
            <li key={post.uid}>
              <Link
                href={post.link}
                className="group block rounded-xl px-5 py-4 transition-colors outline-none hover:bg-zinc-200/50 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:hover:bg-zinc-800/50 dark:focus-visible:ring-zinc-600"
                prefetch={false}
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{post.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </AnimatedBackground>
    </motion.section>
  )
})

export default function PersonalClient({ posts }: PersonalClientProps) {
  return (
    <motion.div className="space-y-16 py-8" variants={VARIANTS.container} initial="hidden" animate="visible">
      <BannerImage />
      <IntroSection />
      <BlogSection posts={posts} />
    </motion.div>
  )
}
