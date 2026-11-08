'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { RevealText } from '@/components/motion/reveal-text'

const projects = [
  {
    title: 'Lumen Finance',
    category: 'Product Design · App',
    year: '2026',
    description: 'A calm, fast mobile banking experience for a new generation of savers.',
    image: '/images/project-1.png',
  },
  {
    title: 'Programing',
    category: 'Developing  · Packaging',
    year: '2025',
    description: 'A sculptural identity system for a luxury Software company.',
    image: '/images/project-2.jpg',
  },
  {
    title: 'Chroma Studio',
    category: '3D · Motion Direction',
    year: '2025',
    description: 'Generative chrome forms and a launch film for an audio-visual label.',
    image: '/images/project-3.png',
  },
  {
    title: 'Brut Architects',
    category: 'Web Design · Development',
    year: '2024',
    description: 'An editorial website celebrating raw concrete and honest materials.',
    image: '/images/project-4.png',
  },
]

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: (typeof projects)[number]
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.6, 1])
  const scale = useTransform(progress, range, [1, targetScale])
  const brightness = useTransform(progress, range, ['brightness(1)', 'brightness(0.55)'])

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center px-4 md:px-8">
      <motion.article
        style={{ scale, filter: brightness, top: `calc(6vh + ${index * 28}px)` }}
        className="group relative flex h-[72svh] w-full max-w-7xl origin-top flex-col overflow-hidden rounded-[2rem] border border-border bg-card"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden />

        <div className="relative mt-auto flex flex-col gap-6 p-6 text-white md:flex-row md:items-end md:justify-between md:p-10">
          <div>
            <p className="mb-3 text-sm text-white/70">
              {String(index + 1).padStart(2, '0')} &mdash; {project.category}
            </p>
            <h3 className="text-5xl font-medium tracking-tighter md:text-7xl">{project.title}</h3>
            <p className="mt-3 max-w-md text-pretty text-white/75">{project.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">{project.year}</span>
            <a
              href="#contact"
              aria-label={`Ask about ${project.title}`}
              className="flex size-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45"
            >
              <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="pt-32 md:pt-48">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <RevealText
          text="Selected work"
          highlight={['work']}
          className="text-6xl font-medium tracking-tighter md:text-8xl lg:text-9xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-pretty text-muted-foreground"
        >
          A handful of recent collaborations across product, brand and motion.
        </motion.p>
      </div>

      <div ref={ref} className="relative mt-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            targetScale={1 - (projects.length - i) * 0.05}
          />
        ))}
      </div>
    </section>
  )
}
