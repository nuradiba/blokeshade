'use client'
import { projects } from './../../data'

export default function Page({ params }: { params: { ref: string } }) {
    const data = projects.find((project) => project.ref === params.ref)
    return (
        <main>{data?.title}</main>  
    );
}