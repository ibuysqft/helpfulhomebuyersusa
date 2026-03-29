import { Star } from 'lucide-react'
import { getStateConfig } from '@/lib/state-context'
import { pickReviews } from '@/data/reviews'

export function Testimonials() {
  const { name: stateName, slug: stateSlug, isNational } = getStateConfig()
  const testimonials = pickReviews(stateSlug, 3)
  const displayLabel = isNational ? 'Nationwide' : stateName

  return (
    <section id="reviews" className="py-16 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="text-center text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
        >
          Real {displayLabel} Sellers
        </p>
        <h2
          className="text-2xl md:text-3xl font-semibold text-center mb-3"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          What {displayLabel} Sellers Say
        </h2>
        <p
          className="text-center mb-12 max-w-lg mx-auto"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Hundreds of {isNational ? '' : `${stateName} `}homeowners have trusted us for a fast, fair, hassle-free sale.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, text, rating }) => (
            <div
              key={name}
              className="testimonial-card bg-white rounded-xl p-6 border shadow-sm"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-1 mb-3">
                <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} aria-hidden={true} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span
                  className="ml-2 text-xs border rounded px-1.5 py-0.5"
                  style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
                >
                  Google
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
                    >
                      {name}
                    </p>
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-label="Verified">
                      <circle cx="6" cy="6" r="6" fill="#16A34A" />
                      <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
