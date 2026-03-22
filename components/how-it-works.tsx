export function HowItWorks() {
  const steps = [
    {
      n: '1',
      title: 'Tell Us About Your Property',
      desc: 'Fill out our short form or call us. Takes 2 minutes. No obligation.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
      ),
    },
    {
      n: '2',
      title: 'Receive Your Cash Offer',
      desc: "We'll present a fair, no-obligation cash offer within 24 hours.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      n: '3',
      title: 'Close On Your Schedule',
      desc: 'Pick your closing date. We handle all paperwork. You get cash.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-16 px-4" style={{ background: '#F1F5F9' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold mb-3 text-center"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          How It Works
        </h2>
        <p
          className="text-center mb-12 max-w-xl mx-auto"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Three simple steps to sell your Virginia home for cash — no repairs, no agents, no stress.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ n, title, desc, icon }) => (
            <div
              key={n}
              className="bg-white rounded-xl p-6 text-center shadow-md border"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {icon}
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
              >
                Step {n}
              </div>
              <h3
                className="font-semibold mb-2 text-base"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
