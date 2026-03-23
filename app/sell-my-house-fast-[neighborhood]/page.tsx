import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { neighborhoods } from '@/data/neighborhoods'
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

interface Props { params: Promise<{ neighborhood: string }> }

export async function generateStaticParams() {
  return neighborhoods.map(n => ({ neighborhood: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { neighborhood: slug } = await params
  const neighborhood = neighborhoods.find(n => n.slug === slug)
  if (!neighborhood) return {}
  return {
    title: `Sell My House Fast in ${neighborhood.name}, ${neighborhood.city} VA | Cash Home Buyers`,
    description: `We buy houses for cash in ${neighborhood.name}, ${neighborhood.city}, Virginia. No repairs, no fees, close in 7 days. Get your fair cash offer today.`,
    alternates: { canonical: `${siteConfig.url}/sell-my-house-fast-${slug}` },
  }
}

export default async function NeighborhoodPage({ params }: Props) {
  const { neighborhood: slug } = await params
  const neighborhood = neighborhoods.find(n => n.slug === slug)
  if (!neighborhood) notFound()

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    legalName: 'Paramount Legacy Properties LLC',
    telephone: siteConfig.phone,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10369 Democracy Ln',
      addressLocality: 'Fairfax',
      addressRegion: 'VA',
      postalCode: '22030',
      addressCountry: 'US',
    },
    areaServed: [neighborhood.name, neighborhood.city, neighborhood.region],
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
                We Buy Houses in <span className="text-amber-400">{neighborhood.name}, {neighborhood.city}, Virginia</span>
              </h1>
              <p className="text-xl text-slate-300">
                {neighborhood.description}
              </p>
              <p className="text-lg text-slate-300">
                We are direct cash home buyers serving {neighborhood.name} and all of {neighborhood.city}, VA.
                Fair offer in 24 hours. Close in as little as 7 days. No repairs required.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  `Serving ${neighborhood.name} and surrounding ${neighborhood.city} neighborhoods`,
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
            <LeadForm city={`${neighborhood.name}, ${neighborhood.city}`} />
          </div>
        </section>

        <TrustBar />

        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Cash Home Buyers in {neighborhood.name}, {neighborhood.city}, Virginia</h2>
            <p>
              If you need to sell your house fast in {neighborhood.name}, we make it simple.
              We are direct cash buyers — not agents, not investors who shop your home to others.
              When we make an offer on your {neighborhood.name} property, we are the ones buying.
            </p>
            <p>
              We have helped homeowners throughout {neighborhood.city} sell quickly — whether they are facing
              foreclosure, dealing with an inherited property, going through a divorce, or simply need
              to move fast. Whatever your situation in {neighborhood.name}, we can help.
            </p>
            <h3>Why Sell to Us vs. Listing With an Agent in {neighborhood.name}?</h3>
            <ul>
              <li><strong>Speed:</strong> We close in 7–21 days. Traditional listings take 60–90 days.</li>
              <li><strong>Certainty:</strong> No contingencies, no financing falling through.</li>
              <li><strong>Cost:</strong> No 3–6% agent commission. We pay all closing costs.</li>
              <li><strong>Convenience:</strong> No showings, no repairs, no staging.</li>
            </ul>
            <p>
              Serving {neighborhood.name} as part of our broader{' '}
              <Link href={`/sell-my-house-fast-${neighborhood.citySlug}-va`}>
                {neighborhood.city}, VA
              </Link>{' '}
              service area.
            </p>
          </div>
        </section>

        <HowItWorks />
        <FaqSection faqs={homepageFaqs} title={`FAQ: Selling Your House Fast in ${neighborhood.name}`} />

        <section className="py-12 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              We Buy Houses Across All of {neighborhood.city}
            </h2>
            <p className="text-slate-400 mb-6">
              {neighborhood.name} is just one of many {neighborhood.city} neighborhoods we serve.
            </p>
            <Link
              href={`/sell-my-house-fast-${neighborhood.citySlug}-va`}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              See All {neighborhood.city} Cash Offers →
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Your {neighborhood.name} Cash Offer Today</h2>
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
