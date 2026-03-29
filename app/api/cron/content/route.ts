import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateBlogPost } from '@/lib/content-generator'
import { analyzeGaps, type CompetitorPage } from '@/lib/competitor-analyzer'
import { sendDraftNotification } from '@/lib/email'

export const maxDuration = 120

export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Pick highest-priority keyword not generated recently
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('target_keyword')
    .order('draft_created_at', { ascending: false })
    .limit(20)

  const usedKeywords = new Set((recentPosts ?? []).map(p => p.target_keyword))

  const { data: keywords, error: kwError } = await supabase
    .from('keyword_bank')
    .select('id, keyword')
    .order('priority', { ascending: false })
    .order('last_generated_at', { ascending: true, nullsFirst: true })
    .limit(50)

  if (kwError) return NextResponse.json({ error: kwError.message }, { status: 500 })

  const available = (keywords ?? []).filter(k => !usedKeywords.has(k.keyword))
  if (!available.length) return NextResponse.json({ message: 'No available keywords' })

  const chosen = available[0]

  // Load competitor snapshots for this keyword
  const { data: snapshots } = await supabase
    .from('competitor_snapshots')
    .select('competitor_url, rank_position, word_count, headings, faq_questions, schema_types')
    .eq('keyword', chosen.keyword)
    .order('rank_position', { ascending: true })
    .limit(5)

  let competitorContext
  if (snapshots?.length) {
    const competitors: CompetitorPage[] = snapshots.map(s => ({
      url: s.competitor_url,
      rankPosition: s.rank_position,
      wordCount: s.word_count ?? 0,
      headings: (s.headings as string[]) ?? [],
      faqQuestions: (s.faq_questions as string[]) ?? [],
      schemaTypes: (s.schema_types as string[]) ?? [],
    }))
    competitorContext = analyzeGaps([], [], competitors)
  }

  try {
    const post = await generateBlogPost(chosen.keyword, [], competitorContext)

    const { error: insertError } = await supabase.from('blog_posts').insert({
      slug: post.slug,
      title: post.title,
      content: post.content,
      meta_description: post.metaDescription,
      target_keyword: post.targetKeyword,
      word_count: post.wordCount,
      city_tags: post.cityTags,
      status: 'published',
      published_at: new Date().toISOString(),
    })

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })

    // Mark keyword as generated
    await supabase
      .from('keyword_bank')
      .update({ last_generated_at: new Date().toISOString() })
      .eq('id', chosen.id)

    await sendDraftNotification(post.title, post.slug)

    const competitorBeat = competitorContext
      ? { targetWordCount: competitorContext.targetWordCount, actual: post.wordCount, beat: post.wordCount >= competitorContext.targetWordCount }
      : null

    return NextResponse.json({ generated: post.slug, wordCount: post.wordCount, competitorBeat })
  } catch (err) {
    console.error('Content generation failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
