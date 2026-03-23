'use client'

interface LeadData {
  value?: number
  currency?: string
}

export function usePixelEvents() {
  const trackLead = (data?: LeadData) => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead', data ?? {})
      }
    } catch {}
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'generate_lead', {
          value: data?.value,
          currency: data?.currency ?? 'USD',
        })
      }
    } catch {}
  }

  const trackContact = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Contact')
      }
    } catch {}
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'contact')
      }
    } catch {}
  }

  const trackViewContent = (content_name: string) => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'ViewContent', { content_name })
      }
    } catch {}
  }

  const trackInitiateCheckout = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'InitiateCheckout')
      }
    } catch {}
  }

  return { trackLead, trackContact, trackViewContent, trackInitiateCheckout }
}
