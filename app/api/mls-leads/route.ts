import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const DISTRESS_KWS = ['as-is','as is','motivated','price reduced','estate sale','probate',
  'fixer','investor special','needs tlc','sold as-is']

function conditionScore(condition: string): number {
  if (condition === 'major') return 7
  if (condition === 'needs-work') return 5
  return 2
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { address, listPrice, beds, baths, sqft, condition, agentName, agentEmail, agentPhone, tcpaConsent, notes } = body

  if (!address || !agentEmail || !agentName) {
    return NextResponse.json({ error: 'address, agentName, agentEmail required' }, { status: 400 })
  }
  if (!tcpaConsent) {
    return NextResponse.json({ error: 'TCPA consent required' }, { status: 400 })
  }

  // Deduplicate
  const { data: dup } = await supabase
    .from('mls_leads').select('id')
    .eq('address', address.trim())
    .eq('agent_email', agentEmail.trim().toLowerCase())
    .limit(1).single()

  if (dup) return NextResponse.json({ message: 'Already received' })

  const keywords = DISTRESS_KWS.filter(kw => (notes ?? '').toLowerCase().includes(kw))

  const { error } = await supabase.from('mls_leads').insert({
    mls_number:           `AGENT-${Date.now()}`,
    address:              address.trim(),
    list_price:           listPrice ? parseInt(String(listPrice), 10) : null,
    beds:                 beds      ? parseInt(String(beds), 10)      : null,
    baths:                baths     ? parseFloat(String(baths))       : null,
    sqft:                 sqft      ? parseInt(String(sqft), 10)      : null,
    agent_name:           agentName.trim(),
    agent_email:          agentEmail.trim().toLowerCase(),
    agent_phone:          agentPhone?.trim() ?? null,
    description_keywords: keywords.length ? keywords : null,
    distress_score:       conditionScore(condition ?? ''),
    source:               'agent_submission',
    status:               'new',
  })

  if (error) {
    console.error('[mls-leads]', error)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
