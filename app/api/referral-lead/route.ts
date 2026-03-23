import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_SITUATIONS = [
  'foreclosure',
  'probate',
  'divorce',
  'relocation',
  'behind-on-payments',
  'other',
  '',
] as const

function generateId(): string {
  return `ref_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

async function sendToGHL(params: {
  referrerName: string
  referrerEmail: string
  referrerPhone: string
  sellerName: string
  sellerAddress: string
  sellerPhone: string
  situation: string
  notes: string
}): Promise<{ success: boolean; contactId?: string }> {
  try {
    const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        firstName: params.sellerName.split(' ')[0] || params.sellerName,
        lastName: params.sellerName.split(' ').slice(1).join(' ') || '',
        phone: params.sellerPhone,
        address1: params.sellerAddress,
        tags: ['source-referral'],
        customField: [
          { key: 'referrer_name', field_value: params.referrerName },
          { key: 'referrer_email', field_value: params.referrerEmail },
          { key: 'referrer_phone', field_value: params.referrerPhone },
          { key: 'situation', field_value: params.situation },
          { key: 'notes', field_value: params.notes },
        ],
      }),
    })
    if (!res.ok) {
      console.error('[ghl-referral] contact creation failed:', await res.text())
      return { success: false }
    }
    const data = await res.json()
    return { success: true, contactId: data.contact?.id }
  } catch (err) {
    console.error('[ghl-referral] error:', err)
    return { success: false }
  }
}

async function sendConfirmationEmail(to: string, referrerName: string, sellerAddress: string) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Helpful Homebuyers USA <no-reply@helpfulhomebuyersusa.com>',
        to,
        subject: 'We received your referral — thank you!',
        html: `
          <p>Hi ${referrerName},</p>
          <p>We received your referral for <strong>${sellerAddress}</strong>. Our team will reach out to the seller shortly.</p>
          <p>Once we close, you'll receive your referral fee (typically $2,500–$5,000) by wire transfer within 5 business days.</p>
          <p>Questions? Call us at <a href="tel:+17039401159">(703) 940-1159</a>.</p>
          <p>— Helpful Homebuyers USA</p>
        `,
      }),
    })
  } catch (err) {
    console.error('[resend] confirmation email failed:', err)
  }
}

async function sendAlertEmail(params: {
  referrerName: string
  referrerEmail: string
  referrerPhone: string
  sellerName: string
  sellerAddress: string
  sellerPhone: string
  situation: string
  notes: string
}) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HHB Referrals <no-reply@helpfulhomebuyersusa.com>',
        to: 'jeff@helpfulhomebuyersusa.com',
        subject: `New referral from ${params.referrerName} — ${params.sellerAddress}`,
        html: `
          <h2>New Referral Lead</h2>
          <h3>Referrer</h3>
          <ul>
            <li><strong>Name:</strong> ${params.referrerName}</li>
            <li><strong>Email:</strong> ${params.referrerEmail}</li>
            <li><strong>Phone:</strong> ${params.referrerPhone}</li>
          </ul>
          <h3>Seller</h3>
          <ul>
            <li><strong>Name:</strong> ${params.sellerName || '(not provided)'}</li>
            <li><strong>Phone:</strong> ${params.sellerPhone}</li>
            <li><strong>Address:</strong> ${params.sellerAddress}</li>
            <li><strong>Situation:</strong> ${params.situation || '(not specified)'}</li>
          </ul>
          ${params.notes ? `<p><strong>Notes:</strong> ${params.notes}</p>` : ''}
        `,
      }),
    })
  } catch (err) {
    console.error('[resend] alert email failed:', err)
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const {
    referrer_name,
    referrer_email,
    referrer_phone,
    seller_name,
    seller_address,
    seller_phone,
    situation,
    notes,
  } = body

  if (!referrer_name?.trim() || !referrer_email?.trim()) {
    return NextResponse.json({ error: 'Your name and email are required.' }, { status: 400 })
  }

  if (!seller_address?.trim() || !seller_phone?.trim()) {
    return NextResponse.json({ error: 'Seller address and phone are required.' }, { status: 400 })
  }

  if (situation && !VALID_SITUATIONS.includes(situation as (typeof VALID_SITUATIONS)[number])) {
    return NextResponse.json({ error: 'Invalid situation value.' }, { status: 400 })
  }

  const id = generateId()

  const { error: dbError } = await supabase.from('referral_leads').insert({
    id,
    referrer_name: referrer_name.trim(),
    referrer_email: referrer_email.trim(),
    referrer_phone: referrer_phone?.trim() ?? null,
    seller_name: seller_name?.trim() ?? null,
    seller_address: seller_address.trim(),
    seller_phone: seller_phone.trim(),
    situation: situation?.trim() ?? null,
    notes: notes?.trim() ?? null,
    status: 'new',
  })

  if (dbError) {
    console.error('[supabase] referral insert failed:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us at (703) 940-1159.' },
      { status: 500 }
    )
  }

  // Non-blocking post-save actions
  const params = {
    referrerName: referrer_name.trim(),
    referrerEmail: referrer_email.trim(),
    referrerPhone: referrer_phone?.trim() ?? '',
    sellerName: seller_name?.trim() ?? '',
    sellerAddress: seller_address.trim(),
    sellerPhone: seller_phone.trim(),
    situation: situation?.trim() ?? '',
    notes: notes?.trim() ?? '',
  }

  void Promise.all([
    sendToGHL(params),
    sendConfirmationEmail(referrer_email.trim(), referrer_name.trim(), seller_address.trim()),
    sendAlertEmail(params),
  ])

  return NextResponse.json({ success: true })
}
