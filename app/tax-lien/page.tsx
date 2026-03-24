import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Sell a House With Property Tax Liens in Virginia | We Pay the Taxes',
  description:
    'Behind on property taxes in Virginia? We buy houses with delinquent tax liens — we pay off the back taxes at closing and you walk away clean.',
  alternates: {
    canonical: 'https://www.helpfulhomebuyersusa.com/tax-lien',
  },
  openGraph: {
    title: 'Sell a House With Property Tax Liens in Virginia | We Pay the Taxes',
    description:
      'Behind on property taxes in Virginia? We buy houses with delinquent tax liens — we pay off the back taxes at closing and you walk away clean.',
    url: 'https://www.helpfulhomebuyersusa.com/tax-lien',
    type: 'website',
  },
}

const TRUST_POINTS = [
  'We pay off all delinquent property taxes at closing — you owe nothing upfront',
  'Avoid a county tax sale and protect your remaining equity',
  'Cash offer in 24 hours, close in as few as 7 days',
  'We handle all title issues and tax payoff coordination with the county',
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
        headline="Sell Your House With Delinquent Property Taxes"
        subheadline="We pay off the back taxes at closing and you walk away clean. Cash offer in 24 hours."
        empathyText="Falling behind on property taxes can spiral fast — penalties, interest, and eventually a tax sale that wipes out your equity. We buy homes with delinquent taxes every month. We coordinate with the county, pay off everything owed, and close fast so you keep what's yours."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
