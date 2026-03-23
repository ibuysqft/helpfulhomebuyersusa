'use client'

import { useState, useCallback } from 'react'

// ─── helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtDiff(n: number) {
  const abs = Math.abs(Math.round(n))
  return '$' + abs.toLocaleString('en-US')
}

// ─── types ───────────────────────────────────────────────────────────────────

type Condition = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor'

const REPAIR_COSTS: Record<Condition, number> = {
  Excellent: 0,
  Good: 3_000,
  Fair: 12_000,
  Poor: 28_000,
  'Very Poor': 55_000,
}

const CASH_OFFER_PCT: Record<Condition, number> = {
  Excellent: 0.92,
  Good: 0.88,
  Fair: 0.82,
  Poor: 0.75,
  'Very Poor': 0.67,
}

const CONDITIONS: Condition[] = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']

// ─── calculation logic ────────────────────────────────────────────────────────

function calcResults(
  homeValue: number,
  mortgageBalance: number,
  condition: Condition,
  monthsToSell: number,
) {
  // Traditional / agent sale
  const agentCommission = homeValue * 0.055
  const buyerConcessions = homeValue * 0.02
  const repairsBeforeListing = REPAIR_COSTS[condition]
  const carryingCosts = homeValue * 0.008 * monthsToSell
  const sellerClosingCosts = homeValue * 0.01
  const agentGrossProceeds =
    homeValue - agentCommission - buyerConcessions - repairsBeforeListing - carryingCosts - sellerClosingCosts
  const agentNet = agentGrossProceeds - mortgageBalance

  // Cash sale
  const cashOffer = homeValue * CASH_OFFER_PCT[condition]
  const cashNet = cashOffer - mortgageBalance

  return {
    agent: {
      agentCommission,
      buyerConcessions,
      repairsBeforeListing,
      carryingCosts,
      sellerClosingCosts,
      net: agentNet,
    },
    cash: {
      cashOffer,
      net: cashNet,
    },
    diff: cashNet - agentNet,
    commissionSavings: agentCommission,
    repairSavings: repairsBeforeListing,
    carryingSavings: carryingCosts,
    totalSavings: agentCommission + repairsBeforeListing + carryingCosts + sellerClosingCosts + buyerConcessions,
  }
}

// ─── sub-components ───────────────────────────────────────────────────────────

function LineItem({ label, value, isGreen = false }: { label: string; value: string; isGreen?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/[0.06] last:border-0 text-sm">
      <span style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>{label}</span>
      <span
        className="font-semibold tabular-nums"
        style={{
          color: isGreen ? '#4ADE80' : '#F87171',
          fontFamily: 'var(--font-body)',
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

interface NetProceedsCalculatorProps {
  /** if true, renders as a self-contained section with outer padding */
  standalone?: boolean
}

export function NetProceedsCalculator({ standalone = false }: NetProceedsCalculatorProps) {
  const [homeValue, setHomeValue] = useState(350_000)
  const [homeValueInput, setHomeValueInput] = useState('350000')
  const [mortgageBalance, setMortgageBalance] = useState(0)
  const [mortgageInput, setMortgageInput] = useState('0')
  const [condition, setCondition] = useState<Condition>('Good')
  const [months, setMonths] = useState(4)

  const results = calcResults(homeValue, mortgageBalance, condition, months)
  const cashWins = results.diff >= 0

  // ── handlers ────────────────────────────────────────────────────────────────

  const handleHomeValueSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setHomeValue(v)
    setHomeValueInput(String(v))
  }, [])

  const handleHomeValueText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setHomeValueInput(raw)
    const n = Number(raw)
    if (n >= 50_000 && n <= 800_000) setHomeValue(n)
  }, [])

  const handleMortgageText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setMortgageInput(raw)
    const n = Number(raw)
    if (!isNaN(n)) setMortgageBalance(n)
  }, [])

  // ── markup ───────────────────────────────────────────────────────────────────

  const inner = (
    <div className="max-w-5xl mx-auto">
      {/* Inputs panel */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6"
        style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h3
          className="text-lg font-semibold text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Enter Your Home Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Home value */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label
                htmlFor="npc-hv-slider"
                className="text-sm font-medium"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
              >
                Home Value / Asking Price
              </label>
              <input
                type="text"
                value={homeValueInput ? '$' + Number(homeValueInput).toLocaleString('en-US') : ''}
                onChange={handleHomeValueText}
                className="w-28 text-right rounded-lg px-2 py-1 text-sm font-bold focus:outline-none focus:ring-1"
                style={{
                  background: '#1E2A3A',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#FCD34D',
                  fontFamily: 'var(--font-body)',
                }}
                aria-label="Home value input"
              />
            </div>
            <input
              id="npc-hv-slider"
              type="range"
              min={50_000}
              max={800_000}
              step={5_000}
              value={homeValue}
              onChange={handleHomeValueSlider}
              className="w-full cursor-pointer"
              style={{ accentColor: '#2563EB' }}
              aria-label="Home value slider"
            />
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
            >
              <span>$50K</span>
              <span>$800K</span>
            </div>
          </div>

          {/* Mortgage balance */}
          <div>
            <label
              htmlFor="npc-mortgage"
              className="block text-sm font-medium mb-2"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              Remaining Mortgage Balance
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold"
                style={{ color: '#64748B' }}
              >
                $
              </span>
              <input
                id="npc-mortgage"
                type="text"
                inputMode="numeric"
                value={mortgageInput}
                onChange={handleMortgageText}
                placeholder="0"
                className="w-full rounded-lg pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1"
                style={{
                  background: '#1E2A3A',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: '#475569', fontFamily: 'var(--font-body)' }}>
              Enter 0 if you own free and clear
            </p>
          </div>

          {/* Condition */}
          <div>
            <label
              htmlFor="npc-condition"
              className="block text-sm font-medium mb-2"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
            >
              Home Condition
            </label>
            <select
              id="npc-condition"
              value={condition}
              onChange={e => setCondition(e.target.value as Condition)}
              className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 appearance-none cursor-pointer"
              style={{
                background: '#1E2A3A',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#E2E8F0',
                fontFamily: 'var(--font-body)',
              }}
            >
              {CONDITIONS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Months to sell */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label
                htmlFor="npc-months-slider"
                className="text-sm font-medium"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
              >
                Months to Sell (if listing)
              </label>
              <span
                className="font-bold"
                style={{ color: '#FCD34D', fontFamily: 'var(--font-body)' }}
              >
                {months} {months === 1 ? 'month' : 'months'}
              </span>
            </div>
            <input
              id="npc-months-slider"
              type="range"
              min={1}
              max={12}
              step={1}
              value={months}
              onChange={e => setMonths(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{ accentColor: '#2563EB' }}
              aria-label="Months to sell slider"
            />
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
            >
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results columns */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Agent column */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
            >
              List with an Agent
            </span>
          </div>

          <LineItem label="Agent commission (5.5%)" value={`− ${fmt(results.agent.agentCommission)}`} />
          <LineItem label="Buyer concessions (2%)" value={`− ${fmt(results.agent.buyerConcessions)}`} />
          <LineItem
            label={`Repairs before listing (${condition})`}
            value={results.agent.repairsBeforeListing > 0 ? `− ${fmt(results.agent.repairsBeforeListing)}` : '$0'}
            isGreen={results.agent.repairsBeforeListing === 0}
          />
          <LineItem
            label={`Carrying costs (${months} mo.)`}
            value={`− ${fmt(results.agent.carryingCosts)}`}
          />
          <LineItem label="Seller closing costs (1%)" value={`− ${fmt(results.agent.sellerClosingCosts)}`} />
          {mortgageBalance > 0 && (
            <LineItem label="Mortgage payoff" value={`− ${fmt(mortgageBalance)}`} />
          )}

          <div
            className="mt-5 pt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
              Your Net Proceeds
            </p>
            <p
              className="text-4xl font-bold tabular-nums"
              style={{
                color: results.agent.net >= 0 ? '#E2E8F0' : '#F87171',
                fontFamily: 'var(--font-heading)',
                transition: 'color 200ms ease',
              }}
            >
              {fmt(results.agent.net)}
            </p>
            <p className="text-xs mt-2" style={{ color: '#475569', fontFamily: 'var(--font-body)' }}>
              Avg. {months * 30} days on market + closing
            </p>
          </div>
        </div>

        {/* Cash buyer column */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
            border: '1px solid rgba(74, 222, 128, 0.25)',
          }}
        >
          {/* Recommended badge */}
          <div
            className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl"
            style={{ background: '#16A34A', color: 'white', fontFamily: 'var(--font-body)' }}
          >
            Recommended
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}
            >
              Sell to Helpful Home Buyers
            </span>
          </div>

          <div
            className="flex justify-between items-center py-2 border-b text-sm"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <span style={{ color: '#86EFAC', fontFamily: 'var(--font-body)' }}>
              Cash offer ({Math.round(CASH_OFFER_PCT[condition] * 100)}% of value)
            </span>
            <span className="font-semibold tabular-nums" style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}>
              {fmt(results.cash.cashOffer)}
            </span>
          </div>
          <LineItem label="Agent commissions" value="$0" isGreen />
          <LineItem label="Repairs needed" value="$0" isGreen />
          <LineItem label="Carrying costs" value="$0 (close in 14 days)" isGreen />
          <LineItem label="Seller closing costs" value="$0 (we pay them)" isGreen />
          {mortgageBalance > 0 && (
            <LineItem label="Mortgage payoff" value={`− ${fmt(mortgageBalance)}`} />
          )}

          <div
            className="mt-5 pt-5"
            style={{ borderTop: '1px solid rgba(74, 222, 128, 0.15)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}>
              Your Net Proceeds
            </p>
            <p
              className="text-4xl font-bold tabular-nums"
              style={{
                color: '#4ADE80',
                fontFamily: 'var(--font-heading)',
                transition: 'color 200ms ease',
              }}
            >
              {fmt(results.cash.net)}
            </p>
            <p className="text-xs mt-2" style={{ color: '#86EFAC', fontFamily: 'var(--font-body)' }}>
              Avg. 14 days · close on your schedule
            </p>
          </div>
        </div>
      </div>

      {/* Difference banner */}
      <div
        className="rounded-2xl px-6 py-5 text-center mb-4"
        style={{
          background: cashWins
            ? 'linear-gradient(135deg, #052e16 0%, #14532d 100%)'
            : 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          border: cashWins ? '1px solid rgba(74,222,128,0.35)' : '1px solid rgba(129,140,248,0.35)',
        }}
      >
        <p
          className="text-2xl md:text-3xl font-bold mb-1"
          style={{
            fontFamily: 'var(--font-heading)',
            color: cashWins ? '#4ADE80' : '#A5B4FC',
          }}
        >
          {cashWins
            ? `You'd net ${fmtDiff(results.diff)} MORE with a cash sale`
            : `You'd net ${fmtDiff(results.diff)} MORE listing with an agent`}
        </p>
        <p className="text-sm" style={{ color: cashWins ? '#86EFAC' : '#C7D2FE', fontFamily: 'var(--font-body)' }}>
          {cashWins
            ? 'After all fees, repairs, and carrying costs — cash wins.'
            : 'Based on your inputs, a traditional listing may net more. Our offer is still commitment-free.'}
        </p>
      </div>

      {/* Savings breakdown callout */}
      {cashWins && (
        <div
          className="rounded-2xl px-6 py-5"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
          >
            Savings Breakdown
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Commissions saved', value: results.commissionSavings },
              { label: 'Repairs saved', value: results.agent.repairsBeforeListing },
              { label: 'Carrying costs saved', value: results.agent.carryingCosts },
              { label: 'Closing costs saved', value: results.agent.sellerClosingCosts + results.agent.buyerConcessions },
            ].map(item => (
              <div
                key={item.label}
                className="flex-1 min-w-[140px] rounded-xl px-4 py-3 text-center"
                style={{ background: '#1E2A3A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-xs mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}>
                  {item.label}
                </p>
                <p
                  className="font-bold tabular-nums"
                  style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}
                >
                  {fmt(item.value)}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-center mt-4 font-bold"
            style={{ color: '#4ADE80', fontFamily: 'var(--font-body)' }}
          >
            Total savings: {fmt(results.totalSavings)}
          </p>
        </div>
      )}

      <p
        className="text-xs text-center mt-4"
        style={{ color: '#475569', fontFamily: 'var(--font-body)' }}
      >
        *Estimates only. Actual offer depends on property details, location, and market conditions. Get a real offer — no obligation.
      </p>
    </div>
  )

  if (!standalone) return inner

  return (
    <section className="py-16 px-4" style={{ background: '#0F1E3C' }}>
      {inner}
    </section>
  )
}
