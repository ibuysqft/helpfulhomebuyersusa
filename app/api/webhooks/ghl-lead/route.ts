import { NextRequest, NextResponse } from 'next/server'
import { createDealFromGHL } from '@/lib/deals'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (
    process.env.GHL_LEAD_WEBHOOK_SECRET &&
    secret !== process.env.GHL_LEAD_WEBHOOK_SECRET
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const contactId =
    (body.contactId as string) ??
    (body.contact_id as string) ??
    ((body.data as Record<string, unknown>)?.contactId as string) ??
    ''

  const address =
    (body.address as string) ??
    (body.full_address as string) ??
    ((body.customFields as Record<string, string>)?.property_address as string) ??
    'Address not provided'

  const sellerName =
    (body.fullName as string) ??
    (body.full_name as string) ??
    `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim() ??
    undefined

  const sellerPhone =
    (body.phone as string) ?? (body.phoneNumber as string) ?? undefined

  if (!contactId) {
    return NextResponse.json({ error: 'Missing contactId' }, { status: 400 })
  }

  try {
    const deal = await createDealFromGHL({
      ghlContactId: contactId,
      address,
      sellerName: sellerName || undefined,
      sellerPhone: sellerPhone || undefined,
    })
    return NextResponse.json({ ok: true, dealId: deal.id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    if (msg.includes('duplicate') || msg.includes('unique')) {
      return NextResponse.json({ ok: true, skipped: 'duplicate' })
    }
    console.error('[ghl-lead-webhook]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
