import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'Sell a Probate Property | National Cash Home Buyers for Estates',
  description: 'We buy probate properties nationwide — working directly with executors, estate attorneys, and the court process. Cash offer in 24 hours, close in as few as 14 days after executor authorization. Serving 15 states.',
  alternates: {
    canonical: `${siteConfig.url}/probate`,
  },
  openGraph: {
    title: 'Sell a Probate Property | National Cash Home Buyers for Estates',
    description: 'We buy probate properties in 15 states. Work directly with executors and estate attorneys. Cash offer in 24 hours.',
    url: `${siteConfig.url}/probate`,
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Probate Property Cash Home Buying — National',
  description: 'We buy probate and estate properties in 15 states, working with executors and estate attorneys. Cash offers, fast closings, no repairs.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: siteConfig.url,
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Probate Property Cash Home Buying',
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Probate Properties', item: `${siteConfig.url}/probate` },
  ],
}

const PROBATE_FAQS = [
  {
    question: 'Do I need probate to be complete before selling?',
    answer: "Not always. In many cases we can open escrow and even close during probate, with court approval. We work with your probate attorney.",
  },
  {
    question: 'Who pays the probate attorney fees?',
    answer: "We do — it comes out of the sale proceeds, so there's no out-of-pocket cost for the estate or heirs.",
  },
  {
    question: 'What if there are multiple heirs who disagree?',
    answer: "We've navigated contested estates before. We work with all parties and their counsel to reach agreement.",
  },
  {
    question: 'Does the property have to be cleaned out first?',
    answer: "No. We buy as-is. Leave whatever you don't want — furniture, clothing, belongings. We handle the rest.",
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PROBATE_FAQS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function ProbatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">Probate & Estate Sales</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Sell a Probate Property Fast —{' '}
                <span className="text-amber-400">No Court Delays</span>
              </h1>
              <p className="text-xl text-slate-300">
                Navigating probate is stressful enough without worrying about selling real estate. We work with executors and estate attorneys every week — we know the process, the paperwork, and the timelines. One call and we handle the rest.
              </p>
              <ul className="space-y-3 text-slate-300">
                {[
                  'We work directly with executors, estate attorneys, and the court process',
                  'No repairs, no cleanout — we buy the property exactly as-is',
                  'Cash offer in 24 hours, close in as few as 14 days after authorization',
                  'We pay all closing costs — zero out-of-pocket for the estate',
                  'Multiple heirs? We coordinate with all parties',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <LeadForm />
          </div>
        </section>

        {/* Types of probate explained */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">
              How Probate Affects a Real Estate Sale
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Independent Administration',
                  desc: 'In states like Texas and some others, the executor has broad authority to sell property without repeated court approval. This is the fastest path — we can close in 14–21 days after the executor signs.',
                },
                {
                  title: 'Supervised / Formal Administration',
                  desc: 'Many states require court approval of the sale. This adds 30–90 days for the court hearing process. We handle all required court submissions alongside your estate attorney.',
                },
                {
                  title: 'Summary or Small Estate',
                  desc: 'Smaller estates may qualify for simplified procedures (like Florida Summary Administration or Texas Muniment of Title) that transfer property faster without a full administration process.',
                },
              ].map(card => (
                <div key={card.title} className="bg-slate-900 rounded-xl p-6 space-y-3">
                  <h3 className="text-amber-400 font-bold text-lg">{card.title}</h3>
                  <p className="text-slate-400">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common questions */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Common Probate Sale Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can you sell a house while it\'s in probate?',
                  a: 'Yes — in most states, the executor or administrator can sell estate property once appointed by the court. Whether court approval is required for each sale varies by state and the terms of the will. We confirm the requirements in your specific state at the start of the process.',
                },
                {
                  q: 'Do all heirs have to agree?',
                  a: 'If the executor has authority under the estate\'s letters, they can typically proceed. However, heirs may have objection rights in some states. We help facilitate heir communication and work with your probate attorney to satisfy all legal requirements.',
                },
                {
                  q: 'Do we need to clean out the house?',
                  a: 'No. We buy probate properties exactly as-is, including all contents the estate does not want. Leave furniture, personal property, and debris — we handle cleanup after closing.',
                },
                {
                  q: 'How are sale proceeds handled in probate?',
                  a: 'Sale proceeds go into the estate account. The executor pays estate debts, taxes, and administration costs per the probate court\'s requirements, then distributes the balance to beneficiaries. We coordinate with the title company and your attorney to ensure proper accounting.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-slate-700 pb-6">
                  <h3 className="text-white font-semibold mb-2">{q}</h3>
                  <p className="text-slate-400">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State grid */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Probate Resources by State
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Select your state for state-specific probate laws, timelines, and how we can help.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {registeredStates.map(state => (
                <Link
                  key={state.slug}
                  href={`/probate-${state.slug}`}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 rounded-lg p-4 text-center transition-all"
                >
                  <span className="block text-amber-400 font-bold text-lg">{state.abbr}</span>
                  <span className="text-slate-300 text-sm">{state.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Get Your Probate Property Cash Offer Today
          </h2>
          <p className="text-slate-800 mb-6">
            No obligation. Response within 24 hours. We work with you and your estate attorney from start to close.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/property-information"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Get My Cash Offer
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
      <section className="py-12 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            We Buy Probate Properties in All 15 States
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {registeredStates.map(state => (
              <Link
                key={state.slug}
                href={`/${state.slug}/probate`}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
