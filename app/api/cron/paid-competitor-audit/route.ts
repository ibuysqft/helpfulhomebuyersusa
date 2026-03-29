import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Keywords to check in Google Ads Transparency Center
const PAID_KEYWORDS = [
  'sell my house fast virginia',
  'cash home buyers virginia',
  'we buy houses virginia',
  'sell my house fast northern virginia',
  'cash home buyers northern virginia',
  'sell house as-is virginia',
  'we buy houses fairfax va',
  'sell my house fast arlington va',
]

const SCRAPERAPI_KEY = process.env.SCRAPERAPI_KEY

export const maxDuration = 300

export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!SCRAPERAPI_KEY) {
    return NextResponse.json({ error: 'SCRAPERAPI_KEY not configured' }, { status: 500 })
  }

  const results: Array<{ keyword: string; advertisersFound: number; error?: string }> = []

  for (const keyword of PAID_KEYWORDS) {
    try {
      const encoded = encodeURIComponent(keyword)
      const transparencyUrl = `https://adstransparency.google.com/advertiser?query=${encoded}&region=US`
      const scraperUrl = `https://api.scraperapi.com/?api_key=${SCRAPERAPI_KEY}&url=${encodeURIComponent(transparencyUrl)}&render=true`

      const resp = await fetch(scraperUrl, { signal: AbortSignal.timeout(30_000) })
      if (!resp.ok) {
        results.push({ keyword, advertisersFound: 0, error: `HTTP ${resp.status}` })
        continue
      }

      const html = await resp.text()

      // Extract advertiser domains from the transparency page HTML
      const domainMatches = html.match(/advertiser\/([a-zA-Z0-9_-]+)\/creative/g) ?? []
      const domains = [...new Set(domainMatches.map(m => m.replace('advertiser/', '').replace('/creative', '')))]
        .filter(Boolean)
        .slice(0, 10)

      // Extract ad text snippets — grab spans with ad copy patterns
      const headlineMatches = html.match(/<[^>]+class="[^"]*headline[^"]*"[^>]*>([^<]{10,120})<\//g) ?? []
      const headlines = headlineMatches
        .map(m => m.replace(/<[^>]+>/g, '').trim())
        .filter(Boolean)
        .slice(0, 15)

      if (domains.length === 0) {
        // No structured data found — store raw signal
        results.push({ keyword, advertisersFound: 0, error: 'No advertiser domains parsed' })
        continue
      }

      // Upsert one row per (keyword, domain)
      for (const domain of domains) {
        await supabase.from('paid_competitor_snapshots').upsert(
          {
            keyword,
            advertiser_domain: domain,
            ad_headline: headlines,
            ad_description: [],
            scraped_at: new Date().toISOString(),
          },
          { onConflict: 'keyword,advertiser_domain' },
        )
      }

      results.push({ keyword, advertisersFound: domains.length })
    } catch (err) {
      results.push({ keyword, advertisersFound: 0, error: String(err) })
    }
  }

  const total = results.reduce((sum, r) => sum + r.advertisersFound, 0)

  return NextResponse.json({
    data: { keywordsProcessed: results.length, totalAdvertisersFound: total, results },
    error: null,
    meta: null,
  })
}
