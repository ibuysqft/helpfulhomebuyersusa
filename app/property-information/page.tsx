'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ExitIntentModal } from '@/components/exit-intent-modal'
import { siteConfig } from '@/config/site'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FunnelData {
  situation: string
  property_type: string
  timeline: string
  condition: string
  address: string
  name: string
  phone: string
  email: string
}

// ─── Step data ────────────────────────────────────────────────────────────────

const SITUATIONS = [
  { value: 'Behind on payments / facing foreclosure', icon: '🏦', label: 'Behind on payments / facing foreclosure' },
  { value: 'Going through divorce or probate', icon: '⚖️', label: 'Going through divorce or probate' },
  { value: 'Home needs major repairs', icon: '🔨', label: 'Home needs major repairs' },
  { value: 'Relocating or downsizing', icon: '📦', label: 'Relocating or downsizing' },
  { value: 'Inherited a property', icon: '🏠', label: 'Inherited a property' },
  { value: 'Just want a fast cash offer', icon: '💵', label: 'Just want a fast cash offer' },
  { value: 'Other', icon: '•••', label: 'Other' },
] as const

const PROPERTY_TYPES = [
  { value: 'Single Family', icon: '🏡', label: 'Single Family' },
  { value: 'Townhouse/Condo', icon: '🏘️', label: 'Townhouse / Condo' },
  { value: 'Multi-Family', icon: '🏢', label: 'Multi-Family' },
  { value: 'Land/Lot', icon: '🌿', label: 'Land / Lot' },
  { value: 'Other', icon: '•••', label: 'Other' },
] as const

const TIMELINES = [
  { value: 'ASAP (under 30 days)', label: 'ASAP', sublabel: 'Under 30 days' },
  { value: '1–3 months', label: '1–3 months', sublabel: '' },
  { value: '3–6 months', label: '3–6 months', sublabel: '' },
  { value: 'Not sure yet', label: 'Not sure yet', sublabel: 'Still exploring options' },
] as const

const CONDITIONS = [
  { value: 'Move-in ready', label: 'Move-in ready', sublabel: 'Good condition, no work needed' },
  { value: 'Needs minor repairs', label: 'Needs minor repairs', sublabel: 'Small fixes, cosmetic issues' },
  { value: 'Needs major repairs/renovation', label: 'Needs major repairs', sublabel: 'Significant work required' },
  { value: 'Uninhabitable', label: 'Uninhabitable', sublabel: 'Fire damage, condemned, etc.' },
] as const

const TOTAL_STEPS = 6
const DRAFT_KEY = 'hhb_funnel_draft'

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-400 text-sm font-medium">Step {step} of {TOTAL_STEPS}</span>
        <span className="text-slate-400 text-sm">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i + 1 <= step ? 'bg-amber-500' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface RadioTileProps {
  label: string
  sublabel?: string
  icon?: string
  selected: boolean
  onClick: () => void
}

function RadioTile({ label, sublabel, icon, selected, onClick }: RadioTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${
        selected
          ? 'border-amber-500 bg-amber-500/10 text-white'
          : 'border-slate-700 bg-slate-800/60 text-slate-200 hover:border-slate-500 hover:bg-slate-800'
      }`}
    >
      {icon && (
        <span className="text-xl shrink-0 w-7 text-center" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-medium text-sm leading-tight">{label}</span>
        {sublabel && <span className="block text-xs text-slate-400 mt-0.5">{sublabel}</span>}
      </span>
      {selected && (
        <span className="shrink-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center" aria-hidden="true">
          <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  )
}

// ─── Summary display ──────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-2.5 border-b border-slate-700 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-white text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}

// ─── Main funnel component ────────────────────────────────────────────────────

const EMPTY_FUNNEL: FunnelData = {
  situation: '',
  property_type: '',
  timeline: '',
  condition: '',
  address: '',
  name: '',
  phone: '',
  email: '',
}

export default function PropertyInformationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right')
  const [data, setData] = useState<FunnelData>(EMPTY_FUNNEL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Restore draft from localStorage and URL param on mount
  useEffect(() => {
    const addressParam = searchParams.get('address')

    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      const draft = raw ? (JSON.parse(raw) as Partial<Pick<FunnelData, 'address' | 'condition'>>) : {}
      setData(prev => ({
        ...prev,
        address: addressParam ?? draft.address ?? prev.address,
        condition: draft.condition ?? prev.condition,
      }))
    } catch {
      // ignore malformed draft or storage errors
      if (addressParam) {
        setData(prev => ({ ...prev, address: addressParam }))
      }
    }
  }, [searchParams])

  function persistDraft(patch: Partial<Pick<FunnelData, 'address' | 'condition'>>) {
    try {
      const existing = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? '{}') as Partial<Pick<FunnelData, 'address' | 'condition'>>
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...existing, ...patch }))
    } catch {
      // ignore storage errors
    }
  }

  function set<K extends keyof FunnelData>(key: K, value: FunnelData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
    if (key === 'address' || key === 'condition') {
      persistDraft({ [key]: value as string })
    }
  }

  function advance() {
    setSlideDir('right')
    setStep(s => s + 1)
  }

  function back() {
    setError('')
    setSlideDir('left')
    setStep(s => Math.max(1, s - 1))
  }

  function selectAndAdvance<K extends keyof FunnelData>(key: K, value: FunnelData[K]) {
    setSlideDir('right')
    setData(prev => ({ ...prev, [key]: value }))
    if (key === 'condition') {
      persistDraft({ condition: value as string })
    }
    setStep(s => s + 1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!data.name.trim() || !data.phone.trim()) {
      setError('Please enter your name and phone number.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          address: data.address.trim(),
          situation: data.situation,
          property_type: data.property_type,
          timeline: data.timeline,
          condition: data.condition,
          source: 'funnel',
          website: '', // honeypot
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError((json as { error?: string }).error ?? 'Something went wrong. Please call us directly.')
        return
      }

      // Clear draft on successful submit then redirect
      try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
      router.push('/thank-you')
    } catch {
      setError('Network error. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const slideClass = slideDir === 'right'
    ? 'animate-in slide-in-from-right-4 duration-200'
    : 'animate-in slide-in-from-left-4 duration-200'

  // ── Thank-you screen (fallback) ────────────────────────────────────────────

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full bg-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">We&apos;re on it!</h1>
            <p className="text-slate-300 text-lg mb-8">
              Expect a call from us within 24 hours. We&apos;ll review your property details and prepare your cash offer.
            </p>

            <div className="bg-slate-900 rounded-xl p-5 text-left mb-6">
              <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Your submission</h2>
              <SummaryRow label="Situation" value={data.situation} />
              <SummaryRow label="Property type" value={data.property_type} />
              <SummaryRow label="Timeline" value={data.timeline} />
              <SummaryRow label="Condition" value={data.condition} />
              <SummaryRow label="Address" value={data.address} />
              <SummaryRow label="Name" value={data.name} />
              <SummaryRow label="Phone" value={data.phone} />
              {data.email && <SummaryRow label="Email" value={data.email} />}
            </div>

            <p className="text-slate-400 text-sm">
              Questions? Call us:{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-amber-400 font-semibold">
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── Funnel ────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />
      <ExitIntentModal />
      <main className="min-h-screen bg-slate-900 px-4 py-12">
        <div className="max-w-lg mx-auto">

          {/* Header text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Zap size={12} aria-hidden={true} />
              Offer in 24 Hours
            </div>
            <h1 className="text-2xl font-bold text-white">Get Your Cash Offer</h1>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40">
            <ProgressBar step={step} />

            {/* Animated step wrapper — key triggers remount on step change */}
            <div key={step} className={slideClass}>

              {/* Step 1 — Situation */}
              {step === 1 && (
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">What best describes your situation?</h2>
                  <p className="text-slate-400 text-sm mb-5">Select the option that fits best</p>
                  <div className="space-y-2.5">
                    {SITUATIONS.map(s => (
                      <RadioTile
                        key={s.value}
                        label={s.label}
                        icon={s.icon}
                        selected={data.situation === s.value}
                        onClick={() => selectAndAdvance('situation', s.value)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Property Type */}
              {step === 2 && (
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">What type of property is it?</h2>
                  <p className="text-slate-400 text-sm mb-5">Select your property type</p>
                  <div className="space-y-2.5">
                    {PROPERTY_TYPES.map(pt => (
                      <RadioTile
                        key={pt.value}
                        label={pt.label}
                        icon={pt.icon}
                        selected={data.property_type === pt.value}
                        onClick={() => selectAndAdvance('property_type', pt.value)}
                      />
                    ))}
                  </div>
                  <BackButton onClick={back} />
                </div>
              )}

              {/* Step 3 — Timeline */}
              {step === 3 && (
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">How quickly do you need to sell?</h2>
                  <p className="text-slate-400 text-sm mb-5">No commitment — just helps us prepare</p>
                  <div className="space-y-2.5">
                    {TIMELINES.map(tl => (
                      <RadioTile
                        key={tl.value}
                        label={tl.label}
                        sublabel={tl.sublabel}
                        selected={data.timeline === tl.value}
                        onClick={() => selectAndAdvance('timeline', tl.value)}
                      />
                    ))}
                  </div>
                  <BackButton onClick={back} />
                </div>
              )}

              {/* Step 4 — Condition */}
              {step === 4 && (
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">What condition is the property in?</h2>
                  <p className="text-slate-400 text-sm mb-5">We buy in any condition — no repairs needed</p>
                  <div className="space-y-2.5">
                    {CONDITIONS.map(c => (
                      <RadioTile
                        key={c.value}
                        label={c.label}
                        sublabel={c.sublabel}
                        selected={data.condition === c.value}
                        onClick={() => selectAndAdvance('condition', c.value)}
                      />
                    ))}
                  </div>
                  <BackButton onClick={back} />
                </div>
              )}

              {/* Step 5 — Address */}
              {step === 5 && (
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">What&apos;s the property address?</h2>
                  <p className="text-slate-400 text-sm mb-5">We use this to look up your property details</p>
                  <input
                    type="text"
                    value={data.address}
                    onChange={e => set('address', e.target.value)}
                    placeholder="123 Main St, Fairfax, VA"
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-colors mb-4"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (data.address.trim()) advance()
                      else setError('Please enter the property address.')
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 rounded-xl transition-colors"
                  >
                    Continue →
                  </button>
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  <BackButton onClick={back} />
                </div>
              )}

              {/* Step 6 — Contact Info */}
              {step === 6 && (
                <div>
                  <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    You qualify for a cash offer!
                  </div>
                  <h2 className="text-white text-xl font-bold mb-1">Where should we send your offer?</h2>
                  <p className="text-slate-400 text-sm mb-5">We&apos;ll call you within 24 hours</p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Honeypot */}
                    <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />
                    <div>
                      <label htmlFor="funnel-name" className="block text-slate-300 text-sm font-medium mb-1.5">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="funnel-name"
                        type="text"
                        value={data.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder="Jane Smith"
                        required
                        className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="funnel-phone" className="block text-slate-300 text-sm font-medium mb-1.5">
                        Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="funnel-phone"
                        type="tel"
                        value={data.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="(703) 555-0100"
                        required
                        className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="funnel-email" className="block text-slate-300 text-sm font-medium mb-1.5">
                        Email <span className="text-slate-500 font-normal">(optional)</span>
                      </label>
                      <input
                        id="funnel-email"
                        type="email"
                        value={data.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold py-4 rounded-xl transition-colors text-base mt-2"
                    >
                      {loading ? 'Submitting…' : 'Get My Cash Offer →'}
                    </button>
                    <p className="text-slate-500 text-xs text-center">
                      No obligation. No fees. We&apos;ll call within 24 hours.
                    </p>
                  </form>
                  <BackButton onClick={back} />
                </div>
              )}

            </div>{/* end animated step wrapper */}
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Prefer to call?{' '}
            <a href={`tel:${siteConfig.phone}`} className="text-amber-400 font-semibold">
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── BackButton ───────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 w-full text-center text-slate-400 hover:text-slate-200 text-sm transition-colors py-2"
    >
      ← Back
    </button>
  )
}
