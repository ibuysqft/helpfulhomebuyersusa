import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqSection } from '@/components/faq-section'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Helpful Home Buyers USA',
  description: 'Answers to the most common questions about selling your house for cash — process, timeline, offer calculation, costs, and more.',
  alternates: { canonical: `${siteConfig.url}/faq` },
}

const faqs = [
  {
    question: 'How does the process work?',
    answer: 'It takes three steps: (1) Tell us about your property — fill out the form or call us. (2) We prepare a no-obligation cash offer within 24 hours. (3) You choose your closing date — as fast as 7 days or whenever works for you.',
  },
  {
    question: 'How fast can you close?',
    answer: 'We can close in as few as 7 days once you accept our offer. There\'s no waiting for bank approvals or appraisals — we pay cash. Most sellers close within 2–3 weeks, but we work on your timeline.',
  },
  {
    question: 'Do I need to make any repairs or clean out the house?',
    answer: 'No. We buy houses completely as-is in any condition — no repairs, no cleaning, no staging. Take what you want and leave the rest. We\'ll handle everything after closing.',
  },
  {
    question: 'Are there any fees or commissions?',
    answer: 'Zero. We pay all closing costs and there are no real estate agent commissions. The cash offer we present is what you receive at closing — nothing comes out of your pocket.',
  },
  {
    question: 'How do you calculate my cash offer?',
    answer: 'We look at three things: (1) the after-repair value of your home based on recent comparable sales, (2) the estimated cost of any repairs or updates needed, and (3) current market conditions. We\'re transparent about our math and happy to walk you through it.',
  },
  {
    question: 'Is my offer negotiable?',
    answer: 'Yes. Our initial offer is based on what we know about the property remotely. Once we view the home, we can revisit the numbers and find a figure that works for both sides.',
  },
  {
    question: 'What if I\'m behind on mortgage payments or facing foreclosure?',
    answer: 'We work with homeowners in this situation regularly. A quick cash sale can pay off your mortgage balance, stop the foreclosure process, and potentially preserve some of your equity — before your credit is permanently damaged.',
  },
  {
    question: 'Can you buy my house if it has a lien or title issue?',
    answer: 'Yes. We work with title companies that specialize in resolving liens, judgments, back taxes, and other title clouds. Most issues can be resolved at closing from the sale proceeds — you don\'t write any checks.',
  },
  {
    question: 'What if I\'m going through a divorce?',
    answer: 'We handle this regularly and work with both parties. A cash sale can provide a clean, quick resolution so you and your spouse can each move forward. We\'re discreet and professional throughout.',
  },
  {
    question: 'Can you buy an inherited property or estate home?',
    answer: 'Yes. We buy inherited properties at all stages — whether probate is open, just starting, or already complete. We work with your attorney or executor and can even assist with out-of-state heirs who can\'t manage the property from a distance.',
  },
  {
    question: 'Do you buy properties with tenants?',
    answer: 'Yes. We buy tenant-occupied properties and handle the transition after closing. You don\'t have to deal with eviction notices or lease negotiations — we take that on.',
  },
  {
    question: 'What types of properties do you buy?',
    answer: 'Single-family homes, townhouses, condos, duplexes, mobile homes on land, and vacant lots. We buy in any condition — move-in ready, fixer-upper, fire damaged, storm damaged, or condemned.',
  },
  {
    question: 'What areas do you buy in?',
    answer: `We buy throughout ${siteConfig.stateName} including ${siteConfig.markets.join(', ')}. We're expanding nationally — check our states page or call us to confirm your area.`,
  },
  {
    question: 'Is there any obligation when I request an offer?',
    answer: 'None whatsoever. Getting a cash offer is completely free and you\'re under no obligation to accept. Many homeowners request an offer just to know what their options are.',
  },
  {
    question: 'How is this different from listing with a real estate agent?',
    answer: 'With an agent: 3–6% commission, 60–90 days on market, buyer financing can fall through, repairs and inspections required, showings and open houses. With us: zero fees, close in 7 days, cash — no contingencies, no repairs, no showings. You trade some top-dollar potential for certainty and speed.',
  },
  {
    question: 'What if I change my mind after accepting the offer?',
    answer: 'You\'re not locked in until you sign the purchase agreement. Even after signing, most contracts include a review period. We understand that major decisions take time — just communicate with us and we\'ll work with you.',
  },
  {
    question: 'Can you close if I still have a mortgage on the property?',
    answer: 'Yes. Your mortgage is paid off at closing from the sale proceeds, just like any normal real estate transaction. We coordinate directly with your lender and handle payoff quotes.',
  },
  {
    question: 'How do I get started?',
    answer: 'Fill out the form on our website or call us directly. Tell us your address and a bit about the property condition. We\'ll follow up within hours to schedule a quick walkthrough and prepare your offer.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-300">
              Everything you need to know about selling your house for cash.
            </p>
          </div>
        </section>

        <FaqSection faqs={faqs} title="All Questions" />

        <section className="py-16 px-4 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-slate-300 mb-6">Call us or request your free cash offer — no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Call {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/property-information"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Get My Cash Offer →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
