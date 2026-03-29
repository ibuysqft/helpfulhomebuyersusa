import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export default async function CompetitorIntelPage() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!adminToken || adminToken.value !== Buffer.from(ADMIN_PASSWORD).toString('base64')) {
    redirect('/admin/login')
  }

  const [{ data: keywords }, { data: snapshots }] = await Promise.all([
    supabase
      .from('keyword_bank')
      .select('keyword, priority, avg_competitor_word_count, last_audited_at')
      .order('priority', { ascending: false })
      .limit(50),
    supabase
      .from('competitor_snapshots')
      .select('keyword, competitor_url, rank_position, word_count, headings, faq_questions, scraped_at')
      .order('keyword', { ascending: true })
      .order('rank_position', { ascending: true }),
  ])

  // Group snapshots by keyword
  const snapshotMap = new Map<string, typeof snapshots>()
  for (const snap of snapshots ?? []) {
    if (!snapshotMap.has(snap.keyword)) snapshotMap.set(snap.keyword, [])
    snapshotMap.get(snap.keyword)!.push(snap)
  }

  const hasData = (keywords?.length ?? 0) > 0

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Competitor Intelligence</h2>
        <span className="text-slate-400 text-sm">{keywords?.length ?? 0} keywords tracked</span>
      </div>

      {!hasData ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-2">No competitor data yet.</p>
          <p className="text-slate-500 text-sm">
            Run the competitor audit cron to populate data:
            <code className="ml-2 bg-slate-700 px-2 py-1 rounded text-amber-300 text-xs">
              POST /api/cron/competitor-audit
            </code>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {keywords?.map(kw => {
            const comps = snapshotMap.get(kw.keyword) ?? []
            const neverAudited = !kw.last_audited_at
            return (
              <div key={kw.keyword} className="bg-slate-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{kw.keyword}</h3>
                    <div className="flex gap-4 mt-1 text-xs text-slate-500">
                      <span>Priority: {kw.priority}</span>
                      {kw.avg_competitor_word_count && (
                        <span>Avg competitor: {kw.avg_competitor_word_count} words</span>
                      )}
                      {kw.last_audited_at ? (
                        <span>
                          Audited{' '}
                          {new Date(kw.last_audited_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      ) : (
                        <span className="text-amber-500">Never audited</span>
                      )}
                    </div>
                  </div>
                  {neverAudited && (
                    <span className="text-xs bg-amber-900/40 text-amber-400 px-2 py-1 rounded">
                      Pending
                    </span>
                  )}
                </div>

                {comps.length > 0 ? (
                  <div className="space-y-2">
                    {comps.slice(0, 5).map(comp => {
                      const headings = (comp.headings as string[] | null) ?? []
                      const faqs = (comp.faq_questions as string[] | null) ?? []
                      return (
                        <div
                          key={comp.competitor_url}
                          className="bg-slate-700/50 rounded-lg p-3 text-sm"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-amber-400 font-mono text-xs shrink-0">
                                #{comp.rank_position}
                              </span>
                              <a
                                href={comp.competitor_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 truncate text-xs"
                              >
                                {comp.competitor_url.replace(/^https?:\/\/(www\.)?/, '')}
                              </a>
                            </div>
                            {comp.word_count && (
                              <span className="text-slate-400 text-xs shrink-0">
                                {comp.word_count.toLocaleString()} words
                              </span>
                            )}
                          </div>
                          {headings.length > 0 && (
                            <div className="text-slate-400 text-xs">
                              <span className="text-slate-500">H2s: </span>
                              {headings.slice(0, 3).join(' · ')}
                              {headings.length > 3 && ` +${headings.length - 3} more`}
                            </div>
                          )}
                          {faqs.length > 0 && (
                            <div className="text-slate-400 text-xs mt-1">
                              <span className="text-slate-500">FAQs: </span>
                              {faqs.slice(0, 2).join(' · ')}
                              {faqs.length > 2 && ` +${faqs.length - 2} more`}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm italic">No snapshots yet for this keyword.</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
