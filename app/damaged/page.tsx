import Link from 'next/link'
import { registeredStates } from '@/lib/state-context'
import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'We Buy Damaged Houses As-Is | Helpful Home Buyers USA',
  description: 'Fire damage, mold, foundation issues — any condition. Cash offer in 24 hours. No repairs, no cleanup, no judgment.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'We specialize in damaged, distressed, and problem properties',
  'No repairs, no cleanup — we buy exactly as-is',
  'Cash offer in 24 hours regardless of condition',
  'We handle liens, code violations, and permit issues at closing',
]

const FAQ_ITEMS = [
  {
    question: 'Do I need to fix anything before selling?',
    answer: 'No. We buy the property exactly as it sits today. No repairs, no cleaning, no staging, no contractor visits. Our offer accounts for everything — we handle all of it after closing.',
  },
  {
    question: 'Will the damage significantly affect my offer?',
    answer: 'Our offer accounts for the property\'s current condition and the estimated cost to repair. We\'re always transparent about how we calculate offers — no surprises. Many sellers are pleasantly surprised by how fair the number is.',
  },
  {
    question: 'What if the property has liens or code violations?',
    answer: 'We buy properties with liens, code violations, and permit issues regularly. These get handled at closing — your attorney and our closing coordinator work through them together. You don\'t have to resolve them before the sale.',
  },
  {
    question: 'What kinds of damage do you buy?',
    answer: 'Fire and smoke damage, water and mold damage, foundation issues, roof failure, structural problems, vandalism, hoarding situations — we\'ve seen it all and bought it all. If it\'s a house, we\'ll make an offer.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ''

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Damaged Property Cash Home Buying — Virginia',
  description:
    'We buy fire and water damaged homes in Virginia as-is. No repairs needed.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: SITE_URL,
  },
  areaServed: {
    '@type': 'State',
    name: 'Virginia',
  },
  serviceType: 'Cash Home Buying',
  url: `${SITE_URL}/damaged`,
}

export default function DamagedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <DistressedLandingPage
        persona="Damaged"
        headline="We Buy Damaged Houses As-Is."
        subheadline="Fire damage, mold, foundation issues — any condition. Cash offer in 24 hours."
        empathyText="Most buyers won't touch a damaged property. We specialize in exactly these situations. No repairs, no cleanup, no judgment — just a fair cash offer based on what the property is worth today. We take on the risk and the work so you don't have to."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
        <section className="py-12 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          We Buy Fire-Damaged Houses in All 15 States
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {registeredStates.map(state => (
            <Link
              key={state.slug}
              href={`/${state.slug}/fire-damage`}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {state.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
