/**
 * scripts/generate-state-blog-posts.ts
 *
 * Generates 10 SEO blog articles per state (150 total) and inserts them
 * into the Supabase blog_posts table.
 *
 * Usage:
 *   npx tsx scripts/generate-state-blog-posts.ts             # all 15 states
 *   npx tsx scripts/generate-state-blog-posts.ts virginia    # one state only
 */

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Support running from worktree (look up to find .env.local)
function findEnvFile(): string {
  const candidates = [
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '..', '..', '..', '..', '..', 'Documents', 'anchor-seo', 'helpfulhomebuyersusa', '.env.local'),
    '/Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa/.env.local',
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  return candidates[0]
}

dotenv.config({ path: findEnvFile() })

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

// ── State definitions ──────────────────────────────────────────────────────
interface StateConfig {
  name: string
  abbr: string
  slug: string
  phoneDisplay: string
  siteUrl: string
  topCities: string[]
}

const STATES: StateConfig[] = [
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersvirginia.com', topCities: ['Richmond', 'Virginia Beach', 'Chesapeake'] },
  { name: 'Texas', abbr: 'TX', slug: 'texas', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerstexas.com', topCities: ['Dallas', 'Houston', 'San Antonio'] },
  { name: 'Florida', abbr: 'FL', slug: 'florida', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersflorida.com', topCities: ['Miami', 'Orlando', 'Tampa'] },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersgeorgia.com', topCities: ['Atlanta', 'Savannah', 'Augusta'] },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersohio.com', topCities: ['Columbus', 'Cleveland', 'Cincinnati'] },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnorthcarolina.com', topCities: ['Charlotte', 'Raleigh', 'Greensboro'] },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerssouthcarolina.com', topCities: ['Columbia', 'Charleston', 'Greenville'] },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersillinois.com', topCities: ['Chicago', 'Naperville', 'Rockford'] },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersmichigan.com', topCities: ['Detroit', 'Grand Rapids', 'Lansing'] },
  { name: 'New York', abbr: 'NY', slug: 'new-york', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnewyork.com', topCities: ['Buffalo', 'Rochester', 'Albany'] },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnewjersey.com', topCities: ['Newark', 'Jersey City', 'Trenton'] },
  { name: 'California', abbr: 'CA', slug: 'california', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerscalifornia.com', topCities: ['Los Angeles', 'San Diego', 'Sacramento'] },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersarizona.com', topCities: ['Phoenix', 'Tucson', 'Mesa'] },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerscolorado.com', topCities: ['Denver', 'Colorado Springs', 'Aurora'] },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersconnecticut.com', topCities: ['Hartford', 'Bridgeport', 'New Haven'] },
]

// ── Keyword patterns per state ─────────────────────────────────────────────
function getKeywords(state: StateConfig): string[] {
  const [city1, city2, city3] = state.topCities
  return [
    `sell my house fast ${city1} ${state.abbr}`,
    `sell my house fast ${city2} ${state.abbr}`,
    `sell my house fast ${city3} ${state.abbr}`,
    `how to sell a foreclosure house in ${state.name}`,
    `how to sell an inherited house in ${state.name}`,
    `how to sell a house during divorce in ${state.name}`,
    `cash home buyers ${state.name} what to expect`,
    `how long does it take to sell a house in ${state.name}`,
    `we buy houses ${state.name} legitimate or scam`,
    `sell my house fast vs listing with a realtor in ${state.name}`,
  ]
}

// ── Article generation ─────────────────────────────────────────────────────
interface GeneratedPost {
  title: string
  slug: string
  metaDescription: string
  content: string
  targetKeyword: string
  cityTags: string[]
  wordCount: number
}

async function generateArticle(keyword: string, state: StateConfig): Promise<GeneratedPost> {
  const prompt = `You are an expert real estate content writer for a cash home buying company operating in ${state.name}.

Write a comprehensive, SEO-optimized blog post targeting the keyword: "${keyword}"

Requirements:
- Title format: "[Keyword-rich topic] | Helpful Home Buyers USA"
- Length: 1,200–1,500 words
- Format: Markdown with ## headers, bullet points where helpful
- H1 and first paragraph MUST naturally contain the exact target keyword
- Place an H2 containing the primary keyword within the first 300 words
- Include a "## Key Takeaways" section near the top with 4–6 bullet points
- Focus on ${state.name}-specific content and local context
- Include at least 2 internal links using this pattern: [anchor text](/${state.slug}/[situation]) where situation is one of: foreclosure, inherited, divorce, probate, behind-payments, tax-lien
- Include a "## Frequently Asked Questions" section near the end with 3–5 Q&A pairs (### Question format)
- Tone: Helpful, trustworthy, direct
- CTA at end: Call ${state.phoneDisplay} or get a free offer at ${state.siteUrl}
- Do NOT mention competitor companies by name
- Meta description: under 155 characters, include "${state.phoneDisplay}"

Return ONLY valid JSON in this exact format (no markdown code fences):
{
  "title": "the article title | Helpful Home Buyers USA",
  "slug": "url-friendly-slug",
  "metaDescription": "Under 155 chars including ${state.phoneDisplay}.",
  "content": "full markdown content here",
  "cityTags": ["city1", "city2"]
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = response.content[0].type === 'text' ? response.content[0].text : ''
  const cleaned = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
  const parsed = JSON.parse(cleaned)

  const wordCount = parsed.content.split(/\s+/).length

  return {
    title: parsed.title,
    slug: `${parsed.slug}-${state.slug}`,
    metaDescription: parsed.metaDescription,
    content: parsed.content,
    targetKeyword: keyword,
    cityTags: parsed.cityTags ?? state.topCities,
    wordCount,
  }
}

// ── Supabase insert ────────────────────────────────────────────────────────
async function insertPost(post: GeneratedPost): Promise<void> {
  const { error } = await supabase.from('blog_posts').upsert(
    {
      slug: post.slug,
      title: post.title,
      content: post.content,
      meta_description: post.metaDescription,
      target_keyword: post.targetKeyword,
      word_count: post.wordCount,
      city_tags: post.cityTags,
      status: 'published',
      published_at: new Date().toISOString(),
    },
    { onConflict: 'slug', ignoreDuplicates: true },
  )

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`)
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const filterSlug = process.argv[2]
  const states = filterSlug ? STATES.filter(s => s.slug === filterSlug) : STATES

  if (!states.length) {
    console.error(`Unknown state slug: ${filterSlug}`)
    console.error(`Valid slugs: ${STATES.map(s => s.slug).join(', ')}`)
    process.exit(1)
  }

  console.log(`Generating articles for ${states.length} state(s)...`)

  for (const state of states) {
    const keywords = getKeywords(state)
    console.log(`\n── ${state.name} (${keywords.length} articles) ──`)

    for (const keyword of keywords) {
      process.stdout.write(`  ${keyword}...`)
      try {
        const post = await generateArticle(keyword, state)
        await insertPost(post)
        console.log(` ✓ (${post.wordCount} words, slug: ${post.slug})`)
      } catch (err) {
        console.log(` ✗ ${err}`)
      }

      // Rate limit: 3 seconds between calls
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  console.log('\nDone.')
}

main().catch(err => { console.error(err); process.exit(1) })
