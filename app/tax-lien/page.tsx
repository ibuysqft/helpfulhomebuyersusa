import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Sell a House With Tax Liens or Code Violations in Virginia | We Handle It All',
  description:
    'Behind on property taxes or hit with code violations in Virginia? We buy houses with delinquent tax liens and city citations — we pay off everything at closing and you walk away clean.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'We pay off all delinquent property taxes at closing — you owe nothing upfront',
  'Avoid a county tax sale and protect your remaining equity',
  'Cash offer in 24 hours, close in as few as 7 days',
  'We handle all title issues and tax payoff coordination with the county',
  'Code violations and city liens paid off at closing — no upfront resolution required',
  'We work with Virginia localities directly — Arlington, Fairfax, Norfolk, Richmond, Chesapeake',
]

const FAQ_ITEMS = [
  {
    question: 'Can you sell a house with unpaid property taxes?',
    answer:
      "Yes. We buy houses with delinquent taxes. The back taxes are paid off from the sale proceeds at closing — you don't need to come up with cash upfront.",
  },
  {
    question: 'What is a tax lien sale in Virginia?',
    answer:
      'When property taxes go unpaid, Virginia localities can place a lien on the property and eventually force a tax sale. Selling to a cash buyer before the tax sale avoids losing the property entirely.',
  },
  {
    question: 'How much back taxes can you help with?',
    answer:
      "We've purchased homes with $5K to over $50K in back taxes. As long as there's equity in the property, we can make it work.",
  },
  {
    question: 'How fast can you close?',
    answer:
      'As fast as 7 days. We order the tax payoff amount from the county and pay it directly at closing.',
  },
  {
    question: 'I have code violation notices from the city — can I still sell?',
    answer:
      "Yes. Code violations don't stop a cash sale. We buy properties with open city citations regularly. The violation payoff or remediation costs are factored into our offer — you don't have to fix anything before closing.",
  },
  {
    question: 'What if the city has already scheduled an inspection or hearing?',
    answer:
      "Contact us immediately. We move fast — sometimes faster than city timelines. In many cases we can get under contract and close before an inspection becomes a larger enforcement issue. The sooner you reach out, the more options you have.",
  },
]

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tax Lien Property Cash Home Buying — Virginia',
  description:
    'We buy Virginia homes with delinquent property taxes and tax liens — we pay off all back taxes at closing so you walk away free and clear.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: 'https://www.helpfulhomebuyersusa.com',
  },
  areaServed: {
    '@type': 'State',
    name: 'Virginia',
  },
  serviceType: 'Cash Home Buying',
  url: 'https://www.helpfulhomebuyersusa.com/tax-lien',
}

export default function TaxLienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <DistressedLandingPage
        persona="Tax Lien"
        headline="Delinquent Taxes or Code Violations? We Buy Anyway."
        subheadline="We pay off back taxes and city liens at closing — you walk away clean. Cash offer in 24 hours."
        empathyText="Falling behind on property taxes or racking up code violations can spiral fast — penalties, interest, city fines, and eventually a forced tax sale or condemnation that wipes out your equity. We buy these properties every month across Virginia. We coordinate directly with the county and city, pay off everything owed at closing, and move fast so you keep what's yours."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
