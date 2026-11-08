'use client'

import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ScrollWords } from '@/components/motion/scroll-words'
import { ParallaxImage } from '@/components/motion/parallax-image'

const stats = [
  { value: 8, suffix: '+', label: 'Years of experience' },
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 34, suffix: '', label: 'Industry awards' },
  { value: 98, suffix: '%', label: 'Returning clients' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-primary" />
          About me
        </motion.p>

        <ScrollWords
          className="max-w-6xl text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl lg:text-6xl"
          text="I'm a multidisciplinary designer and developer who blends strategy, craft and code. For eight years I've partnered with startups and global brands to turn bold ideas into experiences people genuinely remember."
        />

        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ParallaxImage
            src="/images/portrait1.jpg"
            alt="Alex Rivera in the studio"
            className="aspect-[4/5] w-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-14">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="border-t border-border pt-6"
              >
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 text-6xl font-medium tracking-tighter md:text-7xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
