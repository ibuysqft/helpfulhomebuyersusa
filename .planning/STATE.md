# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-23)

**Core value:** Homeowners submit a lead — every contact mechanism must work.
**Current milestone:** v1.0 — HHB Website Launch Sprint

## Current Position

Phase: 1 (GHL Conversation AI)
Plan: Starting
Status: Executing — GHL Conversation AI agent running in background
Last activity: 2026-03-23 — Milestone v1.0 defined, execution starting

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 1 | Fix GHL Conversation AI Chatbot | ◆ In Progress — API endpoint not found via guessing; need network traffic interception |
| 2 | Fix Comp Puller Backend | ✓ DONE — Redfin 403 + schema change fixed, Census geocoder + CSV export |
| 3 | Infrastructure Fixes & Deploy | ✓ DONE — Redis whitespace fixed, deployed to production |
| 4 | Full Site Audit & Verification | ○ Pending Phase 1 completion |

## Bonus Work In Progress

- **Redfin subject property auto-lookup** — repo cloned at /tmp/comp-puller, NOT yet implemented. Next session: read analyzer/comps.py, add lookup_subject_property(), wire into main.py, update models.py, push + Render deploy.
- **Gmail app password** — NOT set up yet. Go to myaccount.google.com → Security → App Passwords, create one for "Claude Agents", add as GMAIL_APP_PASSWORD to ~/.hhb/credentials.env
- **GTM** — No containers exist. Must create: tagmanager.google.com → Create Account → "Helpful Homebuyers USA" → container helpfulhomebuyersusa.com → Web. Generates GTM-XXXXXXX.
- **Google Ads** — Not checked yet. Check ads.google.com for conversion tracking (AW-XXXXXXXXX/label).

## Accumulated Context

### Known Credentials & IDs
- GHL Location ID (HHB): Jy8irfJWPVtq3vycsvx4
- GHL Widget ID: 69c2116da7a7c096c95ca162
- Render comp-puller URL: https://helpful-homebuyers-comp-puller.onrender.com
- Render API key: rnd_cnelkc2ZT6l0fIEDC7s3O1e9izMW
- GitHub comp-puller repo: ibuysqft/comp-puller
- Upstash Redis token: whitespace issue in Vercel env vars

### Key Technical Facts
- GHL Conversation AI has NO public API — must use Playwright CDP to configure
- Comp puller backend /analyze-deal endpoint exists and is alive but Redfin scraping returns no results
- NEXT_PUBLIC_* vars are baked at build time — must verify with `vercel env ls` after setting
- Vercel 100 deploys/day limit can be hit — check before deploying

### What's Already Fixed (this session)
- Created app/api/comps/route.ts proxy route (fixes CORS + adds 90s timeout)
- Added cold-start warning to comps page
- Created GHL chat widget (widget ID 69c2116da7a7c096c95ca162)
- Updated layout.tsx to use NEXT_PUBLIC_GHL_WIDGET_ID
- Added RETELL_AGENT_OUTBOUND + RETELL_PHONE_FROM to Vercel

## Blockers

- Tracking pixels (TRACK-01/02/03): Need IDs from user — FB Pixel ID, GTM ID, Google Ads Conversion ID
- RentCast API (INT-01): Needs credit card at app.rentcast.io

---
*State initialized: 2026-03-23*
