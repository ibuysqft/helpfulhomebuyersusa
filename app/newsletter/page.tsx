import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const metadata: Metadata = {
  title: 'Free Weekly Cash Buyer Market Updates | Helpful Home Buyers USA',
  description:
    'Get weekly pricing trends, days-on-market data, and sell-fast tips for your state — delivered free every Monday. Subscribe to the Helpful Home Buyers newsletter.',
  alternates: { canonical: 'https://helpfulhomebuyersusa.com/newsletter' },
}

const faqItems = [
  {
    question: "What's in the newsletter?",
    answer:
      "Each Monday edition covers: (1) cash buyer activity and pricing trends in your state, (2) how fast homes are selling in key markets, (3) practical tips for homeowners considering a cash sale, and (4) occasional case studies of real sellers we've helped.",
  },
  {
    question: 'How often does it send?',
    answer:
      'Once per week, every Monday morning. We never send more than that.',
  },
  {
    question: 'Can I unsubscribe?',
    answer:
      'Yes — every email includes a one-click unsubscribe link. No questions asked.',
  },
  {
    question: 'Is this just a sales pitch?',
    answer:
      "No. The newsletter is genuine market data and homeowner education. We mention our services briefly at the bottom of each email, but the content is designed to be useful whether you sell to us or not.",
  },
  {
    question: 'Which states do you cover?',
    answer:
      'Virginia, Texas, Florida, Georgia, Ohio, North Carolina, South Carolina, Illinois, Michigan, New York, New Jersey, California, Arizona, Colorado, and Connecticut — with more states being added.',
  },
]

const pastTopics = [
  'Why cash buyers are paying closer to market value in 2025',
  'How long it actually takes to close on a cash sale vs. listing',
  'The 3 repairs that kill the most traditional home sales',
  'What inherited property sellers need to know before listing',
  'Days on market by Virginia county — Q1 2025 data',
  'How to read a cash offer — what every number means',
  'Foreclosure timelines by state and how to stop them',
  'The hidden costs of listing that agents rarely mention',
]

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free Weekly Cash Buyer Market Updates Newsletter',
  description:
    'Subscribe to receive weekly cash buyer market data and sell-fast tips for your state.',
  url: 'https://helpfulhomebuyersusa.com/newsletter',
  publisher: {
    '@type': 'Organization',
    name: 'Helpful Home Buyers USA',
    url: 'https://helpfulhomebuyersusa.com',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function NewsletterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>

        {/* Hero */}
        <section
          className="py-20 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0A0F1A 0%, #0F1E3C 100%)' }}
        >
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
            >
              Free Every Monday
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold italic text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Know When Is the Best Time to Sell Your Home
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              Weekly cash buyer market data, days-on-market trends, and practical tips for homeowners
              in your state &mdash; straight to your inbox, free.
            </p>
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup variant="national" />
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-semibold text-center mb-10"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              What You Get Every Monday
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'State Market Pulse',
                  desc: 'Cash buyer activity, median offer-to-list ratios, and price trend data for your state.',
                  icon: '📊',
                },
                {
                  title: 'Days on Market Data',
                  desc: 'How fast homes are actually selling in key markets — broken down by county.',
                  icon: '📅',
                },
                {
                  title: 'Sell-Fast Tips',
                  desc: 'Practical advice for homeowners weighing a cash sale vs. listing with an agent.',
                  icon: '💡',
                },
                {
                  title: 'Real Seller Stories',
                  desc: 'Anonymized case studies showing real timelines, numbers, and outcomes.',
                  icon: '🏡',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 flex gap-4"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past topics */}
        <section className="py-16 px-4" style={{ background: '#fff' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl font-semibold text-center mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Recent Newsletter Topics
            </h2>
            <ul className="space-y-3">
              {pastTopics.map(topic => (
                <li
                  key={topic}
                  className="flex items-start gap-3 text-sm py-3 border-b"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Second signup CTA */}
        <section className="py-16 px-4" style={{ background: '#0D1A2E' }}>
          <div className="max-w-2xl mx-auto text-center">
            <NewsletterSignup variant="national" />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4" style={{ background: '#F1F5F9' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl font-semibold text-center mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {faqItems.map(item => (
                <div
                  key={item.question}
                  className="bg-white rounded-xl p-6"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <dt
                    className="font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                  >
                    {item.question}
                  </dt>
                  <dd
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
