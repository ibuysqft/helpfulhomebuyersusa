import Link from 'next/link'
import { Phone, MessageSquare, Zap } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex h-16 shadow-lg shadow-slate-950/60">
      <a
        href={`tel:${siteConfig.phone}`}
        className="flex flex-1 items-center justify-center gap-1.5 bg-slate-800 text-white font-bold text-sm border-r border-slate-700"
      >
        <Phone size={16} aria-hidden={true} />
        Call
      </a>
      <a
        href={`sms:${siteConfig.phone}?body=I'd like a cash offer for my property`}
        className="flex flex-1 items-center justify-center gap-1.5 bg-slate-700 text-white font-bold text-sm border-r border-slate-600"
      >
        <MessageSquare size={16} aria-hidden={true} />
        Text Us
      </a>
      <Link
        href="/property-information"
        className="flex flex-1 items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-colors"
      >
        <Zap size={16} aria-hidden={true} />
        Get Offer
      </Link>
    </div>
  )
}
