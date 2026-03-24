import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Inherited a Property? We Make It Simple. | Helpful Home Buyers USA',
  description: 'Sell an inherited home fast. No repairs, no cleanup, cash offer in 24 hours. We\'ve helped hundreds of families close quickly with zero hassle.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'No cleanup required — take what you want and leave the rest',
  'We work with probate attorneys regularly',
  'Cash offer in 24 hours, close on your timeline',
  'We pay all closing costs — zero fees for the estate',
]

const FAQ_ITEMS = [
  {
    question: 'Do I need to clean out the house first?',
    answer: 'No. We buy properties as-is. Take what you want and leave the rest — furniture, personal items, everything. We handle the cleanout after closing at no cost to you.',
  },
  {
    question: 'What if the estate is still in probate?',
    answer: 'We work with probate attorneys regularly and understand the process. We can often close after probate is complete or help you navigate the timeline. Contact us early — the more lead time, the smoother the process.',
  },
  {
    question: 'Do all heirs need to agree to the sale?',
    answer: 'Yes, all owners on the title must agree to and sign the sale documents. We can help facilitate communication between family members if needed — it\'s something we handle often.',
  },
  {
    question: 'The house is in poor condition. Does that matter?',
    answer: 'Not to us. We buy inherited properties in any condition — outdated systems, deferred maintenance, hoarding situations, you name it. Our offer reflects the property as-is, with no surprise deductions at closing.',
  },
]

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Inherited Property Cash Home Buying — Virginia',
  description:
    'We buy inherited houses in Virginia in any condition — no repairs, no agents, no hassle.',
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
  url: 'https://www.helpfulhomebuyersusa.com/inherited',
}

export default function InheritedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <DistressedLandingPage
        persona="Inherited"
        headline="Inherited a Property? We Make It Simple."
        subheadline="Sell a loved one's home fast. No repairs, no cleanup, cash offer in 24 hours."
        empathyText="Dealing with an inherited property while grieving is overwhelming. The last thing you need is contractors, open houses, and months of uncertainty. We've helped hundreds of families close quickly, with no judgment and no hassle — so you can focus on what matters."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
