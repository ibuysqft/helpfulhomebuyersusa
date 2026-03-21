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
    <div className="bg-slate-800 rounded-xl p-6 max-w-md mx-auto w-full">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${n <= step ? 'bg-amber-500' : 'bg-slate-600'}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from humans */}
        <input type="text" name="website" tabIndex={-1} aria-hidden className="hidden" />

        {step === 1 && (
          <div>
            <label className="block text-white font-medium mb-2">
              Property address in {cityLabel}?
            </label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              placeholder="123 Main St, Fairfax, VA"
              required
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-white font-medium mb-2">
              What's the condition of the property?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setForm(f => ({ ...f, condition: c })); setStep(3) }}
                  className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                    form.condition === c
                      ? 'bg-amber-500 border-amber-500 text-slate-900'
                      : 'border-slate-600 text-white hover:border-amber-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-white font-medium mb-2">
              Best phone number for your cash offer?
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="(703) 555-0100"
              required
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {step !== 2 && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Submitting...' : step < 3 ? 'Continue →' : 'Get My Cash Offer'}
          </button>
        )}

        <p className="text-slate-400 text-xs text-center">
          No obligation. No spam. Call us directly: <a href="tel:+17039401159" className="text-amber-400">(703) 940-1159</a>
        </p>
      </form>
    </div>
  )
}
