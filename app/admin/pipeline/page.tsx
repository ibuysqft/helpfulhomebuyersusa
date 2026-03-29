import { getAllDeals } from '@/lib/deals'
import { HotStrip } from '@/components/pipeline/HotStrip'
import { KanbanBoard } from '@/components/pipeline/KanbanBoard'

export const dynamic = 'force-dynamic'

export default async function PipelinePage() {
  const deals = await getAllDeals()
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-100">Deal Pipeline</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Short sales, novations, and wholesale deals
        </p>
      </div>
      <HotStrip deals={deals} />
      <KanbanBoard deals={deals} />
    </div>
  )
}
