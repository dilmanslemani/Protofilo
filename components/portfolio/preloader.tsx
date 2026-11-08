'use client'

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

export const INTRO_DELAY = 1.5

export function Preloader() {
  const [done, setDone] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString().padStart(3, '0'))

  useEffect(() => {
    const controls = animate(count, 100, { duration: 1.2, ease: [0.65, 0, 0.35, 1] })
    const timer = setTimeout(() => setDone(true), 1350)
    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [count])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-foreground p-6 text-background md:p-10"
          aria-hidden
        >
          <div className="flex items-center justify-between text-sm uppercase tracking-widest">
            <span>dilman</span>
            <span>Portfolio &copy; 2026</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="overflow-hidden font-serif text-4xl italic md:text-6xl">
              <motion.span
                className="inline-block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Loading the experience
              </motion.span>
            </span>
            <motion.span className="text-7xl font-medium tabular-nums tracking-tighter md:text-[10rem] md:leading-none">
              {rounded}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
