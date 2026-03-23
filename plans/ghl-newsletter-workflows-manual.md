# GHL Newsletter Workflows — Manual Setup Guide

GHL does not support workflow creation via API (returns 404). Build these manually
in the GHL dashboard at: https://app.gohighlevel.com/location/Jy8irfJWPVtq3vycsvx4

---

## Custom Fields to Create First

Go to: Settings → Custom Fields → Add Field

| Field Label | Internal Key | Type |
|-------------|-------------|------|
| Preferred State | preferred_state | Text |
| Newsletter Source | newsletter_source | Text |
| Newsletter Opted In | newsletter_opted_in | Text (yes/no) |
| Guide Downloaded | guide_downloaded | Text |
| Ready To Sell | ready_to_sell | Text (yes/no) |

---

## Workflow 1: HHB Newsletter Welcome

**Trigger:** Contact Tag Added → `hhb-newsletter`

**Steps:**

1. **Wait** — 0 minutes (immediate)
2. **Send Email**
   - Subject: `Welcome to the Helpful Home Buyers Market Update!`
   - From: `Jeff @ Helpful Home Buyers <jeff@helpfulhomebuyersusa.com>`
   - Body:
     ```
     Hey {{contact.first_name}},

     Thanks for signing up! Every Monday you'll get:
     - Local market updates for your area
     - Foreclosure law changes that affect homeowners
     - Tips for homeowners facing tough situations

     If your situation changes and you're ready to talk about selling,
     just reply to this email or call us at (703) 940-1159.

     - Jeff
     Helpful Home Buyers USA
     helpfulhomebuyersusa.com
     ```

3. **Wait** — 3 days
4. **Send Email**
   - Subject: `Did you know? Virginia's foreclosure process explained`
   - Body: Education email about foreclosure process in their state
   - Add link to myresolutionpath.com for homeowners wanting to keep their home

5. **Wait** — 7 days
6. **Send SMS**
   - Message: `Hi {{contact.first_name}} — Jeff from Helpful Home Buyers. Have questions about your home situation? Just reply here or call (703) 940-1159.`

---

## Workflow 2: Newsletter Engaged → Cash Offer Nurture

**Trigger:** Contact Tag Added → `newsletter-engaged`
(Add this tag manually to contacts who open 2+ emails or click a link)

**Steps:**

1. **Send SMS** (immediate)
   - Message: `Hi {{contact.first_name}}! I saw you've been reading our market updates — if you've been thinking about selling, I can get you a cash offer within 24 hours. Interested? Reply YES.`

2. **Wait** — 2 days
3. **If/Else** — Check if reply received
   - If replied → move to pipeline "New Lead"
   - If not replied → continue

4. **Send Email**
   - Subject: `What's your home actually worth right now?`
   - Body: Value add email with link to `/whats-my-house-worth`

5. **Wait** — 5 days
6. **Send Email**
   - Subject: `No pressure — but here's what a cash offer looks like`
   - Body: Case study / social proof + link to `/case-studies`

---

## Workflow 3: MRP Guide Download → 30-Day Nurture

**Trigger:** Contact Tag Added → `mrp-guide-downloaded`

**Steps:**

1. **Send Email** (immediate)
   - Subject: `Your free guide is ready`
   - Body: Deliver the guide download link (stored in GHL Media)

2. **Wait** — 2 days
3. **Send Email** — "Did you get a chance to read the guide?"

4. **Wait** — 5 days
5. **Send Email** — Education content (relevant to guide topic)

6. **Wait** — 7 days
7. **Send SMS** — Check-in SMS

8. **Wait** — 14 days
9. **Send Email** — "Still fighting foreclosure? Here are your options"
   - Include link to `helpfulhomebuyersusa.com` for selling option

10. **Wait** — 30 days
11. **Send Email** — Final nudge: "Ready to talk about selling?"

---

## Tags Reference

| Tag | When Applied | Purpose |
|-----|-------------|---------|
| `hhb-newsletter` | Newsletter signup | Trigger welcome sequence |
| `hhb-newsletter-virginia` | VA signups | State segmentation |
| `hhb-newsletter-texas` | TX signups | State segmentation |
| *(etc for all 15 states)* | | |
| `newsletter-engaged` | 2+ opens/clicks | Trigger cash offer nurture |
| `mrp-guide-downloaded` | Guide download | Trigger MRP nurture |
| `ready-to-sell` | Expressed interest | Move to active pipeline |
| `source-hhb-national` | National site signup | Attribution |
| `source-mrp` | MRP site signup | Attribution |

---

## Connecting Newsletter Signups to Workflows

The API route `/api/hhb-newsletter` already:
1. Saves subscriber to Supabase
2. Creates/updates GHL contact with tag `hhb-newsletter` + state-specific tag

Once you create Workflow 1 with trigger "Tag Added: hhb-newsletter",
it will fire automatically for every new signup.

---

## Priority Order

1. ✅ Create custom fields (5 minutes)
2. ✅ Create Workflow 1: Newsletter Welcome (15 minutes)
3. ✅ Create Workflow 3: MRP Guide Download (15 minutes)
4. Create Workflow 2: Engaged Nurture (15 minutes)

Total setup time: ~45 minutes in GHL dashboard.
