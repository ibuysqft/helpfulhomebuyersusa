export interface StateConfig {
  name: string
  abbr: string
  slug: string
  isNational: boolean
  markets: string[]
  phone: string
  phoneDisplay: string
  siteUrl: string
}

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

export function getStateConfig(): StateConfig {
  const slug = process.env.NEXT_PUBLIC_STATE_SLUG ?? 'national'
  const isNational = process.env.NEXT_PUBLIC_IS_NATIONAL === 'true' || slug === 'national'
  return {
    name: process.env.NEXT_PUBLIC_STATE ?? 'the United States',
    abbr: process.env.NEXT_PUBLIC_STATE_ABBR ?? 'US',
    slug,
    isNational,
    markets: stateMarkets[slug] ?? ['Major Metropolitan Areas'],
    phone: process.env.NEXT_PUBLIC_PHONE ?? '+17039401159',
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? '(703) 940-1159',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helpfulhomebuyersusa.com',
  }
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
