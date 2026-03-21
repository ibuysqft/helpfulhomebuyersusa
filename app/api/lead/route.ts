import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { supabase } from '@/lib/supabase'
import { sendToGHL } from '@/lib/ghl'

const VALID_CONDITIONS = [
  'Good',
  'Fair',
  'Poor',
  'Very Poor',
  // Funnel condition values
  'Move-in ready',
  'Needs minor repairs',
  'Needs major repairs/renovation',
  'Uninhabitable',
] as const

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rateLimit = await checkRateLimit(ip)
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please call us at (703) 940-1159.' },
      { status: 429 }
    )
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { address, phone, condition, website, name, email, situation, property_type, timeline } = body

  // Honeypot
  if (website) return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })

  if (!address?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Condition is optional for the funnel (still validated when provided from old form)
  if (condition && !VALID_CONDITIONS.includes(condition as (typeof VALID_CONDITIONS)[number])) {
    return NextResponse.json({ error: 'Invalid condition value' }, { status: 400 })
  }

  const referer = req.headers.get('referer') ?? ''
  const url = new URL(referer || 'http://localhost')
  const sourceCity = url.pathname.match(/sell-my-house-fast-(.+)-va/)?.[1]?.replace(/-/g, ' ') ?? ''

  const { error: dbError } = await supabase.from('leads').insert({
    address: address.trim(),
    phone: phone.trim(),
    condition: condition ?? null,
    source_url: referer,
    source_city: sourceCity,
    utm_source: url.searchParams.get('utm_source'),
    utm_medium: url.searchParams.get('utm_medium'),
    utm_campaign: url.searchParams.get('utm_campaign'),
    device: req.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
    ghl_status: 'pending',
  })

  if (dbError) {
    console.error('Supabase insert failed:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us at (703) 940-1159.' },
      { status: 500 }
    )
  }

  const ghlResult = await sendToGHL({
    address: address.trim(),
    phone: phone.trim(),
    condition: condition ?? '',
    name: name?.trim(),
    email: email?.trim(),
    situation: situation?.trim(),
    property_type: property_type?.trim(),
    timeline: timeline?.trim(),
    sourceUrl: referer,
    sourceCity,
    utmSource: url.searchParams.get('utm_source'),
    utmMedium: url.searchParams.get('utm_medium'),
    utmCampaign: url.searchParams.get('utm_campaign'),
  })

  // Update GHL status (non-blocking on failure — lead is already saved)
  await supabase
    .from('leads')
    .update({
      ghl_status: ghlResult.success ? 'success' : 'failed',
      ghl_contact_id: ghlResult.contactId ?? null,
    })
    .eq('phone', phone.trim())
    .order('created_at', { ascending: false })
    .limit(1)

  return NextResponse.json({ success: true })
}
