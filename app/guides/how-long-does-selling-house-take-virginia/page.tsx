import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'how-long-does-selling-house-take-virginia'
const TITLE = 'How Long Does It Take to Sell a House in Virginia?'
const DESCRIPTION =
  'Selling a house in Virginia takes 60-90 days on average with a real estate agent. With a cash buyer, it takes 7-21 days. Here is a full timeline breakdown by method and region.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/guides/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: `${siteConfig.url}/guides/${SLUG}`,
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: '2025-03-24',
  dateModified: '2025-03-24',
  author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/guides/${SLUG}` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the average time to sell a house in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average time to sell a house in Virginia is 45-75 days on market to receive an offer, plus 30-45 days to close, for a total of approximately 75-120 days. In hot markets like Northern Virginia, homes sell faster (30-45 days total). In slower markets, it can take 90-150 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does closing take in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Closing in Virginia takes 30-45 days for a financed buyer (bank loan) and 7-21 days for a cash buyer. The closing process includes title search, lien resolution, deed preparation, and settlement through an attorney or title company.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the best time to sell a house in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time to sell a house in Virginia is late April through June. Spring and early summer see the highest buyer activity, shortest days on market, and highest sale prices. Homes listed in May sell an average of 15-20 days faster than homes listed in December or January.',
      },
    },
  ],
}

export default function HowLongToSellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm text-slate-400 mb-4">
              <Link href="/guides" className="hover:text-white">
                ← All Guides
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-6">{TITLE}</h1>
            <p className="text-xl text-slate-300">
              Selling a house in Virginia takes 60-90 days on average with a
              real estate agent (listing time plus closing). With a cash
              buyer, it takes 7-21 days from offer to keys.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Virginia Average Days on Market by Region</h2>
            <p>
              How long it takes to sell depends heavily on where your home is
              located. Here are approximate average days on market for
              Virginia&apos;s major regions:
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Avg. Days on Market</th>
                    <th>Total Days to Close</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Northern Virginia (NOVA)</td>
                    <td>15-30 days</td>
                    <td>45-75 days</td>
                  </tr>
                  <tr>
                    <td>Richmond Metro</td>
                    <td>25-40 days</td>
                    <td>55-85 days</td>
                  </tr>
                  <tr>
                    <td>Hampton Roads</td>
                    <td>30-50 days</td>
                    <td>60-95 days</td>
                  </tr>
                  <tr>
                    <td>Roanoke / Lynchburg</td>
                    <td>35-55 days</td>
                    <td>65-100 days</td>
                  </tr>
                  <tr>
                    <td>Rural Virginia</td>
                    <td>60-120 days</td>
                    <td>90-165 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              These numbers assume a properly priced listing in average
              condition. Overpriced homes or those needing significant repairs
              take substantially longer.
            </p>

            <h2>Traditional Listing Timeline (60-90 Days)</h2>
            <p>
              The full timeline for selling with a real estate agent in
              Virginia:
            </p>
            <ol>
              <li>
                <strong>Preparation (1-2 weeks):</strong> Repairs, cleaning,
                staging, professional photos, listing on MLS.
              </li>
              <li>
                <strong>Showings and offers (2-6 weeks):</strong> Buyers tour
                the home. You wait for and negotiate offers.
              </li>
              <li>
                <strong>Inspection (1-2 weeks):</strong> Buyer conducts a
                home inspection. Negotiations over repairs or price
                reductions.
              </li>
              <li>
                <strong>Appraisal (1-2 weeks):</strong> The buyer&apos;s
                lender orders an appraisal to confirm the home&apos;s value
                supports the loan amount.
              </li>
              <li>
                <strong>Underwriting and closing (2-3 weeks):</strong> Final
                loan approval, title work, and settlement at a Virginia
                attorney or title company.
              </li>
            </ol>

            <h2>Cash Sale Timeline (7-21 Days)</h2>
            <p>
              Selling to a cash buyer eliminates most of the traditional
              timeline:
            </p>
            <ol>
              <li>
                <strong>Day 1:</strong> Submit property information. Receive
                a cash offer within 24 hours.
              </li>
              <li>
                <strong>Days 2-3:</strong> Review and accept the offer. Sign
                the purchase agreement.
              </li>
              <li>
                <strong>Days 3-14:</strong> Title company conducts title
                search, prepares deed, and schedules settlement.
              </li>
              <li>
                <strong>Day 7-21:</strong> Close at the settlement
                attorney&apos;s office. Receive funds.
              </li>
            </ol>
            <p>
              No inspections, no appraisals, no buyer financing
              contingencies. The primary variable is how quickly the title
              search is completed.
            </p>

            <h2>Factors That Slow Down a Sale</h2>
            <ul>
              <li>
                <strong>Title issues:</strong> Liens, judgments, boundary
                disputes, or missing heirs can delay closing by weeks or
                months.
              </li>
              <li>
                <strong>Needed repairs:</strong> Homes with foundation,
                roof, or mold issues take longer to sell because many buyers
                and their lenders will not accept the risk.
              </li>
              <li>
                <strong>Overpricing:</strong> The number one reason homes sit
                on the market. Each price reduction resets buyer interest.
              </li>
              <li>
                <strong>Probate:</strong> Selling during probate requires
                executor appointment and potentially court approval.
              </li>
              <li>
                <strong>Tenant occupied:</strong> Properties with tenants add
                complexity around lease terms and access for showings.
              </li>
            </ul>

            <h2>How to Speed Up Your Sale</h2>
            <ul>
              <li>
                <strong>Price it right from day one.</strong> Homes priced at
                market value sell 3-5 times faster than overpriced homes.
              </li>
              <li>
                <strong>Get a pre-listing inspection.</strong> Identify and
                disclose issues upfront to avoid renegotiations.
              </li>
              <li>
                <strong>Sell to a cash buyer.</strong> Skip the entire
                listing, showing, inspection, and financing process.
              </li>
              <li>
                <strong>Offer a closing cost credit.</strong> Incentivize
                buyers to choose your home over competing listings.
              </li>
              <li>
                <strong>Be flexible on closing date.</strong> Accommodating
                the buyer&apos;s timeline makes your offer more attractive.
              </li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>What is the average time to sell a house in Virginia?</h3>
            <p>
              The average time to sell a house in Virginia is 45-75 days on
              market to receive an offer, plus 30-45 days to close, for a
              total of approximately 75-120 days. In hot markets like
              Northern Virginia, homes sell faster (30-45 days total). In
              slower markets, it can take 90-150 days.
            </p>

            <h3>How long does closing take in Virginia?</h3>
            <p>
              Closing in Virginia takes 30-45 days for a financed buyer
              (bank loan) and 7-21 days for a cash buyer. The closing process
              includes title search, lien resolution, deed preparation, and
              settlement through an attorney or title company.
            </p>

            <h3>When is the best time to sell a house in Virginia?</h3>
            <p>
              The best time to sell a house in Virginia is late April through
              June. Spring and early summer see the highest buyer activity,
              shortest days on market, and highest sale prices. Homes listed
              in May sell an average of 15-20 days faster than homes listed
              in December or January.
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Do not want to wait 60-90 days?
              </p>
              <p className="text-slate-300 mb-4">
                Get a cash offer in 24 hours and close in as few as 7 days.
              </p>
              <Link
                href="/property-information"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Get My Cash Offer
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Related Guides
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guides/how-to-sell-house-fast-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  How to Sell Your House Fast in Virginia
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/cash-offer-vs-listing-agent-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Cash Offer vs. Listing With an Agent in Virginia
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/stop-foreclosure-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  How to Stop Foreclosure in Virginia
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
