'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'
import { Asterisk } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

const items = ['Brand Identity', 'Web Design', 'Motion', 'Development', '3D & WebGL', 'Art Direction']

function Row({ baseVelocity, outlined }: { baseVelocity: number; outlined?: boolean }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex flex-nowrap">
        {Array.from({ length: 4 }).map((_, k) => (
          <span key={k} className="flex shrink-0 items-center" aria-hidden={k > 0}>
            {items.map((item) => (
              <span
                key={item}
                className={cn(
                  'flex items-center gap-6 pr-6 text-6xl font-medium tracking-tighter md:text-8xl',
                  outlined && 'font-serif font-normal italic text-primary',
                )}
              >
                {item}
                <Asterisk className="size-10 text-primary md:size-14" aria-hidden />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function VelocityMarquee() {
  return (
    <section aria-label="Disciplines" className="flex flex-col gap-2 border-y border-border py-10">
      <Row baseVelocity={-2} />
      <Row baseVelocity={2} outlined />
    </section>
  )
}
