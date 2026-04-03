/**
 * google-ads-audit.ts
 * 3-day flywheel audit for HHB Google Ads account.
 * Pulls campaign/ad group/search term data, then uses Claude to generate
 * a prioritized action report.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   GOOGLE_ADS_DEVELOPER_TOKEN
 *   GOOGLE_ADS_CLIENT_ID
 *   GOOGLE_ADS_CLIENT_SECRET
 *   GOOGLE_ADS_REFRESH_TOKEN
 *   GOOGLE_ADS_CUSTOMER_ID  (no dashes, e.g. 9621034521)
 *   GOOGLE_ADS_MANAGER_ID   (optional MCC, e.g. 6295789660)
 *   DAYS_BACK               (default: 7)
 *   NOTIFICATION_EMAIL      (optional)
 */

import { writeFileSync } from 'fs'
import Anthropic from '@anthropic-ai/sdk'

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID!
const MANAGER_ID = process.env.GOOGLE_ADS_MANAGER_ID
const DAYS_BACK = parseInt(process.env.DAYS_BACK ?? '7', 10)
const GOOGLE_ADS_API_VERSION = 'v18'
const GOOGLE_ADS_BASE = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}`

// ── OAuth ────────────────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OAuth token refresh failed: ${res.status} ${body}`)
  }
  const data = await res.json() as { access_token: string }
  return data.access_token
}

// ── Google Ads API ────────────────────────────────────────────────────────────

function buildHeaders(accessToken: string): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    'Content-Type': 'application/json',
  }
  if (MANAGER_ID) {
    headers['login-customer-id'] = MANAGER_ID
  }
  return headers
}

async function gaqlSearch(accessToken: string, query: string): Promise<unknown[]> {
  const url = `${GOOGLE_ADS_BASE}/customers/${CUSTOMER_ID}/googleAds:search`
  const res = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(accessToken),
    body: JSON.stringify({ query }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Google Ads API error: ${res.status} ${body}`)
  }
  const data = await res.json() as { results?: unknown[] }
  return data.results ?? []
}

// ── Queries ───────────────────────────────────────────────────────────────────

function dateRange(): { start: string; end: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - DAYS_BACK)
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  }
}

async function fetchCampaignPerformance(token: string) {
  const { start, end } = dateRange()
  return gaqlSearch(token, `
    SELECT
      campaign.name,
      campaign.status,
      campaign.bidding_strategy_type,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.conversion_rate
    FROM campaign
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND campaign.name LIKE 'HHB%'
    ORDER BY metrics.cost_micros DESC
  `)
}

async function fetchAdGroupPerformance(token: string) {
  const { start, end } = dateRange()
  return gaqlSearch(token, `
    SELECT
      campaign.name,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc
    FROM ad_group
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND campaign.name LIKE 'HHB%'
    ORDER BY metrics.cost_micros DESC
  `)
}

async function fetchSearchTerms(token: string) {
  const { start, end } = dateRange()
  return gaqlSearch(token, `
    SELECT
      campaign.name,
      ad_group.name,
      search_term_view.search_term,
      search_term_view.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND campaign.name LIKE 'HHB%'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 100
  `)
}

async function fetchKeywordQualityScore(token: string) {
  return gaqlSearch(token, `
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.quality_info.creative_quality_score,
      ad_group_criterion.quality_info.post_click_quality_score,
      ad_group_criterion.quality_info.search_predicted_ctr,
      ad_group_criterion.status
    FROM ad_group_criterion
    WHERE campaign.name LIKE 'HHB%'
      AND ad_group_criterion.type = KEYWORD
      AND ad_group_criterion.status != REMOVED
    ORDER BY ad_group_criterion.quality_info.quality_score ASC
  `)
}

// ── Claude Analysis ───────────────────────────────────────────────────────────

async function analyzeWithClaude(data: {
  campaigns: unknown[]
  adGroups: unknown[]
  searchTerms: unknown[]
  keywords: unknown[]
  daysBack: number
  auditDate: string
}): Promise<string> {
  const client = new Anthropic()

  const systemPrompt = `You are a Google Ads specialist auditing a motivated seller real estate campaign for Helpful Homebuyers USA (helpfulhomebuyersusa.com).

Account context:
- 3 niche campaigns targeting Virginia motivated sellers
- Budget: $4,000/mo total (Inherited & Estate $1,600 | Distressed Property $1,400 | Senior Transition $1,000)
- Goal: Phone calls and lead form submissions from motivated sellers
- NOT targeting generic "sell my house fast" — only niche intent keywords
- Landing pages: /inherited /probate /damaged /tax-lien /senior-transition
- Conversion target CPL: under $150

Audit rules:
- Pause ad groups with 0 conversions AND cost > $150 in the period
- Shift budget to top performers (floor: $300/campaign/mo)
- Add exact-match negatives for irrelevant search terms (NEVER broad match negatives)
- Flag Quality Score < 5 as FAIL, 5-6 as WARNING
- CPL > $150 = WARNING, CPL > $300 = FAIL

Output format: Markdown report with:
1. Executive summary (3 bullets max)
2. Campaign scorecards (impressions/clicks/conversions/CPL/spend)
3. Action items sorted by priority (CRITICAL → HIGH → MEDIUM)
4. Specific negative keywords to add (from search terms data)
5. Budget reallocation recommendation if needed`

  const userPrompt = `Audit period: last ${data.daysBack} days (through ${data.auditDate})

## Campaign Performance
${JSON.stringify(data.campaigns, null, 2)}

## Ad Group Performance
${JSON.stringify(data.adGroups, null, 2)}

## Top Search Terms (last ${data.daysBack} days)
${JSON.stringify(data.searchTerms, null, 2)}

## Keyword Quality Scores
${JSON.stringify(data.keywords, null, 2)}

Generate the flywheel audit report.`

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in Claude response')
  }
  return textBlock.text
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Starting Google Ads flywheel audit — last ${DAYS_BACK} days`)

  const token = await getAccessToken()
  console.log('OAuth token acquired')

  const [campaigns, adGroups, searchTerms, keywords] = await Promise.all([
    fetchCampaignPerformance(token),
    fetchAdGroupPerformance(token),
    fetchSearchTerms(token),
    fetchKeywordQualityScore(token),
  ])

  console.log(`Data fetched: ${campaigns.length} campaigns, ${adGroups.length} ad groups, ${searchTerms.length} search terms, ${keywords.length} keywords`)

  const auditDate = new Date().toISOString().split('T')[0]
  const report = await analyzeWithClaude({ campaigns, adGroups, searchTerms, keywords, daysBack: DAYS_BACK, auditDate })

  const outputPath = `/tmp/google-ads-audit-${auditDate}.md`
  const header = `# Google Ads Flywheel Audit\n**Date:** ${auditDate}  **Period:** Last ${DAYS_BACK} days  **Account:** ${CUSTOMER_ID}\n\n---\n\n`
  writeFileSync(outputPath, header + report)

  console.log(`Report saved: ${outputPath}`)
  console.log('\n--- REPORT PREVIEW ---\n')
  console.log(report.slice(0, 800))
  console.log('\n[full report saved to file]')
}

main().catch((err) => {
  console.error('Audit failed:', err)
  process.exit(1)
})
