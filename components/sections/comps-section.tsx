'use client'
import { useState } from 'react'
import Link from 'next/link'

interface CompRecord {
  address: string
  sale_price: number
  sqft: number
  price_per_sqft: number
  sale_date: string
  distance_mi: number
}

interface ARVData {
  low: number
  high: number
  average: number
  median_ppsf: number
  comp_count_selected: number
}

interface CompResponse {
  subject: { address: string; sqft: number; condition: string }
  all_comps: CompRecord[]
  paired_comps: CompRecord[]
  arv: ARVData
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const CONDITIONS = ['excellent', 'good', 'fair', 'poor', 'teardown'] as const

export function CompsSection() {
  const [address, setAddress] = useState('')
  const [sqft, setSqft] = useState('')
  const [condition, setCondition] = useState('fair')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<CompResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim() || !sqft.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/comps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: address.trim(), sqft: Number(sqft), condition }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.detail || `Error ${res.status}`)
      }
      setResult(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="free-comps" className="py-16 px-4" style={{ background: 'var(--color-bg-alt, #f8fafc)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Free Tool — No Sign-Up Required
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            What Are Homes Actually Selling For Near You?
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Pull real comparable sales from Redfin in seconds. See ARV, price per sqft, and your likely offer range — no agent, no pitch.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Property Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="123 Main St, Richmond VA 23220"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Square Footage
                  </label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={e => setSqft(e.target.value)}
                    placeholder="1,400"
                    required
                    min={200}
                    max={10000}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {CONDITIONS.map(c => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !address.trim() || !sqft.trim()}
                className="w-full py-3.5 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
                style={{ background: 'var(--color-cta)' }}
              >
                {loading ? 'Pulling comps from Redfin…' : 'Run Free Comps →'}
              </button>

              {loading && (
                <p className="text-center text-sm text-slate-500">
                  First run may take 30–60s while our server wakes up.
                </p>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              {/* ARV summary */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ARV Low</p>
                  <p className="text-xl font-bold text-slate-800">{fmt(result.arv.low)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 ring-2 ring-blue-200">
                  <p className="text-xs text-blue-600 uppercase tracking-wide mb-1 font-semibold">ARV Estimate</p>
                  <p className="text-2xl font-bold text-blue-700">{fmt(result.arv.average)}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">ARV High</p>
                  <p className="text-xl font-bold text-slate-800">{fmt(result.arv.high)}</p>
                </div>
              </div>

              <p className="text-center text-sm text-slate-500">
                Based on {result.arv.comp_count_selected} comps &middot; {fmt(result.arv.median_ppsf)}/sf median
              </p>

              {/* Top 3 comps preview */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Recent Comparable Sales</p>
                <div className="divide-y divide-slate-100">
                  {result.paired_comps.slice(0, 3).map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                      <div className="min-w-0">
                        <p className="text-slate-800 font-medium truncate">{c.address}</p>
                        <p className="text-slate-400 text-xs">{c.sqft.toLocaleString()} sqft &middot; {c.distance_mi.toFixed(1)} mi &middot; {c.sale_date}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="font-semibold text-slate-900">{fmt(c.sale_price)}</p>
                        <p className="text-slate-400 text-xs">${c.price_per_sqft.toFixed(0)}/sf</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/comps?address=${encodeURIComponent(address)}&sqft=${sqft}&condition=${condition}`}
                  className="flex-1 py-3 rounded-lg font-semibold text-center text-white transition-opacity"
                  style={{ background: 'var(--color-cta)' }}
                >
                  See Full Analysis →
                </Link>
                <button
                  onClick={() => { setResult(null); setAddress(''); setSqft('') }}
                  className="flex-1 py-3 rounded-lg font-medium text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Run Another Address
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Data pulled live from Redfin. No account required. &nbsp;
          <Link href="/comps" className="underline hover:text-slate-600">Open full tool →</Link>
        </p>
      </div>
    </section>
  )
}
