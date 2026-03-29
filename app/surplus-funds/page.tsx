import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'Foreclosure Surplus Funds | Get What You\'re Owed After a Foreclosure',
  description: 'If your home was sold at foreclosure for more than you owed, you may be owed surplus funds. We help homeowners recover foreclosure surplus funds in all 15 states — and can buy your home before the auction to preserve your equity.',
  alternates: {
    canonical: `${siteConfig.url}/surplus-funds`,
  },
  openGraph: {
    title: 'Foreclosure Surplus Funds | Get What You\'re Owed After a Foreclosure',
    description: 'Recover foreclosure surplus funds owed to you — or sell before the auction and keep your equity. We serve all 15 states.',
    url: `${siteConfig.url}/surplus-funds`,
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Foreclosure Surplus Funds Recovery Assistance',
  description: 'We help homeowners identify and recover foreclosure surplus funds owed after a foreclosure sale, and offer cash purchases before foreclosure to preserve equity.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Helpful Homebuyers USA',
    url: siteConfig.url,
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Foreclosure Surplus Funds Recovery',
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Surplus Funds', item: `${siteConfig.url}/surplus-funds` },
  ],
}

export default function SurplusFundsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">Foreclosure Surplus Funds</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Owed Money After Your Foreclosure?{' '}
                <span className="text-amber-400">We Can Help You Recover It</span>
              </h1>
              <p className="text-xl text-slate-300">
                When a foreclosure auction sells your home for more than you owed, the excess is legally yours — called surplus funds. Thousands of homeowners never claim money they are owed because they don&apos;t know it exists or miss the claim deadline.
              </p>
              <ul className="space-y-3 text-slate-300">
                {[
                  'We research your foreclosure sale for surplus funds',
                  'We connect you with surplus recovery attorneys (contingency, no upfront fees)',
                  'We buy your home before the auction so you keep full equity',
                  'We know every state\'s surplus fund claim deadline',
                  'No obligation consultation — find out what you\'re owed',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <LeadForm />
          </div>
        </section>

        {/* What are surplus funds */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">What Are Foreclosure Surplus Funds?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Your home goes to foreclosure auction',
                  body: 'The lender forecloses and your home is sold at a public auction — often for more than the loan balance.',
                },
                {
                  step: '2',
                  title: 'The lender keeps what\'s owed',
                  body: 'The foreclosing lender takes their outstanding balance plus fees and legal costs from the sale proceeds.',
                },
                {
                  step: '3',
                  title: 'The excess belongs to you',
                  body: 'Any money left after the lender and junior lienholders are paid is surplus funds — legally owed to you, the former homeowner.',
                },
              ].map(card => (
                <div key={card.step} className="bg-slate-900 rounded-xl p-6 space-y-3">
                  <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold text-lg flex items-center justify-center">
                    {card.step}
                  </span>
                  <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                  <p className="text-slate-400 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
              <p className="text-slate-200 text-center">
                <strong className="text-amber-400">Important:</strong> Every state has a deadline to claim surplus funds — some as short as 30 days, others as long as 10 years. The sooner you act, the easier recovery is.
              </p>
            </div>
          </div>
        </section>

        {/* Better option: sell before */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">
              The Better Option: Sell Before the Foreclosure
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Surplus funds from a foreclosure auction are usually far less than what you&apos;d receive selling directly to us before the auction. Auction costs, trustee fees, and attorney fees all reduce what&apos;s left for you.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-6 space-y-3">
                <h3 className="text-white font-bold text-lg">After Foreclosure Auction</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>❌ Auction costs deducted (5–10%)</li>
                  <li>❌ Trustee / attorney fees deducted</li>
                  <li>❌ Junior lienholders paid first</li>
                  <li>❌ Remaining surplus (if any) requires a claim</li>
                  <li>❌ Foreclosure on your credit record</li>
                  <li>❌ Claim deadlines — miss it and lose it</li>
                </ul>
              </div>
              <div className="bg-green-950/30 border border-green-500/20 rounded-xl p-6 space-y-3">
                <h3 className="text-white font-bold text-lg">Sell to Us Before the Auction</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✅ You receive full equity above your debts</li>
                  <li>✅ No foreclosure record on your credit</li>
                  <li>✅ No court claims or deadlines</li>
                  <li>✅ We close in as little as 7 days</li>
                  <li>✅ We pay all closing costs</li>
                  <li>✅ Dignified exit — you control the process</li>
                </ul>
              </div>
            </div>
            <Link
              href="/property-information"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get My Cash Offer Before Foreclosure →
            </Link>
          </div>
        </section>

        {/* State resources */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Surplus Funds Resources by State
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Click your state for state-specific surplus funds laws, claim deadlines, and how we can help.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {registeredStates.map(state => (
                <Link
                  key={state.slug}
                  href={`/surplus-funds-${state.slug}`}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 rounded-lg p-4 text-center transition-all"
                >
                  <span className="block text-amber-400 font-bold text-lg">{state.abbr}</span>
                  <span className="text-slate-300 text-sm">{state.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-amber-500 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Find Out If You&apos;re Owed Surplus Funds — Free Consultation
          </h2>
          <p className="text-slate-800 mb-6">
            No obligation. We research your foreclosure and tell you exactly what options you have.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/property-information"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Get My Free Consultation
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
