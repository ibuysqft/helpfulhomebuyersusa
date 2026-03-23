'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { usePixelEvents } from '@/components/hooks/use-pixel-events'

// ─── Types ────────────────────────────────────────────────────────────────────

type PathKey = 'quick' | 'value' | 'foreclosure' | 'situation' | 'rental' | 'creative'

interface QuizState {
  path: PathKey | null
  step2Answer: string
  address: string
  condition: string
  estimatedValue: number
}

// ─── Step 1 options ───────────────────────────────────────────────────────────

const STEP1_OPTIONS: { label: string; emoji: string; path: PathKey; sublabel: string }[] = [
  { emoji: '🏠', label: 'I need to sell quickly', sublabel: 'Get cash fast, close in days', path: 'quick' },
  { emoji: '💸', label: 'I want maximum value', sublabel: 'Explore equity retention options', path: 'value' },
  { emoji: '📅', label: 'I need to stop foreclosure', sublabel: 'Time-sensitive — act now', path: 'foreclosure' },
  { emoji: '⚖️', label: 'Divorce or probate', sublabel: 'Complex situation, expert guidance', path: 'situation' },
  { emoji: '🔑', label: "I'm a landlord done with tenants", sublabel: 'Exit your rental headaches', path: 'rental' },
  { emoji: '💡', label: "I'm open to creative options", sublabel: 'Seller finance, sub-to, and more', path: 'creative' },
]

// ─── Step 2 options per path ──────────────────────────────────────────────────

const STEP2: Record<PathKey, { question: string; options: string[] }> = {
  quick: {
    question: 'How soon do you need to close?',
    options: ['ASAP / Already in foreclosure', 'Within 30 days', '1–3 months', 'Flexible'],
  },
  value: {
    question: 'Do you own the home free and clear?',
    options: ['Yes, no mortgage', 'Small mortgage remaining', 'Large mortgage remaining'],
  },
  foreclosure: {
    question: 'Where are you in the process?',
    options: [
      'Behind on payments, no notice yet',
      'Received a Notice of Default',
      'Foreclosure sale date set',
      'Already went to sale',
    ],
  },
  situation: {
    question: 'Which applies to you?',
    options: ['Divorce / separation', 'Inherited property / probate', 'Tax lien or delinquency', 'Title issues'],
  },
  rental: {
    question: "What's the situation?",
    options: ['Bad tenants / non-payment', 'Property needs major repairs', 'Just want out'],
  },
  creative: {
    question: "What matters most to you?",
    options: [
      'Monthly income from the property',
      'Preserving my credit',
      'Getting full price over time',
      'Flexibility on timeline',
    ],
  },
}

const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']

// ─── Step 4 results config ────────────────────────────────────────────────────

interface ResultConfig {
  headline: string
  subheadline: string
  benefits: string[]
  ctaLabel: string
  accentColor: string
}

function getResult(path: PathKey, step2Answer: string): ResultConfig {
  switch (path) {
    case 'quick':
      return {
        headline: 'A Cash Offer Is Your Best Fit',
        subheadline:
          'Based on your timeline, a direct cash sale eliminates every delay and gets money in your hands fast.',
        benefits: [
          'Close in as little as 7 days',
          'No repairs, no showings, no contingencies',
          'We pay 100% of closing costs',
        ],
        ctaLabel: 'Get My Cash Offer',
        accentColor: '#4ADE80',
      }
    case 'value':
      return {
        headline: 'Our Equity Retention Program Gets You More',
        subheadline:
          step2Answer === 'Yes, no mortgage'
            ? 'With no mortgage, our ERP lets you keep nearly all your equity without the cost of listing.'
            : 'Our novation program lists your home on the MLS and splits the upside with you — without you lifting a finger.',
        benefits: [
          'Often nets more than a traditional listing',
          'No repairs or agent commissions out of pocket',
          'We manage the entire sale process for you',
        ],
        ctaLabel: 'Explore My Options',
        accentColor: '#FCD34D',
      }
    case 'foreclosure':
      return {
        headline: 'We Can Stop the Foreclosure Clock',
        subheadline:
          'Every day matters. We have closed deals within 72 hours when the auction date was imminent. Let us help.',
        benefits: [
          'Immediate cash offer — no waiting',
          'We can contact the lender on your behalf',
          'Protect your credit before the sale date hits',
        ],
        ctaLabel: 'Stop My Foreclosure Now',
        accentColor: '#F87171',
      }
    case 'situation': {
      const situationMap: Record<string, string> = {
        'Divorce / separation': 'We work with both parties — discreetly and efficiently — to get the home sold fast and the proceeds distributed.',
        'Inherited property / probate': 'We buy inherited homes as-is, handle the paperwork, and can work directly with the estate attorney.',
        'Tax lien or delinquency': "We've bought dozens of homes with tax liens. We clear the lien at closing and pay you the equity.",
        'Title issues': 'Our in-house team resolves title clouds, mechanics liens, and chain-of-title issues so the sale can close.',
      }
      return {
        headline: 'We Handle Complex Situations Every Day',
        subheadline: situationMap[step2Answer] ?? 'Whatever your situation, we have a tailored solution.',
        benefits: [
          'Specialized experience with probate, divorce, and liens',
          'No obligation consultation within 24 hours',
          'We handle the complexity — you just sign at closing',
        ],
        ctaLabel: 'Discuss My Situation',
        accentColor: '#A78BFA',
      }
    }
    case 'rental':
      return {
        headline: 'Cash Out and Walk Away — Today',
        subheadline: 'Stop managing problem properties. We buy rentals tenant-occupied, as-is, with zero hassle for you.',
        benefits: [
          'Sell with tenants still inside — no eviction required',
          'No repairs regardless of property condition',
          'Close on your schedule, as fast as 7 days',
        ],
        ctaLabel: 'Get My Rental Offer',
        accentColor: '#38BDF8',
      }
    case 'creative':
      return {
        headline: 'We Offer Every Creative Option Available',
        subheadline:
          'Seller finance, subject-to, lease option, novation — we will structure a deal that checks every box for your situation.',
        benefits: [
          'Seller financing: receive monthly payments + interest',
          'Subject-to: we take over your mortgage, protect your credit',
          'Lease option: tenant-buyer, you set the price and terms',
        ],
        ctaLabel: 'Explore Creative Options',
        accentColor: '#34D399',
      }
  }
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
          Step {step} of {total}
        </span>
        <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
          {Math.round((step / total) * 100)}% complete
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(step / total) * 100}%`,
            background: 'linear-gradient(90deg, #2563EB, #FCD34D)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Option button ────────────────────────────────────────────────────────────

function OptionButton({
  label,
  sublabel,
  emoji,
  selected,
  onClick,
}: {
  label: string
  sublabel?: string
  emoji?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl border transition-all min-h-[56px] flex items-center gap-3"
      style={{
        background: selected ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255,255,255,0.04)',
        borderColor: selected ? '#FCD34D' : 'rgba(255,255,255,0.12)',
        outline: selected ? '2px solid #FCD34D' : 'none',
        fontFamily: 'var(--font-body)',
      }}
    >
      {emoji && <span className="text-2xl flex-shrink-0" aria-hidden>{emoji}</span>}
      <div>
        <span className="block font-semibold text-sm" style={{ color: selected ? '#FCD34D' : '#E2E8F0' }}>
          {label}
        </span>
        {sublabel && (
          <span className="block text-xs mt-0.5" style={{ color: selected ? '#FDE68A' : '#64748B' }}>
            {sublabel}
          </span>
        )}
      </div>
      {selected && (
        <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="#FCD34D" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  )
}

// ─── Inline lead form at results ──────────────────────────────────────────────

function ResultLeadForm({ ctaLabel, accentColor, address }: { ctaLabel: string; accentColor: string; address: string }) {
  const router = useRouter()
  const [formStep, setFormStep] = useState<1 | 2 | 3>(address ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ address, condition: '', phone: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formStep < 3) { setFormStep(s => (s + 1) as 1 | 2 | 3); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: '' }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong')
        return
      }
      router.push('/thank-you')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

      <div className="flex gap-1 mb-4">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{ background: n <= formStep ? accentColor : 'rgba(255,255,255,0.15)' }}
          />
        ))}
      </div>

      {formStep === 1 && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
            Property address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            placeholder="123 Main St, Richmond, VA"
            required
            className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#F1F5F9',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>
      )}

      {formStep === 2 && (
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
            Property condition
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CONDITIONS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => { setForm(f => ({ ...f, condition: c })); setFormStep(3) }}
                className="py-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px]"
                style={{
                  background: form.condition === c ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.04)',
                  borderColor: form.condition === c ? accentColor : 'rgba(255,255,255,0.12)',
                  color: form.condition === c ? '#FCD34D' : '#94A3B8',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {formStep === 3 && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
            Best phone number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="(804) 555-0100"
            required
            className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#F1F5F9',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {formStep !== 2 && (
        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold py-4 rounded-xl text-white transition-opacity hover:opacity-90 disabled:opacity-60 min-h-[52px]"
          style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
        >
          {loading ? 'Submitting…' : formStep < 3 ? 'Continue →' : ctaLabel}
        </button>
      )}

      <p className="text-xs text-center" style={{ color: '#475569', fontFamily: 'var(--font-body)' }}>
        No spam. 100% private. No obligation.{' '}
        <a href={`tel:${siteConfig.phone}`} style={{ color: 'var(--color-cta)' }}>
          {siteConfig.phoneDisplay}
        </a>
      </p>
    </form>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SituationQuiz() {
  const [currentStep, setCurrentStep] = useState<1 | '2' | 3 | 4>(1)
  const [quiz, setQuiz] = useState<QuizState>({
    path: null,
    step2Answer: '',
    address: '',
    condition: '',
    estimatedValue: 300000,
  })
  const { trackViewContent } = usePixelEvents()

  function goBack() {
    if (currentStep === '2') setCurrentStep(1)
    else if (currentStep === 3) setCurrentStep('2')
    else if (currentStep === 4) setCurrentStep(3)
  }

  // Step 1 → pick path
  function selectPath(path: PathKey) {
    setQuiz(q => ({ ...q, path }))
    setCurrentStep('2')
  }

  // Step 2 → pick sub-answer
  function selectStep2(answer: string) {
    setQuiz(q => ({ ...q, step2Answer: answer }))
    setCurrentStep(3)
  }

  // Step 3 → fill property info, then go to results
  function submitStep3() {
    // Fire quiz completion tracking — non-blocking
    try { trackViewContent('quiz_completed') } catch {}
    setCurrentStep(4)
  }

  const totalSteps = 4
  const displayStep = currentStep === '2' ? 2 : currentStep === 3 ? 3 : currentStep === 4 ? 4 : 1

  const result = quiz.path ? getResult(quiz.path, quiz.step2Answer) : null

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #0A0F1A 0%, #0F1E3C 100%)' }}
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs mb-6"
            style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              color: '#93C5FD',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden />
            60-Second Seller Quiz
          </div>
          <h1
            className="text-2xl md:text-3xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Find the Right Option for Your Situation
          </h1>
          <p className="text-sm mt-2" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
            Answer 3 quick questions — we will show you exactly which path fits your needs.
          </p>
        </div>

        {/* Progress */}
        <ProgressBar step={displayStep} total={totalSteps} />

        {/* ── Step 1 ─────────────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div>
            <h2
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What&apos;s your main reason for selling?
            </h2>
            <div className="space-y-3">
              {STEP1_OPTIONS.map(opt => (
                <OptionButton
                  key={opt.path}
                  label={opt.label}
                  sublabel={opt.sublabel}
                  emoji={opt.emoji}
                  selected={quiz.path === opt.path}
                  onClick={() => selectPath(opt.path)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2 ─────────────────────────────────────────────────────── */}
        {currentStep === '2' && quiz.path && (
          <div>
            <h2
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {STEP2[quiz.path].question}
            </h2>
            <div className="space-y-3">
              {STEP2[quiz.path].options.map(opt => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={quiz.step2Answer === opt}
                  onClick={() => selectStep2(opt)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goBack}
              className="mt-6 text-sm flex items-center gap-1 transition-colors hover:text-white"
              style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        )}

        {/* ── Step 3: Property info ───────────────────────────────────────── */}
        {currentStep === 3 && (
          <div>
            <h2
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Tell us about the property
            </h2>

            <div className="space-y-5">
              {/* Address */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}
                >
                  Property address
                </label>
                <input
                  type="text"
                  value={quiz.address}
                  onChange={e => setQuiz(q => ({ ...q, address: e.target.value }))}
                  placeholder="123 Main St, Richmond, VA"
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 min-h-[44px]"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#F1F5F9',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Condition */}
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
                  Property condition
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {CONDITIONS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setQuiz(q => ({ ...q, condition: c }))}
                      className="py-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px]"
                      style={{
                        background: quiz.condition === c ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.04)',
                        borderColor: quiz.condition === c ? '#FCD34D' : 'rgba(255,255,255,0.12)',
                        color: quiz.condition === c ? '#FCD34D' : '#94A3B8',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated value slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
                    Estimated home value
                  </label>
                  <span className="text-sm font-bold" style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}>
                    ${quiz.estimatedValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={5000}
                  value={quiz.estimatedValue}
                  onChange={e => setQuiz(q => ({ ...q, estimatedValue: Number(e.target.value) }))}
                  className="w-full accent-yellow-400"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#475569', fontFamily: 'var(--font-body)' }}>
                  <span>$50K</span>
                  <span>$2M+</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={goBack}
                className="px-5 py-3 rounded-xl border text-sm font-medium transition-colors min-h-[44px]"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: '#94A3B8',
                  fontFamily: 'var(--font-body)',
                  background: 'transparent',
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={submitStep3}
                className="flex-1 font-bold py-3 rounded-xl text-white transition-opacity hover:opacity-90 min-h-[44px]"
                style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
              >
                See My Personalized Results →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Results ─────────────────────────────────────────────── */}
        {currentStep === 4 && result && (
          <div>
            {/* Result card */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(255,255,255,0.04) 100%)',
                border: `1px solid ${result.accentColor}40`,
              }}
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: `${result.accentColor}20`,
                  border: `1px solid ${result.accentColor}50`,
                  color: result.accentColor,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Your Best Option
              </div>

              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: result.accentColor }}
              >
                {result.headline}
              </h2>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                {result.subheadline}
              </p>

              <ul className="space-y-2 mb-6">
                {result.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-body)' }}>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={result.accentColor} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Property summary */}
              {(quiz.address || quiz.condition) && (
                <div
                  className="rounded-xl px-4 py-3 mb-2 text-xs"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B', fontFamily: 'var(--font-body)' }}
                >
                  {quiz.address && <span>{quiz.address}</span>}
                  {quiz.address && quiz.condition && <span> &middot; </span>}
                  {quiz.condition && <span>{quiz.condition} condition</span>}
                  {quiz.estimatedValue && (
                    <span> &middot; Est. ${quiz.estimatedValue.toLocaleString()}</span>
                  )}
                </div>
              )}
            </div>

            {/* Inline lead form */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h3
                className="text-lg font-semibold text-white mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Get Your Personalized Offer
              </h3>
              <p className="text-sm mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                We will review your situation and call you within 24 hours.
              </p>
              <ResultLeadForm
                ctaLabel={result.ctaLabel}
                accentColor={result.accentColor}
                address={quiz.address}
              />
            </div>

            {/* Restart */}
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1)
                setQuiz({ path: null, step2Answer: '', address: '', condition: '', estimatedValue: 300000 })
              }}
              className="mt-4 w-full text-sm text-center transition-colors hover:text-white"
              style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
            >
              ← Start over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
