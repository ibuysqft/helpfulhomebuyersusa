'use client'

import { useState } from 'react'

const MIN = 100_000
const MAX = 800_000
const STEP = 10_000
const DEFAULT = 300_000

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function calcTraditional(homeValue: number) {
  const commission = homeValue * 0.06
  const closing = homeValue * 0.02
  const repairs = 15_000
  return homeValue - commission - closing - repairs
}

function calcCash(homeValue: number) {
  return homeValue * 0.9
}

export function ClosingCalculator() {
  const [homeValue, setHomeValue] = useState(DEFAULT)

  const traditionalNet = calcTraditional(homeValue)
  const cashNet = calcCash(homeValue)
  const savings = cashNet - traditionalNet

  return (
    <section className="bg-slate-800/50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            See How Much You Save
          </h2>
          <p className="text-slate-400 text-sm">
            Compare your net proceeds — cash offer vs. traditional sale.
          </p>
        </div>

        <div className="bg-slate-900 border border-white/[0.06] rounded-2xl p-8 shadow-2xl">
          {/* Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <label
                htmlFor="home-value-slider"
                className="text-slate-300 text-sm font-medium"
              >
                Estimated Home Value
              </label>
              <span className="text-amber-400 font-bold text-xl">
                {fmt(homeValue)}
              </span>
            </div>
            <input
              id="home-value-slider"
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
              aria-label="Home value"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>{fmt(MIN)}</span>
              <span>{fmt(MAX)}</span>
            </div>
          </div>

          {/* Result cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Traditional */}
            <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-5">
              <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Traditional Sale
              </p>
              <ul className="text-slate-400 text-xs space-y-1 mb-4">
                <li>− 6% commission: <span className="text-red-400">{fmt(homeValue * 0.06)}</span></li>
                <li>− 2% closing costs: <span className="text-red-400">{fmt(homeValue * 0.02)}</span></li>
                <li>− Est. repairs: <span className="text-red-400">{fmt(15_000)}</span></li>
              </ul>
              <p className="text-slate-500 text-xs mb-1">Net Proceeds</p>
              <p className="text-3xl font-bold text-white">{fmt(traditionalNet)}</p>
              <p className="text-slate-500 text-xs mt-2">Traditional: ~75 days</p>
            </div>

            {/* Cash */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-5">
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Our Cash Offer
              </p>
              <ul className="text-slate-400 text-xs space-y-1 mb-4">
                <li className="text-slate-400">No commission: <span className="text-green-400">$0</span></li>
                <li className="text-slate-400">No closing costs: <span className="text-green-400">$0</span></li>
                <li className="text-slate-400">No repairs needed: <span className="text-green-400">$0</span></li>
              </ul>
              <p className="text-slate-500 text-xs mb-1">Net Proceeds</p>
              <p className="text-3xl font-bold text-amber-400">{fmt(cashNet)}</p>
              <p className="text-slate-500 text-xs mt-2">Cash: ~10 days</p>
            </div>
          </div>

          {/* Savings callout */}
          {savings > 0 && (
            <div className="bg-green-950/40 border border-green-800/40 rounded-xl px-5 py-4 text-center">
              <p className="text-green-400 text-sm font-semibold">
                You could save{' '}
                <span className="text-white font-bold">{fmt(savings)}</span>
                {' '}in fees, repairs, and carrying costs
              </p>
              <p className="text-slate-500 text-xs mt-1">
                No fees, no repairs, closes in 7 days
              </p>
            </div>
          )}

          <p className="text-slate-600 text-xs text-center mt-6">
            *Cash offer estimate. Actual offer depends on property condition and location.
          </p>
        </div>
      </div>
    </section>
  )
}
