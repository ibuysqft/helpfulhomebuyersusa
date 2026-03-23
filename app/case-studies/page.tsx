import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { supabase } from '@/lib/supabase'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Real Seller Stories | Case Studies | ${siteConfig.name}`,
  description: `Read real stories from Virginia homeowners we helped — foreclosure, probate, divorce, inherited homes, tax liens, and more. See how fast we actually close and what sellers walk away with.`,
  alternates: { canonical: `${siteConfig.url}/case-studies` },
}

const SITUATION_LABELS: Record<string, string> = {
  foreclosure: 'Foreclosure',
  probate: 'Probate',
  divorce: 'Divorce',
  inherited: 'Inherited Home',
  'tax-lien': 'Tax Lien',
  vacant: 'Vacant Property',
  'rental-burnout': 'Landlord Burnout',
  'behind-on-payments': 'Behind on Payments',
}

const SITUATION_COLORS: Record<string, string> = {
  foreclosure: '#DC2626',
  probate: '#7C3AED',
  divorce: '#2563EB',
  inherited: '#059669',
  'tax-lien': '#D97706',
  vacant: '#6B7280',
  'rental-burnout': '#DB2777',
  'behind-on-payments': '#DC2626',
}

const REGION_CITIES: Record<string, string[]> = {
  nova: ['Alexandria', 'Fairfax', 'Manassas', 'Woodbridge', 'Herndon', 'Reston', 'Arlington', 'Vienna', 'Burke', 'Springfield'],
  richmond: ['Richmond', 'Henrico', 'Chesterfield', 'Midlothian', 'Glen Allen', 'Mechanicsville', 'Fredericksburg'],
  'hampton-roads': ['Norfolk', 'Virginia Beach', 'Chesapeake', 'Newport News', 'Hampton', 'Suffolk', 'Portsmouth'],
}

type CaseStudy = {
  id: string
  slug: string
  city: string
  state: string
  situation: string
  headline: string
  days_to_close: number | null
  seller_net: number | null
  offer_vs_list_pct: number | null
  property_type: string | null
  challenge: string
  testimonial: string | null
}

function getRegion(city: string): string {
  for (const [region, cities] of Object.entries(REGION_CITIES)) {
    if (cities.some(c => c.toLowerCase() === city.toLowerCase())) return region
  }
  return 'other'
}

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ situation?: string; region?: string }>
}) {
  const { situation, region } = await searchParams

  const { data: allStudies } = await supabase
    .from('case_studies')
    .select('id, slug, city, state, situation, headline, days_to_close, seller_net, offer_vs_list_pct, property_type, challenge, testimonial')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const studies: CaseStudy[] = allStudies ?? []

  const filtered = studies.filter(s => {
    if (situation && s.situation !== situation) return false
    if (region && region !== 'all') {
      const r = getRegion(s.city)
      if (r !== region) return false
    }
    return true
  })

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteConfig.url}/case-studies` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="py-16 px-4"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}
            >
              Real Stories
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold italic text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Virginia Homeowners We've Helped
            </h1>
            <p
              className="text-lg text-blue-100 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              These are real sellers — real situations, real timelines, real numbers. No stock photos, no invented testimonials.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 px-4 border-b" style={{ borderColor: 'var(--color-border)', background: '#fff' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              Filter by:
            </span>

            {/* Situation filter */}
            <form method="GET" action="/case-studies" className="flex flex-wrap gap-2 items-center">
              <input type="hidden" name="region" value={region ?? 'all'} />
              <select
                name="situation"
                defaultValue={situation ?? ''}
                className="text-sm px-3 py-1.5 rounded-lg border"
                style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
                onChange={(e) => {
                  const form = e.currentTarget.form
                  if (form) form.submit()
                }}
              >
                <option value="">All Situations</option>
                {Object.entries(SITUATION_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </form>

            {/* Region filter */}
            <form method="GET" action="/case-studies" className="flex flex-wrap gap-2 items-center">
              <input type="hidden" name="situation" value={situation ?? ''} />
              {[
                { val: 'all', label: 'All Virginia' },
                { val: 'nova', label: 'Northern VA' },
                { val: 'richmond', label: 'Richmond' },
                { val: 'hampton-roads', label: 'Hampton Roads' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  type="submit"
                  name="region"
                  value={val}
                  className="text-sm px-3 py-1.5 rounded-lg border transition-colors"
                  style={{
                    borderColor: (region ?? 'all') === val ? '#2563EB' : 'var(--color-border)',
                    background: (region ?? 'all') === val ? '#EFF6FF' : '#fff',
                    color: (region ?? 'all') === val ? '#2563EB' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {label}
                </button>
              ))}
            </form>

            {(situation || (region && region !== 'all')) && (
              <Link
                href="/case-studies"
                className="text-sm"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                Clear filters ×
              </Link>
            )}
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-5xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                  No case studies match those filters yet.{' '}
                  <Link href="/case-studies" style={{ color: '#2563EB' }}>Clear filters</Link>
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(study => (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {/* Situation badge bar */}
                    <div
                      className="h-1.5"
                      style={{ background: SITUATION_COLORS[study.situation] ?? '#6B7280' }}
                    />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${SITUATION_COLORS[study.situation] ?? '#6B7280'}18`,
                            color: SITUATION_COLORS[study.situation] ?? '#6B7280',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {SITUATION_LABELS[study.situation] ?? study.situation}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                        >
                          {study.city}, VA
                        </span>
                      </div>

                      {/* Headline */}
                      <h2
                        className="text-base font-semibold mb-3 leading-snug"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                      >
                        {study.headline}
                      </h2>

                      {/* Key stats */}
                      <div className="flex gap-4 mt-auto pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        {study.days_to_close && (
                          <div>
                            <p
                              className="text-xl font-bold"
                              style={{ color: '#2563EB', fontFamily: 'var(--font-heading)' }}
                            >
                              {study.days_to_close}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                            >
                              days to close
                            </p>
                          </div>
                        )}
                        {study.seller_net && (
                          <div>
                            <p
                              className="text-xl font-bold"
                              style={{ color: '#16A34A', fontFamily: 'var(--font-heading)' }}
                            >
                              ${study.seller_net.toLocaleString()}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                            >
                              seller received
                            </p>
                          </div>
                        )}
                        {study.property_type && (
                          <div className="ml-auto">
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                            >
                              {study.property_type}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-16 px-4 text-center"
          style={{ background: '#0F1E3C' }}
        >
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            In a similar situation?
          </h2>
          <p
            className="text-slate-300 mb-8 max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Get a no-obligation cash offer within 24 hours. We handle the paperwork — you choose the timeline.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/property-information"
              className="font-bold px-8 py-4 rounded-lg text-slate-900 min-h-[44px] flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#FCD34D', fontFamily: 'var(--font-body)' }}
            >
              Get My Cash Offer →
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
