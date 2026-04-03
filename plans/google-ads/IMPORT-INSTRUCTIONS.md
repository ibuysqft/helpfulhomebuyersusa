# Google Ads Campaign Import Instructions

## Account
- Email: anchor.offer.chatgpt@gmail.com
- Customer ID: 962-103-4521

## Files to Import
1. `campaigns-upload.csv` — All 3 campaigns, 6 ad groups, keywords, RSA ads
2. `negative-keywords.csv` — 4 shared negative keyword lists

---

## Step 1: Download Google Ads Editor
https://ads.google.com/intl/en_us/home/tools/ads-editor/

## Step 2: Link the Account
1. Open Google Ads Editor → **File → Add Account**
2. Sign in with anchor.offer.chatgpt@gmail.com
3. Enter Customer ID: **962-103-4521**
4. Download the account (select all campaigns)

## Step 3: Import Campaigns

1. In Google Ads Editor → **File → Import → Import CSV...**
2. Select `campaigns-upload.csv`
3. Click **Process**
4. Review the import summary — verify:
   - 3 campaigns created
   - 6 ad groups created
   - 6 RSA ads created
   - 42 keywords created
5. Fix any mapping errors (usually match type capitalization)
6. Click **Keep**

## Step 4: Import Negative Keywords

1. **Tools → Manage Shared Libraries → Negative Keyword Lists**
2. Click **+ New list** and create 4 lists:
   - HHB - Informational & DIY
   - HHB - Job Seekers
   - HHB - Buyers & Renters
   - HHB - Free Intent
3. OR import via: **File → Import → Import CSV...** with `negative-keywords.csv`

## Step 5: Apply Negative Lists to All 3 Campaigns
1. Select all 3 campaigns
2. **Edit → Campaign Negative Keywords → Apply Shared List**
3. Apply all 4 lists

## Step 6: Configure Sitelink Extensions (per campaign)

For all 3 campaigns, add these sitelinks:
| Text | Final URL |
|------|-----------|
| Get a Cash Offer | /property-information |
| How It Works | /#how-it-works |
| Our Reviews | /reviews |
| About Us | /about |

## Step 7: Add Callout Extensions (per campaign)
- No Repairs Required
- Close in 14 Days
- No Agent Fees
- We Pay Closing Costs
- Any Condition Accepted
- Fair Cash Offer Guaranteed

## Step 8: Set Geo Targets in Editor
| Campaign | Locations |
|----------|-----------|
| HHB - Inherited & Estate | Virginia + Maryland + Washington DC + Pennsylvania + New York + Florida |
| HHB - Distressed Property | Northern Virginia + Richmond + Hampton Roads |
| HHB - Senior Transition | Northern Virginia + Richmond |

**IMPORTANT:** Set all geo targets to **"People in or regularly in"** (Presence), NOT "Presence or interest." Check:
- Campaign Settings → Locations → Location options → **Presence**

## Step 9: Verify Bid Strategy
- All 3 campaigns: **Maximize Conversions**
- Once each campaign has 30+ conversions in 30 days, switch to **Target CPA = $100**

## Step 10: Post to Google Ads

1. Click **Post** in Google Ads Editor
2. Confirm all changes
3. Wait for ads to go into review (usually 1-2 hours)

## Step 11: Set Up Conversion Tracking

Conversion ID already configured: **AW-17947613888**

Verify the conversion action is firing on `/thank-you` page by checking:
- Google Ads → Tools → Conversions
- Should see "Lead Form Submission" with status "Recording conversions"

---

## Budget Summary
| Campaign | Daily | Monthly |
|----------|-------|---------|
| HHB - Inherited & Estate | $53.33 | $1,600 |
| HHB - Distressed Property | $46.67 | $1,400 |
| HHB - Senior Transition | $33.33 | $1,000 |
| **Total** | **$133.33** | **$4,000** |

---

## First 2-Week Check (Flywheel Audit #1)
After 14 days, run the automated audit (see `/.github/workflows/google-ads-audit.yml`).
Watch for:
- Any ad group with 0 impressions → check match types + geo
- Search terms with irrelevant queries → add to negatives
- Quality Score < 5 → tighten headline/landing page match
