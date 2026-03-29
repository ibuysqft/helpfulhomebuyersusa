import { NextRequest, NextResponse } from 'next/server'
import type { DealSauceLead } from '@/lib/mls-types'
import { supabase } from '@/lib/supabase'

export const maxDuration = 300

const DISTRESS_KWS = [
  'as-is',
  'as is',
  'motivated',
  'price reduced',
  'estate sale',
  'probate',
  'fixer',
  'investor special',
  'needs tlc',
  'sold as-is',
  'investor',
]

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  // Verify cron authorization
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get scraper URL and secret
  const scraperUrl = process.env.DEALSAUCE_SCRAPER_URL
  if (!scraperUrl) {
    return NextResponse.json({ error: 'DEALSAUCE_SCRAPER_URL not set' }, { status: 500 })
  }

  try {
    // Call external scraper service
    const scraperRes = await fetch(`${scraperUrl}/scrape`, {
      method: 'POST',
      headers: { 'x-scraper-secret': process.env.DEALSAUCE_SCRAPER_SECRET ?? '' },
      signal: AbortSignal.timeout(240_000),
    })

    if (!scraperRes.ok) {
      return NextResponse.json({ error: `Scraper HTTP ${scraperRes.status}` }, { status: 500 })
    }

    const { leads }: { leads: DealSauceLead[] } = await scraperRes.json()
    if (!leads?.length) {
      return NextResponse.json({ message: 'No leads returned', inserted: 0 })
    }

    // Deduplicate against existing MLS numbers
    const mlsNums = leads.map(l => l.mlsNumber).filter(Boolean)
    const { data: existing } = await supabase
      .from('mls_leads')
      .select('mls_number')
      .in('mls_number', mlsNums)

    const existingSet = new Set((existing ?? []).map((r: { mls_number: string }) => r.mls_number))
    const newLeads = leads.filter(l => l.mlsNumber && !existingSet.has(l.mlsNumber))

    if (!newLeads.length) {
      return NextResponse.json({ inserted: 0, skipped: leads.length })
    }

    // Transform leads for database insert
    const rows = newLeads.map(lead => ({
      mls_number: lead.mlsNumber,
      address: lead.address,
      list_price: lead.listPrice || null,
      beds: lead.beds || null,
      baths: lead.baths || null,
      sqft: lead.sqft || null,
      agent_name: lead.agentName || null,
      agent_email: lead.agentEmail || null,
      agent_phone: lead.agentPhone || null,
      dealsauce_wholesale: lead.wholesaleValue || null,
      description_keywords: DISTRESS_KWS.filter(kw =>
        lead.description.toLowerCase().includes(kw)
      ),
      source: 'dealsauce' as const,
      status: 'new' as const,
    }))

    // Insert into mls_leads table
    const { error } = await supabase.from('mls_leads').insert(rows)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ inserted: rows.length, skipped: leads.length - rows.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
