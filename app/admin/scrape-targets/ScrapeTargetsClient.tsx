'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { addTargetAction, toggleTargetAction, deleteTargetAction } from './actions'
import { FilterPanel } from './FilterPanel'
import type { ScrapeTarget } from '@/lib/mls-types'

const VALID_TYPES = ['county', 'city', 'zip', 'state'] as const
type TargetType = (typeof VALID_TYPES)[number]

function isValidType(v: string): v is TargetType {
  return (VALID_TYPES as readonly string[]).includes(v)
}

const TYPE_COLORS: Record<TargetType, string> = {
  county: 'bg-blue-600 text-blue-100',
  city: 'bg-green-600 text-green-100',
  zip: 'bg-slate-600 text-slate-200',
  state: 'bg-purple-600 text-purple-100',
}

function filterSummary(filters: ScrapeTarget['filters']): string[] {
  const tags: string[] = []
  if (filters.lead_types?.length) tags.push(`${filters.lead_types.length} lead type${filters.lead_types.length > 1 ? 's' : ''}`)
  if (filters.min_price || filters.max_price) {
    const lo = filters.min_price ? `$${(filters.min_price / 1000).toFixed(0)}k` : ''
    const hi = filters.max_price ? `$${(filters.max_price / 1000).toFixed(0)}k` : ''
    tags.push(lo && hi ? `${lo}–${hi}` : lo || hi)
  }
  if (filters.min_beds) tags.push(`${filters.min_beds}bd+`)
  if (filters.days_on_market) tags.push(`≤${filters.days_on_market}DOM`)
  if (filters.property_types?.length) tags.push(filters.property_types.join('/'))
  if (filters.min_wholesale_score) tags.push(`WS≥${filters.min_wholesale_score}`)
  return tags
}

function groupByState(targets: ScrapeTarget[]) {
  const g: Record<string, ScrapeTarget[]> = {}
  for (const t of targets) {
    if (!g[t.state]) g[t.state] = []
    g[t.state].push(t)
  }
  return g
}

interface Cmd { action: 'add'|'remove'|'pause'|'resume'; type?: TargetType; value: string; state?: string }

function parseCmd(input: string): Cmd | null {
  const parts = input.trim().split(/\s+/)
  const verb = parts[0].toLowerCase()
  if (verb === 'remove' || verb === 'delete') return parts[1] ? { action: 'remove', value: parts.slice(1).join(' ') } : null
  if (verb === 'pause') return parts[1] ? { action: 'pause', value: parts.slice(1).join(' ') } : null
  if (verb === 'resume') return parts[1] ? { action: 'resume', value: parts.slice(1).join(' ') } : null
  if (verb === 'add') parts.shift()
  if (parts.length < 2) return null
  const typeStr = parts[0].toLowerCase()
  if (!isValidType(typeStr)) return null
  const hasState = parts.length >= 3 && parts[parts.length - 1].length === 2
  const state = hasState ? parts[parts.length - 1].toUpperCase() : 'VA'
  const value = hasState ? parts.slice(1, -1).join(' ') : parts.slice(1).join(' ')
  return value ? { action: 'add', type: typeStr, value, state } : null
}

export function ScrapeTargetsClient({ targets }: { targets: ScrapeTarget[] }) {
  const [isPending, startTransition] = useTransition()
  const [quickInput, setQuickInput] = useState('')
  const [quickError, setQuickError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [optimisticTargets, setOptimistic] = useOptimistic(
    targets,
    (cur: ScrapeTarget[], removedId: string) => cur.filter(t => t.id !== removedId),
  )

  const activeCount = optimisticTargets.filter(t => t.active).length
  const grouped = groupByState(optimisticTargets)

  function findByValue(value: string) {
    return optimisticTargets.find(t => t.value.toLowerCase() === value.toLowerCase())
  }

  function handleToggle(id: string, active: boolean) {
    startTransition(async () => { await toggleTargetAction(id, active) })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      setOptimistic(id)
      await deleteTargetAction(id)
    })
  }

  function handleQuickSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setQuickError('')
    const cmd = parseCmd(quickInput)
    if (!cmd) { setQuickError('Try: county Loudoun VA  |  remove Loudoun  |  pause Fairfax'); return }
    startTransition(async () => {
      if (cmd.action === 'add' && cmd.type) {
        const fd = new FormData()
        fd.set('type', cmd.type); fd.set('value', cmd.value); fd.set('state', cmd.state ?? 'VA')
        await addTargetAction(fd); setQuickInput('')
      } else if (cmd.action === 'remove') {
        const t = findByValue(cmd.value)
        if (!t) { setQuickError(`Not found: "${cmd.value}"`); return }
        setOptimistic(t.id); await deleteTargetAction(t.id); setQuickInput('')
      } else if (cmd.action === 'pause') {
        const t = findByValue(cmd.value)
        if (!t) { setQuickError(`Not found: "${cmd.value}"`); return }
        await toggleTargetAction(t.id, false); setQuickInput('')
      } else if (cmd.action === 'resume') {
        const t = findByValue(cmd.value)
        if (!t) { setQuickError(`Not found: "${cmd.value}"`); return }
        await toggleTargetAction(t.id, true); setQuickInput('')
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Scrape Targets</h2>
          <p className="text-slate-400 text-sm mt-1">Control which areas DealSauce scrapes nightly</p>
        </div>
        <span className="text-sm text-slate-400">{activeCount} active target{activeCount !== 1 ? 's' : ''}</span>
      </div>

      {/* Quick command bar */}
      <form onSubmit={handleQuickSubmit} className="mb-4">
        <div className="relative">
          <input type="text" value={quickInput} disabled={isPending}
            onChange={e => { setQuickInput(e.target.value); setQuickError('') }}
            placeholder="county Loudoun VA  |  remove Loudoun  |  pause Fairfax"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-slate-500 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50" />
          {isPending && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">…</span>}
        </div>
        {quickError && <p className="text-red-400 text-xs mt-1.5 pl-1">{quickError}</p>}
      </form>

      {/* Add form */}
      <form action={addTargetAction}
        className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-8 flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Type
          <select name="type" required className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100">
            <option value="county">County</option>
            <option value="city">City</option>
            <option value="zip">ZIP</option>
            <option value="state">State</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 flex-1 min-w-[160px]">
          Value
          <input name="value" type="text" required placeholder="Loudoun"
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100 placeholder:text-slate-500" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 w-20">
          State
          <input name="state" type="text" required defaultValue="VA" maxLength={2}
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100 uppercase" />
        </label>
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition-colors">
          Add Target
        </button>
      </form>

      {/* Target list */}
      {optimisticTargets.length === 0 ? (
        <p className="text-slate-500 text-center py-12">No targets yet. Add your first above.</p>
      ) : (
        Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([state, stateTargets]) => (
          <div key={state} className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{state}</h3>
            <div className="space-y-1">
              {stateTargets.map(target => {
                const isExpanded = expandedId === target.id
                const tags = filterSummary(target.filters ?? {})
                const hasFilters = Object.keys(target.filters ?? {}).length > 0
                return (
                  <div key={target.id}>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap min-w-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${TYPE_COLORS[target.type]}`}>
                          {target.type}
                        </span>
                        <span className="text-zinc-100">{target.value}</span>
                        {tags.map(t => (
                          <span key={t} className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" disabled={isPending}
                          onClick={() => setExpandedId(prev => prev === target.id ? null : target.id)}
                          className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                            isExpanded ? 'bg-slate-500 text-white' : hasFilters ? 'bg-slate-600 text-blue-300 hover:bg-slate-500' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                          }`}>
                          {isExpanded ? 'Close' : hasFilters ? '⚙ Filters ✓' : '⚙ Filters'}
                        </button>
                        <button type="button" disabled={isPending}
                          onClick={() => handleToggle(target.id, !target.active)}
                          className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                            target.active ? 'bg-green-700 text-green-100 hover:bg-green-600' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                          }`}>
                          {target.active ? 'Active' : 'Paused'}
                        </button>
                        <button type="button" disabled={isPending}
                          onClick={() => handleDelete(target.id)}
                          className="text-red-400 hover:text-red-300 text-lg leading-none px-1 transition-colors"
                          aria-label={`Delete ${target.value}`}>
                          &times;
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <FilterPanel targetId={target.id} filters={target.filters ?? {}} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
