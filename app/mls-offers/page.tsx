import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { MlsOffersClient } from './MlsOffersClient'
import { supabase } from '@/lib/supabase'
import type { MlsLead } from '@/lib/mls-types'

async function isAuthenticated() {
  const jar = await cookies()
  const token = jar.get('admin_token')?.value
  if (!token) return false
  return token === Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')
}

export default async function MlsOffersPage() {
  if (!(await isAuthenticated())) redirect('/admin')

  const ALL_STATUSES = [
    'new', 'scored', 'queued', 'contacted',
    'warm_cash', 'warm_creative', 'dead', 'disqualified',
  ]

  const { data: leads } = await supabase
    .from('mls_leads')
    .select('*')
    .in('status', ALL_STATUSES)
    .order('created_at', { ascending: false })
    .limit(200)

  const { data: allStatuses } = await supabase.from('mls_leads').select('status')
  const counts = (allStatuses ?? []).reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {})

  return <MlsOffersClient leads={(leads as MlsLead[]) ?? []} statusCounts={counts} />
}
