import { after } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limit'

const GHL_API_URL = 'https://services.leadconnectorhq.com'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? 'Jy8irfJWPVtq3vycsvx4'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

async function saveSubscriber(email: string, stateSlug: string, stateName: string, source: string) {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('hhb_newsletter_subscribers')
    .upsert(
      {
        email: email.toLowerCase().trim(),
        state_slug: stateSlug,
        state_name: stateName,
        source,
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: 'email' },
    )
  if (error) {
    console.error('[newsletter] Supabase upsert error:', error.message)
  }
}

async function syncToGHL(email: string, stateSlug: string) {
  const apiKey = process.env.GHL_API_KEY
  if (!apiKey) return

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const body = {
      locationId: GHL_LOCATION_ID,
      email,
      source: 'hhb-newsletter',
      tags: [
        'hhb-newsletter',
        `hhb-newsletter-${stateSlug}`,
        'source-hhb-national',
      ].filter(Boolean),
      customFields: [
        { key: 'preferred_state', field_value: stateSlug },
      ],
    }

    const res = await fetch(`${GHL_API_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) {
      const text = await res.text()
      console.error('[newsletter] GHL error:', res.status, text)
    }
  } catch (err) {
    console.error('[newsletter] GHL sync failed:', err instanceof Error ? err.message : err)
  }
}

export async function POST(request: Request) {
  // Rate limit by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const { success } = await checkRateLimit(ip)
  if (!success) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email, state_slug, state_name } = body as {
    email?: string
    state_slug?: string
    state_name?: string
  }

  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  const resolvedSlug = (state_slug ?? 'national').toLowerCase().trim()
  const resolvedName = (state_name ?? '').trim()
  const source = resolvedSlug === 'national' ? 'national' : 'state-site'

  // Non-blocking: save to Supabase + sync to GHL after response is sent
  after(async () => {
    await saveSubscriber(email, resolvedSlug, resolvedName, source)
    await syncToGHL(email, resolvedSlug)
  })

  return Response.json({ ok: true }, { status: 200 })
}
