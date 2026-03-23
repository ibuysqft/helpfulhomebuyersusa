'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CONDITIONS = ['Good', 'Fair', 'Poor', 'Very Poor'] as const

interface LeadFormProps {
  city?: string
}

export function LeadForm({ city }: LeadFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ address: '', phone: '', condition: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep(s => s + 1); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: '' }), // website = honeypot (empty)
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong')
        return
      }

      router.push('/thank-you')
    } catch {
      setError('Network error. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const cityLabel = city ?? 'Virginia'

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-xl max-w-md mx-auto w-full border"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
        <span className="inline-flex w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" aria-hidden="true" />
        <span>47 Virginia homeowners got an offer this month</span>
      </div>

      <h2
        className="font-bold text-lg mb-1"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        Get Your Free Cash Offer
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
        No obligation &middot; Closes in 7 days &middot; $0 fees
      </p>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: n <= step ? 'var(--color-primary)' : 'var(--color-border)' }}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

        {step === 1 && (
          <div>
            <label
              className="block font-medium mb-2 text-sm"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
            >
              Property address in {cityLabel}?
            </label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              placeholder="123 Main St, Fairfax, VA"
              required
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label
              className="block font-medium mb-2 text-sm"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
            >
              What&apos;s the condition of the property?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setForm(f => ({ ...f, condition: c })); setStep(3) }}
                  className="py-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px]"
                  style={{
                    background: form.condition === c ? 'var(--color-primary)' : 'transparent',
                    borderColor: form.condition === c ? 'var(--color-primary)' : 'var(--color-border)',
                    color: form.condition === c ? 'white' : 'var(--color-text)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label
              className="block font-medium mb-2 text-sm"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
            >
              Best phone number for your cash offer?
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="(703) 555-0100"
              required
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {step !== 2 && (
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-3 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60 min-h-[44px]"
            style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
          >
            {loading ? 'Submitting...' : step < 3 ? 'Continue →' : 'Get My Cash Offer'}
          </button>
        )}

        <div
          className="flex justify-center gap-4 text-xs"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          <span>100% Private</span>
          <span>No Obligation</span>
          <span>24-Hr Response</span>
        </div>
        <p
          className="text-xs text-center"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          No obligation. No spam. Call us directly:{' '}
          <a href="tel:+17039401159" style={{ color: 'var(--color-cta)' }}>
            (703) 940-1159
          </a>
        </p>
        <p
          className="text-xs text-center leading-relaxed"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          By submitting, you consent to receive calls and SMS messages (including automated messages) from Helpful Home Buyers USA at the number provided. Msg &amp; data rates may apply. Reply STOP to opt out at any time. Calls may be recorded for quality assurance, research, and educational purposes.{' '}
          <a href="/privacy-policy" style={{ color: 'var(--color-cta)' }}>Privacy Policy</a>.
        </p>
      </form>
    </div>
  )
}
