'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const Card = ({i, title, description, src, date, color, text, progress, range, targetScale}: {
    i: any;
    title: any;
    description: any;
    src: any;
    date: any;
    color: any;
    text: any;
    progress: any;
    range: any;
    targetScale: any;}) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
        style={{backgroundColor: color, scale, top:`calc(-5vh + ${i * 25}px)`}} 
        className={'h-[700px] md:h-[500px] '+styles.card}
      >
        <h2 className={'font-semibold '+text}>{title}</h2>
        <div className={'flex-col md:flex-row mt-0 md:mt-10 '+styles.body}>
          <div className={'w-full md:w-5/12 '+styles.description+' '+text}>
            <p>{description}</p>
            <span>
              <small className={'italic text-gray-100 '+text}>{date}</small>
            </span>
          </div>

          <div className={'w-full md:w-7/12 mt-3 md:mt-0 '+styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{scale: imageScale}}
            >
              <Image
                fill
                src={`/${src}`}
                alt="image" 
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Card