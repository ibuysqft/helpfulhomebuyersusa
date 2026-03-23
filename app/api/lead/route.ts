import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { supabase } from '@/lib/supabase'
import { sendToGHL } from '@/lib/ghl'

// Required env vars: RETELL_API_KEY, GHL_API_KEY, GHL_LOCATION_ID

/**
 * Trigger Retell outbound call to lead (non-blocking).
 * Uses Shelby outbound agent (agent_40da2f733e42df807a89c669d6) from +17036915670.
 */
const triggerOutboundCall = async (phone: string, contactId: string, sourceUrl: string) => {
  try {
    const retellApiKey = process.env.RETELL_API_KEY
    const agentId = 'agent_40da2f733e42df807a89c669d6' // Shelby outbound

    await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_number: '+17036915670',
        to_number: phone,
        agent_id: agentId,
        retell_llm_dynamic_variables: {
          contact_id: contactId,
          source_url: sourceUrl,
          lead_phone: phone,
        },
      }),
    })
  } catch (err) {
    console.error('[retell-outbound] trigger failed:', err)
    // Non-blocking — don't throw, lead is already saved
  }
}

/**
 * Assign GHL contact to a pipeline opportunity based on source URL.
 * Pipelines: Pre-Foreclosure (default), Bankruptcy, Probate.
 * Required env vars: GHL_API_KEY, GHL_LOCATION_ID
 */
const assignToPipeline = async (contactId: string, sourceUrl: string) => {
  // Determine pipeline based on source URL
  let pipelineId = 'OxuePj0tZVptQQb6tVLg' // Default: Pre-Foreclosure

  if (sourceUrl?.includes('bankruptcy') || sourceUrl?.includes('chapter')) {
    pipelineId = 'CnYoJ4xAAjhM4MfYk0Po' // Bankruptcy
  } else if (sourceUrl?.includes('probate') || sourceUrl?.includes('estate') || sourceUrl?.includes('inherited')) {
    pipelineId = 'OsChWDlo8VZVOb6ENFl9' // Probate
  }

  try {
    await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        pipelineId,
        locationId: process.env.GHL_LOCATION_ID,
        contactId,
        name: `Lead from ${sourceUrl || 'website'}`,
        pipelineStageId: null, // First stage
        status: 'open',
      }),
    })
  } catch (err) {
    console.error('[ghl-pipeline] assignment failed:', err)
  }
}

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
  'Move-In Ready',
  'Minor Repairs',
  'Major Repairs',
  'Tear-Down',
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

  const { address, phone, condition, website, name, firstName, lastName, email, situation, property_type, propertyType, timeline } = body
  const resolvedName = name?.trim() || [firstName, lastName].filter(Boolean).join(' ') || undefined

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
    name: resolvedName,
    email: email?.trim(),
    situation: situation?.trim(),
    property_type: (property_type ?? propertyType)?.trim(),
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

  // Trigger outbound call + pipeline assignment + server-side conversions post-response (non-blocking)
  // Runs even if GHL failed, as long as Supabase save succeeded
  const contactId = ghlResult.contactId ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  after(async () => {
    await triggerOutboundCall(phone.trim(), contactId, referer)
    if (contactId) {
      await assignToPipeline(contactId, referer)
    }
    // Server-side Meta Conversions API — bypasses ad blockers
    try {
      await fetch(`${siteUrl}/api/conversions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Lead',
          email: email?.trim(),
          phone: phone.trim(),
          value: 1500,
        }),
      })
    } catch (err) {
      console.error('[lead-route] conversions API call failed:', err)
    }
  })

  return NextResponse.json({ success: true })
}
