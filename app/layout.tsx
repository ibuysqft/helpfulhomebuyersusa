import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import './globals.css'
import { siteConfig } from '@/config/site'
import { ratingsConfig } from '@/config/ratings'
import { MobileCTABar } from '@/components/layout/mobile-cta-bar'
import { DesktopStickyCTA } from '@/components/layout/desktop-sticky-cta'
import { LanguageProvider } from '@/contexts/language-context'
import { TrackingPixels } from '@/components/tracking-pixels'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'

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
    default: `${siteConfig.name} | Sell My House Fast in ${siteConfig.stateName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `We buy houses for cash across ${siteConfig.stateName}. Fair offer in 24 hours. Close in 7 days. No repairs, no fees, no agents.`,
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
  '@type': ['LocalBusiness', 'RealEstateAgent'],
  name: siteConfig.name,
  legalName: 'Paramount Legacy Properties LLC',
  telephone: siteConfig.phone,
  url: siteConfig.url,
  description: `We buy houses for cash in ${siteConfig.stateName}. Fair cash offer in 24 hours.`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10369 Democracy Ln',
    addressLocality: 'Fairfax',
    addressRegion: 'VA',
    postalCode: '22030',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'State', name: siteConfig.stateName },
  addressRegion: siteConfig.stateAbbr,
  '@id': siteConfig.url,
  priceRange: 'Free',
  sameAs: [
    'https://helpfulhomebuyersvirginia.com',
    'https://helpfulhomebuyerstexas.com',
    'https://helpfulhomebuyersflorida.com',
    'https://helpfulhomebuyersgeorgia.com',
    'https://helpfulhomebuyersohio.com',
    'https://helpfulhomebuyersnorthcarolina.com',
    'https://helpfulhomebuyerssouthcarolina.com',
    'https://helpfulhomebuyersillinois.com',
    'https://helpfulhomebuyersmichigan.com',
    'https://helpfulhomebuyersnewyork.com',
    'https://helpfulhomebuyersnewjersey.com',
    'https://helpfulhomebuyerscalifornia.com',
    'https://helpfulhomebuyersarizona.com',
    'https://helpfulhomebuyerscolorado.com',
    'https://helpfulhomebuyersconnecticut.com',
    'https://www.facebook.com/helpfulhomebuyersusa',
    'https://www.instagram.com/helpfulhomebuyersusa',
    'https://twitter.com/HelpfulHomeBuyers',
    'https://www.linkedin.com/company/helpful-home-buyers-usa',
    'https://www.youtube.com/@HelpfulHomeBuyersUSA',
    'https://www.pinterest.com/anchorofferchatgpt',
    'https://www.reddit.com/user/HelpfulHomeBuyersVA',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: ratingsConfig.ratingValue,
    reviewCount: ratingsConfig.reviewCount,
    bestRating: '5',
    worstRating: '1',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Helpful Home Buyers USA',
  url: 'https://helpfulhomebuyersusa.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://helpfulhomebuyersusa.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <LanguageProvider>
          {children}
          <MobileCTABar />
          <DesktopStickyCTA />
          <WhatsAppButton />
        </LanguageProvider>
        <TrackingPixels />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GHL_LOCATION_ID && (
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id={process.env.NEXT_PUBLIC_GHL_LOCATION_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
