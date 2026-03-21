const testimonials = [
  {
    name: 'Michael R.',
    location: 'Fairfax, VA',
    text: 'I needed to sell fast due to a job relocation. They gave me a fair cash offer in 24 hours and we closed in 9 days. Zero hassle.',
    rating: 5,
  },
  {
    name: 'Sandra T.',
    location: 'Richmond, VA',
    text: 'Inherited a property that needed a ton of work. They bought it as-is, no repairs required. Process was smooth from start to finish.',
    rating: 5,
  },
  {
    name: 'James W.',
    location: 'Virginia Beach, VA',
    text: 'Was behind on payments and facing foreclosure. They moved fast and helped me avoid it. Professional and honest throughout.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">What Virginia Homeowners Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, text, rating }) => (
            <div key={name} className="bg-slate-800 rounded-xl p-6">
              <div className="text-amber-400 mb-3">{'★'.repeat(rating)}</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">"{text}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-slate-500 text-xs">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
