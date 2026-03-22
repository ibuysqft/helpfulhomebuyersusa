'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

export function DesktopStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <Link
      href="/property-information"
      className="fixed right-6 bottom-8 z-40 hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-3 rounded-full shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
    >
      <Zap size={16} aria-hidden={true} />
      <span>Get Offer</span>
    </Link>
  )
}
