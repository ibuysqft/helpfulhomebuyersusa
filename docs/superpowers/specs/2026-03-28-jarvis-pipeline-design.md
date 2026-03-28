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

### Example Interactions

- *"Jarvis, move 123 Main St to Offer Sent and remind me Friday at 10am"*
- *"Which residential deals have been sitting longest?"*
- *"Flag the Compton deal as hostile and snooze it 3 days"*
- *"Give me a rundown of everything under contract"*

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
