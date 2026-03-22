import { getStateConfig } from '@/lib/state-context'

const stateConfig = getStateConfig()

export const siteConfig = {
  name: 'Helpful Home Buyers USA',
  url: stateConfig.siteUrl,
  phone: stateConfig.phone,
  phoneDisplay: stateConfig.phoneDisplay,
  email: `info@${stateConfig.siteUrl.replace('https://', '')}`,
  address: {
    region: stateConfig.markets[0] ?? stateConfig.name,
    state: stateConfig.abbr,
    country: 'US',
  },
  markets: stateConfig.markets,
  stateName: stateConfig.name,
  stateAbbr: stateConfig.abbr,
  stateSlug: stateConfig.slug,
  isNational: stateConfig.isNational,
} as const
