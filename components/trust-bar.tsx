export function TrustBar() {
  const stats = [
    { value: '24 hrs', label: 'Cash Offer' },
    { value: '7 Days', label: 'Close' },
    { value: '0', label: 'Repairs Needed' },
    { value: '$0', label: 'Commissions' },
  ]

  return (
    <section
      className="py-8 px-4 border-y border-white/[0.04]"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map(({ value, label }) => (
          <div key={label} className="stat-animate">
            <p
              className="text-3xl font-bold"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
            >
              {value}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
