import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'Facing Foreclosure? We Can Help. | Helpful Home Buyers USA',
  description: 'Get a cash offer before your foreclosure date. We\'ve helped over 200 homeowners stop foreclosure and protect their credit. No judgment, no fees.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'We can close in as few as 7 days — before your foreclosure date',
  'Selling pays off the mortgage and stops the foreclosure process',
  'No judgment — we\'ve seen every situation',
  'We pay all closing costs — zero out-of-pocket for you',
]

const FAQ_ITEMS = [
  {
    question: 'Can you really close before my foreclosure date?',
    answer: 'Yes. We can close in as few as 7 days if needed. Tell us your auction date or deadline and we\'ll work around it. The sooner you contact us, the more options we have.',
  },
  {
    question: 'Will selling stop the foreclosure process?',
    answer: 'Once the sale closes, the mortgage is paid off in full and the foreclosure stops. We handle all the paperwork and coordinate directly with your lender to ensure a clean closing.',
  },
  {
    question: 'What if I owe more than the house is worth?',
    answer: 'We can still help. We work with lenders on short sales and can connect you with resources for your specific situation. Call us — many homeowners are surprised by what\'s possible.',
  },
  {
    question: 'Will this affect my credit score?',
    answer: 'A completed sale is far less damaging to your credit than a completed foreclosure. Many sellers are able to protect most of their credit by selling before the auction date.',
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
  name: `Foreclosure Cash Home Buying — ${siteConfig.stateName}`,
  description:
    `We buy houses facing foreclosure in ${siteConfig.stateName} fast — stop the auction, avoid credit damage, close in days.`,
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
  url: `${siteConfig.url}/foreclosure`,
}

export default function ForeclosurePage() {
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
        persona="Foreclosure"
        headline="Facing Foreclosure? We Can Help."
        subheadline="Get a cash offer before your foreclosure date. No judgment, no fees."
        empathyText="We've helped over 200 homeowners facing foreclosure sell their home fast and protect their credit. You don't have to lose everything to the bank. One phone call can change the entire outcome — and we're here to answer it."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
        <section className="py-12 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          We Buy Foreclosure Houses in All 15 States
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {registeredStates.map(state => (
            <Link
              key={state.slug}
              href={`/${state.slug}/foreclosure`}
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
