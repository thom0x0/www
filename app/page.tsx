'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Magnetic } from '@/components/ui/magnetic'
import { BLOG_POSTS, EMAIL, SOCIAL_LINKS } from './data'
import type { ReactNode } from 'react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

interface MagneticSocialLinkProps {
  children: ReactNode
  link: string
}

function MagneticSocialLink({ children, link }: MagneticSocialLinkProps) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.25}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        aria-label={`Visitar ${link}`}
      >
        {children}
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.div
      className="space-y-20 py-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Intro */}
      <motion.section
        variants={VARIANTS_SECTION}
        className="space-y-6"
        aria-labelledby="intro-heading"
      >
        <h2 id="intro-heading" className="sr-only">
          Sobre mim
        </h2>

        <p className="max-w-xl text-base leading-relaxed text-pretty text-zinc-600 sm:text-lg dark:text-zinc-400">
          Sou um estudante de 15 anos, interessado em{' '}
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            história, política e tecnologia
          </span>
          , que passa o tempo lendo, assistindo animes, jogando e conversando
          com amigos.
        </p>

        <hr className="w-24 border-t-2 border-zinc-200 dark:border-zinc-800" />
      </motion.section>

      {/* Blog */}
      <motion.section
        variants={VARIANTS_SECTION}
        className="space-y-4"
        aria-labelledby="blog-heading"
      >
        <h2
          id="blog-heading"
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Blog
        </h2>

        <AnimatedBackground
          enableHover
          className="rounded-xl bg-zinc-100/70 p-1 backdrop-blur-sm dark:bg-zinc-900/70"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.25,
          }}
        >
          <ul className="flex flex-col divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {BLOG_POSTS.map((post) => (
              <li key={post.uid}>
                <Link
                  href={post.link}
                  data-id={post.uid}
                  className="block rounded-lg px-4 py-3.5 transition-colors hover:bg-zinc-200/40 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none dark:hover:bg-zinc-800/40 dark:focus:ring-zinc-600"
                >
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedBackground>
      </motion.section>

      {/* Contato */}
      <motion.section
        variants={VARIANTS_SECTION}
        className="space-y-5"
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Contato
        </h2>

        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Pode falar comigo por email:{' '}
          <a
            className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100 dark:hover:decoration-zinc-400"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>
        </p>

        <nav aria-label="Redes sociais">
          <ul className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <MagneticSocialLink link={link.link}>
                  {link.label}
                </MagneticSocialLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.section>
    </motion.div>
  )
}
