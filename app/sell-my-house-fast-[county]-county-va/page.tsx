import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { counties } from '@/data/counties'
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

export const revalidate = 86400

interface Props { params: Promise<{ county: string }> }

export async function generateStaticParams() {
  return counties.map(c => ({ county: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: countySlug } = await params
  const county = counties.find(c => c.slug === countySlug)
  if (!county) return {}
  return {
    title: `Sell My House Fast in ${county.name}, VA | Cash Home Buyers`,
    description: `We buy houses for cash throughout ${county.displayName}. No repairs, no fees, close in 7 days. Get your fair cash offer today — serving all cities in ${county.name}.`,
    alternates: { canonical: `${siteConfig.url}/sell-my-house-fast-${countySlug}-county-va` },
  }
}

export default async function CountyPage({ params }: Props) {
  const { county: countySlug } = await params
  const county = counties.find(c => c.slug === countySlug)
  if (!county) notFound()

  const nearbyCountyLinks = county.nearbyCounties
    .map(s => counties.find(c => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: [county.name, county.displayName],
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                We Buy Houses in <span className="text-amber-400">{county.name}, Virginia</span>
              </h1>
              <p className="text-xl text-slate-300">
                {county.description}
              </p>
              <p className="text-lg text-slate-300">
                Fair cash offer within 24 hours. Close in as little as 7 days.
                We serve all cities and communities throughout {county.name}.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  `Serving all of ${county.name} (${county.population} residents)`,
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
            <LeadForm city={county.name} />
          </div>
        </section>

        <TrustBar />

        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Cash Home Buyers Serving All of {county.name}, VA</h2>
            <p>
              If you need to sell your house fast anywhere in {county.displayName}, we make it simple.
              We are direct cash home buyers — not agents, not investors who shop your house to others.
              When we make an offer, we're the ones buying.
            </p>
            <p>
              We've helped homeowners throughout {county.name} sell quickly — whether they're facing
              foreclosure, dealing with an inherited property, going through a divorce, or simply need
              to move fast. Whatever your situation, we can help.
            </p>
            <h3>Communities We Serve in {county.name}</h3>
            <p>
              We actively buy houses in every city and town throughout {county.name}, including:{' '}
              {county.cities.join(', ')}.
            </p>
            <h3>Why Sell to Us vs. Listing With an Agent in {county.name}?</h3>
            <ul>
              <li><strong>Speed:</strong> We close in 7–21 days. Traditional listings take 60–90 days.</li>
              <li><strong>Certainty:</strong> No contingencies, no financing falling through.</li>
              <li><strong>Cost:</strong> No 3–6% agent commission. We pay all closing costs.</li>
              <li><strong>Convenience:</strong> No showings, no repairs, no staging.</li>
            </ul>
          </div>
        </section>

        <HowItWorks />
        <FaqSection faqs={homepageFaqs} title={`FAQ: Selling Your House Fast in ${county.name}`} />

        {nearbyCountyLinks.length > 0 && (
          <section className="py-12 px-4 bg-slate-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6 text-center">We Also Serve Nearby Virginia Counties</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {nearbyCountyLinks.map(nearby => (
                  <Link
                    key={nearby.slug}
                    href={`/sell-my-house-fast-${nearby.slug}-county-va`}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {nearby.name}, VA →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Your {county.name} Cash Offer Today</h2>
          <p className="text-slate-800 mb-6">No obligation. We'll have an offer for you within 24 hours.</p>
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
