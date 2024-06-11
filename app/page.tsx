"use client"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import Character from './components/character'
import Preloader from './components/preloader'
import Image from 'next/image'
import ALIP0330 from '../public/ALIP0330.jpeg'
import Lenis from '@studio-freight/lenis'
import Zoom from './components/zoom'

const paragraph = "Experience the adrenaline of motorsports through our lens at Blokeshade Enterprise. From track to road, we immortalize every electrifying moment. Enjoy the pictures above!"

export default function Page() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis()

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0);
    }, 2000)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main className="bg-black text-white w-screen">
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <section className="grid h-screen">
        <div className="place-self-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          ><h1 className="text-5xl md:text-8xl font-bold">BLOKESHADE</h1></motion.div>
          <div className="flex justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 2,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <h2 className="text-xs md:text-xl font-bold">PHOTOGRAPHY</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 2.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <h2 className="text-xs md:text-xl font-bold">VIDEOGRAPHY</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 3,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <h2 className="text-xs md:text-xl font-bold">GRAPHIC DESIGN</h2>
            </motion.div>
          </div>
        </div>
      </section>
      <section ref={container}
        className='relative flex items-center justify-center h-screen'
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <div className='relative z-10 p-20 text-white w-full h-full flex flex-col justify-between'>
          <p className='sm:w-[50vw] sm:text-[2vw] self-end uppercase text-justify font-semibold'>Welcome to Blokeshade Enterprise, your go-to for top-tier photography and videography services in Malaysia. Specializing in motorsports, we capture the excitement of road photos, track action, product shoots, and unforgettable moments. Experience the thrill through our lens at Blokeshade Enterprise.</p>
        </div>
        <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
          <motion.div style={{ y }} className='relative w-full h-full'>
            <Image src={ALIP0330} alt="image" fill style={{ objectFit: "cover" }} sizes="100vw" className="brightness-50" />
          </motion.div>
        </div>
      </section>
      <section className="grid content-center h-screen">
        <Character paragraph={paragraph} />
      </section>
      <Zoom />
    </main>
  );
}
