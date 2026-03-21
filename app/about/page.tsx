import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About Us | Cash Home Buyers in Virginia',
  description: `${siteConfig.name} buys houses for cash in Virginia. Learn about our process, our team, and why hundreds of homeowners have chosen us.`,
  alternates: { canonical: `${siteConfig.url}/about` },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-amber-400">{siteConfig.name}</span>
            </h1>
            <p className="text-xl text-slate-300">
              We are a local Virginia real estate investment company that buys houses directly from homeowners — for cash.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h2>Who We Are</h2>
            <p>
              {siteConfig.name} is a local, family-operated real estate investment company based in Northern Virginia.
              We buy houses for cash in all major Virginia markets — Northern Virginia, Richmond, Hampton Roads, and beyond.
            </p>
            <p>
              We are not agents. We are not a listing service. We are the actual buyers — which means when we make you an
              offer, we have the funds ready and we close on your timeline.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is simple: make selling your house as fast and painless as possible. We know that when people
              need to sell quickly, there&apos;s usually a real reason behind it — a job change, financial hardship,
              inherited property, or just a desire to move on without the months-long traditional sales process.
            </p>
            <p>
              We treat every homeowner with respect, offer fair prices based on current market data, and close on your
              schedule — not ours.
            </p>

            <h2>How We Are Different</h2>
            <ul>
              <li><strong>No middlemen.</strong> We buy directly — no agents, no commissions, no fees.</li>
              <li><strong>Fair cash offers.</strong> Our offers are based on current comparable sales in your area.</li>
              <li><strong>Any condition.</strong> We buy houses that need major repairs, have liens, or are tenant-occupied.</li>
              <li><strong>Fast closing.</strong> We can close in as little as 7 days or on your preferred date.</li>
              <li><strong>Local knowledge.</strong> We know Virginia neighborhoods, counties, and markets deeply.</li>
            </ul>

            <h2>Get Started Today</h2>
            <p>
              Getting your cash offer is free, takes about 5 minutes, and comes with zero obligation.
              We&apos;ll analyze your property and send you a fair cash offer within 24 hours.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-10 flex gap-4 flex-wrap">
            <Link
              href="/property-information"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Get My Cash Offer
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
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
