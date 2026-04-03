# Niche Ads Landing Pages — Design Spec
**Date:** 2026-04-02  
**Status:** Approved

## Goal
Optimize helpfulhomebuyersusa.com landing pages for 3 low-competition, high-ROI Google Ads campaigns targeting Virginia (NoVA, Richmond, Hampton Roads). Every page must convert the specific searcher's pain point within 3 seconds.

## Campaign → Page Map

| Campaign ($4,000/mo) | Pages | Status |
|----------------------|-------|--------|
| Inherited & Estate ($1,600) | `/inherited`, `/probate` | Improve |
| Distressed Property ($1,400) | `/damaged`, `/tax-lien` | Improve |
| Senior Transition ($1,000) | `/senior-transition` | **Build new** |

## Page Improvements

### `/inherited` — Add out-of-state heir angle
- Headline: sharpen with Virginia-specific urgency
- New trust point: remote/out-of-state process available
- New FAQ: "I live outside Virginia — can you still help me sell?"
- New FAQ: "How long does Virginia probate take?"
- Empathy: add estate carrying cost urgency (taxes, insurance, maintenance)
- robots: keep noindex (ad-only page)

### `/tax-lien` — Expand to code violations + city liens
- Subheadline: expand to cover code violations and city-placed liens
- New trust points: code violation payoff, city lien coordination
- New FAQ: "I have a code violation notice — can I still sell?"
- New FAQ: "What if the city has already scheduled an inspection?"
- Add urgency around Virginia tax sale timelines

### `/damaged` — Add condemned + code violation angle
- Headline: broaden to include condemned and code violation properties
- New trust points: city citation handling, condemned property purchase
- New FAQ: "The city condemned my property — can you still buy it?"
- New FAQ: "I have multiple code violations — does that affect my offer?"
- Virginia-specific examples: Norfolk code enforcement, Fairfax County

### `/probate` — Add out-of-state executor section + VA specifics
- Add dedicated section for out-of-state executors
- Virginia probate timeline context (6–18 months typical)
- New FAQ: "I'm the executor but I live out of state — how does this work?"
- Reinforce: we coordinate with VA probate courts and title companies

### `/senior-transition` — Build new (DistressedLandingPage pattern)
- Persona: "Senior"
- Headline: "Helping Families Sell a Parent's Home for Assisted Living"
- Subheadline: "Fast cash sale so you can focus on care — not logistics."
- Empathy: adult children overwhelmed with care transition + property burden
- Trust points (5): remote coordination, belongings handled, fast close for deposit timing, no repairs, probate-aware
- FAQ (4): timing with care facility, what happens to belongings, multiple siblings, condition of home
- Schema: Service + FAQPage
- robots: noindex (ad-only)

## Conversion Improvements (all pages)
- Phone number visible in hero on mobile (above fold)
- Urgency element specific to each situation
- Virginia-specific trust language
- UTM passthrough on all CTA links to `/property-information`

## 3-Day Flywheel Audit System
Saved separately in memory for scheduling setup.

## Files Changed
- `app/inherited/page.tsx` — improve
- `app/tax-lien/page.tsx` — improve  
- `app/damaged/page.tsx` — improve
- `app/probate/page.tsx` — improve
- `app/senior-transition/page.tsx` — create new
