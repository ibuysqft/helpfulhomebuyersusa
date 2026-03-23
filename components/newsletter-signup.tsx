'use client'

import { useState } from 'react'

const REGISTERED_STATES = [
  { slug: 'virginia', name: 'Virginia' },
  { slug: 'texas', name: 'Texas' },
  { slug: 'florida', name: 'Florida' },
  { slug: 'georgia', name: 'Georgia' },
  { slug: 'ohio', name: 'Ohio' },
  { slug: 'north-carolina', name: 'North Carolina' },
  { slug: 'south-carolina', name: 'South Carolina' },
  { slug: 'illinois', name: 'Illinois' },
  { slug: 'michigan', name: 'Michigan' },
  { slug: 'new-york', name: 'New York' },
  { slug: 'new-jersey', name: 'New Jersey' },
  { slug: 'california', name: 'California' },
  { slug: 'arizona', name: 'Arizona' },
  { slug: 'colorado', name: 'Colorado' },
  { slug: 'connecticut', name: 'Connecticut' },
]

interface Props {
  variant?: 'national' | 'state'
  stateSlug?: string
  stateName?: string
}

export function NewsletterSignup({ variant = 'national', stateSlug, stateName }: Props) {
  const [email, setEmail] = useState('')
  const [selectedState, setSelectedState] = useState(stateSlug ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const displayState = variant === 'state' ? stateName : undefined

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const resolvedSlug = variant === 'state' ? (stateSlug ?? 'national') : selectedState
    const resolvedName =
      variant === 'state'
        ? (stateName ?? '')
        : (REGISTERED_STATES.find(s => s.slug === resolvedSlug)?.name ?? '')

    try {
      const res = await fetch('/api/hhb-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          state_slug: resolvedSlug || 'national',
          state_name: resolvedName,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMsg((data as { error?: string }).error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: 'rgba(13, 26, 46, 0.9)',
          border: '1px solid #D4AF37',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1px solid #D4AF37' }}
          aria-hidden="true"
        >
          <svg className="w-7 h-7" fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p
          className="text-xl font-semibold text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          You&apos;re in!
        </p>
        <p className="text-slate-300 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          Check your inbox Monday for your first market update.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'rgba(13, 26, 46, 0.9)',
        border: '1px solid #D4AF37',
      }}
    >
      {/* Label */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
      >
        Free Weekly Newsletter
      </p>

      {/* Headline */}
      <h2
        className="text-2xl md:text-3xl font-semibold text-white mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Get Weekly Cash Buyer Market Updates
      </h2>

      {/* Subheadline */}
      <p className="text-slate-300 mb-6 text-sm md:text-base" style={{ fontFamily: 'var(--font-body)' }}>
        Pricing trends, how-fast-homes-are-selling data, and tips for{' '}
        {displayState ? (
          <span className="text-white font-semibold">{displayState}</span>
        ) : (
          'your state'
        )}{' '}
        homeowners &mdash; free every Monday.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            className="flex-1 px-4 py-3 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'var(--font-body)',
            }}
          />

          {/* State dropdown — national variant only */}
          {variant === 'national' && (
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              required
              aria-label="Select your state"
              className="px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:ring-2 appearance-none"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'var(--font-body)',
                minWidth: '160px',
              }}
            >
              <option value="" disabled style={{ background: '#0D1A2E' }}>
                Select state
              </option>
              {REGISTERED_STATES.map(s => (
                <option key={s.slug} value={s.slug} style={{ background: '#0D1A2E' }}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-lg font-bold text-slate-900 text-sm min-h-[44px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
            style={{ background: '#D4AF37', fontFamily: 'var(--font-body)' }}
          >
            {status === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Subscribing…
              </>
            ) : (
              'Get Free Updates'
            )}
          </button>
        </div>

        {status === 'error' && (
          <p className="mt-3 text-red-400 text-xs" role="alert" style={{ fontFamily: 'var(--font-body)' }}>
            {errorMsg}
          </p>
        )}

        <p className="mt-3 text-slate-500 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
