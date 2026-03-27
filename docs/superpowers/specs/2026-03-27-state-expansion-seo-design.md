# State Expansion + SEO Improvements — Design Spec
Date: 2026-03-27
Status: Approved

## Overview

Deploy all 15 state sites from the shared Next.js codebase and complete 8 SEO improvements.
One GitHub repo → 15 Vercel projects → 15 domains. State differentiation via env vars only.

---

## Execution Phases

### Phase 1 — Code Changes (no infra dependency, ship immediately)

**Task 4: "Top Cities We Buy In" section**
- File: `app/[state]/[situation]/page.tsx`
- Use existing `getCitiesForState(stateSlug)` to get top 8 cities by array order (already ranked by population)
- Render responsive grid of links to `/sell-my-house-fast-{city}-{abbr}` pages
- Placement: between `HowItWorks` and `FaqSection` components

**Task 7: LocalBusiness JSON-LD schema**
- File: `app/[state]/[situation]/page.tsx`
- Schema type: `RealEstateAgent`
- Fields: `name`, `url`, `telephone`, `areaServed` (state name), `priceRange`, `description`
- No physical address — use `areaServed` (statewide operation)
- Injected as `<script type="application/ld+json">` in page head

**Task 8: vs-listing page expansion**
- File: `app/sell-my-house-fast-vs-listing-with-agent/page.tsx`
- Add 7-row comparison table: close timeline, repair requirements, agent commissions, financing contingencies, certainty of sale, as-is condition, closing flexibility
- Add `HowTo` JSON-LD schema — 5 steps: request offer → inspection → receive offer → choose close date → close
- Shared across all 15 state deployments (benefits all sites on next deploy)

---

### Phase 2 — Infrastructure (critical path blocker for Phase 3)

**Task 1: Create 14 new Vercel projects + Virginia**

Script: `scripts/create-state-projects.sh` — update naming from `hhb-[state]` → `helpfulhomebuyers-[state]`

Per-project actions:
1. `vercel project add helpfulhomebuyers-[state]` linked to `ibuysqft/helpfulhomebuyersusa`
2. Set all env vars from `states/[state].env` + shared secrets
3. Add custom domain: apex + www subdomain
4. Trigger first production deploy

**Virginia specifics:**
- Create new project `helpfulhomebuyers-virginia`
- Domain: `helpfulhomebuyersvirginia.com`
- National hub (`helpfulhomebuyersusa.com`) left completely untouched
- Both projects run in parallel until national hub is ready to migrate

**Tracking env vars to populate (not PENDING_SETUP):**
- `GTM_ID` → `GTM-KFX3DMBX`
- `GOOGLE_ADS_ID` → `AW-17947613888`
- `FB_PIXEL_ID`, `TIKTOK_PIXEL`, `LINKEDIN_TAG` → remain `PENDING_SETUP`

**DNS per domain (user sets in Namecheap):**
```
@ A         → 76.76.21.21
www CNAME   → cname.vercel-dns.com
```

---

### Phase 3 — Live Site Tasks (requires deployed projects from Phase 2)

**Task 2: Sitemap submission + domain verification (Playwright)**
- For each of 15 domains: add GSC property, download HTML verification file, place in `/public/`, commit, submit sitemap URL
- Sitemap route: `app/sitemap.ts` (already exists)
- Uses existing CDP Playwright approach for Google auth

**Task 3: Lighthouse audit + CWV fixes**
- Audit 3 city pages: one each from Virginia, Texas, Florida (highest-traffic targets)
- Categories: Performance, SEO, Best Practices
- Likely fixes: hero image `priority` prop, `loading="lazy"` on below-fold images
- Report findings before applying fixes

**Task 5: 10 blog articles per state (150 total)**
- Uses existing `lib/content-generator.ts` + Anthropic API
- 10 articles per state targeting these query patterns:
  1. "sell my house fast [city1] [state]"
  2. "sell my house fast [city2] [state]"
  3. "sell my house fast [city3] [state]"
  4. "how to sell a foreclosure house in [state]"
  5. "how to sell an inherited house in [state]"
  6. "how to sell a house during divorce in [state]"
  7. "cash home buyers [state] — what to expect"
  8. "how long does it take to sell a house in [state]"
  9. "we buy houses [state] — legitimate or scam?"
  10. "sell my house fast vs listing with a realtor in [state]"
- Inserted into Supabase `blog_posts` table (schema verified before generation)
- Top 3 cities sourced from existing `getCitiesForState(stateSlug)` array

**Task 6: Google Business Profile post (Playwright)**
- Single GBP listing (national presence)
- Post type: "What's new"
- Content: announcement of 15-state coverage, link to `helpfulhomebuyersusa.com`
- Uses existing GBP Playwright session pattern from project

---

## Key Constraints

- National hub project (`helpfulhomebuyersusa.com`) must not be modified in Phase 2
- Blog generation must verify Supabase `blog_posts` table schema before inserting
- GSC verification files committed to repo must be in `/public/` (served as static files)
- Phase 3 tasks can only start after Phase 2 deploys are confirmed live

## Files Modified

| File | Tasks |
|------|-------|
| `scripts/create-state-projects.sh` | Task 1 |
| `app/[state]/[situation]/page.tsx` | Tasks 4, 7 |
| `app/sell-my-house-fast-vs-listing-with-agent/page.tsx` | Task 8 |
| `public/google-*.html` (15 files) | Task 2 |
| Supabase `blog_posts` table | Task 5 |
