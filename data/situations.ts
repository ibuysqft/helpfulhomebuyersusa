export const situationDefs = [
  { key: 'foreclosure',   label: 'Facing Foreclosure?',     icon: 'Home',       description: 'Stop foreclosure fast with a cash sale before the auction.' },
  { key: 'probate',       label: 'Probate / Estate Sale',   icon: 'FileText',   description: 'Sell an inherited property quickly without the hassle.' },
  { key: 'tax-lien',      label: 'Behind on Property Taxes?', icon: 'Receipt',  description: 'We buy houses with tax liens — pay nothing at closing.' },
  { key: 'divorce',       label: 'Going Through Divorce?',  icon: 'Scale',      description: 'Fast, fair cash sale to simplify the division of assets.' },
  { key: 'inherited',     label: 'Inherited a House?',      icon: 'Key',        description: 'Sell as-is with no clean-up, repairs, or agent fees.' },
  { key: 'fire-damage',   label: 'Fire or Water Damage?',   icon: 'Flame',      description: 'We buy damaged homes in any condition, as-is.' },
  { key: 'vacant',        label: 'Vacant Property?',        icon: 'Building2',  description: "Stop paying taxes on a house you don't use." },
  { key: 'behind-payments', label: 'Behind on Payments?',  icon: 'CreditCard', description: 'Sell fast before it goes further into arrears.' },
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
