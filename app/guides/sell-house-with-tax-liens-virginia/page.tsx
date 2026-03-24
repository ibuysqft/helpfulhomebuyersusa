import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const SLUG = 'sell-house-with-tax-liens-virginia'
const TITLE = 'Can You Sell a House With Property Tax Liens in Virginia?'
const DESCRIPTION =
  'Yes. You can sell a Virginia house with delinquent property taxes. The back taxes are typically paid from sale proceeds at closing, so you do not need cash upfront.'

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
      name: 'Can you buy a house with a tax lien on it in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A buyer can purchase a house with a tax lien in Virginia. The tax lien is typically paid off from the sale proceeds at closing through the title company, so the buyer receives a clear title. Cash buyers routinely purchase homes with tax liens.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I pay off a tax lien when selling my house in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The title company or settlement attorney handles the tax lien payoff at closing. They request a payoff amount from the local treasurer, deduct it from your sale proceeds, and send payment directly. You do not need to pay it separately before selling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Virginia tax delinquent sale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Virginia tax delinquent sale is a public auction held by the locality to sell properties with unpaid property taxes. Virginia cities and counties can sell tax-delinquent properties after the taxes have been delinquent for at least one year. The homeowner loses all equity in the property at a tax sale.',
      },
    },
  ],
}

export default function TaxLiensGuidePage() {
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
              Yes — you can sell a Virginia house with delinquent property
              taxes. The back taxes are typically paid from sale proceeds at
              closing through the title company, so you do not need cash
              upfront to clear the lien.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>How Property Tax Liens Work in Virginia</h2>
            <p>
              When you fall behind on property taxes in Virginia, the local
              government (city or county) places a lien on your property. This
              lien is a legal claim that takes priority over almost all other
              liens, including your mortgage. It means the property cannot
              transfer with a clear title until the taxes are paid.
            </p>
            <p>
              Virginia property tax lien priority order:
            </p>
            <ul>
              <li>
                <strong>First:</strong> Federal tax liens (IRS)
              </li>
              <li>
                <strong>Second:</strong> Local property tax liens
              </li>
              <li>
                <strong>Third:</strong> Mortgage liens
              </li>
              <li>
                <strong>Fourth:</strong> Other liens (judgment, mechanic&apos;s, HOA)
              </li>
            </ul>

            <h2>Can a Buyer Purchase a House With Tax Liens?</h2>
            <p>
              Yes. The tax lien does not prevent a sale — it just needs to be
              resolved at closing. The settlement attorney or title company
              handles this by:
            </p>
            <ol>
              <li>
                Requesting a payoff statement from the local treasurer&apos;s
                office
              </li>
              <li>
                Deducting the full amount (including penalties and interest)
                from the seller&apos;s proceeds
              </li>
              <li>
                Sending payment directly to the locality
              </li>
              <li>
                Issuing clear title to the buyer
              </li>
            </ol>
            <p>
              Cash buyers are especially well-suited for these transactions
              because they do not require bank approval, which can be
              complicated when liens are involved.
            </p>

            <h2>What If the Tax Lien Exceeds the Home&apos;s Value?</h2>
            <p>
              In rare cases where delinquent taxes, penalties, and interest
              have accumulated to the point where they approach or exceed the
              home&apos;s value, a short sale may be necessary. This requires
              the lien holder (in this case, the local government) to agree
              to accept less than the full amount owed.
            </p>
            <p>
              More commonly, the tax lien is a fraction of the home&apos;s
              value. Even with years of delinquent taxes, most Virginia
              homeowners still have substantial equity above the lien amount.
            </p>

            <h2>How to Find Out What You Owe in Back Taxes</h2>
            <p>
              Every Virginia locality maintains an online property tax lookup
              tool. You can find your delinquent balance by:
            </p>
            <ul>
              <li>
                Visiting your city or county treasurer&apos;s website and
                searching by property address or parcel number
              </li>
              <li>
                Calling the local treasurer&apos;s office directly
              </li>
              <li>
                Requesting a payoff statement (this includes all penalties
                and interest)
              </li>
            </ul>
            <p>
              Common Virginia treasurer websites include Fairfax County, City
              of Richmond, Virginia Beach, Prince William County, and
              Henrico County — all offer online tax lookup tools.
            </p>

            <h2>Virginia Tax Sale Timeline — Act Before the Locality Forecloses</h2>
            <p>
              Virginia localities can sell tax-delinquent properties at
              public auction. The timeline varies by locality but generally
              follows this pattern:
            </p>
            <ul>
              <li>
                <strong>Year 1:</strong> Taxes become delinquent. Penalties
                and interest begin accruing (typically 10% penalty plus 10%
                annual interest in Virginia).
              </li>
              <li>
                <strong>Year 1-2:</strong> The locality sends delinquent tax
                notices and may publish your name in the local newspaper.
              </li>
              <li>
                <strong>Year 2+:</strong> The locality can initiate a tax
                sale proceeding. They must provide notice and an opportunity
                to pay before the sale.
              </li>
              <li>
                <strong>Tax sale:</strong> The property is sold at public
                auction. The homeowner loses all equity above the tax debt.
              </li>
            </ul>
            <p>
              Selling the property before a tax sale allows you to pay off
              the delinquent taxes from the proceeds and keep your remaining
              equity. Once the tax sale occurs, you lose that option entirely.
            </p>

            <h2>Frequently Asked Questions</h2>

            <h3>Can you buy a house with a tax lien on it in Virginia?</h3>
            <p>
              Yes. A buyer can purchase a house with a tax lien in Virginia.
              The tax lien is paid off from the sale proceeds at closing
              through the title company, so the buyer receives a clear title.
              Cash buyers routinely purchase homes with tax liens.
            </p>

            <h3>How do I pay off a tax lien when selling my house?</h3>
            <p>
              The title company or settlement attorney handles the tax lien
              payoff at closing. They request a payoff amount from the local
              treasurer, deduct it from your sale proceeds, and send payment
              directly. You do not need to pay it separately before selling.
            </p>

            <h3>What is a Virginia tax delinquent sale?</h3>
            <p>
              A Virginia tax delinquent sale is a public auction held by the
              locality to sell properties with unpaid property taxes. Virginia
              cities and counties can sell tax-delinquent properties after the
              taxes have been delinquent for at least one year. The homeowner
              loses all equity in the property at a tax sale.
            </p>
          </article>
        </section>

        <section className="py-12 px-4 bg-slate-700">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">
                Owe back taxes on your Virginia home?
              </p>
              <p className="text-slate-300 mb-4">
                We handle the lien payoff at closing. Get a cash offer in 24
                hours — no upfront costs.
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
                  href="/guides/sell-house-during-probate-virginia"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Can You Sell a House During Probate in Virginia?
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
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
