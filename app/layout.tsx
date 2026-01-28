import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://thom.lol'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'thom ★',
    template: '%s · thom',
  },
  description:
    'Website pessoal de Thom, estudante em Portugal interessado em história, política e tecnologia.',
  keywords: [
    'thom',
    'portugal',
    'história',
    'política',
    'tecnologia',
    'blog pessoal',
  ],
  authors: [{ name: 'thom' }],
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://thom.lol',
    siteName: 'thom ★',
    title: 'thom ★',
    description:
      'Website pessoal de Thom, estudante em Portugal interessado em história, política e tecnologia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'thom ★',
    description:
      'Website pessoal de Thom, estudante em Portugal interessado em história, política e tecnologia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-screen bg-white font-sans tracking-tight text-zinc-900 antialiased transition-colors dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="thom-theme"
        >
          <div className="flex min-h-screen flex-col">
            {/* skip link (acessibilidade) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-zinc-400 focus:outline-none dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
            >
              Saltar para o conteúdo principal
            </a>

            <div className="mx-auto w-full max-w-screen-sm flex-1 px-4 pt-14 pb-16 sm:px-6">
              <Header />

              <main
                id="main-content"
                className="focus:outline-none"
                tabIndex={-1}
              >
                {children}
              </main>

              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
