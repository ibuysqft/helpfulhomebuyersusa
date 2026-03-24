import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'cash-offer-vs-listing-agent-virginia'
const TITLE = 'Cash Offer vs. Listing With an Agent in Virginia: Which Is Better?'
const DESCRIPTION =
  'A cash offer closes faster with zero commissions but typically for 10-15% less than market value. A listing agent gets more money but takes 60-90 days and costs 5-6% in commissions.'

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
      name: 'How much less is a cash offer than market value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cash offers are typically 10-15% below full market value. However, after factoring in zero agent commissions (5-6%), zero repair costs, zero holding costs, and zero closing costs for the seller, the net difference is often only 3-7% less than what you would pocket from a traditional listing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do cash buyers pay closing costs in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most cash home buying companies pay all closing costs in Virginia, including settlement fees, title search, recording fees, and transfer taxes. The seller typically pays nothing at closing beyond the agreed sale price deductions for any liens or mortgages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to sell to a cash buyer or list with an agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your priorities. If you need speed, certainty, and convenience (foreclosure, probate, major repairs needed, divorce, relocation), a cash buyer is better. If your home is in good condition, you have a flexible timeline, and maximizing sale price is your top priority, listing with an agent will likely net you more money.',
      },
    },
  ],
}

export default function CashOfferVsListingPage() {
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
              A cash offer closes faster and with zero commissions, but
              typically for 10-15% less than full market value. A listing
              agent gets you more money but takes 60-90 days and costs 5-6%
              in commissions. Here is a detailed comparison.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Cash Offer: Pros and Cons</h2>
            <p>
              Selling to a cash buyer means a direct sale with no
              intermediaries, no financing contingencies, and no need to
              prepare the home for showings.
            </p>
            <p><strong>Pros:</strong></p>
            <ul>
              <li>Close in 7-21 days</li>
              <li>No agent commissions (saving 5-6% of sale price)</li>
              <li>Sell as-is — no repairs, cleaning, or staging</li>
              <li>No risk of buyer financing falling through</li>
              <li>Seller typically pays zero closing costs</li>
              <li>Certainty of sale once the offer is accepted</li>
            </ul>
            <p><strong>Cons:</strong></p>
            <ul>
              <li>Offer is typically 10-15% below full market value</li>
              <li>Less competitive bidding than open market</li>
              <li>You need to vet the buyer to ensure they are legitimate</li>
            </ul>

            <h2>Listing With an Agent: Pros and Cons</h2>
            <p>
              Listing on the MLS exposes your home to the broadest pool of
              buyers, which typically drives the highest sale price.
            </p>
            <p><strong>Pros:</strong></p>
            <ul>
              <li>Maximum exposure to buyers (MLS, Zillow, Realtor.com)</li>
              <li>Competitive bidding can drive price above asking</li>
              <li>Professional marketing and negotiation</li>
            </ul>
            <p><strong>Cons:</strong></p>
            <ul>
              <li>5-6% in agent commissions ($12,500-$15,000 on a $250K home)</li>
              <li>60-90 days average timeline (listing + closing)</li>
              <li>Repair costs after inspection (often $2,000-$10,000+)</li>
              <li>Showings, open houses, and keeping the home presentable</li>
              <li>Risk of deals falling through (financing, inspection, appraisal)</li>
              <li>Ongoing holding costs (mortgage, insurance, taxes, utilities)</li>
            </ul>

            <h2>Break-Even Analysis: $250,000 Virginia Home</h2>
            <p>
              Here is a side-by-side comparison of net proceeds for a home
              with a fair market value of $250,000:
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cash Offer</th>
                    <th>Agent Listing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sale price</td>
                    <td>$215,000</td>
                    <td>$250,000</td>
                  </tr>
                  <tr>
                    <td>Agent commissions (5.5%)</td>
                    <td>$0</td>
                    <td>-$13,750</td>
                  </tr>
                  <tr>
                    <td>Closing costs</td>
                    <td>$0 (buyer pays)</td>
                    <td>-$5,000</td>
                  </tr>
                  <tr>
                    <td>Repairs / concessions</td>
                    <td>$0</td>
                    <td>-$5,000</td>
                  </tr>
                  <tr>
                    <td>Holding costs (3 months)</td>
                    <td>$0</td>
                    <td>-$4,500</td>
                  </tr>
                  <tr>
                    <td><strong>Net proceeds</strong></td>
                    <td><strong>$215,000</strong></td>
                    <td><strong>$221,750</strong></td>
                  </tr>
                  <tr>
                    <td>Timeline</td>
                    <td>7-14 days</td>
                    <td>60-90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              In this example, the net difference is only $6,750 (2.7%) — not
              the $35,000 (14%) gap the headline numbers suggest. And the
              cash offer delivers that money 2-3 months sooner.
            </p>

            <h2>When a Cash Offer Makes Sense</h2>
            <ul>
              <li>
                <strong>Facing foreclosure:</strong> You need to close before
                the trustee sale date.
              </li>
              <li>
                <strong>Major repairs needed:</strong> The home would not pass
                a buyer&apos;s inspection or bank appraisal.
              </li>
              <li>
                <strong>Probate or estate sale:</strong> You want to settle
                the estate quickly without managing a listing.
              </li>
              <li>
                <strong>Divorce:</strong> Both parties want a clean,
                fast separation of assets.
              </li>
              <li>
                <strong>Job relocation:</strong> You need to move and
                cannot wait 3 months for a sale.
              </li>
              <li>
                <strong>Tax liens or code violations:</strong> Traditional
                buyers may be scared off by title complications.
              </li>
            </ul>

            <h2>When Listing With an Agent Makes Sense</h2>
            <ul>
              <li>
                <strong>Move-in ready home:</strong> Your home is updated and
                will show well to retail buyers.
              </li>
              <li>
                <strong>Strong seller&apos;s market:</strong> Low inventory
                and high demand in your area.
              </li>
              <li>
                <strong>Flexible timeline:</strong> You can wait 60-90 days
                and handle showings and negotiations.
              </li>
              <li>
                <strong>Maximizing price is the top priority:</strong> You
                have no urgency and want every dollar.
              </li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>How much less is a cash offer than market value?</h3>
            <p>
              Cash offers are typically 10-15% below full market value.
              However, after factoring in zero agent commissions (5-6%), zero
              repair costs, zero holding costs, and zero closing costs for
              the seller, the net difference is often only 3-7% less than
              what you would pocket from a traditional listing.
            </p>

            <h3>Do cash buyers pay closing costs in Virginia?</h3>
            <p>
              Most cash home buying companies pay all closing costs in
              Virginia, including settlement fees, title search, recording
              fees, and transfer taxes. The seller typically pays nothing at
              closing beyond the agreed sale price deductions for any liens
              or mortgages.
            </p>

            <h3>Is it better to sell to a cash buyer or list with an agent?</h3>
            <p>
              It depends on your priorities. If you need speed, certainty,
              and convenience — such as facing foreclosure, probate, major
              repairs, divorce, or relocation — a cash buyer is better. If
              your home is in good condition, you have a flexible timeline,
              and maximizing sale price is your top priority, listing with an
              agent will likely net you more money.
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Want to compare your options?
              </p>
              <p className="text-slate-300 mb-4">
                Get a no-obligation cash offer in 24 hours and see the
                numbers for yourself.
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
                  href="/guides/what-is-arv-real-estate"
                  className="text-blue-400 hover:text-blue-300"
                >
                  What Is ARV in Real Estate?
                </Link>
              </li>
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
                  href="/guides/how-long-does-selling-house-take-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  How Long Does It Take to Sell a House in Virginia?
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
