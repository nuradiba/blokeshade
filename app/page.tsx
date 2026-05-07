"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from 'react'
import Preloader from './components/preloader'
import styles from './page.module.css'
import Zoom from './components/zoom'
import HorizontalScroll from './components/horizontal-scroll'
import Lenis from 'lenis'
import Projects from './components/projects'
import { projects } from './work/works'

const paragraph = "Blokeshade Lenswork is a dedicated partner for those who demand excellence in motorsport media. With an extensive background in covering both superbike and supercar events, we offer a specialized skill set that includes event documentation, private client commissions, and commercial product photography. Recognizing the shift toward vertical video, we have mastered the art of social media storytelling, delivering high-energy reels and aesthetic transitions that elevate your brand's presence on platforms like Instagram and TikTok."

const horizontalVideoId = "OrEBOPJERs0"
const verticalVideoId = "8w-IQ7guBwI"
const Scene = dynamic(() => import('./components/scene'), { ssr: false })

export default function Page() {

  // Initial Preloader
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0);
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])
  //End Preloader

  // Initial SVG Masking
  const container = useRef<HTMLDivElement | null>(null);
  const stickyMask = useRef<HTMLDivElement | null>(null);
  const mobileHero = useRef<HTMLDivElement | null>(null);
  const [isDesktopLayout, setIsDesktopLayout] = useState<boolean | null>(null);
  const [isDesktopHeroVisible, setIsDesktopHeroVisible] = useState(false);
  const [hasLoadedDesktopVideo, setHasLoadedDesktopVideo] = useState(false);
  const [hasLoadedMobileVideo, setHasLoadedMobileVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")

    const updateLayout = () => {
      setIsDesktopLayout(mediaQuery.matches)
    }

    updateLayout()
    mediaQuery.addEventListener("change", updateLayout)

    return () => mediaQuery.removeEventListener("change", updateLayout)
  }, [])

  useEffect(() => {
    if (!container.current || isDesktopLayout !== true) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDesktopHeroVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasLoadedDesktopVideo(true)
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    )

    observer.observe(container.current)

    return () => observer.disconnect()
  }, [isDesktopLayout])

  useEffect(() => {
    if (!mobileHero.current || isDesktopLayout !== false) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoadedMobileVideo(true)
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    )

    observer.observe(mobileHero.current)

    return () => observer.disconnect()
  }, [isDesktopLayout])

  useEffect(() => {
    if (!isDesktopHeroVisible || isDesktopLayout !== true) return;

    const initialMaskSize = .8;
    const targetMaskSize = 200;
    const easing = 0.15;
    let easedScrollProgress = 0;
    let animationFrameId: number;
    let previousFrameTime = 0;

    const getScrollProgress = () => {
      if (!container.current || !stickyMask.current) return 0;

      const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return easedScrollProgress
    }

    const animate = (time: number) => {
      if (!stickyMask.current) return;

      if (time - previousFrameTime > 33) {
        previousFrameTime = time;
        const maskSizeProgress = targetMaskSize * getScrollProgress();
        stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isDesktopHeroVisible, isDesktopLayout])
  // End SVG Masking

  // Initial Mouse Image Distortion
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [isWorkSceneEnabled, setIsWorkSceneEnabled] = useState(false)
  const [isProjectSectionInView, setIsProjectSectionInView] = useState(false)
  const projectSection = useRef<HTMLElement | null>(null)
  useEffect( () => {
    const lenis = new Lenis()
    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!projectSection.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProjectSectionInView(entry.isIntersecting)
        if (!entry.isIntersecting) {
          setActiveMenu(null)
        }
      },
      { rootMargin: "160px 0px", threshold: 0 }
    )

    observer.observe(projectSection.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)")

    const updateWorkScene = () => {
      setIsWorkSceneEnabled(mediaQuery.matches)
      if (!mediaQuery.matches) {
        setActiveMenu(null)
      }
    }

    updateWorkScene()
    mediaQuery.addEventListener("change", updateWorkScene)

    return () => mediaQuery.removeEventListener("change", updateWorkScene)
  }, [])
    // End Mouse Image Distortion

  return (
    <main className="bg-black text-white w-screen">
      {isLoading && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[120] h-1 overflow-hidden bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full w-1/3 bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      {isDesktopLayout === true && (
        <div ref={container} className={styles.container}>
          <div ref={stickyMask} className={styles.stickyMask}>
            {hasLoadedDesktopVideo && (
              <iframe
                className="w-screen pointer-events-none"
                title="Blokeshade desktop hero video"
                src={`https://www.youtube.com/embed/${horizontalVideoId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${horizontalVideoId}&start=10&end=100`}
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}
      {isDesktopLayout === false && (
      <div ref={mobileHero} className={styles.mobileHero}>
        <div className={styles.mobileVideo}>
          {hasLoadedMobileVideo && (
            <iframe
              className={styles.mobileVideoFrame}
              title="Blokeshade mobile hero video"
              src={`https://www.youtube.com/embed/${verticalVideoId}?controls=0&autoplay=1&mute=1&loop=1&playsinline=1&playlist=${verticalVideoId}&start=10&end=100`}
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
            />
          )}
          <div className={styles.mobileVideoOverlay} />
          <Image
            className={styles.mobileVideoLogo}
            src="/LOGO.PNG"
            alt="BLOKESHADE"
            width={560}
            height={235}
            priority
          />
        </div>
      </div>
      )}
      <section className="relative grid min-h-screen content-center overflow-hidden bg-black px-6 py-24 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.28fr_1fr] lg:items-start">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            <span className="h-px w-12 bg-white/40" />
            <span>Lenswork</span>
          </div>
          <div className="space-y-10">
            <p className="max-w-5xl text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {paragraph}
            </p>
            <div className="flex flex-col gap-5 border-l border-white/20 pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                Motorsport stories shaped with precision, pace, and a sharp eye for the moments between the noise.
              </p>
              <Link
                href="/about"
                className="relative z-[60] inline-flex w-fit items-center gap-3 rounded-full border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-white hover:text-black"
              >
                About Blokeshade
                <span aria-hidden="true" className="text-base leading-none">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {isDesktopLayout === true && (
        <section className="h-[300vh]">
          <Zoom />
        </section>
      )}
      {isDesktopLayout === false && (
        <section>
          <HorizontalScroll />
        </section>
      )}
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
              className="relative z-[60] inline-flex items-center gap-2 rounded-full border border-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black lg:gap-3 lg:px-8 lg:py-4 lg:text-sm lg:tracking-[0.35em]"
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
        <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-6 px-6 text-white sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
              Selected Work
            </p>
            <h2 className="text-4xl uppercase leading-none sm:text-6xl lg:text-8xl">
              Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="relative z-[60] inline-flex w-fit items-center gap-3 rounded-full border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-white hover:text-black"
          >
            View All Work
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </Link>
        </div>
        {isDesktopLayout === false && (
          <div className="px-6 sm:px-10">
            <div className="divide-y divide-white/15 border-y border-white/15">
              {projects.slice(0, 7).map((project, index) => (
                <Link
                  href="/work"
                  key={`${project.title}-${project.date}`}
                  className="grid gap-4 py-6"
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <time>{project.date}</time>
                  </div>
                  <div>
                    <h3 className="text-2xl uppercase leading-none text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">
                      {project.describe}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {isDesktopLayout === true && <Projects setActiveMenu={setActiveMenu} />}
        {isWorkSceneEnabled && isProjectSectionInView && <Scene activeMenu={activeMenu} />}
        <div className="h-[50vh]"></div>
      </section>
    </main>
  );
}
