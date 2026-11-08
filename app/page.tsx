import { Preloader } from '@/components/portfolio/preloader'
import { SiteHeader } from '@/components/portfolio/site-header'
import { Hero } from '@/components/portfolio/hero'
import { VelocityMarquee } from '@/components/portfolio/velocity-marquee'
import { Work } from '@/components/portfolio/work'
import { Showreel } from '@/components/portfolio/showreel'
import { About } from '@/components/portfolio/about'
import { ZoomGallery } from '@/components/portfolio/zoom-gallery'
import { Services } from '@/components/portfolio/services'
import { Contact } from '@/components/portfolio/contact'

export default function Page() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main>
        <Hero />
        <VelocityMarquee />
        <Work />
        <Showreel />
        <About />
        <ZoomGallery />
        <Services />
      </main>
      <Contact />
    </>
  )
}
