'use client'

import { useTransition, useOptimistic } from 'react'
import {
  addTargetAction,
  toggleTargetAction,
  deleteTargetAction,
} from './actions'

interface Target {
  id: string
  type: 'county' | 'city' | 'zip' | 'state'
  value: string
  state: string
  active: boolean
  created_at: string
}

const TYPE_BADGE_COLORS: Record<Target['type'], string> = {
  county: 'bg-blue-600 text-blue-100',
  city: 'bg-green-600 text-green-100',
  zip: 'bg-slate-600 text-slate-200',
  state: 'bg-purple-600 text-purple-100',
}

function groupByState(targets: Target[]): Record<string, Target[]> {
  const groups: Record<string, Target[]> = {}
  for (const t of targets) {
    if (!groups[t.state]) groups[t.state] = []
    groups[t.state].push(t)
  }
  return groups
}

export function ScrapeTargetsClient({ targets }: { targets: Target[] }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTargets, setOptimistic] = useOptimistic(
    targets,
    (current: Target[], removedId: string) =>
      current.filter((t) => t.id !== removedId),
  )

  const activeCount = optimisticTargets.filter((t) => t.active).length
  const grouped = groupByState(optimisticTargets)

  function handleToggle(id: string, active: boolean) {
    startTransition(async () => {
      await toggleTargetAction(id, active)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      setOptimistic(id)
      await deleteTargetAction(id)
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Scrape Targets</h2>
          <p className="text-slate-400 text-sm mt-1">
            Control which areas DealSauce scrapes nightly
          </p>
        </div>
        <span className="text-sm text-slate-400">
          {activeCount} active target{activeCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Add form */}
      <form
        action={addTargetAction}
        className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-8 flex flex-wrap gap-3 items-end"
      >
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Type
          <select
            name="type"
            required
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100"
          >
            <option value="county">County</option>
            <option value="city">City</option>
            <option value="zip">ZIP</option>
            <option value="state">State</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-300 flex-1 min-w-[160px]">
          Value
          <input
            name="value"
            type="text"
            required
            placeholder="Loudoun"
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100 placeholder:text-slate-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-300 w-20">
          State
          <input
            name="state"
            type="text"
            required
            defaultValue="VA"
            maxLength={2}
            placeholder="VA"
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-zinc-100 placeholder:text-slate-500 uppercase"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition-colors"
        >
          Add Target
        </button>
      </form>

      {/* Target list */}
      {optimisticTargets.length === 0 ? (
        <p className="text-slate-500 text-center py-12">
          No targets yet. Add your first above.
        </p>
      ) : (
        Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([state, stateTargets]) => (
            <div key={state} className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {state}
              </h3>
              <div className="space-y-1">
                {stateTargets.map((target) => (
                  <div
                    key={target.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${TYPE_BADGE_COLORS[target.type]}`}
                      >
                        {target.type}
                      </span>
                      <span className="text-zinc-100">{target.value}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                          handleToggle(target.id, !target.active)
                        }
                        className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                          target.active
                            ? 'bg-green-700 text-green-100 hover:bg-green-600'
                            : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        }`}
                      >
                        {target.active ? 'Active' : 'Paused'}
                      </button>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(target.id)}
                        className="text-red-400 hover:text-red-300 text-lg leading-none px-1 transition-colors"
                        aria-label={`Delete ${target.value}`}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  )
}
