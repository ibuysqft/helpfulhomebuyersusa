import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StateSelector } from '@/components/state-selector'
import { FaqSection } from '@/components/faq-section'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { registeredStates } from '@/lib/state-context'

export const metadata: Metadata = {
  title: 'We Buy Houses in All 50 States | Helpful Home Buyers USA',
  description:
    'Find a local Helpful Home Buyers cash buyer in your state. We operate in 15 states and growing. Get a fair cash offer in 24 hours. Close in 7 days.',
  alternates: { canonical: 'https://helpfulhomebuyersusa.com/states' },
}

const statesFaqs = [
  {
    question: 'Do you buy houses in my state?',
    answer:
      'We currently have active buyers in Virginia, with active expansion into Texas, Florida, Georgia, Ohio, North Carolina, South Carolina, Illinois, Michigan, New York, New Jersey, California, Arizona, Colorado, and Connecticut. If your state isn\'t listed, contact us — we may still be able to help or connect you with a trusted local buyer.',
  },
  {
    question: 'How does the process work when selling to Helpful Home Buyers?',
    answer:
      'It\'s simple: (1) Submit your property info online or call us. (2) We analyze the property and present a fair all-cash offer within 24 hours — no obligation. (3) If you accept, we handle all paperwork and close on your timeline, often in as few as 7 days. You pay zero closing costs and zero commissions.',
  },
  {
    question: 'Do you really buy in any condition?',
    answer:
      'Yes. We buy houses as-is nationwide — no repairs, no cleaning, no staging required. Whether the home has fire damage, foundation issues, hoarding situations, code violations, or is simply outdated, we\'ll make you an offer.',
  },
  {
    question: 'Is there a national phone number I can call?',
    answer:
      'Yes. Call or text (703) 940-1159 — our national line — and we\'ll route you to the right local team or assist you directly.',
  },
  {
    question: 'Are you real estate agents?',
    answer:
      'No. We are direct cash buyers — we purchase homes with our own funds. We are not listing your home or acting as agents. This means you pay zero commissions and close faster.',
  },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Helpful Home Buyers State Network',
  description: 'Cash home buyers operating across 15 US states',
  numberOfItems: registeredStates.length,
  itemListElement: registeredStates.map((state, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `Helpful Home Buyers ${state.name}`,
    url: `https://${state.domain}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://helpfulhomebuyersusa.com' },
    { '@type': 'ListItem', position: 2, name: 'States', item: 'https://helpfulhomebuyersusa.com/states' },
  ],
}

export default function StatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        {/* Page hero */}
        <section
          className="py-16 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0A0F1A 0%, #0F1E3C 100%)' }}
        >
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
            >
              National Network
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold italic text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Find a Cash Buyer in Your State
            </h1>
            <p
              className="text-lg"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              Helpful Home Buyers USA is a national network of local cash home buyers. We operate
              in {registeredStates.length} states and are expanding. Select your state below to
              connect with a local team, get a fair offer in 24 hours, and close in as few as 7 days.
            </p>
          </div>
        </section>

        {/* State grid */}
        <StateSelector />

        {/* FAQ */}
        <div style={{ background: '#0F1E3C' }}>
          <FaqSection faqs={statesFaqs} title="Questions About Our National Network" />
        </div>

        {/* Newsletter */}
        <section style={{ background: '#0D1A2E' }} className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <NewsletterSignup variant="national" />
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-16 px-4 text-center"
          style={{ background: '#0A0F1A' }}
        >
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Get Your Cash Offer?
          </h2>
          <p
            className="mb-8 max-w-md mx-auto"
            style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
          >
            No obligation. We&apos;ll have a fair offer for you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/property-information"
              className="font-bold px-8 py-4 rounded-xl text-slate-900 min-h-[52px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#D4AF37', fontFamily: 'var(--font-body)' }}
            >
              Get My Cash Offer
            </a>
            <a
              href="tel:+17039401159"
              className="font-bold px-8 py-4 rounded-xl text-white min-h-[52px] flex items-center justify-center gap-2 transition-colors hover:bg-white/10"
              style={{
                border: '2px solid rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Call (703) 940-1159
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
