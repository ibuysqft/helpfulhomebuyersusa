declare global {
  function gtag(...args: unknown[]): void
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

const CONVERSIONS = {
  contactFormSubmit: 'AW-17947613888/NeM9CL7t3I4cEMC1i-5C',
  phoneCallClick: 'AW-17947613888/AHk4CMHt3I4cEMC1i-5C',
  compsToolSubmit: 'AW-17947613888/8TJfCMTt3I4cEMC1i-5C',
} as const

function fireConversion(label: string) {
  if (typeof gtag !== 'function' || !ADS_ID) return
  try {
    gtag('event', 'conversion', { send_to: label })
  } catch {}
}

export function trackContactFormSubmit() {
  fireConversion(CONVERSIONS.contactFormSubmit)
}

export function trackPhoneCallClick() {
  fireConversion(CONVERSIONS.phoneCallClick)
}

export function trackCompsToolSubmit() {
  fireConversion(CONVERSIONS.compsToolSubmit)
}
