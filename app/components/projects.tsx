import React from 'react'
import { projects } from '../work/works';

type ProjectsProps = {
  setActiveMenu: (index: number | null) => void
}

export default function Projects({setActiveMenu}: ProjectsProps): React.JSX.Element {
  return (
    <div className='relative mix-blend-difference z-10 text-white h-screen w-screen'>
      <ul onMouseLeave={() => {setActiveMenu(null)}} className='static w-screen border-b'>
        {
          projects.map( (project, i) => {
            return (
              <li
                onClick={() => {setActiveMenu(i)}}
                onMouseOver={() => {setActiveMenu(i)}}
                key={project.title}
                className='text-[4vw] p-5 border-t'
              >
                <p>{project.title}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
