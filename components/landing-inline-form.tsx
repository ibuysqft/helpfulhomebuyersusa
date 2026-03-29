'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { trackContactFormSubmit } from '@/lib/gtag'
import { usePixelEvents } from '@/components/hooks/use-pixel-events'

interface LandingInlineFormProps {
  ctaText?: string
  variant?: 'dark' | 'light'
}

export function LandingInlineForm({
  ctaText = 'Get My Cash Offer →',
  variant = 'dark',
}: LandingInlineFormProps) {
  const router = useRouter()
  const { trackLead } = usePixelEvents()
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, phone, condition: '', website: '' }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please call us.')
        return
      }

      try { trackLead({ value: 1500, currency: 'USD' }) } catch {}
      try { trackContactFormSubmit() } catch {}

      router.push('/thank-you')
    } catch {
      setError('Network error. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const isDark = variant === 'dark'
  const inputStyle = isDark
    ? { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }
    : { background: '#fff', borderColor: 'var(--color-border)', color: 'var(--color-text)' }
  const labelStyle = isDark ? { color: 'rgba(255,255,255,0.8)' } : { color: 'var(--color-text)' }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

      <div>
        <label
          htmlFor="landing-address"
          className="block text-sm font-medium mb-1"
          style={{ ...labelStyle, fontFamily: 'var(--font-body)' }}
        >
          Property Address
        </label>
        <input
          id="landing-address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="123 Main St, City, State"
          required
          className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
          style={{ ...inputStyle, fontFamily: 'var(--font-body)' }}
        />
      </div>

      <div>
        <label
          htmlFor="landing-phone"
          className="block text-sm font-medium mb-1"
          style={{ ...labelStyle, fontFamily: 'var(--font-body)' }}
        >
          Your Phone Number
        </label>
        <input
          id="landing-phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="(555) 000-0000"
          required
          className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
          style={{ ...inputStyle, fontFamily: 'var(--font-body)' }}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full font-bold py-4 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60 min-h-[52px] text-base"
        style={{ background: '#16A34A', fontFamily: 'var(--font-body)' }}
      >
        {loading ? 'Submitting…' : ctaText}
      </button>

      <p
        className="text-xs text-center"
        style={{
          color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
        }}
      >
        No obligation &middot; 100% private &middot; No spam &middot; Call{' '}
        <a
          href={`tel:${siteConfig.phone}`}
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-cta)' }}
        >
          {siteConfig.phoneDisplay}
        </a>{' '}
        to talk to someone now
      </p>

      <p
        className="text-xs text-center"
        style={{
          color: isDark ? 'rgba(255,255,255,0.35)' : 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.5',
        }}
      >
        By submitting, you consent to receive calls and SMS messages (including automated messages) from{' '}
        {siteConfig.name} at the number provided. Msg &amp; data rates may apply. Reply STOP to opt out.{' '}
        See our{' '}
        <a href="/privacy-policy" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-cta)', textDecoration: 'underline' }}>
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/sms-terms" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-cta)', textDecoration: 'underline' }}>
          SMS Terms
        </a>
        .
      </p>
    </form>
  )
}
