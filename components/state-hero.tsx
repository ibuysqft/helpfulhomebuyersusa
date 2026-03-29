/**
 * components/state-hero.tsx
 * Hero section for state-specific homepages.
 * Renders "We buy houses in [City], [State]" copy derived from hostname detection.
 * Server component — receives state config as props from the page.
 */
import Link from 'next/link'
import type { StateConfig } from '@/lib/state-context'

interface StateHeroProps {
  stateConfig: StateConfig
}

export function StateHero({ stateConfig }: StateHeroProps) {
  const { name, abbr, markets, phone, phoneDisplay, tagline } = stateConfig
  const primaryCity = markets[0] ?? name
  const additionalCities = markets.slice(1, 4)

  return (
    <section
      className="relative min-h-screen flex items-center py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0F1A 0%, #0F1E3C 50%, #1a2a4a 100%)' }}
      aria-labelledby="state-hero-heading"
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2563EB 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Live badge */}
        <div
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-8"
          style={{
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#D4AF37',
            background: 'rgba(212, 175, 55, 0.08)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          Now Buying in {name}
        </div>

        {/* Headline */}
        <h1
          id="state-hero-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-semibold italic text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          We Buy Houses in{' '}
          <span style={{ color: '#D4AF37' }}>{primaryCity}</span>
          {', '}
          <span className="not-italic">{abbr}</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
          {tagline}
        </p>

        {/* City list */}
        {additionalCities.length > 0 && (
          <p className="text-base text-slate-400 mb-10">
            Also serving{' '}
            {additionalCities.map((city, i) => (
              <span key={city}>
                <span className="text-slate-200">{city}</span>
                {i < additionalCities.length - 1 ? ', ' : ''}
              </span>
            ))}
            {' '}and surrounding areas.
          </p>
        )}

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/property-information"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-slate-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: '#D4AF37' }}
          >
            Get My Cash Offer
          </Link>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Call {phoneDisplay}
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          {['No repairs needed', 'Close in 7 days', 'Zero fees or commissions', 'As-is condition'].map(
            (point) => (
              <span key={point} className="flex items-center gap-1">
                <span className="text-green-400" aria-hidden="true">&#10003;</span>
                {point}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
