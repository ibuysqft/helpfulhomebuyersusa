# Roadmap: HHB Website Launch Sprint v1.0

**Milestone:** v1.0 — HHB Website Launch Sprint
**Goal:** Every user-facing feature on helpfulhomebuyersusa.com works end-to-end: chatbot responds with AI, comp puller returns real data, all pages load, lead form submits.
**Requirements:** 8 total, all mapped
**Phases:** 4

---

## Phase 1: Fix GHL Conversation AI Chatbot

**Goal:** GHL chat widget on helpfulhomebuyersusa.com responds with AI, not human routing.

**Requirements:** CHAT-01, CHAT-02

**Success Criteria:**
1. Sending "I want to sell my house" in the chat widget gets an AI response (not "give us a minute")
2. AI chatbot asks for name, address, motivation — collecting lead info
3. Conversation creates/updates GHL contact automatically
4. Widget is visible and functional on all site pages

**How:** Configure GHL Conversation AI for location Jy8irfJWPVtq3vycsvx4 via Playwright (no public API exists). Enable AI bot on the chat widget, configure persona + lead collection prompts.

---

## Phase 2: Fix Comp Puller Backend

**Goal:** /comps page returns real comparable sales data for any valid US address.

**Requirements:** COMP-01, COMP-02

**Success Criteria:**
1. Entering "123 Main St, Richmond VA" in /comps returns at least 3 comps with price/sqft data
2. Backend /analyze-deal endpoint does not return 404 for real addresses
3. Results display correctly in the comps UI (table, ARV, offer range)
4. Cold-start behavior: page shows warning while loading, then displays results

**How:** Clone ibuysqft/comp-puller, read Redfin scraping code, identify failure point (likely headers/selectors changed), fix and redeploy to Render at helpful-homebuyers-comp-puller.onrender.com.

---

## Phase 3: Infrastructure Fixes & Deploy

**Goal:** All build warnings resolved, all fixes live on production Vercel.

**Requirements:** INFRA-01, INFRA-02

**Success Criteria:**
1. Vercel build log shows zero Upstash Redis whitespace warnings
2. helpfulhomebuyersusa.com production URL reflects all Phase 1 + 2 fixes
3. GHL widget ID (NEXT_PUBLIC_GHL_WIDGET_ID=69c2116da7a7c096c95ca162) confirmed in production
4. Retell outbound call env vars confirmed active

**How:** Fix UPSTASH_REDIS_REST_TOKEN in Vercel env (strip whitespace), push all code changes to GitHub, trigger Vercel production deploy, verify deployment logs.

---

## Phase 4: Full Site Audit & Verification

**Goal:** Every page on the site loads correctly and all user flows complete end-to-end.

**Requirements:** AUDIT-01, AUDIT-02

**Success Criteria:**
1. All routes (/, /about, /comps, /blog, /blog/[slug], /contact, /[state], /faq, /privacy, /terms) return 200
2. Main lead form on homepage submits and triggers GHL contact creation + Retell call
3. /comps form works end-to-end with a real address
4. GHL chat widget visible and responsive on homepage
5. No unhandled JS errors in browser console on any page
6. Mobile layout renders correctly (320px viewport)

**How:** Playwright agent crawls all known routes, screenshots each, reports errors. Fix any broken pages found. Manual spot-check of critical flows (lead form, comps, chatbot).

---

## Requirements Traceability

| Requirement | Phase | Description |
|-------------|-------|-------------|
| CHAT-01 | Phase 1 | GHL Conversation AI enabled for widget |
| CHAT-02 | Phase 1 | Bot handles sell-my-house intent |
| COMP-01 | Phase 2 | Backend returns real comps |
| COMP-02 | Phase 2 | /comps page works end-to-end |
| INFRA-01 | Phase 3 | Redis whitespace fixed |
| INFRA-02 | Phase 3 | All fixes deployed to production |
| AUDIT-01 | Phase 4 | All pages load without error |
| AUDIT-02 | Phase 4 | Lead form works end-to-end |

**Coverage:** 8/8 ✓

---
*Roadmap created: 2026-03-23*
