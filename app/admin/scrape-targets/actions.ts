'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type { ScrapeTargetFilters } from '@/lib/mls-types'

// Use same var as the cron route so one env var covers both
const SCRAPER_URL    = process.env.DEALSAUCE_SCRAPER_URL ?? process.env.SCRAPER_URL ?? ''
const SCRAPER_SECRET = process.env.DEALSAUCE_SCRAPER_SECRET ?? process.env.SCRAPER_SECRET ?? ''

export async function addTargetAction(formData: FormData): Promise<void> {
  const type = formData.get('type') as string
  const value = (formData.get('value') as string).trim()
  const state = (formData.get('state') as string).toUpperCase().trim()

  if (!type || !value || !state) return

  await supabase
    .from('scrape_targets')
    .upsert({ type, value, state, active: true, filters: {} })

  revalidatePath('/admin/scrape-targets')
}

export async function toggleTargetAction(id: string, active: boolean): Promise<void> {
  await supabase.from('scrape_targets').update({ active }).eq('id', id)
  revalidatePath('/admin/scrape-targets')
}

export async function deleteTargetAction(id: string): Promise<void> {
  await supabase.from('scrape_targets').delete().eq('id', id)
  revalidatePath('/admin/scrape-targets')
}

export async function updateTargetFiltersAction(
  id: string,
  filters: ScrapeTargetFilters,
): Promise<void> {
  await supabase.from('scrape_targets').update({ filters }).eq('id', id)
  revalidatePath('/admin/scrape-targets')
}

export async function runScraperAction(
  adhoc?: { type: string; value: string; state: string; filters: ScrapeTargetFilters }
): Promise<{ ok: boolean; count?: number; error?: string }> {
  if (!SCRAPER_URL) return { ok: false, error: 'SCRAPER_URL env var not set' }

  try {
    const body = adhoc ? JSON.stringify({ targets: [adhoc] }) : undefined
    const res = await fetch(`${SCRAPER_URL}/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(SCRAPER_SECRET ? { 'x-scraper-secret': SCRAPER_SECRET } : {}),
      },
      body,
      signal: AbortSignal.timeout(300_000),
    })
    const json = await res.json() as { count?: number; error?: string }
    if (!res.ok || json.error) return { ok: false, error: json.error ?? `HTTP ${res.status}` }
    return { ok: true, count: json.count }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'fetch failed' }
  }
}
