'use client'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function NationalHero() {
  return (
    <section
      className="relative min-h-screen flex items-center py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0F1A 0%, #0F1E3C 50%, #1a2a4a 100%)' }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2563EB 0%, transparent 50%)',
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
            fontFamily: 'var(--font-body)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          Now Buying in 15 States
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-semibold italic text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          We Buy Houses for Cash &mdash;{' '}
          <span style={{ color: '#D4AF37' }}>Anywhere in the USA</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
        >
          Get a fair cash offer in 24 hours. Close in 7 days. No repairs, no agents, no fees.
          We buy in any condition, any situation — nationwide.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="#state-selector"
            className="font-bold px-8 py-4 rounded-xl text-slate-900 min-h-[52px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: '#D4AF37', fontFamily: 'var(--font-body)' }}
          >
            Find Your State →
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-bold px-8 py-4 rounded-xl text-white min-h-[52px] flex items-center justify-center gap-2 transition-colors hover:bg-white/10"
            style={{
              border: '2px solid rgba(255,255,255,0.25)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/property-information"
            className="font-bold px-8 py-4 rounded-xl text-white min-h-[52px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
          >
            Get My Cash Offer
          </Link>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-semibold pt-8"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            color: '#94A3B8',
            fontFamily: 'var(--font-body)',
          }}
        >
          {[
            { label: '15 States', icon: '🗺️' },
            { label: '200+ Homes Bought', icon: '🏠' },
            { label: '4.9★ Rating', icon: '⭐' },
            { label: 'BBB Accredited', icon: '✓' },
            { label: 'Close in 7 Days', icon: '📅' },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2">
              <span aria-hidden="true">{icon}</span>
              <span style={{ color: '#CBD5E1' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
