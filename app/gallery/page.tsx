import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "../components/gallery-images";

export default function Gallery() {
  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
              Gallery
            </p>
            <h1 className="font-gatwick text-4xl uppercase leading-none sm:text-6xl lg:text-8xl">
              Blokeshade
            </h1>
          </div>
          <Link
            href="/"
            className="hidden border border-white/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-colors hover:bg-white hover:text-black sm:inline-flex"
          >
            Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden bg-white/5 ${
                index === 0 || index === 4 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/11]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2}
                />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                {(index + 1).toString().padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
