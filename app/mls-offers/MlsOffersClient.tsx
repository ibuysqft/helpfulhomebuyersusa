'use client'

import { useState, useTransition } from 'react'
import type { MlsLead } from '@/lib/mls-types'
import { updateMlsLeadStatusAction } from './actions'

const fmt = (n: number | null) => (n == null ? '-' : `$${n.toLocaleString()}`)

const spread = (l: MlsLead) => {
  if (!l.list_price || !l.max_offer) return '-'
  return `${Math.round(((l.list_price - l.max_offer) / l.list_price) * 100)}%`
}

const TABS = [
  { key: 'warm', label: 'All Warm' },
  { key: 'queued', label: 'Queued' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'dead', label: 'Dead' },
] as const

type TabKey = (typeof TABS)[number]['key']

const WARM_STATUSES = new Set(['warm_cash', 'warm_creative'])

const EMPTY_MESSAGES: Record<TabKey, string> = {
  warm: 'No warm leads yet. Pipeline is running.',
  queued: 'Nothing here.',
  contacted: 'Nothing here.',
  dead: 'Nothing here.',
}

function filterLeads(leads: MlsLead[], tab: TabKey): MlsLead[] {
  if (tab === 'warm') return leads.filter((l) => WARM_STATUSES.has(l.status))
  if (tab === 'queued') return leads.filter((l) => l.status === 'queued')
  if (tab === 'contacted') return leads.filter((l) => l.status === 'contacted')
  return leads.filter((l) => l.status === 'dead')
}

function tabCount(leads: MlsLead[], tab: TabKey): number {
  return filterLeads(leads, tab).length
}

interface LeadCardProps {
  lead: MlsLead
  onRemove: (id: string) => void
}

function LeadCard({ lead, onRemove }: LeadCardProps) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (status: 'dead' | 'disqualified') => {
    onRemove(lead.id)
    startTransition(async () => {
      await updateMlsLeadStatusAction(lead.id, status)
    })
  }

  const distressTags = lead.distress_signals
    ? Object.entries(lead.distress_signals)
        .filter(([, v]) => typeof v === 'number' && v > 0)
        .map(([k]) => k)
    : []

  const isCash = lead.status === 'warm_cash' || lead.offer_strategy === 'cash'

  return (
    <div
      className={`bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors ${
        isPending ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                isCash
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-purple-950 text-purple-400 border-purple-800'
              }`}
            >
              {isCash ? 'CASH' : 'CREATIVE'}
            </span>
            <span className="text-xs text-zinc-600">Score {lead.distress_score}/10</span>
            {lead.source === 'agent_submission' && (
              <span className="text-xs text-blue-400">Agent submitted</span>
            )}
            {distressTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700"
              >
                {tag.replace(/_/g, ' ')}
              </span>
            ))}
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
        <div className="flex gap-2 shrink-0 flex-wrap justify-end">
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
          <button
            onClick={() => handleStatusChange('disqualified')}
            disabled={isPending}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded-md transition-colors disabled:cursor-not-allowed"
          >
            Disqualify
          </button>
          <button
            onClick={() => handleStatusChange('dead')}
            disabled={isPending}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-600 hover:text-zinc-400 text-xs rounded-md transition-colors border border-zinc-800 disabled:cursor-not-allowed"
          >
            Mark Dead
          </button>
        </div>
      </div>
    </div>
  )
}

export function MlsOffersClient({
  leads: initialLeads,
  statusCounts,
}: {
  leads: MlsLead[]
  statusCounts: Record<string, number>
}) {
  const [leads, setLeads] = useState<MlsLead[]>(initialLeads)
  const [activeTab, setActiveTab] = useState<TabKey>('warm')

  const total = Object.values(statusCounts).reduce((s, n) => s + n, 0)
  const warmTotal = (statusCounts['warm_cash'] ?? 0) + (statusCounts['warm_creative'] ?? 0)

  const handleRemove = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  const visibleLeads = filterLeads(leads, activeTab)

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">MLS Offers Pipeline</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              Agents who replied positively. Take it from here.
            </p>
          </div>
          <div className="text-right text-xs text-zinc-600">
            <div>{total.toLocaleString()} total in pipeline</div>
            <div>
              {statusCounts['contacted'] ?? 0} contacted · {statusCounts['queued'] ?? 0} queued
            </div>
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

        <div className="flex gap-1 mb-4 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          {TABS.map((tab) => {
            const count = tabCount(leads, tab.key)
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-900 text-zinc-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {visibleLeads.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
            <p className="text-zinc-500">{EMPTY_MESSAGES[activeTab]}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
