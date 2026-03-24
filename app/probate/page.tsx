import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Sell a Probate House Fast in Virginia | Cash Offer in 24 Hours',
  description:
    "Selling a house in probate doesn't have to take months. We buy probate properties in Virginia as-is, work with the executor, and close on your timeline.",
  alternates: {
    canonical: 'https://www.helpfulhomebuyersusa.com/probate',
  },
  openGraph: {
    title: 'Sell a Probate House Fast in Virginia | Cash Offer in 24 Hours',
    description:
      "Selling a house in probate doesn't have to take months. We buy probate properties in Virginia as-is, work with the executor, and close on your timeline.",
    url: 'https://www.helpfulhomebuyersusa.com/probate',
    type: 'website',
  },
}

const TRUST_POINTS = [
  'We work directly with executors, estate attorneys, and the court process',
  'No repairs, no cleanout — we buy the property exactly as-is',
  'Cash offer in 24 hours, close in as few as 14 days after authorization',
  'We pay all closing costs — zero out-of-pocket for the estate',
]

const FAQ_ITEMS = [
  {
    question: 'Can you sell a house while it\'s in probate?',
    answer:
      'Yes — in Virginia, an executor can sell estate property during probate with court approval or under an independent administration clause. We handle the paperwork and work on your timeline.',
  },
  {
    question: 'How long does selling a probate house take?',
    answer:
      'With a cash buyer, 2\u20134 weeks after executor authorization. Traditional listings can take 6\u201312 months once probate clears.',
  },
  {
    question: 'Do we need to clean out the house first?',
    answer:
      "No. We buy probate properties exactly as-is, including all contents. Leave whatever you don't want.",
  },
  {
    question: 'What if there are multiple heirs?',
    answer:
      'We work with all parties. All heirs or their representatives sign the purchase agreement.',
  },
]

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Probate Property Cash Home Buying — Virginia',
  description:
    'We buy properties going through probate in Virginia as-is, work directly with the executor or estate attorney, and close without court delays.',
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
  url: 'https://www.helpfulhomebuyersusa.com/probate',
}

export default function ProbatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <DistressedLandingPage
        persona="Probate"
        headline="Sell a Probate Property Fast — No Court Delays"
        subheadline="We buy probate properties in Virginia as-is, work with the executor, and close on your timeline."
        empathyText="Navigating probate is stressful enough without worrying about selling real estate. We work with executors and estate attorneys every week — we know the process, the paperwork, and the timelines. One call and we handle the rest so you can focus on settling the estate."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
    </>
  )
}
