'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { INTRO_DELAY } from './preloader'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '110%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.1, ease, delay: INTRO_DELAY + delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textBlur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(10px)'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -6])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-32 md:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1fr_auto]">
        <motion.div style={{ y: textY, opacity: textOpacity, filter: textBlur }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: INTRO_DELAY }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Available for new projects &mdash; 2026
          </motion.p>

          <h1 className="text-balance text-[13vw] font-medium leading-[0.92] tracking-[-0.05em] md:text-[8.5vw] lg:text-[7.5rem]">
            <Line delay={0}>Creative developer</Line>
            <Line delay={0.1}>
              crafting <span className="font-serif font-normal italic text-primary">bold</span>
            </Line>
            <Line delay={0.2}>digital experiences.</Line>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: INTRO_DELAY + 0.5 }}
              className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              I&apos;m dilman  &mdash; a designer and engineer helping ambitious brands turn ideas into
              motion-rich websites, products and identities.
            </motion.p>

            <motion.a
              href="#work"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: INTRO_DELAY + 0.7 }}
              className="group flex items-center gap-3 text-sm font-medium"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowDown className="size-4 animate-bounce" />
              </span>
              Scroll to explore
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: INTRO_DELAY + 0.15 }}
          style={{ y: imageY, rotate: imageRotate }}
          className="relative hidden aspect-[4/5] w-72 overflow-hidden rounded-3xl lg:block xl:w-80"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Alex Rivera"
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
