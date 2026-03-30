// scripts/scrape-dealsauce.ts
// Deploy to Render.com as a Web Service (scripts/ directory).
// Start command: npx playwright install chromium && npx tsx scrape-dealsauce.ts

import { chromium } from 'playwright'
import * as http from 'http'

const EMAIL    = 'anchor.offer.chatgpt@gmail.com'
const PASSWORD = 'Password!1'
const NEXT_APP_URL = process.env.NEXT_APP_URL ?? 'https://helpfulhomebuyersusa.com'

interface Target {
  type: string
  value: string
  state: string
  min_price?: number | null
  max_price?: number | null
  min_beds?: number | null
  min_baths?: number | null
  max_dom?: number | null
  property_types?: string[] | null
}

async function fetchTargets(): Promise<Target[]> {
  try {
    const res = await fetch(`${NEXT_APP_URL}/api/scrape-targets`)
    const json = await res.json() as { targets?: Target[] }
    return json.targets ?? []
  } catch {
    return [{ type: 'county', value: 'Fairfax', state: 'VA' }]
  }
}

async function applyFilters(page: import('playwright').Page, target: Target): Promise<void> {
  if (target.min_price) {
    await page.fill('[name="minPrice"], [data-filter="min-price"]', String(target.min_price)).catch(() => {})
  }
  if (target.max_price) {
    await page.fill('[name="maxPrice"], [data-filter="max-price"]', String(target.max_price)).catch(() => {})
  }
  if (target.min_beds) {
    await page.selectOption('[name="minBeds"], [data-filter="beds"]', String(target.min_beds)).catch(() => {})
  }
  if (target.min_baths) {
    await page.selectOption('[name="minBaths"], [data-filter="baths"]', String(target.min_baths)).catch(() => {})
  }
  if (target.max_dom) {
    await page.fill('[name="maxDom"], [data-filter="dom"]', String(target.max_dom)).catch(() => {})
  }
  if (target.property_types?.length) {
    for (const pt of target.property_types) {
      await page.check(`[value="${pt}"], [data-type="${pt}"]`).catch(() => {})
    }
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
      await page.goto('https://app.dealsauce.io/leads', { waitUntil: 'networkidle' })

      // Apply county dropdown
      await page.selectOption('select[name="county"], [data-filter="county"]', county).catch(() => {})
      await page.waitForTimeout(2000)

      // Apply per-target filters (selectors are best-guess; misses are swallowed)
      await applyFilters(page, target)
      console.log(`[dealsauce] county=${county} filters=${JSON.stringify({ min_price: target.min_price, max_price: target.max_price, min_beds: target.min_beds, min_baths: target.min_baths, max_dom: target.max_dom, property_types: target.property_types })}`)

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
