'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function FunnelEntry() {
  const router = useRouter()
  const [address, setAddress] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!address.trim()) return
    router.push('/property-information?address=' + encodeURIComponent(address.trim()))
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-md mx-auto w-full border" style={{ borderColor: 'var(--color-border)' }}>
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" aria-hidden="true" />
        <span
          className="text-sm"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          47 Virginia homeowners got an offer this month
        </span>
      </div>

      {/* Headline */}
      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        Get Your Free Cash Offer
      </h2>
      <p
        className="text-sm mb-5"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        No obligation &middot; Closes in 7 days &middot; $0 fees
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="funnel-entry-address" className="sr-only">
          Property address
        </label>
        <input
          id="funnel-entry-address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter your property address..."
          autoComplete="street-address"
          className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors min-h-[44px]"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
          }}
        />
        <button
          type="submit"
          className="cta-pulse w-full text-white font-bold py-3 rounded-lg transition-colors min-h-[44px]"
          style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
        >
          Get My Cash Offer &rarr;
        </button>
      </form>

      {/* Trust signals */}
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-4 text-xs"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        aria-label="Trust signals: 100% Private, No Obligation, 24-Hr Response"
      >
        <span>
          <svg className="inline w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          100% Private
        </span>
        <span>
          <svg className="inline w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          No Obligation
        </span>
        <span>
          <svg className="inline w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          24-Hr Response
        </span>
      </div>
    </div>
  )
}
