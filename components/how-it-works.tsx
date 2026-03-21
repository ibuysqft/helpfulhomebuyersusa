export function HowItWorks() {
  const steps = [
    { n: '1', title: 'Tell Us About Your Property', desc: 'Fill out our short form or call us. Takes 2 minutes. No obligation.' },
    { n: '2', title: 'Receive Your Cash Offer', desc: 'We\'ll present a fair, no-obligation cash offer within 24 hours.' },
    { n: '3', title: 'Close On Your Schedule', desc: 'Pick your closing date. We handle all paperwork. You get cash.' },
  ]
  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-900 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {n}
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
