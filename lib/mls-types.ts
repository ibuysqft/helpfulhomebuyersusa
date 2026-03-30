// lib/mls-types.ts

export interface ScrapeTargetFilters {
  // Lead Types
  lead_types?: string[]
  lead_types_match_all?: boolean
  owner_types?: string[]
  listing_status?: string[]

  // Sellability Scores (0–999)
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

export interface ScrapeTarget {
  id: string
  type: 'county' | 'city' | 'zip' | 'state'
  value: string
  state: string
  active: boolean
  filters: ScrapeTargetFilters
  created_at: string
}

export type MlsLeadStatus =
  | 'new' | 'scored' | 'queued' | 'contacted'
  | 'warm_cash' | 'warm_creative' | 'dead' | 'retail' | 'disqualified' | 'needs_review'

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
