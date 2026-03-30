'use client'

import { useState, useTransition } from 'react'
import {
  runScrapeAction,
  runScoreAction,
  runOutreachAction,
  togglePauseAction,
  updateDailyLimitsAction,
} from './actions'

interface BudgetRow {
  email_limit: number
  email_sent: number
  sms_limit: number
  sms_sent: number
  paused: boolean
  pause_reason: string | null
}

interface Props {
  budget: BudgetRow | null
  counts: Record<string, number>
}

interface StepResult {
  ok: boolean
  message: string
}

export function MlsControlClient({ budget, counts }: Props) {
  const [isPending, startTransition] = useTransition()
  const [scrapeResult, setScrapeResult] = useState<StepResult | null>(null)
  const [scoreResult, setScoreResult] = useState<StepResult | null>(null)
  const [outreachResult, setOutreachResult] = useState<StepResult | null>(null)
  const [emailLimit, setEmailLimit] = useState(budget?.email_limit ?? 20)
  const [smsLimit, setSmsLimit] = useState(budget?.sms_limit ?? 10)
  const [limitsResult, setLimitsResult] = useState<string | null>(null)

  const isPaused = budget?.paused ?? false

  function handleScrape() {
    setScrapeResult(null)
    startTransition(async () => {
      const r = await runScrapeAction()
      setScrapeResult(r)
    })
  }

  function handleScore() {
    setScoreResult(null)
    startTransition(async () => {
      const r = await runScoreAction()
      setScoreResult(r)
    })
  }

  function handleOutreach() {
    setOutreachResult(null)
    startTransition(async () => {
      const r = await runOutreachAction()
      setOutreachResult(r)
    })
  }

  function handleTogglePause() {
    startTransition(async () => {
      await togglePauseAction(!isPaused)
    })
  }

  function handleSaveLimits() {
    setLimitsResult(null)
    startTransition(async () => {
      await updateDailyLimitsAction(emailLimit, smsLimit)
      setLimitsResult('Saved')
    })
  }

  return (
    <div className="space-y-6">

      {/* Lead Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New', value: counts['new'] ?? 0, color: 'text-blue-400' },
          { label: 'Queued', value: counts['queued'] ?? 0, color: 'text-orange-400' },
          { label: 'Contacted', value: counts['contacted'] ?? 0, color: 'text-emerald-400' },
          { label: 'Warm', value: (counts['warm_cash'] ?? 0) + (counts['warm_creative'] ?? 0), color: 'text-green-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Daily Budget */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">Today&apos;s Budget</h2>
          <button
            onClick={handleTogglePause}
            disabled={isPending}
            className={`text-xs px-3 py-1.5 rounded font-medium transition-colors ${
              isPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-red-700 hover:bg-red-600 text-white'
            } disabled:opacity-50`}
          >
            {isPaused ? 'Resume Sending' : 'Pause Sending'}
          </button>
        </div>

        {isPaused && (
          <div className="mb-4 px-3 py-2 bg-red-900/30 border border-red-700 rounded text-red-400 text-xs">
            Paused{budget?.pause_reason ? `: ${budget.pause_reason}` : ''}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Email</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-zinc-100">{budget?.email_sent ?? 0}</span>
              <span className="text-zinc-500 text-sm">/ {budget?.email_limit ?? 20} sent</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((budget?.email_sent ?? 0) / (budget?.email_limit ?? 20)) * 100)}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">SMS</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-zinc-100">{budget?.sms_sent ?? 0}</span>
              <span className="text-zinc-500 text-sm">/ {budget?.sms_limit ?? 10} sent</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((budget?.sms_sent ?? 0) / (budget?.sms_limit ?? 10)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Limit Controls */}
        <div className="border-t border-slate-700 pt-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Email limit / day</label>
            <input
              type="number"
              min={1}
              max={200}
              value={emailLimit}
              onChange={e => setEmailLimit(Number(e.target.value))}
              className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-zinc-100"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 block mb-1">SMS limit / day</label>
            <input
              type="number"
              min={1}
              max={100}
              value={smsLimit}
              onChange={e => setSmsLimit(Number(e.target.value))}
              className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-zinc-100"
            />
          </div>
          <button
            onClick={handleSaveLimits}
            disabled={isPending}
            className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-zinc-100 text-sm rounded transition-colors disabled:opacity-50"
          >
            Save
          </button>
          {limitsResult && <span className="text-xs text-emerald-400">{limitsResult}</span>}
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-4">Run Pipeline Steps</h2>
        <div className="space-y-3">

          <PipelineStep
            step="1"
            label="Scrape DealSauce"
            description="Log into DealSauce, pull on-market listings, save new ones to Supabase"
            buttonLabel="Run Scraper"
            onClick={handleScrape}
            result={scrapeResult}
            disabled={isPending}
          />

          <PipelineStep
            step="2"
            label="Score Leads"
            description="Scan descriptions for distress keywords, score 1–10, queue scores ≥ 6 for outreach"
            buttonLabel="Score Now"
            onClick={handleScore}
            result={scoreResult}
            disabled={isPending}
          />

          <PipelineStep
            step="3"
            label="Send Outreach → GHL"
            description="Create contacts in GHL and enroll in workflow. Respects daily budget limits."
            buttonLabel="Send Outreach"
            onClick={handleOutreach}
            result={outreachResult}
            disabled={isPending || isPaused}
            warning={isPaused ? 'Sending is paused' : undefined}
          />

        </div>
      </div>

    </div>
  )
}

function PipelineStep({
  step,
  label,
  description,
  buttonLabel,
  onClick,
  result,
  disabled,
  warning,
}: {
  step: string
  label: string
  description: string
  buttonLabel: string
  onClick: () => void
  result: StepResult | null
  disabled: boolean
  warning?: string
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs font-bold text-amber-400">{step}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-100">{label}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
        {result && (
          <p className={`text-xs mt-1.5 font-medium ${result.ok ? 'text-emerald-400' : 'text-red-400'}`}>
            {result.ok ? '✓' : '✗'} {result.message}
          </p>
        )}
        {warning && !result && (
          <p className="text-xs mt-1.5 text-amber-500">{warning}</p>
        )}
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex-shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-zinc-500 text-white text-xs font-medium rounded transition-colors"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
