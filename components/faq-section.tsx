interface Faq {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqs: readonly Faq[]
  title?: string
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions' }: FaqSectionProps) {
  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">{title}</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group bg-slate-700 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-4 text-white font-medium list-none">
                {question}
                <span className="text-amber-400 ml-4 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-4 pb-4 text-slate-300 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
