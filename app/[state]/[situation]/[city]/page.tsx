import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
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

// Keep in sync with hub page — same 10 situations
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

const SITUATION_BULLETS: Record<TopSituation, string[]> = {
  foreclosure: [
    'Cash offer within 24 hours — stop the auction clock',
    'We can close before your foreclosure date',
    'Protect your credit — avoid a foreclosure record',
    'No repairs, no showings, no commissions',
  ],
  inherited: [
    'Cash offer within 24 hours — even during probate',
    'We work with estate attorneys and executors',
    "Buy as-is — leave whatever you don't want",
    'Close in as few as 14 days after executor authorization',
  ],
  divorce: [
    'Fast sale removes the shared asset dispute',
    'Both parties can agree on the net proceeds split',
    'No agents, no delays — close in 7 days',
    'We coordinate with both attorneys if needed',
  ],
  probate: [
    'We pay probate attorney fees at closing',
    'Works with open and pending probate cases',
    'Heirs split the net proceeds — no delays',
    'Close in as few as 14 days after executor auth',
  ],
  'behind-payments': [
    'Cash offer before your next missed payment',
    'Stops the foreclosure process immediately',
    'We pay off all back payments at closing',
    'Close in 7 days or your timeline',
  ],
  'tax-lien': [
    'We pay off all delinquent property taxes at closing',
    'Stops county tax sale or seizure',
    'No out-of-pocket costs to you',
    "Any amount of back taxes — we've seen it all",
  ],
  'fire-damage': [
    'Buy as-is — no repairs, no cleanup required',
    'We handle all city permits and code issues',
    'Cash offer based on land value and repair cost',
    'Close in 7 days after offer acceptance',
  ],
  vacant: [
    'Stop the carrying costs immediately',
    'We handle utilities shutoff and winterization',
    'Buy as-is — no cleanup required',
    'Close in 7 days or your timeline',
  ],
  'tired-landlord': [
    'Buy with tenants in place — no evictions needed',
    'We handle the tenant transition ourselves',
    'Cash offer in 24 hours, close in 7 days',
    'No repairs between tenancies required',
  ],
  'code-violations': [
    'We buy with open code violations — no cures needed',
    'We handle city and county resolution after closing',
    'We buy condemned properties too',
    'Cash offer in 24 hours',
  ],
}

// Pre-render top 20 cities per state × all 10 situations
// Pre-render only the 3 highest-traffic cities per state; the rest are ISR (dynamicParams = true)
const TOP_CITIES_PER_STATE = 3

interface Props {
  params: Promise<{ state: string; situation: string; city: string }>
}

// Allow ISR generation for cities beyond the top 20
export const dynamicParams = true

export async function generateStaticParams() {
  return registeredStates.flatMap(state => {
    const cities = getCitiesForState(state.slug).slice(0, TOP_CITIES_PER_STATE)
    return TOP_SITUATIONS.flatMap(situation =>
      cities.map(city => ({ state: state.slug, situation, city: city.slug })),
    )
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, situation: situationSlug, city: citySlug } = await params
  const stateObj = registeredStates.find(s => s.slug === stateSlug)
  if (!stateObj) return {}
  const cities = getCitiesForState(stateSlug)
  const cityObj = cities.find(c => c.slug === citySlug)
  if (!cityObj) return {}
  const situationLabel = SITUATION_LABELS[situationSlug as TopSituation]
  const content = getStateContent(stateSlug, situationSlug)
  const cityIntro = content?.cityIntros[citySlug]
  const description = cityIntro
    ? `${cityIntro.slice(0, 152)}...`
    : `We buy ${situationLabel.toLowerCase()} houses in ${cityObj.name}, ${cityObj.county}. Cash offer in 24 hours. Close in 7 days.`
  return {
    title: `Sell Your ${situationLabel} House Fast in ${cityObj.name}, ${stateObj.abbr} | Helpful Home Buyers USA`,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${stateSlug}/${situationSlug}/${citySlug}`,
    },
    openGraph: {
      title: `Sell Your ${situationLabel} House in ${cityObj.name}, ${stateObj.abbr}`,
      description,
      url: `${siteConfig.url}/${stateSlug}/${situationSlug}/${citySlug}`,
      type: 'website',
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, situation: situationSlug, city: citySlug } = await params
  const stateObj = registeredStates.find(s => s.slug === stateSlug)
  if (!stateObj || !TOP_SITUATIONS.includes(situationSlug as TopSituation)) {
    notFound()
  }
  const cities = getCitiesForState(stateSlug)
  const cityObj = cities.find(c => c.slug === citySlug)
  if (!cityObj) notFound()

  const situationLabel = SITUATION_LABELS[situationSlug as TopSituation]
  const bullets = SITUATION_BULLETS[situationSlug as TopSituation]
  const content = getStateContent(stateSlug, situationSlug)
  const cityIntro = content?.cityIntros[citySlug]
  const stateConfig = {
    name: stateObj.name,
    abbr: stateObj.abbr,
    slug: stateSlug,
    isNational: false,
    markets: [cityObj.name],
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    siteUrl: siteConfig.url,
    tagline: `We buy houses fast in ${cityObj.name}, ${stateObj.abbr}.`,
  }
  const faqs = getHomepageFaqs(stateConfig)

  // Nearby cities — exclude current city, take up to 3
  const nearbyCities = cities
    .filter(c => c.county === cityObj.county && c.slug !== citySlug)
    .slice(0, 3)

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: `${cityObj.name}, ${stateObj.name}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${situationLabel} in ${stateObj.name}`,
        item: `${siteConfig.url}/${stateSlug}/${situationSlug}`,
      },
      { '@type': 'ListItem', position: 3, name: cityObj.name },
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
                {cityObj.county} · {stateObj.name}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Sell Your {situationLabel} House Fast in{' '}
                <span className="text-amber-400">{cityObj.name}</span>
              </h1>
              {cityIntro && (
                <p className="text-slate-300 text-lg">{cityIntro}</p>
              )}
              {!cityIntro && content?.legalBlock && (
                <p className="text-slate-300 text-lg">{content.legalBlock}</p>
              )}
              {!cityIntro && !content?.legalBlock && (
                <p className="text-slate-300 text-lg">
                  We buy {situationLabel.toLowerCase()} houses in {cityObj.name},{' '}
                  {cityObj.county}. Cash offer in 24 hours, close in 7 days.
                </p>
              )}
              <ul className="space-y-2 text-slate-300">
                {bullets.map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      aria-hidden={true}
                      className="text-amber-400 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
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
        <HowItWorks />
        <FaqSection faqs={faqs} title="Frequently Asked Questions" />

        {/* Internal links */}
        <section className="py-12 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-slate-400 text-sm text-center">
              <Link
                href={`/${stateSlug}/${situationSlug}`}
                className="text-amber-400 hover:underline"
              >
                See all {stateObj.name} {situationLabel} resources →
              </Link>
            </p>
            {nearbyCities.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {nearbyCities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/${stateSlug}/${situationSlug}/${city.slug}`}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    We also buy {situationLabel.toLowerCase()} houses in {city.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
