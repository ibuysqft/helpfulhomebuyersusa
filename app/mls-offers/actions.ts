'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type { MlsLeadStatus } from '@/lib/mls-types'

export async function updateMlsLeadStatusAction(
  id: string,
  status: MlsLeadStatus
): Promise<void> {
  await supabase.from('mls_leads').update({ status }).eq('id', id)
  revalidatePath('/mls-offers')
}

export async function queueForGhlAction(id: string): Promise<void> {
  await supabase.from('mls_leads').update({ status: 'queued' }).eq('id', id)
  revalidatePath('/mls-offers')
}

export async function forceSendLeadAction(id: string): Promise<{ ok: boolean; error?: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/cron/mls-outreach?leadId=${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET ?? ''}` },
  })
  if (!res.ok) return { ok: false, error: `HTTP ${res.status}` }
  return { ok: true }
}
