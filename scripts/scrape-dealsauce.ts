// scripts/scrape-dealsauce.ts
// Deploy to Render.com as a Web Service (scripts/ directory).
// Start command: npm install -g @anthropic-ai/claude-code && npx playwright install chromium && npx tsx scrape-dealsauce.ts

import { chromium } from 'playwright'
import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import { spawnSync } from 'child_process'

const EMAIL    = 'anchor.offer.chatgpt@gmail.com'
const PASSWORD = 'Password!1'
const NEXT_APP_URL = process.env.NEXT_APP_URL ?? 'https://helpfulhomebuyersusa.com'

const SELECTORS_PATH = path.join(__dirname, 'dealsauce-selectors.json')
const TMP_SCREENSHOT = '/tmp/ds-failure.png'
const TMP_HTML       = '/tmp/ds-page.html'

// ─── Selector types ───────────────────────────────────────────────────────────

interface FilterDef {
  action: 'fill' | 'select' | 'check'
  selector: string
}

interface Selectors {
  version: number
  login: {
    emailInput: string
    passwordInput: string
    submitButton: string
    successUrlGlob: string
  }
  leadsPage: {
    countySelect: string
    leadRow: string
    fields: Record<string, string>
  }
  filters: Record<string, FilterDef>
}

function loadSelectors(): Selectors {
  return JSON.parse(fs.readFileSync(SELECTORS_PATH, 'utf-8')) as Selectors
}

function tpl(selector: string, value: string): string {
  return selector.replace(/\{value\}/g, value)
}

// ─── Filter types ─────────────────────────────────────────────────────────────

interface TargetFilters {
  // Lead Types
  lead_types?: string[]
  lead_types_match_all?: boolean
  owner_types?: string[]
  listing_status?: string[]
  // Sellability Scores
  min_retail_score?: number
  max_retail_score?: number
  min_rental_score?: number
  max_rental_score?: number
  min_wholesale_score?: number
  max_wholesale_score?: number
  // Property Valuations
  min_market_value?: number
  max_market_value?: number
  min_rental_estimate?: number
  max_rental_estimate?: number
  // Property Features
  property_types?: string[]
  min_price?: number
  max_price?: number
  min_beds?: number
  max_beds?: number
  min_baths?: number
  max_baths?: number
  min_sqft?: number
  max_sqft?: number
  min_lot_size?: number
  max_lot_size?: number
  min_year_built?: number
  max_year_built?: number
  amenities?: string[]
  hoa?: string
  // Listing Info
  days_on_market?: string
  has_photos?: boolean
  has_before_after_photos?: boolean
  property_keywords?: string
  min_profit_potential?: number
  max_profit_potential?: number
  // Mortgage
  min_ltv?: number
  max_ltv?: number
  min_equity?: number
  max_equity?: number
  min_loan_balance?: number
  max_loan_balance?: number
  min_interest_rate?: number
  max_interest_rate?: number
  min_open_loans?: number
  max_open_loans?: number
  loan_type?: string
  mortgage_finance_type?: string
  // Ownership
  min_years_owned?: number
  max_years_owned?: number
  // Previous Sale
  last_sale_date?: string
  min_last_sale_price?: number
  max_last_sale_price?: number
  intrafamily_transfer?: boolean
  // Foreclosure
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

// ─── Fetch targets ────────────────────────────────────────────────────────────

async function fetchTargets(): Promise<Target[]> {
  try {
    const res = await fetch(`${NEXT_APP_URL}/api/scrape-targets`)
    const json = await res.json() as { targets?: Target[] }
    return json.targets ?? []
  } catch {
    return [{ id: 'fallback', type: 'county', value: 'Fairfax', state: 'VA', filters: {} }]
  }
}

// ─── Apply filters ────────────────────────────────────────────────────────────

type Page = import('playwright').Page

async function applyFilters(page: Page, filters: TargetFilters, sel: Selectors): Promise<void> {
  const f = filters
  const fs_ = sel.filters

  async function fill(key: string, value: string) {
    const def = fs_[key]
    if (!def) return
    await page.fill(def.selector, value).catch(() => {})
  }
  async function select(key: string, value: string | string[]) {
    const def = fs_[key]
    if (!def) return
    await page.selectOption(def.selector, value as string).catch(() => {})
  }
  async function check(key: string) {
    const def = fs_[key]
    if (!def) return
    await page.check(def.selector).catch(() => {})
  }
  async function checkValue(key: string, value: string) {
    const def = fs_[key]
    if (!def) return
    await page.check(tpl(def.selector, value)).catch(() => {})
  }

  // Lead Types
  if (f.lead_types?.length) {
    for (const lt of f.lead_types) await checkValue('leadType', lt)
  }

  // Owner Type / Listing Status
  if (f.owner_types?.length) await select('ownerType', f.owner_types)
  if (f.listing_status?.length) await select('listingStatus', f.listing_status[0])

  // Property Types
  if (f.property_types?.length) {
    for (const pt of f.property_types) await checkValue('propertyType', pt)
  }

  // Price
  if (f.min_price) await fill('minPrice', String(f.min_price))
  if (f.max_price) await fill('maxPrice', String(f.max_price))

  // Beds / Baths
  if (f.min_beds) await select('minBeds', String(f.min_beds))
  if (f.max_beds) await select('maxBeds', String(f.max_beds))
  if (f.min_baths) await select('minBaths', String(f.min_baths))
  if (f.max_baths) await select('maxBaths', String(f.max_baths))

  // Sqft / Lot Size
  if (f.min_sqft) await select('minSqft', String(f.min_sqft))
  if (f.max_sqft) await select('maxSqft', String(f.max_sqft))
  if (f.min_lot_size) await select('minLotSize', String(f.min_lot_size))
  if (f.max_lot_size) await select('maxLotSize', String(f.max_lot_size))

  // Year Built
  if (f.min_year_built) await fill('minYearBuilt', String(f.min_year_built))
  if (f.max_year_built) await fill('maxYearBuilt', String(f.max_year_built))

  // Amenities
  if (f.amenities?.length) {
    for (const a of f.amenities) await checkValue('amenity', a)
  }

  // HOA
  if (f.hoa) await select('hoa', f.hoa)

  // Listing Info
  if (f.days_on_market) await select('daysOnMarket', f.days_on_market)
  if (f.has_photos) await check('hasPhotos')
  if (f.has_before_after_photos) await check('hasBeforeAfterPhotos')
  if (f.property_keywords) await fill('propertyKeywords', f.property_keywords)
  if (f.min_profit_potential) await fill('minProfitPotential', String(f.min_profit_potential))
  if (f.max_profit_potential) await fill('maxProfitPotential', String(f.max_profit_potential))

  // Sellability Scores
  if (f.min_retail_score) await fill('minRetailScore', String(f.min_retail_score))
  if (f.max_retail_score) await fill('maxRetailScore', String(f.max_retail_score))
  if (f.min_rental_score) await fill('minRentalScore', String(f.min_rental_score))
  if (f.max_rental_score) await fill('maxRentalScore', String(f.max_rental_score))
  if (f.min_wholesale_score) await fill('minWholesaleScore', String(f.min_wholesale_score))
  if (f.max_wholesale_score) await fill('maxWholesaleScore', String(f.max_wholesale_score))

  // Valuations
  if (f.min_market_value) await fill('minMarketValue', String(f.min_market_value))
  if (f.max_market_value) await fill('maxMarketValue', String(f.max_market_value))
  if (f.min_rental_estimate) await fill('minRentalEstimate', String(f.min_rental_estimate))
  if (f.max_rental_estimate) await fill('maxRentalEstimate', String(f.max_rental_estimate))

  // Mortgage
  if (f.min_ltv) await fill('minLtv', String(f.min_ltv))
  if (f.max_ltv) await fill('maxLtv', String(f.max_ltv))
  if (f.min_equity) await fill('minEquity', String(f.min_equity))
  if (f.max_equity) await fill('maxEquity', String(f.max_equity))
  if (f.min_loan_balance) await fill('minLoanBalance', String(f.min_loan_balance))
  if (f.max_loan_balance) await fill('maxLoanBalance', String(f.max_loan_balance))
  if (f.min_interest_rate) await fill('minInterestRate', String(f.min_interest_rate))
  if (f.max_interest_rate) await fill('maxInterestRate', String(f.max_interest_rate))
  if (f.min_open_loans) await fill('minOpenLoans', String(f.min_open_loans))
  if (f.max_open_loans) await fill('maxOpenLoans', String(f.max_open_loans))
  if (f.loan_type) await select('loanType', f.loan_type)
  if (f.mortgage_finance_type) await select('mortgageFinanceType', f.mortgage_finance_type)

  // Ownership
  if (f.min_years_owned) await fill('minYearsOwned', String(f.min_years_owned))
  if (f.max_years_owned) await fill('maxYearsOwned', String(f.max_years_owned))

  // Previous Sale
  if (f.last_sale_date) await select('lastSaleDate', f.last_sale_date)
  if (f.min_last_sale_price) await fill('minLastSalePrice', String(f.min_last_sale_price))
  if (f.max_last_sale_price) await fill('maxLastSalePrice', String(f.max_last_sale_price))
  if (f.intrafamily_transfer) await check('intrafamilyTransfer')

  // Foreclosure
  if (f.min_preforeclosure_notices) await fill('minPreforeclosureNotices', String(f.min_preforeclosure_notices))
  if (f.max_preforeclosure_notices) await fill('maxPreforeclosureNotices', String(f.max_preforeclosure_notices))

  await page.waitForTimeout(1500)
}

// ─── Self-healing ─────────────────────────────────────────────────────────────

async function healSelectors(page: Page, reason: string): Promise<boolean> {
  const claudeAvailable = spawnSync('which', ['claude']).status === 0
  if (!claudeAvailable) {
    console.warn('[heal] claude CLI not found — skipping self-heal')
    return false
  }

  console.log(`[heal] triggering self-heal: ${reason}`)

  try {
    await page.screenshot({ path: TMP_SCREENSHOT, fullPage: false })
    const html = await page.content()
    fs.writeFileSync(TMP_HTML, html.slice(0, 60_000))
  } catch {
    console.warn('[heal] could not capture page state')
  }

  const currentSelectors = fs.readFileSync(SELECTORS_PATH, 'utf-8')

  const prompt = `
You are fixing a broken Playwright scraper for DealSauce (app.dealsauce.io).

PROBLEM: ${reason}

CURRENT SELECTORS FILE at ${SELECTORS_PATH}:
\`\`\`json
${currentSelectors}
\`\`\`

EVIDENCE FILES:
- Screenshot of current page state: ${TMP_SCREENSHOT}
- Page HTML (truncated to 60KB): ${TMP_HTML}

TASK:
1. Read the screenshot and HTML to understand the current DealSauce UI structure
2. Compare against the selectors file — identify which selectors no longer match
3. Update ${SELECTORS_PATH} with corrected selectors that match the current UI
4. Preserve the exact JSON structure (same keys, same "action" values) — only update "selector" strings
5. Do not add or remove keys

When done, output a single line: "Healed: <list of keys changed>"
`.trim()

  const result = spawnSync('claude', [
    '--dangerously-skip-permissions',
    '-p', prompt,
    '--output-format', 'text',
  ], {
    cwd: __dirname,
    encoding: 'utf-8',
    timeout: 180_000,
    env: { ...process.env },
  })

  if (result.status === 0) {
    console.log('[heal] done:', result.stdout.trim().slice(0, 300))
    return true
  }

  console.error('[heal] Claude exited non-zero:', result.stderr?.slice(0, 500))
  return false
}

// ─── Scrape ───────────────────────────────────────────────────────────────────

interface ScrapedLead {
  mlsNumber: string; address: string; listPrice: number
  beds: number; baths: number; sqft: number
  agentName: string; agentEmail: string; agentPhone: string
  wholesaleValue: number; description: string; county: string
}

async function scrape(overrideTargets?: Target[]): Promise<ScrapedLead[]> {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
  const page = await browser.newPage()
  const leads: ScrapedLead[] = []
  let selectorHealAttempted = false

  try {
    let sel = loadSelectors()

    // Login
    await page.goto('https://app.dealsauce.io/login', { waitUntil: 'networkidle' })
    await page.fill(sel.login.emailInput, EMAIL)
    await page.fill(sel.login.passwordInput, PASSWORD)
    await page.click(sel.login.submitButton)

    try {
      await page.waitForURL(sel.login.successUrlGlob, { timeout: 15_000 })
    } catch {
      // Login failed — heal and abort (can't scrape without auth)
      await healSelectors(page, 'Login failed: could not reach leads URL after submit')
      await browser.close()
      return []
    }

    const targets = overrideTargets ?? await fetchTargets()
    const countyTargets = targets.filter(t => t.type === 'county')

    for (const target of countyTargets) {
      const county = target.value
      const filters = target.filters ?? {}

      await page.goto('https://app.dealsauce.io/leads', { waitUntil: 'networkidle' })
      await page.selectOption(sel.leadsPage.countySelect, county).catch(() => {})
      await page.waitForTimeout(2000)
      await applyFilters(page, filters, sel)

      console.log(`[dealsauce] county=${county} filters=${JSON.stringify(filters)}`)

      const rows = await page.$$(sel.leadsPage.leadRow)

      // Self-heal: if 0 rows and we haven't healed yet, try once
      if (rows.length === 0 && !selectorHealAttempted) {
        selectorHealAttempted = true
        const healed = await healSelectors(page, `0 lead rows found for county=${county} using selector "${sel.leadsPage.leadRow}"`)
        if (healed) {
          sel = loadSelectors() // reload updated selectors
          console.log('[heal] retrying county:', county)
          // Re-navigate and retry this target
          await page.goto('https://app.dealsauce.io/leads', { waitUntil: 'networkidle' })
          await page.selectOption(sel.leadsPage.countySelect, county).catch(() => {})
          await page.waitForTimeout(2000)
          await applyFilters(page, filters, sel)
          const retryRows = await page.$$(sel.leadsPage.leadRow)
          rows.push(...retryRows)
        }
      }

      const fld = sel.leadsPage.fields
      for (const row of rows) {
        const g = (s: string) => row.$eval(s, (el: Element) => el.textContent?.trim() ?? '').catch(() => '')
        const mlsNumber = await g(fld.mlsNumber)
        if (!mlsNumber) continue

        const address        = await g(fld.address)
        const listPriceRaw   = await g(fld.listPrice)
        const wholesaleRaw   = await g(fld.wholesaleValue)
        const bedsRaw        = await g(fld.beds)
        const bathsRaw       = await g(fld.baths)
        const sqftRaw        = await g(fld.sqft)
        const agentName      = await g(fld.agentName)
        const agentEmail     = await g(fld.agentEmail)
        const agentPhone     = await g(fld.agentPhone)
        const description    = await g(fld.description)

        const listPrice      = parseInt(listPriceRaw.replace(/[^0-9]/g, ''), 10) || 0
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

// ─── HTTP server ──────────────────────────────────────────────────────────────

const PORT   = parseInt(process.env.PORT ?? '3100', 10)
const SECRET = process.env.SCRAPER_SECRET ?? ''

http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', selectorsVersion: loadSelectors().version }))
    return
  }

  if (req.method === 'POST' && req.url === '/scrape') {
    if (SECRET && req.headers['x-scraper-secret'] !== SECRET) {
      res.writeHead(401); res.end('{"error":"Unauthorized"}'); return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    try {
      // Accept optional adhoc targets in the POST body
      const rawBody = await new Promise<string>(resolve => {
        let data = ''
        req.on('data', chunk => { data += chunk })
        req.on('end', () => resolve(data))
      })
      const body = rawBody ? JSON.parse(rawBody) as { targets?: Target[] } : {}
      const leads = await scrape(body.targets)
      res.end(JSON.stringify({ leads, count: leads.length }))
    } catch (err) {
      res.end(JSON.stringify({ leads: [], error: err instanceof Error ? err.message : 'error' }))
    }
    return
  }

  res.writeHead(404); res.end()
}).listen(PORT, () => console.log(`[dealsauce-scraper] port ${PORT}`))
