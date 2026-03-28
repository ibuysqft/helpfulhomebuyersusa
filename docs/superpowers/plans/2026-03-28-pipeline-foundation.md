# Jarvis Pipeline Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Kanban deal pipeline at `/admin/pipeline` with GHL webhook ingest, ADHD-friendly card UI, deal drawer with tasks, and hot strip.

**Architecture:** Supabase owns pipeline state (deals + deal_tasks tables). GHL webhook auto-populates new deals. Server Components fetch data; Client Components handle drag-and-drop and drawer interactivity. Server Actions handle all mutations.

**Tech Stack:** Next.js App Router, Supabase, Tailwind CSS v4 (dark slate admin theme), `@hello-pangea/dnd` for drag-and-drop, Server Actions for mutations.

---

## File Map

**New files:**
- `supabase/migrations/20260328_deals.sql` — deals + deal_tasks schema
- `lib/types/deals.ts` — shared TypeScript types
- `lib/deals.ts` — Supabase query helpers
- `app/api/webhooks/ghl-lead/route.ts` — GHL ingest webhook
- `app/admin/pipeline/page.tsx` — Server Component, fetches all deals
- `app/admin/pipeline/actions.ts` — Server Actions (move, snooze, flag, task CRUD)
- `components/pipeline/KanbanBoard.tsx` — Client Component, drag-and-drop columns
- `components/pipeline/DealCard.tsx` — Client Component, individual card
- `components/pipeline/HotStrip.tsx` — Client Component, urgent items bar
- `components/pipeline/DealDrawer.tsx` — Client Component, slide-out detail panel
- `components/pipeline/TaskList.tsx` — Client Component, tasks inside drawer

**Modified files:**
- `app/admin/layout.tsx` — add "Pipeline" nav link
- `package.json` — add `@hello-pangea/dnd`

---

## Task 1: Database Schema

**Files:**
- Create: `supabase/migrations/20260328_deals.sql`

- [ ] **Step 1: Write the migration**

```sql
-- supabase/migrations/20260328_deals.sql

CREATE TYPE deal_stage AS ENUM (
  'new', 'contacted', 'offer_sent', 'under_contract', 'closed', 'dead'
);

CREATE TYPE deal_class AS ENUM ('residential', 'commercial');

CREATE TYPE ai_flag_reason AS ENUM (
  'technical_fail', 'hostile_recipient', 'off_script'
);

CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ghl_contact_id text UNIQUE,
  stage deal_stage NOT NULL DEFAULT 'new',
  deal_class deal_class NOT NULL DEFAULT 'residential',
  ai_flag boolean NOT NULL DEFAULT false,
  ai_flag_reason ai_flag_reason,
  address text NOT NULL,
  seller_name text,
  seller_phone text,
  assigned_to text, -- nullable, reserved for future team support
  snoozed_until timestamptz,
  last_stage_change timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE deal_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  title text NOT NULL,
  due_date timestamptz,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_ghl_contact_id ON deals(ghl_contact_id);
CREATE INDEX idx_deals_last_stage_change ON deals(last_stage_change);
CREATE INDEX idx_deal_tasks_deal_id ON deal_tasks(deal_id);
CREATE INDEX idx_deal_tasks_due_date ON deal_tasks(due_date) WHERE completed = false;
```

- [ ] **Step 2: Apply migration**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
npx supabase db push
```

Expected: migration applied with no errors.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260328_deals.sql
git commit -m "feat(pipeline): add deals and deal_tasks schema"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `lib/types/deals.ts`

- [ ] **Step 1: Write types**

```typescript
// lib/types/deals.ts

export type DealStage =
  | 'new'
  | 'contacted'
  | 'offer_sent'
  | 'under_contract'
  | 'closed'
  | 'dead'

export type DealClass = 'residential' | 'commercial'

export type AiFlagReason =
  | 'technical_fail'
  | 'hostile_recipient'
  | 'off_script'
  | null

export interface DealTask {
  id: string
  deal_id: string
  title: string
  due_date: string | null
  completed: boolean
  created_at: string
}

export interface Deal {
  id: string
  ghl_contact_id: string | null
  stage: DealStage
  deal_class: DealClass
  ai_flag: boolean
  ai_flag_reason: AiFlagReason
  address: string
  seller_name: string | null
  seller_phone: string | null
  snoozed_until: string | null
  last_stage_change: string
  created_at: string
  updated_at: string
  deal_tasks: DealTask[]
}

export const STAGE_LABELS: Record<DealStage, string> = {
  new: 'New Lead',
  contacted: 'Contacted',
  offer_sent: 'Offer Sent',
  under_contract: 'Under Contract',
  closed: 'Closed',
  dead: 'Dead',
}

export const ACTIVE_STAGES: DealStage[] = [
  'new',
  'contacted',
  'offer_sent',
  'under_contract',
]

export const AI_FLAG_LABELS: Record<NonNullable<AiFlagReason>, string> = {
  technical_fail: 'Tech Failure',
  hostile_recipient: 'Hostile',
  off_script: 'Off-Script',
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types/deals.ts
git commit -m "feat(pipeline): add Deal and DealTask TypeScript types"
```

---

## Task 3: Supabase Query Helpers

**Files:**
- Create: `lib/deals.ts`

- [ ] **Step 1: Write query helpers**

```typescript
// lib/deals.ts

import { supabase } from '@/lib/supabase'
import type { Deal, DealStage } from '@/lib/types/deals'

export async function getAllDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*, deal_tasks(*)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch deals: ${error.message}`)
  return (data ?? []) as Deal[]
}

export async function getDealById(id: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select('*, deal_tasks(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Deal
}

export async function createDealFromGHL(params: {
  ghlContactId: string
  address: string
  sellerName?: string
  sellerPhone?: string
}): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .insert({
      ghl_contact_id: params.ghlContactId,
      address: params.address,
      seller_name: params.sellerName ?? null,
      seller_phone: params.sellerPhone ?? null,
      stage: 'new',
    })
    .select('*, deal_tasks(*)')
    .single()

  if (error) throw new Error(`Failed to create deal: ${error.message}`)
  return data as Deal
}

export async function updateDealStage(
  id: string,
  stage: DealStage
): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .update({ stage, last_stage_change: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`Failed to update stage: ${error.message}`)
}

export async function snoozeDeal(id: string): Promise<void> {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0)

  const { error } = await supabase
    .from('deals')
    .update({ snoozed_until: tomorrow.toISOString() })
    .eq('id', id)

  if (error) throw new Error(`Failed to snooze deal: ${error.message}`)
}

export async function setAiFlag(
  id: string,
  flag: boolean,
  reason: string | null
): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .update({ ai_flag: flag, ai_flag_reason: reason })
    .eq('id', id)

  if (error) throw new Error(`Failed to set AI flag: ${error.message}`)
}

export async function createTask(params: {
  dealId: string
  title: string
  dueDate?: string
}): Promise<void> {
  const { error } = await supabase.from('deal_tasks').insert({
    deal_id: params.dealId,
    title: params.title,
    due_date: params.dueDate ?? null,
  })

  if (error) throw new Error(`Failed to create task: ${error.message}`)
}

export async function completeTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('deal_tasks')
    .update({ completed: true })
    .eq('id', taskId)

  if (error) throw new Error(`Failed to complete task: ${error.message}`)
}

export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('deal_tasks')
    .delete()
    .eq('id', taskId)

  if (error) throw new Error(`Failed to delete task: ${error.message}`)
}

/** Returns deals that are urgent: overdue tasks, AI flagged, or stale 7+ days */
export function getHotDeals(deals: Deal[]): Deal[] {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  return deals.filter((deal) => {
    if (deal.stage === 'closed' || deal.stage === 'dead') return false
    if (deal.snoozed_until && new Date(deal.snoozed_until) > now) return false
    if (deal.ai_flag) return true
    if (new Date(deal.last_stage_change) < sevenDaysAgo) return true
    const hasOverdueTask = deal.deal_tasks.some(
      (t) => !t.completed && t.due_date && new Date(t.due_date) < now
    )
    return hasOverdueTask
  })
}

/** Returns card aging class based on days since last stage change */
export function getAgingClass(lastStageChange: string): string {
  const days =
    (Date.now() - new Date(lastStageChange).getTime()) / (1000 * 60 * 60 * 24)
  if (days >= 7) return 'border-red-500'
  if (days >= 3) return 'border-amber-500'
  return 'border-slate-700'
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/deals.ts
git commit -m "feat(pipeline): add Supabase deal query helpers"
```

---

## Task 4: GHL Webhook Ingest

**Files:**
- Create: `app/api/webhooks/ghl-lead/route.ts`

- [ ] **Step 1: Write the webhook handler**

```typescript
// app/api/webhooks/ghl-lead/route.ts

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
    // Duplicate contact (UNIQUE constraint) — idempotent, return 200
    if (msg.includes('duplicate') || msg.includes('unique')) {
      return NextResponse.json({ ok: true, skipped: 'duplicate' })
    }
    console.error('[ghl-lead-webhook]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
```

- [ ] **Step 2: Add env var to `.env.local`**

Add the following line (generate any random string as the secret):
```
GHL_LEAD_WEBHOOK_SECRET=your-secret-here
```

- [ ] **Step 3: Commit**

```bash
git add app/api/webhooks/ghl-lead/route.ts
git commit -m "feat(pipeline): add GHL lead ingest webhook"
```

---

## Task 5: Install Drag-and-Drop Library

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependency**

```bash
cd /Users/jeffbord/Documents/anchor-seo/helpfulhomebuyersusa
npm install @hello-pangea/dnd
```

- [ ] **Step 2: Commit lockfile**

```bash
git add package.json package-lock.json
git commit -m "chore: add @hello-pangea/dnd for Kanban drag-and-drop"
```

---

## Task 6: Server Actions

**Files:**
- Create: `app/admin/pipeline/actions.ts`

- [ ] **Step 1: Write server actions**

```typescript
// app/admin/pipeline/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import {
  updateDealStage,
  snoozeDeal,
  setAiFlag,
  createTask,
  completeTask,
  deleteTask,
} from '@/lib/deals'
import type { DealStage, AiFlagReason } from '@/lib/types/deals'

export async function moveDealStageAction(
  dealId: string,
  stage: DealStage
): Promise<void> {
  await updateDealStage(dealId, stage)
  revalidatePath('/admin/pipeline')
}

export async function snoozeDealAction(dealId: string): Promise<void> {
  await snoozeDeal(dealId)
  revalidatePath('/admin/pipeline')
}

export async function setAiFlagAction(
  dealId: string,
  flag: boolean,
  reason: AiFlagReason
): Promise<void> {
  await setAiFlag(dealId, flag, reason)
  revalidatePath('/admin/pipeline')
}

export async function createTaskAction(
  dealId: string,
  title: string,
  dueDate?: string
): Promise<void> {
  await createTask({ dealId, title, dueDate })
  revalidatePath('/admin/pipeline')
}

export async function completeTaskAction(taskId: string): Promise<void> {
  await completeTask(taskId)
  revalidatePath('/admin/pipeline')
}

export async function deleteTaskAction(taskId: string): Promise<void> {
  await deleteTask(taskId)
  revalidatePath('/admin/pipeline')
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/pipeline/actions.ts
git commit -m "feat(pipeline): add Server Actions for deal mutations"
```

---

## Task 7: HotStrip Component

**Files:**
- Create: `components/pipeline/HotStrip.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/pipeline/HotStrip.tsx

'use client'

import type { Deal } from '@/lib/types/deals'
import { AI_FLAG_LABELS } from '@/lib/types/deals'

interface HotStripProps {
  deals: Deal[]
}

export function HotStrip({ deals }: HotStripProps) {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const flagged = deals.filter((d) => d.ai_flag)
  const overdueTasks = deals.flatMap((d) =>
    d.deal_tasks
      .filter((t) => !t.completed && t.due_date && new Date(t.due_date) < now)
      .map((t) => ({ task: t, deal: d }))
  )
  const stale = deals.filter(
    (d) =>
      !d.ai_flag &&
      new Date(d.last_stage_change) < sevenDaysAgo &&
      d.stage !== 'closed' &&
      d.stage !== 'dead' &&
      !(d.snoozed_until && new Date(d.snoozed_until) > now)
  )

  const total = flagged.length + overdueTasks.length + stale.length
  if (total === 0) return null

  return (
    <div className="bg-red-950 border border-red-800 rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-4 items-center">
      <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">
        ⚡ Needs Attention
      </span>

      {flagged.map((d) => (
        <span
          key={d.id}
          className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded flex items-center gap-1"
        >
          ⚠ AI Flag — {d.address.split(',')[0]}
          {d.ai_flag_reason && (
            <span className="text-red-400">
              ({AI_FLAG_LABELS[d.ai_flag_reason]})
            </span>
          )}
        </span>
      ))}

      {overdueTasks.map(({ task, deal }) => (
        <span
          key={task.id}
          className="bg-amber-900 text-amber-200 text-xs px-2 py-1 rounded"
        >
          📋 {deal.address.split(',')[0]} — {task.title}
        </span>
      ))}

      {stale.map((d) => (
        <span
          key={d.id}
          className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded"
        >
          ⏳ Stale 7d — {d.address.split(',')[0]}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/HotStrip.tsx
git commit -m "feat(pipeline): add HotStrip urgent items bar"
```

---

## Task 8: DealCard Component

**Files:**
- Create: `components/pipeline/DealCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/pipeline/DealCard.tsx

'use client'

import { Draggable } from '@hello-pangea/dnd'
import type { Deal } from '@/lib/types/deals'
import { AI_FLAG_LABELS, STAGE_LABELS } from '@/lib/types/deals'
import { getAgingClass } from '@/lib/deals'
import { snoozeDealAction, moveDealStageAction } from '@/app/admin/pipeline/actions'

interface DealCardProps {
  deal: Deal
  index: number
  onOpenDrawer: (deal: Deal) => void
}

export function DealCard({ deal, index, onOpenDrawer }: DealCardProps) {
  const now = new Date()
  const overdueTasks = deal.deal_tasks.filter(
    (t) => !t.completed && t.due_date && new Date(t.due_date) < now
  )
  const nextTask = deal.deal_tasks
    .filter((t) => !t.completed && t.due_date)
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())[0]

  const agingBorder = getAgingClass(deal.last_stage_change)

  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-slate-800 border-l-4 ${agingBorder} rounded-lg p-3 mb-2 cursor-pointer transition-shadow ${
            snapshot.isDragging ? 'shadow-xl ring-1 ring-slate-500' : 'hover:bg-slate-750'
          }`}
          onClick={() => onOpenDrawer(deal)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-white text-sm font-medium leading-tight">
              {deal.address.split(',')[0]}
            </p>
            <div className="flex gap-1 shrink-0">
              <span
                className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  deal.deal_class === 'residential'
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-orange-900 text-orange-300'
                }`}
              >
                {deal.deal_class === 'residential' ? 'RES' : 'COMM'}
              </span>
              {deal.ai_flag && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-red-900 text-red-300 font-medium">
                  ⚠ {deal.ai_flag_reason ? AI_FLAG_LABELS[deal.ai_flag_reason] : 'AI'}
                </span>
              )}
            </div>
          </div>

          {/* Task summary */}
          <div className="flex items-center justify-between">
            <div>
              {overdueTasks.length > 0 ? (
                <span className="text-red-400 text-xs">
                  ⚠ {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''}
                </span>
              ) : nextTask ? (
                <span className="text-slate-400 text-xs">
                  📋 Due {new Date(nextTask.due_date!).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-green-600 text-xs">● No tasks</span>
              )}
            </div>

            {/* One-click actions */}
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={async () => {
                  await moveDealStageAction(deal.id, 'contacted')
                }}
                className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-700 transition-colors"
                title="Mark Contacted"
              >
                📞
              </button>
              <button
                onClick={async () => {
                  await snoozeDealAction(deal.id)
                }}
                className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-700 transition-colors"
                title="Snooze 1 day"
              >
                💤
              </button>
            </div>
          </div>

          {/* Seller name if available */}
          {deal.seller_name && (
            <p className="text-slate-500 text-xs mt-1">{deal.seller_name}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/DealCard.tsx
git commit -m "feat(pipeline): add DealCard component with aging, flags, one-click actions"
```

---

## Task 9: TaskList Component

**Files:**
- Create: `components/pipeline/TaskList.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/pipeline/TaskList.tsx

'use client'

import { useState } from 'react'
import type { DealTask } from '@/lib/types/deals'
import {
  createTaskAction,
  completeTaskAction,
  deleteTaskAction,
} from '@/app/admin/pipeline/actions'

interface TaskListProps {
  dealId: string
  tasks: DealTask[]
}

export function TaskList({ dealId, tasks }: TaskListProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newDue, setNewDue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const sorted = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    if (a.due_date && b.due_date)
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    return 0
  })

  async function handleAdd() {
    if (!newTitle.trim()) return
    await createTaskAction(dealId, newTitle.trim(), newDue || undefined)
    setNewTitle('')
    setNewDue('')
    setIsAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-300 text-sm font-semibold uppercase tracking-wide">
          Tasks
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          + Add task
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 rounded-lg p-3 mb-3 space-y-2">
          <input
            type="text"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-900 text-white text-sm rounded px-2 py-1.5 border border-slate-700 focus:outline-none focus:border-slate-500"
          />
          <input
            type="datetime-local"
            value={newDue}
            onChange={(e) => setNewDue(e.target.value)}
            className="w-full bg-slate-900 text-white text-sm rounded px-2 py-1.5 border border-slate-700 focus:outline-none focus:border-slate-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-medium px-3 py-1.5 rounded transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-white text-xs px-3 py-1.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sorted.length === 0 && (
          <p className="text-slate-600 text-sm">No tasks yet.</p>
        )}
        {sorted.map((task) => {
          const isOverdue =
            !task.completed &&
            task.due_date &&
            new Date(task.due_date) < new Date()
          return (
            <div
              key={task.id}
              className={`flex items-start gap-2 p-2 rounded ${
                task.completed ? 'opacity-40' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => !task.completed && completeTaskAction(task.id)}
                className="mt-0.5 accent-amber-400 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${
                    task.completed
                      ? 'line-through text-slate-500'
                      : 'text-slate-200'
                  }`}
                >
                  {task.title}
                </p>
                {task.due_date && (
                  <p
                    className={`text-xs mt-0.5 ${
                      isOverdue ? 'text-red-400' : 'text-slate-500'
                    }`}
                  >
                    {isOverdue ? '⚠ Overdue · ' : ''}
                    {new Date(task.due_date).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteTaskAction(task.id)}
                className="text-slate-600 hover:text-red-400 text-xs shrink-0 transition-colors"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/TaskList.tsx
git commit -m "feat(pipeline): add TaskList component"
```

---

## Task 10: DealDrawer Component

**Files:**
- Create: `components/pipeline/DealDrawer.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/pipeline/DealDrawer.tsx

'use client'

import type { Deal, DealStage, AiFlagReason } from '@/lib/types/deals'
import { STAGE_LABELS, AI_FLAG_LABELS, ACTIVE_STAGES } from '@/lib/types/deals'
import { TaskList } from './TaskList'
import { moveDealStageAction, setAiFlagAction } from '@/app/admin/pipeline/actions'

interface DealDrawerProps {
  deal: Deal | null
  onClose: () => void
}

export function DealDrawer({ deal, onClose }: DealDrawerProps) {
  if (!deal) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-start justify-between">
          <div>
            <h2 className="text-white font-semibold">{deal.address}</h2>
            {deal.seller_name && (
              <p className="text-slate-400 text-sm mt-0.5">{deal.seller_name}</p>
            )}
            {deal.seller_phone && (
              <a
                href={`tel:${deal.seller_phone}`}
                className="text-amber-400 text-sm hover:text-amber-300"
              >
                {deal.seller_phone}
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Stage selector */}
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-wide block mb-2">
              Stage
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STAGE_LABELS) as DealStage[]).map((stage) => (
                <button
                  key={stage}
                  onClick={() => moveDealStageAction(deal.id, stage)}
                  className={`text-xs px-2.5 py-1.5 rounded font-medium transition-colors ${
                    deal.stage === stage
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {STAGE_LABELS[stage]}
                </button>
              ))}
            </div>
          </div>

          {/* AI Flag */}
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-wide block mb-2">
              AI Flag
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAiFlagAction(deal.id, false, null)}
                className={`text-xs px-2.5 py-1.5 rounded transition-colors ${
                  !deal.ai_flag
                    ? 'bg-green-800 text-green-200'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Clear
              </button>
              {(Object.keys(AI_FLAG_LABELS) as NonNullable<AiFlagReason>[]).map(
                (reason) => (
                  <button
                    key={reason}
                    onClick={() => setAiFlagAction(deal.id, true, reason)}
                    className={`text-xs px-2.5 py-1.5 rounded transition-colors ${
                      deal.ai_flag && deal.ai_flag_reason === reason
                        ? 'bg-red-700 text-red-100'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    ⚠ {AI_FLAG_LABELS[reason]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* GHL link */}
          {deal.ghl_contact_id && (
            <div>
              <a
                href={`https://app.gohighlevel.com/contacts/${deal.ghl_contact_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-sm underline"
              >
                Open in GHL →
              </a>
            </div>
          )}

          {/* Tasks */}
          <TaskList dealId={deal.id} tasks={deal.deal_tasks} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/DealDrawer.tsx
git commit -m "feat(pipeline): add DealDrawer slide-out component"
```

---

## Task 11: KanbanBoard Component

**Files:**
- Create: `components/pipeline/KanbanBoard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/pipeline/KanbanBoard.tsx

'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import type { Deal, DealStage } from '@/lib/types/deals'
import { STAGE_LABELS, ACTIVE_STAGES } from '@/lib/types/deals'
import { DealCard } from './DealCard'
import { DealDrawer } from './DealDrawer'
import { HotStrip } from './HotStrip'
import { moveDealStageAction } from '@/app/admin/pipeline/actions'

interface KanbanBoardProps {
  initialDeals: Deal[]
}

export function KanbanBoard({ initialDeals }: KanbanBoardProps) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [showDead, setShowDead] = useState(false)

  const now = new Date()

  const visibleDeals = deals.filter((d) => {
    if (d.stage === 'dead' && !showDead) return false
    if (d.snoozed_until && new Date(d.snoozed_until) > now) return false
    return true
  })

  const columns = ACTIVE_STAGES.reduce<Record<DealStage, Deal[]>>(
    (acc, stage) => {
      acc[stage] = visibleDeals.filter((d) => d.stage === stage)
      return acc
    },
    {} as Record<DealStage, Deal[]>
  )

  if (showDead) {
    columns['dead'] = visibleDeals.filter((d) => d.stage === 'dead')
    columns['closed'] = visibleDeals.filter((d) => d.stage === 'closed')
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const dealId = result.draggableId
    const newStage = result.destination.droppableId as DealStage

    // Optimistic update
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage: newStage, last_stage_change: new Date().toISOString() }
          : d
      )
    )

    await moveDealStageAction(dealId, newStage)
  }

  const displayStages: DealStage[] = showDead
    ? [...ACTIVE_STAGES, 'closed', 'dead']
    : ACTIVE_STAGES

  return (
    <div>
      <HotStrip deals={deals} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Deal Pipeline</h2>
        <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showDead}
            onChange={(e) => setShowDead(e.target.checked)}
            className="accent-amber-400"
          />
          Show closed/dead
        </label>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {displayStages.map((stage) => {
            const stageDeals = columns[stage] ?? []
            return (
              <div key={stage} className="shrink-0 w-72">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-300 text-sm font-medium">
                    {STAGE_LABELS[stage]}
                  </h3>
                  <span className="text-slate-500 text-xs bg-slate-800 rounded-full px-2 py-0.5">
                    {stageDeals.length}
                  </span>
                </div>

                <Droppable droppableId={stage}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-32 rounded-lg p-2 transition-colors ${
                        snapshot.isDraggingOver
                          ? 'bg-slate-700/50'
                          : 'bg-slate-900/50'
                      }`}
                    >
                      {stageDeals.map((deal, index) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          index={index}
                          onOpenDrawer={setSelectedDeal}
                        />
                      ))}
                      {provided.placeholder}
                      {stageDeals.length === 0 && (
                        <p className="text-slate-700 text-xs text-center py-4">
                          Empty
                        </p>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      <DealDrawer
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/KanbanBoard.tsx
git commit -m "feat(pipeline): add KanbanBoard with drag-and-drop"
```

---

## Task 12: Pipeline Page

**Files:**
- Create: `app/admin/pipeline/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// app/admin/pipeline/page.tsx

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getAllDeals } from '@/lib/deals'
import { KanbanBoard } from '@/components/pipeline/KanbanBoard'

export const dynamic = 'force-dynamic'

export default async function PipelinePage() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (
    !adminToken ||
    adminToken.value !== Buffer.from(ADMIN_PASSWORD).toString('base64')
  ) {
    redirect('/admin/login')
  }

  const deals = await getAllDeals()

  return <KanbanBoard initialDeals={deals} />
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/pipeline/page.tsx
git commit -m "feat(pipeline): add /admin/pipeline page"
```

---

## Task 13: Add Nav Link

**Files:**
- Modify: `app/admin/layout.tsx`

- [ ] **Step 1: Add Pipeline link to nav**

Find this line in `app/admin/layout.tsx`:
```tsx
          <a href="/admin/failed-leads" className="text-slate-300 hover:text-white">
            Failed Leads
          </a>
```

Add after it:
```tsx
          <a href="/admin/pipeline" className="text-slate-300 hover:text-white">
            Pipeline
          </a>
```

- [ ] **Step 2: Verify it renders**

```bash
npm run dev
```

Open `http://localhost:3000/admin` — confirm "Pipeline" link appears in the nav header.

- [ ] **Step 3: Commit**

```bash
git add app/admin/layout.tsx
git commit -m "feat(pipeline): add Pipeline nav link to admin layout"
```

---

## Task 14: Smoke Test

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify pipeline page loads**

Navigate to `http://localhost:3000/admin/pipeline`. Expected:
- Page loads without errors
- Kanban columns display (New Lead, Contacted, Offer Sent, Under Contract)
- Hot strip hidden (no deals yet)
- Empty column placeholders visible

- [ ] **Step 3: Create a test deal via webhook**

```bash
curl -X POST http://localhost:3000/api/webhooks/ghl-lead \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret-here" \
  -d '{"contactId":"test-001","address":"117 S 9th St, Suffolk, VA 23434","fullName":"John Seller","phone":"7571234567"}'
```

Expected response: `{"ok":true,"dealId":"<uuid>"}`

- [ ] **Step 4: Verify card appears on board**

Refresh `http://localhost:3000/admin/pipeline`. Expected:
- Deal card visible in "New Lead" column with address "117 S 9th St"
- RES badge visible
- No AI flag
- Green "No tasks" indicator

- [ ] **Step 5: Test drag-and-drop**

Drag the deal card from "New Lead" to "Contacted". Expected:
- Card moves to Contacted column
- Refresh page — card remains in Contacted

- [ ] **Step 6: Test drawer**

Click the deal card. Expected:
- Slide-out drawer opens with address and seller name
- Stage buttons visible, "Contacted" highlighted
- GHL link not shown (test contactId doesn't resolve)
- Task list shows "No tasks yet"

- [ ] **Step 7: Test add task**

Click "+ Add task" in drawer. Fill in title "Call back", set due date to yesterday. Save. Expected:
- Task appears with red "Overdue" label
- Hot strip refreshes to show overdue task

- [ ] **Step 8: Commit final**

```bash
git add -A
git commit -m "feat(pipeline): pipeline foundation complete — kanban, ingest, tasks, hot strip"
```

---

## Out of Scope (Plan 2+)

- Jarvis AI chat panel and voice interface
- Deal analysis engine (comps, C1–C6 vision, offer math)
- Cash buyer scoring
- SMS nudge cron job
