'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function addTargetAction(formData: FormData): Promise<void> {
  const type = formData.get('type') as string
  const value = (formData.get('value') as string).trim()
  const state = (formData.get('state') as string).toUpperCase().trim()

  if (!type || !value || !state) return

  await supabase
    .from('scrape_targets')
    .upsert({ type, value, state, active: true })

  revalidatePath('/admin/scrape-targets')
}

export async function toggleTargetAction(
  id: string,
  active: boolean,
): Promise<void> {
  await supabase
    .from('scrape_targets')
    .update({ active })
    .eq('id', id)

  revalidatePath('/admin/scrape-targets')
}

export async function deleteTargetAction(id: string): Promise<void> {
  await supabase
    .from('scrape_targets')
    .delete()
    .eq('id', id)

  revalidatePath('/admin/scrape-targets')
}
