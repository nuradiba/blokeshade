import { JSX, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { anim } from './anim';

export default function TextDipserse({children}:{children:any}) {
  
    const [isAnimated, setIsAnimated] = useState(false);
  
    const getChars = (element: { props: { children: any; }; }) => {
      let chars: JSX.Element[] = [];
      const word = element.props.children
      word.split("").forEach( (char: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | MotionValue<number> | MotionValue<string> | null | undefined, i: any) => {
        chars.push(<motion.span custom={i} variants={anim} animate={isAnimated ? "open" : "closed"} key={char + i}>{char}</motion.span>)
      })
      return chars;
    }
  
    const manageMouseEnter = () => {
      setIsAnimated(true);
    }
    const manageMouseLeave = (p0: boolean) => {
      setIsAnimated(false);
    }
  
    return (
      <div style={{cursor: "pointer"}} onMouseEnter={() => {manageMouseEnter()}} onMouseLeave={() => {manageMouseLeave(false)}} className='introLine'>
      { getChars(children) }
      </div>
    )
  }