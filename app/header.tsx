'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'

const AVATAR_CONFIG = {
  src: '/src/avatar.webp',
  alt: 'avatar do thom',
  size: 36,
} as const

const SITE_INFO = {
  name: 'thom ★',
  tagline: '"In a world without life and death, people who don\'t know when to give up are unstoppable."',
} as const

const Avatar = memo(function Avatar() {
  return (
    <Image
      src={AVATAR_CONFIG.src}
      alt={AVATAR_CONFIG.alt}
      width={AVATAR_CONFIG.size}
      height={AVATAR_CONFIG.size}
      className="rounded-full opacity-90"
      priority
      quality={90}
      sizes="36px"
    />
  )
})

const SiteIdentity = memo(function SiteIdentity() {
  return (
    <div className="leading-tight">
      <Link
        href="/"
        className="block text-lg font-medium text-black transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:text-white"
        aria-label="Ir para a página inicial"
      >
        {SITE_INFO.name}
      </Link>
      <TextEffect
        as="p"
        preset="fade"
        per="char"
        delay={0.4}
        className="text-sm text-zinc-600 dark:text-zinc-500"
      >
        {SITE_INFO.tagline}
      </TextEffect>
    </div>
  )
})

export const Header = memo(function Header() {
  return (
    <header
      role="banner"
      className="mb-12 rounded-full border border-zinc-200/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/70"
    >
      <div className="flex items-center gap-3">
        <Avatar />
        <SiteIdentity />
      </div>
    </header>
  )
})
