'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'

interface Comp {
  address: string
  soldPrice: number
  sqft: number
  pricePerSqft: number
  soldDate: string
}

interface OfferResult {
  offerLow: number
  offerHigh: number
  arv: number
  marketRegion: string
  comps: Comp[]
  disclaimer: string
}

const CONDITIONS = [
  'Move-in ready',
  'Needs minor repairs',
  'Needs major repairs/renovation',
  'Uninhabitable',
] as const

type Condition = typeof CONDITIONS[number]

const LOADING_STEPS = [
  'Verifying address...',
  'Pulling recent sales near your property...',
  'Calculating as-is market value...',
  'Generating your cash offer range...',
]

function formatDollar(n: number) {
  return '$' + n.toLocaleString('en-US')
}

/** Animated counting number — counts from 0 to target over ~900ms */
function AnimatedNumber({ target }: { target: number }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const DURATION = 900

  useEffect(() => {
    startRef.current = null
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current) }
  }, [target])

  return <span>${display.toLocaleString('en-US')}</span>
}

export function InstantOfferEstimator() {
  const router = useRouter()
  const [step, setStep] = useState<'input' | 'loading' | 'results' | 'capture'>('input')
  const [address, setAddress] = useState('')
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<OfferResult | null>(null)
  const [error, setError] = useState('')

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', condition: '' as Condition | '' })
  const [leadLoading, setLeadLoading] = useState(false)
  const [leadError, setLeadError] = useState('')

  // FAQ accordion
  const [faqOpen, setFaqOpen] = useState(false)

  // Animate loading steps
  useEffect(() => {
    if (step !== 'loading') return
    setLoadingStep(0)
    let current = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    LOADING_STEPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setLoadingStep(i + 1)
        current = i + 1
      }, i * 1400 + 800)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [step])

  const handleGetOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    setError('')
    setStep('loading')

    try {
      const res = await fetch('/api/instant-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setStep('input')
        return
      }
      // Small delay so final loading step shows before reveal
      setTimeout(() => {
        setResult(data)
        setStep('results')
      }, 5800)
    } catch {
      setError('Network error. Please try again.')
      setStep('input')
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.phone.trim()) { setLeadError('Phone number is required.'); return }
    setLeadLoading(true)
    setLeadError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          phone: leadForm.phone.trim(),
          name: leadForm.name.trim() || undefined,
          email: leadForm.email.trim() || undefined,
          condition: leadForm.condition || undefined,
          source: 'instant-offer',
          website: '', // honeypot
        }),
      })
      const data = await res.json()
      if (!res.ok) { setLeadError(data.error ?? 'Something went wrong.'); return }
      const params = new URLSearchParams({
        low: String(result?.offerLow ?? ''),
        high: String(result?.offerHigh ?? ''),
      })
      router.push(`/thank-you?${params.toString()}`)
    } catch {
      setLeadError('Network error. Please try again.')
    } finally {
      setLeadLoading(false)
    }
  }

  // ── Step 1: Address Input ──────────────────────────────────────────────────
  if (step === 'input') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Hero headline */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-semibold italic text-white leading-tight mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get Your Cash Offer in{' '}
            <span style={{ color: '#FCD34D' }}>60 Seconds</span>
          </h1>
          <p className="text-lg text-blue-100" style={{ fontFamily: 'var(--font-body)' }}>
            No obligation. No agent fees. No repairs needed.
          </p>
        </div>

        {/* Input card */}
        <form
          onSubmit={handleGetOffer}
          className="rounded-2xl p-8 shadow-2xl"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
        >
          <label
            htmlFor="offer-address"
            className="block text-sm font-semibold mb-2"
            style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}
          >
            Property Address
          </label>
          <input
            id="offer-address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="123 Main St, Richmond, VA 23220"
            required
            minLength={5}
            className="w-full rounded-lg px-4 py-4 text-base mb-4 focus:outline-none focus:ring-2 min-h-[52px]"
            style={{
              background: '#0a0f1a',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
            }}
          />

          {error && (
            <p className="text-red-400 text-sm mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full text-white font-bold py-4 rounded-lg text-lg transition-opacity hover:opacity-90 cta-pulse min-h-[52px]"
            style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
          >
            Get My Offer →
          </button>

          {/* Trust signals */}
          <div
            className="flex flex-wrap justify-center gap-4 mt-5 text-sm"
            style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}
          >
            <span>⭐ 4.9 rated</span>
            <span>·</span>
            <span>200+ homes bought</span>
            <span>·</span>
            <span>Closes in 7 days</span>
          </div>
        </form>
      </div>
    )
  }

  // ── Step 2: Loading ────────────────────────────────────────────────────────
  if (step === 'loading') {
    return (
      <div className="w-full max-w-xl mx-auto text-center">
        <div
          className="rounded-2xl p-10 shadow-2xl"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
        >
          <h2
            className="text-2xl font-semibold text-white mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Analyzing Your Property
          </h2>
          <p className="text-sm mb-8" style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}>
            {address}
          </p>

          <ul className="space-y-4 text-left">
            {LOADING_STEPS.map((label, i) => {
              const done = loadingStep > i
              const active = loadingStep === i
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm transition-opacity"
                  style={{
                    opacity: done || active ? 1 : 0.3,
                    fontFamily: 'var(--font-body)',
                    color: done ? '#4ade80' : active ? '#FCD34D' : '#94a3b8',
                    animation: done || active ? 'stepFadeIn 0.4s ease-out forwards' : 'none',
                  }}
                >
                  <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    {done ? (
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" fill="#16a34a" />
                        <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : active ? (
                      <span
                        className="w-4 h-4 rounded-full border-2 border-t-transparent"
                        style={{
                          borderColor: '#FCD34D',
                          borderTopColor: 'transparent',
                          display: 'inline-block',
                          animation: 'spin 0.7s linear infinite',
                        }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#334155' }} aria-hidden="true" />
                    )}
                  </span>
                  {label}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  // ── Step 3: Results ────────────────────────────────────────────────────────
  if ((step === 'results' || step === 'capture') && result) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Offer range card */}
        <div
          className="rounded-2xl p-8 text-center shadow-2xl"
          style={{ background: 'var(--surface-card)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}
          >
            Your Cash Offer Range
          </p>
          <div
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#FCD34D', fontFamily: 'var(--font-heading)' }}
          >
            <AnimatedNumber target={result.offerLow} />
            {' – '}
            <AnimatedNumber target={result.offerHigh} />
          </div>
          <p className="text-sm mb-1" style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}>
            {result.marketRegion} market · {result.comps.length} recent sales analyzed
          </p>
          <p className="text-xs italic" style={{ color: '#64748b', fontFamily: 'var(--font-body)' }}>
            {result.disclaimer}
          </p>
        </div>

        {/* Comps */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}
          >
            Recent Comparable Sales
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {result.comps.map(comp => (
              <div
                key={comp.address}
                className="rounded-xl p-4"
                style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <p className="text-white text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {comp.address}
                </p>
                <p
                  className="text-xl font-bold mb-1"
                  style={{ color: '#FCD34D', fontFamily: 'var(--font-heading)' }}
                >
                  {formatDollar(comp.soldPrice)}
                </p>
                <div className="space-y-0.5">
                  <p className="text-xs" style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}>
                    {comp.sqft.toLocaleString()} sqft · ${comp.pricePerSqft}/sqft
                  </p>
                  <p className="text-xs" style={{ color: '#64748b', fontFamily: 'var(--font-body)' }}>
                    Sold {comp.soldDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ accordion */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border-subtle)' }}
        >
          <button
            type="button"
            onClick={() => setFaqOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm text-left transition-colors hover:bg-white/5"
            style={{ color: '#94a3b8', fontFamily: 'var(--font-body)', background: 'var(--surface-card)' }}
            aria-expanded={faqOpen}
          >
            <span>How did we calculate this?</span>
            <span aria-hidden="true" style={{ transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>▼</span>
          </button>
          {faqOpen && (
            <div
              className="px-5 py-4 text-sm space-y-2"
              style={{ background: 'var(--surface-elevated)', color: '#94a3b8', fontFamily: 'var(--font-body)' }}
            >
              <p>
                We analyze recent cash sales within 0.5 miles of your property over the last 6 months. Using the average price per square foot of comparable homes, we calculate an estimated After-Repair Value (ARV).
              </p>
              <p>
                Your cash offer range is calculated at <strong className="text-white">65%–78% of ARV</strong> — the standard formula used by professional cash buyers. This accounts for our repair costs, carrying costs, and profit margin when we resell.
              </p>
              <p>
                The actual offer we make after a walkthrough may be higher or lower based on the property&apos;s true condition.
              </p>
            </div>
          )}
        </div>

        {/* Lead capture / Claim offer */}
        {step === 'results' && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep('capture')}
              className="w-full text-white font-bold py-4 rounded-lg text-lg transition-opacity hover:opacity-90 cta-pulse min-h-[52px]"
              style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
            >
              Claim Your Offer →
            </button>
            <p className="text-xs mt-2" style={{ color: '#64748b', fontFamily: 'var(--font-body)' }}>
              No obligation. Takes 30 seconds.
            </p>
          </div>
        )}

        {step === 'capture' && (
          <div
            className="rounded-2xl p-7 shadow-2xl"
            style={{ background: 'var(--surface-card)', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            <h2
              className="text-xl font-semibold text-white mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Confirm Your Offer Request
            </h2>
            <p className="text-sm mb-6" style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}>
              A local buyer will review your property and call you with a real offer.
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}
                  htmlFor="capture-name"
                >
                  Your Name
                </label>
                <input
                  id="capture-name"
                  type="text"
                  value={leadForm.name}
                  onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="First and last name"
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
                  style={{
                    background: '#0a0f1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}
                  htmlFor="capture-phone"
                >
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="capture-phone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="(703) 555-0100"
                  required
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
                  style={{
                    background: '#0a0f1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}
                  htmlFor="capture-email"
                >
                  Email <span className="text-xs">(optional)</span>
                </label>
                <input
                  id="capture-email"
                  type="email"
                  value={leadForm.email}
                  onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
                  style={{
                    background: '#0a0f1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}
                  htmlFor="capture-condition"
                >
                  Property Condition
                </label>
                <select
                  id="capture-condition"
                  value={leadForm.condition}
                  onChange={e => setLeadForm(f => ({ ...f, condition: e.target.value as Condition }))}
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
                  style={{
                    background: '#0a0f1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: leadForm.condition ? '#fff' : '#64748b',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select condition...</option>
                  {CONDITIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {leadError && (
                <p className="text-red-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  {leadError}
                </p>
              )}

              <button
                type="submit"
                disabled={leadLoading}
                className="w-full text-white font-bold py-4 rounded-lg text-base transition-opacity hover:opacity-90 disabled:opacity-60 cta-pulse min-h-[52px]"
                style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
              >
                {leadLoading ? 'Submitting...' : 'Confirm My Offer Request'}
              </button>

              <p className="text-xs text-center leading-relaxed" style={{ color: '#64748b', fontFamily: 'var(--font-body)' }}>
                By submitting, you consent to be contacted by {siteConfig.name} at the number provided, including via automated calls or texts. Calls may be recorded for quality assurance. Msg &amp; data rates may apply. No obligation to sell.{' '}
                <a href="/privacy-policy" style={{ color: 'var(--color-cta)' }}>Privacy Policy</a>.
              </p>
            </form>
          </div>
        )}

        {/* Secondary phone CTA */}
        <div className="text-center pb-4">
          <p className="text-sm mb-2" style={{ color: '#94a3b8', fontFamily: 'var(--font-body)' }}>
            Prefer to talk? Call us directly:
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-xl font-bold hover:opacity-80 transition-opacity"
            style={{ color: '#FCD34D', fontFamily: 'var(--font-heading)' }}
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    )
  }

  return null
}
