'use client'

import { useState } from 'react'

type S1 = { address: string; listPrice: string; beds: string; baths: string; sqft: string; condition: string; notes: string }
type S2 = { agentName: string; agentEmail: string; agentPhone: string; tcpaConsent: boolean }

const S1_INIT: S1 = { address: '', listPrice: '', beds: '', baths: '', sqft: '', condition: '', notes: '' }
const S2_INIT: S2 = { agentName: '', agentEmail: '', agentPhone: '', tcpaConsent: false }

const inp = 'w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm'
const lbl = 'block text-xs font-medium text-zinc-400 mb-1'

export function SubmitListingClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [s1, setS1] = useState<S1>(S1_INIT)
  const [s2, setS2] = useState<S2>(S2_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!s1.address.trim()) { setError('Address required'); return }
    setError(null); setStep(2)
  }

  const onStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!s2.agentName || !s2.agentEmail) { setError('Name and email required'); return }
    if (!s2.tcpaConsent) { setError('Please provide consent'); return }
    setError(null); setSubmitting(true)
    try {
      const res = await fetch('/api/mls-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...s1,
          listPrice: s1.listPrice ? parseInt(s1.listPrice.replace(/\D/g, ''), 10) : null,
          beds: s1.beds ? parseInt(s1.beds, 10) : null,
          baths: s1.baths ? parseFloat(s1.baths) : null,
          sqft: s1.sqft ? parseInt(s1.sqft.replace(/\D/g, ''), 10) : null,
          ...s2,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Error')
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally { setSubmitting(false) }
  }

  if (step === 3) return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h1 className="text-2xl font-bold text-emerald-400 mb-2">Received</h1>
        <p className="text-zinc-400 text-sm">We will review and reach out within 24 hours.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-100">Submit Your Listing</h1>
          <p className="text-zinc-500 text-sm mt-1">Cash offer in 24 hrs. Close in 7-14 days. As-is.</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
          </div>
          <p className="text-zinc-600 text-xs mt-1">Step {step} of 2</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          {error && <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-md text-red-400 text-sm">{error}</div>}

          {step === 1 && (
            <form onSubmit={onStep1} className="space-y-4">
              <p className="text-zinc-300 font-semibold">Property Details</p>
              <div>
                <label className={lbl}>Property Address *</label>
                <input className={inp} placeholder="123 Main St, Richmond VA" value={s1.address} onChange={e => setS1(s => ({ ...s, address: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lbl}>List Price</label><input className={inp} placeholder="$250,000" value={s1.listPrice} onChange={e => setS1(s => ({ ...s, listPrice: e.target.value }))} /></div>
                <div><label className={lbl}>Sq Ft</label><input className={inp} placeholder="1,400" value={s1.sqft} onChange={e => setS1(s => ({ ...s, sqft: e.target.value }))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lbl}>Beds</label><input className={inp} placeholder="3" value={s1.beds} onChange={e => setS1(s => ({ ...s, beds: e.target.value }))} /></div>
                <div><label className={lbl}>Baths</label><input className={inp} placeholder="2" value={s1.baths} onChange={e => setS1(s => ({ ...s, baths: e.target.value }))} /></div>
              </div>
              <div>
                <label className={lbl}>Condition</label>
                <div className="flex gap-2 flex-wrap">
                  {(['move-in','needs-work','major'] as const).map(c => (
                    <button key={c} type="button" onClick={() => setS1(s => ({ ...s, condition: c }))}
                      className={`px-3 py-1.5 rounded-md text-xs border transition-colors ${s1.condition === c ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      {c === 'move-in' ? 'Move-in ready' : c === 'needs-work' ? 'Needs work' : 'Major repairs'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={lbl}>Notes (optional)</label>
                <textarea className={`${inp} resize-none h-16`} placeholder="Seller motivation, known issues..." value={s1.notes} onChange={e => setS1(s => ({ ...s, notes: e.target.value }))} />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-md text-sm">Next: Your Contact Info</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={onStep2} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setStep(1)} className="text-zinc-500 hover:text-zinc-300 text-xs">Back</button>
                <p className="text-zinc-300 font-semibold">Your Contact Info</p>
              </div>
              <div><label className={lbl}>Your Name *</label><input className={inp} placeholder="Mike Torres" value={s2.agentName} onChange={e => setS2(s => ({ ...s, agentName: e.target.value }))} required /></div>
              <div><label className={lbl}>Your Email *</label><input type="email" className={inp} placeholder="mike@realty.com" value={s2.agentEmail} onChange={e => setS2(s => ({ ...s, agentEmail: e.target.value }))} required /></div>
              <div><label className={lbl}>Your Phone</label><input type="tel" className={inp} placeholder="(804) 555-1234" value={s2.agentPhone} onChange={e => setS2(s => ({ ...s, agentPhone: e.target.value }))} /></div>
              <div className="bg-zinc-900 rounded-md p-3">
                <label className="flex gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-emerald-500" checked={s2.tcpaConsent} onChange={e => setS2(s => ({ ...s, tcpaConsent: e.target.checked }))} />
                  <span className="text-xs text-zinc-500 leading-relaxed">I consent to be contacted by Helpful Home Buyers via email, phone, and SMS about this property and future listings. Message and data rates may apply. Calls and texts may be recorded. Reply STOP to opt out.</span>
                </label>
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-md text-sm">
                {submitting ? 'Submitting...' : 'Get Our Cash Offer Range'}
              </button>
            </form>
          )}
        </div>
        <p className="text-center text-zinc-700 text-xs mt-4">Commission always protected. We close in 7-14 days.</p>
      </div>
    </div>
  )
}
