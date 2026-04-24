import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';
import { galleryImages } from './gallery-images';

export default function Zoom() {
    
    const imageContainer = useRef(null);
    const { scrollYProgress } = useScroll({
        target: imageContainer,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const zoomPicturesDesktop = [
        {
            ...galleryImages[0],
            scale: scale4
        },
        {
            ...galleryImages[1],
            scale: scale5
        },
        {
            ...galleryImages[2],
            scale: scale6
        },
        {
            ...galleryImages[3],
            scale: scale5
        },
        {
            ...galleryImages[4],
            scale: scale6
        },
        {
            ...galleryImages[5],
            scale: scale8
        },
        {
            ...galleryImages[6],
            scale: scale9
        }
    ]

    return (
        <div ref={imageContainer} className='zoomParallax'>
            <div className='sticky'>
                {
                    zoomPicturesDesktop.map( ({src, alt, scale}, index) => {
                        return <motion.div key={index} style={{scale}} className='el'>
                            <div className='imageContainer'>
                                <Image
                                    src={src}
                                    fill
                                    alt={alt}
                                />
                            </div>
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}
