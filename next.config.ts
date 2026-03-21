import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/cash-offer', destination: '/property-information', permanent: true },
      { source: '/get-offer', destination: '/property-information', permanent: true },
      { source: '/sell-house-fast', destination: '/', permanent: true },
      { source: '/sell-my-house', destination: '/', permanent: true },
      { source: '/virginia-cash-buyers', destination: '/', permanent: true },
      { source: '/cash-buyers-virginia', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
