import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

const pictures = [
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776832061/IMG_3193_rgk55d.jpg',
        alt: 'Blokeshade gallery image 1'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831686/IMG_2157_compressed_pkyehe.jpg',
        alt: 'Blokeshade gallery image 2'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831681/IMG_2125_keeuhz.jpg',
        alt: 'Blokeshade gallery image 3'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831677/IMG_2134_rx421r.jpg',
        alt: 'Blokeshade gallery image 4'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831672/IMG_3858_nealcz.jpg',
        alt: 'Blokeshade gallery image 5'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831670/IMG_3888_rppyun.jpg',
        alt: 'Blokeshade gallery image 6'
    },
    {
        src: 'https://res.cloudinary.com/dwkui4w8n/image/upload/v1776831670/IMG_3857_dwxrq9.jpg',
        alt: 'Blokeshade gallery image 7'
    }
];

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
            ...pictures[0],
            scale: scale4
        },
        {
            ...pictures[1],
            scale: scale5
        },
        {
            ...pictures[2],
            scale: scale6
        },
        {
            ...pictures[3],
            scale: scale5
        },
        {
            ...pictures[4],
            scale: scale6
        },
        {
            ...pictures[5],
            scale: scale8
        },
        {
            ...pictures[6],
            scale: scale9
        }
    ]

    const zoomPicturesMobile = [
        {
            ...pictures[4],
            scale: scale4
        },
        {
            ...pictures[0],
            scale: scale5
        },
        {
            ...pictures[2],
            scale: scale6
        },
        {
            ...pictures[3],
            scale: scale5
        },
        {
            ...pictures[1],
            scale: scale6
        },
        {
            ...pictures[5],
            scale: scale8
        },
        {
            ...pictures[6],
            scale: scale9
        }
    ]

    return (
        <div ref={imageContainer} className='zoomParallax'>
            <div className='sticky'>
                <div className='hidden lg:block'>
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
                <div className='lg:hidden'>
                    {
                    zoomPicturesMobile.map( ({src, alt, scale}, index) => {
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
        </div>
    )
}
