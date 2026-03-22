import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { MobileCTABar } from '@/components/layout/mobile-cta-bar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <MobileCTABar />
      </body>
    </html>
  )
}
