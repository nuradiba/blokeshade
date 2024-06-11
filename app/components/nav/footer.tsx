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

const link = ["https://instagram.com/blokeshade", "https://wa.me/60134901462?text=Hi%20Blokeshade,%20can%20I%20get%20the%20package%20for%20photography/videography?", "mailto:blokeshade.service@gmail.com"];
const title = ["INSTAGRAM", "WHATSAPP", "EMAIL"];

export const Footer = ({ i }: { i: any }) => {
    return (
        <motion.a
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 grid text-xl mt-2"
            href={link[i]}
        >{title[i]}</motion.a>
    );
};
