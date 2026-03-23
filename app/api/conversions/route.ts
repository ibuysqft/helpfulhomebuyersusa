import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

interface ConversionPayload {
  event_name: string
  email?: string
  phone?: string
  value?: number
}

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

function normalizePhone(phone: string): string {
  // Strip non-digits, remove leading country code if present
  return phone.replace(/\D/g, '').replace(/^1/, '')
}

export async function POST(req: NextRequest) {
  const pixelId = process.env.FB_PIXEL_ID
  const accessToken = process.env.FB_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    // Missing config — fail silently, never block the caller
    console.warn('[conversions-api] FB_PIXEL_ID or FB_ACCESS_TOKEN not set')
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 })
  }

  let body: ConversionPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid_body' }, { status: 200 })
  }

  const { event_name, email, phone, value } = body

  if (!event_name) {
    return NextResponse.json({ ok: false, reason: 'missing_event_name' }, { status: 200 })
  }

  // Build user data object — only include fields that were provided
  const user_data: Record<string, string> = {}
  if (email?.trim()) {
    user_data.em = sha256(email)
  }
  if (phone?.trim()) {
    user_data.ph = sha256(normalizePhone(phone))
  }

  const eventPayload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data,
        ...(value != null ? { custom_data: { value, currency: 'USD' } } : {}),
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('[conversions-api] Meta responded with error:', res.status, text)
      return NextResponse.json({ ok: false, reason: 'meta_error' }, { status: 200 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Network failure — log and return 200 so callers never surface this to users
    console.error('[conversions-api] fetch failed:', err)
    return NextResponse.json({ ok: false, reason: 'fetch_failed' }, { status: 200 })
  }
}
