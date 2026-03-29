import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { fetchSerpResults, scrapeCompetitorPage } from '@/lib/competitor-analyzer'

// Process 10 keywords per run to stay within Vercel function timeout + ScraperAPI limits
const BATCH_SIZE = 10

export const maxDuration = 300

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Pull keywords not audited in the last 6 days (prioritize stale + high priority)
  const { data: keywords, error } = await supabase
    .from('keyword_bank')
    .select('id, keyword')
    .or('last_audited_at.is.null,last_audited_at.lt.' + new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString())
    .order('priority', { ascending: false })
    .order('last_audited_at', { ascending: true, nullsFirst: true })
    .limit(BATCH_SIZE)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!keywords?.length) return NextResponse.json({ message: 'All keywords up to date', audited: 0 })

  const results: Array<{ keyword: string; competitorsFound: number; error?: string }> = []

  for (const { id, keyword } of keywords) {
    try {
      const serpResults = await fetchSerpResults(keyword)

      // Scrape each competitor page (cap at 5)
      const pages = await Promise.allSettled(
        serpResults.slice(0, 5).map(r => scrapeCompetitorPage(r.url).then(p => ({ ...p, rankPosition: r.position })))
      )

      const successful = pages
        .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof scrapeCompetitorPage>> & { rankPosition: number }> => r.status === 'fulfilled')
        .map(r => r.value)

      // Upsert competitor snapshots
      if (successful.length) {
        await supabase.from('competitor_snapshots').upsert(
          successful.map(p => ({
            keyword,
            competitor_url: p.url,
            rank_position: p.rankPosition,
            word_count: p.wordCount,
            headings: p.headings,
            faq_questions: p.faqQuestions,
            schema_types: p.schemaTypes,
            scraped_at: new Date().toISOString(),
          })),
          { onConflict: 'keyword,competitor_url' }
        )

        // Update avg_competitor_word_count on keyword_bank
        const wordCounts = successful.map(p => p.wordCount).filter(n => n > 0)
        const avgWordCount = wordCounts.length
          ? Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length)
          : null

        await supabase
          .from('keyword_bank')
          .update({ last_audited_at: new Date().toISOString(), avg_competitor_word_count: avgWordCount })
          .eq('id', id)
      }

      results.push({ keyword, competitorsFound: successful.length })
    } catch (err) {
      results.push({ keyword, competitorsFound: 0, error: String(err) })
      // Still mark audited to avoid re-hammering a failing keyword
      await supabase
        .from('keyword_bank')
        .update({ last_audited_at: new Date().toISOString() })
        .eq('id', id)
    }
  }

  return NextResponse.json({ audited: results.length, results })
}
