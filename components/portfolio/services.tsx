'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'

const services = [
  {
    title: 'Brand Identity',
    description: 'Strategy, naming, logo systems and guidelines that give your brand a distinct voice.',
    tags: ['Strategy', 'Logo', 'Guidelines'],
  },
  {
    title: 'Web Design & Development',
    description: 'Fast, accessible, animated websites built with Next.js and a obsessive eye for detail.',
    tags: ['UI/UX', 'Next.js', 'CMS'],
  },
  {
    title: 'Motion & Interaction',
    description: 'Micro-interactions, scroll stories and launch films that make products feel alive.',
    tags: ['Animation', 'WebGL', 'Video'],
  },
  {
    title: 'Creative Direction',
    description: 'End-to-end direction for campaigns and launches, from first sketch to final frame.',
    tags: ['Concept', 'Art Direction', 'Campaigns'],
  },
]

export function Services() {
  return (
    <section id="services" className="px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <RevealText
          text="What I can do for you"
          highlight={['you']}
          className="max-w-4xl text-5xl font-medium tracking-tighter md:text-7xl lg:text-8xl"
        />

        <ul className="mt-20 border-t border-border">
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
              className="group relative overflow-hidden border-b border-border"
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
                aria-hidden
              />
              <div className="relative grid gap-4 py-10 transition-colors duration-500 group-hover:text-primary-foreground md:grid-cols-[80px_1fr_1fr_auto] md:items-center md:gap-8 md:px-6">
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-medium tracking-tight md:text-5xl">{service.title}</h3>
                <div>
                  <p className="text-pretty text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs transition-colors group-hover:border-primary-foreground/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="hidden size-8 -rotate-45 transition-transform duration-500 group-hover:rotate-0 md:block" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
