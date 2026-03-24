import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'what-is-arv-real-estate'
const TITLE = 'What Is ARV in Real Estate? (After Repair Value Explained)'
const DESCRIPTION =
  'ARV (After Repair Value) is the estimated market value of a property after all necessary repairs and updates are completed. Cash buyers and investors use ARV to calculate maximum offer prices.'

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
      name: 'What does ARV stand for in real estate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARV stands for After Repair Value. It is the estimated fair market value of a property after all renovations and repairs have been completed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is ARV different from current market value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Current market value reflects what a home is worth right now in its present condition. ARV reflects what the home would be worth after it has been fully renovated and updated to match comparable recently sold homes in the area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentage of ARV do cash buyers typically pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most cash buyers and investors use the 70% rule: they offer up to 70% of the ARV minus estimated repair costs. For example, if the ARV is $300,000 and repairs cost $50,000, the offer would be around $160,000 (70% of $300,000 minus $50,000).',
      },
    },
  ],
}

export default function ArvGuidePage() {
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
              ARV is the estimated market value of a property after all
              necessary repairs and updates are completed. Cash buyers and
              investors use ARV to calculate maximum offer prices and determine
              whether a deal makes financial sense.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>How ARV Is Calculated</h2>
            <p>
              The ARV formula is straightforward: <strong>ARV = Current
              As-Is Value + Value Added by Renovations</strong>. To determine
              ARV, appraisers and investors look at recently sold comparable
              properties (comps) in the same neighborhood that have already
              been renovated to a similar standard.
            </p>
            <p>
              For example, if similar updated 3-bedroom homes in your
              neighborhood have sold for $280,000 to $310,000 in the last 90
              days, the ARV of your home after renovation would be
              approximately $295,000.
            </p>

            <h2>Why ARV Matters to Home Sellers</h2>
            <p>
              Even if you never plan to renovate, understanding ARV helps you
              evaluate offers from cash buyers and investors. It shows what
              your home <em>could</em> be worth if it were fully updated,
              which gives context to why a cash offer might be lower than the
              renovated market value.
            </p>
            <p>
              Sellers who understand ARV are better positioned to negotiate
              because they can see the gap between the as-is value and the
              post-renovation value, and understand that the buyer is assuming
              the risk and cost of renovations.
            </p>

            <h2>How Cash Buyers Use ARV</h2>
            <p>
              Most cash buyers and real estate investors use the{' '}
              <strong>70% rule</strong>: they offer up to 70% of the ARV
              minus estimated repair costs. This margin accounts for
              renovation expenses, holding costs, financing, and profit.
            </p>
            <p>
              The formula looks like this:{' '}
              <strong>
                Maximum Offer = (ARV x 0.70) - Estimated Repair Costs
              </strong>
            </p>
            <p>
              Some buyers are more aggressive at 75% of ARV for properties in
              strong markets or with lower renovation needs, while others are
              more conservative at 65% for high-risk projects.
            </p>

            <h2>ARV vs. As-Is Value</h2>
            <p>
              The <strong>as-is value</strong> is what your home is worth
              right now, in its current condition, without any repairs or
              updates. The <strong>ARV</strong> is what it would be worth
              after a full renovation.
            </p>
            <ul>
              <li>
                <strong>As-is value:</strong> Based on current condition.
                This is what a cash buyer is purchasing.
              </li>
              <li>
                <strong>ARV:</strong> Based on projected post-renovation
                condition. This is what the buyer expects to sell it for
                after fixing it up.
              </li>
            </ul>
            <p>
              The difference between these two numbers is the renovation
              budget plus the investor&apos;s margin.
            </p>

            <h2>Example ARV Calculation</h2>
            <p>Here is a real-world example using a Virginia property:</p>
            <ul>
              <li>Comparable renovated homes sold for: $290,000 - $310,000</li>
              <li>Estimated ARV: $300,000</li>
              <li>Estimated repair costs: $45,000 (new roof, kitchen, bathrooms, paint, flooring)</li>
              <li>
                Investor offer using the 70% rule: ($300,000 x 0.70) -
                $45,000 = <strong>$165,000</strong>
              </li>
            </ul>
            <p>
              If the current as-is value of the home is $160,000 to
              $175,000, this offer falls right in the expected range. The
              seller avoids paying for repairs, commissions, and months of
              waiting.
            </p>

            <h2>Frequently Asked Questions</h2>

            <h3>What does ARV stand for?</h3>
            <p>
              ARV stands for After Repair Value. It is the estimated fair
              market value of a property after all renovations and repairs
              have been completed.
            </p>

            <h3>How is ARV different from market value?</h3>
            <p>
              Current market value reflects what a home is worth in its
              present condition. ARV reflects what the home would be worth
              after it has been fully renovated and updated to match
              comparable recently sold homes in the area.
            </p>

            <h3>What percentage of ARV do cash buyers pay?</h3>
            <p>
              Most cash buyers offer 65% to 75% of the ARV minus estimated
              repair costs. The most common benchmark is the 70% rule. This
              accounts for renovation costs, holding costs, and the
              investor&apos;s profit margin.
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Want to know what your Virginia home is worth as-is?
              </p>
              <p className="text-slate-300 mb-4">
                Get a no-obligation cash offer in 24 hours. No repairs, no
                agent commissions, no hidden fees.
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
                  href="/guides/cash-offer-vs-listing-agent-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Cash Offer vs. Listing With an Agent in Virginia
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
