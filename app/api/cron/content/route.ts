import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateBlogPost } from '@/lib/content-generator'
import { analyzeGaps, type CompetitorPage } from '@/lib/competitor-analyzer'
import { sendDraftNotification } from '@/lib/email'

export const maxDuration = 300

const BATCH_SIZE = 5

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Pick highest-priority keywords not generated recently
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

  const chosen = available.slice(0, BATCH_SIZE)

  const results: {
    generated: Array<{ slug: string; wordCount: number; competitorBeat: boolean | null }>
    failed: Array<{ keyword: string; error: string }>
  } = { generated: [], failed: [] }

  for (const candidate of chosen) {
    // Load competitor snapshots for this keyword
    const { data: snapshots } = await supabase
      .from('competitor_snapshots')
      .select('competitor_url, rank_position, word_count, headings, faq_questions, schema_types')
      .eq('keyword', candidate.keyword)
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
      const post = await generateBlogPost(candidate.keyword, [], competitorContext)

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

      if (insertError) throw new Error(insertError.message)

      await supabase
        .from('keyword_bank')
        .update({ last_generated_at: new Date().toISOString() })
        .eq('id', candidate.id)

      const beat = competitorContext
        ? post.wordCount >= competitorContext.targetWordCount
        : null

      results.generated.push({ slug: post.slug, wordCount: post.wordCount, competitorBeat: beat })
    } catch (err) {
      console.error(`Content generation failed for "${candidate.keyword}":`, err)
      results.failed.push({ keyword: candidate.keyword, error: String(err) })
    }
  }

  // Single notification summarising the full batch
  if (results.generated.length > 0) {
    const summary = results.generated.map(p => p.slug).join(', ')
    await sendDraftNotification(
      `Generated ${results.generated.length} post${results.generated.length === 1 ? '' : 's'}: ${summary}`,
      results.generated[0].slug,
    )
  }

  return NextResponse.json(results)
}
