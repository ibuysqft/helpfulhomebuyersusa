import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { ratingsConfig } from '@/config/ratings'

export const metadata: Metadata = {
  title: `Reviews & Testimonials | ${siteConfig.name}`,
  description: `Read real reviews from homeowners who sold their house fast for cash with Helpful Home Buyers USA. ${ratingsConfig.reviewCount}+ five-star reviews.`,
  alternates: { canonical: `${siteConfig.url}/reviews` },
  openGraph: {
    type: 'website',
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const reviews = [
  { name: 'Sarah M.', location: 'Fairfax, VA', rating: 5, date: '2025-11-14', text: 'They closed in 9 days on my inherited property in Fairfax. No repairs, no hassle. Fair offer and the team was professional throughout. I was skeptical at first but they delivered everything they promised.', situation: 'Inherited Property' },
  { name: 'James T.', location: 'Richmond, VA', rating: 5, date: '2025-12-02', text: 'Fair cash offer, no lowballing. Closed in 11 days on my Richmond home. I had already tried listing with an agent for 4 months with no success. Would absolutely recommend to anyone who needs a quick, certain sale.', situation: 'Traditional Listing Fell Through' },
  { name: 'Linda R.', location: 'Alexandria, VA', rating: 5, date: '2026-01-18', text: 'Going through a divorce and needed a quick sale. They handled everything professionally and closed on my timeline. The process was stress-free during an already stressful time.', situation: 'Divorce' },
  { name: 'Marcus W.', location: 'Norfolk, VA', rating: 5, date: '2026-02-05', text: 'Inherited a house in bad shape from my uncle. They made a fair offer knowing the condition and closed in 2 weeks. Saved me months of headaches and renovation costs.', situation: 'Inherited Property' },
  { name: 'Patricia H.', location: 'Chesapeake, VA', rating: 5, date: '2026-02-19', text: 'I was 60 days behind on my mortgage and terrified of foreclosure. They moved fast, gave me a fair offer, and we closed before the bank could proceed. Truly saved my credit.', situation: 'Foreclosure' },
  { name: 'Derek L.', location: 'Virginia Beach, VA', rating: 5, date: '2026-03-01', text: 'Relocating for work and needed to sell in 3 weeks. They accommodated my timeline perfectly. No open houses, no strangers walking through my home. Just a clean, easy transaction.', situation: 'Job Relocation' },
  { name: 'Angela C.', location: 'Arlington, VA', rating: 5, date: '2026-03-10', text: 'The house needed a new roof and had some foundation issues. Every traditional buyer backed out. Helpful Home Buyers bought it as-is without a single repair request. Exactly what I needed.', situation: 'As-Is Sale' },
  { name: 'Robert S.', location: 'Manassas, VA', rating: 5, date: '2026-03-15', text: "Clear communication, no hidden fees, and they actually closed when they said they would. In a world of cash buyers making promises they don't keep, these guys are the real deal.", situation: 'General Sale' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${siteConfig.url}/reviews` },
      ],
    },
    {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratingsConfig.ratingValue,
        reviewCount: ratingsConfig.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
      review: reviews.map(r => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
        datePublished: r.date,
        reviewBody: r.text,
      })),
    },
  ],
}

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl font-bold text-yellow-400 mb-2">★★★★★</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {ratingsConfig.reviewCount}+ Five-Star Reviews
            </h1>
            <p className="text-xl text-slate-300">
              Real homeowners. Real results. See what our clients say about selling their house fast for cash.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-blue-700 text-white py-6 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{ratingsConfig.ratingValue}</div>
              <div className="text-blue-200 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{ratingsConfig.reviewCount}+</div>
              <div className="text-blue-200 text-sm">Happy Sellers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">7</div>
              <div className="text-blue-200 text-sm">Days to Close</div>
            </div>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-xl border p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-slate-900">{review.name}</div>
                      <div className="text-sm text-slate-500">{review.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 text-lg">{'★'.repeat(review.rating)}</div>
                      <div className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                    {review.situation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Join Our Happy Sellers?</h2>
            <p className="text-slate-600 mb-6">Get your fair cash offer today — no obligation, no pressure.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                Get My Cash Offer
              </a>
              <a href={`tel:${siteConfig.phone?.replace(/\D/g,'')}`} className="border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold py-3 px-8 rounded-lg">
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
