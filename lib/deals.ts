// lib/deals.ts

import { supabase } from '@/lib/supabase'
import type { Deal, DealStage } from '@/lib/types/deals'

export async function getAllDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*, deal_tasks(*)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch deals: ${error.message}`)
  return (data ?? []) as Deal[]
}

export async function getDealById(id: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select('*, deal_tasks(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Deal
}

export async function createDealFromGHL(params: {
  ghlContactId: string
  address: string
  sellerName?: string
  sellerPhone?: string
}): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .insert({
      ghl_contact_id: params.ghlContactId,
      address: params.address,
      seller_name: params.sellerName ?? null,
      seller_phone: params.sellerPhone ?? null,
      stage: 'new',
    })
    .select('*, deal_tasks(*)')
    .single()

  if (error) throw new Error(`Failed to create deal: ${error.message}`)
  return data as Deal
}

export async function updateDealStage(
  id: string,
  stage: DealStage
): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .update({ stage, last_stage_change: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`Failed to update stage: ${error.message}`)
}

export async function snoozeDeal(id: string): Promise<void> {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0)

  const { error } = await supabase
    .from('deals')
    .update({ snoozed_until: tomorrow.toISOString() })
    .eq('id', id)

  if (error) throw new Error(`Failed to snooze deal: ${error.message}`)
}

export async function setAiFlag(
  id: string,
  flag: boolean,
  reason: string | null
): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .update({ ai_flag: flag, ai_flag_reason: reason })
    .eq('id', id)

  if (error) throw new Error(`Failed to set AI flag: ${error.message}`)
}

export async function createTask(params: {
  dealId: string
  title: string
  dueDate?: string
}): Promise<void> {
  const { error } = await supabase.from('deal_tasks').insert({
    deal_id: params.dealId,
    title: params.title,
    due_date: params.dueDate ?? null,
  })

  if (error) throw new Error(`Failed to create task: ${error.message}`)
}

export async function completeTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('deal_tasks')
    .update({ completed: true })
    .eq('id', taskId)

  if (error) throw new Error(`Failed to complete task: ${error.message}`)
}

export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('deal_tasks')
    .delete()
    .eq('id', taskId)

  if (error) throw new Error(`Failed to delete task: ${error.message}`)
}

export async function updateDealExitStrategy(
  id: string,
  exitStrategy: string | null
): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .update({ exit_strategy: exitStrategy })
    .eq('id', id)

  if (error) throw new Error(`Failed to update exit strategy: ${error.message}`)
}

/** Returns deals that are urgent: overdue tasks, AI flagged, or stale 7+ days */
export function getHotDeals(deals: Deal[]): Deal[] {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  return deals.filter((deal) => {
    if (deal.stage === 'closed' || deal.stage === 'dead') return false
    if (deal.snoozed_until && new Date(deal.snoozed_until) > now) return false
    if (deal.ai_flag) return true
    if (new Date(deal.last_stage_change) < sevenDaysAgo) return true
    const hasOverdueTask = deal.deal_tasks.some(
      (t) => !t.completed && t.due_date && new Date(t.due_date) < now
    )
    return hasOverdueTask
  })
}

/** Returns card aging class based on days since last stage change */
export function getAgingClass(lastStageChange: string): string {
  const days =
    (Date.now() - new Date(lastStageChange).getTime()) / (1000 * 60 * 60 * 24)
  if (days >= 7) return 'border-red-500'
  if (days >= 3) return 'border-amber-500'
  return 'border-slate-700'
}
