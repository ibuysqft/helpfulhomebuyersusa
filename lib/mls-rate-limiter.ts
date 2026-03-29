// lib/mls-rate-limiter.ts

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder-service-key'
)

export interface BudgetStatus {
  canSendEmail: boolean
  canSendSms: boolean
  emailRemaining: number
  smsRemaining: number
  paused: boolean
  pauseReason: string | null
}

async function getTodayBudget() {
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await supabase
    .from('daily_send_budget')
    .select('*')
    .eq('date', today)
    .single()
  if (existing) return existing

  // Warmup: auto-set limits based on days since first record
  const { data: first } = await supabase
    .from('daily_send_budget')
    .select('date')
    .order('date', { ascending: true })
    .limit(1)
    .single()

  const days = first?.date
    ? Math.floor((Date.now() - new Date(first.date).getTime()) / 86_400_000)
    : 0

  const emailLimit = days >= 28 ? 80 : days >= 14 ? 40 : 20
  const smsLimit = days >= 28 ? 40 : days >= 14 ? 20 : 10

  const { data: created } = await supabase
    .from('daily_send_budget')
    .insert({ date: today, email_limit: emailLimit, sms_limit: smsLimit })
    .select()
    .single()
  return created
}

export async function getBudgetStatus(): Promise<BudgetStatus> {
  const b = await getTodayBudget()
  if (!b)
    return {
      canSendEmail: false,
      canSendSms: false,
      emailRemaining: 0,
      smsRemaining: 0,
      paused: true,
      pauseReason: 'budget unavailable',
    }
  return {
    canSendEmail: !b.paused && b.email_sent < b.email_limit,
    canSendSms: !b.paused && b.sms_sent < b.sms_limit,
    emailRemaining: Math.max(0, b.email_limit - b.email_sent),
    smsRemaining: Math.max(0, b.sms_limit - b.sms_sent),
    paused: b.paused,
    pauseReason: b.pause_reason,
  }
}

export async function incrementSendCount(
  channel: 'email' | 'sms'
): Promise<void> {
  const today = new Date().toISOString().split('T')[0]
  const field = channel === 'email' ? 'email_sent' : 'sms_sent'
  await supabase.rpc('increment_send_count', { p_date: today, p_field: field })
}

export async function pauseSending(reason: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0]
  await supabase
    .from('daily_send_budget')
    .update({ paused: true, pause_reason: reason })
    .eq('date', today)
}
