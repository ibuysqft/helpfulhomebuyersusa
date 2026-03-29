import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'Title Problems? We Buy Houses With Liens, Judgments & Title Issues',
  description: 'We buy houses with title problems — liens, judgments, IRS levies, missing heirs, HOA super liens, code violations, and more. Our attorneys cure title at no out-of-pocket cost to you. Serving 15 states.',
  alternates: {
    canonical: `${siteConfig.url}/curative-title`,
  },
  openGraph: {
    title: 'Title Problems? We Buy Houses With Liens, Judgments & Title Issues',
    description: 'We buy houses with title problems. Our attorneys cure title at no upfront cost to you. Serving 15 states.',
    url: `${siteConfig.url}/curative-title`,
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Curative Title Cash Home Buying',
  description: 'We buy houses with title defects — liens, judgments, missing heirs, IRS levies, code violations, and HOA super liens. Our attorneys cure title and we close without the seller paying legal fees upfront.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: siteConfig.url,
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Curative Title Cash Home Buying',
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Curative Title', item: `${siteConfig.url}/curative-title` },
  ],
}

const TITLE_TYPES = [
  { icon: '⚖️', label: 'Judgment Liens', desc: 'Court judgments recorded against the property owner that attach as liens to real estate.' },
  { icon: '🏛️', label: 'IRS & Federal Tax Liens', desc: 'IRS federal tax liens follow the property and must be subordinated or paid off at closing.' },
  { icon: '🔨', label: 'Mechanic\'s Liens', desc: 'Unpaid contractor or subcontractor claims filed after work on the property.' },
  { icon: '🏘️', label: 'HOA Super Liens', desc: 'HOA assessment liens that in some states take priority over the first mortgage.' },
  { icon: '🏚️', label: 'Code Violations & Open Permits', desc: 'Municipal code violations and unpermitted work that become clouds on title.' },
  { icon: '👥', label: 'Missing or Unknown Heirs', desc: 'Title defects from estates where some heirs were not located or signed off.' },
  { icon: '📄', label: 'Deed Defects', desc: 'Errors in prior deeds, missing notarizations, or improper legal descriptions.' },
  { icon: '💔', label: 'Divorce Decree Issues', desc: 'Community property disputes or incomplete transfer of marital property after divorce.' },
]

export default function CurativeTitlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">Curative Title</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Title Problems?{' '}
                <span className="text-amber-400">We Still Buy Your House</span>
              </h1>
              <p className="text-xl text-slate-300">
                Liens, judgments, missing heirs, IRS levies, HOA super liens — we have seen it all. Our in-house attorneys cure title defects at no out-of-pocket cost to you. We deduct legal fees from closing proceeds only.
              </p>
              <ul className="space-y-3 text-slate-300">
                {[
                  'Our attorneys resolve liens, judgments, and clouds on title',
                  'We pay all curative title legal fees upfront',
                  'Missing heirs, IRS liens, code violations — we handle it',
                  'You don\'t need to hire your own lawyer',
                  'Close after title is cleared — you still get your cash',
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

        {/* Title problem types */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Title Problems We Handle
            </h2>
            <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
              Most retail buyers and their lenders will walk away from title problems. We don&apos;t — we have the legal resources to resolve them.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {TITLE_TYPES.map(type => (
                <div key={type.label} className="bg-slate-900 rounded-xl p-5 space-y-2">
                  <span className="text-2xl">{type.icon}</span>
                  <h3 className="text-white font-semibold">{type.label}</h3>
                  <p className="text-slate-400 text-sm">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">
              How Our Curative Title Process Works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Free Title Review',
                  body: 'We order a preliminary title report and review all liens, judgments, and clouds on title. You pay nothing at this stage.',
                },
                {
                  step: '2',
                  title: 'We Make a Cash Offer',
                  body: 'We make a fair cash offer based on the as-is value of your property, accounting for the cost of resolving title issues. No lowballing — we show our work.',
                },
                {
                  step: '3',
                  title: 'Our Attorneys Cure the Title',
                  body: 'Our legal team negotiates with lienholders, files necessary court documents, and resolves all title defects. This is all handled at our expense.',
                },
                {
                  step: '4',
                  title: 'Close and Get Your Cash',
                  body: 'Once title is clear, we close — often within 14–60 days depending on complexity. Curative legal fees are deducted from closing proceeds; you receive the balance.',
                },
              ].map(item => (
                <div key={item.step} className="flex gap-5 items-start">
                  <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-400">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State resources */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Curative Title Resources by State
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Select your state for state-specific information on title laws, lien types, and how we can help.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {registeredStates.map(state => (
                <Link
                  key={state.slug}
                  href={`/title-issues-${state.slug}`}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 rounded-lg p-4 text-center transition-all"
                >
                  <span className="block text-amber-400 font-bold text-lg">{state.abbr}</span>
                  <span className="text-slate-300 text-sm">{state.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How long does curative title work take?',
                  a: 'Simple lien payoffs from sale proceeds close in 7–14 days. Missing heir searches, contested claims, or IRS Certificate of Discharge processes typically take 30–90 days. We give you an honest timeline on the first call.',
                },
                {
                  q: 'Do I need to pay for title attorneys upfront?',
                  a: 'No. We advance all curative title legal fees. You receive your agreed net proceeds at closing after fees are deducted. There are no out-of-pocket costs to you.',
                },
                {
                  q: 'Can you still close if I have an IRS federal tax lien?',
                  a: 'Yes. IRS tax liens require either a payoff at closing or a Certificate of Discharge from the IRS (which removes the lien from a specific property). We handle both paths.',
                },
                {
                  q: 'What if the title problem is too complex?',
                  a: 'We are transparent about what we can and cannot resolve. If a title issue is litigation-bound or involves a dispute we cannot cure, we will tell you — and we will never waste your time. In most cases, we find a path.',
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

        {/* CTA */}
        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Don&apos;t Let Title Problems Stop Your Sale
          </h2>
          <p className="text-slate-800 mb-6">
            Call us today or fill out our form. We&apos;ll review your title situation and give you a path forward — no obligation.
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
      <Footer />
    </>
  )
}
