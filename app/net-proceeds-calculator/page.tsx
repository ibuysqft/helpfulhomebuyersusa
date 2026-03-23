import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { NetProceedsCalculator } from '@/components/net-proceeds-calculator'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Virginia Home Sale Net Proceeds Calculator | See What You Actually Walk Away With',
  description:
    'See exactly how much you\'d net selling your house in Virginia — cash offer vs. listing with an agent. Instant calculation: commissions, repairs, carrying costs, closing costs all included.',
  alternates: { canonical: `${siteConfig.url}/net-proceeds-calculator` },
  openGraph: {
    title: 'Virginia Home Sale Net Proceeds Calculator',
    description:
      'Compare your real net proceeds: cash offer vs. listing with an agent. See the true cost of commissions, repairs, and carrying costs.',
    url: `${siteConfig.url}/net-proceeds-calculator`,
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much will I net selling my house in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your net proceeds depend on your sale price minus agent commissions (typically 5–6%), buyer concessions (1–3%), repairs, carrying costs while listed, and closing costs. On a $350,000 home with a 4-month listing period, sellers commonly net $270,000–$295,000 through an agent vs. $285,000–$305,000 through a cash buyer after accounting for all fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fees do I pay when selling a house in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Virginia home sellers typically pay: real estate agent commissions (5–6% split between buyer and seller agents), seller closing costs (1–2% of sale price), repair costs before listing, carrying costs (mortgage, taxes, insurance during listing period), and potential buyer concessions. These can total 8–15% of the sale price.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is selling to a cash buyer better than listing with an agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your situation. Cash sales eliminate commissions, repairs, carrying costs, and closing costs — which can add up to $30,000–$60,000 on a typical Virginia home. However, cash offers are typically below full market value. Our calculator shows the true comparison so you can make an informed decision.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I sell my house for cash in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cash buyers like Helpful Home Buyers USA can close in as little as 7–14 days. Traditional agent listings in Virginia average 30–90 days on market plus 30–45 days to close — a total of 2–4 months during which you continue paying mortgage, taxes, and insurance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What repairs do I need to make before selling in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If listing with an agent, buyers and their inspectors typically request $3,000–$55,000 in repairs depending on condition. Cash buyers like us purchase homes as-is — no repairs, cleaning, or staging required.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Home Sale Net Proceeds in Virginia',
  description:
    'Use this step-by-step calculator to see exactly how much you\'ll net selling your Virginia home — with an agent vs. a cash buyer.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter your home value',
      text: 'Use the slider or type in your estimated home value or asking price.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enter your mortgage balance',
      text: 'Enter your remaining mortgage payoff amount. Enter 0 if you own free and clear.',
    },
    {
      '@type': 'HowToStep',
      name: 'Select your home condition',
      text: 'Choose the condition of your home — this affects estimated repair costs and the cash offer percentage.',
    },
    {
      '@type': 'HowToStep',
      name: 'Set expected months to sell',
      text: 'Drag the slider to how long you expect your home to sit on the market if you listed with an agent.',
    },
    {
      '@type': 'HowToStep',
      name: 'Compare your net proceeds',
      text: 'See the side-by-side breakdown of what you\'d actually walk away with — agent sale vs. cash sale.',
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Net Proceeds Calculator',
      item: `${siteConfig.url}/net-proceeds-calculator`,
    },
  ],
}

export default function NetProceedsCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="py-16 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0F1E3C 0%, #1E3A5F 100%)' }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-1" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li style={{ color: '#94A3B8' }}>Net Proceeds Calculator</li>
              </ol>
            </nav>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(37, 99, 235, 0.4)',
                color: '#93C5FD',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden />
              Free · No sign-up required · Updates instantly
            </div>

            <h1
              className="text-3xl md:text-5xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Virginia Home Sale{' '}
              <span style={{ color: '#4ADE80' }}>Net Proceeds Calculator</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              See <strong className="text-white">exactly</strong> how much you&apos;d walk away with —
              selling to a cash buyer vs. listing with an agent. Every fee, commission, and carrying cost included.
            </p>

            {/* Key stats row */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { label: 'Avg. agent commissions', value: '5.5%' },
                { label: 'Avg. days on market (VA)', value: '47 days' },
                { label: 'Cash close timeline', value: '14 days' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: '#FCD34D', fontFamily: 'var(--font-heading)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calculator ───────────────────────────────────────────────── */}
        <section className="py-12 px-4" style={{ background: '#0A0F1A' }}>
          <NetProceedsCalculator />
        </section>

        {/* ── How it works explainer ───────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#111827' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-semibold text-white text-center mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How the Numbers Are Calculated
            </h2>
            <p
              className="text-center mb-10"
              style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
            >
              We use real Virginia market averages — no sugar-coating.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Agent sale breakdown */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#1E2A3A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h3
                  className="font-semibold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Traditional Agent Sale Costs
                </h3>
                <ul className="space-y-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {[
                    { item: 'Agent commission', detail: '5.5% of sale price (split buyer/seller agent)' },
                    { item: 'Buyer concessions', detail: '~2% — buyers often ask for closing cost help' },
                    { item: 'Pre-listing repairs', detail: '$0–$55K depending on condition' },
                    { item: 'Carrying costs', detail: 'Mortgage + taxes + insurance × months listed' },
                    { item: 'Seller closing costs', detail: '~1% of sale price' },
                  ].map(r => (
                    <li key={r.item} className="flex gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: '#F87171' }}
                        aria-hidden
                      />
                      <div>
                        <span className="font-medium text-sm" style={{ color: '#E2E8F0' }}>{r.item}: </span>
                        <span className="text-sm" style={{ color: '#64748B' }}>{r.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cash sale */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#052e16', border: '1px solid rgba(74,222,128,0.15)' }}
              >
                <h3
                  className="font-semibold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Cash Buyer Sale Costs
                </h3>
                <ul className="space-y-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {[
                    { item: 'Cash offer', detail: '67–92% of value depending on condition' },
                    { item: 'Agent commission', detail: '$0 — no agents involved' },
                    { item: 'Repairs', detail: '$0 — we buy as-is, any condition' },
                    { item: 'Carrying costs', detail: '$0 — close in ~14 days avg' },
                    { item: 'Closing costs', detail: '$0 — we pay all closing costs' },
                  ].map(r => (
                    <li key={r.item} className="flex gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: '#4ADE80' }}
                        aria-hidden
                      />
                      <div>
                        <span className="font-medium text-sm" style={{ color: '#E2E8F0' }}>{r.item}: </span>
                        <span className="text-sm" style={{ color: '#86EFAC' }}>{r.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p
              className="text-xs text-center mt-6"
              style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
            >
              Carrying costs formula: (home value × 0.8%) × months on market. Covers mortgage payment,
              property taxes, and insurance. Commission rate based on Virginia market averages (2024).
            </p>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#0F1E3C' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-semibold text-white text-center mb-10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq) => (
                <div
                  key={faq.name}
                  className="rounded-xl p-5"
                  style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3
                    className="font-semibold text-white mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {faq.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead form CTA ────────────────────────────────────────────────── */}
        <section
          className="py-20 px-4"
          style={{ background: '#0A0F1A' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{
                background: 'rgba(249, 115, 22, 0.15)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                color: '#FDBA74',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" aria-hidden />
              No obligation · Get your real number
            </div>

            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready for Your Real Cash Offer?
            </h2>
            <p
              className="mb-10 text-lg"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              The calculator gives you estimates. We&apos;ll give you an actual number — within 24 hours,
              with zero pressure and zero obligation.
            </p>

            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
