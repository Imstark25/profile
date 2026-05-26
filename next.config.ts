import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Compress responses with gzip — critical for poor network
  compress: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Aggressive cache headers for static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Enable browser caching for all pages
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Long-term cache for hashed static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets (fonts, images)
        source: '/(.*)\\.(woff2|woff|ttf|png|jpg|jpeg|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Turbopack is already used in dev — no extra config needed
  // Tree-shake unused framer-motion features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

export default nextConfig
