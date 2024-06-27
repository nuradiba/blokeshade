"use client"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import Preloader from './components/preloader'
import styles from './page.module.css'
import Character from './components/character'

const paragraph = "Welcome to Blokeshade Enterprise, your go-to for top-tier photography and videography services in Malaysia. Specializing in motorsports, we capture the excitement of road photos, track action, product shoots, and unforgettable moments. Experience the thrill through our lens at Blokeshade."

export default function Page() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0);
    }, 2000)

  }, [])

  let container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = .8;
  const targetMaskSize = 30;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect( () => {
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
    </main>
  );
}
