"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import Preloader from './components/preloader'
import styles from './page.module.css'
import Character from './components/character'
import Image from 'next/image'
import Zoom from './components/zoom'

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
  let container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = .8;
  const targetMaskSize = 200;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect(() => {
    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
    requestAnimationFrame(animate)
  }

  const getScrollProgress = () => {
    const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return easedScrollProgress
  }
  // End SVG Masking

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
      <section className="grid content-center h-screen mt-10">
        <Character paragraph={paragraph} />
      </section>
      <section className="h-[300vh]">
        <Zoom />
      </section>
    </main>
  );
}

const Column = ({ images, y = 0 }: { images: any[], y: any }) => {
  return (
    <motion.div style={{ y }} className={styles.column}>
      {
        images.map((src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image className='object-cover' src={`/${src}`} alt='image' fill />
          </div>
        })
      }
    </motion.div>
  )
}
