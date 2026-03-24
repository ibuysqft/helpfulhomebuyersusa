import { LandingPageLayout } from '@/components/landing-page-layout'
import { LandingInlineForm } from '@/components/landing-inline-form'
import { siteConfig } from '@/config/site'

interface FaqItem {
  question: string
  answer: string
}

interface DistressedLandingPageProps {
  persona: string
  headline: string
  subheadline: string
  empathyText: string
  heroCtaText: string
  trustPoints: string[]
  faqItems: FaqItem[]
}

const TRUST_STATS = [
  { value: '200+', label: 'Homes Bought' },
  { value: '10+', label: 'Years in Business' },
  { value: '7 Days', label: 'Avg. Close Time' },
  { value: '$0', label: 'Fees or Commissions' },
]

const HOW_IT_WORKS_STEPS = [
  {
    n: '1',
    title: 'Tell Us About Your Property',
    desc: 'Fill out the short form or call us. Address and phone is all we need to get started.',
  },
  {
    n: '2',
    title: 'Get Your Cash Offer in 24 Hours',
    desc: 'We analyze your property and deliver a fair, no-obligation cash offer — no games, no lowballs.',
  },
  {
    n: '3',
    title: 'Close on Your Timeline',
    desc: 'Pick a closing date that works for you. As fast as 7 days or whenever you\'re ready.',
  },
]

export function DistressedLandingPage({
  headline,
  subheadline,
  empathyText,
  heroCtaText,
  trustPoints,
  faqItems,
}: DistressedLandingPageProps) {
  return (
    <LandingPageLayout>
      {/* Hero — dark background, headline + form side by side on desktop */}
      <section
        className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #18181b 0%, #1e2a3a 100%)' }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div className="space-y-5">
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full"
              style={{
                border: '1px solid rgba(74, 222, 128, 0.4)',
                color: '#4ADE80',
                background: 'rgba(74,222,128,0.08)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              Cash Offer in 24 Hours
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {headline}
            </h1>

            <p
              className="text-lg"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              {subheadline}
            </p>

            {/* Trust points */}
            <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
              {trustPoints.map(point => (
                <li key={point} className="flex items-start gap-2 text-slate-300">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>

            {/* Phone CTA */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg min-h-[44px] text-white border border-white/30 hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {siteConfig.phoneDisplay}
            </a>
          </div>

          {/* Right: form card */}
          <div
            className="rounded-2xl p-6 shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h2
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get Your Free Cash Offer
            </h2>
            <p
              className="text-sm mb-5"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              No obligation. No fees. No judgment.
            </p>
            <LandingInlineForm ctaText={heroCtaText} variant="dark" />
          </div>
        </div>
      </section>

      {/* Empathy bar */}
      <section
        className="py-6 px-4 text-center"
        style={{ background: '#1E3A5F' }}
      >
        <p
          className="max-w-2xl mx-auto text-blue-100 text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          We understand you&apos;re going through a difficult time. We&apos;re here to help, not judge.
          No pressure, no obligation — just honest answers and a fair cash offer.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{ background: '#F1F5F9' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold text-center mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            How It Works
          </h2>
          <p
            className="text-center mb-12 max-w-xl mx-auto"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          >
            Three simple steps. No repairs, no agents, no hidden fees.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map(({ n, title, desc }) => (
              <div
                key={n}
                className="bg-white rounded-xl p-6 text-center shadow-md border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                  style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  {n}
                </div>
                <h3
                  className="font-semibold mb-2 text-base"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section
        className="py-12 px-4 border-y"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map(({ value, label }) => (
            <div key={label}>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {value}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Persona-specific promise */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            Our Promise to You
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          >
            {empathyText}
          </p>
        </div>
      </section>

      {/* Second form */}
      <section
        className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0F1E3C 0%, #1E3A5F 100%)' }}
      >
        <div className="max-w-md mx-auto">
          <h2
            className="text-2xl font-bold text-white text-center mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="text-center mb-8"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
          >
            Get your free cash offer — no fees, no obligation, no judgment.
          </p>
          <LandingInlineForm ctaText="Get My Free Cash Offer →" variant="dark" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4" style={{ background: '#F8FAFC' }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-semibold text-center mb-10"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            Frequently Asked Questions
          </h2>

          <dl className="space-y-6">
            {faqItems.map(({ question, answer }) => (
              <div
                key={question}
                className="bg-white rounded-xl p-6 border shadow-sm"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <dt
                  className="font-semibold text-base mb-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  {question}
                </dt>
                <dd
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Phone CTA footer bar */}
      <section
        className="py-12 px-4 text-center"
        style={{ background: '#0F1E3C' }}
      >
        <p
          className="text-white text-lg mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Prefer to talk? Call us now — we pick up.
        </p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center gap-3 font-bold text-xl px-8 py-4 rounded-xl text-white transition-opacity hover:opacity-90 min-h-[56px]"
          style={{ background: '#16A34A', fontFamily: 'var(--font-body)' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {siteConfig.phoneDisplay}
        </a>
        <p
          className="text-sm mt-3"
          style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
        >
          Available 8am–8pm, 7 days a week
        </p>
      </section>
    </LandingPageLayout>
  )
}
