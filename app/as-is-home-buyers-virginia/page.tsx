import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Sell Your House As-Is in Virginia — No Repairs Needed | ${siteConfig.name}`,
  description: `We buy houses as-is in Virginia. No repairs, no cleaning, no inspections. Get a fair cash offer in 24 hours. Call (703) 940-1159.`,
  alternates: { canonical: `${siteConfig.url}/as-is-home-buyers-virginia` },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Sell As-Is', item: `${siteConfig.url}/as-is-home-buyers-virginia` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I sell my house as-is in Virginia without making repairs?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We buy houses in any condition in Virginia — foundation issues, roof damage, fire damage, outdated kitchens, hoarder situations, code violations, and more. You do not need to make a single repair or even clean the property before selling.' },
        },
        {
          '@type': 'Question',
          name: 'How much less will I get for selling my house as-is?',
          acceptedAnswer: { '@type': 'Answer', text: 'It depends on the repair scope. When you factor in the cost of repairs, carrying costs while the work is done, and the uncertainty of the outcome, selling as-is to a cash buyer often results in a comparable or better net than a traditional listing.' },
        },
      ],
    },
  ],
}

const conditions = [
  'Foundation problems', 'Roof damage or leaks', 'Fire or water damage',
  'Outdated electrical or plumbing', 'Mold or structural issues', 'Hoarder or damaged property',
  'Code violations or liens', 'Unfinished renovations', 'Pest or termite damage',
  'Tenant-occupied properties',
]

export default function AsIsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen">
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Sell Your Virginia House As-Is — We Buy in Any Condition
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              No repairs. No cleaning. No inspections. We make a fair cash offer on your Virginia home exactly as it sits today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center">
                Get My As-Is Cash Offer
              </Link>
              <a href="tel:7039401159" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg text-center">
                Call (703) 940-1159
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">We Buy Houses in Any Condition</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {conditions.map(c => (
                <div key={c} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-green-600 font-bold">&#10003;</span>
                  <span className="text-slate-700 text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Can I sell my house as-is in Virginia without making repairs?</h3>
                <p className="text-slate-700">Yes. We buy houses in any condition in Virginia — foundation issues, roof damage, fire damage, outdated kitchens, hoarder situations, code violations, and more. You do not need to make a single repair before selling.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">How much less will I get for selling as-is?</h3>
                <p className="text-slate-700">When you factor in repair costs, carrying costs during renovations, and deal uncertainty, many sellers net more by selling as-is to a cash buyer than going through the traditional listing process with required repairs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-blue-700 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Skip the Repairs — Get Your As-Is Offer Today</h2>
            <p className="text-blue-100 mb-6">No obligation. No pressure. Just a fair cash offer within 24 hours.</p>
            <Link href="/" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-50">
              Get My Cash Offer
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
