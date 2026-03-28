# HHB On Market — MLS Offer Pipeline Design

**Date:** 2026-03-28
**Status:** Approved
**Project:** helpfulhomebuyersusa

---

## Overview

A fully automated MLS deal pipeline that finds distressed on-market listings, validates deals with comps and AI photo analysis, and sends personalized outreach to listing agents via a separate GHL sub-account ("HHB On Market"). Jeff only sees warm agent responses. Includes a public agent submission portal for inbound deal flow.

---

## System Components

### 1. Data Sources

**A. DealSauce Playwright Scraper**
- Playwright logs into `app.dealsauce.io` (anchor.offer.chatgpt@gmail.com / Password!1) nightly
- Scrapes "My Leads" filtered by target counties (Fairfax, Henrico, Richmond, Prince William)
- Extracts per property: MLS#, address, list price, beds/baths/sqft, agent name, agent email, agent phone, DealSauce wholesale value, description text
- Deduplicates by MLS# in Supabase before inserting
- Runs as Vercel Cron or Render.com scheduled job

**B. Agent Submission Portal (`/submit-listing`)**
- Public-facing 2-step wizard on helpfulhomebuyersusa.com
- Step 1: Property details (address, list price, beds, baths, sqft, condition)
- Step 2: Agent contact info (name, email, phone) + TCPA/A2P consent checkbox
- Submits to same `mls_leads` Supabase table as scraper
- Agent receives confirmation email immediately via GHL

---

### 2. Photo Analysis Engine

**Source:** Redfin listing photos pulled by MLS# via Playwright or Redfin URL pattern

**Model:** Claude claude-sonnet-4-6 Vision — analyzes all listing photos per property

**Distress signals detected (scored 0–10):**
| Category | Max Points | Signals |
|---|---|---|
| Kitchen | 2 | Oak/laminate cabinets, dated appliances, drop ceiling, old tile |
| Bathrooms | 2 | Harvest gold/pink fixtures, vintage tile, water stains |
| Flooring | 1 | Carpet throughout, stained hardwood, damaged tile |
| Ceilings/Walls | 1 | Popcorn ceilings, wood paneling, wallpaper, water damage |
| Exterior/Roof | 2 | Aging shingles, peeling paint, rotted wood, overgrown yard |
| Structural | 2 | Visible cracks, sagging floors, boarded windows |

**Score → Action:**
| Score | Label | Action |
|---|---|---|
| 8–10 | Heavy distress | Priority queue. Bot leads with "problem property" cash angle |
| 6–7 | Moderate | Standard queue. Bot angles toward seller financing |
| 4–5 | Light | Buffer pool. Contacted only if daily quota not filled by ≥6 leads |
| 1–3 | Retail | Auto-disqualified. Never contacted. Saved as "retail" in Supabase |

**Repair estimate output:** rough dollar ranges per category (kitchen, baths, flooring, ceilings, exterior) injected into bot outreach copy to signal Jeff is an informed buyer.

---

### 3. Deal Scorer

Filters leads after photo analysis. A lead proceeds to comp validation only if:
- Distress score ≥ 6
- DealSauce wholesale value exists
- Agent contact info (email or phone) is present
- MLS# not already in `outreach_log`

Additional keyword boost (raises priority): "as-is", "motivated", "price reduced", "estate sale", "probate", "fixer", "investor special", "needs TLC", "sold as-is"

---

### 4. Comp Validator

Calls existing comp-puller microservice: `https://helpful-homebuyers-comp-puller.onrender.com/analyze-deal`

**Input:** `{ address, subject_sqft, condition }` where condition maps from distress score: score 8–10 → `"poor"`, score 6–7 → `"fair"`, score 4–5 → `"good"`
**Output:** ARV, median PPSF, comparable sales

**Offer calculation:**
```
compARV = comp-puller ARV
dealSauceARV = DealSauce wholesale value
anchorARV = min(compARV, dealSauceARV)   // always use lower
repairMid = midpoint of photo repair estimate
maxOffer = (anchorARV - repairMid) × 0.90
```

If divergence between compARV and dealSauceARV > 15%: flag in Supabase for audit but still proceed with lower value (do not hold for manual review — stays automated).

---

### 5. GHL Rate Limiter

Tracks daily send count in Supabase `daily_send_budget` table.

**Warmup schedule:**
| Period | Email/day | SMS/day |
|---|---|---|
| Week 1–2 | 20 | 10 |
| Week 3–4 | 40 | 20 |
| Month 2 | 80 | 40 |
| Month 3+ | 80–90% of GHL limit | 80–90% of GHL limit |

**Safety rules:**
- Auto-pause if email bounce rate > 5%
- Auto-pause if spam complaints spike > 0.1%
- Agent submissions prioritized over scraped leads in daily queue
- Score 8–10 leads prioritized over score 6–7 in daily queue

---

### 6. GHL Outreach — HHB On Market Sub-Account

**Sub-account name:** HHB On Market
**Separate from:** Helpful Home Buyers USA (main — off-market/motivated sellers)
**A2P registration:** New, separate from main account
**Phone numbers:** New dedicated numbers
**Sending domain:** New subdomain (e.g., outreach@hhbonmarket.com or similar)

**Bot persona:** "Alex from Helpful Home Buyers" — professional, direct, never pushy. Discloses AI nature if directly asked.

**Sequence structure:**

*Opening (Day 1 email + Day 2 SMS):*
> Hi [Agent First Name], I'm reaching out about [Address] — I'm an investor actively buying in [County] right now. I ran comps on the area — [N] comparable sales in [zip] put ARV around $[ARV]. I can offer $[maxOffer] cash, close in 14 days, no financing contingency, no appraisal, as-is. Your commission is fully protected — we pay buyer-side in full. Worth a quick conversation to see if the numbers work for your seller?

*Follow-up (Day 5 email):*
> Just circling back on [Address] — wanted to make sure this didn't get buried. We're actively deploying capital in [County] this month. Happy to send a formal offer letter today if there's any interest.

*Breakup (Day 10 email):*
> Last reach-out on [Address] — if the timing isn't right or you have a better offer, no worries at all. We close 3–5 deals/month in this area. If you get a new listing that's a better fit for a cash buyer, I'd love to be your first call. Your commission is always protected and we always close.

---

### 7. Offer Escalation Ladder

**Step 1 — Cash Anchor**
All outreach opens with cash offer. Bot monitors replies.

**Step 2 — Auto-escalation to Creative Terms**
Any agent reply sets status to `contacted_replied`. Positive keywords set status to `warm_cash`. Negative-but-open keywords trigger escalation to creative terms. Hard-negative keywords (`"not interested"`, `"remove me"`, `"stop"`) set status to `dead`. Triggered when GHL Conversational AI detects these keywords in agent reply:
`"too low"`, `"need more"`, `"seller wants"`, `"can you do"`, `"best price"`, `"won't work"`, `"asking price"`, `"full price"`

Escalation message:
> Totally fair — cash offers do come in below list. Let me offer an alternative that might work better: seller financing. Your seller gets closer to asking price, we structure monthly payments. Many sellers prefer this for the income stream and potential tax benefits. Worth 10 minutes to explore the numbers?

Creative terms available: Seller Financing, Subject-To, Novation, Lease Option.

**Step 3 — Dead / Re-engagement**
No response or hard no → marked dead in Supabase → added to 90-day re-engagement drip:
> "Is [Address] still available? We're actively buying in [County] again this quarter."

---

### 8. Objection Handler Scripts (Bot Trained)

| Objection | Response |
|---|---|
| "We already have offers" | "That's great for your seller — competition is healthy. The difference with us is certainty: no financing, no inspection contingency, no appraisal. Sometimes the highest offer isn't the one that closes. Happy to put something in writing today as a backup." |
| "Seller wants full price" | "Understood — that's where seller financing can actually get them there. Full price, structured payments. Worth a 10-minute call?" |
| "Show proof of funds" | "Of course — I'll send a POF letter today. What email? I'll also include a recent settlement statement so you can see we actually close." |
| "How'd you get my info?" | "The listing is public record — I research active listings in [County] to find deals. I reach out to listing agents directly because you know the property best. I'll keep it brief." |
| "Not interested" | "No problem at all. If anything changes or you get a new listing that's a better fit for a cash buyer, I'd love to hear from you. We close quickly and your commission is always protected." |

---

### 9. Warm Lead Dashboard (`/mls-offers`)

Internal route — protected via Next.js middleware checking a `ADMIN_SECRET` cookie set at `/api/admin-login` with a hardcoded passphrase stored in env. No external auth dependency.

Displays **only** leads with status `warm` (agent replied positively to either cash or creative terms pitch).

Each warm lead card shows:
- Address, list price, distress score, offer type (CASH or CREATIVE flag)
- Agent name, phone, email
- Repair estimate range
- maxOffer calculated
- Agent's response thread excerpt
- Actions: Schedule call, Send formal offer, Mark dead

Jeff notified via GHL SMS when a new warm lead appears.

---

## Database Schema (Supabase)

**`mls_leads`**
```
id, mls_number, address, list_price, beds, baths, sqft,
agent_name, agent_email, agent_phone,
dealsauce_wholesale, comp_arv, max_offer, repair_estimate_low, repair_estimate_high,
distress_score, distress_signals (jsonb), photo_count,
description_keywords (text[]),
source (dealsauce | agent_submission),
status (new | scored | queued | contacted | warm_cash | warm_creative | dead | retail | disqualified),
offer_strategy (cash | creative),
created_at, contacted_at, responded_at, warm_at
```

**`outreach_log`**
```
id, lead_id, channel (email | sms), sent_at, ghl_contact_id, sequence_id, message_preview
```

**`daily_send_budget`**
```
date, email_sent, sms_sent, email_limit, sms_limit, paused (bool), pause_reason
```

---

## Influence Psychology — Built Into Every Message

| Lever | Application |
|---|---|
| **Certainty** | "No financing contingency. No appraisal. We close." |
| **Commission protection** | "Your commission is fully protected — we pay buyer-side in full." |
| **Authority** | Real comp data in opening: "Based on [N] comparable sales in [zip]…" |
| **Social proof** | "We close 3–5 deals/month in this county." |
| **Future relationship** | "Agents we work with get first call on future buys." |
| **Scarcity** | "We're actively deploying capital in [County] right now." |

---

## File Structure (New Files)

```
app/
  submit-listing/
    page.tsx               # Public agent portal (2-step wizard)
    SubmitListingClient.tsx
  mls-offers/
    page.tsx               # Jeff's warm leads dashboard (protected)
    MlsOffersClient.tsx
  api/
    mls-leads/
      route.ts             # POST: receive agent submissions
    mls-score/
      route.ts             # POST: trigger photo analysis + deal scoring
    mls-outreach/
      route.ts             # POST: GHL contact create + sequence enroll
    webhooks/
      ghl-reply/
        route.ts           # GHL reply webhook → warm lead detection

scripts/
  scrape-dealsauce.ts      # Playwright DealSauce scraper
  score-photos.ts          # Claude Vision photo analysis
  run-comp-validation.ts   # Comp-puller batch runner
  ghl-outreach-queue.ts    # Rate-limited GHL sender

vercel.json                # Cron jobs for scraper + outreach queue
```

---

## GHL Sub-Account Setup Steps

1. Create new sub-account: "HHB On Market" in GHL agency
2. Register new A2P campaign (separate from main HHB USA)
3. Provision new local phone numbers for SMS
4. Set up new sending domain for email
5. Create Conversational AI bot with "Alex" persona + all objection scripts
6. Build email + SMS sequences (cash anchor + creative escalation)
7. Configure reply webhook → `POST /api/webhooks/ghl-reply`
8. Set keyword triggers for creative financing escalation

---

## Out of Scope

- Commercial properties (can be added as a future phase — same pipeline, different keyword set and cap rate scoring)
- Automatic offer letter generation (Jeff handles after warm lead surfaces)
- MLS data direct API (Redfin scrape is sufficient; no MLS API access needed)
