import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

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

export default function DivorscePage() {
  return (
    <DistressedLandingPage
      persona="Divorce"
      headline="Need to Sell During Divorce?"
      subheadline="Fast, simple, clean. Cash offer within 24 hours. Close when you're ready."
      empathyText="Dividing a shared home is one of the hardest parts of divorce. We make the property side simple so you can focus on moving forward. No showings, no repairs, no months of uncertainty — just a fair offer and a clean closing on your timeline."
      heroCtaText="Get My Cash Offer →"
      trustPoints={TRUST_POINTS}
      faqItems={FAQ_ITEMS}
    />
  )
}
