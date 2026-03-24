import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Virginia Home Selling Guides',
  description:
    'Free guides for Virginia homeowners on foreclosure, probate, tax liens, cash offers, and selling your house fast.',
  alternates: { canonical: `${siteConfig.url}/guides` },
  openGraph: {
    title: 'Virginia Home Selling Guides | Helpful Home Buyers USA',
    description:
      'Free guides for Virginia homeowners on foreclosure, probate, tax liens, cash offers, and more.',
    type: 'website',
    url: `${siteConfig.url}/guides`,
  },
}

const guides = [
  {
    slug: 'what-is-arv-real-estate',
    title: 'What Is ARV in Real Estate? (After Repair Value Explained)',
    description:
      'Learn how investors calculate After Repair Value and why it matters when you sell your home.',
  },
  {
    slug: 'how-to-sell-house-fast-virginia',
    title: 'How to Sell Your House Fast in Virginia (2025 Guide)',
    description:
      'Compare your options for a fast home sale in Virginia: cash buyers, aggressive pricing, and iBuyers.',
  },
  {
    slug: 'sell-house-during-probate-virginia',
    title: 'Can You Sell a House During Probate in Virginia?',
    description:
      'Understand the Virginia probate process and how executors can sell estate property quickly.',
  },
  {
    slug: 'stop-foreclosure-virginia',
    title: 'How to Stop Foreclosure in Virginia (Your Options Explained)',
    description:
      'Know the Virginia foreclosure timeline and every option you have to stop it before auction.',
  },
  {
    slug: 'sell-house-with-tax-liens-virginia',
    title: 'Can You Sell a House With Property Tax Liens in Virginia?',
    description:
      'Find out how to sell a Virginia home with delinquent property taxes and clear liens at closing.',
  },
  {
    slug: 'cash-offer-vs-listing-agent-virginia',
    title: 'Cash Offer vs. Listing With an Agent in Virginia: Which Is Better?',
    description:
      'Side-by-side comparison of net proceeds, timeline, and effort for cash offers vs. traditional listings.',
  },
  {
    slug: 'how-long-does-selling-house-take-virginia',
    title: 'How Long Does It Take to Sell a House in Virginia?',
    description:
      'Average days on market by Virginia region and a full timeline breakdown for each selling method.',
  },
  {
    slug: 'what-happens-house-foreclosure-virginia',
    title: 'What Happens to Your House in Foreclosure in Virginia?',
    description:
      'Step-by-step Virginia foreclosure process, credit impact, and how to protect your equity.',
  },
]

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Virginia Home Selling Guides',
  description:
    'Free guides for Virginia homeowners on foreclosure, probate, tax liens, cash offers, and selling your house fast.',
  url: `${siteConfig.url}/guides`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `${siteConfig.url}/guides/${guide.slug}`,
    })),
  },
}

export default function GuidesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Virginia Home Selling Guides
            </h1>
            <p className="text-xl text-slate-300">
              Free, fact-based guides for Virginia homeowners facing
              foreclosure, probate, tax liens, and more. Get answers before you
              make a decision.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-6">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="block bg-slate-700/50 hover:bg-slate-700 rounded-xl p-6 transition-colors"
                  >
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {guide.title}
                    </h2>
                    <p className="text-slate-300">{guide.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Sell Your Virginia Home?
          </h2>
          <p className="text-slate-800 mb-6">
            Get a no-obligation cash offer within 24 hours.
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
