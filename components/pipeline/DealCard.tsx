'use client'

import { useTransition } from 'react'
import type { Deal } from '@/lib/types/deals'
import { EXIT_STRATEGY_LABELS, AI_FLAG_LABELS } from '@/lib/types/deals'
import { getAgingClass } from '@/lib/deals'
import { snoozeDealAction } from '@/app/admin/pipeline/actions'

interface DealCardProps {
  deal: Deal
  onOpenDrawer: (deal: Deal) => void
}

const CLASS_BADGE: Record<Deal['deal_class'], string> = {
  residential: 'bg-blue-900 text-blue-200',
  commercial: 'bg-orange-900 text-orange-200',
}

const CLASS_LABEL: Record<Deal['deal_class'], string> = {
  residential: 'RES',
  commercial: 'COMM',
}

function getOverdueTasks(deal: Deal): number {
  const now = new Date()
  return deal.deal_tasks.filter(
    (t) => !t.completed && t.due_date && new Date(t.due_date) < now
  ).length
}

export function DealCard({ deal, onOpenDrawer }: DealCardProps) {
  const [isPending, startTransition] = useTransition()
  const overdue = getOverdueTasks(deal)
  const agingBorder = getAgingClass(deal.last_stage_change)
  const shortAddress = deal.address.split(',')[0]

  function handleSnooze(e: React.MouseEvent) {
    e.stopPropagation()
    startTransition(async () => {
      await snoozeDealAction(deal.id)
    })
  }

  return (
    <div
      className={`bg-slate-800 border ${agingBorder} rounded-lg p-3 cursor-pointer hover:border-slate-600 transition-colors`}
      onClick={() => onOpenDrawer(deal)}
      role="button"
      tabIndex={0}
      aria-label={`Open deal: ${deal.address}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpenDrawer(deal)}
    >
      {/* Address */}
      <p className="text-zinc-100 text-sm font-medium truncate mb-2" title={deal.address}>
        {shortAddress}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1 mb-2">
        <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${CLASS_BADGE[deal.deal_class]}`}>
          {CLASS_LABEL[deal.deal_class]}
        </span>

        {deal.exit_strategy && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
            {EXIT_STRATEGY_LABELS[deal.exit_strategy]}
          </span>
        )}

        {deal.ai_flag && (
          <span
            className="text-xs px-1.5 py-0.5 rounded bg-red-900 text-red-300 cursor-help"
            title={deal.ai_flag_reason ? AI_FLAG_LABELS[deal.ai_flag_reason] : 'AI flagged'}
            aria-label={`AI flag: ${deal.ai_flag_reason ? AI_FLAG_LABELS[deal.ai_flag_reason] : 'flagged'}`}
          >
            AI
          </span>
        )}
      </div>

      {/* Task status + snooze */}
      <div className="flex items-center justify-between mt-1">
        {overdue > 0 ? (
          <span className="text-xs text-red-400 flex items-center gap-1">
            <span aria-hidden="true"></span>
            {overdue} task{overdue > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-600 inline-block" aria-hidden="true" />
            Clear
          </span>
        )}

        <button
          onClick={handleSnooze}
          disabled={isPending}
          className="text-xs text-slate-500 hover:text-slate-300 disabled:opacity-40 transition-colors px-1"
          aria-label="Snooze deal until tomorrow"
          title="Snooze until tomorrow 9am"
        >
          {isPending ? '…' : 'Snooze'}
        </button>
      </div>
    </div>
  )
}
