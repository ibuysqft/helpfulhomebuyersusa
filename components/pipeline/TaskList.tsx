'use client'

import { useOptimistic, useTransition, useRef } from 'react'
import type { DealTask } from '@/lib/types/deals'
import {
  completeTaskAction,
  createTaskAction,
  deleteTaskAction,
} from '@/app/admin/pipeline/actions'

interface TaskListProps {
  dealId: string
  tasks: DealTask[]
}

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

function formatDate(dueDate: string | null): string {
  if (!dueDate) return ''
  return new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

type OptimisticAction =
  | { type: 'complete'; taskId: string }
  | { type: 'delete'; taskId: string }
  | { type: 'add'; task: DealTask }

function applyOptimistic(tasks: DealTask[], action: OptimisticAction): DealTask[] {
  if (action.type === 'complete') {
    return tasks.map((t) =>
      t.id === action.taskId ? { ...t, completed: true } : t
    )
  }
  if (action.type === 'delete') {
    return tasks.filter((t) => t.id !== action.taskId)
  }
  if (action.type === 'add') {
    return [...tasks, action.task]
  }
  return tasks
}

export default function TaskList({ dealId, tasks }: TaskListProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTasks, addOptimistic] = useOptimistic(tasks, applyOptimistic)
  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  const pending = optimisticTasks.filter((t) => !t.completed)
  const completed = optimisticTasks.filter((t) => t.completed)

  function handleComplete(taskId: string) {
    startTransition(async () => {
      addOptimistic({ type: 'complete', taskId })
      await completeTaskAction(taskId)
    })
  }

  function handleDelete(taskId: string) {
    startTransition(async () => {
      addOptimistic({ type: 'delete', taskId })
      await deleteTaskAction(taskId)
    })
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const title = titleRef.current?.value.trim()
    if (!title) return
    const dueDate = dateRef.current?.value || undefined

    const optimisticTask: DealTask = {
      id: `optimistic-${Date.now()}`,
      deal_id: dealId,
      title,
      due_date: dueDate ?? null,
      completed: false,
      created_at: new Date().toISOString(),
    }

    startTransition(async () => {
      addOptimistic({ type: 'add', task: optimisticTask })
      await createTaskAction(dealId, title, dueDate)
    })

    if (titleRef.current) titleRef.current.value = ''
    if (dateRef.current) dateRef.current.value = ''
  }

  return (
    <div className="space-y-1">
      {pending.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      ))}

      {completed.length > 0 && (
        <div className="mt-2 space-y-1 opacity-40">
          {completed.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          ref={titleRef}
          type="text"
          placeholder="New task..."
          className="min-w-0 flex-1 rounded border border-zinc-700 bg-slate-800 px-2 py-1 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          disabled={isPending}
        />
        <input
          ref={dateRef}
          type="date"
          className="rounded border border-zinc-700 bg-slate-800 px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-slate-700 px-2 py-1 text-xs text-zinc-100 hover:bg-slate-600 disabled:opacity-50"
        >
          Add
        </button>
      </form>
    </div>
  )
}

interface TaskRowProps {
  task: DealTask
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

function TaskRow({ task, onComplete, onDelete }: TaskRowProps) {
  const overdue = isOverdue(task.due_date)

  return (
    <div className="flex items-center gap-2 rounded px-2 py-1 hover:bg-slate-800">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
        className="h-3.5 w-3.5 cursor-pointer accent-slate-400"
        aria-label={`Mark "${task.title}" complete`}
      />
      <span
        className={`flex-1 text-xs ${
          task.completed ? 'line-through text-zinc-500' : 'text-zinc-100'
        }`}
      >
        {task.title}
      </span>
      {task.due_date && (
        <span
          className={`text-xs ${overdue && !task.completed ? 'text-red-400' : 'text-zinc-500'}`}
        >
          {formatDate(task.due_date)}
        </span>
      )}
      <button
        onClick={() => onDelete(task.id)}
        className="text-zinc-600 hover:text-red-400 text-xs leading-none"
        aria-label={`Delete task "${task.title}"`}
      >
        ×
      </button>
    </div>
  )
}
