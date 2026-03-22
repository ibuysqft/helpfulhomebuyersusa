'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: number | null
  display: string
  label: string
  animated: boolean
  suffix: string
}

const STATS: StatItem[] = [
  { value: 500, display: '500', label: 'Homes Purchased', animated: true, suffix: '+' },
  { value: null, display: '24hrs', label: 'Average Offer Time', animated: false, suffix: '' },
  { value: null, display: '$0', label: 'Fees or Commissions', animated: false, suffix: '' },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    let rafId: number

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return count
}

function AnimatedStat({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value ?? 0, 1500, active && stat.animated)
  const displayed = stat.animated ? `${count}${stat.suffix}` : stat.display

  return (
    <div className="flex flex-col items-center gap-2 py-8 md:py-0 md:px-12 md:flex-1">
      <span
        className="text-5xl font-bold text-amber-400"
        style={{ fontFamily: 'var(--font-heading)' }}
        aria-label={`${displayed} ${stat.label}`}
      >
        {displayed}
      </span>
      <span className="text-slate-400 text-sm mt-1 text-center">{stat.label}</span>
    </div>
  )
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-slate-950 py-16 px-4"
      aria-label="Business statistics"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:divide-x md:divide-white/10">
        {STATS.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  )
}
