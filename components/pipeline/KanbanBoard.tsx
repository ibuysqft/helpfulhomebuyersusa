'use client'

import { useState, useTransition } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd'
import type { Deal, DealStage } from '@/lib/types/deals'
import { ACTIVE_STAGES, STAGE_LABELS } from '@/lib/types/deals'
import { moveDealStageAction } from '@/app/admin/pipeline/actions'
import { DealCard } from './DealCard'
import DealDrawer from './DealDrawer'

interface KanbanBoardProps {
  deals: Deal[]
}

const CLOSED_STAGES: DealStage[] = ['closed', 'dead']

export function KanbanBoard({ deals }: KanbanBoardProps) {
  const [localDeals, setLocalDeals] = useState<Deal[]>(deals)
  const [openDeal, setOpenDeal] = useState<Deal | null>(null)
  const [showDead, setShowDead] = useState(false)
  const [, startTransition] = useTransition()

  const visibleStages: DealStage[] = showDead
    ? [...ACTIVE_STAGES, ...CLOSED_STAGES]
    : ACTIVE_STAGES

  function getDealsForStage(stage: DealStage): Deal[] {
    return localDeals.filter((d) => d.stage === stage)
  }

  function applyStageChange(dealId: string, stage: DealStage) {
    setLocalDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage, last_stage_change: new Date().toISOString() }
          : d
      )
    )
    startTransition(async () => {
      await moveDealStageAction(dealId, stage)
    })
  }

  function handleDragEnd(result: DropResult) {
    const { destination, draggableId } = result
    if (!destination) return
    const newStage = destination.droppableId as DealStage
    const deal = localDeals.find((d) => d.id === draggableId)
    if (!deal || deal.stage === newStage) return
    applyStageChange(draggableId, newStage)
  }

  function handleSnoozeFromDrawer() {
    if (!openDeal) return
    setOpenDeal(null)
  }

  return (
    <>
      {/* Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowDead((v) => !v)}
          className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 rounded px-3 py-1.5 transition-colors"
          aria-pressed={showDead}
        >
          {showDead ? 'Hide Closed / Dead' : 'Show Closed / Dead'}
        </button>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {visibleStages.map((stage) => {
            const stageDeals = getDealsForStage(stage)
            return (
              <div
                key={stage}
                className="flex-shrink-0 w-64 flex flex-col"
                aria-label={`${STAGE_LABELS[stage]} column`}
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-zinc-300 text-sm font-semibold">
                    {STAGE_LABELS[stage]}
                  </span>
                  <span className="text-xs bg-slate-700 text-slate-400 rounded-full px-2 py-0.5">
                    {stageDeals.length}
                  </span>
                </div>

                {/* Drop zone */}
                <Droppable droppableId={stage}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col gap-2 min-h-[120px] rounded-lg p-2 transition-colors ${
                        snapshot.isDraggingOver
                          ? 'bg-slate-800'
                          : 'bg-slate-900'
                      }`}
                    >
                      {stageDeals.map((deal, index) => (
                        <Draggable
                          key={deal.id}
                          draggableId={deal.id}
                          index={index}
                        >
                          {(drag, dragSnapshot) => (
                            <div
                              ref={drag.innerRef}
                              {...drag.draggableProps}
                              {...drag.dragHandleProps}
                              style={{
                                ...drag.draggableProps.style,
                                opacity: dragSnapshot.isDragging ? 0.85 : 1,
                              }}
                            >
                              <DealCard
                                deal={deal}
                                onOpenDrawer={setOpenDeal}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      {/* Drawer */}
      <DealDrawer
        deal={openDeal}
        onClose={() => setOpenDeal(null)}
        onStageChange={(stage) => {
          if (openDeal) applyStageChange(openDeal.id, stage)
        }}
        onSnooze={handleSnoozeFromDrawer}
      />
    </>
  )
}
