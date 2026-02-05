import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '../header'
import { Footer } from '../footer'

interface SiteLayoutProps {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SpeedInsights />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
        storageKey="thom-theme"
        enableColorScheme
      >
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:bg-zinc-100 dark:focus-visible:text-zinc-900"
          >
            Saltar para o conteúdo principal
          </a>

          <div className="mx-auto w-full max-w-screen-sm flex-1 px-4 pt-14 pb-16 sm:px-6">
            <Header />

            <main id="main-content" className="outline-none" tabIndex={-1}>
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}
