'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const SESSION_KEY = 'hhb_exit_intent_shown'

export function ExitIntentModal() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        if (sessionStorage.getItem(SESSION_KEY)) return
        sessionStorage.setItem(SESSION_KEY, '1')
        setVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  function dismiss() {
    setVisible(false)
  }

  function handleCTA() {
    setVisible(false)
    router.push('/property-information')
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative bg-slate-800 rounded-xl p-8 max-w-sm w-full shadow-2xl">
        <h2
          id="exit-modal-heading"
          className="text-white text-2xl font-bold mb-3 leading-tight"
        >
          Wait — Don&apos;t Leave Without Your Offer
        </h2>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Get a no-obligation cash offer in 24 hours. Takes 60 seconds.
        </p>

        <button
          type="button"
          onClick={handleCTA}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 rounded-xl transition-colors text-base mb-3"
        >
          Get My Offer →
        </button>

        <button
          type="button"
          onClick={dismiss}
          className="w-full text-center text-slate-400 hover:text-slate-200 text-sm transition-colors py-1"
        >
          No thanks
        </button>
      </div>
    </div>
  )
}
