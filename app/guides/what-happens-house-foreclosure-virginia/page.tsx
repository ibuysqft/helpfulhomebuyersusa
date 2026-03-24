import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'what-happens-house-foreclosure-virginia'
const TITLE = 'What Happens to Your House in Foreclosure in Virginia?'
const DESCRIPTION =
  'Virginia uses a non-judicial foreclosure process. Your lender can sell your home at public auction without going to court, typically 90-120 days after you stop making payments.'

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
      name: 'How long before foreclosure starts in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Virginia lenders begin the foreclosure process after 3-4 missed payments (90-120 days). Federal law requires a 120-day waiting period before filing the first foreclosure notice. After that, the trustee sale can be scheduled in as little as 14 days with proper notice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a lender sue you after foreclosure in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Virginia allows deficiency judgments. If your home sells at auction for less than what you owe on the mortgage, the lender can sue you for the difference (the deficiency). The lender has 5 years to file a deficiency judgment in Virginia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you buy back your house after foreclosure in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Virginia does not have a statutory right of redemption after a foreclosure sale. Once the trustee sale is completed and the deed is transferred, the former homeowner has no legal right to buy back the property. This is another reason to act before the auction date.',
      },
    },
  ],
}

export default function ForeclosureProcessPage() {
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
              Virginia uses a non-judicial foreclosure process — your lender
              can sell your home at public auction without going to court,
              typically 90-120 days after you stop making payments. Here is
              what happens at each step.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Virginia Foreclosure Process Step by Step</h2>
            <p>
              Virginia is a deed of trust state, meaning your mortgage
              involves three parties: you (the borrower), the lender, and a
              trustee. If you default, the trustee has the power to sell your
              home without going through the court system.
            </p>

            <h3>Step 1: Missed Payments (Day 1-90)</h3>
            <p>
              After your first missed payment, the lender will contact you by
              mail and phone. Most lenders do not begin formal foreclosure
              proceedings until you are 3-4 months behind. During this period,
              you may still be able to reinstate the loan by paying all missed
              payments plus late fees.
            </p>

            <h3>Step 2: Notice of Default / Breach Letter (Day 90-120)</h3>
            <p>
              The lender sends a formal breach letter requiring you to cure
              the default within 30 days. This letter must include the
              amount needed to bring the loan current and information about
              loss mitigation options. Federal law (CFPB Regulation X)
              requires lenders to wait at least 120 days after the first
              missed payment before filing for foreclosure.
            </p>

            <h3>Step 3: Notice of Trustee Sale (Day 120+)</h3>
            <p>
              If you do not cure the default, the trustee publishes a notice
              of sale in a local newspaper once a week for two consecutive
              weeks. The sale date must be at least 14 days after the first
              publication. The trustee also mails you a copy of the sale
              notice.
            </p>

            <h3>Step 4: Trustee Sale / Auction</h3>
            <p>
              The home is sold at public auction, usually on the courthouse
              steps. The highest bidder wins. In many cases, the lender is
              the only bidder and acquires the property for the amount owed
              on the mortgage.
            </p>

            <h2>What Happens to the Homeowner</h2>
            <p>
              After the trustee sale, the new owner (often the lender) can
              begin eviction proceedings. You will receive a notice to vacate,
              and if you do not leave voluntarily, the new owner can file an
              unlawful detainer action in court.
            </p>
            <p>
              In Virginia, the eviction process after foreclosure typically
              takes 2-4 weeks from the time the new owner files in court.
              There is no guaranteed grace period.
            </p>

            <h2>What Happens to Your Equity</h2>
            <p>
              If the auction price exceeds what you owe (mortgage balance
              plus fees, penalties, and trustee costs), you are entitled to
              the surplus. However, this is rare. In most foreclosure
              auctions, the sale price barely covers the outstanding debt.
            </p>
            <p>
              If the sale price is less than what you owe, the lender may
              pursue a <strong>deficiency judgment</strong> — a court order
              requiring you to pay the remaining balance. Virginia allows
              deficiency judgments, and the lender has 5 years to file one.
            </p>

            <h2>What Happens to Your Credit</h2>
            <p>
              A foreclosure stays on your credit report for 7 years from the
              date of the first missed payment. The typical impact:
            </p>
            <ul>
              <li>Credit score drops 100-160 points</li>
              <li>
                You cannot qualify for a conventional mortgage for 7 years
                (3 years for FHA with documented extenuating circumstances)
              </li>
              <li>
                Higher interest rates on future credit cards, auto loans,
                and insurance premiums
              </li>
              <li>
                Some employers check credit reports, which could affect job
                prospects
              </li>
            </ul>

            <h2>How to Avoid Foreclosure in Virginia</h2>
            <p>
              You have several options, and the sooner you act, the more
              options are available:
            </p>
            <ul>
              <li>
                <strong>Sell the house:</strong> A cash buyer can close in
                7-14 days, stopping the foreclosure and preserving your
                credit. You keep any equity above the mortgage balance.
              </li>
              <li>
                <strong>Loan modification:</strong> Ask your lender to lower
                your payment, extend the term, or reduce the interest rate.
              </li>
              <li>
                <strong>Reinstatement:</strong> Pay all missed payments plus
                fees to bring the loan current before the auction date.
              </li>
              <li>
                <strong>Deed in lieu:</strong> Voluntarily transfer the
                property to the lender to avoid the auction process.
              </li>
              <li>
                <strong>Bankruptcy:</strong> Filing triggers an automatic
                stay that temporarily halts foreclosure (last resort due to
                long-term credit impact).
              </li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>How long before foreclosure starts in Virginia?</h3>
            <p>
              Most Virginia lenders begin the foreclosure process after 3-4
              missed payments (90-120 days). Federal law requires a 120-day
              waiting period before filing the first foreclosure notice.
              After that, the trustee sale can be scheduled in as little as
              14 days with proper notice.
            </p>

            <h3>Can a lender sue you after foreclosure in Virginia?</h3>
            <p>
              Yes. Virginia allows deficiency judgments. If your home sells
              at auction for less than what you owe on the mortgage, the
              lender can sue you for the difference. The lender has 5 years
              to file a deficiency judgment in Virginia.
            </p>

            <h3>
              Can you buy back your house after foreclosure in Virginia?
            </h3>
            <p>
              Virginia does not have a statutory right of redemption after a
              foreclosure sale. Once the trustee sale is completed and the
              deed is transferred, the former homeowner has no legal right to
              buy back the property. This is another reason to act before the
              auction date.
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Facing foreclosure in Virginia?
              </p>
              <p className="text-slate-300 mb-4">
                We can close before your auction date and stop the
                foreclosure. Get a cash offer in 24 hours.
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
                  href="/guides/stop-foreclosure-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  How to Stop Foreclosure in Virginia
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
                  href="/guides/sell-house-with-tax-liens-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Can You Sell a House With Tax Liens in Virginia?
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
