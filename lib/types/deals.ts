// lib/types/deals.ts

export type DealStage =
  | 'new'
  | 'contacted'
  | 'offer_sent'
  | 'under_contract'
  | 'closed'
  | 'dead'

export type DealClass = 'residential' | 'commercial'

export type ExitStrategy =
  | 'wholesale'
  | 'short_sale'
  | 'novation'
  | 'subject_to'
  | 'fix_flip'
  | 'retail'
  | null

export type AiFlagReason =
  | 'technical_fail'
  | 'hostile_recipient'
  | 'off_script'
  | null

export interface DealTask {
  id: string
  deal_id: string
  title: string
  due_date: string | null
  completed: boolean
  created_at: string
}

export interface Deal {
  id: string
  ghl_contact_id: string | null
  stage: DealStage
  deal_class: DealClass
  exit_strategy: ExitStrategy
  ai_flag: boolean
  ai_flag_reason: AiFlagReason
  address: string
  seller_name: string | null
  seller_phone: string | null
  assigned_to: string | null
  snoozed_until: string | null
  last_stage_change: string
  created_at: string
  updated_at: string
  deal_tasks: DealTask[]
}

export const STAGE_LABELS: Record<DealStage, string> = {
  new: 'New Lead',
  contacted: 'Contacted',
  offer_sent: 'Offer Sent',
  under_contract: 'Under Contract',
  closed: 'Closed',
  dead: 'Dead',
}

export const EXIT_STRATEGY_LABELS: Record<NonNullable<ExitStrategy>, string> = {
  wholesale: 'Wholesale',
  short_sale: 'Short Sale',
  novation: 'Novation',
  subject_to: 'Subject-To',
  fix_flip: 'Fix & Flip',
  retail: 'Retail',
}

export const ACTIVE_STAGES: DealStage[] = [
  'new',
  'contacted',
  'offer_sent',
  'under_contract',
]

export const AI_FLAG_LABELS: Record<NonNullable<AiFlagReason>, string> = {
  technical_fail: 'Tech Failure',
  hostile_recipient: 'Hostile',
  off_script: 'Off-Script',
}
