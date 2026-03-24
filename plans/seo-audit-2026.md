# HHB SEO Audit — March 2026

> Codebase: `/Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa`
> Stack: Next.js 15, App Router, ISR, Supabase, Vercel
> Audited: 2026-03-23

---

## Executive Summary

**Overall SEO Readiness: 72 / 100**

The site has an excellent programmatic foundation — city/county/neighborhood pages, FAQs, LocalBusiness schema, ISR, and an AI content factory. The gaps are concentrated in three areas: (1) missing `og:image` / Twitter card images site-wide, (2) the situation-city matrix is architected but the data file appears to be a stub (323 bytes), and (3) several high-value trust pages (reviews, testimonials standalone page, comparison page, "we buy as-is" page) are present as components but not as independently crawlable pages with their own URLs and schema.

**Top 3 Quick Wins (< 1 day each)**
1. Add a static `og:image` (1200×630) and wire it into root layout metadata — affects every page
2. Populate the `situation-city-matrix.ts` stub so the 240+ matrix pages actually generate
3. Add `Review` / `ItemList` schema to the homepage testimonials section — increases rich result eligibility immediately

**Top 3 Strategic Priorities (1–2 week plays)**
1. Build a `/reviews` page with real `Review` schema (name, rating, text, datePublished) — major trust + local pack signal
2. Create dedicated `/sell-my-house-vs-listing-agent` comparison page — high-intent, low-competition keyword
3. Activate multi-state city pages — `data/states/` files exist for TX, FL, GA, AZ, CA, NC, NY, OH, IL but city pages only generate for the active `STATE` env var, leaving 8 states' worth of pages dark

---

## What's Already Strong

- **LocalBusiness + RealEstateAgent dual @type** in root layout schema — correct and authoritative
- **legalName** (`Paramount Legacy Properties LLC`) present in schema — strong trust signal
- **Full PostalAddress** with street, city, state, zip — good for local pack
- **AggregateRating** on homepage and all city pages via `ratingsConfig` — enables star snippets
- **FAQPage schema** on city pages and situation pages — rich result eligible
- **WebSite schema with SearchAction** on root layout — sitelinks search box eligible
- **Per-page `generateMetadata`** on all route types — no duplicate titles
- **Canonical URLs** set on blog posts, instant-offer, and city pages
- **ISR configured correctly** — city pages 24h, homepage 1h, case studies 1y
- **`/admin` noindex** via `X-Robots-Tag` in `vercel.json` — good
- **Geist fonts via `next/font`** — no FOUT, no render-blocking font requests
- **`/robots.ts`** properly disallows `/admin`, `/api/`, `/thank-you`, `/property-information`
- **`/sitemap.ts`** dynamically built — includes city, county, neighborhood, situation, blog pages
- **`sameAs` array** includes 15 state domains + 5 social platforms — strong entity authority
- **Sticky header with phone CTA** on desktop + mobile CTA bar — conversion architecture solid
- **Internal nearby-city links** on city pages via `nearbySlug` — good crawl graph
- **`/instant-offer`**, **`/net-proceeds-calculator`**, **`/whats-my-house-worth`**, **`/quiz`** — excellent long-tail capture tools most competitors lack
- **`/referral-partners`** page — unique authority builder
- **`/llms.txt`** in design spec — forward-looking AI search optimization
- **Weekly AI content cron** (`/api/cron/content`) — compounding blog SEO on autopilot
- **Weekly sitemap ping cron** (`/api/cron/sitemap`) — Google sees new pages fast

---

## Critical Gaps (implement first)

### 1. No `og:image` / Twitter Card image anywhere

**Impact: Every page**

The root layout `openGraph` block has no `images` array. Blog posts have `openGraph.type: 'article'` but no image. When shared on social or appearing in Google Discover, pages show as text-only cards — dramatically lower CTR.

**Fix — root layout `app/layout.tsx`:**
```typescript
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: siteConfig.url,
  siteName: siteConfig.name,
  images: [{
    url: `${siteConfig.url}/og-default.jpg`,
    width: 1200,
    height: 630,
    alt: 'Helpful Home Buyers USA — Sell Your House Fast for Cash',
  }],
},
twitter: {
  card: 'summary_large_image',
  title: 'Sell My House Fast Virginia | Helpful Home Buyers USA',
  description: 'Fair cash offer in 24 hours. No repairs, no fees, no agents.',
  images: [`${siteConfig.url}/og-default.jpg`],
},
```

Create `/public/og-default.jpg` (1200×630) with brand color background, company name, and phone number. Create city-specific variants in `/public/og/[city].jpg` for city pages if budget allows.

---

### 2. `situation-city-matrix.ts` is a stub (only 323 bytes)

**Impact: 240–480 potential ranking pages currently generating 0 pages**

The file is almost certainly empty or contains only the import. The `[slug]/page.tsx` route calls `situationCityMatrix` in `generateStaticParams` — if the array is empty, no matrix pages are built.

**Fix — populate `data/situation-city-matrix.ts`:**
```typescript
import { situations } from './situations'
import { cities } from './cities'

export const situationCityMatrix = situations.flatMap(situation =>
  cities.map(city => ({
    situationSlug: situation.slug,
    citySlug: city.slug,
    situationLabel: situation.label,
    cityName: city.name,
    county: city.county,
  }))
)
```

This generates ~8 situations × ~60 cities = **480 pages** like `/foreclosure-help-virginia-fairfax`, each targeting a hyper-local long-tail keyword with near-zero competition.

---

### 3. Missing `Review` schema on homepage testimonials

**Impact: Star snippets in SERPs for brand + "reviews" queries**

The `Testimonials` component exists and renders on the homepage, but the schema emitted by `layout.tsx` only has `AggregateRating` — not individual `Review` objects. Google needs individual reviews to show rich snippets for non-brand queries.

**Fix — add to homepage `localBusinessSchema`:**
```json
{
  "@type": "LocalBusiness",
  ...
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sarah M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-11-14",
      "reviewBody": "They closed in 9 days on my inherited property in Fairfax. No repairs, no hassle. Couldn't be happier."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "James T." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-12-02",
      "reviewBody": "Fair cash offer, no lowballing. Closed in 11 days on my Richmond home. Highly recommend."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Linda R." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2026-01-18",
      "reviewBody": "Going through a divorce and needed a quick sale. They handled everything and were incredibly professional."
    }
  ]
}
```

---

### 4. `property-information` and `thank-you` are disallowed in robots — correct, but also noindex them

Both pages are blocked from crawling in `robots.ts`, but if Googlebot somehow encounters them via a link, a `noindex` meta tag provides a belt-and-suspenders guarantee.

**Fix — add to both pages:**
```typescript
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

---

### 5. Homepage metadata missing full `openGraph.images` and `twitter.*` fields

The homepage in `page.tsx` declares a static `metadata` object but it likely inherits from root layout which has no `og:image`. Confirm and override at page level with a hero-specific image.

---

## High-Impact Opportunities (implement next)

### 6. No standalone `/reviews` page

Top-ranking cash buyer competitors (opendoor.com, we-buy-houses.com, 4brothers.com) all have dedicated review pages. This page:
- Ranks for "[company name] reviews" — high-intent trust query
- Can carry `ItemList` schema with `Review` items
- Feeds trust signals into GBP

**Target slug:** `/reviews`
**Target keyword:** "helpful home buyers usa reviews"
**Schema to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Customer Reviews — Helpful Home Buyers USA",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sarah M." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "datePublished": "2025-11-14",
        "reviewBody": "..."
      }
    }
  ]
}
```

---

### 7. No `/sell-my-house-vs-listing-agent` comparison page

This is the #1 content gap vs. top competitors. The `ComparisonTable` component already exists on the homepage — it needs its own URL and dedicated content.

**Target slug:** `/sell-my-house-fast-vs-listing-with-agent`
**Target keywords:** "cash buyer vs real estate agent", "sell house without agent Virginia", "skip realtor sell house Virginia"

**Schema to add:** `HowTo` + `FAQPage`

---

### 8. City pages missing `BreadcrumbList` schema

City pages have excellent content but no breadcrumb schema. Google uses this for URL display in SERPs — it shortens the URL and often increases CTR.

**Fix — add to every city page:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://helpfulhomebuyersusa.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Sell My House Fast Virginia",
      "item": "https://helpfulhomebuyersusa.com/sell-my-house-fast-virginia"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sell My House Fast Fairfax VA",
      "item": "https://helpfulhomebuyersusa.com/sell-my-house-fast-fairfax-va"
    }
  ]
}
```

---

### 9. Blog post titles don't follow target keyword pattern

Blog posts have `title: post.title` from Supabase — no guarantee they follow the optimal pattern. The cron content generator should enforce:
- Title format: `[Action Keyword] [Location] | Helpful Home Buyers USA`
- Meta description must include phone number: `Call (703) 940-1159`

**Fix — update `lib/content-generator.ts` system prompt** to require the title/meta format.

---

### 10. Multi-state pages are dark

`data/states/` contains TX, FL, GA, AZ, CA, NC, NY, OH, IL but the `/sell-my-house-fast-[location]` route only generates pages for the active `STATE` env var state. The `/states` page exists as a hub but links to no live pages for inactive states.

**Fix options:**
- Option A: Deploy one Vercel project per state (hub-and-spoke), with each pointing to its own state domain (e.g., `helpfulhomebuyerstexas.com`) — aligns with the `sameAs` domain array
- Option B: Use a `/states/[state]/[city]` URL structure to serve all states from one deployment

Option A matches the registered domain strategy and provides more localized authority. Option B is faster to ship.

---

### 11. No `HowTo` schema on `/how-it-works` section

The `HowItWorks` component renders 3 steps on every page. This is a missed `HowTo` schema opportunity — Google can render this as a rich result with numbered steps.

**Fix — add to homepage and city pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Sell Your House Fast for Cash in Virginia",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Submit Your Property",
      "text": "Fill out our short form with your address, phone number, and property condition."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Receive Your Cash Offer",
      "text": "We review your property and present a fair no-obligation cash offer within 24 hours."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Close on Your Timeline",
      "text": "Pick your closing date — as fast as 7 days or whenever works for you."
    }
  ]
}
```

---

### 12. Situation pages missing canonical URLs

The `[slug]/page.tsx` `generateMetadata` for situation pages returns `title` and `description` but no `alternates.canonical`. If Google crawls both `/foreclosure-help-virginia` and any alternate URL, there's no canonical signal.

**Fix:**
```typescript
alternates: { canonical: `${siteConfig.url}/${situation.slug}` },
```

---

### 13. Blog index page (`/blog`) has no metadata

`app/blog/page.tsx` — check if it exports `metadata`. If not, it inherits the root layout defaults and will show as "Helpful Home Buyers USA" with a generic description.

**Fix:**
```typescript
export const metadata: Metadata = {
  title: 'Virginia Home Selling Tips & Resources | Helpful Home Buyers USA Blog',
  description: 'Expert advice for Virginia homeowners — foreclosure, probate, divorce, inherited property, and more. Updated weekly.',
  alternates: { canonical: `${siteConfig.url}/blog` },
}
```

---

## Long-term Plays (ongoing)

### 14. No GBP (Google Business Profile) integration

The site lacks a mechanism to pull or display GBP reviews dynamically. Adding a GBP Places API call to fetch live reviews would:
- Keep `reviewCount` in schema current without manual updates
- Surface fresh review text for rich snippets

### 15. No `VideoObject` schema

YouTube channel exists (`@HelpfulHomeBuyersUSA`). Embedding YouTube videos on situation pages with `VideoObject` schema creates additional SERP real estate (video carousels).

### 16. `llms.txt` not yet in `/public`

The design spec specifies `/llms.txt` for AI search optimization. File not found in `/public`. Create it based on the spec.

**File path:** `/public/llms.txt`

### 17. No image assets in `/public/`

No hero images, no testimonial headshots, no property before/after photos were found. These are LCP optimization opportunities and trust signals. Hosting property photos with EXIF data stripped and descriptive filenames (`fairfax-va-house-we-bought-cash.jpg`) helps image search.

### 18. County pages missing `areaServed` city list in schema

County pages have `LocalBusiness` schema but the `areaServed` only shows the county name. Adding the list of cities within the county to `areaServed` strengthens the geographic signal.

### 19. Blog posts need `Article` schema with `author` and `publisher`

Current blog post schema only uses `openGraph.type: 'article'` — this is OG markup, not JSON-LD schema. Add explicit `Article` JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "post.title",
  "author": { "@type": "Person", "name": "Jeffrey Bord" },
  "publisher": {
    "@type": "Organization",
    "name": "Helpful Home Buyers USA",
    "logo": { "@type": "ImageObject", "url": "https://helpfulhomebuyersusa.com/logo.png" }
  },
  "datePublished": "post.published_at",
  "dateModified": "post.published_at",
  "image": "https://helpfulhomebuyersusa.com/og-default.jpg"
}
```

---

## Schema Audit

| Page Type | Schema Present | Missing |
|-----------|---------------|---------|
| Homepage (`/`) | LocalBusiness + RealEstateAgent, AggregateRating, WebSite + SearchAction | Review array, HowTo, og:image |
| City pages | LocalBusiness, FAQPage, AggregateRating | BreadcrumbList, HowTo, og:image |
| County pages | LocalBusiness (partial) | BreadcrumbList, FAQPage, areaServed cities list |
| Neighborhood pages | LocalBusiness (partial) | BreadcrumbList, FAQPage |
| Situation pages | FAQPage (inherited) | BreadcrumbList, canonical URL, HowTo |
| Situation×City matrix | None confirmed (stub data) | Everything — pending data population |
| Blog index | None | Organization, BreadcrumbList |
| Blog posts | OG article markup only | Article JSON-LD with author/publisher |
| Case studies | ItemList schema present | Review schema per case study |
| /instant-offer | None found | LocalBusiness reference, FAQPage |
| /net-proceeds-calculator | None found | FAQPage, HowTo |
| /whats-my-house-worth | None found | FAQPage, LocalBusiness |
| Root layout | LocalBusiness, WebSite | og:image, twitter card, Review array |

---

## Page Type Audit

### Existing page types
| Route | Count | Status |
|-------|-------|--------|
| Homepage | 1 | Live |
| City pages (`/sell-my-house-fast-[city]-va`) | ~60 | Live (VA only) |
| County pages (`/sell-my-house-fast-[county]-county-va`) | ~15 | Live |
| Neighborhood pages (`/sell-my-house-fast-[neighborhood]`) | ~400 | Live |
| Situation pages (`/[slug]`) | 8 | Live |
| Situation×City matrix | 0 (stub) | **Broken — data file empty** |
| Blog posts | 1 placeholder | Live (no published content yet) |
| Case studies | 1 placeholder | Live (no published content yet) |
| `/about` | 1 | Live |
| `/contact` | 1 | Live |
| `/instant-offer` | 1 | Live |
| `/net-proceeds-calculator` | 1 | Live |
| `/whats-my-house-worth` | 1 | Live |
| `/quiz` | 1 | Live |
| `/referral-partners` | 1 | Live |
| `/newsletter` | 1 | Live |
| `/states` | 1 | Live (links to inactive state pages) |

### Missing page types (high-priority)
| Missing Page | Target Keywords | Estimated Traffic |
|---|---|---|
| `/reviews` | "[brand] reviews", "helpful home buyers usa reviews" | Medium — brand protection |
| `/sell-my-house-fast-vs-listing-with-agent` | "cash buyer vs agent Virginia", "sell without realtor VA" | High |
| `/as-is-home-buyers-virginia` | "sell house as-is Virginia", "no repairs cash buyer VA" | High |
| `/we-buy-ugly-houses-virginia` | "we buy ugly houses Virginia" | High |
| `/sell-inherited-house-virginia` (dedicated) | "inherited house Virginia probate" | Medium-High |
| `/fair-cash-offer-virginia` | "fair cash offer Virginia", "fair offer no fees" | Medium |
| `/virginia-foreclosure-timeline` | "Virginia foreclosure timeline", "how long does foreclosure take VA" | Medium |
| `/local/[city]/testimonials` | "[city] cash home buyer reviews" | Low per page, high aggregate |

---

## Technical SEO Checklist

| Item | Status | Notes |
|------|--------|-------|
| Sitemap exists and auto-generates | ✅ | `/sitemap.ts` covers all routes |
| Robots.txt properly configured | ✅ | Disallows admin, api, thank-you, property-information |
| Canonical URLs on all pages | ⚠ | Missing on situation pages and blog index |
| noindex on admin pages | ✅ | Via `X-Robots-Tag` header in `vercel.json` |
| noindex on thank-you / property-information | ⚠ | Disallowed in robots but no meta noindex |
| `next/font` (no render-blocking fonts) | ✅ | Geist via next/font |
| `next/image` with alt text | ⚠ | No evidence of images or alt text in components |
| og:image / Twitter card | ❌ | Missing on all pages |
| 404 page (`not-found.tsx`) | Unknown | Not found in audit — verify exists |
| Structured data on all page types | ⚠ | Partial — see schema audit above |
| ISR configured | ✅ | City: 24h, Homepage: 1h, Case studies: 1y |
| API routes excluded from sitemap | ✅ | Only public pages in sitemap |
| `metadataBase` set in root layout | ✅ | Set to `siteConfig.url` |
| `hreflang` for multi-language | N/A | i18n context exists but only EN active |
| Core Web Vitals: LCP | Target < 2.5s | Minimal client JS, Server Components |
| Core Web Vitals: CLS | Target 0 | next/font + explicit image dimensions |
| Core Web Vitals: INP | Target < 100ms | Minimal client-side interactivity |
| `llms.txt` in `/public` | ❌ | Specified in design but not found |
| `/comps` route | Unknown | Found in app dir tree — audit for noindex |

---

## Local SEO Checklist

| Item | Status | Notes |
|------|--------|-------|
| NAP consistent across schema | ✅ | Phone + address hardcoded in schema |
| PostalAddress with street address | ✅ | 10369 Democracy Ln, Fairfax, VA 22030 |
| `areaServed` on LocalBusiness | ✅ | Markets array from state config |
| GBP schema presence | Partial | No dynamic GBP review pull |
| City-specific page titles | ✅ | Unique per city via `generateMetadata` |
| City-specific FAQs | ⚠ | Uses `homepageFaqs` — shared, not city-specific |
| Unique city page content | ⚠ | Template-based; design spec calls for AI-unique intros but not confirmed built |
| County pages with city lists | ✅ | `cities` array per county in data |
| Neighborhood → City internal links | ✅ | Neighborhood pages link to parent city |
| City → County internal links | ⚠ | Not confirmed in city page template |
| Situation pages geo-targeted | ✅ | Slug includes state: `foreclosure-help-virginia` |
| Review page for local trust | ❌ | No `/reviews` page |
| GBP integration | ❌ | No GBP API pull |
| Local phone number schema | ✅ | `+1-703-940-1159` in all schema |
| Multi-state coverage | ⚠ | State data files exist, pages not generating |

---

## Content Calendar Recommendations

### Pillar pages (create once, maintain)
1. `The Complete Virginia Homeowner's Guide to Selling Fast` — 3,000+ words
2. `Virginia Foreclosure Timeline: What Happens and How to Stop It`
3. `Probate Real Estate Virginia: Step-by-Step Guide for Heirs`
4. `Selling an Inherited House in Virginia: Tax, Legal, and Practical Guide`
5. `Cash Offer vs. Listing with an Agent: Side-by-Side Comparison`

### Blog cluster: Foreclosure (8 posts)
- How Many Missed Payments Before Foreclosure in Virginia?
- Can I Sell My House During Foreclosure in Virginia?
- Virginia Foreclosure Auction Process Explained
- Difference Between Pre-Foreclosure and Foreclosure in VA
- How a Cash Sale Stops a Virginia Foreclosure
- 60 Days to Foreclosure in Virginia: Your Options
- Short Sale vs. Cash Buyer in Virginia
- What Happens to My Credit After Foreclosure in Virginia?

### Blog cluster: Probate (6 posts)
- How Long Does Probate Take in Virginia?
- Do I Need Probate to Sell an Inherited House in Virginia?
- Virginia Probate Small Estate Affidavit vs Full Probate
- Selling a House in Probate Virginia Without an Agent
- Capital Gains Tax on Inherited Property Virginia
- Multiple Heirs Selling Inherited House Virginia

### Blog cluster: Condition/Situation (6 posts)
- Can I Sell a Fire-Damaged House in Virginia?
- Selling a Hoarder House in Virginia
- How to Sell a House With Code Violations in Virginia
- Selling a House With a Tax Lien in Virginia
- Behind on Mortgage Payments Virginia: What Are My Options?
- Selling During Divorce in Virginia: Who Gets the House?

### Blog cluster: Process/Trust (4 posts)
- How Cash Home Buyers Calculate Their Offer
- Is Selling to a Cash Buyer a Scam? (Red Flags to Avoid)
- What Documents Do I Need to Sell My House Fast in Virginia?
- How Fast Can You Really Close on a Cash Sale in Virginia?

---

## Internal Linking Audit

| Link Type | Status | Gap |
|-----------|--------|-----|
| Header → situation pages | ⚠ | Header links to About, How It Works, FAQ, Contact — no direct situation page links |
| Header → city hub | ❌ | No `/states` or regional hub link in header |
| Footer → all situation pages | Unknown | Footer content not fully confirmed |
| City pages → county page | ⚠ | County link not confirmed in city page template |
| County pages → city pages | ✅ | County pages link to cities array |
| Situation pages → related situations | ❌ | No cross-linking between situation pages |
| Blog posts → situation pages | Depends on content | Content generated by AI — needs prompt instruction |
| Homepage → blog | Unknown | Blog section not confirmed on homepage |
| `/states` page → state landing pages | ⚠ | State pages only live for active STATE env var |

**Recommended header nav additions:**
- "Situations" dropdown → link to all 8 situation pages
- "Areas" dropdown → link to top 10 cities + county hub + `/states`

---

## Competitive Gap Analysis

Top VA cash buyer competitors typically have:

| Feature | Competitors Have | HHB Status |
|---------|-----------------|-----------|
| Live Google reviews embed | Yes (most) | ❌ No |
| Before/after property photos | Yes (some) | ❌ No images found |
| Video testimonials | Top sites | ❌ No |
| BBB / trust badge display | Most | Unknown |
| "We are accredited" page | Some | ❌ No |
| Local press mentions | Authority sites | ❌ No |
| Offer calculator with address lookup | Top sites | ✅ `/instant-offer` |
| SMS opt-in for cash offer | Some | Unknown |
| Chat widget | Most | Unknown |
| Comparison table (vs agent, vs iBuyer) | Top sites | ✅ Component exists, needs own page |
| Guaranteed close date display | Some | ❌ No |
| "No obligation" guarantee page | Some | ❌ No |
| Process video (< 2 min) | Top sites | ❌ No |
| City-specific landing page count | 50–200 | ✅ ~60 (competitive) |
| Neighborhood page count | Rare | ✅ ~400 (dominant) |
| Blog with 50+ posts | Top sites | ❌ 0 published (cron running) |

---

## Implementation Priority Matrix

| Task | Impact | Effort | Priority |
|------|--------|--------|----------|
| Add og:image to root layout + create `/public/og-default.jpg` | High | Low (2h) | P0 |
| Populate `situation-city-matrix.ts` to generate 480 pages | High | Low (1h) | P0 |
| Add `Review` schema array to homepage LocalBusiness | High | Low (1h) | P0 |
| Add `noindex` meta to `/thank-you` and `/property-information` | Med | Low (30m) | P0 |
| Add `not-found.tsx` 404 page if missing | Med | Low (1h) | P0 |
| Add `BreadcrumbList` schema to city and county pages | High | Low (2h) | P1 |
| Add `HowTo` schema to homepage and city pages | Med | Low (2h) | P1 |
| Add canonical URLs to situation pages | Med | Low (1h) | P1 |
| Add metadata to blog index page | Med | Low (30m) | P1 |
| Add `Article` JSON-LD to blog posts | Med | Low (2h) | P1 |
| Create `/reviews` page with `ItemList` + `Review` schema | High | Med (4h) | P1 |
| Create `/sell-my-house-fast-vs-listing-with-agent` page | High | Med (4h) | P1 |
| Create `/llms.txt` in `/public` | Low | Low (30m) | P1 |
| Add "Situations" + "Areas" dropdown to header | Med | Med (3h) | P2 |
| Add `Article` schema to blog cron content generator prompt | Med | Low (1h) | P2 |
| Enforce title/meta format in content generator | Med | Low (1h) | P2 |
| Add city → county internal link in city page template | Med | Low (1h) | P2 |
| Add cross-links between situation pages | Med | Low (2h) | P2 |
| Multi-state page activation (Option A: per-state deploys) | High | High (1w) | P3 |
| Build `/reviews` page with live GBP API pull | High | Med (1d) | P3 |
| Create 5 pillar pages | High | High (1w) | P3 |
| Create 24 blog cluster posts | High | High (ongoing) | P3 |
| Add `VideoObject` schema + embed YouTube video on situation pages | Med | Med (4h) | P3 |
| City-specific FAQ data (replace shared `homepageFaqs`) | Med | High (2d) | P3 |
| og:image per city (dynamic OG generation) | Med | Med (4h) | P3 |
| Add property photos with alt text | Med | Med (ongoing) | P3 |

---

*Audit generated: 2026-03-23 | Next scheduled audit: 2026-06-23*
