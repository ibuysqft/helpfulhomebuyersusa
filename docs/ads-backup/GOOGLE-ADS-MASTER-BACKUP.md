# Google Ads Master Backup — Helpful Home Buyers USA
**Account ID:** 962-103-4521
**Account Email:** anchor.offer.chatgpt@gmail.com
**MCC:** Bolt Deals MCC (629-578-9660), linked 2026-02-17
**Conversion Tracking ID:** AW-17947613888
**Last Updated:** 2026-03-24

> This document is the single source of truth for the Google Ads account.
> If the 3rd party manager removes or breaks anything, use this to rebuild.
> Rebuild time estimate: 2-3 hours for full restore.

---

## ACCOUNT STRUCTURE OVERVIEW

```
Account: 962-103-4521
├── Campaign: HHB-Search-Brand ($25/day)
│   └── Ad Group: Brand
├── Campaign: HHB-Search-CashBuyer-National (main, $300/day)
│   ├── Ad Group: Cash For House        ← best performer, $92/conv, 47% CVR
│   ├── Ad Group: We Buy Houses
│   ├── Ad Group: Sell House
│   ├── Ad Group: As Is
│   ├── Ad Group: Companies That Buy Houses
│   ├── Ad Group: Need or Want To Sell House
│   ├── Ad Group: Foreclosure           ← new, added 2026-03-24
│   ├── Ad Group: Probate and Inherited ← new, added 2026-03-24
│   ├── Ad Group: Divorce               ← new, added 2026-03-24
│   ├── Ad Group: Tired Landlord        ← new, added 2026-03-24
│   └── Ad Group: Damaged Property      ← new, added 2026-03-24
└── Shared Negative Lists (applied to all campaigns)
    ├── Retail Listing Intent
    ├── Listing Platforms
    ├── Buyer and Renter Intent
    └── Research and Informational
```

---

## CAMPAIGN SETTINGS

### Campaign 1: HHB-Search-Brand
| Setting | Value |
|---|---|
| Type | Search |
| Budget | $25/day |
| Bidding | Target Impression Share — 90% top of page |
| Network | Google Search only (no Display, no Search Partners) |
| Location | [Same as main campaign — investor's buying markets] |
| Languages | English |
| Purpose | Capture branded traffic, protect from competitors |

### Campaign 2: HHB-Search-CashBuyer-National (Main)
| Setting | Value |
|---|---|
| Type | Search |
| Budget | $300/day |
| Bidding | Maximize Conversions (switched from tCPA $180.35 on 2026-03-24) |
| Network | Google Search only |
| Location type | Presence: People in or regularly in targeted locations (NOT "Presence or interest") |
| Languages | English |
| Auto-apply | OFF — all categories disabled |

---

## CONVERSION ACTIONS

### Action 1: Contact Form Submit
| Field | Value |
|---|---|
| Type | Website action |
| Tracking ID | AW-17947613888 |
| Trigger | Form submission on helpfulhomebuyersusa.com |
| Count | One per click |
| Window | 30 days |
| Priority | Secondary |
| Attribution | Data-driven (or Linear) |

### Action 2: Calls From Ads
| Field | Value |
|---|---|
| Type | Calls from ads (call extension) |
| Minimum call length | 60 seconds |
| Window | 7 days |
| Priority | Primary |

### Action 3: Website Phone Calls
| Field | Value |
|---|---|
| Type | Calls to phone number on website (Google forwarding number) |
| Minimum call length | 60 seconds |
| Window | 7 days |
| Priority | Primary |

> NOTE: Enhanced Conversions must be active and passing email + phone hash on form submit.
> Tag: GTM-KFX3DMBX. Verify at tagmanager.google.com if broken.

---

## AD EXTENSIONS (ASSETS)

### Call Extension
- Phone: [business phone number — use Google forwarding number from conversion setup]
- Call reporting: On
- Schedule: All hours (or business hours if set)

### Callout Extensions (6)
1. No Repairs Needed
2. Close in 7 Days
3. Any Condition
4. Cash Offer in 24 Hours
5. No Agent Fees
6. We Cover Closing Costs

### Sitelinks (3)
| Text | Description 1 | Description 2 | URL |
|---|---|---|---|
| How It Works | Simple 3-step process | No obligation, no fees | https://helpfulhomebuyersusa.com/how-it-works |
| Get a Cash Offer | Offer in 24 hours | Any condition, any situation | https://helpfulhomebuyersusa.com/sell |
| We Buy As-Is | No repairs, no cleanup | Close on your timeline | https://helpfulhomebuyersusa.com/sell |

---

## NEGATIVE KEYWORD LISTS

### List 1: Retail Listing Intent
Apply as: Exact Match [brackets] unless noted

```
[realtor]
[real estate agent]
[find a realtor]
[listing agent]
[list my house]
[list my home]
[for sale by owner]
[fsbo]
[flat fee mls]
"how to sell my house"
"open house"
"home staging"
"real estate commission"
"sell my house myself"
"hire an agent"
"find an agent"
"mls listing"
"multiple listing service"
"professional photography real estate"
```

### List 2: Listing Platforms
Apply as: Exact Match

```
[zillow]
[redfin]
[trulia]
[realtor.com]
[opendoor]
[offerpad]
[homevestors]
[compass real estate]
[coldwell banker]
[keller williams]
[remax]
[century 21]
[re/max]
```

### List 3: Buyer and Renter Intent
Apply as: Phrase Match "quotes"

```
"buy a house"
"buying a home"
"homes for sale"
"houses for sale"
"first time buyer"
"first time homebuyer"
"mortgage rates"
"home loan"
"refinance"
"rent to own"
"apartments for rent"
"find a home"
"new homes"
"new construction"
"home buying tips"
```

### List 4: Research and Informational
Apply as: Phrase Match "quotes"

```
"how long to sell a house"
"home selling tips"
"house selling checklist"
"capital gains tax"
"closing costs explained"
"home appraisal cost"
"how to price my home"
"average home sale price"
"real estate school"
"real estate license"
"real estate exam"
"become a real estate agent"
"real estate courses"
"real estate jobs"
"real estate career"
"what is home equity"
"should I sell my house"
"is it a good time to sell"
```

---

## AD GROUPS AND KEYWORDS

### BRAND CAMPAIGN

#### Ad Group: Brand
**Keywords (Exact Match only):**
- [helpful home buyers]
- [helpful home buyers usa]
- [helpfulhomebuyersusa]
- [helpful homebuyers]

**RSA:**
- H1: Helpful Home Buyers USA
- H2: Official Site — Get Your Offer
- H3: We Buy Houses for Cash
- D1: Get a fair cash offer on your home. Close in as few as 7 days. No repairs needed.
- D2: The trusted cash home buyer. Fast closings, no agent fees, any condition.
- Final URL: https://helpfulhomebuyersusa.com

---

### MAIN CAMPAIGN — EXISTING AD GROUPS

#### Ad Group: Cash For House
**Performance:** BEST — $92/conv, 47% CVR. Priority ad group.
**Keywords (Phrase Match):**
- "cash for house"
- "cash for my house"
- "cash for homes"
- "cash home buyers"
- "sell house for cash"

---

#### Ad Group: We Buy Houses
**Keywords (Phrase Match):**
- "we buy houses"
- "companies that buy houses"
- "home buyers near me"
- "who buys houses"  ← re-enabled 2026-03-24, was paused

---

#### Ad Group: Sell House
**Keywords (Phrase Match):**
- "sell my house"
- "sell house fast"
- "sell home"  ← re-enabled 2026-03-24, 45% CVR, was paused
- "sell my home fast"

> NOTE: "sell my house" was paused 2026-03-24 due to Low Quality Score ($603/conv).
> Re-enable once landing page is migrated to helpfulhomebuyersusa.com and QS improves.

---

#### Ad Group: As Is
**Keywords (Phrase Match):**
- "sell house as is"
- "sell as is home"
- "sell house without repairs"
- "sell house any condition"

---

#### Ad Group: Companies That Buy Houses
**Keywords (Phrase Match):**
- "companies that buy houses"
- "investors that buy houses"
- "real estate investors buy houses"

---

#### Ad Group: Need or Want To Sell House
**Keywords (Phrase Match):**
- "need to sell my house"
- "want to sell my house fast"
- "looking to sell my house"

---

### MAIN CAMPAIGN — NEW DISTRESSED SELLER AD GROUPS (added 2026-03-24)

#### Ad Group: Foreclosure
**Landing page:** https://helpfulhomebuyersusa.com/foreclosure

**Keywords (Phrase Match):**
- "stop foreclosure sell house"
- "sell house before foreclosure"
- "avoid foreclosure sell home"
- "behind on mortgage sell house fast"
- "house going into foreclosure"
- "sell house in default"
- "pre-foreclosure home sale"
- "foreclosure rescue sell house"

**RSA Asset Set:**
| Asset | Content |
|---|---|
| H1 | Facing Foreclosure? We Can Help |
| H1b | Stop Foreclosure — Sell Fast |
| H2 | Cash Offer in 24 Hours |
| H2b | Close Before Your Foreclosure Date |
| H3 | 200+ Homeowners Helped |
| H3b | No Fees. No Agents. No Judgment. |
| H4 | Any Condition — Fair Cash Offer |
| H5 | We Buy Houses Fast for Cash |
| D1 | We specialize in buying homes from sellers facing foreclosure. Cash offer in 24 hours, close in as few as 7 days. |
| D2 | Keep your credit. Avoid the court record. Call now for a free, no-obligation offer on your property. |

---

#### Ad Group: Probate and Inherited
**Landing page:** https://helpfulhomebuyersusa.com/inherited

**Keywords (Phrase Match):**
- "sell inherited house fast"
- "selling estate property cash"
- "sell probate house"
- "inherited house need to sell"
- "executor sell house fast"
- "sell deceased parents house"
- "sell house from estate"

**RSA Asset Set:**
| Asset | Content |
|---|---|
| H1 | Inherited a House? Sell Fast |
| H1b | Estate Property Cash Buyer |
| H2 | No Repairs. No Cleanup. |
| H2b | Cash Offer Within 24 Hours |
| H3 | We Handle All the Paperwork |
| H3b | No Agents. No Commissions. |
| H4 | Any Condition — Close Fast |
| H5 | Sell Estate Property for Cash |
| D1 | Dealing with an inherited or estate property? We make it simple — one offer, one closing, cash in hand. |
| D2 | No agents, no commissions, no open houses. We close on your timeline. |

---

#### Ad Group: Divorce
**Landing page:** https://helpfulhomebuyersusa.com/divorce

**Keywords (Phrase Match):**
- "sell house during divorce fast"
- "sell house fast divorce settlement"
- "divorce need to sell house"
- "sell marital home quickly"
- "dividing assets sell house"
- "joint property sell house divorce"

**RSA Asset Set:**
| Asset | Content |
|---|---|
| H1 | Going Through Divorce? Sell Fast |
| H1b | Sell Your House — Split Clean |
| H2 | Cash Offer in 24 Hours |
| H2b | Close on Your Timeline |
| H3 | No Agents. No Delays. |
| H3b | Simple Process. Fast Closing. |
| H4 | Any Condition Accepted |
| H5 | Skip the Agent, Get Cash Fast |
| D1 | Need to sell a shared property during divorce? We make it simple — one offer, one closing, clean split. |
| D2 | No inspections, no agent fees, no delays. Cash offer within 24 hours. Call or fill out our form now. |

---

#### Ad Group: Tired Landlord
**Landing page:** https://helpfulhomebuyersusa.com/landlord

**Keywords (Phrase Match):**
- "sell rental property fast cash"
- "tired landlord sell house"
- "sell investment property quickly"
- "sell house with tenants"
- "problem tenants sell rental"
- "landlord wants out sell property"

**RSA Asset Set:**
| Asset | Content |
|---|---|
| H1 | Done Being a Landlord? |
| H1b | Sell Your Rental Property Fast |
| H2 | We Buy With Tenants In Place |
| H2b | Cash Offer Any Condition |
| H3 | No Evictions Required |
| H3b | Close in 7 Days |
| H4 | Tired Landlord? We Can Help |
| H5 | Any Condition — Fair Cash Offer |
| D1 | Tired of problem tenants, maintenance calls, and vacancy stress? We buy rental properties as-is, with tenants in place. |
| D2 | No evictions required. No repairs needed. Cash offer within 24 hours. Walk away clean. |

---

#### Ad Group: Damaged Property
**Landing page:** https://helpfulhomebuyersusa.com/damaged

**Keywords (Phrase Match):**
- "sell fire damaged house"
- "sell flood damaged house"
- "sell house as is no repairs"
- "sell house in bad condition"
- "sell house needs major repairs"
- "sell ugly house for cash"
- "sell house foundation problems"
- "sell hoarder house fast"

**RSA Asset Set:**
| Asset | Content |
|---|---|
| H1 | We Buy Damaged Houses |
| H1b | No Repairs. No Cleanup. Cash. |
| H2 | Any Condition Accepted |
| H2b | Cash Offer in 24 Hours |
| H3 | Fire Damage? We Buy As-Is |
| H3b | Sell Your House Any Condition |
| H4 | Close in As Few as 7 Days |
| H5 | No Agent Fees. No Hassle. |
| D1 | We buy houses with fire damage, mold, foundation issues, hoarder situations. No repairs required. No judgment. |
| D2 | Get a fair cash offer within 24 hours. Close on your timeline. No inspections, no agents, no hassle. |

---

## LANDING PAGE URLS (Ad → Landing Page Map)

| Ad Group | Final URL |
|---|---|
| Brand | https://helpfulhomebuyersusa.com |
| Cash For House | https://helpfulhomebuyersusa.com/sell |
| We Buy Houses | https://helpfulhomebuyersusa.com/sell |
| Sell House | https://helpfulhomebuyersusa.com/sell |
| As Is | https://helpfulhomebuyersusa.com/sell |
| Companies That Buy Houses | https://helpfulhomebuyersusa.com/sell |
| Need or Want To Sell House | https://helpfulhomebuyersusa.com/sell |
| Foreclosure | https://helpfulhomebuyersusa.com/foreclosure |
| Probate and Inherited | https://helpfulhomebuyersusa.com/inherited |
| Divorce | https://helpfulhomebuyersusa.com/divorce |
| Tired Landlord | https://helpfulhomebuyersusa.com/landlord |
| Damaged Property | https://helpfulhomebuyersusa.com/damaged |

---

## WHAT TO DO IF 3RD PARTY BREAKS SOMETHING

### If negative keyword lists are deleted:
1. Go to Tools & Settings → Shared Library → Negative keyword lists
2. Create 4 new lists using the keyword lists documented above in this file
3. Apply all 4 lists to all active campaigns
4. Time to rebuild: ~60 min

### If distressed seller ad groups are paused or deleted:
1. Go to the main campaign → Ad groups → New ad group
2. Use the exact keywords, RSA assets, and Final URLs documented above
3. Time to rebuild: ~90 min

### If call tracking is removed:
1. Tools & Settings → Conversions → New conversion action
2. Recreate "Calls from ads" and "Website phone calls" per the Conversion Actions section above
3. Re-add call extension to all campaigns
4. Time to rebuild: ~30 min

### If landing pages are taken down:
1. The landing page code is in the Git repository: `/Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa`
2. Files: `app/foreclosure/page.tsx`, `app/inherited/page.tsx`, `app/divorce/page.tsx`, `app/landlord/page.tsx`, `app/damaged/page.tsx`, `app/sell/page.tsx`
3. Run: `cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa && git log --oneline -10` to find the commit
4. Deploy: push to main branch → Vercel auto-deploys
5. Time to restore: ~5 min (just push to git)

### If bidding strategy is changed back to tCPA:
1. The correct setting is: Maximize Conversions (no target) until reaching 50+ conversions/month
2. After 50+ conv/month: switch to tCPA at $135 (10% below current actual)
3. Do NOT set tCPA above $150 — account was running at $150.75 actual when audited

### If brand campaign is deleted:
1. Create a new Search campaign using the Brand Campaign settings above
2. Exact match only: [helpful home buyers], [helpful home buyers usa], [helpfulhomebuyersusa], [helpful homebuyers]
3. Budget: $25/day, Target Impression Share 90% top of page
4. Time to rebuild: ~20 min

---

## QUICK HEALTH CHECK (run monthly)

Ask the 3rd party to confirm these are still in place, or check yourself:

- [ ] 4 shared negative keyword lists applied to all campaigns
- [ ] Call conversion tracking showing >0 tracked calls per week
- [ ] Enhanced conversions showing green/active status
- [ ] All 5 distressed seller ad groups active (not paused)
- [ ] Location targeting set to "Presence" (not "Presence or interest")
- [ ] Auto-apply recommendations: OFF
- [ ] Brand campaign active at $25/day
- [ ] Landing pages returning 200 (not 404): /sell, /foreclosure, /inherited, /divorce, /landlord, /damaged

---

## TRACKING SETUP

| Platform | ID | Status |
|---|---|---|
| Google Tag Manager | GTM-KFX3DMBX | Active |
| Google Ads Conversion | AW-17947613888 | Active |
| FB Pixel | Pending | Not set |

GTM is installed in the Next.js app via `components/tracking-pixels.tsx` and loaded in `app/layout.tsx`.
Vercel env vars: `NEXT_PUBLIC_GTM_ID=GTM-KFX3DMBX`, `NEXT_PUBLIC_GOOGLE_ADS_ID=AW-17947613888`

---

## ACCOUNT ACCESS

| Role | Email | Notes |
|---|---|---|
| Owner | anchor.offer.chatgpt@gmail.com | Primary account owner — full access |
| Manager (MCC) | Bolt Deals MCC 629-578-9660 | 3rd party manager — can be removed at any time |

**To remove 3rd party access:**
1. Sign in to ads.google.com with anchor.offer.chatgpt@gmail.com
2. Tools & Settings → Access and security → Managers
3. Remove the Bolt Deals MCC link
4. The account remains yours — all campaigns, keywords, and data stay intact

**To grant new manager access:**
1. Tools & Settings → Access and security → Managers
2. Link to manager account — provide the new manager's MCC customer ID
