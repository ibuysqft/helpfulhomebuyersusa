import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export default async function PaidCompetitorsPage() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!adminToken || adminToken.value !== Buffer.from(ADMIN_PASSWORD).toString('base64')) {
    redirect('/admin/login')
  }

  const { data: snapshots } = await supabase
    .from('paid_competitor_snapshots')
    .select('keyword, advertiser_domain, ad_headline, ad_description, landing_page_url, landing_page_cta, landing_page_word_count, scraped_at')
    .order('scraped_at', { ascending: false })
    .limit(200)

  // Group by keyword
  const byKeyword = new Map<string, typeof snapshots>()
  for (const snap of snapshots ?? []) {
    if (!byKeyword.has(snap.keyword)) byKeyword.set(snap.keyword, [])
    byKeyword.get(snap.keyword)!.push(snap)
  }

  // Most recent scrape date
  const lastScrape = snapshots?.[0]?.scraped_at
    ? new Date(snapshots[0].scraped_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Never'

  const totalAdvertisers = new Set(snapshots?.map(s => s.advertiser_domain) ?? []).size

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Paid Competitor Intelligence</h2>
          <p className="text-slate-400 text-sm mt-1">Google Ads Transparency Center — last scraped {lastScrape}</p>
        </div>
        <div className="text-right">
          <span className="text-slate-400 text-sm">{totalAdvertisers} unique advertisers</span>
          <br />
          <span className="text-slate-500 text-xs">{byKeyword.size} keywords monitored</span>
        </div>
      </div>

      {snapshots?.length === 0 && (
        <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">
          No paid competitor data yet. The cron runs Mondays at 5am.
        </div>
      )}

      <div className="space-y-8">
        {[...byKeyword.entries()].map(([keyword, ads]) => (
          <div key={keyword} className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">{keyword}</h3>
              <span className="text-slate-400 text-xs">{ads?.length ?? 0} advertisers</span>
            </div>
            <div className="divide-y divide-slate-700">
              {(ads ?? []).map(ad => (
                <div key={ad.advertiser_domain} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-amber-400 font-medium text-sm truncate">{ad.advertiser_domain}</p>
                      {ad.landing_page_url && (
                        <p className="text-slate-500 text-xs mt-0.5 truncate">{ad.landing_page_url}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {ad.landing_page_word_count != null && (
                        <span className="text-slate-400 text-xs">{ad.landing_page_word_count.toLocaleString()} words</span>
                      )}
                      {ad.landing_page_cta && (
                        <p className="text-slate-500 text-xs mt-0.5">CTA: {ad.landing_page_cta}</p>
                      )}
                    </div>
                  </div>
                  {ad.ad_headline && (ad.ad_headline as string[]).length > 0 && (
                    <div className="mt-3">
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1.5">Headlines</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(ad.ad_headline as string[]).slice(0, 8).map((h, i) => (
                          <span key={i} className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
