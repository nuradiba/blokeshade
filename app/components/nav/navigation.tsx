import * as React from "react";
import { motion } from "framer-motion";
import { Item } from "./item";
import { Footer } from "./footer";
import { Copyright } from "./copyright";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <section className="px-[50px] py-[25px]">
    <motion.ul variants={variants}>
      {itemIds.map(i => (
        <Item i={i} key={i} />
      ))}
    </motion.ul>
    <motion.div variants={variants} className="absolute bottom-32">
      {itemIds.map(i => (
        <Footer i={i} key={i} />
      ))}
    </motion.div>
    <motion.div variants={variants}><Copyright /></motion.div>
  </section>
);

const itemIds = [0, 1, 2, 3, 4];
