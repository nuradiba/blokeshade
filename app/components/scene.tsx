'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './model'

type SceneProps = {
  activeMenu: number | null
}

export default function Scene({activeMenu}: SceneProps): React.JSX.Element {
  return (
    <div className='fixed top-0 h-screen w-full'>
        <Canvas>
            <Model activeMenu={activeMenu}/>
        </Canvas>
    </div>
  )
}
