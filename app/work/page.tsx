import Image from "next/image";
import { projects } from "./works";

export default function Work() {
  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
              Work
            </p>
            <h1 className="font-gatwick text-4xl uppercase leading-none sm:text-6xl lg:text-8xl">
              Projects
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/60 sm:text-right">
            Selected motorsport, automotive, and community events documented by Blokeshade.
          </p>
        </div>

        <div className="divide-y divide-white/15">
          {projects.map((project, index) => (
            <article
              key={`${project.title}-${project.date}`}
              className="grid gap-5 py-8 sm:grid-cols-[0.7fr_1.1fr] sm:gap-8 lg:grid-cols-[0.32fr_0.9fr_1.1fr] lg:items-center"
            >
              <div className="flex items-start justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45 sm:block">
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <time className="sm:mt-4 sm:block">{project.date}</time>
              </div>

              <div className="group relative aspect-[16/11] overflow-hidden bg-white/5">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>

              <div className="space-y-4">
                <h2 className="font-gatwick text-2xl uppercase leading-tight sm:text-3xl lg:text-4xl">
                  {project.title}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                  {project.describe}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
