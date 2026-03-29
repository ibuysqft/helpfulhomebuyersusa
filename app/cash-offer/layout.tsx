import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Cash Offer — We Buy Houses That Need Work | Helpful Home Buyers USA',
  description:
    'Cash offers for houses needing repairs, facing foreclosure, inherited, or in divorce. No agents, no fees, close in as little as 7 days.',
  robots: { index: false, follow: false },
}

export default function CashOfferLayout({ children }: { children: React.ReactNode }) {
  return children
}
