import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { TrustBar } from '@/components/trust-bar'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { SituationCards } from '@/components/situation-cards'
import { FaqSection } from '@/components/faq-section'
import { siteConfig } from '@/config/site'
import { ratingsConfig } from '@/config/ratings'
import { homepageFaqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'Sell My House Fast Virginia | Cash Offer in 24 Hours',
  description:
    'We buy houses for cash across Virginia. Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no commissions, no hassle.',
  alternates: { canonical: siteConfig.url },
}

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-amber-400 text-slate-900 text-sm font-bold px-3 py-1 rounded-full">
                ⚡ Cash Offer in 24 Hours
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sell Your House Fast in{' '}
                <span className="text-amber-400">Virginia</span>
              </h1>
              <p className="text-xl text-slate-300">
                We buy houses for cash anywhere in Virginia. Skip the repairs, skip the agents,
                and close on your schedule — in as little as 7 days.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  `${ratingsConfig.ratingValue}★ rated · ${ratingsConfig.reviewCount} reviews`,
                  'Buy as-is — any condition',
                  'We pay all closing costs',
                  'No agents, no commissions',
                  'Close in 7 days or on your schedule',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">✓</span> {item}
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
            <LeadForm />
          </div>
        </section>

        <TrustBar />
        <SituationCards />
        <HowItWorks />
        <Testimonials />

        {/* Service areas */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Markets We Serve</h2>
            <p className="text-slate-400 mb-8">
              We buy houses across all major Virginia markets and surrounding areas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {siteConfig.markets.map(market => (
                <span
                  key={market}
                  className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </section>

        <FaqSection faqs={homepageFaqs} title="Frequently Asked Questions" />

        {/* Bottom CTA */}
        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Your Cash Offer Today</h2>
          <p className="text-slate-800 mb-6">
            No obligation. We&apos;ll have an offer for you within 24 hours.
          </p>
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
