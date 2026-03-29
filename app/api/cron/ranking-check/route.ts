import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { fetchGscRankings } from '@/lib/ranking-tracker'

const DROP_THRESHOLD = 3
export const maxDuration = 120

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: keywords, error } = await supabase
    .from('keyword_bank')
    .select('keyword')
    .order('priority', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!keywords?.length) return NextResponse.json({ message: 'No keywords tracked' })

  const kwList = keywords.map(k => k.keyword)

  let rankings
  try {
    rankings = await fetchGscRankings(kwList)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }

  // Insert ranking_history rows
  await supabase.from('ranking_history').insert(
    rankings.map(r => ({
      keyword: r.keyword,
      position: r.position,
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      checked_at: new Date().toISOString(),
    }))
  )

  // Detect drops >3 spots vs prior week
  const { data: priorWeek } = await supabase
    .from('ranking_history')
    .select('keyword, position')
    .lt('checked_at', new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString())
    .order('checked_at', { ascending: false })
    .limit(kwList.length * 2)

  const priorMap = new Map<string, number>()
  for (const row of priorWeek ?? []) {
    if (!priorMap.has(row.keyword) && row.position != null) {
      priorMap.set(row.keyword, row.position)
    }
  }

  const drops = rankings
    .filter(r => r.position != null && priorMap.has(r.keyword))
    .filter(r => (r.position! - (priorMap.get(r.keyword) ?? r.position!)) > DROP_THRESHOLD)
    .map(r => ({ keyword: r.keyword, was: priorMap.get(r.keyword), now: r.position }))

  if (drops.length) {
    await supabase.from('audit_reports').insert({
      issues: drops.map(d => `Ranking drop: "${d.keyword}" — was #${d.was}, now #${d.now}`),
      report_json: { type: 'ranking_drops', drops, checkedAt: new Date().toISOString() },
    })
  }

  return NextResponse.json({ tracked: rankings.length, drops: drops.length, dropsDetail: drops })
}
