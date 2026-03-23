import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { supabase } from '@/lib/supabase'
import { siteConfig } from '@/config/site'

export const revalidate = 86400

interface Props { params: Promise<{ slug: string }> }

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
  story: string
  challenge: string
  solution: string
  outcome: string
  testimonial: string | null
  created_at: string
}

async function getStudy(slug: string): Promise<CaseStudy | null> {
  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data ?? null
}

async function getRelated(study: CaseStudy): Promise<CaseStudy[]> {
  // Same situation first, then same city region
  const { data } = await supabase
    .from('case_studies')
    .select('id, slug, city, state, situation, headline, days_to_close, seller_net, offer_vs_list_pct, property_type, story, challenge, solution, outcome, testimonial, created_at')
    .eq('published', true)
    .neq('id', study.id)
    .eq('situation', study.situation)
    .limit(3)

  if ((data ?? []).length >= 2) return data ?? []

  // Fall back to any other published study
  const { data: fallback } = await supabase
    .from('case_studies')
    .select('id, slug, city, state, situation, headline, days_to_close, seller_net, offer_vs_list_pct, property_type, story, challenge, solution, outcome, testimonial, created_at')
    .eq('published', true)
    .neq('id', study.id)
    .limit(3)

  return fallback ?? []
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true)
  const slugs = (data ?? []).map(s => ({ slug: s.slug }))
  return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getStudy(slug)
  if (!study) return {}
  return {
    title: `${study.headline} | ${siteConfig.name}`,
    description: study.challenge.substring(0, 155),
    alternates: { canonical: `${siteConfig.url}/case-studies/${slug}` },
    openGraph: {
      type: 'article',
      title: study.headline,
      description: study.challenge.substring(0, 155),
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = await getStudy(slug)
  if (!study) notFound()

  const related = await getRelated(study)

  const situationLabel = SITUATION_LABELS[study.situation] ?? study.situation
  const accentColor = SITUATION_COLORS[study.situation] ?? '#2563EB'

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.headline,
    description: study.challenge.substring(0, 155),
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/case-studies/${slug}` },
    datePublished: study.created_at,
  }

  const reviewSchema = study.testimonial
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        reviewBody: study.testimonial,
        author: { '@type': 'Person', name: `${study.city}, VA homeowner` },
        itemReviewed: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: study.headline, item: `${siteConfig.url}/case-studies/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main>
        {/* Hero */}
        <section
          className="py-16 px-4"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0F1E3C 100%)' }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-sm mb-4">
              <Link
                href="/case-studies"
                className="hover:underline"
                style={{ color: '#93C5FD', fontFamily: 'var(--font-body)' }}
              >
                ← Case Studies
              </Link>
            </div>

            {/* Situation + location badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${accentColor}25`, color: accentColor, fontFamily: 'var(--font-body)' }}
              >
                {situationLabel}
              </span>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {study.city}, {study.state}
              </span>
              {study.property_type && (
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {study.property_type}
                </span>
              )}
            </div>

            <h1
              className="text-3xl md:text-4xl font-semibold italic text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {study.headline}
            </h1>

            {/* Key metrics bar */}
            <div className="flex flex-wrap gap-6 py-5 px-6 rounded-xl bg-white/10 border border-white/20">
              {study.days_to_close && (
                <div>
                  <p
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {study.days_to_close}
                  </p>
                  <p
                    className="text-sm text-blue-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    days to close
                  </p>
                </div>
              )}
              {study.seller_net && (
                <div>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: '#4ADE80', fontFamily: 'var(--font-heading)' }}
                  >
                    ${study.seller_net.toLocaleString()}
                  </p>
                  <p
                    className="text-sm text-blue-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    seller received
                  </p>
                </div>
              )}
              {study.offer_vs_list_pct && (
                <div>
                  <p
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {study.offer_vs_list_pct}%
                  </p>
                  <p
                    className="text-sm text-blue-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    of list value
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 px-4" style={{ background: '#fff' }}>
          <div className="max-w-3xl mx-auto">
            <div
              className="prose max-w-none"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
            >
              {study.story.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge / Solution / Outcome */}
        <section className="py-12 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Challenge */}
            <div className="bg-white rounded-xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#FEF2F2' }}
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2
                className="text-sm font-bold uppercase tracking-wide mb-2"
                style={{ color: '#DC2626', fontFamily: 'var(--font-body)' }}
              >
                The Challenge
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
              >
                {study.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-white rounded-xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#EFF6FF' }}
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2
                className="text-sm font-bold uppercase tracking-wide mb-2"
                style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}
              >
                Our Approach
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
              >
                {study.solution}
              </p>
            </div>

            {/* Outcome */}
            <div className="bg-white rounded-xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#F0FDF4' }}
              >
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2
                className="text-sm font-bold uppercase tracking-wide mb-2"
                style={{ color: '#16A34A', fontFamily: 'var(--font-body)' }}
              >
                The Outcome
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
              >
                {study.outcome}
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {study.testimonial && (
          <section className="py-12 px-4" style={{ background: '#fff' }}>
            <div className="max-w-2xl mx-auto text-center">
              <svg
                className="w-8 h-8 mx-auto mb-4 opacity-30"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: accentColor }}
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote
                className="text-lg italic leading-relaxed mb-4"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{study.testimonial}&rdquo;
              </blockquote>
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                — {study.city}, VA homeowner · {situationLabel}
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          className="py-16 px-4"
          style={{ background: '#0F1E3C' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              In a similar situation?
            </h2>
            <p
              className="text-slate-300 mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Get a cash offer within 24 hours. No repairs, no agents, no obligation.
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
          </div>
        </section>

        {/* Related case studies */}
        {related.length > 0 && (
          <section className="py-12 px-4" style={{ background: '#F1F5F9' }}>
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                Similar Situations
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/case-studies/${rel.slug}`}
                    className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${SITUATION_COLORS[rel.situation] ?? '#6B7280'}18`,
                          color: SITUATION_COLORS[rel.situation] ?? '#6B7280',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {SITUATION_LABELS[rel.situation] ?? rel.situation}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                        {rel.city}, VA
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                    >
                      {rel.headline}
                    </p>
                    {rel.days_to_close && (
                      <p className="text-xs mt-2" style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}>
                        Closed in {rel.days_to_close} days
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
