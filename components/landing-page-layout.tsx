import Link from 'next/link'
import { siteConfig } from '@/config/site'

interface LandingPageLayoutProps {
  children: React.ReactNode
}

export function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal top bar — logo + tap-to-call only, no nav */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(8px)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold shrink-0"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Helpful Homebuyers USA
          </Link>

          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-lg min-h-[44px] text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden sm:inline">{siteConfig.phoneDisplay}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Minimal footer — phone + address only, no nav links */}
      <footer
        className="py-8 px-4 text-center text-sm"
        style={{ background: '#0F1E3C', color: '#94A3B8', fontFamily: 'var(--font-body)' }}
      >
        <a
          href={`tel:${siteConfig.phone}`}
          className="font-bold text-lg block mb-2 transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-cta)' }}
        >
          {siteConfig.phoneDisplay}
        </a>
        <p className="text-xs" style={{ color: '#64748B' }}>
          Paramount Legacy Properties LLC
        </p>
        <p className="text-xs mt-1" style={{ color: '#475569' }}>
          &copy; {new Date().getFullYear()} Helpful Homebuyers USA. Licensed in {siteConfig.stateName}. We are direct cash buyers, not real estate agents.
        </p>
      </footer>
    </div>
  )
}
