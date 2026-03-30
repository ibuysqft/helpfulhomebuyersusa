export const LEAD_TYPES = [
  { value: 'absentee_owners', label: 'Absentee Owners' },
  { value: 'active_investor_owned', label: 'Active Investor Owned' },
  { value: 'active_listing', label: 'Active Listing' },
  { value: 'bored_investor', label: 'Bored Investor' },
  { value: 'cash_buyers', label: 'Cash Buyers' },
  { value: 'delinquent_tax', label: 'Delinquent Tax Activity' },
  { value: 'flipped', label: 'Flipped' },
  { value: 'foreclosure_activity', label: 'Foreclosure Activity' },
  { value: 'foreclosures', label: 'Foreclosures' },
  { value: 'free_and_clear', label: 'Free & Clear' },
  { value: 'high_equity', label: 'High Equity' },
  { value: 'long_term_owner', label: 'Long-Term Owner' },
  { value: 'low_equity', label: 'Low Equity' },
  { value: 'potentially_inherited', label: 'Potentially Inherited' },
  { value: 'pre_foreclosures', label: 'Pre-Foreclosures' },
  { value: 'upside_down', label: 'Upside Down' },
  { value: 'vacancy', label: 'Vacancy' },
  { value: 'zombie_property', label: 'Zombie Property' },
] as const

export const PROPERTY_TYPES = [
  { value: 'single_family', label: 'Single Family' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'mobile', label: 'Mobile Home' },
  { value: 'commercial', label: 'Commercial' },
] as const

export const OWNER_TYPES = [
  { value: 'individual', label: 'Individual' },
  { value: 'llc', label: 'LLC' },
  { value: 'trust', label: 'Trust' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'government', label: 'Government' },
] as const

export const LISTING_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'coming_soon', label: 'Coming Soon' },
  { value: 'sold', label: 'Sold' },
] as const

export const AMENITIES = [
  { value: 'ac', label: 'AC' },
  { value: 'basement', label: 'Basement' },
  { value: 'fireplace', label: 'Fireplace' },
  { value: 'garage', label: 'Garage' },
  { value: 'heat', label: 'Heat' },
  { value: 'patio', label: 'Patio' },
  { value: 'pool', label: 'Pool' },
  { value: 'porch', label: 'Porch' },
  { value: 'sewer', label: 'Sewer' },
  { value: 'water_service', label: 'Water Service' },
  { value: 'waterfront', label: 'Waterfront' },
] as const

export const LOAN_TYPES = [
  { value: 'all', label: 'All Loan Types' },
  { value: 'conventional', label: 'Conventional' },
  { value: 'fha', label: 'FHA' },
  { value: 'va', label: 'VA' },
  { value: 'usda', label: 'USDA' },
  { value: 'reverse', label: 'Reverse Mortgage' },
  { value: 'heloc', label: 'HELOC' },
  { value: 'commercial', label: 'Commercial' },
] as const

export const MORTGAGE_FINANCE_TYPES = [
  { value: 'all', label: 'All Finance Types' },
  { value: 'arm', label: 'Adjustable Rate (ARM)' },
  { value: 'fixed', label: 'Fixed Rate' },
  { value: 'balloon', label: 'Balloon' },
  { value: 'interest_only', label: 'Interest Only' },
] as const

export const LAST_SALE_DATE_OPTIONS = [
  { value: 'all', label: 'All Sale Dates' },
  { value: '1y', label: 'Last 1 Year' },
  { value: '2y', label: 'Last 2 Years' },
  { value: '5y', label: 'Last 5 Years' },
  { value: '10y', label: 'Last 10 Years' },
  { value: '20y', label: 'Last 20 Years' },
  { value: '20y_plus', label: '20+ Years Ago' },
] as const

export const DAYS_ON_MARKET_OPTIONS = [
  { value: 'all', label: 'All Listings' },
  { value: '7', label: '7 Days' },
  { value: '14', label: '14 Days' },
  { value: '30', label: '30 Days' },
  { value: '60', label: '60 Days' },
  { value: '90', label: '90 Days' },
  { value: '180', label: '180 Days' },
  { value: '365', label: '1 Year' },
] as const

export const HOA_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'yes', label: 'Has HOA' },
  { value: 'no', label: 'No HOA' },
] as const

export const SQFT_OPTIONS = [
  '500', '750', '1000', '1250', '1500', '1750', '2000',
  '2250', '2500', '2750', '3000', '3500', '4000', '5000',
  '7500', '10000',
] as const

export const LOT_SIZE_OPTIONS = [
  { value: '2000', label: '2,000 sqft' },
  { value: '4500', label: '4,500 sqft' },
  { value: '6534', label: '1/8 acre' },
  { value: '10890', label: '1/4 acre' },
  { value: '21780', label: '1/2 acre' },
  { value: '43560', label: '1 acre' },
  { value: '87120', label: '2 acres' },
  { value: '217800', label: '5 acres' },
  { value: '435600', label: '10 acres' },
] as const
