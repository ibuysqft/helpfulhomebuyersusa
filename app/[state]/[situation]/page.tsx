import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { TrustBar } from '@/components/trust-bar'
import { HowItWorks } from '@/components/how-it-works'
import { FaqSection } from '@/components/faq-section'
import { siteConfig } from '@/config/site'
import { registeredStates } from '@/lib/state-context'
import { getCitiesForState } from '@/lib/state-data'
import { getHomepageFaqs } from '@/data/faqs'
import { getStateContent } from '@/data/state-content/registry'

const TOP_SITUATIONS = [
  'foreclosure',
  'inherited',
  'divorce',
  'probate',
  'behind-payments',
  'tax-lien',
  'fire-damage',
  'vacant',
  'tired-landlord',
  'code-violations',
] as const

type TopSituation = typeof TOP_SITUATIONS[number]

const SITUATION_LABELS: Record<TopSituation, string> = {
  foreclosure: 'Foreclosure',
  inherited: 'Inherited House',
  divorce: 'Divorce',
  probate: 'Probate',
  'behind-payments': 'Behind on Payments',
  'tax-lien': 'Tax Lien',
  'fire-damage': 'Fire Damage',
  vacant: 'Vacant Property',
  'tired-landlord': 'Tired Landlord',
  'code-violations': 'Code Violations',
}

interface Props {
  params: Promise<{ state: string; situation: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return registeredStates.flatMap(state =>
    TOP_SITUATIONS.map(situation => ({ state: state.slug, situation })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, situation: situationSlug } = await params
  const stateObj = registeredStates.find(s => s.slug === stateSlug)
  if (!stateObj) return {}
  const situationLabel = SITUATION_LABELS[situationSlug as TopSituation]
  const content = getStateContent(stateSlug, situationSlug)
  const description = content
    ? `${content.legalBlock.slice(0, 152)}...`
    : `We buy ${situationLabel.toLowerCase()} houses throughout ${stateObj.name}. Cash offer in 24 hours. Close in 7 days.`
  return {
    title: `Sell Your ${situationLabel} House Fast in ${stateObj.name} | Helpful Home Buyers USA`,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: `${siteConfig.url}/${stateSlug}/${situationSlug}` },
    openGraph: {
      title: `Sell Your ${situationLabel} House in ${stateObj.name} | Cash Offer`,
      description,
      url: `${siteConfig.url}/${stateSlug}/${situationSlug}`,
      type: 'website',
    },
  }
}

export default async function StateSituationHub({ params }: Props) {
  const { state: stateSlug, situation: situationSlug } = await params
  const stateObj = registeredStates.find(s => s.slug === stateSlug)
  if (!stateObj || !TOP_SITUATIONS.includes(situationSlug as TopSituation)) {
    notFound()
  }
  const situationLabel = SITUATION_LABELS[situationSlug as TopSituation]
  const cities = getCitiesForState(stateSlug)
  const content = getStateContent(stateSlug, situationSlug)
  const stateConfig = {
    name: stateObj.name,
    abbr: stateObj.abbr,
    slug: stateSlug,
    isNational: false,
    markets: [stateObj.name],
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    siteUrl: siteConfig.url,
  }
  const faqs = getHomepageFaqs(stateConfig)

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: stateObj.name,
    priceRange: '$$',
    description: `We buy ${situationLabel.toLowerCase()} houses throughout ${stateObj.name} for cash. No repairs, no commissions, close in 7 days or on your schedule.`,
    knowsAbout: [
      'Cash home buying',
      situationLabel,
      `Selling a house in ${stateObj.name}`,
      'As-is home sales',
      'Fast home sales',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: stateObj.name, item: `${siteConfig.url}/${stateSlug}/${situationSlug}` },
      { '@type': 'ListItem', position: 3, name: situationLabel },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">
                {situationLabel} · {stateObj.name}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Sell Your {situationLabel} House Fast in{' '}
                <span className="text-amber-400">{stateObj.name}</span>
              </h1>
              <p className="text-slate-300 text-lg">
                {content?.legalBlock ??
                  `We buy ${situationLabel.toLowerCase()} houses throughout ${stateObj.name}. Cash offer in 24 hours, close in 7 days or on your timeline.`}
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <LeadForm />
          </div>
        </section>

        <TrustBar />

        {/* Top cities we buy in */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Top Cities We Buy Houses In — {stateObj.name}
            </h2>
            <p className="text-slate-400 text-center mb-8">
              We buy houses for cash in every city across {stateObj.name}. Select yours for local details.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cities.slice(0, 8).map(city => (
                <Link
                  key={city.slug}
                  href={`/${stateSlug}/${situationSlug}/${city.slug}`}
                  className="bg-slate-700 hover:bg-amber-600 text-white px-4 py-3 rounded-lg text-sm text-center font-medium transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <p className="text-center mt-6">
              <Link
                href={`/${stateSlug}/${situationSlug}`}
                className="text-amber-400 hover:text-amber-300 text-sm underline underline-offset-4"
              >
                View all {stateObj.name} cities →
              </Link>
            </p>
          </div>
        </section>

        <HowItWorks />

        <FaqSection faqs={faqs} title="Frequently Asked Questions" />
      </main>
      <Footer />
    </>
  )
}
