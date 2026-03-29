'use client'

import { useTransition } from 'react'
import type { Deal, DealStage, ExitStrategy } from '@/lib/types/deals'
import { STAGE_LABELS, EXIT_STRATEGY_LABELS, AI_FLAG_LABELS } from '@/lib/types/deals'
import { setAiFlagAction, updateExitStrategyAction } from '@/app/admin/pipeline/actions'
import TaskList from './TaskList'

interface DealDrawerProps {
  deal: Deal | null
  onClose: () => void
  onStageChange: (stage: DealStage) => void
  onSnooze: () => void
}

const EXIT_STRATEGY_ENTRIES = Object.entries(EXIT_STRATEGY_LABELS) as [
  NonNullable<ExitStrategy>,
  string,
][]

const STAGE_ENTRIES = Object.entries(STAGE_LABELS) as [DealStage, string][]

export default function DealDrawer({
  deal,
  onClose,
  onStageChange,
  onSnooze,
}: DealDrawerProps) {
  const [isPending, startTransition] = useTransition()

  if (!deal) return null

  function handleStageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onStageChange(e.target.value as DealStage)
  }

  function handleExitStrategyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = (e.target.value || null) as ExitStrategy
    startTransition(async () => {
      await updateExitStrategyAction(deal!.id, value)
    })
  }

  function handleClearAiFlag() {
    startTransition(async () => {
      await setAiFlagAction(deal!.id, false, null)
    })
  }

  const ghlUrl = deal.ghl_contact_id
    ? `https://app.gohighlevel.com/contacts/${deal.ghl_contact_id}`
    : null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed inset-y-0 right-0 z-50 w-96 overflow-y-auto border-l border-slate-700 bg-slate-900"
        aria-label="Deal details"
      >
        <Header address={deal.address} onClose={onClose} />

        <div className="space-y-5 p-4">
          <SellerInfo name={deal.seller_name} phone={deal.seller_phone} />

          <Section label="Exit Strategy">
            <select
              defaultValue={deal.exit_strategy ?? ''}
              onChange={handleExitStrategyChange}
              className="w-full rounded border border-zinc-700 bg-slate-800 px-2 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              <option value="">— Select —</option>
              {EXIT_STRATEGY_ENTRIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Section>

          <Section label="Stage">
            <select
              value={deal.stage}
              onChange={handleStageChange}
              className="w-full rounded border border-zinc-700 bg-slate-800 px-2 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              {STAGE_ENTRIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Section>

          {deal.ai_flag && (
            <Section label="AI Flag">
              <div className="flex items-center gap-3">
                <span className="rounded bg-amber-900/50 px-2 py-0.5 text-xs font-medium text-amber-300">
                  {deal.ai_flag_reason
                    ? AI_FLAG_LABELS[deal.ai_flag_reason]
                    : 'Flagged'}
                </span>
                <button
                  onClick={handleClearAiFlag}
                  disabled={isPending}
                  className="text-xs text-zinc-400 hover:text-zinc-100 disabled:opacity-50"
                >
                  Clear flag
                </button>
              </div>
            </Section>
          )}

          <div className="flex gap-2">
            <button
              onClick={onSnooze}
              className="rounded border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-slate-800"
            >
              Snooze
            </button>

            {ghlUrl && (
              <a
                href={ghlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-slate-800"
              >
                Open in GHL
              </a>
            )}
          </div>

          <Section label="Tasks">
            <TaskList dealId={deal.id} tasks={deal.deal_tasks} />
          </Section>
        </div>
      </aside>
    </>
  )
}

function Header({
  address,
  onClose,
}: {
  address: string
  onClose: () => void
}) {
  return (
    <div className="flex items-start justify-between border-b border-slate-700 p-4">
      <h2 className="text-sm font-semibold text-zinc-100 leading-snug pr-2">
        {address}
      </h2>
      <button
        onClick={onClose}
        className="shrink-0 text-zinc-400 hover:text-zinc-100 text-lg leading-none"
        aria-label="Close drawer"
      >
        ×
      </button>
    </div>
  )
}

function SellerInfo({
  name,
  phone,
}: {
  name: string | null
  phone: string | null
}) {
  if (!name && !phone) return null
  return (
    <div className="text-sm text-zinc-300 space-y-0.5">
      {name && <p className="font-medium text-zinc-100">{name}</p>}
      {phone && (
        <a href={`tel:${phone}`} className="text-zinc-400 hover:text-zinc-200 text-xs">
          {phone}
        </a>
      )}
    </div>
  )
}

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      {children}
    </div>
  )
}
