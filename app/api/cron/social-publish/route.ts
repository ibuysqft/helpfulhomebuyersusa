import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { publishToLinkedIn, publishToReddit, publishToTwitter } from '@/lib/social-publisher'

const SITE_URL = 'https://helpfulhomebuyersusa.com'

export const maxDuration = 120

export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: queue, error } = await supabase
    .from('social_queue')
    .select('id, blog_post_id, platform, post_content, reddit_subreddit, blog_posts(slug)')
    .eq('status', 'pending')
    .order('queued_at', { ascending: true })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!queue?.length) return NextResponse.json({ message: 'No pending social posts', published: 0 })

  const results: Array<{ id: string; platform: string; status: string; error?: string }> = []

  for (const item of queue) {
    const slug = (item.blog_posts as unknown as { slug: string } | null)?.slug
    const postUrl = slug ? `${SITE_URL}/blog/${slug}` : SITE_URL

    try {
      if (item.platform === 'linkedin') {
        await publishToLinkedIn(item.post_content, postUrl)
      } else if (item.platform === 'reddit') {
        await publishToReddit(item.post_content, postUrl, item.reddit_subreddit ?? 'nova')
      } else if (item.platform === 'twitter') {
        await publishToTwitter(item.post_content)
      }

      await supabase
        .from('social_queue')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', item.id)

      results.push({ id: item.id, platform: item.platform, status: 'published' })
    } catch (err) {
      const errMsg = String(err)
      await supabase
        .from('social_queue')
        .update({ status: 'failed', error: errMsg })
        .eq('id', item.id)

      results.push({ id: item.id, platform: item.platform, status: 'failed', error: errMsg })
    }
  }

  const published = results.filter(r => r.status === 'published').length
  const failed = results.filter(r => r.status === 'failed').length

  return NextResponse.json({ published, failed, results })
}
