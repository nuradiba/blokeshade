import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useRef } from 'react'

export default function Paragraph({paragraph}:{paragraph:any}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.7", "start 0.1"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className="paragraph text-3xl sm:text-5xl"
    >
    {
      words.map( (word:any, i:any) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>
  )
}

const Word = ({children, progress, range}:{children:any, progress:any, range:any}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="word">
      {
        children.split("").map((char:string, i:number) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

const Char = ({children, progress, range}:{children:any, progress:any, range:any}) => {
  const opacity = useTransform(progress, range, [0,1])
  return (
    <span>
      <span className="shadow">{children}</span>
      <motion.span style={{opacity}}>{children}</motion.span>
    </span>
  )
}