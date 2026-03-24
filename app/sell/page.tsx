import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Sell Your House Fast for Cash | Helpful Home Buyers USA',
  description: 'Get a cash offer in 24 hours. Any condition, any situation. No repairs, no fees, no agents. Close in as little as 7 days.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'Buy as-is — any condition, zero repairs required',
  'We pay all closing costs — zero fees, zero commissions',
  'Close in 7 days or on your schedule',
  'No agents, no open houses, no strangers walking through your home',
]

const FAQ_ITEMS = [
  {
    question: 'How do you determine your cash offer?',
    answer: 'We look at your property\'s location, size, condition, and recent comparable sales in the area. We give a fair, transparent offer — and we always explain how we got there.',
  },
  {
    question: 'Is there any obligation when I request an offer?',
    answer: 'Zero. Getting an offer is completely free and there is no pressure to accept. Many sellers just want to know their options — that\'s totally fine with us.',
  },
  {
    question: 'What types of properties do you buy?',
    answer: 'Single-family homes, multi-family, condos, townhouses, vacant land, and rental properties — in any condition, anywhere in our service area.',
  },
  {
    question: 'Can I still sell if I owe more than the house is worth?',
    answer: 'Possibly. We can discuss short sale options with your lender. Call us and we\'ll walk through your specific situation at no charge.',
  },
]

export default function SellPage() {
  return (
    <DistressedLandingPage
      persona="Generic"
      headline="Sell Your House Fast for Cash"
      subheadline="Any condition. Any situation. Cash offer in 24 hours."
      empathyText="Whether you're moving, downsizing, dealing with a difficult property, or just ready for a change — we make selling simple. No repairs, no showings, no waiting. We give you a fair cash offer and close on your schedule."
      heroCtaText="Get My Cash Offer →"
      trustPoints={TRUST_POINTS}
      faqItems={FAQ_ITEMS}
    />
  )
}
