import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'sell-house-during-probate-virginia'
const TITLE = 'Can You Sell a House During Probate in Virginia?'
const DESCRIPTION =
  'Yes. In Virginia, an executor can sell estate property during probate with proper authorization. A cash buyer is often the fastest path since no bank financing is involved.'

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
      name: 'How long does probate take in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Virginia probate typically takes 6-12 months for a standard estate. Simple estates with no disputes may be resolved in as little as 4-6 months. Complex estates with contested wills or significant debt can take 12-24 months or longer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an executor sell a house without beneficiary approval in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the will. If the will grants the executor independent administration or specific authority to sell real property, the executor can sell without court approval or beneficiary consent. If the will is silent or there is no will, the executor may need court approval under Virginia Code Section 64.2-457.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you pay capital gains on inherited property in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inherited property receives a stepped-up cost basis to its fair market value at the date of death. If you sell soon after inheriting, there is typically little or no capital gains tax. Virginia conforms to federal capital gains tax rules, so gains are taxed at federal rates (0%, 15%, or 20% depending on income).',
      },
    },
  ],
}

export default function ProbateGuidePage() {
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
              Yes — in Virginia, an executor can sell estate property during
              probate with proper authorization from the will or court. A cash
              buyer is often the fastest path since no bank financing or
              appraisal contingencies are involved.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Virginia Probate Process Overview</h2>
            <p>
              When a property owner dies in Virginia, their estate typically
              goes through probate — the legal process of validating the will,
              paying debts, and distributing assets to beneficiaries. Probate
              is handled by the Circuit Court in the jurisdiction where the
              deceased lived.
            </p>
            <p>
              The first step is qualifying the executor (if there is a will)
              or administrator (if there is no will). This person receives
              Letters Testamentary or Letters of Administration, which give
              them legal authority to act on behalf of the estate.
            </p>

            <h2>When Can You Sell a House in Probate?</h2>
            <p>
              The executor can sell real property once they have been formally
              appointed by the court and received their Letters Testamentary.
              This typically happens within 2-4 weeks of filing.
            </p>
            <p>Key requirements before selling:</p>
            <ul>
              <li>Executor must be formally appointed by the Circuit Court</li>
              <li>
                The will must grant authority to sell real property, or the
                executor must petition the court for permission
              </li>
              <li>
                All known creditors must be notified (Virginia requires
                publication of a notice to creditors)
              </li>
              <li>
                The sale price should be at or near fair market value to
                satisfy fiduciary duty
              </li>
            </ul>

            <h2>Does the Court Need to Approve the Sale?</h2>
            <p>
              It depends on the authority granted in the will. Virginia law
              provides two paths:
            </p>
            <ul>
              <li>
                <strong>Independent administration:</strong> If the will
                explicitly grants the executor power to sell real property
                without court supervision, no court approval is needed. The
                executor can negotiate and close the sale independently.
              </li>
              <li>
                <strong>Court-supervised sale:</strong> If the will does not
                grant sale authority, or if there is no will, the executor
                must petition the court under Virginia Code Section 64.2-457.
                The court reviews the proposed sale terms and can require a
                public auction or minimum price.
              </li>
            </ul>

            <h2>How Long Does Probate Take in Virginia?</h2>
            <p>
              Virginia probate timelines vary by estate complexity:
            </p>
            <ul>
              <li>
                <strong>Simple estates:</strong> 4-6 months (clear will, no
                disputes, minimal debt)
              </li>
              <li>
                <strong>Standard estates:</strong> 6-12 months (typical
                estate with a mortgage, debts, and multiple beneficiaries)
              </li>
              <li>
                <strong>Complex estates:</strong> 12-24 months or longer
                (contested wills, business interests, tax disputes)
              </li>
            </ul>
            <p>
              You do not need to wait for probate to close before selling. The
              house can be sold as soon as the executor is appointed, and the
              proceeds are held in the estate account until probate concludes.
            </p>

            <h2>Why Cash Buyers Are Preferred for Probate Sales</h2>
            <p>
              Probate properties present unique challenges for traditional
              buyers with bank financing:
            </p>
            <ul>
              <li>
                Banks may not approve loans for homes in poor condition,
                which is common with estate properties
              </li>
              <li>
                Appraisal requirements can create price renegotiations that
                delay or kill the deal
              </li>
              <li>
                Financing contingencies mean the sale is not guaranteed until
                the buyer&apos;s loan is approved
              </li>
            </ul>
            <p>
              Cash buyers eliminate these risks. They purchase in as-is
              condition, skip the appraisal, and can close in 7-21 days. For
              executors who need to settle the estate quickly or avoid the
              cost of maintaining a vacant property, this is often the most
              practical option.
            </p>

            <h2>Frequently Asked Questions</h2>

            <h3>How long does probate take in Virginia?</h3>
            <p>
              Virginia probate typically takes 6-12 months for a standard
              estate. Simple estates with no disputes may be resolved in 4-6
              months. Complex estates with contested wills or significant debt
              can take 12-24 months or longer.
            </p>

            <h3>
              Can an executor sell a house without beneficiary approval in
              Virginia?
            </h3>
            <p>
              It depends on the will. If the will grants the executor
              independent administration or specific authority to sell real
              property, the executor can sell without court approval or
              beneficiary consent. If the will is silent or there is no will,
              the executor may need court approval under Virginia Code Section
              64.2-457.
            </p>

            <h3>
              Do you pay capital gains on inherited property in Virginia?
            </h3>
            <p>
              Inherited property receives a stepped-up cost basis to its fair
              market value at the date of death. If you sell soon after
              inheriting, there is typically little or no capital gains tax.
              Virginia conforms to federal capital gains tax rules, so gains
              are taxed at federal rates (0%, 15%, or 20% depending on
              income).
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Settling an estate in Virginia?
              </p>
              <p className="text-slate-300 mb-4">
                We buy probate properties as-is. Get a cash offer in 24 hours
                and close on your timeline.
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
                  href="/guides/sell-house-with-tax-liens-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Can You Sell a House With Tax Liens in Virginia?
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/what-happens-house-foreclosure-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  What Happens to Your House in Foreclosure in Virginia?
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
