import { createClient } from '@supabase/supabase-js'
import { MlsControlClient } from './MlsControlClient'
import type { MlsLead, MlsLeadStatus } from '@/lib/mls-types'

export const dynamic = 'force-dynamic'

const STATUS_ORDER: MlsLeadStatus[] = [
  'new', 'scored', 'queued', 'contacted',
  'warm_cash', 'warm_creative', 'needs_review', 'retail', 'dead', 'disqualified',
]

async function getData() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const today = new Date().toISOString().split('T')[0]

  const [budgetRes, leadsRes] = await Promise.all([
    sb.from('daily_send_budget').select('*').eq('date', today).single(),
    sb.from('mls_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500),
  ])

  const leads: MlsLead[] = leadsRes.data ?? []

  const counts = STATUS_ORDER.reduce<Record<string, number>>((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {})

  return { budget: budgetRes.data ?? null, leads, counts }
}

export default async function MlsAdminPage() {
  const { budget, leads, counts } = await getData()
  const total = leads.length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-100">MLS Deal Pipeline</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Scrape → Score → Outreach → Close
          </p>
        </div>
        <div className="text-xs text-zinc-600 font-mono">{total} total leads</div>
      </div>

      {/* Status counts */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { key: 'new',          label: 'New',          color: 'text-blue-400',    bg: 'bg-blue-500/10 ring-blue-500/20' },
          { key: 'queued',       label: 'Queued',       color: 'text-orange-400',  bg: 'bg-orange-500/10 ring-orange-500/20' },
          { key: 'contacted',    label: 'Contacted',    color: 'text-emerald-400', bg: 'bg-emerald-500/10 ring-emerald-500/20' },
          { key: 'warm_cash',    label: 'Warm Cash',    color: 'text-green-300',   bg: 'bg-green-500/10 ring-green-500/20' },
          { key: 'warm_creative',label: 'Warm Creative',color: 'text-violet-400',  bg: 'bg-violet-500/10 ring-violet-500/20' },
          { key: 'scored',       label: 'Scored',       color: 'text-cyan-400',    bg: 'bg-cyan-500/10 ring-cyan-500/20' },
          { key: 'needs_review', label: 'Needs Review', color: 'text-red-400',     bg: 'bg-red-500/10 ring-red-500/20' },
          { key: 'retail',       label: 'Retail',       color: 'text-zinc-400',    bg: 'bg-zinc-700/30 ring-zinc-700' },
          { key: 'dead',         label: 'Dead',         color: 'text-zinc-600',    bg: 'bg-zinc-800/50 ring-zinc-800' },
          { key: 'disqualified', label: 'Disqualified', color: 'text-zinc-600',    bg: 'bg-zinc-800/50 ring-zinc-800' },
        ].map(({ key, label, color, bg }) => (
          <div key={key} className={`rounded-lg p-3 ring-1 ${bg}`}>
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</div>
            <div className={`text-2xl font-bold mt-0.5 ${color}`}>{counts[key] ?? 0}</div>
          </div>
        ))}
      </div>

      {/* Pipeline controls */}
      <MlsControlClient budget={budget} counts={counts as Record<string, number>} />

      {/* Leads table */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-2">All Leads</div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-600">
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Address</th>
                <th className="text-right px-4 py-3 font-medium">List $</th>
                <th className="text-right px-4 py-3 font-medium">Offer</th>
                <th className="text-right px-4 py-3 font-medium">Score</th>
                <th className="text-left px-4 py-3 font-medium">Agent</th>
                <th className="text-left px-4 py-3 font-medium">Strategy</th>
                <th className="text-left px-4 py-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-zinc-600 text-sm">
                    No leads yet. Run the scraper to pull deals from DealSauce.
                  </td>
                </tr>
              ) : leads.map(lead => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const STATUS_STYLE: Record<string, string> = {
  new:           'bg-blue-500/15 text-blue-400 ring-blue-500/30',
  scored:        'bg-cyan-500/15 text-cyan-400 ring-cyan-500/30',
  queued:        'bg-orange-500/15 text-orange-400 ring-orange-500/30',
  contacted:     'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30',
  warm_cash:     'bg-green-500/15 text-green-300 ring-green-500/30',
  warm_creative: 'bg-violet-500/15 text-violet-400 ring-violet-500/30',
  needs_review:  'bg-red-500/15 text-red-400 ring-red-500/30',
  retail:        'bg-zinc-700/30 text-zinc-400 ring-zinc-700',
  dead:          'bg-zinc-800/50 text-zinc-600 ring-zinc-800',
  disqualified:  'bg-zinc-800/50 text-zinc-600 ring-zinc-800',
}

function fmt$(n: number | null) {
  if (!n) return '—'
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`
}

function fmtDate(s: string) {
  const d = new Date(s)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function LeadRow({ lead }: { lead: MlsLead }) {
  const style = STATUS_STYLE[lead.status] ?? STATUS_STYLE.dead
  const scoreColor = !lead.distress_score ? 'text-zinc-600'
    : lead.distress_score >= 8 ? 'text-red-400 font-bold'
    : lead.distress_score >= 6 ? 'text-orange-400'
    : 'text-zinc-400'

  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-4 py-2.5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ring-1 ${style}`}>
          {lead.status.replace('_', ' ')}
        </span>
      </td>
      <td className="px-4 py-2.5">
        <div className="text-zinc-100 text-xs font-medium leading-tight max-w-[220px] truncate">{lead.address}</div>
        {lead.description_keywords && lead.description_keywords.length > 0 && (
          <div className="flex gap-1 mt-0.5 flex-wrap">
            {lead.description_keywords.slice(0, 3).map(kw => (
              <span key={kw} className="text-[9px] bg-zinc-800 text-zinc-500 px-1.5 rounded font-mono">{kw}</span>
            ))}
          </div>
        )}
      </td>
      <td className="px-4 py-2.5 text-right text-xs text-zinc-300 font-mono">{fmt$(lead.list_price)}</td>
      <td className="px-4 py-2.5 text-right text-xs font-mono font-semibold text-emerald-400">{fmt$(lead.max_offer)}</td>
      <td className={`px-4 py-2.5 text-right text-sm font-mono ${scoreColor}`}>
        {lead.distress_score ?? '—'}
      </td>
      <td className="px-4 py-2.5">
        {lead.agent_name ? (
          <div>
            <div className="text-xs text-zinc-300 leading-tight truncate max-w-[140px]">{lead.agent_name}</div>
            {lead.agent_email && (
              <div className="text-[10px] text-zinc-600 font-mono truncate max-w-[140px]">{lead.agent_email}</div>
            )}
          </div>
        ) : <span className="text-zinc-700">—</span>}
      </td>
      <td className="px-4 py-2.5">
        {lead.offer_strategy ? (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ring-1 ${
            lead.offer_strategy === 'creative'
              ? 'bg-violet-500/15 text-violet-400 ring-violet-500/30'
              : 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30'
          }`}>
            {lead.offer_strategy}
          </span>
        ) : <span className="text-zinc-700 text-xs">—</span>}
      </td>
      <td className="px-4 py-2.5 text-xs text-zinc-600 font-mono">{fmtDate(lead.created_at)}</td>
    </tr>
  )
}
