import Anthropic from '@anthropic-ai/sdk'
import type { CompetitorContext } from '@/lib/competitor-analyzer'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface GeneratedPost {
  title: string
  slug: string
  content: string
  metaDescription: string
  targetKeyword: string
  cityTags: string[]
  wordCount: number
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildCompetitorInstructions(ctx: CompetitorContext): string {
  const lines: string[] = [
    `- Length: ${ctx.targetWordCount}+ words (competitors average ${ctx.topCompetitorWordCount} — beat them by 20%+)`,
  ]
  if (ctx.missingTopics.length) {
    lines.push(`- You MUST cover these topics competitors address but we haven't: ${ctx.missingTopics.join(', ')}`)
  }
  if (ctx.missingFaqs.length) {
    lines.push(`- Include FAQ answers for these questions competitors rank for: ${ctx.missingFaqs.join(' | ')}`)
  }
  return lines.join('\n')
}

export async function generateBlogPost(
  keyword: string,
  cityTags: string[],
  competitorContext?: CompetitorContext
): Promise<GeneratedPost> {
  const hasCompetitorData = !!competitorContext
  const wordCountInstruction = hasCompetitorData
    ? buildCompetitorInstructions(competitorContext)
    : '- Length: 1200-1500 words'

  const prompt = `You are an expert real estate content writer for a Virginia cash home buying company.

Write a comprehensive, SEO-optimized blog post targeting the keyword: "${keyword}"

Requirements:
- Title format: "[Keyword-rich topic] | Helpful Home Buyers USA" — MUST include a location (city/Virginia) or situation keyword
${wordCountInstruction}
- Format: Markdown with ## headers, bullet points where helpful
- H1 (the title) and the first paragraph MUST naturally contain the exact target keyword: "${keyword}"
- Place an H2 containing the primary keyword within the first 300 words
- Include a "## Key Takeaways" section near the top (after the intro, before the main body) with 4-6 bullet points summarizing the most important points for the reader
- Include: The process of selling to a cash buyer, benefits, common situations, local Virginia context
- Include at least 2 internal links to relevant situation pages from this list: /foreclosure-help-virginia, /probate-help-virginia, /divorce-help-virginia, /inherited-help-virginia, /fire-damage-help-virginia, /tired-landlord-help-virginia, /behind-payments-help-virginia, /tax-lien-help-virginia, /as-is-home-buyers-virginia
- Include a "## Frequently Asked Questions" section near the end with 3-5 Q&A pairs formatted as ### Question followed by the answer paragraph. Use natural language questions a real seller would ask.
- Tone: Helpful, trustworthy, direct — like a knowledgeable friend, not a salesperson
- CTA at end: Call (703) 940-1159 or get a free offer at helpfulhomebuyersusa.com
- Do NOT mention competitor companies
- Virginia-specific content only (no California references)
- Meta description: under 155 characters, must include "(703) 940-1159"

Return ONLY valid JSON in this exact format:
{
  "title": "the article title | Helpful Home Buyers USA",
  "slug": "url-friendly-slug",
  "metaDescription": "Under 155 chars. Include (703) 940-1159.",
  "primary_keyword": "the exact target keyword",
  "internal_link_suggestion": "/situation-page-slug",
  "content": "full markdown content here",
  "cityTags": ["city1", "city2"]
}`

  const maxTokens = competitorContext ? Math.max(4500, Math.round(competitorContext.targetWordCount * 2.5)) : 3500

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in response')

  const parsed = JSON.parse(jsonMatch[0])
  const wordCount = parsed.content.split(/\s+/).length

  return {
    title: parsed.title,
    slug: parsed.slug ?? slugify(parsed.title),
    content: parsed.content,
    metaDescription: parsed.metaDescription,
    targetKeyword: keyword,
    cityTags: parsed.cityTags ?? cityTags,
    wordCount,
  }
}
