// lib/mls-types.ts

export interface ScrapeTarget {
  id: string
  type: 'county' | 'city' | 'zip' | 'state'
  value: string
  state: string
  active: boolean
  min_price: number | null
  max_price: number | null
  min_beds: number | null
  min_baths: number | null
  max_dom: number | null
  property_types: string[] | null
  created_at: string
}

export type MlsLeadStatus =
  | 'new' | 'scored' | 'queued' | 'contacted'
  | 'warm_cash' | 'warm_creative' | 'dead' | 'retail' | 'disqualified'

export type MlsLeadSource = 'dealsauce' | 'agent_submission'
export type OfferStrategy = 'cash' | 'creative'

export interface DistressSignals {
  kitchen: number
  bathrooms: number
  flooring: number
  ceilings_walls: number
  exterior_roof: number
  structural: number
  [key: string]: number | boolean | undefined
}

export interface MlsLead {
  id: string
  mls_number: string
  address: string
  list_price: number | null
  beds: number | null
  baths: number | null
  sqft: number | null
  agent_name: string | null
  agent_email: string | null
  agent_phone: string | null
  dealsauce_wholesale: number | null
  comp_arv: number | null
  max_offer: number | null
  repair_estimate_low: number | null
  repair_estimate_high: number | null
  distress_score: number | null
  distress_signals: DistressSignals | null
  photo_count: number | null
  description_keywords: string[] | null
  source: MlsLeadSource
  status: MlsLeadStatus
  offer_strategy: OfferStrategy | null
  created_at: string
  contacted_at: string | null
  responded_at: string | null
  warm_at: string | null
}

export interface DealSauceLead {
  mlsNumber: string
  address: string
  listPrice: number
  beds: number
  baths: number
  sqft: number
  agentName: string
  agentEmail: string
  agentPhone: string
  wholesaleValue: number
  description: string
  county: string
}

export interface PhotoScoreResult {
  distressScore: number
  signals: DistressSignals
  repairEstimateLow: number
  repairEstimateHigh: number
  photoCount: number
  signalDescriptions: string[]
}

export interface CompValidationResult {
  compArv: number
  dealSauceArv: number
  anchorArv: number
  maxOffer: number
  repairMid: number
  divergent: boolean
}
