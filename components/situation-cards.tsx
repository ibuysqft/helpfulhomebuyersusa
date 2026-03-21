import Link from 'next/link'
import { situations } from '@/data/situations'

export function SituationCards() {
  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">We Buy Houses In Any Situation</h2>
        <p className="text-slate-400 text-center mb-10">Whatever your reason for selling, we have a solution.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {situations.map(({ slug, label, icon, description }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 transition-colors group"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-400 transition-colors">{label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
