import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | Helpful Home Buyers USA',
  description: 'The page you are looking for could not be found. Return to the homepage or contact us for a fast cash offer on your house.',
}

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'var(--surface-base, #0a0f1a)', color: '#ffffff' }}
    >
      <div className="max-w-xl w-full text-center">
        {/* 404 badge */}
        <div
          style={{
            display: 'inline-block',
            fontSize: '6rem',
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}
        >
          404
        </div>

        <h1
          style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          className="text-3xl font-bold text-white mb-4"
        >
          Page Not Found
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let us help you find what you need.
        </p>

        {/* CTA */}
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <p className="text-amber-400 font-semibold text-lg mb-1">
            Need to sell your house?
          </p>
          <a
            href="tel:7039401159"
            className="text-2xl font-bold text-white hover:text-amber-400 transition-colors"
          >
            (703) 940-1159
          </a>
        </div>

        {/* Nav links */}
        <nav aria-label="Recovery navigation">
          <ul className="flex flex-col sm:flex-row gap-3 justify-center list-none p-0">
            <li>
              <Link
                href="/"
                className="block px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ background: '#2563eb' }}
              >
                Back to Homepage
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/sell-my-house-fast-fairfax-va"
                className="block px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Sell in Fairfax, VA
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}
