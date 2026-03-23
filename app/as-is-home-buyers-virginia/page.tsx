import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `As-Is Home Buyers Virginia | We Buy Houses in Any Condition | ${siteConfig.name}`,
  description: `Sell your Virginia house as-is for cash. No repairs, no cleaning, no showings. Fair cash offer in 24 hours from Helpful Home Buyers USA.`,
  alternates: { canonical: `${siteConfig.url}/as-is-home-buyers-virginia` },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Helpful Home Buyers USA',
  description: 'We buy Virginia houses as-is for cash. No repairs, no cleaning, no showings required.',
  url: siteConfig.url,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Virginia',
  },
  priceRange: '$$',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I sell my house as-is in Virginia without making repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We buy houses in any condition in Virginia — foundation issues, roof damage, fire damage, outdated kitchens, hoarder situations, code violations, and more. You do not need to make a single repair or even clean the property before selling.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much less will I get for selling my Virginia house as-is?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the repair scope. When you factor in the cost of repairs, carrying costs while the work is done, and deal uncertainty, selling as-is to a cash buyer often results in a comparable or better net than a traditional listing that requires you to fix everything first.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I sell my Virginia house as-is?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We can close in as little as 7 days. Once you submit your property details, we provide a cash offer within 24 hours. You choose the closing date — we work around your schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to be present for showings or inspections?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There are no public showings, open houses, or buyer inspections that require repairs. We do a quick walkthrough to confirm the condition and that is it — no contingencies, no demands to fix anything.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of property damage do you buy in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We buy properties with foundation problems, roof damage, water or fire damage, mold, pest damage, code violations, outdated systems, hoarder conditions, unfinished renovations, and more. If it is in Virginia, we will make an offer regardless of condition.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Sell As-Is in Virginia', item: `${siteConfig.url}/as-is-home-buyers-virginia` },
  ],
}

const conditions = [
  'Foundation problems', 'Roof damage or leaks', 'Fire or water damage',
  'Outdated electrical or plumbing', 'Mold or structural issues', 'Hoarder or damaged property',
  'Code violations or liens', 'Unfinished renovations', 'Pest or termite damage',
  'Tenant-occupied properties', 'Storm or flood damage', 'Condemned or distressed',
]

const processSteps = [
  {
    step: '1',
    title: 'Submit Your Property',
    description: 'Fill out our short form or call (703) 940-1159. Tell us the address and basic condition — that is all we need to get started.',
  },
  {
    step: '2',
    title: 'Get Your Cash Offer in 24 Hours',
    description: 'We research your property and send a no-obligation cash offer within one business day. No repairs required before the offer.',
  },
  {
    step: '3',
    title: 'Pick Your Closing Date',
    description: 'Accept the offer and choose a closing date that works for you. We can close in as little as 7 days or wait until you are ready.',
  },
  {
    step: '4',
    title: 'Get Paid — Leave What You Want',
    description: 'Close at a local title company and walk away with cash. Leave behind anything you do not want to move — furniture, junk, all of it.',
  },
]

const faqs = [
  {
    question: 'Can I sell my house as-is in Virginia without making repairs?',
    answer: 'Yes. We buy houses in any condition in Virginia — foundation issues, roof damage, fire damage, outdated kitchens, hoarder situations, code violations, and more. You do not need to make a single repair or even clean the property before selling.',
  },
  {
    question: 'How much less will I get for selling my Virginia house as-is?',
    answer: 'It depends on the repair scope. When you factor in the cost of repairs, carrying costs during renovations, and deal uncertainty, many sellers net more by selling as-is to a cash buyer than going through the traditional listing process that requires fixing everything first.',
  },
  {
    question: 'How fast can I sell my Virginia house as-is?',
    answer: 'We can close in as little as 7 days. Once you submit your property details, we provide a cash offer within 24 hours. You choose the closing date — we work around your schedule.',
  },
  {
    question: 'Do I need to be present for showings or inspections?',
    answer: 'No. There are no public showings, open houses, or buyer inspections that demand repairs. We do a quick walkthrough to confirm the condition and that is it — no contingencies, no fix-it lists.',
  },
  {
    question: 'What types of property damage do you buy in Virginia?',
    answer: 'We buy properties with foundation problems, roof damage, water or fire damage, mold, pest damage, code violations, outdated systems, hoarder conditions, unfinished renovations, and more. If it is in Virginia, we will make an offer regardless of condition.',
  },
]

export default function AsIsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              We Buy Virginia Houses As-Is — Any Condition, Any Situation
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Sell your Virginia house as-is for cash. No repairs, no cleaning, no showings. Get a fair cash offer in 24 hours and close on your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/property-information"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center min-h-[44px] flex items-center justify-center"
              >
                Get My As-Is Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg text-center min-h-[44px] flex items-center justify-center"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* What "As-Is" means */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Does Selling a House &ldquo;As-Is&rdquo; Mean?</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Selling a house as-is means you are selling it in its current condition — no repairs, no upgrades, no staging. The buyer accepts the property exactly as it sits today, defects and all.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              When you sell to Helpful Home Buyers USA, <strong>as-is is not a negotiating tactic — it is literally how we buy every home.</strong> We account for the property&apos;s condition in our offer upfront. There are no inspection contingencies, no repair addendums, and no last-minute demands after the walkthrough.
            </p>
            <p className="text-slate-700 leading-relaxed">
              That means you can stop worrying about what the buyer might find and start planning your move forward.
            </p>
          </div>
        </section>

        {/* Conditions we accept */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">We Buy Virginia Houses in Any Condition</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {conditions.map(c => (
                <div key={c} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-green-600 font-bold text-lg" aria-hidden="true">&#10003;</span>
                  <span className="text-slate-700 text-sm">{c}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-sm">
              Not sure if your property qualifies? Call us at{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-blue-600 font-semibold hover:underline">
                {siteConfig.phoneDisplay}
              </a>{' '}
              — if it is in Virginia, we will make an offer.
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">How to Sell Your Virginia House As-Is in 4 Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map(s => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Situations / internal links */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Situations We Help With</h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Homeowners choose to sell as-is for many reasons. Whatever your situation, we have helped Virginia homeowners in every one of these circumstances:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li><Link href="/foreclosure-help-virginia" className="text-blue-600 hover:underline text-sm">Facing foreclosure in Virginia</Link></li>
              <li><Link href="/inherited-help-virginia" className="text-blue-600 hover:underline text-sm">Inherited a house you do not want to fix up</Link></li>
              <li><Link href="/fire-damage-help-virginia" className="text-blue-600 hover:underline text-sm">Fire or water damage — too costly to repair</Link></li>
              <li><Link href="/divorce-help-virginia" className="text-blue-600 hover:underline text-sm">Going through a divorce and need a fast sale</Link></li>
              <li><Link href="/tired-landlord-help-virginia" className="text-blue-600 hover:underline text-sm">Tired landlord with a rundown rental property</Link></li>
              <li><Link href="/probate-help-virginia" className="text-blue-600 hover:underline text-sm">Probate or estate sale with deferred maintenance</Link></li>
              <li><Link href="/tax-lien-help-virginia" className="text-blue-600 hover:underline text-sm">Behind on property taxes with mounting liens</Link></li>
              <li><Link href="/behind-payments-help-virginia" className="text-blue-600 hover:underline text-sm">Behind on mortgage payments</Link></li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map(faq => (
                <div key={faq.question} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-700 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Skip the Repairs — Get Your As-Is Cash Offer Today</h2>
            <p className="text-blue-100 mb-6">No obligation. No pressure. Just a fair cash offer within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/property-information"
                className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-50 min-h-[44px] flex items-center justify-center"
              >
                Get My Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-blue-600 border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 min-h-[44px] flex items-center justify-center"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
