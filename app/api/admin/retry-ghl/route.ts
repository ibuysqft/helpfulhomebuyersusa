import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { sendToGHL } from '@/lib/ghl'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!ADMIN_PASSWORD) return false
  return adminToken?.value === Buffer.from(ADMIN_PASSWORD).toString('base64')
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing lead id' }, { status: 400 })

  const { data: lead, error: fetchError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  const result = await sendToGHL({
    address: lead.address,
    phone: lead.phone,
    condition: lead.condition ?? '',
    sourceUrl: lead.source_url,
    sourceCity: lead.source_city,
    utmSource: lead.utm_source,
    utmMedium: lead.utm_medium,
    utmCampaign: lead.utm_campaign,
  })

  const newCount = (lead.ghl_retry_count ?? 0) + 1

  await supabase
    .from('leads')
    .update({
      ghl_status: result.success ? 'success' : 'failed',
      ghl_contact_id: result.contactId ?? lead.ghl_contact_id ?? null,
      ghl_retry_count: newCount,
      ghl_last_retry_at: new Date().toISOString(),
    })
    .eq('id', id)

  return NextResponse.json({
    success: result.success,
    error: result.error ?? null,
    retryCount: newCount,
  })
}
