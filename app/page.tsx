"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { projects } from './data'
import { useEffect, useRef } from 'react'
import Character from './components/character'
import Image from 'next/image'
import ALIP0330 from '../public/ALIP0330.jpeg'
import Lenis from '@studio-freight/lenis'
import Zoom from './components/zoom'
import Link from 'next/link'

const paragraph = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis()
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
          <p className='sm:w-[50vw] sm:text-[2vw] self-end uppercase text-justify font-semibold'>Beauty and quality need the right time to be conceived and realised even in a world that is in too much of a hurry.</p>
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
      <section className="grid content-center h-screen">
        <div>
          <div>
            <h1 className="text-4xl font-bold text-center pb-10">Projects</h1>
          </div>
          {
            projects.map((project, i) => (
              <Link href={`/gallery/${project.ref}`}>
              <div key={i} className="text-right border-t-2 py-3 px-3 md:px-20 hover:text-center hover:bg-white hover:text-black">
                  <span>{project.title}</span>
              </div>
              </Link>
            ))
          }
          <div className="border-t-2" />
        </div>
      </section>
    </main>
  );
}
