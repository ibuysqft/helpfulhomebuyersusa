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
