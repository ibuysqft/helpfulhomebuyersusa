/**
 * lib/state-context.ts
 * State configuration for multi-state deployments.
 *
 * Priority order for state detection:
 *   1. x-state-slug request header (set by proxy.ts from hostname at runtime)
 *   2. NEXT_PUBLIC_STATE_SLUG env var (set per Vercel deployment at build time)
 *   3. Falls back to 'national'
 */

export interface StateConfig {
  name: string
  abbr: string
  slug: string
  isNational: boolean
  markets: string[]
  phone: string
  phoneDisplay: string
  siteUrl: string
  tagline: string
}

const DEFAULT_PHONE = '+17039401159'
const DEFAULT_PHONE_DISPLAY = '(703) 940-1159'

const stateMarkets: Record<string, string[]> = {
  national: ['Northern Virginia', 'Texas', 'Florida', 'Georgia', 'Ohio', 'North Carolina', 'South Carolina', 'Illinois', 'Michigan', 'New York', 'New Jersey', 'California', 'Arizona', 'Colorado', 'Connecticut'],
  virginia: ['Northern Virginia', 'Richmond VA', 'Hampton Roads VA'],
  texas: ['Dallas-Fort Worth', 'Houston', 'San Antonio', 'Austin'],
  florida: ['Miami', 'Orlando', 'Tampa Bay', 'Jacksonville'],
  georgia: ['Atlanta Metro', 'Savannah', 'Augusta'],
  ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Akron'],
  'north-carolina': ['Charlotte', 'Raleigh-Durham', 'Greensboro', 'Winston-Salem'],
  'south-carolina': ['Columbia', 'Charleston', 'Greenville', 'Spartanburg'],
  illinois: ['Chicago Metro', 'Naperville', 'Rockford', 'Aurora'],
  michigan: ['Detroit Metro', 'Grand Rapids', 'Lansing', 'Ann Arbor'],
  'new-york': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  'new-jersey': ['Newark', 'Jersey City', 'Trenton', 'Camden'],
  california: ['Los Angeles', 'San Diego', 'San Francisco Bay Area', 'Sacramento'],
  arizona: ['Phoenix Metro', 'Tucson', 'Mesa', 'Chandler'],
  colorado: ['Denver Metro', 'Colorado Springs', 'Aurora', 'Fort Collins'],
  connecticut: ['Hartford', 'Bridgeport', 'New Haven', 'Stamford'],
}

interface StateMeta {
  name: string
  abbr: string
  tagline: string
  domain: string
}

const STATE_META: Record<string, StateMeta> = {
  virginia:        { name: 'Virginia',       abbr: 'VA', tagline: 'We buy houses fast across Virginia — NoVA, Richmond, and Hampton Roads.', domain: 'helpfulhomebuyersvirginia.com' },
  texas:           { name: 'Texas',          abbr: 'TX', tagline: 'Fast cash offers for Texas homeowners in Dallas, Houston, San Antonio, and Austin.', domain: 'helpfulhomebuyerstexas.com' },
  florida:         { name: 'Florida',        abbr: 'FL', tagline: 'We buy houses as-is across Florida — Miami, Orlando, Tampa, and Jacksonville.', domain: 'helpfulhomebuyersflorida.com' },
  georgia:         { name: 'Georgia',        abbr: 'GA', tagline: 'Sell your Georgia home fast — cash offers in Atlanta, Savannah, and Augusta.', domain: 'helpfulhomebuyersgeorgia.com' },
  ohio:            { name: 'Ohio',           abbr: 'OH', tagline: 'We buy houses in Ohio — Columbus, Cleveland, Cincinnati, and Akron.', domain: 'helpfulhomebuyersohio.com' },
  'north-carolina':{ name: 'North Carolina', abbr: 'NC', tagline: 'Cash offers for NC homeowners in Charlotte, Raleigh-Durham, and Greensboro.', domain: 'helpfulhomebuyersnorthcarolina.com' },
  'south-carolina':{ name: 'South Carolina', abbr: 'SC', tagline: 'We buy houses fast in Columbia, Charleston, and Greenville, SC.', domain: 'helpfulhomebuyerssouthcarolina.com' },
  illinois:        { name: 'Illinois',       abbr: 'IL', tagline: 'Sell your Illinois home fast — Chicago Metro, Naperville, Rockford, and Aurora.', domain: 'helpfulhomebuyersillinois.com' },
  michigan:        { name: 'Michigan',       abbr: 'MI', tagline: 'We buy houses in Michigan — Detroit, Grand Rapids, Lansing, and Ann Arbor.', domain: 'helpfulhomebuyersmichigan.com' },
  'new-york':      { name: 'New York',       abbr: 'NY', tagline: 'Fast cash home sales in New York City, Buffalo, Rochester, and Albany.', domain: 'helpfulhomebuyersnewyork.com' },
  'new-jersey':    { name: 'New Jersey',     abbr: 'NJ', tagline: 'We buy houses fast in Newark, Jersey City, Trenton, and Camden, NJ.', domain: 'helpfulhomebuyersnewjersey.com' },
  california:      { name: 'California',     abbr: 'CA', tagline: 'Cash offers for California homes — LA, San Diego, Bay Area, and Sacramento.', domain: 'helpfulhomebuyerscalifornia.com' },
  arizona:         { name: 'Arizona',        abbr: 'AZ', tagline: 'We buy houses in Phoenix, Tucson, Mesa, and Chandler, AZ.', domain: 'helpfulhomebuyersarizona.com' },
  colorado:        { name: 'Colorado',       abbr: 'CO', tagline: 'Sell your Colorado home fast — Denver, Colorado Springs, Aurora, and Fort Collins.', domain: 'helpfulhomebuyerscolorado.com' },
  connecticut:     { name: 'Connecticut',    abbr: 'CT', tagline: 'We buy houses in Hartford, Bridgeport, New Haven, and Stamford, CT.', domain: 'helpfulhomebuyersconnecticut.com' },
}

function buildStateConfig(slug: string): StateConfig {
  const isNational = slug === 'national'
  const meta = STATE_META[slug]
  return {
    name: meta?.name ?? 'the United States',
    abbr: meta?.abbr ?? 'US',
    slug,
    isNational,
    markets: stateMarkets[slug] ?? ['Major Metropolitan Areas'],
    phone: process.env.NEXT_PUBLIC_PHONE ?? DEFAULT_PHONE,
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? DEFAULT_PHONE_DISPLAY,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? (meta ? `https://${meta.domain}` : 'https://helpfulhomebuyersusa.com'),
    tagline: meta?.tagline ?? 'We buy houses for cash anywhere in the USA.',
  }
}

/**
 * For use in Server Components that have access to request headers.
 * Reads x-state-slug set by proxy.ts (hostname detection) first,
 * then falls back to build-time env vars.
 */
export async function getStateConfigFromHeaders(): Promise<StateConfig> {
  // Dynamic import keeps this server-only — avoids bundling 'next/headers' in client chunks
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const headerSlug = headersList.get('x-state-slug')
  const slug = headerSlug ?? process.env.NEXT_PUBLIC_STATE_SLUG ?? 'national'
  return buildStateConfig(slug)
}

/**
 * For use outside of request context (config files, static generation, client components).
 * Reads only build-time env vars.
 */
export function getStateConfig(): StateConfig {
  const slug = process.env.NEXT_PUBLIC_STATE_SLUG ?? 'national'
  return buildStateConfig(slug)
}

/** All states with registered domains, in priority order */
export const registeredStates = [
  { name: 'Virginia',        abbr: 'VA', slug: 'virginia',        domain: 'helpfulhomebuyersvirginia.com' },
  { name: 'Texas',           abbr: 'TX', slug: 'texas',           domain: 'helpfulhomebuyerstexas.com' },
  { name: 'Florida',         abbr: 'FL', slug: 'florida',         domain: 'helpfulhomebuyersflorida.com' },
  { name: 'Georgia',         abbr: 'GA', slug: 'georgia',         domain: 'helpfulhomebuyersgeorgia.com' },
  { name: 'Ohio',            abbr: 'OH', slug: 'ohio',            domain: 'helpfulhomebuyersohio.com' },
  { name: 'North Carolina',  abbr: 'NC', slug: 'north-carolina',  domain: 'helpfulhomebuyersnorthcarolina.com' },
  { name: 'South Carolina',  abbr: 'SC', slug: 'south-carolina',  domain: 'helpfulhomebuyerssouthcarolina.com' },
  { name: 'Illinois',        abbr: 'IL', slug: 'illinois',        domain: 'helpfulhomebuyersillinois.com' },
  { name: 'Michigan',        abbr: 'MI', slug: 'michigan',        domain: 'helpfulhomebuyersmichigan.com' },
  { name: 'New York',        abbr: 'NY', slug: 'new-york',        domain: 'helpfulhomebuyersnewyork.com' },
  { name: 'New Jersey',      abbr: 'NJ', slug: 'new-jersey',      domain: 'helpfulhomebuyersnewjersey.com' },
  { name: 'California',      abbr: 'CA', slug: 'california',      domain: 'helpfulhomebuyerscalifornia.com' },
  { name: 'Arizona',         abbr: 'AZ', slug: 'arizona',         domain: 'helpfulhomebuyersarizona.com' },
  { name: 'Colorado',        abbr: 'CO', slug: 'colorado',        domain: 'helpfulhomebuyerscolorado.com' },
  { name: 'Connecticut',     abbr: 'CT', slug: 'connecticut',     domain: 'helpfulhomebuyersconnecticut.com' },
] as const
