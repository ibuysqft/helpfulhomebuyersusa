'use client'
import { useState } from 'react'

interface Faq {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqs: readonly Faq[]
  title?: string
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions' }: FaqSectionProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="py-16 px-4" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold mb-8 text-center"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          {title}
        </h2>
        <div className="space-y-3">
          {faqs.map(({ question, answer }) => {
            const isOpen = open === question
            return (
              <div
                key={question}
                className="bg-white rounded-xl overflow-hidden border shadow-sm"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : question)}
                  className="flex justify-between items-center w-full cursor-pointer p-5 font-medium text-left min-h-[44px]"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <svg
                    className={`w-5 h-5 ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--color-primary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-5 pb-5 leading-relaxed text-sm"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
