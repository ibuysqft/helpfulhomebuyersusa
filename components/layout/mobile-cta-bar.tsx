import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex h-16 shadow-lg shadow-slate-950/60">
      <a
        href={`tel:${siteConfig.phone}`}
        className="flex flex-1 items-center justify-center gap-2 bg-slate-800 text-white font-bold text-sm border-r border-slate-700"
      >
        <span aria-hidden="true">📞</span>
        Call Now
      </a>
      <Link
        href="/property-information"
        className="flex flex-1 items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-colors"
      >
        <span aria-hidden="true">⚡</span>
        Get My Offer
      </Link>
    </div>
  )
}
