'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, X } from 'lucide-react'

const STORAGE_KEY = 'hhb_funnel_draft'
const SESSION_DISMISS_KEY = 'hhb_banner_dismissed'

export function ReturnVisitorBanner() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Avoid hydration mismatch — only access storage after mount
    try {
      const hasDraft = Boolean(localStorage.getItem(STORAGE_KEY))
      const dismissed = Boolean(sessionStorage.getItem(SESSION_DISMISS_KEY))
      if (hasDraft && !dismissed) {
        setVisible(true)
      }
    } catch {
      // Storage may be unavailable in some contexts (private browsing, etc.)
    }
  }, [])

  if (!visible) return null

  function handleDismiss() {
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  function handleContinue() {
    router.push('/property-information')
  }

  return (
    <div
      role="alert"
      className="bg-amber-500 text-slate-900 py-2 px-4 text-sm font-semibold flex items-center justify-between"
    >
      <button
        type="button"
        onClick={handleContinue}
        className="flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
      >
        Welcome back — continue your offer application
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="ml-4 p-1 rounded hover:bg-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}
