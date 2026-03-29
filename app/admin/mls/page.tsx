import { createClient } from '@supabase/supabase-js'
import { MlsControlClient } from './MlsControlClient'

async function getData() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const today = new Date().toISOString().split('T')[0]

  const [budgetRes, countsRes] = await Promise.all([
    sb.from('daily_send_budget').select('*').eq('date', today).single(),
    sb.from('mls_leads').select('status'),
  ])

  const leads = countsRes.data ?? []
  const counts = {
    new:       leads.filter((l: { status: string }) => l.status === 'new').length,
    queued:    leads.filter((l: { status: string }) => l.status === 'queued').length,
    contacted: leads.filter((l: { status: string }) => l.status === 'contacted').length,
    skipped:   leads.filter((l: { status: string }) => l.status === 'skipped').length,
  }

  return { budget: budgetRes.data ?? null, counts }
}

export default async function MlsAdminPage() {
  const { budget, counts } = await getData()

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-100">MLS Outreach</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Scrape on-market deals, score for distress, and push to GHL
        </p>
      </div>
      <MlsControlClient budget={budget} counts={counts} />
    </div>
  )
}
