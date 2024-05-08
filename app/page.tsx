"use client"
import { motion } from "framer-motion"

export default function Home() {
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
    </main>
  );
}
