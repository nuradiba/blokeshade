"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { galleryImages } from "./gallery-images";

export default function HorizontalScroll() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-78%"]);

  return (
    <div ref={container} className="relative h-[220vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-5 pt-8">
          <p className="liner text-xs uppercase tracking-[0.3em] text-white/70">
            Gallery
          </p>
          <h2 className="mt-4 max-w-xs text-4xl font-black uppercase leading-none text-white">
            Scroll Through The Frame
          </h2>
        </div>
        <div className="flex flex-1 items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 px-5">
            {galleryImages.map((image, index) => (
              <article
                key={image.src}
                className="relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="78vw"
                  className="object-cover"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/60">
                    Blokeshade
                  </p>
                  <p className="mt-2 text-lg font-semibold uppercase text-white">
                    Shot {index + 1}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
