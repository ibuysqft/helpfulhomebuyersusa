'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin',               label: 'Drafts',         icon: '✦' },
  { href: '/admin/mls',           label: 'MLS Outreach',   icon: '◎' },
  { href: '/admin/scrape-targets',label: 'Scrape Targets', icon: '⊙' },
  { href: '/admin/pipeline',      label: 'Pipeline',       icon: '⟶' },
  { href: '/admin/rankings',      label: 'Rankings',       icon: '↑' },
  { href: '/admin/competitor-intel', label: 'Competitors', icon: '⊕' },
  { href: '/admin/social-queue',  label: 'Social Queue',   icon: '▣' },
  { href: '/admin/failed-leads',  label: 'Failed Leads',   icon: '⚑' },
  { href: '/mls-offers',          label: 'MLS Offers',     icon: '◈' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-800">
          <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-0.5">Helpful HB</div>
          <div className="text-white font-bold text-base">Deal Engine</div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV.map(({ href, label, icon }) => {
            const active = path === href || (href !== '/admin' && path.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active
                    ? 'text-white bg-zinc-800 border-r-2 border-blue-500'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                <span className="text-[11px] opacity-60">{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-5 py-4 border-t border-zinc-800">
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest">helpfulhomebuyersusa.com</div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-7">{children}</div>
      </main>
    </div>
  )
}
