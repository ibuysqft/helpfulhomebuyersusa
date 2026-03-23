# HHB Digital Ecosystem — Chatbot Fix + MRP National Expansion

## What This Is

Two production Next.js sites: **helpfulhomebuyersusa.com** (national cash home buyer lead gen, 15+ state deployments on Vercel) and **myresolutionpath.com** (foreclosure avoidance / mortgage relief resource for homeowners in distress). Both use GHL for CRM, SMS, and chatbot. This sprint fixes a broken WhatsApp chatbot button on HHB and expands MRP from a Virginia-only site to a full national site with 50-state landing pages.

## Core Value

Homeowners in distress find the right resource (sell fast → HHB, keep home → MRP) and submit a lead — every page must have a working contact mechanism.

## Requirements

### Validated

- ✓ HHB Next.js site deployed on Vercel with 15 state sub-projects — existing
- ✓ GHL chat widget integrated via NEXT_PUBLIC_GHL_LOCATION_ID env var — existing
- ✓ MRP Next.js site deployed, GHL location ID 3XiSplNq5TaVUnw0bzWr — existing
- ✓ WhatsApp button component exists (components/layout/whatsapp-button.tsx) — existing but broken

### Active

- [ ] Remove broken WhatsApp button from HHB (link goes to wrong number, not in WhatsApp business)
- [ ] Confirm GHL chat widget renders and is visible on HHB (not hidden by z-index/CSS)
- [ ] Add a native GHL-powered chat widget OR inline chat UI as the primary chatbot on HHB
- [ ] Convert MRP homepage from Virginia-focused to national
- [ ] Add 50-state landing pages to MRP (/[state-slug]) with unique foreclosure content per state
- [ ] Each MRP state page: LocalBusiness schema, FAQ schema, breadcrumb schema
- [ ] MRP sitemap.ts updated to include all state pages
- [ ] MRP meta titles/descriptions targeting "[State] foreclosure help", "stop foreclosure [state]"
- [ ] MRP internal linking between state pages and homepage
- [ ] MRP state pages cover: local foreclosure timeline, loss mitigation options, state-specific homeowner rights, HUD counselors

### Out of Scope

- WhatsApp Business API setup — requires separate business account verification (manual, time-gated)
- MRP state pages for territories (Puerto Rico, Guam) — defer to v2
- Paid ad tracking pixels per state — separate workstream
- MRP blog content generation — separate AI pipeline workstream

## Context

- HHB repo: /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
- MRP repo: /Users/jeffbord/Documents/anchor-seo/myresolutionpath
- Both use Next.js App Router, Tailwind CSS, Vercel deployment
- GHL HHB location ID: Jy8irfJWPVtq3vycsvx4
- GHL MRP location ID: 3XiSplNq5TaVUnw0bzWr
- WhatsApp button component: components/layout/whatsapp-button.tsx — imported in app/layout.tsx
- The GHL widget script IS in layout.tsx already but may have CSS visibility issues
- HHB already has env-driven state context (lib/state-context.ts) — MRP needs similar pattern
- MRP currently has 5 foreclosure-topic pages (short-sale, hecm, deed-in-lieu, loan-modification, forbearance)

## Constraints

- **Tech Stack**: Next.js App Router only — no Pages Router patterns
- **Deployment**: Vercel — ISR preferred for state pages (revalidate: 86400)
- **SEO**: Each state page needs unique content, not duplicate thin content
- **No new dependencies**: Use existing Tailwind + shadcn patterns
- **GHL**: Chat widget ID is env-driven — no hardcoding

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Remove WhatsApp button entirely | Number not registered in WhatsApp Business, breaks trust | — Pending |
| GHL widget as sole chatbot | Already integrated, works on HHB, no new vendor needed | — Pending |
| ISR for MRP state pages | 50 pages × unique content — static at build, revalidate daily | — Pending |
| Dynamic route /[state-slug] for MRP | Matches HHB pattern, easy sitemap generation | — Pending |

---
*Last updated: 2026-03-23 after project initialization*
