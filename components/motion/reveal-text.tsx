'use client'

import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

type RevealTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  highlight?: string[]
  delay?: number
  once?: boolean
}

const word: Variants = {
  hidden: { y: '115%', rotate: 6, opacity: 0 },
  visible: ({ i, delay }: { i: number; delay: number }) => ({
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.06 },
  }),
}

export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  highlight = [],
  delay = 0,
  once = false,
}: RevealTextProps) {
  const words = text.split(' ')

  return (
    <Tag className={cn('flex flex-wrap', className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="flex flex-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.4 }}
      >
        {words.map((w, i) => {
          const isHighlight = highlight.includes(w.replace(/[.,!?]/g, ''))
          return (
            <span key={`${w}-${i}`} className="mr-[0.22em] inline-flex overflow-hidden pb-[0.08em]">
              <motion.span
                custom={{ i, delay }}
                variants={word}
                className={cn(
                  'inline-block origin-bottom-left',
                  isHighlight && 'font-serif italic font-normal text-primary',
                )}
              >
                {w}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}
