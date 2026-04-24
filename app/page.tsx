"use client"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from 'react'
import Preloader from './components/preloader'
import styles from './page.module.css'
import Zoom from './components/zoom'
import HorizontalScroll from './components/horizontal-scroll'
import Lenis from 'lenis'
import Projects from './components/projects'
import Scene from './components/scene'

const paragraph = "Welcome to Blokeshade, your go-to for top-tier photography and videography services in Malaysia. Specializing in motorsports, we capture the excitement of road photos, track action, product shoots, and unforgettable moments. Experience the thrill through our lens at Blokeshade."

const horizontalVideoId = "FrSHYxpsBhk"
const verticalVideoId = "gtD2_zLSdiA"

export default function Page() {

  // Initial Preloader
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0);
    }, 2000)
  }, [])
  //End Preloader

  // Initial SVG Masking
  const container = useRef<HTMLDivElement | null>(null);
  const stickyMask = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initialMaskSize = .8;
    const targetMaskSize = 200;
    const easing = 0.15;
    let easedScrollProgress = 0;
    let animationFrameId: number;

    const getScrollProgress = () => {
      if (!container.current || !stickyMask.current) return 0;

      const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return easedScrollProgress
    }

    const animate = () => {
      if (!stickyMask.current) return;

      const maskSizeProgress = targetMaskSize * getScrollProgress();
      stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])
  // End SVG Masking

  // Initial Mouse Image Distortion
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const projectSection = useRef<HTMLElement | null>(null)
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!projectSection.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveMenu(null)
        }
      },
      { threshold: 0 }
    )

    observer.observe(projectSection.current)

    return () => observer.disconnect()
  }, [])
    // End Mouse Image Distortion

  return (
    <main className="bg-black text-white w-screen">
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className="hidden lg:block">
        <div ref={container} className={styles.container}>
          <div ref={stickyMask} className={styles.stickyMask}>
            <iframe
              className="w-screen pointer-events-none"
              src={`https://www.youtube.com/embed/${horizontalVideoId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${horizontalVideoId}&start=10&end=100`}
            />
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${styles.mobileHero}`}>
        <div className={styles.mobileVideo}>
          <iframe
            className={styles.mobileVideoFrame}
            title="Blokeshade mobile hero video"
            src={`https://www.youtube.com/embed/${verticalVideoId}?controls=0&autoplay=1&mute=1&loop=1&playsinline=1&playlist=${verticalVideoId}&start=10&end=100`}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
          <div className={styles.mobileVideoOverlay} />
          <div className={styles.mobileVideoTitle}>BLOKESHADE</div>
        </div>
      </div>
      <section className="grid content-center h-screen my-10">
        <p className="paragraph lg:text-5xl text-2xl font-bold leading-snug text-justify">{paragraph}</p>
      </section>
      <section className="h-[300vh] hidden lg:block">
        <Zoom />
      </section>
      <section className="lg:hidden">
        <HorizontalScroll />
      </section>
      <section className="bg-black mt-4 lg:mt-8 px-8 pb-24 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/gallery">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.2,
                },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black lg:gap-3 lg:px-8 lg:py-4 lg:text-sm lg:tracking-[0.35em]"
            >
              Explore Gallery
              <span aria-hidden="true" className="text-sm leading-none lg:text-lg">
                →
              </span>
            </motion.span>
          </Link>
        </motion.div>
      </section>
      <section ref={projectSection} className="w-screen max-w-none overflow-hidden font-gatwick">
        <div className="h-[20vh]"></div>
        <Projects setActiveMenu={setActiveMenu} />
        <Scene activeMenu={activeMenu} />
        <div className="h-[50vh]"></div>
      </section>
    </main>
  );
}
