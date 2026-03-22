import { X, Check } from 'lucide-react'

interface ComparisonRow {
  feature: string
  traditional: string
  us: string
}

const ROWS: ComparisonRow[] = [
  { feature: 'Time to close', traditional: '60–90 days', us: '7 days' },
  { feature: 'Agent commission', traditional: '6% of sale price', us: '$0' },
  { feature: 'Repairs required', traditional: 'Yes — often $10k+', us: 'None — as-is' },
  { feature: 'Closing costs', traditional: 'Buyer + seller share', us: 'We pay all' },
  { feature: 'Showings & open houses', traditional: 'Yes', us: 'No' },
  { feature: 'Guaranteed sale', traditional: 'No', us: 'Yes' },
  { feature: 'Cash in hand', traditional: '30–90 days', us: '7–14 days' },
]

export function ComparisonTable() {
  return (
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold text-white text-center mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Why Sell to Us vs. a Traditional Agent?
        </h2>
        <p className="text-slate-400 text-center text-sm mb-10">
          See the difference side by side — no guesswork.
        </p>

        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
          {/* Header */}
          <div className="grid grid-cols-3">
            <div className="py-4 px-5 bg-slate-800/60" />
            <div className="py-4 px-5 bg-red-950/40 text-center">
              <span className="text-red-400 text-sm font-semibold">Traditional Agent</span>
            </div>
            <div className="py-4 px-5 bg-amber-950/40 text-center">
              <span className="text-amber-400 text-sm font-semibold">Helpful Homebuyers</span>
            </div>
          </div>

          {/* Body */}
          {ROWS.map((row, i) => {
            const rowBg = i % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-900'
            return (
              <div key={row.feature} className={`grid grid-cols-3 border-t border-white/[0.06] ${rowBg}`}>
                <div className="py-4 px-5 flex items-center">
                  <span className="text-slate-300 text-sm">{row.feature}</span>
                </div>
                <div className="py-4 px-5 flex items-center justify-center gap-2 border-l border-white/[0.04]">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-400 text-sm text-center">{row.traditional}</span>
                </div>
                <div className="py-4 px-5 flex items-center justify-center gap-2 border-l border-white/[0.04]">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-300 text-sm font-medium text-center">{row.us}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
