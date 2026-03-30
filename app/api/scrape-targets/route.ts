import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('scrape_targets')
    .select('id, type, value, state, active, min_price, max_price, min_beds, min_baths, max_dom, property_types')
    .eq('active', true)
    .order('state')
    .order('type')
    .order('value')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ targets: data ?? [] })
}
