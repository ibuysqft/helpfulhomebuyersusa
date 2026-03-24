import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'stop-foreclosure-virginia'
const TITLE = 'How to Stop Foreclosure in Virginia (Your Options Explained)'
const DESCRIPTION =
  'Virginia uses non-judicial foreclosure. Your lender can foreclose in as little as 60 days after default without going to court. Here are your options to stop it.'

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
      name: 'How long does foreclosure take in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Virginia foreclosure typically takes 90-120 days from the first missed payment to the trustee sale. Because Virginia uses non-judicial foreclosure, the lender does not need court approval, which makes the process faster than judicial foreclosure states.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I sell my house after receiving a foreclosure notice in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can sell your house at any point before the trustee sale date. Many homeowners sell to a cash buyer to close quickly and stop the foreclosure. The mortgage is paid off from the sale proceeds at closing, and you keep any remaining equity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my credit if I sell before foreclosure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Selling before foreclosure prevents the foreclosure from appearing on your credit report, which would stay for 7 years and drop your score by 100-160 points. Late payments will still show, but the damage is significantly less than a completed foreclosure.',
      },
    },
  ],
}

export default function StopForeclosureVirginiaPage() {
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
              Virginia uses non-judicial foreclosure — your lender can sell
              your home at public auction without going to court, typically
              90-120 days after you stop making payments. But you have several
              options to stop it.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Virginia Foreclosure Timeline</h2>
            <p>
              Understanding the timeline is critical because Virginia&apos;s
              non-judicial process moves faster than most states:
            </p>
            <ul>
              <li>
                <strong>Day 1-30:</strong> First missed payment. The lender
                contacts you about the delinquency.
              </li>
              <li>
                <strong>Day 30-60:</strong> Second missed payment. The lender
                sends a breach letter (notice of default) with a 30-day cure
                period.
              </li>
              <li>
                <strong>Day 60-90:</strong> If you do not cure the default,
                the lender instructs the trustee to begin foreclosure. A
                notice of sale is published in a local newspaper once a week
                for two consecutive weeks.
              </li>
              <li>
                <strong>Day 90-120:</strong> The trustee sale (public
                auction) takes place. Your home is sold to the highest bidder
                on the courthouse steps.
              </li>
            </ul>

            <h2>Option 1: Loan Modification or Reinstatement</h2>
            <p>
              Contact your lender immediately to discuss a loan modification
              (lower interest rate, extended term, or principal forbearance)
              or reinstatement (paying all missed payments plus fees to bring
              the loan current).
            </p>
            <p>
              Virginia law requires lenders to provide loss mitigation
              information before starting foreclosure. If you have not
              explored this option, your lender is obligated to discuss it
              with you.
            </p>

            <h2>Option 2: Sell the House Before the Auction</h2>
            <p>
              This is the fastest and most effective way to stop foreclosure
              while preserving your credit and keeping any equity. You can
              sell your home at any point before the trustee sale date.
            </p>
            <p>
              A cash buyer can close in 7-14 days, well within most
              foreclosure timelines. The mortgage is paid off from the sale
              proceeds at closing. If you have equity above what you owe, you
              keep the difference.
            </p>
            <p>
              If you owe more than the home is worth, a short sale (selling
              for less than the mortgage balance with lender approval) is
              another option, though it takes longer to arrange.
            </p>

            <h2>Option 3: Deed in Lieu of Foreclosure</h2>
            <p>
              With a deed in lieu, you voluntarily transfer ownership of the
              property to the lender in exchange for being released from the
              mortgage. This avoids the public auction and can be less
              damaging to your credit than a completed foreclosure.
            </p>
            <p>
              The lender must agree to this option, and they typically
              require that you first attempt to sell the property on the open
              market. It is most commonly used when the homeowner has little
              or no equity.
            </p>

            <h2>Option 4: Bankruptcy (Automatic Stay)</h2>
            <p>
              Filing for bankruptcy triggers an automatic stay that
              immediately halts all collection actions, including
              foreclosure. This buys you time, but it does not eliminate the
              debt:
            </p>
            <ul>
              <li>
                <strong>Chapter 13:</strong> Allows you to catch up on missed
                payments over a 3-5 year repayment plan while keeping the
                home.
              </li>
              <li>
                <strong>Chapter 7:</strong> Provides temporary relief, but
                the lender can request the stay be lifted to proceed with
                foreclosure.
              </li>
            </ul>
            <p>
              Bankruptcy should be a last resort due to its severe and
              long-lasting impact on your credit (7-10 years).
            </p>

            <h2>Why Selling to a Cash Buyer Is Fastest</h2>
            <p>
              When you are facing a foreclosure deadline, speed matters more
              than anything. A cash buyer can:
            </p>
            <ul>
              <li>Make an offer within 24 hours</li>
              <li>Close in 7-14 days (before most trustee sale dates)</li>
              <li>Purchase in as-is condition with no repairs needed</li>
              <li>Pay all closing costs</li>
              <li>Stop the foreclosure process immediately upon closing</li>
            </ul>
            <p>
              Most importantly, selling before the auction prevents the
              foreclosure from appearing on your credit report, which would
              otherwise stay for 7 years.
            </p>

            <h2>Frequently Asked Questions</h2>

            <h3>How long does foreclosure take in Virginia?</h3>
            <p>
              Virginia foreclosure typically takes 90-120 days from the first
              missed payment to the trustee sale. Because Virginia uses
              non-judicial foreclosure, the lender does not need court
              approval, making the process faster than judicial foreclosure
              states.
            </p>

            <h3>
              Can I sell my house after receiving a foreclosure notice?
            </h3>
            <p>
              Yes. You can sell your house at any point before the trustee
              sale date. Many homeowners sell to a cash buyer to close quickly
              and stop the foreclosure. The mortgage is paid off from the sale
              proceeds at closing, and you keep any remaining equity.
            </p>

            <h3>What happens to my credit if I sell before foreclosure?</h3>
            <p>
              Selling before foreclosure prevents the foreclosure from
              appearing on your credit report, which would stay for 7 years
              and drop your score by 100-160 points. Late payments will still
              show, but the damage is significantly less than a completed
              foreclosure.
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
                We can close before your auction date. Get a cash offer in 24
                hours.
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
                  href="/guides/what-happens-house-foreclosure-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  What Happens to Your House in Foreclosure in Virginia?
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
