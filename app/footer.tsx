'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeOption {
  label: string
  id: string
  icon: JSX.Element
}

const THEMES_OPTIONS: ThemeOption[] = [
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
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="h-7 w-[84px] rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80"
        aria-hidden="true"
      />
    )
  }

  return (
    <div role="group" aria-label="Seletor de tema">
      <AnimatedBackground
        className="pointer-events-none rounded-lg bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-800/80"
        defaultValue={theme}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={(id) => setTheme(id as string)}
      >
        {THEMES_OPTIONS.map((themeOption) => (
          <button
            key={themeOption.id}
            type="button"
            aria-label={`Mudar para tema ${themeOption.label.toLowerCase()}`}
            aria-pressed={theme === themeOption.id}
            data-id={themeOption.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-700 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none data-[checked=true]:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 dark:focus:ring-zinc-600 dark:data-[checked=true]:text-zinc-100"
          >
            {themeOption.icon}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="mt-20 border-t border-zinc-200/60 py-8 dark:border-zinc-800/60"
      role="contentinfo"
    >
      <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-1">
          <TextLoop interval={3000}>
            <span>© {currentYear}, thom.</span>
            <span>
              Feito com{' '}
              <a
                href="https://github.com/ibelick/nim"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-500 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none dark:decoration-zinc-600 dark:hover:text-zinc-100 dark:hover:decoration-zinc-400"
              >
                nim
              </a>
            </span>
          </TextLoop>
        </div>

        <ThemeSwitch />
      </div>
    </footer>
  )
}
