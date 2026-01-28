import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // MDX
  // ============================================================================
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // ============================================================================
  // Otimização de Imagens
  // ============================================================================
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // ============================================================================
  // Build / Performance
  // ============================================================================
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  productionBrowserSourceMaps: false,

  // ============================================================================
  // Headers
  // ============================================================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/src/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ============================================================================
  // Experimental
  // ============================================================================
  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react', 'motion/react'],
  },

  async rewrites() {
    return []
  },

  async redirects() {
    return []
  },
}

export default withMDX(nextConfig)
