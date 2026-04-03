import { registeredStates } from '@/lib/state-context'
import Link from 'next/link'
import type { Metadata } from 'next'
import { DistressedLandingPage } from '@/components/distressed-landing-page'

export const metadata: Metadata = {
  title: 'Selling a Parent\'s Home for Assisted Living? We Make It Fast. | Helpful Home Buyers USA',
  description: 'Need to sell fast to fund assisted living or a care facility? We buy houses in any condition — cash offer in 24 hours, close in 7 days. Virginia, nationwide.',
  robots: { index: false, follow: false },
}

const TRUST_POINTS = [
  'Close in 7 days — fast enough for care facility deposit deadlines',
  'No repairs, no cleanout — leave belongings, we handle everything',
  'We work with families remotely — no need to fly in',
  'We pay all closing costs — zero fees out of pocket',
  'Sensitive, judgment-free process — we\'ve done this hundreds of times',
]

const FAQ_ITEMS = [
  {
    question: 'We need to move quickly to fund a care facility — how fast can you close?',
    answer: 'We can close in as few as 7 days once an offer is accepted. If you need a specific date to align with a facility\'s deposit deadline, just tell us — we work around your timeline, not ours.',
  },
  {
    question: 'My parent\'s home is full of belongings. Does it need to be cleaned out first?',
    answer: 'No. We buy the property as-is, contents and all. Take whatever is sentimental or valuable, and leave the rest — furniture, clothing, personal items. We coordinate the cleanout after closing at no cost to you.',
  },
  {
    question: 'There are multiple siblings involved. Do all of them need to agree?',
    answer: 'Yes — all owners on title must sign. If family members are in different states or there\'s disagreement, we\'ve navigated that before. We can work with each party separately and give everyone time to review the offer.',
  },
  {
    question: 'The home hasn\'t been updated in decades. Does condition affect the offer?',
    answer: 'We buy homes in any condition — dated kitchens, old systems, deferred maintenance, all of it. Our offer reflects the as-is value and there are no surprise deductions at closing.',
  },
  {
    question: 'My parent is still in the home during the process. How does that work?',
    answer: 'We can build flexibility into the timeline. We\'ll coordinate the closing date around when your parent transitions to their care facility so there\'s no overlap or stress.',
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
  name: 'Senior Transition Cash Home Buying — Virginia',
  description:
    'We buy Virginia homes for families transitioning a parent to assisted living or a care facility. Fast cash offers, flexible closing, no repairs or cleanout required.',
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
  url: 'https://www.helpfulhomebuyersusa.com/senior-transition',
}

export default function SeniorTransitionPage() {
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
        persona="Senior"
        headline="Selling a Parent's Home for Assisted Living?"
        subheadline="Fast cash sale so your family can focus on care — not logistics. Offer in 24 hours, close in 7 days."
        empathyText="Coordinating a parent's move to a care facility is already overwhelming. Selling their home on top of it — dealing with agents, showings, repairs, and months of uncertainty — shouldn't be part of it. We work with families in exactly this situation every month. We move fast, handle the details, and make sure you have the funds when the care facility needs them."
        heroCtaText="Get My Cash Offer →"
        trustPoints={TRUST_POINTS}
        faqItems={FAQ_ITEMS}
      />
      <section className="py-12 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            We Help Families Sell in All 15 States
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {registeredStates.map(state => (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
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
