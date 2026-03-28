import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendSmsNotification } from '@/lib/ghl-on-market'

export const maxDuration = 30

const HARD_NO = ['not interested', 'remove me', 'stop', 'unsubscribe', 'do not contact']
const WARM = ['yes', 'interested', 'sounds good', 'tell me more', 'call me', 'send offer', 'let me know']
const ESCALATE = ['too low', 'need more', 'seller wants', 'can you do', 'best price', "won't work", 'asking price', 'full price']

function detectIntent(msg: string): 'warm' | 'escalate' | 'dead' | 'neutral' {
  const lower = msg.toLowerCase()
  if (HARD_NO.some(kw => lower.includes(kw))) return 'dead'
  if (WARM.some(kw => lower.includes(kw))) return 'warm'
  if (ESCALATE.some(kw => lower.includes(kw))) return 'escalate'
  return 'neutral'
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-ghl-signature') ?? req.headers.get('x-webhook-secret')
  if (process.env.GHL_OM_WEBHOOK_SECRET && secret !== process.env.GHL_OM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const contactId: string = body.contactId ?? body.contact_id ?? body.data?.contactId ?? ''
  const messageBody: string = body.message?.body ?? body.body ?? body.text ?? ''
  const messageType: string = body.type ?? body.messageType ?? 'inbound'

  if (!contactId || messageType !== 'inbound') return NextResponse.json({ ok: true })

  const { data: log } = await supabase
    .from('outreach_log')
    .select('lead_id')
    .eq('ghl_contact_id', contactId)
    .order('sent_at', { ascending: false })
    .limit(1)
    .single()

  if (!log) return NextResponse.json({ ok: true })

  const { data: lead } = await supabase
    .from('mls_leads')
    .select('status, address, agent_name, max_offer, offer_strategy')
    .eq('id', log.lead_id)
    .single()

  if (!lead || lead.status === 'dead') return NextResponse.json({ ok: true })

  const intent = detectIntent(messageBody)
  const now = new Date().toISOString()

  await supabase.from('mls_leads').update({ responded_at: now }).eq('id', log.lead_id).is('responded_at', null)

  if (intent === 'dead') {
    await supabase.from('mls_leads').update({ status: 'dead' }).eq('id', log.lead_id)
    return NextResponse.json({ ok: true, action: 'dead' })
  }

  if (intent === 'warm') {
    const newStatus = lead.offer_strategy === 'creative' ? 'warm_creative' : 'warm_cash'
    await supabase.from('mls_leads').update({ status: newStatus, warm_at: now }).eq('id', log.lead_id)

    const jeffPhone = process.env.JEFF_PHONE
    if (jeffPhone) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
      await sendSmsNotification(
        jeffPhone,
        `Warm lead: ${lead.address}\nAgent: ${lead.agent_name}\nOffer: $${lead.max_offer?.toLocaleString()}\nType: ${newStatus}\n${siteUrl}/mls-offers`
      )
    }
    return NextResponse.json({ ok: true, action: 'warm', status: newStatus })
  }

  if (intent === 'escalate') {
    await supabase.from('mls_leads').update({ offer_strategy: 'creative' }).eq('id', log.lead_id)
    return NextResponse.json({ ok: true, action: 'escalated' })
  }

  return NextResponse.json({ ok: true, action: 'neutral' })
}
