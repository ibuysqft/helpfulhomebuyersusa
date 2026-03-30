// scripts/scrape-dealsauce.ts
// Deploy to Render.com as a Web Service (scripts/ directory).
// Start command: npx playwright install chromium && npx tsx scrape-dealsauce.ts

import { chromium } from 'playwright'
import * as http from 'http'

const EMAIL    = 'anchor.offer.chatgpt@gmail.com'
const PASSWORD = 'Password!1'
const NEXT_APP_URL = process.env.NEXT_APP_URL ?? 'https://helpfulhomebuyersusa.com'

interface TargetFilters {
  lead_types?: string[]
  lead_types_match_all?: boolean
  owner_types?: string[]
  listing_status?: string[]
  property_types?: string[]
  min_price?: number
  max_price?: number
  min_beds?: number
  max_beds?: number
  min_baths?: number
  max_baths?: number
  min_sqft?: number
  max_sqft?: number
  min_year_built?: number
  max_year_built?: number
  amenities?: string[]
  days_on_market?: string
  has_photos?: boolean
  min_profit_potential?: number
  min_retail_score?: number
  max_retail_score?: number
  min_rental_score?: number
  max_rental_score?: number
  min_wholesale_score?: number
  max_wholesale_score?: number
  min_market_value?: number
  max_market_value?: number
  min_ltv?: number
  max_ltv?: number
  min_equity?: number
  max_equity?: number
  loan_type?: string
  last_sale_date?: string
  min_last_sale_price?: number
  max_last_sale_price?: number
  min_preforeclosure_notices?: number
  max_preforeclosure_notices?: number
}

interface Target {
  id: string
  type: string
  value: string
  state: string
  filters: TargetFilters
}

async function fetchTargets(): Promise<Target[]> {
  try {
    const res = await fetch(`${NEXT_APP_URL}/api/scrape-targets`)
    const json = await res.json() as { targets?: Target[] }
    return json.targets ?? []
  } catch {
    return [{ id: 'fallback', type: 'county', value: 'Fairfax', state: 'VA', filters: {} }]
  }
}

type Page = import('playwright').Page

async function applyFilters(page: Page, filters: TargetFilters): Promise<void> {
  const f = filters

  // Lead Types — check each matching checkbox
  if (f.lead_types?.length) {
    for (const lt of f.lead_types) {
      await page.check(`[data-lead-type="${lt}"], input[value="${lt}"]`).catch(() => {})
    }
  }

  // Owner Type dropdown
  if (f.owner_types?.length) {
    await page.selectOption('[name="ownerType"], [data-filter="owner-type"]', f.owner_types).catch(() => {})
  }

  // Property Types dropdown/checkboxes
  if (f.property_types?.length) {
    for (const pt of f.property_types) {
      await page.check(`[data-property-type="${pt}"], input[value="${pt}"]`).catch(() => {})
    }
  }

  // Listing Status
  if (f.listing_status?.length) {
    await page.selectOption('[name="listingStatus"], [data-filter="listing-status"]', f.listing_status[0]).catch(() => {})
  }

  // Price range
  if (f.min_price) await page.fill('[name="minPrice"], [data-filter="min-price"]', String(f.min_price)).catch(() => {})
  if (f.max_price) await page.fill('[name="maxPrice"], [data-filter="max-price"]', String(f.max_price)).catch(() => {})

  // Beds / Baths
  if (f.min_beds) await page.selectOption('[name="minBeds"], [data-filter="min-beds"]', String(f.min_beds)).catch(() => {})
  if (f.max_beds) await page.selectOption('[name="maxBeds"], [data-filter="max-beds"]', String(f.max_beds)).catch(() => {})
  if (f.min_baths) await page.selectOption('[name="minBaths"], [data-filter="min-baths"]', String(f.min_baths)).catch(() => {})
  if (f.max_baths) await page.selectOption('[name="maxBaths"], [data-filter="max-baths"]', String(f.max_baths)).catch(() => {})

  // Sqft
  if (f.min_sqft) await page.selectOption('[name="minSqft"], [data-filter="min-sqft"]', String(f.min_sqft)).catch(() => {})
  if (f.max_sqft) await page.selectOption('[name="maxSqft"], [data-filter="max-sqft"]', String(f.max_sqft)).catch(() => {})

  // Year Built
  if (f.min_year_built) await page.fill('[name="minYearBuilt"], [data-filter="min-year"]', String(f.min_year_built)).catch(() => {})
  if (f.max_year_built) await page.fill('[name="maxYearBuilt"], [data-filter="max-year"]', String(f.max_year_built)).catch(() => {})

  // Amenities
  if (f.amenities?.length) {
    for (const a of f.amenities) {
      await page.check(`[data-amenity="${a}"], input[value="${a}"]`).catch(() => {})
    }
  }

  // Days on Market
  if (f.days_on_market) {
    await page.selectOption('[name="daysOnMarket"], [data-filter="dom"]', f.days_on_market).catch(() => {})
  }

  // Has Photos
  if (f.has_photos) await page.check('[name="hasPhotos"], [data-filter="has-photos"]').catch(() => {})

  // Sellability Scores
  if (f.min_retail_score) await page.fill('[name="minRetailScore"]', String(f.min_retail_score)).catch(() => {})
  if (f.max_retail_score) await page.fill('[name="maxRetailScore"]', String(f.max_retail_score)).catch(() => {})
  if (f.min_wholesale_score) await page.fill('[name="minWholesaleScore"]', String(f.min_wholesale_score)).catch(() => {})
  if (f.max_wholesale_score) await page.fill('[name="maxWholesaleScore"]', String(f.max_wholesale_score)).catch(() => {})

  // Equity / LTV
  if (f.min_equity) await page.fill('[name="minEquity"], [data-filter="min-equity"]', String(f.min_equity)).catch(() => {})
  if (f.max_equity) await page.fill('[name="maxEquity"], [data-filter="max-equity"]', String(f.max_equity)).catch(() => {})
  if (f.min_ltv) await page.fill('[name="minLtv"], [data-filter="min-ltv"]', String(f.min_ltv)).catch(() => {})
  if (f.max_ltv) await page.fill('[name="maxLtv"], [data-filter="max-ltv"]', String(f.max_ltv)).catch(() => {})

  // Foreclosure notices
  if (f.min_preforeclosure_notices) {
    await page.fill('[name="minPreforeclosureNotices"]', String(f.min_preforeclosure_notices)).catch(() => {})
  }

  await page.waitForTimeout(1500)
}

const PORT   = parseInt(process.env.PORT ?? '3100', 10)
const SECRET = process.env.SCRAPER_SECRET ?? ''

interface ScrapedLead {
  mlsNumber: string; address: string; listPrice: number
  beds: number; baths: number; sqft: number
  agentName: string; agentEmail: string; agentPhone: string
  wholesaleValue: number; description: string; county: string
}

async function scrape(): Promise<ScrapedLead[]> {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
  const page = await browser.newPage()
  const leads: ScrapedLead[] = []

  try {
    await page.goto('https://app.dealsauce.io/login', { waitUntil: 'networkidle' })
    await page.fill('input[type="email"]', EMAIL)
    await page.fill('input[type="password"]', PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('**/leads**', { timeout: 15_000 })

    const targets = await fetchTargets()
    const countyTargets = targets.filter(t => t.type === 'county')

    for (const target of countyTargets) {
      const county = target.value
      const filters = target.filters ?? {}
      await page.goto('https://app.dealsauce.io/leads', { waitUntil: 'networkidle' })

      // Apply county dropdown
      await page.selectOption('select[name="county"], [data-filter="county"]', county).catch(() => {})
      await page.waitForTimeout(2000)

      // Apply all configured filters
      await applyFilters(page, filters)
      console.log(`[dealsauce] county=${county} filters=${JSON.stringify(filters)}`)

      const rows = await page.$$('[data-testid="lead-row"], .lead-row, tr.lead')
      for (const row of rows) {
        const g = (sel: string) => row.$eval(sel, (el: Element) => el.textContent?.trim() ?? '').catch(() => '')
        const mlsNumber = await g('[data-mls], .mls-number, [class*="mls"]')
        if (!mlsNumber) continue

        const address      = await g('[data-address], .address, [class*="address"]')
        const listPriceRaw = await g('[data-list-price], .list-price, [class*="price"]')
        const wholesaleRaw = await g('[data-wholesale], .wholesale, [class*="wholesale"]')
        const bedsRaw      = await g('[data-beds], .beds')
        const bathsRaw     = await g('[data-baths], .baths')
        const sqftRaw      = await g('[data-sqft], .sqft')
        const agentName    = await g('[data-agent-name], .agent-name')
        const agentEmail   = await g('[data-agent-email], .agent-email')
        const agentPhone   = await g('[data-agent-phone], .agent-phone')
        const description  = await g('[data-description], .description')

        const listPrice    = parseInt(listPriceRaw.replace(/[^0-9]/g, ''), 10) || 0
        const wholesaleValue = parseInt(wholesaleRaw.replace(/[^0-9]/g, ''), 10) || 0

        if (!address || !listPrice) continue
        leads.push({
          mlsNumber, address, listPrice,
          beds: parseInt(bedsRaw, 10) || 0,
          baths: parseFloat(bathsRaw) || 0,
          sqft: parseInt(sqftRaw.replace(/,/g, ''), 10) || 0,
          agentName, agentEmail, agentPhone,
          wholesaleValue, description, county,
        })
      }
    }
  } finally {
    await browser.close()
  }
  return leads
}

http.createServer(async (req, res) => {
  if (req.url === '/health') { res.writeHead(200); res.end('{"status":"ok"}'); return }

  if (req.method === 'POST' && req.url === '/scrape') {
    if (SECRET && req.headers['x-scraper-secret'] !== SECRET) {
      res.writeHead(401); res.end('{"error":"Unauthorized"}'); return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    try {
      const leads = await scrape()
      res.end(JSON.stringify({ leads, count: leads.length }))
    } catch (err) {
      res.end(JSON.stringify({ leads: [], error: err instanceof Error ? err.message : 'error' }))
    }
    return
  }
  res.writeHead(404); res.end()
}).listen(PORT, () => console.log(`[dealsauce-scraper] port ${PORT}`))
