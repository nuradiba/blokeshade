"use client"
import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Dimensions } from "./components/nav/dimensions";
import { Toggle } from "./components/nav/toggle";
import { Navigation } from "./components/nav/navigation";
import Disperse from "./components/disperse";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export default function Header() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = Dimensions(containerRef);

  return (
    <header className="absolute z-50 inset-0">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="sm:hidden"
      >
        <motion.div className="background" variants={sidebar} />
        <Navigation />
        <Toggle toggle={() => toggleOpen()} />
      </motion.nav>
      <nav className="hidden sm:block">
        <div className="flex gap-10 justify-center p-10 tracking-wider font-semibold">
          <a href="/"><Disperse><span>HOME</span></Disperse></a>
          <a href="/work"><Disperse><span>WORK</span></Disperse></a>
          <a href="/gallery"><Disperse><span>GALLERY</span></Disperse></a>
          <a href="/about"><Disperse><span>ABOUT</span></Disperse></a>
        </div>
      </nav>
    </header>
  );
};
