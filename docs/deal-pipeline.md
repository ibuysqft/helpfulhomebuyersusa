# HHB Deal Finding Pipeline

## What It Does
Automatically scrapes on-market distressed listings from DealSauce every night, scores them with AI, and sends outreach to listing agents via GHL — fully automated.

---

## Pipeline Flow

```
DealSauce (Playwright scraper)
  ↓  2:00 AM nightly cron
mls_leads table (status: new)
  ↓  3:00 AM nightly cron
Claude Vision scores photos 1–10
  + Comp validator checks ARV
  → score < 4  → status: retail     (skip, not worth it)
  → score 4–5  → status: scored     (hold, not queued yet)
  → score 6+   → status: queued     (ready for outreach)
  → no comps   → status: needs_review (manual check)
  ↓  3:30 AM nightly cron
GHL contact created + workflow enrolled
  → status: contacted
  → logged to outreach_log
  ↓  (human responds)
GHL webhook fires
  → status: warm_cash or warm_creative
```

---

## Admin Pages

| URL | What It Does |
|-----|-------------|
| `/admin/mls` | **Main dashboard** — status counts, full leads table, run pipeline steps manually |
| `/admin/scrape-targets` | Configure which counties/cities/states to scrape + filters |

---

## Lead Statuses

| Status | Meaning |
|--------|---------|
| `new` | Just scraped, not yet scored |
| `scored` | Scored 4–5 distress, holding |
| `queued` | Scored 6+, ready to contact |
| `contacted` | Outreach sent via GHL |
| `warm_cash` | Agent replied, cash deal possible |
| `warm_creative` | Agent replied, creative finance possible |
| `needs_review` | Scored well but comps failed — check manually |
| `retail` | Score < 4, not a deal |
| `dead` | Fell through |
| `disqualified` | Photos not found / bad data |

---

## Distress Score (1–10)

Claude Vision analyzes Redfin photos across 6 categories:
- Kitchen, Bathrooms, Flooring, Ceilings/Walls, Exterior/Roof, Structural

**Score guide:**
- 8–10 → Heavy distress → `creative` financing strategy
- 6–7  → Moderate distress → `cash` offer strategy
- 4–5  → Light distress → `scored` (held, not sent)
- 1–3  → Retail condition → skipped

---

## Scrape Targets

Targets are saved in the `scrape_targets` Supabase table.

**Types:** `county`, `city`, `zip`, `state`

Each target can have JSONB filters stored:
- Lead types, property types, price range, beds/baths/sqft
- Mortgage filters (LTV, equity, loan balance)
- Ownership filters (years owned, last sale)
- Foreclosure notices

**Self-healing:** If 0 results are returned, the scraper screenshots the page, dumps HTML, and runs Claude Code CLI to auto-patch `scripts/dealsauce-selectors.json`.

---

## Daily Send Budget

Warm-up schedule (days since first send):
- Days 0–13 → 20 emails/day, 10 SMS/day
- Days 14–27 → 40 emails/day, 20 SMS/day
- Days 28+ → 80 emails/day, 40 SMS/day

Managed via `daily_send_budget` table. Can pause/resume and override limits from `/admin/mls`.

---

## GHL Workflows

| Workflow | Strategy | Env Var |
|----------|----------|---------|
| Cash offer outreach | `cash` | `GHL_OM_CASH_WORKFLOW_ID` |
| Creative finance outreach | `creative` | `GHL_OM_CREATIVE_WORKFLOW_ID` |

Agent contact created with tags: `mls-outreach`, `heavy-distress` or `moderate-distress`

---

## Key Files

| File | Purpose |
|------|---------|
| `scripts/scrape-dealsauce.ts` | Playwright scraper — runs on Render |
| `scripts/dealsauce-selectors.json` | CSS selectors (auto-patched by Claude on failure) |
| `app/api/cron/mls-scrape/route.ts` | Cron: calls scraper, dedupes, inserts leads |
| `app/api/cron/mls-score/route.ts` | Cron: Claude Vision scoring + comp validation |
| `app/api/cron/mls-outreach/route.ts` | Cron: GHL contact + workflow enrollment |
| `lib/photo-scorer.ts` | Claude Vision photo distress analysis |
| `lib/comp-validator.ts` | ARV validation via Render comp-puller |
| `lib/ghl-on-market.ts` | GHL contact creation + sequence enrollment |
| `lib/mls-rate-limiter.ts` | Daily send budget management |
| `lib/mls-types.ts` | All TypeScript types for the pipeline |

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `mls_leads` | All scraped leads + scoring + offer data |
| `scrape_targets` | Saved locations + per-target filters |
| `outreach_log` | Every email/SMS sent (lead_id, GHL contact, workflow) |
| `daily_send_budget` | Per-day send limits and counters |

---

## Environment Variables Required

```
NEXT_PUBLIC_IS_NATIONAL=true          # Master kill switch — pipeline disabled if missing
DEALSAUCE_SCRAPER_URL=               # Render service URL for scraper
DEALSAUCE_SCRAPER_SECRET=            # Shared secret for scraper auth
ANTHROPIC_API_KEY=                   # Claude Vision for photo scoring
CRON_SECRET=                         # Vercel cron authorization header
GHL_OM_API_KEY=                      # GHL API key (Helpful Home Buyers USA location)
GHL_OM_LOCATION_ID=                  # GHL location ID
GHL_OM_CASH_WORKFLOW_ID=             # GHL workflow for cash offer outreach
GHL_OM_CREATIVE_WORKFLOW_ID=         # GHL workflow for creative finance outreach
NEXT_PUBLIC_SUPABASE_URL=            # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=           # Supabase service role key (server-side only)
NEXT_PUBLIC_SITE_URL=                # App URL (for admin manual-run buttons)
```

All currently set in Vercel production. ✓

---

## Cron Schedule (vercel.json)

| Time | Route | Job |
|------|-------|-----|
| 2:00 AM | `/api/cron/mls-scrape` | Scrape DealSauce |
| 3:00 AM | `/api/cron/mls-score` | Score leads with Claude Vision |
| 3:30 AM | `/api/cron/mls-outreach` | Send outreach via GHL |

---

## Manual Run (from Admin)

1. Go to `/admin/scrape-targets` — set filters, hit **▶ Run Now**
2. Go to `/admin/mls` — use **Step 1/2/3 buttons** to run each phase manually
3. Force-send a specific lead: `POST /api/cron/mls-outreach?leadId=<uuid>` with `Authorization: Bearer <CRON_SECRET>`
