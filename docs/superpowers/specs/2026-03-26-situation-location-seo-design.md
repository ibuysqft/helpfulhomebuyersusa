# Situation × Location Programmatic SEO — Design Spec

**Date:** 2026-03-26
**Status:** Approved
**Goal:** Dominate Google rankings for situation-specific + location home buying queries across all 15 states by building a fully programmatic, state-law-aware content system.

---

## 1. Scope

### What we're building
1. **Situation × Location programmatic pages** — up to 24,000 pages covering 33 seller situations × 15 states × ~50 cities per state
2. **State + Situation hub pages** — 150 mid-tier pages (one per state × situation) targeting statewide queries
3. **FAQ schema on existing situation pages** — `FAQPage` JSON-LD on 7 existing pages to capture People Also Ask boxes
4. **AI content generation script** — one-time script that writes state law blocks and city intro paragraphs via the Claude API, stored as static data

### What we're NOT building
- New top-level navigation changes
- Changes to the existing funnel or lead API
- Per-page AI generation at request time (all AI content pre-generated and stored)

---

## 2. URL Structure

```
/[state]/[situation]/[city]
```

**Examples:**
- `/virginia/foreclosure/fairfax`
- `/texas/inherited/houston`
- `/florida/divorce/miami`

**Hub pages (state + situation):**
- `/virginia/foreclosure` — all VA cities for foreclosure situation
- `/texas/inherited` — all TX cities for inherited situation

**State slugs:** `virginia`, `texas`, `florida`, `georgia`, `ohio`, `california`, `illinois`, `north-carolina`, `new-jersey`, `new-york`, `south-carolina`, `connecticut`, `michigan`, `arizona`, `colorado`

**Situation slugs (top 10 at launch):**
`foreclosure`, `inherited`, `divorce`, `probate`, `behind-payments`, `tax-lien`, `fire-damage`, `vacant`, `tired-landlord`, `code-violations`

Remaining 23 situations added incrementally after launch.

---

## 3. Content Architecture

Each city page is assembled from 6 layers:

| Layer | Source | Unique per |
|---|---|---|
| Hero headline | Template: "Sell Your [Situation Label] House Fast in [City], [State]" | City × Situation |
| State law block | AI-generated script, stored in `data/state-content/[state]/[situation].ts` | State × Situation |
| City signals | City data file — county, region, nearby cities | City |
| Situation bullets | `data/situations.ts` — 33 pre-written defs | Situation |
| AI city intro | AI-generated for top 20 cities/state; template fallback for others | City × Situation (top) |
| FAQ + JSON-LD | `data/faqs.ts` — situation FAQs + city FAQ overrides | Situation (+ city) |

### State law block (B content)
One rich paragraph per state × situation covering the genuine legal landscape:
- Foreclosure: state timeline (judicial vs non-judicial), redemption period, notice requirements
- Inherited: probate required vs affidavit, estate tax thresholds, time to clear title
- Divorce: equitable distribution vs community property, court approval requirements
- Tax lien: redemption period, tax sale process, right of first refusal
- etc.

Generated once via `scripts/generate-state-content.ts`, stored as static TypeScript files. Regenerate only when laws change or new situations/states are added.

### AI city intro (C content)
A unique 2-sentence opener that names the city, county, and a hyperlocal signal (e.g., "Fairfax County's judicial foreclosure process averages 90 days..."). Generated for the top 20 cities per state by estimated search volume. All other cities use a high-quality template.

### FAQ schema
7 existing situation pages get `FAQPage` JSON-LD immediately:
`/foreclosure`, `/inherited`, `/divorce`, `/damaged`, `/probate`, `/behind-payments`, `/landlord`

6–8 questions per page sourced from `data/faqs.ts`. City pages also include 3–5 city-specific FAQs inline.

---

## 4. Data Layer

### Files (merge worktree + extend)

```
data/
  situations.ts              ← 33 situation defs (worktree — done)
  cities.ts                  ← VA city data with FAQs (worktree — done)
  faqs.ts                    ← situation FAQ definitions (worktree — done)
  situation-city-matrix.ts   ← matrix generator (worktree — done)
  counties.ts                ← county data (worktree — done)
  states/
    virginia.ts              ← done (main cities.ts is VA-focused)
    texas.ts                 ← done (worktree)
    florida.ts               ← done (worktree)
    california.ts            ← done (worktree)
    georgia.ts               ← partial (worktree)
    ohio.ts                  ← partial (worktree)
    illinois.ts              ← needs completion
    north-carolina.ts        ← needs completion
    new-jersey.ts            ← needs creation
    new-york.ts              ← needs creation
    south-carolina.ts        ← needs creation
    connecticut.ts           ← needs creation
    michigan.ts              ← needs creation
    arizona.ts               ← needs creation
    colorado.ts              ← needs creation
    index.ts                 ← re-exports all states
  state-content/             ← AI-generated, new
    virginia/
      foreclosure.ts         ← { legalBlock: string, cityIntros: Record<slug, string> }
      inherited.ts
      divorce.ts
      ... (10 situations)
    texas/
      ...
    ... (15 states × 10 situations = 150 files)
```

### State data schema
```ts
export interface StateCity {
  name: string
  slug: string
  county: string
  population?: number        // used to rank top 20 cities
}

export interface StateDef {
  name: string
  slug: string
  abbr: string               // 'VA', 'TX', etc.
  cities: StateCity[]
  foreclosureType: 'judicial' | 'non-judicial'
  probateRequired: boolean
  divorceType: 'equitable' | 'community-property'
}
```

### State content schema
```ts
export interface StateContent {
  legalBlock: string         // 2–4 sentences, state-law-specific
  cityIntros: Record<string, string>  // slug → 2-sentence opener
}
```

---

## 5. Route Files

```
app/
  [state]/
    [situation]/
      page.tsx               ← state+situation hub (150 pages)
      [city]/
        page.tsx             ← city page (7,500+ pages)
```

### Rendering strategy
- `generateStaticParams` pre-renders top 10 situations × top 20 cities per state at build (~3,000 pages)
- `dynamicParams = true` — remaining combos generate on first request, then cached via ISR
- State+situation hub pages always fully pre-rendered (only 150 total)
- `revalidate = false` (static forever) — content only changes when data files are updated and redeployed

### Metadata
Each page generates unique `title`, `description`, and `openGraph` via `generateMetadata()`:
- Title: `"Sell Your [Situation] House Fast in [City], [State Abbr] | Helpful Home Buyers USA"`
- Description: first 155 chars of the state law block + city name
- `robots: index, follow` (these ARE meant to be indexed)

### Structured data
Every city and hub page includes:
- `LocalBusiness` JSON-LD (already used on other pages — reuse)
- `FAQPage` JSON-LD from situation + city FAQs

---

## 6. Internal Linking

Wired automatically from data:

| From | To | Link text |
|---|---|---|
| City page | State+situation hub | "See all [State] [Situation] resources" |
| City page | 3 nearby city pages | "We also buy [situation] houses in [Nearby City]" |
| State+situation hub | All city pages in state | City name links |
| Existing `/foreclosure` etc. | All 15 state hubs | "We buy [situation] houses in [State]" |
| Existing state city pages | Relevant situation city pages | "Facing [situation] in [City]?" |

---

## 7. Content Generation Script

**File:** `scripts/generate-state-content.ts`

**Inputs:** All state defs + situation defs from data files

**Process:**
1. For each state × situation pair not yet generated:
   - Build a structured prompt including: state name, situation type, state legal facts (foreclosureType, probateRequired, etc.)
   - Call Claude API (`claude-sonnet-4-6`) with the prompt
   - Parse JSON response: `{ legalBlock, cityIntros }`
   - Write to `data/state-content/[state]/[situation].ts`
2. Dry-run mode (`--dry-run`) prints prompts without calling API
3. Incremental mode (`--state virginia --situation foreclosure`) generates one file at a time

**Prompt structure:**
```
You are writing legal-accuracy-focused content for a cash home buying company.
Write a 3-sentence paragraph describing [situation] law in [state]:
- [state-specific legal facts]
- Accurate, specific (not generic), no legal advice disclaimer needed inline
- Mention specific timelines, court names, or processes unique to [state]
Return JSON: { "legalBlock": "...", "cityIntros": { "[city-slug]": "2 sentence opener" for top 20 cities } }
```

---

## 8. FAQ Schema — Existing Pages

**Affected files:**
- `app/foreclosure/page.tsx`
- `app/inherited/page.tsx`
- `app/divorce/page.tsx`
- `app/damaged/page.tsx`
- `app/probate/page.tsx`
- `app/behind-payments/page.tsx`
- `app/landlord/page.tsx`

**Implementation:** Add a `<script type="application/ld+json">` block with `FAQPage` schema. Source from `data/faqs.ts` (already written in worktree). Also render the FAQ questions as visible `<details>` or accordion elements on the page for user value.

---

## 9. Build Order

1. **Merge worktree data** — copy `data/` from worktree into main branch
2. **Complete state city data** — create/complete 9 missing state files (NJ, NY, SC, CT, MI, AZ, CO + finish IL, NC)
3. **FAQ schema on existing pages** — add JSON-LD + visible FAQ to 7 situation pages
4. **Build hub route** — `app/[state]/[situation]/page.tsx`
5. **Build city route** — `app/[state]/[situation]/[city]/page.tsx`
6. **Run content generation script** — 15 × 10 = 150 state-content files
7. **Wire sitemap** — extend `app/sitemap.ts` to include all new routes
8. **Internal link pass** — update existing situation pages to link to state hubs
9. **Deploy + verify**

---

## 10. Success Criteria

- All 150 state+situation hub pages indexed by Google within 2 weeks of deploy
- City pages appearing for "[situation] house [city] [state]" queries within 4–8 weeks
- Existing situation pages (`/foreclosure` etc.) gain PAA boxes from FAQ schema within 2–4 weeks
- Zero duplicate content flags (each page has unique state law block or city intro)
- Sitemap submitted and all new URLs crawled within 7 days
