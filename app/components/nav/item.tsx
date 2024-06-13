import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const menu = ["HOME", "WORK", "GALLERY", "ABOUT"];
const href = ["/", "/work", "/gallery", "/about"];

export const Item = ({ i }:{i:any}) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <a className="text-5xl text-gray-700" href={href[i]}>{menu[i]}</a>
    </motion.li>
  );
};
