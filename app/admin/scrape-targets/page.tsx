import { supabase } from '@/lib/supabase'
import { ScrapeTargetsClient } from './ScrapeTargetsClient'

export default async function ScrapeTargetsPage() {
  const { data: targets } = await supabase
    .from('scrape_targets')
    .select('*')
    .order('state')
    .order('type')
    .order('value')

  return <ScrapeTargetsClient targets={targets ?? []} />
}
