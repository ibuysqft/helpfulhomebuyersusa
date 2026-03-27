import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'Need to Sell During Divorce? | Helpful Home Buyers USA',
  description: 'Fast, simple, clean. Cash offer within 24 hours. No repairs, no agents, close when you\'re ready. We make the property side of divorce simple.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'One fair cash offer removes the negotiation stress entirely',
  'Close in 14–30 days or faster — we work around court dates',
  'We pay all closing costs — zero out-of-pocket',
  'Confidential and professional — we\'ve done this hundreds of times',
]

const FAQ_ITEMS = [
  {
    question: 'Can we sell even if we don\'t agree on a listing price?',
    answer: 'We give one fair offer based on the property\'s actual market value. Many couples find this removes the negotiation stress entirely — there\'s nothing to argue about. If you both agree to accept, we handle everything from there.',
  },
  {
    question: 'How fast can you close?',
    answer: 'Typically 14–30 days, or faster if the situation requires it. We work around your court dates, settlement timeline, and attorney schedules. Just tell us what you need.',
  },
  {
    question: 'Do both parties need to sign?',
    answer: 'Yes, all owners on title must agree to and sign the sale documents. If communication between parties is difficult, your attorneys can coordinate — we work with legal teams regularly.',
  },
  {
    question: 'What if the mortgage is behind due to the divorce?',
    answer: 'We buy properties with delinquent mortgages regularly. The sale proceeds pay off the outstanding balance at closing. Call us to discuss your specific situation.',
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

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `Divorce Cash Home Buying — ${siteConfig.stateName}`,
  description:
    `Fast, discreet cash sale for ${siteConfig.stateName} homes going through divorce — one offer, split the proceeds.`,
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: siteConfig.url,
  },
  areaServed: {
    '@type': 'State',
    name: siteConfig.stateName,
  },
  serviceType: 'Cash Home Buying',
  url: `${siteConfig.url}/divorce`,
}

export default function DivorscePage() {
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
        persona="Divorce"
        headline="Need to Sell During Divorce?"
        subheadline="Fast, simple, clean. Cash offer within 24 hours. Close when you're ready."
        empathyText="Dividing a shared home is one of the hardest parts of divorce. We make the property side simple so you can focus on moving forward. No showings, no repairs, no months of uncertainty — just a fair offer and a clean closing on your timeline."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
        <section className="py-12 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          We Buy Divorce Houses in All 15 States
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {registeredStates.map(state => (
            <Link
              key={state.slug}
              href={`/${state.slug}/divorce`}
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
