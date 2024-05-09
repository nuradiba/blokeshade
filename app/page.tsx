"use client"
import { motion } from "framer-motion"
import { projects } from './data'
import { useScroll } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Card from './card'
import Lenis from '@studio-freight/lenis'

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })
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
      <section>
        {
          projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
          })
        }
        <div className="flex justify-center">
          <div className="mt-[-13rem]">
            <button className="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900">
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10">
                <span>View more portfolio</span>
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  data-slot="icon" className="w-6 h-6">
                  <path fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-stone-400/0 via-gray-400/90 to-stone-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
