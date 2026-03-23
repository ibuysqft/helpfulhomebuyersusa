'use client'

import { useState, useEffect } from 'react'

export function NewsletterInlineForm() {
  const [email, setEmail] = useState('')
  const [stateSlug, setStateSlug] = useState('national')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Best-effort state detection from URL path
    if (typeof window !== 'undefined') {
      const slug = process.env.NEXT_PUBLIC_STATE_SLUG
      if (slug) {
        setStateSlug(slug)
      }
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/hhb-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, state_slug: stateSlug, state_name: '' }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-xs mt-3" style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}>
        Subscribed! Updates arrive every Monday.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3" noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Subscribe to market updates"
          className="flex-1 px-3 py-2 rounded text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontFamily: 'var(--font-body)',
            minHeight: '36px',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-3 py-2 rounded font-semibold text-slate-900 text-xs whitespace-nowrap disabled:opacity-60 hover:opacity-90 transition-opacity"
          style={{ background: '#D4AF37', fontFamily: 'var(--font-body)', minHeight: '36px' }}
        >
          {status === 'loading' ? '…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-1 text-red-400 text-xs" role="alert">
          Error. Please try again.
        </p>
      )}
    </form>
  )
}
