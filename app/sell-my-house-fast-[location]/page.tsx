import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { LeadForm } from '@/components/lead-form'
import { FaqSection } from '@/components/faq-section'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TrustBar } from '@/components/trust-bar'
import { HowItWorks } from '@/components/how-it-works'
import { siteConfig } from '@/config/site'
import { getHomepageFaqs } from '@/data/faqs'
import { getStateConfig } from '@/lib/state-context'
import { getCitiesForState } from '@/lib/state-data'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: Promise<{ location: string }> }

const stateConfig = getStateConfig()
const cities = getCitiesForState(stateConfig.slug)

export async function generateStaticParams() {
  return cities.map(c => ({
    location: `${c.slug}-${stateConfig.abbr.toLowerCase()}`,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  if (!location) return {}
  // Parse city slug from location (e.g. "houston-tx" → citySlug="houston", abbr="tx")
  const parts = location.split('-')
  const abbr = parts[parts.length - 1]
  const citySlug = parts.slice(0, -1).join('-')
  const city = cities.find(c => c.slug === citySlug)
  if (!city) return {}
  return {
    title: `Sell My House Fast ${city.name} ${abbr.toUpperCase()} | Cash Offer in 24 Hours`,
    description: `We buy houses for cash in ${city.name}, ${city.county}, ${stateConfig.name}. No repairs, no fees, close in 7 days. Get your fair cash offer today.`,
    alternates: { canonical: `${siteConfig.url}/sell-my-house-fast-${location}` },
  }
}

export default async function CityPage({ params }: Props) {
  const { location } = await params
  if (!location) notFound()
  const parts = location.split('-')
  const citySlug = parts.slice(0, -1).join('-')
  const city = cities.find(c => c.slug === citySlug)
  if (!city) notFound()

  const homepageFaqs = getHomepageFaqs(stateConfig)

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: [city.name, city.county],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.slice(0, 5).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  const nearbyCount = 6
  const cityIndex = cities.findIndex(c => c.slug === citySlug)
  const nearbyCities = [
    ...cities.slice(Math.max(0, cityIndex - 3), cityIndex),
    ...cities.slice(cityIndex + 1, cityIndex + nearbyCount),
  ].slice(0, nearbyCount)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Sell My House Fast in{' '}
                <span className="text-amber-400">{city.name}, {stateConfig.abbr}</span>
              </h1>
              <p className="text-xl text-slate-300">
                We buy houses for cash in {city.name}, {city.county}. No repairs needed,
                no agent commissions, close in as little as 7 days.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  `Serving all of ${city.county}`,
                  'Cash offer within 24 hours',
                  'Close in 7 days or on your schedule',
                  'Buy as-is — no repairs required',
                  'We pay all closing costs',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} aria-hidden={true} className="text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <LeadForm city={city.name} />
          </div>
        </section>

        <TrustBar />
        <HowItWorks />
        <FaqSection faqs={homepageFaqs} title={`FAQ: Selling Your ${city.name} Home for Cash`} />

        {nearbyCities.length > 0 && (
          <section className="py-12 px-4 bg-slate-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                We Also Buy Houses Near {city.name}
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {nearbyCities.map(c => (
                  <Link
                    key={c.slug}
                    href={`/sell-my-house-fast-${c.slug}-${stateConfig.abbr.toLowerCase()}`}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {c.name}, {stateConfig.abbr} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Get Your {city.name} Cash Offer Today
          </h2>
          <p className="text-slate-800 mb-6">No obligation. Response within 24 hours.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/property-information"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Get My Cash Offer
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
