import React from 'react'
import { projects } from '../work/works';

type ProjectsProps = {
  setActiveMenu: (index: number | null) => void
}

const featuredProjectIndexes = [0, 2, 5, 9, 12, 13, 14];

export default function Projects({setActiveMenu}: ProjectsProps): React.JSX.Element {
  return (
    <div className='relative mix-blend-difference z-10 text-white h-screen w-screen'>
      <ul onMouseLeave={() => {setActiveMenu(null)}} className='static w-screen border-b'>
        {
          featuredProjectIndexes.map((projectIndex) => {
            const project = projects[projectIndex];

            return (
              <li
                onClick={() => {setActiveMenu(projectIndex)}}
                onMouseOver={() => {setActiveMenu(projectIndex)}}
                key={project.title}
                className='text-[2vw] p-5 border-t'
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
