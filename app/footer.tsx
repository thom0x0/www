'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { Magnetic } from '@/components/ui/magnetic'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'

// ============================================================================
// Constants
// ============================================================================

interface ThemeOption {
  label: string
  id: 'light' | 'dark' | 'system'
  icon: JSX.Element
}

const THEMES_OPTIONS: readonly ThemeOption[] = [
  {
    label: 'Claro',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Escuro',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Sistema',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" aria-hidden="true" />,
  },
] as const

const CURRENT_YEAR = new Date().getFullYear()

// ============================================================================
// Theme Switch Component
// ============================================================================

const ThemeSwitch = memo(function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      setTheme(newTheme)
    },
    [setTheme],
  )

  if (!mounted) {
    return (
      <div
        className="h-7 w-[84px] animate-pulse rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80"
        aria-hidden="true"
      >
        <span className="sr-only">Carregando seletor de tema</span>
      </div>
    )
  }

  return (
    <div role="radiogroup" aria-label="Seletor de tema">
      <AnimatedBackground
        className="pointer-events-none rounded-lg bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-800/80"
        defaultValue={theme}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={handleThemeChange}
      >
        {THEMES_OPTIONS.map((themeOption) => {
          const isActive = theme === themeOption.id

          return (
            <button
              key={themeOption.id}
              type="button"
              role="radio"
              aria-label={`Mudar para tema ${themeOption.label.toLowerCase()}`}
              aria-checked={isActive}
              data-id={themeOption.id}
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors outline-none hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 aria-checked:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 dark:focus-visible:ring-zinc-600 dark:aria-checked:text-zinc-100"
            >
              {themeOption.icon}
              {isActive && <span className="sr-only">(selecionado)</span>}
            </button>
          )
        })}
      </AnimatedBackground>
    </div>
  )
})

// ============================================================================
// Social Link Component
// ============================================================================

interface SocialLinkProps {
  href: string
  label: string
  icon?: string
}

const SocialLink = memo(function SocialLink({
  href,
  label,
  icon,
}: SocialLinkProps) {
  return (
    <Magnetic intensity={0.2} springOptions={{ bounce: 0 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition-all outline-none hover:scale-105 hover:bg-zinc-900 hover:text-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 active:scale-95 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        aria-label={`Visitar ${label}`}
      >
        {icon && (
          <Icon
            icon={icon}
            className="h-4 w-4 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
        )}
        <span>{label}</span>
      </a>
    </Magnetic>
  )
})

// ============================================================================
// Contact Section Component
// ============================================================================

const ContactSection = memo(function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="flex w-full flex-col items-center gap-5"
    >
      <h2
        id="contact-heading"
        className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
      >
        vamos conversar...
      </h2>

      {/* Email CTA */}
      <a
        href={`mailto:${EMAIL}`}
        className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        aria-label={`Enviar email para ${EMAIL}`}
      >
        <Icon icon="ph:paper-plane-tilt-duotone" className="h-4 w-4" />
        {EMAIL}
      </a>

      {/* Social links */}
      <nav aria-label="Redes sociais">
        <ul className="flex items-center gap-4" role="list">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <Magnetic intensity={0.2} springOptions={{ bounce: 0 }}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all hover:scale-110 hover:bg-zinc-200 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                >
                  <Icon icon={link.icon} className="h-5 w-5" />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
})

// ============================================================================
// Copyright Section Component
// ============================================================================

const CopyrightSection = memo(function CopyrightSection() {
  return (
    <div className="flex w-full flex-col items-center gap-4 border-t border-zinc-200/60 pt-4 sm:flex-row sm:justify-between dark:border-zinc-800/60">
      <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500">
        <TextLoop interval={3000}>
          <span>© {CURRENT_YEAR}, thom.</span>
          <span>feito com carinho.</span>
          <span>obrigado pela visita!</span>
        </TextLoop>
      </div>

      <ThemeSwitch />
    </div>
  )
})

// ============================================================================
// Footer Component
// ============================================================================

export const Footer = memo(function Footer() {
  return (
    <footer
      className="mt-24 rounded-3xl border border-zinc-200/60 bg-zinc-50/70 px-6 py-8 text-sm text-zinc-600 backdrop-blur-sm transition-colors dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:text-zinc-400"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <ContactSection />
        <CopyrightSection />
      </div>
    </footer>
  )
})
