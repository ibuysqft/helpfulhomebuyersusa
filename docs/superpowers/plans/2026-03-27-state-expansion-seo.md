# State Expansion + SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy all 15 state sites to Vercel and ship 8 SEO improvements (schema, content, cities section, vs-listing page, 150 blog articles).

**Architecture:** Phase 1 = code changes (no infra needed, commit immediately). Phase 2 = infra script (create 15 Vercel projects). Phase 3 = live-site tasks (Lighthouse, GSC, blog gen, GBP post — require deployed sites).

**Tech Stack:** Next.js 16, TypeScript, Vercel CLI, Supabase, Anthropic SDK, Playwright (via MCP), Lighthouse CLI.

---

## Files Modified

| File | Tasks |
|------|-------|
| `app/[state]/[situation]/page.tsx` | Task A (LocalBusiness schema), Task B (cities section) |
| `app/sell-my-house-fast-vs-listing-with-agent/page.tsx` | Task C (HowTo schema) |
| `scripts/create-state-projects.sh` | Task D (rename + real tracking IDs) |
| `scripts/generate-state-blog-posts.ts` | Task E (new — blog gen for all states) |

---

## PHASE 1 — Code Changes (no infra dependency)

---

### Task A: Upgrade LocalBusiness schema to RealEstateAgent

The existing `localSchema` in `app/[state]/[situation]/page.tsx` (lines 100–107) uses `LocalBusiness` with minimal fields. Upgrade to `RealEstateAgent` with `priceRange`, `description`, and `knowsAbout`.

**Files:**
- Modify: `app/[state]/[situation]/page.tsx:100-107`

- [ ] **Step 1: Replace the localSchema object**

In `app/[state]/[situation]/page.tsx`, find:
```ts
  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: stateObj.name,
  }
```

Replace with:
```ts
  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: stateObj.name,
    priceRange: '$$',
    description: `We buy ${situationLabel.toLowerCase()} houses throughout ${stateObj.name} for cash. No repairs, no commissions, close in 7 days or on your schedule.`,
    knowsAbout: [
      'Cash home buying',
      situationLabel,
      `Selling a house in ${stateObj.name}`,
      'As-is home sales',
      'Fast home sales',
    ],
  }
```

- [ ] **Step 2: Verify build compiles**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/\[state\]/\[situation\]/page.tsx
git commit -m "feat(schema): upgrade LocalBusiness to RealEstateAgent with richer fields"
```

---

### Task B: Upgrade cities section to "Top Cities We Buy In"

The existing "Cities We Serve" section shows ALL cities. Limit to top 8 (already ranked by population), rename the heading, and add a "View all cities →" link below the grid.

**Files:**
- Modify: `app/[state]/[situation]/page.tsx:173-194`

- [ ] **Step 1: Replace the city grid section**

Find:
```tsx
        {/* City grid */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Cities We Serve in {stateObj.name}
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Select your city for local-specific information.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cities.map(city => (
                <Link
                  key={city.slug}
                  href={`/${stateSlug}/${situationSlug}/${city.slug}`}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm text-center transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
```

Replace with:
```tsx
        {/* Top cities we buy in */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Top Cities We Buy Houses In — {stateObj.name}
            </h2>
            <p className="text-slate-400 text-center mb-8">
              We buy houses for cash in every city across {stateObj.name}. Select yours for local details.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cities.slice(0, 8).map(city => (
                <Link
                  key={city.slug}
                  href={`/${stateSlug}/${situationSlug}/${city.slug}`}
                  className="bg-slate-700 hover:bg-amber-600 text-white px-4 py-3 rounded-lg text-sm text-center font-medium transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <p className="text-center mt-6">
              <Link
                href={`/${stateSlug}/${situationSlug}`}
                className="text-amber-400 hover:text-amber-300 text-sm underline underline-offset-4"
              >
                View all {stateObj.name} cities →
              </Link>
            </p>
          </div>
        </section>
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/\[state\]/\[situation\]/page.tsx
git commit -m "feat(ui): rename cities section to 'Top Cities We Buy In', show top 8 with view-all link"
```

---

### Task C: Add HowTo schema to vs-listing page

The `app/sell-my-house-fast-vs-listing-with-agent/page.tsx` `schema` const already has a `@graph` array with `BreadcrumbList` and `FAQPage`. Add a `HowTo` entry for the cash sale process.

**Files:**
- Modify: `app/sell-my-house-fast-vs-listing-with-agent/page.tsx:15-46`

- [ ] **Step 1: Add HowTo to the @graph array**

Find the closing of the `@graph` array (after the `FAQPage` object, before `]`):
```ts
    },
  ],
}
```

Replace with:
```ts
    },
    {
      '@type': 'HowTo',
      name: 'How to Sell Your House Fast to a Cash Buyer',
      description: 'The complete step-by-step process for selling your home to Helpful Home Buyers USA — from first contact to closing.',
      totalTime: 'P14D',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Request a Cash Offer',
          text: 'Fill out our online form or call (703) 940-1159. We need your property address and a brief description of the home\'s condition. Takes 2 minutes.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Property Walkthrough',
          text: 'We schedule a quick walkthrough (or virtual tour) within 24–48 hours to assess the property as-is. No repairs or cleaning needed beforehand.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Receive a Written Cash Offer',
          text: 'Within 24 hours of the walkthrough you receive a written, no-obligation cash offer. There is no pressure and no expiration deadline.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Choose Your Closing Date',
          text: 'Accept the offer and pick any closing date that works for you — as fast as 7 days or as far out as 60+ days. We work on your schedule.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Close and Get Paid',
          text: 'Sign closing documents at a local title company. No agent commissions, no closing costs, no fees. You receive the full offer amount in cash at closing.',
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "app/sell-my-house-fast-vs-listing-with-agent/page.tsx"
git commit -m "feat(schema): add HowTo JSON-LD to vs-listing page (5-step cash sale process)"
```

---

## PHASE 2 — Infrastructure

---

### Task D: Update create-state-projects.sh and run it

Two changes to the script: (1) rename `hhb-${slug}` → `helpfulhomebuyers-${slug}`, (2) replace `PENDING_SETUP` with real GTM and Google Ads IDs.

**Files:**
- Modify: `scripts/create-state-projects.sh`

- [ ] **Step 1: Update GTM and Google Ads IDs**

Find:
```bash
GTM_ID="${GTM_ID:-PENDING_SETUP}"
GA4_ID="${GA4_ID:-PENDING_SETUP}"
GOOGLE_ADS_ID="${GOOGLE_ADS_ID:-PENDING_SETUP}"
```

Replace with:
```bash
GTM_ID="${GTM_ID:-GTM-KFX3DMBX}"
GA4_ID="${GA4_ID:-PENDING_SETUP}"
GOOGLE_ADS_ID="${GOOGLE_ADS_ID:-AW-17947613888}"
```

- [ ] **Step 2: Rename project naming pattern**

Find (in the main loop):
```bash
  project_name="hhb-${slug}"
```

Replace with:
```bash
  project_name="helpfulhomebuyers-${slug}"
```

- [ ] **Step 3: Update the footer instructions**

Find:
```bash
echo "  2. Trigger first deploy: vercel deploy --project hhb-virginia --prod"
```

Replace with:
```bash
echo "  2. Trigger first deploy: vercel deploy --project helpfulhomebuyers-virginia --prod"
```

- [ ] **Step 4: Commit the script changes**

```bash
git add scripts/create-state-projects.sh
git commit -m "feat(infra): rename Vercel projects to helpfulhomebuyers-[state], add real GTM/Google Ads IDs"
```

- [ ] **Step 5: Verify Vercel CLI is authenticated**

```bash
vercel whoami
```
Expected: prints your Vercel account username. If not logged in, run `vercel login` first.

- [ ] **Step 6: Run the script from the project root**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
chmod +x scripts/create-state-projects.sh
./scripts/create-state-projects.sh 2>&1 | tee /tmp/state-deploy-log.txt
```
Expected: 15 state project blocks, each ending with `✓ [State] done`. Takes 5–10 minutes.

- [ ] **Step 7: Verify projects created**

```bash
vercel project ls | grep helpfulhomebuyers
```
Expected: 15+ lines including `helpfulhomebuyers-virginia`, `helpfulhomebuyers-texas`, etc.

- [ ] **Step 8: Set DNS records in Namecheap for all 15 domains**

For each domain (e.g. `helpfulhomebuyerstexas.com`), in Namecheap Advanced DNS:
```
Type: A     | Host: @   | Value: 76.76.21.21          | TTL: Automatic
Type: CNAME | Host: www | Value: cname.vercel-dns.com  | TTL: Automatic
```

- [ ] **Step 9: Trigger production deploys for all 15 states**

```bash
for state in virginia texas florida georgia ohio north-carolina south-carolina illinois michigan new-york new-jersey california arizona colorado connecticut; do
  echo "Deploying helpfulhomebuyers-${state}..."
  vercel deploy --project "helpfulhomebuyers-${state}" --prod --yes 2>&1 | tail -3
done
```
Expected: each prints a production URL ending in `.vercel.app` and the custom domain.

---

## PHASE 3 — Live Site Tasks

---

### Task E: Generate 150 state blog articles (10 per state)

Create a standalone TypeScript script that generates 10 articles per state using the Anthropic API and inserts them into the Supabase `blog_posts` table. The existing `content-generator.ts` is Virginia-only; this script is state-aware.

**Files:**
- Create: `scripts/generate-state-blog-posts.ts`

- [ ] **Step 1: Check Supabase blog_posts column names**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
node -e "
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })
const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
s.from('blog_posts').select('*').limit(1).then(r => { console.log(JSON.stringify(Object.keys(r.data?.[0] ?? {}))) })
"
```
Expected: prints column names. Confirm these exist: `slug`, `title`, `content`, `meta_description`, `target_keyword`, `word_count`, `city_tags`, `status`, `published_at`. If the column names differ, adjust the insert in Step 3 accordingly.

- [ ] **Step 2: Create the generation script**

Create `scripts/generate-state-blog-posts.ts`:

```typescript
/**
 * scripts/generate-state-blog-posts.ts
 *
 * Generates 10 SEO blog articles per state (150 total) and inserts them
 * into the Supabase blog_posts table.
 *
 * Usage:
 *   npx tsx scripts/generate-state-blog-posts.ts [state-slug]
 *   npx tsx scripts/generate-state-blog-posts.ts          # all 15 states
 *   npx tsx scripts/generate-state-blog-posts.ts virginia # one state only
 */

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

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
  phone: string
  phoneDisplay: string
  siteUrl: string
  topCities: string[]
}

const STATES: StateConfig[] = [
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersvirginia.com', topCities: ['Richmond', 'Virginia Beach', 'Chesapeake'] },
  { name: 'Texas', abbr: 'TX', slug: 'texas', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerstexas.com', topCities: ['Dallas', 'Houston', 'San Antonio'] },
  { name: 'Florida', abbr: 'FL', slug: 'florida', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersflorida.com', topCities: ['Miami', 'Orlando', 'Tampa'] },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersgeorgia.com', topCities: ['Atlanta', 'Savannah', 'Augusta'] },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersohio.com', topCities: ['Columbus', 'Cleveland', 'Cincinnati'] },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnorthcarolina.com', topCities: ['Charlotte', 'Raleigh', 'Greensboro'] },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerssouthcarolina.com', topCities: ['Columbia', 'Charleston', 'Greenville'] },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersillinois.com', topCities: ['Chicago', 'Naperville', 'Rockford'] },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersmichigan.com', topCities: ['Detroit', 'Grand Rapids', 'Lansing'] },
  { name: 'New York', abbr: 'NY', slug: 'new-york', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnewyork.com', topCities: ['Buffalo', 'Rochester', 'Albany'] },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersnewjersey.com', topCities: ['Newark', 'Jersey City', 'Trenton'] },
  { name: 'California', abbr: 'CA', slug: 'california', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerscalifornia.com', topCities: ['Los Angeles', 'San Diego', 'Sacramento'] },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersarizona.com', topCities: ['Phoenix', 'Tucson', 'Mesa'] },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyerscolorado.com', topCities: ['Denver', 'Colorado Springs', 'Aurora'] },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', phone: '+17039401159', phoneDisplay: '(703) 940-1159', siteUrl: 'https://helpfulhomebuyersconnecticut.com', topCities: ['Hartford', 'Bridgeport', 'New Haven'] },
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
  const { error } = await supabase.from('blog_posts').insert({
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

  if (error) throw new Error(`Supabase insert failed: ${error.message}`)
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const filterSlug = process.argv[2]
  const states = filterSlug ? STATES.filter(s => s.slug === filterSlug) : STATES

  if (!states.length) {
    console.error(`Unknown state slug: ${filterSlug}`)
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
```

- [ ] **Step 3: Test with one state first**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
npx tsx scripts/generate-state-blog-posts.ts virginia
```
Expected: 10 lines of `✓ (NNN words, slug: ...)`. Check Supabase dashboard to confirm rows inserted.

- [ ] **Step 4: Run all 15 states** (takes ~25 minutes at 3s/article)

```bash
npx tsx scripts/generate-state-blog-posts.ts 2>&1 | tee /tmp/blog-gen-log.txt
```
Expected: 150 lines of `✓`. Check `/tmp/blog-gen-log.txt` for any `✗` failures and re-run the specific state if needed.

- [ ] **Step 5: Commit the script**

```bash
git add scripts/generate-state-blog-posts.ts
git commit -m "feat(content): add state-aware blog generation script, 10 articles per state"
```

---

### Task F: Lighthouse audit + CWV fixes

Run Lighthouse against 3 city pages and fix any Performance/SEO issues found.

**Files:**
- Modify: whichever files Lighthouse flags (likely `app/[state]/[situation]/page.tsx` or components)

- [ ] **Step 1: Install Lighthouse CLI if not present**

```bash
npm list -g lighthouse || npm install -g lighthouse
```

- [ ] **Step 2: Start dev server in one terminal**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
npm run dev
```

- [ ] **Step 3: Audit 3 city pages**

In a second terminal:
```bash
lighthouse http://localhost:3000/virginia/foreclosure/richmond \
  --output json --output-path /tmp/lh-va-richmond.json \
  --only-categories=performance,seo,best-practices --chrome-flags="--headless" \
  2>/dev/null

lighthouse http://localhost:3000/texas/foreclosure/dallas \
  --output json --output-path /tmp/lh-tx-dallas.json \
  --only-categories=performance,seo,best-practices --chrome-flags="--headless" \
  2>/dev/null

lighthouse http://localhost:3000/florida/foreclosure/miami \
  --output json --output-path /tmp/lh-fl-miami.json \
  --only-categories=performance,seo,best-practices --chrome-flags="--headless" \
  2>/dev/null
```

- [ ] **Step 4: Extract scores and top opportunities**

```bash
node -e "
['va-richmond','tx-dallas','fl-miami'].forEach(id => {
  const r = JSON.parse(require('fs').readFileSync('/tmp/lh-'+id+'.json','utf8'))
  const cats = r.categories
  console.log(id+':')
  console.log('  perf='+Math.round(cats.performance.score*100)+' seo='+Math.round(cats.seo.score*100)+' bp='+Math.round(cats['best-practices'].score*100))
  // Top 3 failing audits
  const audits = Object.values(r.audits).filter(a => a.score !== null && a.score < 0.9 && a.details)
  audits.sort((a,b) => (a.score??1)-(b.score??1))
  audits.slice(0,3).forEach(a => console.log('  ✗ '+a.id+' ('+a.score+') '+a.title))
})
"
```
Expected: scores and failing audits printed. Identify patterns.

- [ ] **Step 5: Apply fixes based on findings**

Common fixes for this codebase:

**If `uses-optimized-images` fails** — hero images lack `priority` prop. In `app/[state]/[situation]/page.tsx`, find any `<Image>` without `priority` in the hero section and add it. (If the hero uses a CSS background, no change needed.)

**If `render-blocking-resources` fails** — check `app/layout.tsx` for synchronous third-party scripts. Add `defer` or `async` attribute.

**If `meta-description` fails** — verify the `generateMetadata` function always returns a `description`. It currently does; flag if not.

**If `document-title` fails** — verify titles are unique per page. Currently they include state + situation; flag if not.

After identifying actual failures from Step 4, apply targeted fixes, then re-run Lighthouse to confirm scores improved.

- [ ] **Step 6: Commit fixes**

```bash
git add -A
git commit -m "perf: fix Lighthouse CWV issues identified in audit (Virginia/Texas/Florida city pages)"
```

---

### Task G: Submit sitemaps to Google Search Console (Playwright)

Use the Playwright MCP to log into Google Search Console and submit the sitemap for each of the 15 domains.

**Note:** GSC sitemap submission requires the domain to already be verified. If domains are not yet verified, this task must be done via the Vercel dashboard (Vercel auto-verifies domains added to projects — check `https://vercel.com/dashboard` for each project's domain status before running this task).

- [ ] **Step 1: Confirm all 15 domains are verified in Vercel**

```bash
for state in virginia texas florida georgia ohio north-carolina south-carolina illinois michigan new-york new-jersey california arizona colorado connecticut; do
  echo -n "helpfulhomebuyers-${state}: "
  vercel domains inspect "helpfulhomebuyers${state//-/}.com" --project "helpfulhomebuyers-${state}" 2>&1 | grep -i "verified\|error" | head -1
done
```
Expected: each shows `verified`. If any show errors, fix DNS before proceeding.

- [ ] **Step 2: Open Google Search Console via Playwright**

Use the Playwright MCP browser to navigate to `https://search.google.com/search-console` and log in with the Google account tied to the GBP listing.

- [ ] **Step 3: For each domain, add property and submit sitemap**

For each domain in this list:
```
helpfulhomebuyersvirginia.com
helpfulhomebuyerstexas.com
helpfulhomebuyersflorida.com
helpfulhomebuyersgeorgia.com
helpfulhomebuyersohio.com
helpfulhomebuyersnorthcarolina.com
helpfulhomebuyerssouthcarolina.com
helpfulhomebuyersillinois.com
helpfulhomebuyersmichigan.com
helpfulhomebuyersnewyork.com
helpfulhomebuyersnewjersey.com
helpfulhomebuyerscalifornia.com
helpfulhomebuyersarizona.com
helpfulhomebuyerscolorado.com
helpfulhomebuyersconnecticut.com
```

In GSC: click "Add property" → enter `https://[domain]` → select "URL prefix" → choose "HTML tag" verification method → copy the meta tag content value → save that value (you'll add it to the site).

- [ ] **Step 4: Add GSC verification meta tags to the layout**

The verification meta tags need to be added to `app/layout.tsx` in the `metadata` export. Open `app/layout.tsx` and find the `metadata` export. Add a `verification` key:

```ts
export const metadata: Metadata = {
  // ... existing fields ...
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN ?? '',
  },
}
```

Then add `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN` to each state's Vercel env vars:
```bash
echo "THE_TOKEN_VALUE" | vercel env add NEXT_PUBLIC_GSC_VERIFICATION_TOKEN production \
  --project helpfulhomebuyers-virginia --yes
```
Repeat for each state with its specific token. Redeploy after adding.

- [ ] **Step 5: Submit sitemap in GSC**

After verification succeeds in GSC, navigate to Sitemaps → enter `sitemap.xml` → click Submit.

---

### Task H: Post to Google Business Profile (Playwright)

Post a "What's new" update to the GBP listing announcing 15-state coverage.

- [ ] **Step 1: Navigate to GBP via Playwright**

Use the Playwright MCP browser to navigate to `https://business.google.com` and log in.

- [ ] **Step 2: Create the post**

Navigate to Posts → Create post → "What's new". Enter this content:

**Title:** We Now Buy Houses in 15 States — Get a Cash Offer Today

**Body:**
```
Helpful Home Buyers USA now purchases homes in 15 states: Virginia, Texas, Florida, Georgia, Ohio, North Carolina, South Carolina, Illinois, Michigan, New York, New Jersey, California, Arizona, Colorado, and Connecticut.

No repairs. No commissions. Cash offer in 24 hours, close in 7 days or on your schedule.

Visit helpfulhomebuyersusa.com or call (703) 940-1159 for a free, no-obligation offer.
```

**CTA button:** Learn more → `https://helpfulhomebuyersusa.com`

- [ ] **Step 3: Publish and screenshot**

Click Publish. Take a screenshot to confirm the post is live.

---

## Execution Order Summary

```
Phase 1 (now, parallel):  Task A → Task B → Task C  [all in same file session]
Phase 2 (after Phase 1):  Task D  [update script → run script → DNS → deploy]
Phase 3 (after deploys):  Task E  [blog gen, ~25 min unattended]
                          Task F  [Lighthouse, ~30 min with fixes]
                          Task G  [GSC, manual Playwright session]
                          Task H  [GBP post, 5 min Playwright]
```
