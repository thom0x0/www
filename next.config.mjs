import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/src/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react', 'motion/react', '@portabletext/react'],
  },
}

export default withMDX(nextConfig)
