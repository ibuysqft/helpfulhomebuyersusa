'use client'

import { useState, useTransition } from 'react'
import { updateTargetFiltersAction } from './actions'
import type { ScrapeTargetFilters } from '@/lib/mls-types'
import {
  LEAD_TYPES, PROPERTY_TYPES, OWNER_TYPES, LISTING_STATUS, AMENITIES,
  LOAN_TYPES, MORTGAGE_FINANCE_TYPES, LAST_SALE_DATE_OPTIONS,
  DAYS_ON_MARKET_OPTIONS, HOA_OPTIONS, SQFT_OPTIONS, LOT_SIZE_OPTIONS,
} from './filter-constants'

// ─── primitives ──────────────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-slate-700 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-slate-300 hover:text-zinc-100 transition-colors"
      >
        {title}
        <span className="text-slate-500 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="pb-4 space-y-3">{children}</div>}
    </div>
  )
}

function CheckGrid({ items, selected, onChange }: {
  items: readonly { value: string; label: string }[]
  selected: string[] | undefined
  onChange: (vals: string[]) => void
}) {
  const sel = selected ?? []
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-3">
      {items.map(({ value, label }) => (
        <label key={value} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={sel.includes(value)}
            onChange={e => onChange(e.target.checked ? [...sel, value] : sel.filter(v => v !== value))}
            className="accent-blue-500 w-3.5 h-3.5"
          />
          {label}
        </label>
      ))}
    </div>
  )
}

function RangeRow({ label, minKey, maxKey, f, set, prefix = '', suffix = '', step = 1, placeholder }: {
  label: string
  minKey: keyof ScrapeTargetFilters
  maxKey: keyof ScrapeTargetFilters
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
  prefix?: string; suffix?: string; step?: number; placeholder?: string
}) {
  const inp = 'w-24 bg-slate-950 border border-slate-600 rounded px-2 py-1.5 text-zinc-100 placeholder:text-slate-600 text-xs focus:outline-none focus:border-blue-500'
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {prefix && <span className="text-slate-500 text-xs">{prefix}</span>}
        <input type="number" step={step} placeholder={placeholder ?? 'Min'}
          value={(f[minKey] as number | undefined) ?? ''}
          onChange={e => set(minKey, e.target.value ? Number(e.target.value) as ScrapeTargetFilters[typeof minKey] : undefined as ScrapeTargetFilters[typeof minKey])}
          className={inp} />
        <span className="text-slate-500 text-xs">–</span>
        <input type="number" step={step} placeholder="Max"
          value={(f[maxKey] as number | undefined) ?? ''}
          onChange={e => set(maxKey, e.target.value ? Number(e.target.value) as ScrapeTargetFilters[typeof maxKey] : undefined as ScrapeTargetFilters[typeof maxKey])}
          className={inp} />
        {suffix && <span className="text-slate-500 text-xs">{suffix}</span>}
      </div>
    </div>
  )
}

function SelectInput({ label, filterKey, options, f, set }: {
  label: string
  filterKey: keyof ScrapeTargetFilters
  options: readonly { value: string; label: string }[]
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-slate-400">{label}</span>
      <select
        value={(f[filterKey] as string | undefined) ?? ''}
        onChange={e => set(filterKey, (e.target.value || undefined) as ScrapeTargetFilters[typeof filterKey])}
        className="bg-slate-950 border border-slate-600 rounded px-2 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-blue-500"
      >
        <option value="">Any</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function SqftSelect({ label, minKey, maxKey, options, f, set }: {
  label: string
  minKey: keyof ScrapeTargetFilters
  maxKey: keyof ScrapeTargetFilters
  options: readonly string[]
  f: ScrapeTargetFilters
  set: <K extends keyof ScrapeTargetFilters>(k: K, v: ScrapeTargetFilters[K]) => void
}) {
  const sel = 'bg-slate-950 border border-slate-600 rounded px-2 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-blue-500'
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-1.5">
        <select value={(f[minKey] as number | undefined) ?? ''} onChange={e => set(minKey, (e.target.value ? Number(e.target.value) : undefined) as ScrapeTargetFilters[typeof minKey])} className={sel}>
          <option value="">Any</option>
          {options.map(v => <option key={v} value={v}>{Number(v).toLocaleString()}</option>)}
        </select>
        <span className="text-slate-500 text-xs">–</span>
        <select value={(f[maxKey] as number | undefined) ?? ''} onChange={e => set(maxKey, (e.target.value ? Number(e.target.value) : undefined) as ScrapeTargetFilters[typeof maxKey])} className={sel}>
          <option value="">Any</option>
          {options.map(v => <option key={v} value={v}>{Number(v).toLocaleString()}</option>)}
        </select>
      </div>
    </div>
  )
}

// ─── main panel ──────────────────────────────────────────────────────────────

export function FilterPanel({ targetId, filters: init }: {
  targetId: string
  filters: ScrapeTargetFilters
}) {
  const [f, setF] = useState<ScrapeTargetFilters>(init ?? {})
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  function set<K extends keyof ScrapeTargetFilters>(key: K, value: ScrapeTargetFilters[K]) {
    setF(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    const clean = Object.fromEntries(
      Object.entries(f).filter(([, v]) =>
        v !== undefined && v !== null && v !== '' && v !== 'all' && v !== 'any' &&
        !(Array.isArray(v) && v.length === 0)
      )
    ) as ScrapeTargetFilters
    startTransition(async () => {
      await updateTargetFiltersAction(targetId, clean)
      setSaved(true)
    })
  }

  function handleClear() {
    setF({})
    setSaved(false)
  }

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 mt-1 space-y-0.5">

      {/* ── Lead Types ───────────────────────────────────────── */}
      <Section title="Lead Types" defaultOpen>
        <p className="text-xs text-slate-500 -mt-1 mb-2">Include leads that match any selected type</p>
        <CheckGrid items={LEAD_TYPES} selected={f.lead_types} onChange={vals => set('lead_types', vals)} />
        {(f.lead_types?.length ?? 0) > 0 && (
          <div className="flex gap-2 mt-2 items-center">
            <span className="text-xs text-slate-500">Match all selected:</span>
            <button type="button" onClick={() => set('lead_types_match_all', !f.lead_types_match_all)}
              className={`text-xs px-2 py-0.5 rounded ${f.lead_types_match_all ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              {f.lead_types_match_all ? 'On' : 'Off'}
            </button>
          </div>
        )}
      </Section>

      {/* ── Owner & Status ───────────────────────────────────── */}
      <Section title="Owner Type & Listing Status">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-500 mb-2">Owner Type</p>
            <CheckGrid items={OWNER_TYPES} selected={f.owner_types} onChange={vals => set('owner_types', vals)} />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-2">Listing Status</p>
            <CheckGrid items={LISTING_STATUS} selected={f.listing_status} onChange={vals => set('listing_status', vals)} />
          </div>
        </div>
      </Section>

      {/* ── Sellability Scores ───────────────────────────────── */}
      <Section title="Sellability Scores">
        <p className="text-xs text-slate-500 -mt-1 mb-3">AI scores 0–999. Filter to high-propensity leads only.</p>
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Retail Score" minKey="min_retail_score" maxKey="max_retail_score" f={f} set={set} />
          <RangeRow label="Rental Score" minKey="min_rental_score" maxKey="max_rental_score" f={f} set={set} />
          <RangeRow label="Wholesale Score" minKey="min_wholesale_score" maxKey="max_wholesale_score" f={f} set={set} />
        </div>
      </Section>

      {/* ── Property Valuations ──────────────────────────────── */}
      <Section title="Property Valuations">
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Market Value" minKey="min_market_value" maxKey="max_market_value" f={f} set={set} prefix="$" step={1000} />
          <RangeRow label="Rental Estimate" minKey="min_rental_estimate" maxKey="max_rental_estimate" f={f} set={set} prefix="$" step={50} />
        </div>
      </Section>

      {/* ── Property Features ────────────────────────────────── */}
      <Section title="Property Features">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 mb-2">Property Types</p>
            <CheckGrid items={PROPERTY_TYPES} selected={f.property_types} onChange={vals => set('property_types', vals)} />
          </div>
          <div className="flex flex-wrap gap-5">
            <RangeRow label="Bedrooms" minKey="min_beds" maxKey="max_beds" f={f} set={set} step={1} />
            <RangeRow label="Bathrooms" minKey="min_baths" maxKey="max_baths" f={f} set={set} step={0.5} />
          </div>
          <div className="flex flex-wrap gap-5">
            <SqftSelect label="Square Feet" minKey="min_sqft" maxKey="max_sqft" options={SQFT_OPTIONS} f={f} set={set} />
            <SqftSelect label="Lot Size (sqft)" minKey="min_lot_size" maxKey="max_lot_size" options={LOT_SIZE_OPTIONS.map(o => o.value)} f={f} set={set} />
          </div>
          <RangeRow label="Year Built" minKey="min_year_built" maxKey="max_year_built" f={f} set={set} step={1} placeholder="e.g. 1980" />
          <div>
            <p className="text-xs text-slate-500 mb-2">Amenities</p>
            <CheckGrid items={AMENITIES} selected={f.amenities} onChange={vals => set('amenities', vals)} />
          </div>
          <SelectInput label="HOA" filterKey="hoa" options={HOA_OPTIONS} f={f} set={set} />
        </div>
      </Section>

      {/* ── Listing Info ─────────────────────────────────────── */}
      <Section title="Listing Information">
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Listing Price" minKey="min_price" maxKey="max_price" f={f} set={set} prefix="$" step={1000} />
          <SelectInput label="Days on Market" filterKey="days_on_market" options={DAYS_ON_MARKET_OPTIONS} f={f} set={set} />
          <RangeRow label="Profit Potential" minKey="min_profit_potential" maxKey="max_profit_potential" f={f} set={set} suffix="%" step={1} />
        </div>
        <div className="flex flex-wrap gap-5 mt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={f.has_photos ?? false}
              onChange={e => set('has_photos', e.target.checked)}
              className="accent-blue-500 w-3.5 h-3.5" />
            Has Photos
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={f.has_before_after_photos ?? false}
              onChange={e => set('has_before_after_photos', e.target.checked)}
              className="accent-blue-500 w-3.5 h-3.5" />
            Has Before & After Photos
          </label>
        </div>
        <div className="mt-3">
          <span className="text-xs text-slate-400 block mb-1">Property Keywords</span>
          <input type="text" value={f.property_keywords ?? ''}
            onChange={e => set('property_keywords', e.target.value || undefined)}
            placeholder="e.g. fixer, estate sale"
            className="w-full bg-slate-950 border border-slate-600 rounded px-3 py-1.5 text-xs text-zinc-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500" />
        </div>
      </Section>

      {/* ── Mortgage Info ────────────────────────────────────── */}
      <Section title="Mortgage Information">
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Loan to Value" minKey="min_ltv" maxKey="max_ltv" f={f} set={set} suffix="%" step={1} />
          <RangeRow label="Equity" minKey="min_equity" maxKey="max_equity" f={f} set={set} suffix="%" step={1} />
          <RangeRow label="Estimated Loan Balance" minKey="min_loan_balance" maxKey="max_loan_balance" f={f} set={set} prefix="$" step={1000} />
        </div>
        <div className="flex flex-wrap gap-5 mt-3">
          <RangeRow label="Mortgage Interest Rate" minKey="min_interest_rate" maxKey="max_interest_rate" f={f} set={set} suffix="%" step={0.25} />
          <RangeRow label="Open Loans" minKey="min_open_loans" maxKey="max_open_loans" f={f} set={set} step={1} />
        </div>
        <div className="flex flex-wrap gap-5 mt-3">
          <SelectInput label="Loan Type" filterKey="loan_type" options={LOAN_TYPES} f={f} set={set} />
          <SelectInput label="Mortgage Finance Type" filterKey="mortgage_finance_type" options={MORTGAGE_FINANCE_TYPES} f={f} set={set} />
        </div>
      </Section>

      {/* ── Ownership Info ───────────────────────────────────── */}
      <Section title="Ownership Information">
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Years of Ownership" minKey="min_years_owned" maxKey="max_years_owned" f={f} set={set} step={1} />
        </div>
      </Section>

      {/* ── Previous Sale ────────────────────────────────────── */}
      <Section title="Previous Sale Information">
        <div className="flex flex-wrap gap-5">
          <SelectInput label="Last Sale Date" filterKey="last_sale_date" options={LAST_SALE_DATE_OPTIONS} f={f} set={set} />
          <RangeRow label="Last Sale Price" minKey="min_last_sale_price" maxKey="max_last_sale_price" f={f} set={set} prefix="$" step={1000} />
        </div>
        <div className="mt-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={f.intrafamily_transfer ?? false}
              onChange={e => set('intrafamily_transfer', e.target.checked)}
              className="accent-blue-500 w-3.5 h-3.5" />
            Intrafamily Transfer only
          </label>
        </div>
      </Section>

      {/* ── Foreclosure Info ─────────────────────────────────── */}
      <Section title="Foreclosure Information">
        <div className="flex flex-wrap gap-5">
          <RangeRow label="Preforeclosure Notices Served" minKey="min_preforeclosure_notices" maxKey="max_preforeclosure_notices" f={f} set={set} step={1} />
        </div>
      </Section>

      {/* ── Save ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-slate-700 flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={isPending}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded transition-colors">
          {isPending ? 'Saving…' : 'Save Filters'}
        </button>
        <button type="button" onClick={handleClear} disabled={isPending}
          className="text-slate-400 hover:text-slate-200 text-sm px-3 py-2 rounded transition-colors">
          Clear All
        </button>
        {saved && <span className="text-green-400 text-sm">✓ Saved</span>}
      </div>
    </div>
  )
}
