import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Cash Buyer vs Real Estate Agent: The Complete Comparison | ${siteConfig.name}`,
  description: `Should you sell to a cash buyer or list with an agent in Virginia? See the full side-by-side comparison — timeline, costs, certainty, and net proceeds. Call (703) 940-1159.`,
  alternates: { canonical: `${siteConfig.url}/sell-my-house-fast-vs-listing-with-agent` },
  openGraph: {
    type: 'article',
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Cash Buyer vs Agent', item: `${siteConfig.url}/sell-my-house-fast-vs-listing-with-agent` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is selling to a cash buyer better than using a real estate agent?',
          acceptedAnswer: { '@type': 'Answer', text: 'It depends on your priorities. Cash buyers offer speed and certainty — you close in 7–14 days with no repairs, no showings, and no agent commissions. A traditional listing may achieve a higher sale price but takes 60–90+ days, costs 6–8% in agent fees, and deals can fall through due to financing.' },
        },
        {
          '@type': 'Question',
          name: 'How much less will I get from a cash buyer compared to listing?',
          acceptedAnswer: { '@type': 'Answer', text: 'Cash offers are typically 80–90% of market value. However, when you subtract agent commissions (5–6%), closing costs (1–3%), repairs (varies), carrying costs (2–4%), and the time value of money, the net difference is often smaller than homeowners expect — sometimes just 5–10%.' },
        },
        {
          '@type': 'Question',
          name: 'Do I have to pay commissions when selling to a cash buyer?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. When you sell directly to a cash buyer like Helpful Home Buyers USA, there are no agent commissions, no closing costs, and no fees of any kind. The offer you receive is the amount you get at closing.' },
        },
      ],
    },
  ],
}

const comparison = [
  { feature: 'Time to Close', cash: '7–14 days', agent: '60–90+ days' },
  { feature: 'Sale Certainty', cash: '✓ Guaranteed', agent: '✗ Financing can fall through' },
  { feature: 'Agent Commission', cash: '$0', agent: '5–6% of sale price' },
  { feature: 'Closing Costs', cash: '$0 (we cover)', agent: '1–3% of sale price' },
  { feature: 'Repairs Required', cash: 'None — sell as-is', agent: 'Usually required for top dollar' },
  { feature: 'Showings & Open Houses', cash: 'None', agent: 'Multiple (can last weeks)' },
  { feature: 'Inspection Contingencies', cash: 'None', agent: 'Standard — can kill the deal' },
  { feature: 'Financing Contingencies', cash: 'None — all cash', agent: 'Standard — 20%+ of deals fall through' },
  { feature: 'Appraisal Required', cash: 'No', agent: 'Yes (lender requirement)' },
  { feature: 'Choose Your Close Date', cash: 'Yes — your timeline', agent: 'Depends on buyer' },
  { feature: 'Home Staging Required', cash: 'No', agent: 'Recommended' },
  { feature: 'Price Reductions', cash: 'Not applicable', agent: 'Common after 30+ days on market' },
]

export default function ComparisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen">
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Selling to a Cash Buyer vs. Listing with an Agent
            </h1>
            <p className="text-xl text-slate-300">
              The complete side-by-side comparison so you can make the right choice for your situation.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left p-4 font-semibold">Factor</th>
                    <th className="text-center p-4 font-semibold text-blue-300">Cash Buyer (Us)</th>
                    <th className="text-center p-4 font-semibold text-slate-400">Traditional Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="p-4 text-center text-green-700 font-semibold">{row.cash}</td>
                      <td className="p-4 text-center text-slate-500">{row.agent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When agent makes sense */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold text-green-700 mb-3">✓ Choose a Cash Buyer When...</h2>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• You need to close in days, not months</li>
                <li>• The property needs significant repairs</li>
                <li>• You&apos;re facing foreclosure, probate, or divorce</li>
                <li>• You want certainty — no deal falling through</li>
                <li>• You don&apos;t want showings or strangers in your home</li>
                <li>• You&apos;re relocating for work on a tight timeline</li>
                <li>• You inherited a property you don&apos;t want to manage</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold text-slate-700 mb-3">Consider an Agent When...</h2>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Your home is move-in ready and well-maintained</li>
                <li>• You have 3–6 months to wait for the right buyer</li>
                <li>• Maximizing sale price is your top priority</li>
                <li>• You&apos;re in a hot seller&apos;s market</li>
                <li>• You can manage showings and open houses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Is selling to a cash buyer better than using a real estate agent?</h3>
                <p className="text-slate-700 text-sm">It depends on your priorities. Cash buyers offer speed and certainty — you close in 7–14 days with no repairs, no showings, and no agent commissions. A traditional listing may achieve a higher sale price but takes 60–90+ days, costs 6–8% in fees, and deals frequently fall through due to financing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">How much less will I get from a cash buyer?</h3>
                <p className="text-slate-700 text-sm">Cash offers are typically 80–90% of market value. However, after subtracting agent commissions (5–6%), closing costs (1–3%), repairs, and carrying costs, the net difference is often just 5–10% — while you gain certainty, speed, and convenience.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Are there any fees or commissions with a cash buyer?</h3>
                <p className="text-slate-700 text-sm">No. When you sell to Helpful Home Buyers USA, there are zero agent commissions, zero closing costs, and zero fees. The offer is exactly what you receive at closing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-blue-700 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">See What Your Home Is Worth — No Obligation</h2>
            <p className="text-blue-100 mb-6">Get a fair cash offer in 24 hours and decide if it&apos;s right for you. No pressure, no commitment.</p>
            <Link href="/" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-50">
              Get My Cash Offer
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
