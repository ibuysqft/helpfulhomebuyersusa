import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

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

export default function ForeclosurePage() {
  return (
    <DistressedLandingPage
      persona="Foreclosure"
      headline="Facing Foreclosure? We Can Help."
      subheadline="Get a cash offer before your foreclosure date. No judgment, no fees."
      empathyText="We've helped over 200 homeowners facing foreclosure sell their home fast and protect their credit. You don't have to lose everything to the bank. One phone call can change the entire outcome — and we're here to answer it."
      heroCtaText="Get My Cash Offer →"
      trustPoints={TRUST_POINTS}
      faqItems={FAQ_ITEMS}
    />
  )
}
