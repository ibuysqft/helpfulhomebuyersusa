import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { MobileCTABar } from '@/components/layout/mobile-cta-bar'
import { DesktopStickyCTA } from '@/components/layout/desktop-sticky-cta'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Sell My House Fast in Virginia`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'We buy houses for cash across Virginia. Fair offer in 24 hours. Close in 7 days. No repairs, no fees, no agents.',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  description: 'We buy houses for cash in Virginia. Fair cash offer in 24 hours.',
  areaServed: { '@type': 'State', name: 'Virginia' },
  '@id': siteConfig.url,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <MobileCTABar />
        <DesktopStickyCTA />
      </body>
    </html>
  )
}
