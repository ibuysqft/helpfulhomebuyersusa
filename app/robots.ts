import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin', '/api/', '/thank-you', '/property-information',
          '/inherited', '/damaged', '/tax-lien', '/senior-transition', '/probate',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
