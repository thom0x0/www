'use client'

import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="mb-10 flex items-center gap-3">
      <Image
        src="/src/avatar.webp"
        alt="avatar"
        width={36}
        height={36}
        className="rounded-full opacity-90"
        priority
      />

      <div>
        <Link
          href="/"
          className="block text-lg font-medium text-black dark:text-white"
        >
          thom ★
        </Link>

        <TextEffect
          as="p"
          preset="fade"
          per="char"
          delay={0.4}
          className="text-sm text-zinc-600 dark:text-zinc-500"
        >
          In a world without life and death, people who don't know when to give
          up are unstoppable.
        </TextEffect>
      </div>
    </header>
  )
}
