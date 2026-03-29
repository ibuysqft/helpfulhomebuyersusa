import { NextRequest, NextResponse } from 'next/server'
import { createOnMarketContact, enrollInSequence } from '@/lib/ghl-on-market'
import { getBudgetStatus, incrementSendCount } from '@/lib/mls-rate-limiter'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const budget = await getBudgetStatus()
  if (budget.paused) return NextResponse.json({ paused: true, reason: budget.pauseReason })
  if (!budget.canSendEmail) return NextResponse.json({ message: 'Daily email limit reached' })

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Force-send a single lead by ID (skips queue, skips contact dedup check)
  const forcedLeadId = req.nextUrl.searchParams.get('leadId')
  if (forcedLeadId) {
    const { data: forcedLead } = await sb
      .from('mls_leads')
      .select('*')
      .eq('id', forcedLeadId)
      .single()
    if (!forcedLead || !forcedLead.agent_email) {
      return NextResponse.json({ error: 'Lead not found or missing email' }, { status: 404 })
    }
    const toContact = [forcedLead]
    const results = { sent: 0, failed: 0 }
    const cashWorkflow     = process.env.GHL_OM_CASH_WORKFLOW_ID ?? ''
    const creativeWorkflow = process.env.GHL_OM_CREATIVE_WORKFLOW_ID ?? ''
    for (const lead of toContact) {
      const contact = await createOnMarketContact({
        agentName:  lead.agent_name ?? 'Agent',
        agentEmail: lead.agent_email,
        agentPhone: lead.agent_phone ?? '',
        address:    lead.address,
        tags: ['mls-outreach', (lead.distress_score ?? 0) >= 8 ? 'heavy-distress' : 'moderate-distress'],
      })
      if (!contact.success || !contact.contactId) { results.failed++; continue }
      const workflowId = lead.offer_strategy === 'creative' ? creativeWorkflow : cashWorkflow
      const enrolled = await enrollInSequence(contact.contactId, workflowId)
      if (!enrolled.success) { results.failed++; continue }
      await sb.from('mls_leads').update({ status: 'contacted', contacted_at: new Date().toISOString() }).eq('id', lead.id)
      await sb.from('outreach_log').insert({
        lead_id: lead.id, channel: 'email', ghl_contact_id: contact.contactId,
        sequence_id: workflowId,
        message_preview: `Cash offer: ${lead.address} — $${lead.max_offer?.toLocaleString() ?? '?'}`,
      })
      await incrementSendCount('email')
      results.sent++
    }
    return NextResponse.json(results)
  }

  // Priority: agent submissions first, then score 8–10, then 6–7
  const { data: queued } = await sb
    .from('mls_leads')
    .select('*')
    .eq('status', 'queued')
    .not('agent_email', 'is', null)
    .order('source', { ascending: false }) // agent_submission > dealsauce alphabetically
    .order('distress_score', { ascending: false })
    .limit(budget.emailRemaining)

  // Exclude already-contacted leads
  const alreadyContactedQuery = await sb
    .from('outreach_log').select('lead_id')
  const contactedIds = new Set((alreadyContactedQuery.data ?? []).map((r: { lead_id: string }) => r.lead_id))

  const toContact = (queued ?? []).filter((l: { id: string }) => !contactedIds.has(l.id))

  if (!toContact.length) return NextResponse.json({ message: 'No leads ready' })

  const results = { sent: 0, failed: 0 }
  const cashWorkflow     = process.env.GHL_OM_CASH_WORKFLOW_ID ?? ''
  const creativeWorkflow = process.env.GHL_OM_CREATIVE_WORKFLOW_ID ?? ''

  for (const lead of toContact) {
    if (!lead.agent_email) continue

    const contact = await createOnMarketContact({
      agentName:  lead.agent_name ?? 'Agent',
      agentEmail: lead.agent_email,
      agentPhone: lead.agent_phone ?? '',
      address:    lead.address,
      tags: ['mls-outreach', (lead.distress_score ?? 0) >= 8 ? 'heavy-distress' : 'moderate-distress'],
    })

    if (!contact.success || !contact.contactId) { results.failed++; continue }

    const workflowId = lead.offer_strategy === 'creative' ? creativeWorkflow : cashWorkflow
    const enrolled = await enrollInSequence(contact.contactId, workflowId)
    if (!enrolled.success) { results.failed++; continue }

    await sb.from('mls_leads').update({
      status: 'contacted',
      contacted_at: new Date().toISOString(),
    }).eq('id', lead.id)

    await sb.from('outreach_log').insert({
      lead_id:         lead.id,
      channel:         'email',
      ghl_contact_id:  contact.contactId,
      sequence_id:     workflowId,
      message_preview: `Cash offer: ${lead.address} — $${lead.max_offer?.toLocaleString() ?? '?'}`,
    })

    await incrementSendCount('email')
    results.sent++
  }

  return NextResponse.json(results)
}
