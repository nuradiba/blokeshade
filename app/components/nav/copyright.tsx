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

export const Copyright = () => {
    return (
        <motion.div variants={variants} className="text-xs text-black absolute bottom-10">©BLOKESHADE</motion.div>
    );
};
