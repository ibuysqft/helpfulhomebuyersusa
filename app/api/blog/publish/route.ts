import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { revalidateTag } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { buildSocialQueue } from '@/lib/social-publisher'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const action = formData.get('action') as 'publish' | 'reject'

  if (!id || !['publish', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const update = action === 'publish'
    ? { status: 'published', published_at: new Date().toISOString() }
    : { status: 'rejected' }

  const { error } = await supabase.from('blog_posts').update(update).eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (action === 'publish') {
    revalidateTag('blog', 'max')

    // Queue social posts in the background — non-blocking
    after(async () => {
      const { data: post } = await supabase
        .from('blog_posts')
        .select('id, slug, title, content, target_keyword')
        .eq('id', id)
        .single()

      if (!post) return

      try {
        const queue = await buildSocialQueue({
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          targetKeyword: post.target_keyword,
        })

        await supabase.from('social_queue').insert(
          queue.map(item => ({
            blog_post_id: item.blogPostId,
            platform: item.platform,
            post_content: item.postContent,
            reddit_subreddit: item.redditSubreddit ?? null,
            status: 'pending',
          }))
        )
      } catch (err) {
        console.error('Failed to queue social posts:', err)
      }

      // YouTube video production — disabled until YOUTUBE_ENABLED=true is set in Vercel env vars.
      // When the video pipeline is built and self-tested, flip the toggle — no code changes needed.
      if (process.env.YOUTUBE_ENABLED === 'true' && process.env.YOUTUBE_AGENCY_WEBHOOK_URL) {
        try {
          await fetch(process.env.YOUTUBE_AGENCY_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.CRON_SECRET}` },
            body: JSON.stringify({
              blogPostId: post.id,
              slug: post.slug,
              title: post.title,
              targetKeyword: post.target_keyword,
              blogUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
            }),
          })
        } catch (err) {
          console.error('YouTube webhook failed (non-blocking):', err)
        }
      }
    })
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}
