export const siteConfig = {
  name: 'Helpful Home Buyers USA',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helpfulhomebuyersusa.com',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+17039401159',
  phoneDisplay: '(703) 940-1159',
  email: 'info@helpfulhomebuyersusa.com',
  address: {
    region: 'Northern Virginia',
    state: 'VA',
    country: 'US',
  },
  markets: ['Northern Virginia', 'Richmond VA', 'Hampton Roads VA'],
} as const
