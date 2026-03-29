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
