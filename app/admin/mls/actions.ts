'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

function adminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function cronHeaders() {
  return { Authorization: `Bearer ${process.env.CRON_SECRET}` }
}

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://helpfulhomebuyersusa.com'
}

export async function runScrapeAction(): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${appUrl()}/api/cron/mls-scrape`, {
      method: 'POST',
      headers: cronHeaders(),
    })
    const json = await res.json() as { inserted?: number; skipped?: number; error?: string }
    if (!res.ok) return { ok: false, message: json.error ?? 'Scrape failed' }
    return { ok: true, message: `Inserted ${json.inserted ?? 0}, skipped ${json.skipped ?? 0}` }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Network error' }
  }
}

export async function runScoreAction(): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${appUrl()}/api/cron/mls-score`, {
      method: 'POST',
      headers: cronHeaders(),
    })
    const json = await res.json() as { scored?: number; error?: string }
    if (!res.ok) return { ok: false, message: json.error ?? 'Score failed' }
    return { ok: true, message: `Scored ${json.scored ?? 0} leads` }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Network error' }
  }
}

export async function runOutreachAction(): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${appUrl()}/api/cron/mls-outreach`, {
      method: 'POST',
      headers: cronHeaders(),
    })
    const json = await res.json() as { sent?: number; failed?: number; message?: string; paused?: boolean; error?: string }
    if (!res.ok) return { ok: false, message: json.error ?? 'Outreach failed' }
    if (json.paused) return { ok: false, message: 'Sending is paused' }
    if (json.message) return { ok: true, message: json.message }
    return { ok: true, message: `Sent ${json.sent ?? 0}, failed ${json.failed ?? 0}` }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Network error' }
  }
}

export async function togglePauseAction(paused: boolean): Promise<void> {
  const sb = adminSupabase()
  const today = new Date().toISOString().split('T')[0]
  await sb
    .from('daily_send_budget')
    .update({ paused, pause_reason: paused ? 'Manually paused from admin' : null })
    .eq('date', today)
  revalidatePath('/admin/mls')
}

export async function updateDailyLimitsAction(emailLimit: number, smsLimit: number): Promise<void> {
  const sb = adminSupabase()
  const today = new Date().toISOString().split('T')[0]
  const { data: existing } = await sb
    .from('daily_send_budget')
    .select('id')
    .eq('date', today)
    .single()

  if (existing) {
    await sb
      .from('daily_send_budget')
      .update({ email_limit: emailLimit, sms_limit: smsLimit })
      .eq('date', today)
  } else {
    await sb.from('daily_send_budget').insert({
      date: today,
      email_limit: emailLimit,
      sms_limit: smsLimit,
    })
  }
  revalidatePath('/admin/mls')
}
