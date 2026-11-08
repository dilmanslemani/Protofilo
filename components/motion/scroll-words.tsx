'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((w, i) => {
        const start = i / words.length
        return (
          <Word key={`${w}-${i}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [12, 0])
  const filter = useTransform(progress, range, ['blur(6px)', 'blur(0px)'])

  return (
    <motion.span style={{ opacity, y, filter }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}
