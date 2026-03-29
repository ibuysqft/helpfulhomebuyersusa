import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export default async function RankingsPage() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!adminToken || adminToken.value !== Buffer.from(ADMIN_PASSWORD).toString('base64')) {
    redirect('/admin/login')
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: currentWeek }, { data: priorWeek }] = await Promise.all([
    supabase
      .from('ranking_history')
      .select('keyword, position, impressions, clicks, ctr, checked_at')
      .gte('checked_at', oneWeekAgo)
      .order('checked_at', { ascending: false }),
    supabase
      .from('ranking_history')
      .select('keyword, position, checked_at')
      .lt('checked_at', oneWeekAgo)
      .gte('checked_at', twoWeeksAgo)
      .order('checked_at', { ascending: false }),
  ])

  // Build current map (latest per keyword)
  const currentMap = new Map<string, { position: number; impressions: number; clicks: number; ctr: number }>()
  for (const row of currentWeek ?? []) {
    if (!currentMap.has(row.keyword) && row.position != null) {
      currentMap.set(row.keyword, {
        position: row.position,
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: row.ctr ?? 0,
      })
    }
  }

  // Build prior map (latest per keyword)
  const priorMap = new Map<string, number>()
  for (const row of priorWeek ?? []) {
    if (!priorMap.has(row.keyword) && row.position != null) {
      priorMap.set(row.keyword, row.position)
    }
  }

  // Merge into sorted rows
  const rows = Array.from(currentMap.entries())
    .map(([keyword, cur]) => {
      const prior = priorMap.get(keyword)
      const delta = prior != null ? prior - cur.position : null // positive = moved up
      return { keyword, ...cur, prior, delta }
    })
    .sort((a, b) => a.position - b.position)

  const hasData = rows.length > 0

  function deltaLabel(delta: number | null) {
    if (delta === null) return { text: 'New', cls: 'text-blue-400' }
    if (delta > 0) return { text: `↑${delta.toFixed(1)}`, cls: 'text-green-400' }
    if (delta < 0) return { text: `↓${Math.abs(delta).toFixed(1)}`, cls: 'text-red-400' }
    return { text: '–', cls: 'text-slate-500' }
  }

  function positionColor(pos: number) {
    if (pos <= 3) return 'text-green-400'
    if (pos <= 10) return 'text-amber-400'
    if (pos <= 20) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Keyword Rankings</h2>
        <span className="text-slate-400 text-sm">{rows.length} keywords tracked this week</span>
      </div>

      {!hasData ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-2">No ranking data yet.</p>
          <p className="text-slate-500 text-sm">
            Run the ranking check cron (requires Google Search Console credentials):
            <code className="ml-2 bg-slate-700 px-2 py-1 rounded text-amber-300 text-xs">
              POST /api/cron/ranking-check
            </code>
          </p>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium px-4 py-3">Keyword</th>
                <th className="text-right text-slate-400 font-medium px-4 py-3">Position</th>
                <th className="text-right text-slate-400 font-medium px-4 py-3">vs Last Week</th>
                <th className="text-right text-slate-400 font-medium px-4 py-3">Impressions</th>
                <th className="text-right text-slate-400 font-medium px-4 py-3">Clicks</th>
                <th className="text-right text-slate-400 font-medium px-4 py-3">CTR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const dl = deltaLabel(row.delta)
                return (
                  <tr
                    key={row.keyword}
                    className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                      i % 2 === 0 ? '' : 'bg-slate-800/50'
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-200">{row.keyword}</td>
                    <td className={`px-4 py-3 text-right font-mono font-bold ${positionColor(row.position)}`}>
                      #{row.position.toFixed(1)}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono ${dl.cls}`}>
                      {dl.text}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {row.impressions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {row.clicks.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {row.ctr.toFixed(1)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {hasData && (
        <div className="mt-4 flex gap-6 text-xs text-slate-500">
          <span><span className="text-green-400">↑</span> Moved up</span>
          <span><span className="text-red-400">↓</span> Dropped</span>
          <span><span className="text-blue-400">New</span> No prior data</span>
          <span><span className="text-green-400">●</span> Top 3 · <span className="text-amber-400">●</span> Top 10 · <span className="text-red-400">●</span> 20+</span>
        </div>
      )}
    </div>
  )
}
