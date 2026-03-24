import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Done Being a Landlord? Sell Your Rental Property | Helpful Home Buyers USA',
  description: 'Sell your rental property as-is. We buy with tenants in place. No evictions, no repairs, cash offer in 24 hours.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'We buy with tenants in place — no evictions required',
  'Buy as-is — no repairs, no rehab, no cleanup',
  'Cash offer in 24 hours, close in 14–30 days',
  'We pay all closing costs — zero fees for you',
]

const FAQ_ITEMS = [
  {
    question: 'Do tenants have to leave before closing?',
    answer: 'No. We buy properties with tenants in place. We handle the tenant transition after closing — that\'s our responsibility, not yours. You walk away clean.',
  },
  {
    question: 'What if the property needs major repairs?',
    answer: 'We buy as-is. No repairs, no cleanup, no contractor bids. Our offer reflects the property\'s current condition — what you see is what we pay, with no surprise deductions at closing.',
  },
  {
    question: 'Can I sell multiple rental properties at once?',
    answer: 'Yes. We regularly buy portfolios from landlords who are exiting the business entirely. One conversation, one transaction, one closing — or separate closings if you prefer.',
  },
  {
    question: 'What if my tenant is behind on rent?',
    answer: 'It doesn\'t matter to us. We buy properties regardless of the tenant\'s payment status. The rental income situation is already factored into how we assess the property.',
  },
]

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tired Landlord Cash Home Buying — Virginia',
  description:
    'We buy Virginia rental properties from tired landlords — tenants in place, any condition.',
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
  url: 'https://www.helpfulhomebuyersusa.com/landlord',
}

export default function LandlordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <DistressedLandingPage
        persona="Landlord"
        headline="Done Being a Landlord?"
        subheadline="Sell your rental property as-is. We buy with tenants in place. No evictions required."
        empathyText="Problem tenants, maintenance headaches, vacancy stress, late-night emergency calls — we get it. We've bought hundreds of rental properties from landlords who were ready to move on. You don't have to evict anyone, fix anything, or deal with a single showing."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
