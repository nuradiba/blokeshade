"use client"
import { AnimatePresence, useTransform, useScroll, motion } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import Preloader from './components/preloader'
import styles from './page.module.css'
import Character from './components/character'
import useDimension from './components/useDimension'
import Image from 'next/image'
import Lenis from 'lenis'

const paragraph = "Welcome to Blokeshade Enterprise, your go-to for top-tier photography and videography services in Malaysia. Specializing in motorsports, we capture the excitement of road photos, track action, product shoots, and unforgettable moments. Experience the thrill through our lens at Blokeshade."

const images = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "ALIP0330.jpeg",
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg"
]

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

  const gallery = useRef(null);
  const { height } = useDimension();
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {

    const lenis = new Lenis()

    function raf(time: number){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  // Initial SVG Masking
  let container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = .8;
  const targetMaskSize = 30;
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
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <iframe className="w-screen pointer-events-none	" src="https://www.youtube.com/embed/COrZude7To4?si=MZJeRTENZ_PbktaE&amp;controls=0&autoplay=1&mute=1&loop=1&playlist=COrZude7To4&start=10&end=100&showinfo=0" />
        </div>
      </div>
      <section className="grid content-center h-screen">
        <Character paragraph={paragraph} />
      </section>
      <section>
        <div className='h-screen' />
        <div ref={gallery} className={styles.gallery}>
          <Column images={[images[0], images[1], images[2]]} y={y}  />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
        <div className='h-screen' />
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
