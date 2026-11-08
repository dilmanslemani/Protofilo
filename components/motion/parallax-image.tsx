'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function ParallaxImage({ src, alt, className, priority, sizes = '100vw' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [
      'inset(18% 12% 18% 12% round 28px)',
      'inset(0% 0% 0% 0% round 28px)',
      'inset(0% 0% 0% 0% round 28px)',
      'inset(18% 12% 18% 12% round 28px)',
    ],
  )
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.35, 1.1, 1.35])

  return (
    <motion.div ref={ref} style={{ clipPath }} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  )
}
