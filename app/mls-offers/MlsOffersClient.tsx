'use client'

import type { MlsLead } from '@/lib/mls-types'

const fmt = (n: number | null) => (n == null ? '-' : `$${n.toLocaleString()}`)
const spread = (l: MlsLead) => {
  if (!l.list_price || !l.max_offer) return '-'
  return `${Math.round(((l.list_price - l.max_offer) / l.list_price) * 100)}%`
}

export function MlsOffersClient({ leads, statusCounts }: { leads: MlsLead[]; statusCounts: Record<string, number> }) {
  const total = Object.values(statusCounts).reduce((s, n) => s + n, 0)
  const warmTotal = (statusCounts['warm_cash'] ?? 0) + (statusCounts['warm_creative'] ?? 0)

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Warm Leads</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Agents who replied positively. Take it from here.</p>
          </div>
          <div className="text-right text-xs text-zinc-600">
            <div>{total.toLocaleString()} total in pipeline</div>
            <div>{statusCounts['contacted'] ?? 0} contacted · {statusCounts['queued'] ?? 0} queued</div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { label: 'New', key: 'new', color: 'text-zinc-400', count: statusCounts['new'] ?? 0 },
            { label: 'Queued', key: 'queued', color: 'text-blue-400', count: statusCounts['queued'] ?? 0 },
            { label: 'Contacted', key: 'contacted', color: 'text-amber-400', count: statusCounts['contacted'] ?? 0 },
            { label: 'Warm', key: 'warm', color: 'text-emerald-400', count: warmTotal },
            { label: 'Dead', key: 'dead', color: 'text-zinc-600', count: statusCounts['dead'] ?? 0 },
          ].map((s) => (
            <div key={s.key} className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-zinc-600 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {leads.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
            <p className="text-zinc-500">No warm leads yet. Pipeline is running.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                          lead.status === 'warm_creative'
                            ? 'bg-purple-950 text-purple-400 border-purple-800'
                            : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        }`}
                      >
                        {lead.status === 'warm_creative' ? 'CREATIVE' : 'CASH'}
                      </span>
                      <span className="text-xs text-zinc-600">Score {lead.distress_score}/10</span>
                      {lead.source === 'agent_submission' && <span className="text-xs text-blue-400">Agent submitted</span>}
                    </div>
                    <h2 className="font-semibold text-zinc-100 truncate">{lead.address}</h2>
                    <p className="text-zinc-500 text-sm mt-0.5">{lead.agent_name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-emerald-400 font-bold text-lg">{fmt(lead.max_offer)}</div>
                    <div className="text-zinc-600 text-xs">max offer</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mt-4">
                  <div>
                    <div className="text-zinc-600 text-xs">List</div>
                    <div className="text-zinc-300 text-sm font-medium">{fmt(lead.list_price)}</div>
                  </div>
                  <div>
                    <div className="text-zinc-600 text-xs">ARV</div>
                    <div className="text-zinc-300 text-sm font-medium">{fmt(lead.comp_arv)}</div>
                  </div>
                  <div>
                    <div className="text-zinc-600 text-xs">Spread</div>
                    <div className="text-amber-400 text-sm font-medium">{spread(lead)}</div>
                  </div>
                  <div>
                    <div className="text-zinc-600 text-xs">Repairs</div>
                    <div className="text-zinc-300 text-sm font-medium">
                      {lead.repair_estimate_low != null && lead.repair_estimate_high != null
                        ? `${fmt(lead.repair_estimate_low)}-${fmt(lead.repair_estimate_high)}`
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex-1 text-xs text-zinc-500 truncate">
                    {lead.agent_email} · {lead.agent_phone ?? '-'}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {lead.agent_phone && (
                      <a
                        href={`tel:${lead.agent_phone}`}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-md transition-colors"
                      >
                        Call
                      </a>
                    )}
                    <a
                      href={`mailto:${lead.agent_email}`}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded-md transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
