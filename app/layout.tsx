import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

const SITE_CONFIG = {
  name: 'thom ★',
  url: 'https://thom.lol',
  description:
    'bem-vindo ao meu espaço pessoal na internet. aqui partilho as minhas ideias sobre história, política, tecnologia e muito mais.',
  locale: 'pt_PT',
} as const

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: { canonical: '/' },
  title: {
    default: SITE_CONFIG.name,
    template: `%s · thom`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'thom',
    'portugal',
    'história',
    'política',
    'tecnologia',
    'blog pessoal',
  ],
  authors: [{ name: 'thom' }],
  creator: 'thom',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/src/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/src/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/src/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500', '600'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500'],
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={SITE_CONFIG.locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-screen bg-white font-sans tracking-tight text-zinc-900 antialiased transition-colors dark:bg-zinc-950 dark:text-zinc-100`}
      >
        {children}
      </body>
    </html>
  )
}
