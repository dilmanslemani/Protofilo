'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Magnetic } from '@/components/motion/magnetic'

const socials = [
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/dilman._.1/?utm_source=ig_web_button_share_sheet' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dilman-hamaamin-556824424/' },
  { label: 'GitHub', href: 'https://github.com/dilmanslemani' },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1])
  const y = useTransform(scrollYProgress, [0, 0.8], [150, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.8], [-4, 0])

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden rounded-t-[2.5rem] bg-foreground px-4 pb-8 pt-32 text-background md:px-8 md:pt-48"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div style={{ scale, y, opacity, rotate }} className="origin-bottom-left">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-background/60">Have a project in mind?</p>
          <h2 className="text-balance text-[15vw] font-medium leading-[0.9] tracking-[-0.06em] md:text-[10vw] lg:text-[9rem]">
            {"Let's work"}{' '}
            <span className="font-serif font-normal italic text-primary">together.</span>
          </h2>
        </motion.div>

        <div className="mt-16 flex flex-col gap-12 border-t border-background/15 pt-12 md:flex-row md:items-center md:justify-between">
          <a
            href="mailto:hello@alexrivera.design"
            className="text-2xl font-medium tracking-tight underline-offset-8 hover:underline md:text-4xl"
          >
            dilmanslemani001@gmail.com
          </a>
          <Magnetic>
            <a
              href="mailto:dilmanslemani001@gmail.com"
              className="flex size-36 flex-col items-center justify-center gap-1 rounded-full bg-primary text-center text-sm font-medium text-primary-foreground transition-transform hover:scale-105 md:size-44"
            >
              <ArrowUpRight className="size-6" />
              Get in touch
            </a>
          </Magnetic>
        </div>

        <div className="mt-24 flex flex-col gap-6 text-sm text-background/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 dilman.softwareeng. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-background"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="transition-colors hover:text-background">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
