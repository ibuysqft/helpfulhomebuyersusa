import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateBlogPost } from '@/lib/content-generator'
import { sendDraftNotification } from '@/lib/email'

const TARGET_KEYWORDS = [
  'sell house fast northern virginia',
  'cash home buyers richmond va',
  'sell my house fast virginia beach',
  'how to sell a house fast in virginia',
  'sell house with liens virginia',
  'cash offer for house fairfax va',
  'probate house sale virginia cash buyer',
  'foreclosure help northern virginia',
  'sell inherited house virginia fast',
  'behind on mortgage payments sell house virginia',
]

export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Pick a random keyword not yet used recently
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('target_keyword')
    .order('draft_created_at', { ascending: false })
    .limit(10)

  const usedKeywords = new Set((recentPosts ?? []).map(p => p.target_keyword))
  const available = TARGET_KEYWORDS.filter(k => !usedKeywords.has(k))
  const keyword = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : TARGET_KEYWORDS[Math.floor(Math.random() * TARGET_KEYWORDS.length)]

  try {
    const post = await generateBlogPost(keyword, [])
    const { error } = await supabase.from('blog_posts').insert({
      slug: post.slug,
      title: post.title,
      content: post.content,
      meta_description: post.metaDescription,
      target_keyword: post.targetKeyword,
      word_count: post.wordCount,
      city_tags: post.cityTags,
      status: 'draft',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    await sendDraftNotification(post.title, post.slug)
    return NextResponse.json({ generated: post.slug })
  } catch (err) {
    console.error('Content generation failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
