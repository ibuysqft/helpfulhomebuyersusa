'use client'
import { registeredStates } from '@/lib/state-context'

// Markets displayed per state card (sourced from stateMarkets in state-context)
const stateMarketsMap: Record<string, string[]> = {
  virginia: ['Northern Virginia', 'Richmond', 'Hampton Roads'],
  texas: ['Dallas-Fort Worth', 'Houston', 'Austin'],
  florida: ['Miami', 'Orlando', 'Tampa Bay'],
  georgia: ['Atlanta Metro', 'Savannah', 'Augusta'],
  ohio: ['Columbus', 'Cleveland', 'Cincinnati'],
  'north-carolina': ['Charlotte', 'Raleigh-Durham', 'Greensboro'],
  'south-carolina': ['Columbia', 'Charleston', 'Greenville'],
  illinois: ['Chicago Metro', 'Naperville', 'Rockford'],
  michigan: ['Detroit Metro', 'Grand Rapids', 'Lansing'],
  'new-york': ['New York City', 'Buffalo', 'Rochester'],
  'new-jersey': ['Newark', 'Jersey City', 'Trenton'],
  california: ['Los Angeles', 'San Diego', 'Bay Area'],
  arizona: ['Phoenix Metro', 'Tucson', 'Mesa'],
  colorado: ['Denver Metro', 'Colorado Springs', 'Aurora'],
  connecticut: ['Hartford', 'Bridgeport', 'New Haven'],
}

export function StateSelector() {
  return (
    <section
      id="state-selector"
      className="py-20 px-4"
      style={{ background: '#0A0F1A' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
          >
            Our Network
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Find a Cash Buyer in Your State
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
          >
            Select your state below to connect with a local Helpful Home Buyers team near you.
          </p>
        </div>

        {/* State grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {registeredStates.map((state) => {
            const isLive = true
            const markets = stateMarketsMap[state.slug] ?? []
            const url = `https://${state.domain}`

            return (
              <a
                key={state.slug}
                href={url}
                target={isLive ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-xl p-5 transition-all duration-200"
                style={{
                  background: isLive
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.05) 100%)'
                    : 'rgba(255,255,255,0.03)',
                  border: isLive
                    ? '1px solid rgba(212,175,55,0.4)'
                    : '1px solid rgba(255,255,255,0.08)',
                }}
                aria-label={`Sell your house fast in ${state.name}`}
              >
                {/* Hover gold glow via inline style on group-hover handled by CSS */}
                <style>{`
                  a[href="${url}"]:hover {
                    border-color: rgba(212,175,55,0.6) !important;
                    background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.07) 100%) !important;
                    transform: scale(1.02);
                    box-shadow: 0 0 20px rgba(212,175,55,0.15);
                  }
                `}</style>

                {/* Header row: abbr badge + status */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      background: isLive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.07)',
                      color: isLive ? '#D4AF37' : '#64748B',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {state.abbr}
                  </span>

                  {isLive ? (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background: 'rgba(74,222,128,0.15)',
                        color: '#4ADE80',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                      LIVE
                    </span>
                  ) : (
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#475569',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* State name */}
                <p
                  className="font-semibold text-white mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}
                >
                  {state.name}
                </p>

                {/* Markets */}
                {markets.length > 0 && (
                  <ul className="space-y-0.5 mb-3 flex-1">
                    {markets.slice(0, 3).map((market) => (
                      <li
                        key={market}
                        className="text-xs"
                        style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
                      >
                        {market}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Arrow */}
                <div className="flex items-center gap-1 mt-auto pt-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: isLive ? '#D4AF37' : '#475569', fontFamily: 'var(--font-body)' }}
                  >
                    {isLive ? 'Get Offer' : 'Learn More'}
                  </span>
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke={isLive ? '#D4AF37' : '#475569'}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            )
          })}
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-sm mt-10"
          style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
        >
          Don&apos;t see your state?{' '}
          <a
            href="/contact"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: '#D4AF37' }}
          >
            Contact us
          </a>{' '}
          &mdash; we&apos;re expanding fast.
        </p>
      </div>
    </section>
  )
}
