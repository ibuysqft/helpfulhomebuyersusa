import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `What's My House Worth in Virginia? Free Home Value Estimator`,
  description: `Find out what your Virginia home is worth in today's market. Get a free instant estimate + cash offer comparison. No obligation.`,
  alternates: { canonical: `${siteConfig.url}/whats-my-house-worth` },
  openGraph: {
    title: `What's My House Worth in Virginia? Free Home Value Estimator`,
    description: `Get a free, instant home value estimate for your Virginia property. See as-is value, after-repair value, and a direct cash offer — all in one place.`,
    url: `${siteConfig.url}/whats-my-house-worth`,
    type: 'website',
  },
}

const faqs = [
  {
    question: "How accurate is an online home value estimate in Virginia?",
    answer:
      "Online estimates (AVMs) are useful starting points but can be off by 5–15% depending on data availability and local market conditions. In rural Virginia counties with fewer comparable sales, the margin of error widens. For the most accurate valuation, a local cash buyer who actively purchases in your market will give you the most reliable number — often within 24 hours.",
  },
  {
    question: "What's the difference between market value and as-is value?",
    answer:
      "Market value assumes your home is fully repaired, staged, and sold on the open market through an agent — it is the highest theoretical price. As-is value reflects what the home would sell for in its current condition, with no repairs made. Most cash buyers price based on as-is value minus renovation costs and a profit margin. Understanding both numbers helps you decide which path makes more financial sense.",
  },
  {
    question: "What factors most affect home value in Virginia?",
    answer:
      "Location and school district are the biggest drivers — Northern Virginia, Richmond, and Hampton Roads each behave differently. Beyond location: square footage, lot size, bedroom/bathroom count, condition, age of major systems (roof, HVAC, plumbing), and recent comparable sales within a half-mile. Market timing also matters; Virginia's market tends to peak in spring and slow in winter.",
  },
  {
    question: "Do I need to make repairs before selling my home in Virginia?",
    answer:
      "Only if you are listing with an agent. Traditional buyers and their lenders require the home to meet minimum condition standards, and inspection reports typically generate $5,000–$55,000 in repair requests. Cash buyers purchase homes as-is — no repairs, no cleaning, no staging. This can be worth more than it appears once you account for the repair costs, time, and hassle avoided.",
  },
  {
    question: "How do I get an accurate cash offer for my Virginia home?",
    answer:
      "The fastest route is to contact a local cash buyer directly. We look at comparable sales, the property's condition, and the current Virginia market to build a real offer — not an algorithm guess. Our offers come within 24 hours and there is zero obligation to accept.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to Find Out What Your Virginia Home Is Worth",
  description:
    "Use these steps to get an accurate home value estimate and understand your options as a Virginia seller.",
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter your property address',
      text: 'Start by entering your full property address. This allows us to pull public record data, tax assessments, and recent comparable sales in your area.',
    },
    {
      '@type': 'HowToStep',
      name: 'Select your home condition',
      text: 'Condition has a major impact on value. Be honest about the current state — as-is vs. fully repaired values can differ by 20–40%.',
    },
    {
      '@type': 'HowToStep',
      name: 'Review comparable sales',
      text: 'Look at homes that sold within the last 90 days, within a half-mile, with similar square footage and bedroom count. These are your true market comps.',
    },
    {
      '@type': 'HowToStep',
      name: 'Get a direct cash offer',
      text: 'Submit your info and receive a real cash offer from Helpful Home Buyers USA within 24 hours — no obligation required.',
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
      name: "What's My House Worth",
      item: `${siteConfig.url}/whats-my-house-worth`,
    },
  ],
}

// ─── Value factors data ───────────────────────────────────────────────────────

const valueFactors = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Location & Neighborhood',
    description:
      'Zip code, school district ratings, proximity to employment centers, and walkability scores all drive premiums — or discounts — compared to the county median.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Comparable Sales (Comps)',
    description:
      'Homes that sold within 90 days, within 0.5 miles, with similar size and bed/bath count are the most accurate benchmark for your current market value.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Condition & Updates',
    description:
      'Roof age, HVAC condition, kitchen/bathroom updates, foundation integrity, and deferred maintenance all directly affect both market value and the cash offer percentage.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Market Trends',
    description:
      "Virginia's market varies by region and season. Low inventory and high demand push values up; rising interest rates compress buyer pools and prices. Local trends matter more than national headlines.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    title: 'Square Footage & Lot Size',
    description:
      'Price per square foot is the baseline metric agents and appraisers use. Lot size matters more in suburban/rural Virginia where land carries independent value.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Tax Assessment vs. Market Value',
    description:
      "Virginia reassesses property values on varying schedules — your county assessment may be 10–30% below current market value. Don't use your tax assessment as your selling price.",
  },
]

// ─── VA market overview ───────────────────────────────────────────────────────

const markets = [
  {
    region: 'Northern Virginia',
    medianPrice: '$650,000',
    trend: '+4.2% YoY',
    note: 'Fairfax, Arlington, Loudoun — federal workforce drives steady demand. Low days-on-market.',
    trendUp: true,
  },
  {
    region: 'Richmond Metro',
    medianPrice: '$375,000',
    trend: '+3.1% YoY',
    note: 'Strong growth in Henrico, Chesterfield, and Goochland. Affordable relative to NoVA.',
    trendUp: true,
  },
  {
    region: 'Hampton Roads',
    medianPrice: '$320,000',
    trend: '+2.8% YoY',
    note: 'Military bases (Norfolk, Chesapeake, Virginia Beach) create consistent buyer pool year-round.',
    trendUp: true,
  },
  {
    region: 'Shenandoah Valley',
    medianPrice: '$285,000',
    trend: '+1.9% YoY',
    note: 'Harrisonburg and Winchester seeing migration from NoVA. Rural properties vary widely.',
    trendUp: true,
  },
]

export default function WhatsMyHouseWorthPage() {
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
          className="py-20 px-4"
          style={{ background: 'linear-gradient(135deg, #0F1E3C 0%, #1E3A5F 100%)' }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs mb-8" aria-label="Breadcrumb">
              <ol
                className="flex items-center gap-1"
                style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
              >
                <li>
                  <Link href="/" className="hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li style={{ color: '#94A3B8' }}>What&apos;s My House Worth</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Copy */}
              <div className="space-y-6">
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 text-white/90"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden />
                  Free · No obligation · Instant estimate
                </div>

                <h1
                  className="text-3xl md:text-5xl font-semibold italic text-white leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  What&apos;s Your Virginia Home Worth in{' '}
                  <span style={{ color: '#FCD34D' }}>Today&apos;s Market?</span>
                </h1>

                <p
                  className="text-lg text-blue-100"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Get a free home value estimate and compare it to a direct cash offer — side by side.
                  No agent, no obligation, no waiting.
                </p>

                <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {[
                    'See as-is value AND after-repair value',
                    'Understand what affects your price',
                    'Compare cash offer vs. listing net proceeds',
                    'Get a real offer within 24 hours',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-blue-100">
                      <svg
                        className="w-4 h-4 text-green-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Cross-links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/instant-offer"
                    className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors min-h-[44px] flex items-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Get Instant Offer →
                  </Link>
                  <Link
                    href="/net-proceeds-calculator"
                    className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors min-h-[44px] flex items-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Net Proceeds Calculator →
                  </Link>
                </div>
              </div>

              {/* Right: Address input + Lead form */}
              <div
                className="bg-white rounded-2xl p-6 shadow-2xl border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                  <span className="inline-flex w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" aria-hidden />
                  <span>Free home valuation — no sign-up required</span>
                </div>

                <h2
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  Get Your Free Home Value
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                  Enter your address and we&apos;ll send a personalized valuation + cash offer within 24 hours.
                </p>

                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Value factors ─────────────────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                Factors That Affect Your Home&apos;s Value
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                Understanding these six drivers will help you set the right price expectation — whether you
                list on the open market or take a cash offer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {valueFactors.map(factor => (
                <div
                  key={factor.title}
                  className="bg-white rounded-xl p-6 border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--color-primary)' }}
                  >
                    {factor.icon}
                  </div>
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                  >
                    {factor.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Virginia Market Overview ──────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#0A0F1A' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: 'rgba(37, 99, 235, 0.2)',
                  border: '1px solid rgba(37, 99, 235, 0.4)',
                  color: '#93C5FD',
                  fontFamily: 'var(--font-body)',
                }}
              >
                2025 Virginia Market Data
              </div>
              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Virginia Market Overview
              </h2>
              <p style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                Median prices and year-over-year trends by Virginia region.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {markets.map(m => (
                <div
                  key={m.region}
                  className="rounded-xl p-6"
                  style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="font-semibold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {m.region}
                    </h3>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: m.trendUp ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)',
                        color: m.trendUp ? '#4ADE80' : '#F87171',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {m.trend}
                    </span>
                  </div>
                  <p
                    className="text-2xl font-bold mb-2"
                    style={{ color: '#FCD34D', fontFamily: 'var(--font-heading)' }}
                  >
                    {m.medianPrice}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                    {m.note}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-center mt-6" style={{ color: '#334155', fontFamily: 'var(--font-body)' }}>
              Source: Virginia Association of Realtors, MLS aggregate data, 2025. Individual property values vary significantly.
            </p>
          </div>
        </section>

        {/* ── As-Is vs ARV ──────────────────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#111827' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                As-Is Value vs. After-Repair Value (ARV)
              </h2>
              <p style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                Understanding the gap between these two numbers is the key to making the right decision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* As-is */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#1E2A3A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                  style={{
                    background: 'rgba(251,191,36,0.15)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    color: '#FCD34D',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  As-Is Value
                </div>
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  What Your Home Is Worth Right Now
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                  As-is value is the price a buyer would pay for your home in its current condition —
                  no repairs, no improvements. Cash buyers work from this number.
                </p>
                <ul className="space-y-2">
                  {[
                    'Reflects current condition honestly',
                    'What cash buyers base their offers on',
                    'Avoids all repair risk and cost',
                  ].map(pt => (
                    <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-400" fill="none" stroke="#FCD34D" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ARV */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#052e16', border: '1px solid rgba(74,222,128,0.15)' }}
              >
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                  style={{
                    background: 'rgba(74,222,128,0.15)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    color: '#4ADE80',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  After-Repair Value (ARV)
                </div>
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  What Your Home Could Be Worth
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#86EFAC', fontFamily: 'var(--font-body)' }}>
                  ARV is the estimated value after all recommended repairs and updates are completed.
                  This is the number real estate investors use to calculate their maximum offer.
                </p>
                <ul className="space-y-2">
                  {[
                    'Highest potential price on the open market',
                    'Requires time, money, and market risk',
                    "Closing in 2–4 months means more carrying costs",
                  ].map(pt => (
                    <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="#4ADE80" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The math */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: '#0F1E3C', border: '1px solid rgba(37,99,235,0.2)' }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: '#93C5FD', fontFamily: 'var(--font-body)' }}
              >
                When Cash Makes Sense
              </p>
              <p className="text-lg text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                ARV − Repair costs − Agent fees − Carrying costs − Concessions
                <span className="block text-2xl font-bold mt-1" style={{ color: '#FCD34D' }}>
                  = Your actual net
                </span>
              </p>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                On many Virginia homes — especially those needing $30K+ in repairs — the all-in cost of
                listing erases the price premium over a cash offer. Use our{' '}
                <Link href="/net-proceeds-calculator" className="underline" style={{ color: '#93C5FD' }}>
                  Net Proceeds Calculator
                </Link>{' '}
                to run the real numbers for your home.
              </p>
            </div>
          </div>
        </section>

        {/* ── Internal cross-links ──────────────────────────────────────── */}
        <section className="py-12 px-4" style={{ background: '#0F1E3C' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl font-semibold text-white text-center mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Helpful Tools &amp; Next Steps
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  href: '/net-proceeds-calculator',
                  label: 'Net Proceeds Calculator',
                  description: 'See exactly what you\'d walk away with — cash vs. agent sale, every fee included.',
                  color: '#4ADE80',
                },
                {
                  href: '/instant-offer',
                  label: 'Get an Instant Offer',
                  description: 'Enter your address and get an estimated cash offer range in under 60 seconds.',
                  color: '#FCD34D',
                },
                {
                  href: '/quiz',
                  label: 'Seller Situation Quiz',
                  description: 'Not sure which path is right? Take our 60-second quiz for a personalized recommendation.',
                  color: '#93C5FD',
                },
              ].map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl p-5 border transition-all hover:scale-[1.02] flex flex-col"
                  style={{ background: '#111827', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="text-sm font-bold mb-2"
                    style={{ color: tool.color, fontFamily: 'var(--font-heading)' }}
                  >
                    {tool.label} →
                  </span>
                  <span className="text-xs leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                    {tool.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead form CTA ─────────────────────────────────────────────── */}
        <section className="py-20 px-4" style={{ background: '#0A0F1A' }}>
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
              Free valuation · No obligation · 24-hour response
            </div>

            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get Your Free Home Valuation
            </h2>
            <p
              className="mb-10 text-lg"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              We review your property and send a personalized valuation — plus a direct cash offer — within
              24 hours. Zero pressure, zero obligation.
            </p>

            <LeadForm />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4" style={{ background: '#0F1E3C' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-semibold text-white text-center mb-10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map(faq => (
                <div
                  key={faq.question}
                  className="rounded-xl p-5"
                  style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3
                    className="font-semibold text-white mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
