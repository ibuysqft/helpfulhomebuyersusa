'use client'

import type { Deal } from '@/lib/types/deals'
import { AI_FLAG_LABELS } from '@/lib/types/deals'

interface HotStripProps {
  deals: Deal[]
}

export function HotStrip({ deals }: HotStripProps) {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const flagged = deals.filter((d) => d.ai_flag)
  const overdueTasks = deals.flatMap((d) =>
    d.deal_tasks
      .filter((t) => !t.completed && t.due_date && new Date(t.due_date) < now)
      .map((t) => ({ task: t, deal: d }))
  )
  const stale = deals.filter(
    (d) =>
      !d.ai_flag &&
      new Date(d.last_stage_change) < sevenDaysAgo &&
      d.stage !== 'closed' &&
      d.stage !== 'dead' &&
      !(d.snoozed_until && new Date(d.snoozed_until) > now)
  )

  const total = flagged.length + overdueTasks.length + stale.length
  if (total === 0) return null

  return (
    <div className="bg-red-950 border border-red-800 rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-4 items-center">
      <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">
        ⚡ Needs Attention
      </span>
      {flagged.map((d) => (
        <span key={d.id} className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded flex items-center gap-1">
          ⚠ AI Flag — {d.address.split(',')[0]}
          {d.ai_flag_reason && (
            <span className="text-red-400">({AI_FLAG_LABELS[d.ai_flag_reason]})</span>
          )}
        </span>
      ))}
      {overdueTasks.map(({ task, deal }) => (
        <span key={task.id} className="bg-amber-900 text-amber-200 text-xs px-2 py-1 rounded">
          📋 {deal.address.split(',')[0]} — {task.title}
        </span>
      ))}
      {stale.map((d) => (
        <span key={d.id} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded">
          ⏳ Stale 7d — {d.address.split(',')[0]}
        </span>
      ))}
    </div>
  )
}
