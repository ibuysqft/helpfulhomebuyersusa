export const situationDefs = [
  {
    key: 'foreclosure',
    label: 'Facing Foreclosure?',
    icon: 'Home',
    description: 'Stop foreclosure fast with a cash sale before the auction.',
    bullets: [
      'Cash offer within 24 hours',
      'We can close before your auction date',
      'Stops the foreclosure clock immediately',
      'No repairs, no showings, no commissions',
      'Protect your credit — avoid a foreclosure record',
    ],
  },
  {
    key: 'probate',
    label: 'Probate or Estate Sale',
    icon: 'FileText',
    description: 'We buy probate properties and pay the attorney fees — you keep the proceeds.',
    bullets: [
      'We pay probate attorney fees at closing',
      'No out-of-pocket legal costs for the estate',
      'Works with open and pending probate cases',
      'Heirs split the net proceeds — no delays',
      'We handle the paperwork with your attorney',
    ],
  },
  {
    key: 'tax-lien',
    label: 'Behind on Property Taxes?',
    icon: 'Receipt',
    description: 'We buy tax-delinquent houses and pay off all back taxes — you owe nothing at closing.',
    bullets: [
      'We pay off years of delinquent taxes at closing',
      'Stops county tax sale or seizure',
      'No out-of-pocket costs to you',
      'Cash in hand within 7 days',
      'Any amount of back taxes — we\'ve seen it all',
    ],
  },
  {
    key: 'short-sale',
    label: 'Need a Short Sale?',
    icon: 'TrendingDown',
    description: 'We negotiate your short sale with the lender — you pay nothing, walk away clean.',
    bullets: [
      'We handle all lender negotiations for you',
      'No deficiency judgment in most cases',
      'Stops foreclosure while we process the sale',
      'Zero out-of-pocket costs — we cover everything',
      'Most short sales close in 30–90 days',
    ],
  },
  {
    key: 'hecm-short-sale',
    label: 'Reverse Mortgage / HECM Short Sale',
    icon: 'Heart',
    description: 'Specializing in HECM reverse mortgage short sales — we work with your HUD servicer so you don\'t.',
    bullets: [
      'Experienced with HUD/FHA HECM short sale process',
      'We submit the short sale package to your servicer',
      'Heirs are protected from deficiency',
      'No cost to the borrower or estate',
      'Prevent foreclosure on a reverse mortgage property',
    ],
  },
  {
    key: 'title-issues',
    label: 'Title Problems? Liens or Judgments?',
    icon: 'Shield',
    description: 'We have attorneys on staff to cure title — we pay the legal fees and still close.',
    bullets: [
      'Our attorneys resolve liens, judgments, and clouds on title',
      'We pay all curative title legal fees',
      'Missing heirs, IRS liens, code violations — we handle it',
      'You don\'t need to hire your own lawyer',
      'Close after title is cleared — you still get your cash',
    ],
  },
  {
    key: 'sheriff-sale',
    label: 'Facing a Sheriff or Tax Sale?',
    icon: 'Gavel',
    description: 'We buy houses before they go to sheriff or tax sale — you keep the equity instead of losing it.',
    bullets: [
      'We can often close before your sale date',
      'You keep the equity — not the sheriff',
      'One call can stop the clock on a sale',
      'We know local court procedures and deadlines',
      'Cash in hand in as little as 7 days',
    ],
  },
  {
    key: 'divorce',
    label: 'Going Through Divorce?',
    icon: 'Scale',
    description: 'Fast, fair cash sale to simplify the division of assets.',
    bullets: [
      'Cash offer within 24 hours',
      'Close in 7 days or on your schedule',
      'Neutral buyer — no favoritism between parties',
      'Split the proceeds cleanly and move on',
      'No agents, no commissions, no delays',
    ],
  },
  {
    key: 'inherited',
    label: 'Inherited a House?',
    icon: 'Key',
    description: 'Sell an inherited property as-is with no clean-up, repairs, or agent fees.',
    bullets: [
      'Cash offer within 24 hours',
      'Buy as-is — leave anything behind',
      'Works with probate or already-cleared title',
      'No repairs, cleaning, or staging required',
      'We pay all closing costs',
    ],
  },
  {
    key: 'fire-damage',
    label: 'Fire or Water Damage?',
    icon: 'Flame',
    description: 'We buy fire-damaged and flood-damaged homes in any condition, as-is.',
    bullets: [
      'No repairs or remediation required',
      'Buy as-is regardless of damage extent',
      'Cash offer within 24 hours of walkthrough',
      'We handle demo and rebuild after closing',
      'No insurance claim complications',
    ],
  },
  {
    key: 'vacant',
    label: 'Vacant Property?',
    icon: 'Building2',
    description: 'Stop paying taxes and insurance on a house you don\'t use — sell it fast for cash.',
    bullets: [
      'Cash offer within 24 hours',
      'No need to clean out or secure the property',
      'Ends your ongoing tax and insurance burden',
      'We buy vacant lots and land too',
      'Close in 7 days',
    ],
  },
  {
    key: 'behind-payments',
    label: 'Behind on Mortgage Payments?',
    icon: 'CreditCard',
    description: 'Sell fast before it goes further into arrears or triggers foreclosure.',
    bullets: [
      'Cash offer within 24 hours',
      'Close in 7 days — before more missed payments',
      'We can often cover arrears at closing',
      'Stops the foreclosure clock',
      'No commissions, no fees, no repairs',
    ],
  },
] as const

export type SituationKey = typeof situationDefs[number]['key']

export function getSituations(stateSlug: string) {
  return situationDefs.map(def => ({
    ...def,
    slug: `${def.key}-help-${stateSlug}`,
  }))
}

/** Virginia backward-compat default */
export const situations = getSituations('virginia')
