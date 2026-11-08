'use client'

import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

export function Showreel() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const insetY = useTransform(scrollYProgress, [0, 0.45], [22, 0])
  const insetX = useTransform(scrollYProgress, [0, 0.45], [28, 0])
  const radius = useTransform(scrollYProgress, [0, 0.45], [32, 0])
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`
  const videoScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.3, 1, 1.08])

  const leftX = useTransform(scrollYProgress, [0, 0.4], ['0vw', '-40vw'])
  const rightX = useTransform(scrollYProgress, [0, 0.4], ['0vw', '40vw'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  const overlayOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.85, 0.98], [0, 1, 1, 0])
  const overlayY = useTransform(scrollYProgress, [0.45, 0.6, 0.85, 0.98], [80, 0, 0, -80])
  const dim = useTransform(scrollYProgress, [0.45, 0.6], [0, 0.45])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="showreel" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.video
            ref={videoRef}
            style={{ scale: videoScale }}
            className="size-full object-cover"
            src="/showreel.mp4"
            poster="/images/showreel.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Showreel of selected projects"
          />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black" aria-hidden />
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none relative z-10 flex w-full items-center justify-between px-4 text-[14vw] font-medium leading-none tracking-[-0.06em] mix-blend-difference text-white md:px-8 md:text-[11vw]"
          aria-hidden
        >
          <motion.span style={{ x: leftX }}>Show</motion.span>
          <motion.span style={{ x: rightX }} className="font-serif font-normal italic">
            reel
          </motion.span>
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Showreel 2026</p>
          <h2 className="max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-7xl lg:text-8xl">
            Motion is the language of <span className="font-serif font-normal italic">emotion.</span>
          </h2>
        </motion.div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause showreel' : 'Play showreel'}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/25"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  )
}
