import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { getCitiesForState } from '@/lib/state-data'
import { LeadForm } from '@/components/lead-form'
import { FaqSection } from '@/components/faq-section'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TrustBar } from '@/components/trust-bar'
import { HowItWorks } from '@/components/how-it-works'
import { siteConfig } from '@/config/site'
import { ratingsConfig } from '@/config/ratings'
import { homepageFaqs } from '@/data/faqs'
import Link from 'next/link'
import type { Metadata } from 'next'

const STATE_ABBR = 'NY'
const STATE_SLUG = 'new-york'
const cities = getCitiesForState(STATE_SLUG)

interface Props { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  if (siteConfig.stateAbbr !== STATE_ABBR) return []
  return cities.map(c => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = cities.find(c => c.slug === citySlug)
  if (!city) return {}
  return {
    title: `Sell My House Fast ${city.name} NY | Cash Offer in 24 Hours`,
    description: `We buy houses for cash in ${city.name}, ${city.county}, New York. No repairs, no fees, close in 7 days. Get your fair cash offer today.`,
    alternates: { canonical: `${siteConfig.url}/sell-my-house-fast-${citySlug}-ny` },
  }
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = cities.find(c => c.slug === citySlug)
  if (!city) notFound()

  const stAbbr = siteConfig.stateAbbr
  const stName = siteConfig.stateName

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: [city.name, city.county],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingsConfig.ratingValue,
      reviewCount: ratingsConfig.reviewCount,
    },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: stName, item: `${siteConfig.url}/sell-my-house-fast-${STATE_SLUG}` },
      { '@type': 'ListItem', position: 3, name: `Sell My House Fast in ${city.name}` },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Sell Your House Fast for Cash in ${city.name}, ${stAbbr}`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Submit Your Property',
        text: `Fill out our short form with your ${city.name} address, phone number, and property condition. Takes less than 2 minutes.`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Receive Your Cash Offer',
        text: `We review your ${city.name} property and present a fair no-obligation cash offer within 24 hours.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Close on Your Timeline',
        text: `Pick your closing date in ${city.name} — as fast as 7 days or whenever works best for you. We pay all closing costs.`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sell My House Fast in <span className="text-amber-400">{city.name}, {stAbbr}</span>
              </h1>
              <p className="text-xl text-slate-300">
                We buy houses for cash in {city.name}, {city.county}, {stName}.
                Fair offer in 24 hours. Close in as little as 7 days. No repairs required.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  `Serving all of ${city.county}`,
                  'Buy as-is — any condition',
                  'We pay all closing costs',
                  'No agents, no commissions',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} aria-hidden={true} className="text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`tel:${siteConfig.phone}`} className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <LeadForm city={city.name} />
          </div>
        </section>

        <TrustBar />

        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Cash Home Buyers in {city.name}, {stName}</h2>
            <p>
              If you need to sell your house fast in {city.name}, {city.county}, we make it simple.
              We are direct cash home buyers — not agents, not investors who shop your house to others.
              When we make an offer, we&apos;re the ones buying.
            </p>
            <p>
              We&apos;ve helped homeowners throughout {city.county} sell quickly — whether they&apos;re facing
              foreclosure, dealing with an inherited property, going through a divorce, or simply need
              to move fast. Whatever your situation, we can help.
            </p>
            <h3>Why Sell to Us vs. Listing With an Agent in {city.name}?</h3>
            <ul>
              <li><strong>Speed:</strong> We close in 7–21 days. Traditional listings take 60–90 days.</li>
              <li><strong>Certainty:</strong> No contingencies, no financing falling through.</li>
              <li><strong>Cost:</strong> No 3–6% agent commission. We pay all closing costs.</li>
              <li><strong>Convenience:</strong> No showings, no repairs, no staging.</li>
            </ul>
          </div>
        </section>

        <HowItWorks />
        <FaqSection faqs={homepageFaqs} title={`FAQ: Selling Your House Fast in ${city.name}`} />

        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Your {city.name} Cash Offer Today</h2>
          <p className="text-slate-800 mb-6">No obligation. We&apos;ll have an offer for you within 24 hours.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/property-information" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors">
              Get My Cash Offer
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors">
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
