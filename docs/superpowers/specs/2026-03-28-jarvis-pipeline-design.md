# HHB Jarvis — Lead Pipeline & AI Assistant

**Date:** 2026-03-28
**Status:** Approved
**Location:** `/admin/pipeline` inside existing HHB Next.js app

---

## Overview

A custom deal pipeline dashboard and proactive AI assistant ("Jarvis") built into the HHB admin area. Replaces the need for third-party tools like ClickUp. GHL remains the source of truth for contact and communication history; Supabase owns pipeline state and tasks.

---

## Data Layer

### Supabase: `deals` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (v7) | Primary key |
| `ghl_contact_id` | text | GHL contact reference |
| `stage` | enum | `new`, `contacted`, `offer_sent`, `under_contract`, `closed`, `dead` |
| `deal_class` | enum | `residential`, `commercial` |
| `ai_flag` | boolean | True if AI needs human review |
| `ai_flag_reason` | enum | `technical_fail`, `hostile_recipient`, `off_script`, `null` |
| `address` | text | Property address |
| `seller_name` | text | |
| `seller_phone` | text | |
| `last_stage_change` | timestamptz | Used to detect stale deals |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto |

### Supabase: `deal_tasks` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (v7) | Primary key |
| `deal_id` | uuid | FK → deals |
| `title` | text | Task description |
| `due_date` | timestamptz | |
| `completed` | boolean | Default false |
| `created_at` | timestamptz | Auto |

---

## Lead Ingest

- GHL webhook → `POST /api/webhooks/ghl-lead`
- Creates a `deals` row at stage `new` automatically
- AI flag set by existing `/api/webhooks/ghl-reply` or a new GHL workflow trigger
- AI flag reason parsed from GHL conversation outcome field

---

## Pipeline UI (`/admin/pipeline`)

### Kanban Board

5 stages displayed as columns:
1. **New** — auto-populated from GHL
2. **Contacted** — first human or AI contact made
3. **Offer Sent** — written offer delivered
4. **Under Contract** — accepted offer
5. **Closed / Dead** — terminal states (toggle to show/hide dead)

### Deal Cards

Each card displays:
- Property address
- Deal class badge: `RES` (blue) or `COMM` (orange)
- AI flag badge: `⚠ AI Review` with reason tooltip
- Aging color: neutral (0–2 days), amber border (3–6 days), red border (7+ days)
- Overdue task count: `⚠ 2 tasks` in red, green dot if all clear
- Next task due date
- One-click actions on card surface: **Mark Contacted**, **Log Call**, **Snooze 1 day**

### Hot Strip

Pinned bar above kanban. Always visible. Shows:
- Overdue tasks (count + deal name)
- AI-flagged leads
- Deals stale 7+ days

### Deal Drawer

Click any card → slide-out drawer (right side):
- Full lead detail (address, seller info, GHL link)
- Task list with add/complete/delete
- Stage selector
- AI flag controls (set reason, clear flag)
- Notes field

### Snooze

Each card has a snooze button. Hides the card from the hot strip until next day. Does not change stage.

---

## Jarvis AI Assistant

### Interface

Persistent panel in the `/admin` layout (collapsible sidebar or bottom drawer). Available on all admin pages, not just pipeline.

**Input:** Text field + push-to-talk mic button (Web Speech API for STT)
**Output:** Text response + ElevenLabs TTS (Jarvis-style voice)

### Morning Briefing

On first load each day, Jarvis proactively opens with a prioritized briefing:

> *"Good morning Jeff — you have 4 active deals. 123 Main St has been in Contacted for 5 days and has 1 overdue task. The Compton deal has an AI flag: hostile recipient. I recommend starting with Main St. Want me to pull it up?"*

### Tool Calling

Jarvis has access to the following tools:

**Pipeline Management**

| Tool | Description |
|------|-------------|
| `get_pipeline_summary` | Returns all active deals with urgency scores |
| `move_deal_stage` | Moves a deal to a new stage |
| `create_task` | Creates a follow-up task on a deal |
| `complete_task` | Marks a task done |
| `snooze_deal` | Hides deal from hot strip until tomorrow |
| `flag_deal` | Sets or clears AI flag + reason |
| `get_deal_detail` | Returns full deal info |
| `send_sms_reminder` | Queues an SMS nudge to Jeff via GHL |
| `query_deals` | Natural language deal search (by address, stage, class, flag) |

**Deal Analysis Engine**

| Tool | Description |
|------|-------------|
| `analyze_deal` | Master tool — runs full analysis pipeline for an address |
| `pull_comps` | Fetches sold comps via DealMachine scraper for the subject property |
| `rate_condition` | Uses Claude Vision to analyze listing photos → returns C1–C6 Fannie Mae rating |
| `estimate_repairs` | Calculates repair cost from condition rating × sqft |
| `calculate_offers` | Returns wholesale offer (ARV × 70% − repairs), MLS retail estimate, and MAO |
| `find_cash_buyers` | Pulls DealMachine cash buyers in zip, purchased last 12 months, scored by purchase price / ARV ratio |
| `score_deal_viability` | Returns go/no-go recommendation based on condition rating and seller desperation signals |

### Deal Analysis Workflow

Triggered by: *"Jarvis, analyze 117 S 9th St, Suffolk VA"*

1. **Pull comps** via DealMachine scraper → calculate ARV
2. **Fetch listing photos** → Claude Vision rates condition C1–C6
3. **Estimate repairs** = condition tier × sqft:
   - C1 (excellent): $0/sqft
   - C2 (good): $5/sqft
   - C3 (average): $12/sqft
   - C4 (fair): $22/sqft
   - C5 (poor): $35/sqft — **default if no photos available**
   - C6 (distressed): $55/sqft
4. **Calculate numbers:**
   - Wholesale offer = ARV × 70% − repairs
   - MLS retail estimate = ARV × 95% (market-ready assumption)
   - MAO (max allowable offer) = ARV × 65% − repairs (conservative floor)
5. **Viability check:**
   - C1–C3 → skip unless desperation signals detected in GHL conversation
   - C4–C6 → viable, proceed with offer
6. **Find cash buyers** → DealMachine: zip code, last 12 months, scored by `purchase_price / arv` descending. Top 5 returned with contact info.
   - **Fix & flip bonus scoring:** If buyer purchased distressed + resold within 12 months at a higher price, they are classified as a fix-and-flipper and ranked higher — these buyers understand rehab value and pay closest to ARV on wholesale deals.
7. **Jarvis delivers report** (voice + text):
   > *"117 S 9th St — ARV $210k, condition C5, estimated repairs $42k. Wholesale offer: $105k, MAO: $94k, MLS retail: $199k. I found 4 cash buyers in the 23434 zip — top buyer paid 82 cents on the dollar last quarter. Want me to add this to the pipeline and draft outreach to the top 3 buyers?"*

### Supabase: `deal_analysis` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (v7) | Primary key |
| `deal_id` | uuid | FK → deals (nullable — can analyze before deal exists) |
| `address` | text | |
| `arv` | numeric | Calculated from comps |
| `condition_rating` | enum | `c1`–`c6` |
| `condition_source` | enum | `vision`, `assumed` |
| `sqft` | integer | |
| `repair_estimate` | numeric | condition tier × sqft |
| `wholesale_offer` | numeric | ARV × 70% − repairs |
| `mls_retail_estimate` | numeric | ARV × 95% |
| `mao` | numeric | ARV × 65% − repairs |
| `viability` | enum | `viable`, `skip`, `watch` |
| `cash_buyers` | jsonb | Top scored buyers from DealMachine (includes flipper classification + resale data) |
| `comps_raw` | jsonb | Raw comps data |
| `created_at` | timestamptz | Auto |

### Example Interactions

- *"Jarvis, analyze 117 S 9th St, Suffolk VA — pull comps, give me the wholesale offer and find cash buyers"*
- *"Jarvis, move 123 Main St to Offer Sent and remind me Friday at 10am"*
- *"Which residential deals have been sitting longest?"*
- *"Flag the Compton deal as hostile and snooze it 3 days"*
- *"Give me a rundown of everything under contract"*
- *"Who are the best cash buyers in zip 23434 from the last year?"*

### AI Model

Claude via AI Gateway (`anthropic/claude-sonnet-4-6`). System prompt includes full pipeline context on each request (injected server-side). Tool calls execute against Supabase directly from the API route.

---

## SMS Nudges

Rule-based outbound SMS sent to Jeff via GHL SMS. Triggers:

| Trigger | Message |
|---------|---------|
| Deal stale 5+ days | *"Hey — [address] has been in [stage] for [N] days. Worth a follow-up?"* |
| Task overdue 24hrs | *"You have an overdue task on [address]: [task title]"* |
| AI flag raised | *"AI flagged [address]: [reason]. Needs your eyes."* |
| New lead arrives | *"New lead: [name] at [address] just hit your pipeline."* |

SMS sent via existing GHL outbound API. Cron job runs every hour checking for triggers (`/api/cron/nudge-check`). Deduplicated — same trigger doesn't fire twice in 24hrs.

---

## Extensibility Notes (Solo → Team)

The schema and UI are designed to support team assignment later without a rewrite:
- `deals` table has a nullable `assigned_to` column (add when ready)
- Cards can show an avatar when assigned
- Jarvis tool calling can filter by assignee
- GHL contact owner sync can be wired in as a future phase

---

## Out of Scope (Phase 1)

- Wake word / always-on voice
- Mobile app
- ClickUp / external tool sync
- Reporting / analytics dashboard
- Email notifications (SMS only)
- Commercial-specific pipeline stages (same pipeline for both classes in v1)
