'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { EMAIL } from '@/app/data'

interface ThemeOption {
  label: string
  id: 'light' | 'dark' | 'system'
  icon: React.ReactElement
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

const ThemeSwitch = memo(function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = useCallback(
    (newTheme: string | null) => {
      if (newTheme) setTheme(newTheme)
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
          duration: 0.15,
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

export const Footer = memo(function Footer() {
  return (
    <footer
      className="mt-16 rounded-2xl border border-zinc-200/60 bg-zinc-50/70 px-5 py-5 backdrop-blur-sm transition-colors dark:border-zinc-800/60 dark:bg-zinc-900/50"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {/* Contact Section */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            entre em contato comigo
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            aria-label={`Enviar email para ${EMAIL}`}
          >
            <Icon
              icon="ph:paper-plane-tilt-duotone"
              className="h-4 w-4"
              aria-hidden="true"
            />
            {EMAIL}
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-200/60 dark:bg-zinc-800/60" />

        {/* Footer Info */}
        <div className="flex flex-col items-center gap-3 text-xs sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-0.5 text-zinc-500 sm:items-start dark:text-zinc-500">
            <span>{CURRENT_YEAR}, thom.</span>
            <span className="text-zinc-400 dark:text-zinc-600">
              template{' '}
              <a
                href="https://github.com/ibelick/nim"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
              >
                nim
              </a>
            </span>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
})
