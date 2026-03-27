import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Sell Your House Behind on Mortgage Payments in Virginia | Stop Foreclosure',
  description:
    'Behind on your mortgage in Virginia? Sell fast for cash before the bank files foreclosure. We close in 7\u201314 days and you keep any equity above what\'s owed.',
  alternates: {
    canonical: 'https://www.helpfulhomebuyersusa.com/behind-payments',
  },
  openGraph: {
    title: 'Sell Your House Behind on Mortgage Payments in Virginia | Stop Foreclosure',
    description:
      'Behind on your mortgage in Virginia? Sell fast for cash before the bank files foreclosure. We close in 7\u201314 days and you keep any equity above what\'s owed.',
    url: 'https://www.helpfulhomebuyersusa.com/behind-payments',
    type: 'website',
  },
}

const TRUST_POINTS = [
  'Close in 7\u201314 days — before the bank files foreclosure',
  'You keep any equity above what\u2019s owed on the mortgage',
  'We coordinate directly with your lender for a clean payoff',
  'No fees, no commissions, no out-of-pocket costs',
]

const FAQ_ITEMS = [
  {
    question: 'How many payments can I be behind before losing my house?',
    answer:
      'In Virginia, foreclosure can begin after 120 days of missed payments. Selling to a cash buyer before the foreclosure sale is the fastest way to protect your equity and credit.',
  },
  {
    question: 'Will selling stop the foreclosure?',
    answer:
      'Yes. Once you accept a cash offer and open escrow, you can typically stop the foreclosure process. We move fast — often closing in 7\u201314 days.',
  },
  {
    question: 'What if I owe more than the house is worth?',
    answer:
      "That's a short sale situation. We work with short sales as well — contact us and we'll evaluate your options.",
  },
  {
    question: 'Do I keep any money after selling?',
    answer:
      "Yes, if the sale price exceeds your mortgage payoff + back payments + closing costs, you receive the difference. We're transparent — you'll see the full breakdown before signing.",
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
  name: 'Pre-Foreclosure Cash Home Buying — Virginia',
  description:
    'We buy Virginia homes from homeowners behind on mortgage payments — close before the bank files foreclosure, stop the clock, and walk away with your remaining equity.',
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
  url: 'https://www.helpfulhomebuyersusa.com/behind-payments',
}

export default function BehindPaymentsPage() {
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
        persona="Behind on Payments"
        headline="Behind on Mortgage Payments? Sell Fast Before Foreclosure"
        subheadline="We close in 7\u201314 days and you keep any equity above what's owed. No fees, no judgment."
        empathyText="Missing mortgage payments is terrifying — the letters, the phone calls, the fear of losing your home. We've helped hundreds of homeowners in this exact situation sell fast, pay off the lender, and walk away with cash in hand. The sooner you call, the more options you have."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
