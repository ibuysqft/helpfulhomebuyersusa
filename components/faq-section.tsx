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
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">{title}</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => {
            const isOpen = open === question
            return (
              <div key={question} className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : question)}
                  className="flex justify-between items-center w-full cursor-pointer p-4 text-white font-medium text-left"
                  aria-expanded={isOpen}
                >
                  {question}
                  <span
                    className={`text-amber-400 ml-4 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-slate-300 leading-relaxed">{answer}</p>
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
