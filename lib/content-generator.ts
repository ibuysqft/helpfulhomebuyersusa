import Anthropic from '@anthropic-ai/sdk'

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

export async function generateBlogPost(keyword: string, cityTags: string[]): Promise<GeneratedPost> {
  const prompt = `You are an expert real estate content writer for a Virginia cash home buying company.

Write a comprehensive, SEO-optimized blog post targeting the keyword: "${keyword}"

Requirements:
- Title format: "[Keyword-rich topic] | Helpful Home Buyers USA" — MUST include a location (city/Virginia) or situation keyword
- Length: 900-1100 words
- Format: Markdown with ## headers, bullet points where helpful
- Place an H2 containing the primary keyword within the first 300 words
- Include: The process of selling to a cash buyer, benefits, common situations, local Virginia context
- Include at least one internal link to a relevant situation page (e.g. /foreclosure-help-virginia, /probate-help-virginia, /divorce-help-virginia, /inherited-help-virginia, /fire-damage-help-virginia, /tired-landlord-help-virginia, /behind-payments-help-virginia, /tax-lien-help-virginia)
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

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
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
