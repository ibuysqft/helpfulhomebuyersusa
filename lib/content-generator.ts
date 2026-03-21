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
- Title: Compelling H1 that includes the keyword naturally
- Length: 900-1100 words
- Format: Markdown with ## headers, bullet points where helpful
- Include: The process of selling to a cash buyer, benefits, common situations, local Virginia context
- Tone: Helpful, trustworthy, direct — like a knowledgeable friend, not a salesperson
- CTA at end: Call (703) 940-1159 or get a free offer at helpfulhomebuyersusa.com
- Do NOT mention competitor companies
- Virginia-specific content only (no California references)

Return ONLY valid JSON in this exact format:
{
  "title": "the article title",
  "slug": "url-friendly-slug",
  "metaDescription": "150-160 char meta description with keyword",
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
