import { ShieldCheck, Star, BadgeCheck, Home } from 'lucide-react'

export function CredibilityBar() {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />,
      label: 'BBB Accredited Business',
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />,
      label: '4.9★ Google Reviews',
    },
    {
      icon: <BadgeCheck className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />,
      label: 'Licensed & Insured in VA',
    },
    {
      icon: <Home className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />,
      label: '500+ Homes Purchased',
    },
  ]

  return (
    <section className="bg-slate-900 border-y border-white/[0.06] py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">
          Trusted By Virginia Homeowners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-300 text-sm">
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
