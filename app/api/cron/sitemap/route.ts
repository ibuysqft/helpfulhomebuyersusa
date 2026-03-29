import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`

  const results = await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
    fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
  ])

  return NextResponse.json({
    pinged: true,
    sitemapUrl,
    google: results[0].status,
    bing: results[1].status,
  })
}
