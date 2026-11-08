'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

const tiles = [
  { src: '/images/showreel.png', alt: 'Designer working in a glowing studio', scale: 4, className: 'h-[25vh] w-[25vw]' },
  { src: '/images/project-1.png', alt: 'Fintech app mockup', scale: 5, className: '-top-[30vh] left-[5vw] h-[30vh] w-[35vw]' },
  { src: '/images/project-6.jpg', alt: 'Skincare packaging', scale: 6, className: '-top-[10vh] -left-[25vw] h-[45vh] w-[20vw]' },
  { src: '/images/project-3.png', alt: 'Chrome 3D render', scale: 5, className: 'left-[27.5vw] h-[25vh] w-[25vw]' },
  { src: '/images/project-4.png', alt: 'Architecture website', scale: 6, className: 'top-[27.5vh] left-[5vw] h-[25vh] w-[20vw]' },
  { src: '/images/portrait.jpg', alt: 'Portrait of Alex Rivera', scale: 8, className: 'top-[27.5vh] -left-[22.5vw] h-[25vh] w-[30vw]' },
  { src: '/images/project-3.png', alt: 'Chrome detail', scale: 9, className: 'top-[22.5vh] left-[25vw] h-[15vh] w-[15vw]' },
]

function Tile({ tile, progress }: { tile: (typeof tiles)[number]; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [1, tile.scale])
  return (
    <motion.div style={{ scale }} className="absolute inset-0 flex items-center justify-center">
      <div className={cn('relative overflow-hidden rounded-xl', tile.className)}>
        <Image src={tile.src} alt={tile.alt} fill sizes="40vw" className="object-cover" />
      </div>
    </motion.div>
  )
}

export function ZoomGallery() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const headingScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8])
  const endOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])
  const endY = useTransform(scrollYProgress, [0.75, 0.9], [60, 0])

  return (
    <section ref={ref} aria-label="Playground gallery" className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {tiles.map((tile, i) => (
          <Tile key={i} tile={tile} progress={scrollYProgress} />
        ))}

        <motion.div
          style={{ opacity: headingOpacity, scale: headingScale }}
          className="pointer-events-none absolute inset-x-0 top-24 z-10 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Playground</p>
        </motion.div>

        <motion.div
          style={{ opacity: endOpacity, y: endY }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 px-6 text-center"
        >
          <h2 className="max-w-4xl text-balance text-5xl font-medium leading-none tracking-tighter text-white md:text-8xl">
            Every pixel <span className="font-serif font-normal italic">intentional.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
