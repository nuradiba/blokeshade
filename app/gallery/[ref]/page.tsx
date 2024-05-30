'use client'
import { projects } from './../../data'
import { EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-creative'
import Image from 'next/image'

//START DELETE LATER
import ALIP0330 from '../../../public/ALIP0330.jpeg'
import Picture1 from '../../../public/1.jpeg'
import Picture2 from '../../../public/2.jpeg'
import Picture3 from '../../../public/3.jpeg'
import Picture4 from '../../../public/4.jpeg'
//END DELETE LATER

export default function Page({ params }: { params: { ref: string } }) {
    const data = projects.find((project) => project.ref === params.ref)
    return (
        <main className='bg-black h-screen flex flex-col justify-center px-5 py-10 lg:px-80 lg:py-20'>
            <h1 className='font-about text-2xl lg:text-3xl font-semibold tracking-wider text-white text-center mb-16 lg:mb-10'>{data?.title}</h1>
            <p className='text-xs animate-bounce text-white hidden lg:block'>Slide to the left</p>
            <section className='flex items-center justify-center'>
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-20%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectCreative]}
            >
                <SwiperSlide className='flex items-center justify-center'><Image alt="Mountains" src={ALIP0330} className='w-full' /></SwiperSlide>
                <SwiperSlide className='flex items-center justify-center'><Image alt="Mountains" src={Picture1} className='w-full' /></SwiperSlide>
                <SwiperSlide className='flex items-center justify-center'><Image alt="Mountains" src={Picture2} className='w-full' /></SwiperSlide>
                <SwiperSlide className='flex items-center justify-center'><Image alt="Mountains" src={Picture3} className='w-full' /></SwiperSlide>
                <SwiperSlide className='flex items-center justify-center'><Image alt="Mountains" src={Picture4} className='w-full' /></SwiperSlide>
            </Swiper>
        </section>
        <p className='text-xs animate-bounce text-white lg:hidden mt-3'>Slide to the left</p>
        </main>    
    );
}