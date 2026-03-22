import Link from 'next/link'
import { situations } from '@/data/situations'

export function SituationCards() {
  return (
    <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold text-white mb-3 text-center"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          We Buy Houses In Any Situation
        </h2>
        <p
          className="text-blue-100 text-center mb-10 max-w-lg mx-auto"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Whatever your reason for selling, we have a solution.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {situations.map(({ slug, label, icon, description }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="bg-white/10 hover:bg-white/20 hover:-translate-y-1 rounded-xl p-4 transition-all duration-200 group border border-white/20 min-h-[44px]"
            >
              <div className="text-3xl mb-2" aria-hidden="true">{icon}</div>
              <h3
                className="text-white font-semibold text-sm mb-1 group-hover:text-blue-100 transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {label}
              </h3>
              <p className="text-blue-100/80 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
