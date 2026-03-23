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
import { CredibilityBar } from '@/components/credibility-bar'
import { StatsCounter } from '@/components/stats-counter'
import { ComparisonTable } from '@/components/comparison-table'
import { ClosingCalculator } from '@/components/closing-calculator'
import { ReturnVisitorBanner } from '@/components/return-visitor-banner'
import { NationalHero } from '@/components/national-hero'
import { StateSelector } from '@/components/state-selector'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { siteConfig } from '@/config/site'
import { ratingsConfig } from '@/config/ratings'
import { getHomepageFaqs } from '@/data/faqs'
import { getStateConfig } from '@/lib/state-context'

export const metadata: Metadata = siteConfig.isNational
  ? {
      title: 'We Buy Houses for Cash — Anywhere in the USA | Helpful Home Buyers USA',
      description:
        'National cash home buying network. Get a fair cash offer in 24 hours. Close in 7 days. No repairs, no agents, no fees. Operating in 15 states.',
      alternates: { canonical: siteConfig.url },
    }
  : {
      title: `Sell My House Fast ${siteConfig.stateName} | Cash Offer in 24 Hours`,
      description: `We buy houses for cash across ${siteConfig.stateName}. Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no commissions, no hassle.`,
      alternates: { canonical: siteConfig.url },
    }

const nationalFaqs = [
  {
    question: 'How does the Helpful Home Buyers national network work?',
    answer:
      'We are a network of local cash buyers operating across 15 states. When you submit your property, we connect you with your local Helpful Home Buyers team who will provide a fair, no-obligation cash offer within 24 hours.',
  },
  {
    question: 'How fast can you close?',
    answer:
      'We can close in as few as 7 days once you accept our offer. We work on your schedule — if you need more time, we can accommodate that too.',
  },
  {
    question: 'Do you charge any fees or commissions?',
    answer:
      'Never. We pay all closing costs. There are zero commissions, zero agent fees, and zero hidden charges. The offer we make is what you receive at closing.',
  },
  {
    question: 'Do I need to make repairs before selling?',
    answer:
      'No. We buy houses as-is in any condition. Fire damage, foundation issues, code violations, outdated systems — it doesn\'t matter. We handle everything after closing.',
  },
  {
    question: 'Which states do you currently operate in?',
    answer:
      'We are currently active in Virginia with active expansion into Texas, Florida, Georgia, Ohio, North Carolina, South Carolina, Illinois, Michigan, New York, New Jersey, California, Arizona, Colorado, and Connecticut.',
  },
]

export default function HomePage() {
  const stateConfig = getStateConfig()

  // National homepage
  if (stateConfig.isNational) {
    return (
      <>
        <Header />
        <main>
          <NationalHero />
          <TrustBar />
          <CredibilityBar />
          <StatsCounter />
          <StateSelector />
          {/* Newsletter — national */}
          <section style={{ background: '#0D1A2E' }} className="py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <NewsletterSignup variant="national" />
            </div>
          </section>
          <SituationCards />
          <HowItWorks />
          <Testimonials />
          <FaqSection faqs={nationalFaqs} title="Frequently Asked Questions" />
          <section className="py-16 px-4 text-center" style={{ background: '#0F1E3C' }}>
            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to Get Your Cash Offer?
            </h2>
            <p
              className="mb-8 max-w-md mx-auto"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              No obligation. We&apos;ll have a fair offer within 24 hours.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/property-information"
                className="font-bold px-8 py-4 rounded-xl text-slate-900 min-h-[52px] flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: '#D4AF37', fontFamily: 'var(--font-body)' }}
              >
                Get My Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-bold px-8 py-4 rounded-xl text-white min-h-[52px] flex items-center gap-2 transition-colors hover:bg-white/10"
                style={{ border: '2px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </section>
          <FunnelEntry />
        </main>
        <Footer />
      </>
    )
  }

  // State-specific homepage
  const homepageFaqs = getHomepageFaqs(stateConfig)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map(({ question, answer }) => ({
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
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Sell Your House Fast for Cash',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Request Your Cash Offer',
        text: 'Fill out our short form or call (703) 940-1159 with your property details.',
      },
      {
        '@type': 'HowToStep',
        name: 'Receive Your Fair Cash Offer',
        text: 'We analyze your property and deliver a no-obligation cash offer within 24 hours.',
      },
      {
        '@type': 'HowToStep',
        name: 'Pick Your Closing Date',
        text: 'You choose the closing date — as fast as 7 days or whenever works for you.',
      },
      {
        '@type': 'HowToStep',
        name: 'Get Paid at Closing',
        text: 'Sign documents, hand over keys, and receive cash at closing — no fees, no repairs required.',
      },
    ],
  }

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Helpful Home Buyers USA',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <Header />
      <ReturnVisitorBanner />
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
                <span style={{ color: '#FCD34D' }}>{siteConfig.stateName}</span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg text-blue-100"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                We buy houses for cash anywhere in {siteConfig.stateName}. Skip the repairs, skip the agents,
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

              {/* SMS Keyword CTA */}
              <p
                className="text-sm text-blue-200 mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Or text <strong className="text-white font-semibold">&ldquo;OFFER&rdquo;</strong> to{' '}
                <a href="sms:+17039401159" className="text-white font-semibold hover:underline">
                  (703) 940-1159
                </a>{' '}
                for an instant reply &mdash; we respond in minutes.
              </p>
            </div>

            {/* Right: form card */}
            <FunnelEntry />
          </div>
        </section>

        {/* Trust bar */}
        <TrustBar />

        {/* Credibility badges */}
        <CredibilityBar />

        {/* Animated stats */}
        <StatsCounter />

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
              We buy houses across all major {siteConfig.stateName} markets and surrounding areas.
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

        {/* Quiz CTA banner */}
        <section className="py-10 px-4" style={{ background: '#0F1E3C' }}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#93C5FD', fontFamily: 'var(--font-body)' }}>
                Not sure which option is right for you?
              </p>
              <p className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Take our 60-second quiz and get a personalized recommendation.
              </p>
            </div>
            <Link
              href="/quiz"
              className="flex-shrink-0 font-bold px-6 py-3 rounded-xl text-white min-h-[44px] flex items-center gap-2 transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
            >
              Take the Quiz →
            </Link>
          </div>
        </section>

        {/* Case studies promo */}
        <section className="py-12 px-4" style={{ background: '#fff' }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
              style={{
                background: 'linear-gradient(135deg, #0F1E3C 0%, #1E3A5F 100%)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
              }}
            >
              <div className="flex-1 text-center md:text-left">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: '#93C5FD', fontFamily: 'var(--font-body)' }}
                >
                  Real Stories
                </p>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  See What We've Done for Our Sellers
                </h2>
                <p
                  className="text-sm md:text-base"
                  style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
                >
                  Foreclosure, probate, divorce, inherited homes, tax liens — real timelines and real numbers from people in the same situation you're in now.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="flex-shrink-0 font-bold px-6 py-3 rounded-xl text-slate-900 min-h-[44px] flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: '#FCD34D', fontFamily: 'var(--font-body)' }}
              >
                Read Case Studies
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <ComparisonTable />

        {/* Closing calculator */}
        <ClosingCalculator />

        {/* Net proceeds calculator CTA */}
        <section className="py-12 px-4" style={{ background: '#0A0F1A' }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
              style={{
                background: 'linear-gradient(135deg, #052e16 0%, #0F1E3C 60%, #1E3A5F 100%)',
                border: '1px solid rgba(74, 222, 128, 0.2)',
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74,222,128,0.25)' }}
                aria-hidden="true"
              >
                <svg className="w-8 h-8" fill="none" stroke="#4ADE80" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Copy */}
              <div className="flex-1 text-center md:text-left">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}
                >
                  Free Tool
                </p>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Net Proceeds Calculator
                </h2>
                <p
                  className="text-sm md:text-base"
                  style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
                >
                  See exactly what you&apos;d walk away with — cash offer vs. listing with an agent.
                  Every fee, commission, and carrying cost included.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/net-proceeds-calculator"
                className="flex-shrink-0 font-bold px-6 py-3 rounded-xl text-white min-h-[44px] flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: '#16A34A', fontFamily: 'var(--font-body)' }}
              >
                Calculate My Net
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqs={homepageFaqs} title="Frequently Asked Questions" />

        {/* Newsletter — state */}
        <section style={{ background: '#0D1A2E' }} className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup
              variant="state"
              stateSlug={siteConfig.stateSlug}
              stateName={siteConfig.stateName}
            />
          </div>
        </section>

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
              href="/instant-offer"
              className="cta-pulse text-slate-900 font-bold px-8 py-4 rounded-lg min-h-[44px] flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#FCD34D', fontFamily: 'var(--font-body)' }}
            >
              ⚡ Get Instant Offer Estimate
            </Link>
            <Link
              href="/property-information"
              className="text-white font-bold px-8 py-4 rounded-lg min-h-[44px] flex items-center transition-opacity hover:opacity-90"
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
