'use client'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Helpful Home Buyers USA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
          <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded transition-colors"
          >
            {siteConfig.phoneDisplay}
          </a>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 flex flex-col gap-4">
          <Link href="/about" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>About</Link>
          <Link href="/blog" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/contact" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>Contact</Link>
          <a href={`tel:${siteConfig.phone}`} className="text-amber-400 font-bold">{siteConfig.phoneDisplay}</a>
        </div>
      )}
    </header>
  )
}
