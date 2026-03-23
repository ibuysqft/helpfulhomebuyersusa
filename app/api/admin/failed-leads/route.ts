import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!ADMIN_PASSWORD) return false
  return adminToken?.value === Buffer.from(ADMIN_PASSWORD).toString('base64')
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, address, phone, condition, source_url, source_city, ghl_status, ghl_retry_count, ghl_last_retry_at, created_at')
    .eq('ghl_status', 'failed')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ leads: leads ?? [] })
}
