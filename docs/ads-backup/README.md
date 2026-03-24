# Ads Backup — Helpful Home Buyers USA

This folder contains the complete backup of the Google Ads account and landing page system.
If the 3rd party manager removes or breaks anything, use these files to rebuild.

## Files

| File | What it covers |
|---|---|
| `GOOGLE-ADS-MASTER-BACKUP.md` | Full account structure, all campaigns, all ad groups, every keyword, all ad copy (RSA assets), all extensions, all negative keyword lists, campaign settings, conversion tracking setup, and step-by-step rebuild instructions |
| `LANDING-PAGE-CONTENT-BACKUP.md` | All landing page copy, headlines, FAQs, CTAs, and form specs for every page: /sell, /foreclosure, /inherited, /divorce, /landlord, /damaged |

## Landing Page Code

The landing page source code lives in this Git repo:
- `app/foreclosure/page.tsx`
- `app/inherited/page.tsx`
- `app/divorce/page.tsx`
- `app/landlord/page.tsx`
- `app/damaged/page.tsx`
- `app/sell/page.tsx`
- `components/distressed-landing-page.tsx`
- `components/landing-page-layout.tsx`

To restore landing pages if taken down: just push to main and Vercel redeploys automatically.

## Account Access

- **You own the account:** anchor.offer.chatgpt@gmail.com
- **3rd party is a manager:** Bolt Deals MCC (629-578-9660)
- **To fire them:** Tools & Settings → Access → Managers → Remove link
- **All data stays with your account** when a manager is removed

## Monthly Health Check

Run this monthly to verify nothing was broken:

- [ ] 4 negative keyword lists still applied to all campaigns
- [ ] Call tracking showing >0 calls/week
- [ ] 5 distressed seller ad groups active (Foreclosure, Inherited, Divorce, Landlord, Damaged)
- [ ] Location targeting = "Presence" not "Presence or interest"
- [ ] Auto-apply recommendations = OFF
- [ ] Brand campaign active at $25/day
- [ ] Landing pages live: /sell /foreclosure /inherited /divorce /landlord /damaged
