import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FunnelEntry } from '@/components/funnel-entry'
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
      <main className="pb-16 md:pb-0">

        {/* Hero */}
        <section
          className="py-20 px-4"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' }}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="space-y-6">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 text-white/90"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Cash Offer in 24 Hours
              </div>

              {/* Headline */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold italic text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Sell Your House Fast in{' '}
                <span style={{ color: '#FCD34D' }}>Virginia</span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg text-blue-100"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                We buy houses for cash anywhere in Virginia. Skip the repairs, skip the agents,
                and close on your schedule — in as little as 7 days.
              </p>

              {/* Inline trust */}
              <p
                className="text-sm text-blue-200"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {ratingsConfig.ratingValue}&#9733; Rated &nbsp;&middot;&nbsp; {ratingsConfig.reviewCount} Sellers Helped &nbsp;&middot;&nbsp; Licensed &amp; Local
              </p>

              {/* Benefit list */}
              <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
                {[
                  'Buy as-is — any condition',
                  'We pay all closing costs',
                  'No agents, no commissions',
                  'Close in 7 days or on your schedule',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-blue-100">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Phone CTA */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg min-h-[44px] border border-white/40 hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {siteConfig.phoneDisplay}
              </a>
            </div>

            {/* Right: form card */}
            <FunnelEntry />
          </div>
        </section>

        {/* Trust bar */}
        <TrustBar />

        {/* Situation cards */}
        <SituationCards />

        {/* How it works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* Service areas */}
        <section className="py-16 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Markets We Serve
            </h2>
            <p
              className="mb-8"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
            >
              We buy houses across all major Virginia markets and surrounding areas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {siteConfig.markets.map(market => (
                <span
                  key={market}
                  className="bg-white border px-4 py-2 rounded-lg text-sm"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqs={homepageFaqs} title="Frequently Asked Questions" />

        {/* Bottom CTA */}
        <section
          className="py-20 px-4 text-center"
          style={{ background: '#0F1E3C' }}
        >
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get Your Cash Offer Today
          </h2>
          <p
            className="text-slate-300 mb-8 max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No obligation. We&apos;ll have a fair offer for you within 24 hours.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/property-information"
              className="cta-pulse text-white font-bold px-8 py-4 rounded-lg min-h-[44px] flex items-center transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
            >
              Get My Cash Offer
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-lg min-h-[44px] flex items-center transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
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
