import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { TrustBar } from '@/components/trust-bar'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Get Your Cash Offer | Virginia Cash Home Buyers',
  description:
    'Tell us about your property and get a no-obligation cash offer within 24 hours. We buy houses as-is in Virginia.',
  alternates: { canonical: `${siteConfig.url}/property-information` },
  robots: { index: false, follow: false },
}

export default function PropertyInformationPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-amber-400 text-slate-900 text-sm font-bold px-3 py-1 rounded-full">
                ⚡ Offer in 24 Hours
              </div>
              <h1 className="text-4xl font-bold leading-tight">
                Get Your <span className="text-amber-400">Cash Offer</span>
              </h1>
              <p className="text-xl text-slate-300">
                Tell us a little about your property and we&apos;ll send you a fair, no-obligation
                cash offer within 24 hours.
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  '100% free, no obligation',
                  'Any condition — no repairs needed',
                  'Close in 7 days or on your schedule',
                  'We pay all closing costs',
                  'No agent fees or commissions',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 text-sm">
                Or call us directly:{' '}
                <a href={`tel:${siteConfig.phone}`} className="text-amber-400 font-semibold">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </section>
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
