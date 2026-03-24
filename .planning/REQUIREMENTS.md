# Requirements: HHB Website Launch Sprint

**Defined:** 2026-03-23
**Core Value:** Homeowners submit a lead — every contact mechanism (chatbot, comps, forms) must work end-to-end on live site.

## v1 Requirements

### Chatbot

- [ ] **CHAT-01**: GHL Conversation AI configured so widget responds with AI, not "give us a minute to assign someone"
- [ ] **CHAT-02**: Chatbot correctly handles "sell my house" intent and collects lead info (name, address, motivation)

### Comps

- [ ] **COMP-01**: Comp puller backend (/analyze-deal) returns real comps for valid US addresses (Redfin scraping fixed)
- [ ] **COMP-02**: /comps page displays results end-to-end for a real test address without error

### Infrastructure

- [ ] **INFRA-01**: Upstash Redis token whitespace build warning resolved
- [ ] **INFRA-02**: All fixes deployed to Vercel production (helpfulhomebuyersusa.com live)

### Audit

- [ ] **AUDIT-01**: All site pages (/, /about, /comps, /blog, /[state], /contact, etc.) load without 404 or JS error
- [ ] **AUDIT-02**: Main lead form submits successfully and creates a GHL contact + triggers Retell call

## Future Requirements

### Tracking

- **TRACK-01**: FB Pixel fires on page view and lead submission (pending FB Pixel ID from user)
- **TRACK-02**: Google Tag Manager installed (pending GTM ID from user)
- **TRACK-03**: Google Ads conversion tracking fires on lead submit (pending Conversion ID from user)

### Integrations

- **INT-01**: RentCast API active for property data enrichment (pending credit card activation)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Tracking pixel IDs | User must provide FB Pixel ID, GTM ID, Google Ads ID — cannot proceed without them |
| RentCast API | Requires credit card at app.rentcast.io — pending user action |
| WhatsApp chatbot | Number not in WhatsApp Business — separate workstream |
| MRP state pages | Separate project milestone |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CHAT-01 | Phase 1 | Pending |
| CHAT-02 | Phase 1 | Pending |
| COMP-01 | Phase 2 | Pending |
| COMP-02 | Phase 2 | Pending |
| INFRA-01 | Phase 3 | Pending |
| INFRA-02 | Phase 3 | Pending |
| AUDIT-01 | Phase 4 | Pending |
| AUDIT-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 after milestone v1.0 initialization*
