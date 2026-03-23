'use client'

import { useEffect, useState } from 'react'

interface Lead {
  id: string
  address: string
  phone: string
  condition: string | null
  source_url: string | null
  source_city: string | null
  ghl_status: string
  ghl_retry_count: number | null
  ghl_last_retry_at: string | null
  created_at: string
}

interface RetryState {
  [id: string]: 'idle' | 'loading' | 'success' | 'error'
}

export default function FailedLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [retryState, setRetryState] = useState<RetryState>({})

  useEffect(() => {
    fetch('/api/admin/failed-leads')
      .then(r => r.json())
      .then(data => {
        setLeads(data.leads ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function retryLead(id: string) {
    setRetryState(s => ({ ...s, [id]: 'loading' }))
    try {
      const res = await fetch('/api/admin/retry-ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.success) {
        setRetryState(s => ({ ...s, [id]: 'success' }))
        setLeads(prev => prev.filter(l => l.id !== id))
      } else {
        setRetryState(s => ({ ...s, [id]: 'error' }))
      }
    } catch {
      setRetryState(s => ({ ...s, [id]: 'error' }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Failed GHL Leads</h2>
        <span className="text-slate-400 text-sm">{leads.length} pending retry</span>
      </div>

      {loading ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center text-slate-400">
          Loading…
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center text-slate-400">
          No failed GHL leads.
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => {
            const state = retryState[lead.id] ?? 'idle'
            return (
              <article key={lead.id} className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{lead.address}</p>
                    <p className="text-slate-400 text-sm">{lead.phone}</p>
                    {lead.condition && (
                      <p className="text-slate-500 text-xs mt-1">Condition: {lead.condition}</p>
                    )}
                    <div className="flex gap-4 text-xs text-slate-500 mt-2">
                      {lead.source_city && <span>{lead.source_city}</span>}
                      {lead.ghl_retry_count != null && lead.ghl_retry_count > 0 && (
                        <span>Retried {lead.ghl_retry_count}×</span>
                      )}
                      <span>
                        {new Date(lead.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {state === 'success' ? (
                      <span className="text-green-400 text-sm font-semibold">Sent!</span>
                    ) : state === 'error' ? (
                      <button
                        onClick={() => retryLead(lead.id)}
                        className="bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Failed — Retry Again
                      </button>
                    ) : (
                      <button
                        onClick={() => retryLead(lead.id)}
                        disabled={state === 'loading'}
                        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        {state === 'loading' ? 'Sending…' : 'Retry GHL'}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
