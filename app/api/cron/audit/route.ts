import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helpfulhomebuyersusa.com'
  const apiKey = process.env.PAGESPEED_API_KEY

  const issues: string[] = []
  let lcp: number | null = null
  let cls: number | null = null

  // PageSpeed check
  if (apiKey) {
    try {
      const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(siteUrl)}&strategy=mobile&key=${apiKey}`
      const res = await fetch(psUrl)
      const data = await res.json()
      const metrics = data?.lighthouseResult?.audits

      lcp = metrics?.['largest-contentful-paint']?.numericValue ?? null
      cls = metrics?.['cumulative-layout-shift']?.numericValue ?? null

      if (lcp && lcp > 2500) issues.push(`LCP too slow: ${(lcp / 1000).toFixed(1)}s (target: <2.5s)`)
      if (cls && cls > 0.1) issues.push(`CLS too high: ${cls.toFixed(3)} (target: <0.1)`)
    } catch (err) {
      issues.push(`PageSpeed check failed: ${err}`)
    }
  }

  // Count published blog posts
  const { count: pagesCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  await supabase.from('audit_reports').insert({
    issues,
    vitals_lcp: lcp,
    vitals_cls: cls,
    pages_count: pagesCount ?? 0,
    report_json: { siteUrl, checkedAt: new Date().toISOString() },
  })

  return NextResponse.json({ issues, lcp, cls, pagesCount })
}
