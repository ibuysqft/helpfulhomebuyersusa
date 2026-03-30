'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { addTargetAction, toggleTargetAction, deleteTargetAction, runScraperAction, updateTargetFiltersAction } from './actions'
import {
  LEAD_TYPES, PROPERTY_TYPES, OWNER_TYPES, LISTING_STATUS, AMENITIES,
  LOAN_TYPES, MORTGAGE_FINANCE_TYPES, LAST_SALE_DATE_OPTIONS,
  DAYS_ON_MARKET_OPTIONS, HOA_OPTIONS, SQFT_OPTIONS, LOT_SIZE_OPTIONS,
} from './filter-constants'
import type { ScrapeTarget, ScrapeTargetFilters } from '@/lib/mls-types'

// ─── Constants ────────────────────────────────────────────────────────────────

const VALID_TYPES = ['county', 'city', 'zip', 'state'] as const
type TargetType = (typeof VALID_TYPES)[number]

function isValidType(v: string): v is TargetType {
  return (VALID_TYPES as readonly string[]).includes(v)
}

const TYPE_BADGE: Record<TargetType, string> = {
  county: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30',
  city:   'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
  zip:    'bg-zinc-600/40 text-zinc-300 ring-1 ring-zinc-600',
  state:  'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30',
}

// ─── Primitive: Pill toggle grid ──────────────────────────────────────────────

function PillGrid({ items, selected, onChange }: {
  items: readonly { value: string; label: string }[]
  selected: string[] | undefined
  onChange: (vals: string[]) => void
}) {
  const sel = selected ?? []
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(({ value, label }) => {
        const on = sel.includes(value)
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(on ? sel.filter(v => v !== value) : [...sel, value])}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all select-none ${
              on
                ? 'bg-blue-600 text-white ring-1 ring-blue-500'
                : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700 hover:ring-zinc-500 hover:text-zinc-200'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Primitive: Range row ─────────────────────────────────────────────────────

const inp = 'w-24 bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1.5 text-zinc-100 placeholder:text-zinc-600 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors'
const selCls = 'bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors'

function RangeRow({ label, minKey, maxKey, f, set, prefix = '', suffix = '', step = 1, placeholder }: {
  label: string
  minKey: keyof ScrapeTargetFilters
  maxKey: keyof ScrapeTargetFilters
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
  prefix?: string; suffix?: string; step?: number; placeholder?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500 w-28 shrink-0">{label}</span>
      {prefix && <span className="text-zinc-600 text-xs">{prefix}</span>}
      <input type="number" step={step} placeholder={placeholder ?? 'Min'}
        value={(f[minKey] as number | undefined) ?? ''}
        onChange={e => set(minKey, e.target.value ? Number(e.target.value) as ScrapeTargetFilters[typeof minKey] : undefined as ScrapeTargetFilters[typeof minKey])}
        className={inp} />
      <span className="text-zinc-700 text-xs">–</span>
      <input type="number" step={step} placeholder="Max"
        value={(f[maxKey] as number | undefined) ?? ''}
        onChange={e => set(maxKey, e.target.value ? Number(e.target.value) as ScrapeTargetFilters[typeof maxKey] : undefined as ScrapeTargetFilters[typeof maxKey])}
        className={inp} />
      {suffix && <span className="text-zinc-600 text-xs">{suffix}</span>}
    </div>
  )
}

function SelectRow({ label, filterKey, options, f, set }: {
  label: string
  filterKey: keyof ScrapeTargetFilters
  options: readonly { value: string; label: string }[]
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500 w-28 shrink-0">{label}</span>
      <select
        value={(f[filterKey] as string | undefined) ?? ''}
        onChange={e => set(filterKey, (e.target.value || undefined) as ScrapeTargetFilters[typeof filterKey])}
        className={selCls}
      >
        <option value="">Any</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function SqftRange({ label, minKey, maxKey, options, f, set }: {
  label: string
  minKey: keyof ScrapeTargetFilters
  maxKey: keyof ScrapeTargetFilters
  options: readonly string[]
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500 w-28 shrink-0">{label}</span>
      <select value={(f[minKey] as number | undefined) ?? ''} onChange={e => set(minKey, (e.target.value ? Number(e.target.value) : undefined) as ScrapeTargetFilters[typeof minKey])} className={selCls}>
        <option value="">Min</option>
        {options.map(v => <option key={v} value={v}>{Number(v).toLocaleString()}</option>)}
      </select>
      <span className="text-zinc-700 text-xs">–</span>
      <select value={(f[maxKey] as number | undefined) ?? ''} onChange={e => set(maxKey, (e.target.value ? Number(e.target.value) : undefined) as ScrapeTargetFilters[typeof maxKey])} className={selCls}>
        <option value="">Max</option>
        {options.map(v => <option key={v} value={v}>{Number(v).toLocaleString()}</option>)}
      </select>
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2.5 group">
      <span className={`relative inline-flex h-4 w-7 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-zinc-700'}`}>
        <span className={`absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-3' : 'translate-x-0'}`} />
      </span>
      <span className={`text-xs transition-colors ${checked ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{label}</span>
    </button>
  )
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

function FilterPanel({ f, set, compact = false }: {
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
  compact?: boolean
}) {
  const gap = compact ? 'space-y-4' : 'space-y-6'
  const heading = (t: string) => (
    <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 pb-2 border-b border-zinc-800">{t}</div>
  )

  return (
    <div className={gap}>
      <div className="space-y-3">
        {heading('Lead Types')}
        <PillGrid items={LEAD_TYPES} selected={f.lead_types} onChange={vals => set('lead_types', vals)} />
        {(f.lead_types?.length ?? 0) > 1 && (
          <Toggle
            label="Must match ALL selected"
            checked={f.lead_types_match_all ?? false}
            onChange={v => set('lead_types_match_all', v)}
          />
        )}
      </div>

      <div className="space-y-3">
        {heading('Owner & Status')}
        <div className="space-y-2">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wide">Owner Type</div>
          <PillGrid items={OWNER_TYPES} selected={f.owner_types} onChange={vals => set('owner_types', vals)} />
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wide">Listing Status</div>
          <PillGrid items={LISTING_STATUS} selected={f.listing_status} onChange={vals => set('listing_status', vals)} />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Property')}
        <div className="space-y-2">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wide">Property Type</div>
          <PillGrid items={PROPERTY_TYPES} selected={f.property_types} onChange={vals => set('property_types', vals)} />
        </div>
        <div className="space-y-2.5 mt-1">
          <RangeRow label="Price" minKey="min_price" maxKey="max_price" f={f} set={set} prefix="$" step={5000} />
          <RangeRow label="Beds" minKey="min_beds" maxKey="max_beds" f={f} set={set} step={1} />
          <RangeRow label="Baths" minKey="min_baths" maxKey="max_baths" f={f} set={set} step={0.5} />
          <SqftRange label="Sq Ft" minKey="min_sqft" maxKey="max_sqft" options={SQFT_OPTIONS} f={f} set={set} />
          <SqftRange label="Lot Size" minKey="min_lot_size" maxKey="max_lot_size" options={LOT_SIZE_OPTIONS.map(o => o.value)} f={f} set={set} />
          <RangeRow label="Year Built" minKey="min_year_built" maxKey="max_year_built" f={f} set={set} step={1} placeholder="e.g. 1980" />
          <SelectRow label="HOA" filterKey="hoa" options={HOA_OPTIONS} f={f} set={set} />
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wide">Amenities</div>
          <PillGrid items={AMENITIES} selected={f.amenities} onChange={vals => set('amenities', vals)} />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Listing')}
        <div className="space-y-2.5">
          <SelectRow label="Days on Market" filterKey="days_on_market" options={DAYS_ON_MARKET_OPTIONS} f={f} set={set} />
          <RangeRow label="Profit %" minKey="min_profit_potential" maxKey="max_profit_potential" f={f} set={set} suffix="%" step={1} />
        </div>
        <div className="flex flex-col gap-2 mt-1">
          <Toggle label="Has Photos" checked={f.has_photos ?? false} onChange={v => set('has_photos', v)} />
          <Toggle label="Has Before & After Photos" checked={f.has_before_after_photos ?? false} onChange={v => set('has_before_after_photos', v)} />
        </div>
        <div>
          <input type="text" value={f.property_keywords ?? ''} onChange={e => set('property_keywords', e.target.value || undefined)}
            placeholder="Keywords: fixer, estate sale, as-is…"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Scores')}
        <div className="space-y-2.5">
          <RangeRow label="Retail Score" minKey="min_retail_score" maxKey="max_retail_score" f={f} set={set} />
          <RangeRow label="Rental Score" minKey="min_rental_score" maxKey="max_rental_score" f={f} set={set} />
          <RangeRow label="Wholesale" minKey="min_wholesale_score" maxKey="max_wholesale_score" f={f} set={set} />
          <RangeRow label="Market Value" minKey="min_market_value" maxKey="max_market_value" f={f} set={set} prefix="$" step={5000} />
          <RangeRow label="Rental Est." minKey="min_rental_estimate" maxKey="max_rental_estimate" f={f} set={set} prefix="$" step={50} />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Mortgage')}
        <div className="space-y-2.5">
          <RangeRow label="LTV" minKey="min_ltv" maxKey="max_ltv" f={f} set={set} suffix="%" step={1} />
          <RangeRow label="Equity" minKey="min_equity" maxKey="max_equity" f={f} set={set} suffix="%" step={1} />
          <RangeRow label="Loan Balance" minKey="min_loan_balance" maxKey="max_loan_balance" f={f} set={set} prefix="$" step={1000} />
          <RangeRow label="Interest Rate" minKey="min_interest_rate" maxKey="max_interest_rate" f={f} set={set} suffix="%" step={0.25} />
          <RangeRow label="Open Loans" minKey="min_open_loans" maxKey="max_open_loans" f={f} set={set} step={1} />
          <SelectRow label="Loan Type" filterKey="loan_type" options={LOAN_TYPES} f={f} set={set} />
          <SelectRow label="Finance Type" filterKey="mortgage_finance_type" options={MORTGAGE_FINANCE_TYPES} f={f} set={set} />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Ownership & History')}
        <div className="space-y-2.5">
          <RangeRow label="Years Owned" minKey="min_years_owned" maxKey="max_years_owned" f={f} set={set} step={1} />
          <SelectRow label="Last Sale Date" filterKey="last_sale_date" options={LAST_SALE_DATE_OPTIONS} f={f} set={set} />
          <RangeRow label="Last Sale $" minKey="min_last_sale_price" maxKey="max_last_sale_price" f={f} set={set} prefix="$" step={1000} />
          <Toggle label="Intrafamily Transfer Only" checked={f.intrafamily_transfer ?? false} onChange={v => set('intrafamily_transfer', v)} />
        </div>
      </div>

      <div className="space-y-3">
        {heading('Foreclosure')}
        <div className="space-y-2.5">
          <RangeRow label="Preforeclosure" minKey="min_preforeclosure_notices" maxKey="max_preforeclosure_notices" f={f} set={set} step={1} />
        </div>
      </div>
    </div>
  )
}

// ─── Filter summary tags ──────────────────────────────────────────────────────

function filterTags(filters: ScrapeTargetFilters): string[] {
  const tags: string[] = []
  if (filters.lead_types?.length) tags.push(`${filters.lead_types.length} types`)
  if (filters.min_price || filters.max_price) {
    const lo = filters.min_price ? `$${(filters.min_price / 1000).toFixed(0)}k` : ''
    const hi = filters.max_price ? `$${(filters.max_price / 1000).toFixed(0)}k` : ''
    tags.push(lo && hi ? `${lo}–${hi}` : lo || hi)
  }
  if (filters.min_beds) tags.push(`${filters.min_beds}+ bd`)
  if (filters.days_on_market) tags.push(`≤${filters.days_on_market} DOM`)
  if (filters.property_types?.length) tags.push(filters.property_types.slice(0, 2).join(', '))
  if (filters.min_wholesale_score) tags.push(`WS≥${filters.min_wholesale_score}`)
  if (filters.min_equity) tags.push(`${filters.min_equity}%+ eq`)
  return tags
}

// ─── Quick command parser ─────────────────────────────────────────────────────

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

// ─── Active filter count ──────────────────────────────────────────────────────

function activeFilterCount(f: ScrapeTargetFilters): number {
  let n = 0
  if (f.lead_types?.length) n++
  if (f.owner_types?.length) n++
  if (f.listing_status?.length) n++
  if (f.property_types?.length) n++
  if (f.amenities?.length) n++
  const numKeys: (keyof ScrapeTargetFilters)[] = [
    'min_price','max_price','min_beds','max_beds','min_baths','max_baths',
    'min_sqft','max_sqft','min_lot_size','max_lot_size','min_year_built','max_year_built',
    'min_retail_score','max_retail_score','min_rental_score','max_rental_score',
    'min_wholesale_score','max_wholesale_score','min_market_value','max_market_value',
    'min_rental_estimate','max_rental_estimate','min_ltv','max_ltv','min_equity','max_equity',
    'min_loan_balance','max_loan_balance','min_interest_rate','max_interest_rate',
    'min_open_loans','max_open_loans','min_years_owned','max_years_owned',
    'min_last_sale_price','max_last_sale_price','min_preforeclosure_notices','max_preforeclosure_notices',
    'min_profit_potential','max_profit_potential',
  ]
  for (const k of numKeys) if (f[k] !== undefined && f[k] !== null) n++
  const strKeys: (keyof ScrapeTargetFilters)[] = ['hoa','loan_type','mortgage_finance_type','days_on_market','last_sale_date','property_keywords']
  for (const k of strKeys) if (f[k]) n++
  if (f.has_photos) n++
  if (f.has_before_after_photos) n++
  if (f.intrafamily_transfer) n++
  return n
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ScrapeTargetsClient({ targets }: { targets: ScrapeTarget[] }) {
  const [isPending, startTransition] = useTransition()
  const [quickInput, setQuickInput] = useState('')
  const [quickError, setQuickError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [runResult, setRunResult] = useState('')

  const [runType, setRunType] = useState<TargetType>('county')
  const [runValue, setRunValue] = useState('')
  const [runState, setRunState] = useState('VA')
  const [runFilters, setRunFilters] = useState<ScrapeTargetFilters>({})

  function setFilter<K extends keyof ScrapeTargetFilters>(key: K, value: ScrapeTargetFilters[K]) {
    setRunFilters(prev => ({ ...prev, [key]: value }))
  }

  const [optimisticTargets, setOptimistic] = useOptimistic(
    targets,
    (cur: ScrapeTarget[], removedId: string) => cur.filter(t => t.id !== removedId),
  )

  const activeCount = optimisticTargets.filter(t => t.active).length
  const filterCount = activeFilterCount(runFilters)

  const grouped = optimisticTargets.reduce<Record<string, ScrapeTarget[]>>((acc, t) => {
    if (!acc[t.state]) acc[t.state] = []
    acc[t.state].push(t)
    return acc
  }, {})

  function cleanFilters(f: ScrapeTargetFilters): ScrapeTargetFilters {
    return Object.fromEntries(
      Object.entries(f).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0))
    ) as ScrapeTargetFilters
  }

  function handleRun(useAllTargets: boolean) {
    setRunStatus('running')
    setRunResult('')
    startTransition(async () => {
      const result = await runScraperAction(
        useAllTargets ? undefined : { type: runType, value: runValue, state: runState, filters: cleanFilters(runFilters) }
      )
      if (result.ok) {
        setRunStatus('done')
        setRunResult(`${result.count ?? 0} leads scraped`)
      } else {
        setRunStatus('error')
        setRunResult(result.error ?? 'Unknown error')
      }
    })
  }

  function handleSaveTarget() {
    if (!runValue.trim()) return
    startTransition(async () => {
      const fd = new FormData()
      fd.set('type', runType)
      fd.set('value', runValue.trim())
      fd.set('state', runState.toUpperCase())
      await addTargetAction(fd)
    })
  }

  function findByValue(value: string) {
    return optimisticTargets.find(t => t.value.toLowerCase() === value.toLowerCase())
  }

  function handleQuickSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setQuickError('')
    const cmd = parseCmd(quickInput)
    if (!cmd) { setQuickError('Try: county Loudoun VA  •  remove Loudoun  •  pause Fairfax'); return }
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
    <div className="flex gap-6 min-h-0">

      {/* ── Left: Filter panel ────────────────────────────── */}
      <div className="w-80 shrink-0">
        <div className="sticky top-0 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-100">Filters</div>
              {filterCount > 0 && (
                <div className="text-[10px] text-blue-400 mt-0.5">{filterCount} active</div>
              )}
            </div>
            {filterCount > 0 && (
              <button type="button" onClick={() => setRunFilters({})}
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">
                Clear all
              </button>
            )}
          </div>

          {/* Scrollable filter sections */}
          <div className="overflow-y-auto max-h-[calc(100vh-220px)] px-4 py-4">
            <FilterPanel f={runFilters} set={setFilter} />
          </div>
        </div>
      </div>

      {/* ── Right: Run + Targets ──────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-4">

        {/* Run bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Type</span>
              <select value={runType} onChange={e => setRunType(e.target.value as TargetType)}
                className="bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="county">County</option>
                <option value="city">City</option>
                <option value="zip">ZIP</option>
                <option value="state">State</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Location</span>
              <input value={runValue} onChange={e => setRunValue(e.target.value)}
                placeholder="Loudoun, Fairfax, 20148, CA…"
                className="bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1 w-14">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wide">State</span>
              <input value={runState} onChange={e => setRunState(e.target.value.toUpperCase())} maxLength={2}
                className="bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 text-sm uppercase text-center focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2 pb-0.5">
              <button type="button" onClick={handleSaveTarget} disabled={isPending || !runValue.trim()}
                className="h-9 px-3.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-300 text-xs font-medium rounded-md transition-colors border border-zinc-700">
                + Save Target
              </button>
              <button type="button" onClick={() => handleRun(true)} disabled={isPending}
                className="h-9 px-3.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-300 text-xs font-medium rounded-md transition-colors border border-zinc-700">
                Run All Saved
              </button>
              <button type="button" onClick={() => handleRun(false)} disabled={isPending || !runValue.trim()}
                className="h-9 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-semibold rounded-md transition-colors">
                {isPending && runStatus === 'running' ? 'Running…' : '▶ Run Now'}
              </button>
            </div>
          </div>

          {/* Status bar */}
          {runStatus !== 'idle' && (
            <div className={`px-5 py-2 border-t border-zinc-800 text-xs font-mono ${
              runStatus === 'done' ? 'text-emerald-400' :
              runStatus === 'error' ? 'text-red-400' : 'text-zinc-500'
            }`}>
              {runStatus === 'running' ? '⟳ Connecting to scraper…' : runStatus === 'done' ? `✓ ${runResult}` : `✗ ${runResult}`}
            </div>
          )}
        </div>

        {/* Saved targets header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-zinc-300">Saved Targets</span>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full ring-1 ring-zinc-700">
              {activeCount} active
            </span>
          </div>
          <span className="text-xs text-zinc-600">Runs nightly at 2AM</span>
        </div>

        {/* Quick command */}
        <form onSubmit={handleQuickSubmit}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono">$</span>
            <input type="text" value={quickInput} disabled={isPending}
              onChange={e => { setQuickInput(e.target.value); setQuickError('') }}
              placeholder="county Loudoun VA  •  remove Loudoun  •  pause Fairfax  •  resume Fairfax"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-zinc-300 placeholder:text-zinc-700 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50" />
            {isPending && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">…</span>}
          </div>
          {quickError && <p className="text-red-400 text-xs mt-1.5 pl-1 font-mono">{quickError}</p>}
        </form>

        {/* Target list */}
        {optimisticTargets.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl py-14 text-center border-dashed">
            <div className="text-3xl text-zinc-800 mb-3">⊙</div>
            <p className="text-zinc-500 text-sm font-medium">No saved targets</p>
            <p className="text-zinc-700 text-xs mt-1">Enter a location and click <span className="text-zinc-500">+ Save Target</span></p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([state, stateTargets]) => (
              <div key={state}>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-1 mb-1.5">{state}</div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
                  {stateTargets.map(target => {
                    const isExpanded = expandedId === target.id
                    const tags = filterTags(target.filters ?? {})
                    const hasFilters = Object.keys(target.filters ?? {}).length > 0
                    return (
                      <div key={target.id}>
                        <div className="px-4 py-3 flex items-center gap-3">
                          {/* Active dot */}
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${target.active ? 'bg-emerald-400' : 'bg-zinc-700'}`} />

                          {/* Type + name */}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${TYPE_BADGE[target.type]}`}>
                            {target.type}
                          </span>
                          <span className="text-sm text-zinc-100 font-medium">{target.value}</span>

                          {/* Filter tags */}
                          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                            {tags.map(t => (
                              <span key={t} className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-mono">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => setExpandedId(prev => prev === target.id ? null : target.id)}
                              className={`text-[11px] px-2.5 py-1 rounded-md transition-colors font-medium ${
                                isExpanded
                                  ? 'bg-zinc-700 text-zinc-200'
                                  : hasFilters
                                    ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30 hover:bg-blue-500/20'
                                    : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700'
                              }`}
                            >
                              {isExpanded ? 'Close' : hasFilters ? '⚙ Filters ✓' : '⚙ Filters'}
                            </button>

                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => startTransition(async () => { await toggleTargetAction(target.id, !target.active) })}
                              className={`text-[11px] px-2.5 py-1 rounded-md transition-colors font-medium ${
                                target.active
                                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-500/20'
                                  : 'bg-zinc-800 text-zinc-500 ring-1 ring-zinc-700 hover:bg-zinc-700'
                              }`}
                            >
                              {target.active ? 'Active' : 'Paused'}
                            </button>

                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => startTransition(async () => { setOptimistic(target.id); await deleteTargetAction(target.id) })}
                              className="w-6 h-6 flex items-center justify-center text-zinc-700 hover:text-red-400 rounded transition-colors text-base"
                              aria-label={`Delete ${target.value}`}
                            >
                              ×
                            </button>
                          </div>
                        </div>

                        {/* Expanded filter editor */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 bg-zinc-950/60 border-t border-zinc-800">
                            <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Per-target filter overrides</div>
                            <TargetFilterEditor targetId={target.id} initFilters={target.filters ?? {}} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Per-target filter editor ─────────────────────────────────────────────────

function TargetFilterEditor({ targetId, initFilters }: { targetId: string; initFilters: ScrapeTargetFilters }) {
  const [f, setF] = useState<ScrapeTargetFilters>(initFilters)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const count = activeFilterCount(f)

  function set<K extends keyof ScrapeTargetFilters>(key: K, value: ScrapeTargetFilters[K]) {
    setF(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    const clean = Object.fromEntries(
      Object.entries(f).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0))
    ) as ScrapeTargetFilters
    startTransition(async () => {
      await updateTargetFiltersAction(targetId, clean)
      setSaved(true)
    })
  }

  return (
    <div>
      <FilterPanel f={f} set={set} compact />
      <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={isPending}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-colors">
          {isPending ? 'Saving…' : `Save${count > 0 ? ` (${count} active)` : ''}`}
        </button>
        <button type="button" onClick={() => { setF({}); setSaved(false) }} disabled={isPending}
          className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-zinc-800">
          Clear filters
        </button>
        {saved && <span className="text-emerald-400 text-xs font-medium">✓ Saved</span>}
      </div>
    </div>
  )
}
