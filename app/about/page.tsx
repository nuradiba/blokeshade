import Image from "next/image";
import Link from "next/link";

const intro =
  "Welcome to Blokeshade, your go-to for top-tier photography and videography services in Malaysia. Specializing in motorsports, we capture the excitement of road photos, track action, product shoots, and unforgettable moments. Experience the thrill through our lens at Blokeshade.";

const services = [
  "Motorsports coverage",
  "Road photography",
  "Track action",
  "Product shoots",
  "Photography and videography",
];

const contactLinks = [
  {
    label: "Instagram",
    value: "@blokeshade",
    href: "https://instagram.com/blokeshade",
  },
  {
    label: "TikTok",
    value: "@blokeshadeofficial",
    href: "https://www.tiktok.com/@blokeshadeofficial?_r=1&_t=ZS-95tRtP4B1vt",
  },
  {
    label: "WhatsApp",
    value: "+60 11 65530234",
    href: "https://wa.me/601165530234?text=Hi%20Blokeshade,%20can%20I%20get%20the%20package%20for%20photography/videography?",
  },
  {
    label: "Email",
    value: "blokeshade.service@gmail.com",
    href: "mailto:blokeshade.service@gmail.com",
  },
  {
    label: "Phone",
    value: "+60 11 65530234",
    href: "tel:+601165530234",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto grid min-h-screen max-w-7xl content-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] lg:px-12 lg:pt-32">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-black/45">
            About Blokeshade
          </p>
          <h1 className="font-gatwick text-5xl uppercase leading-none sm:text-7xl lg:text-8xl">
            Abejat
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-tight text-black sm:text-2xl lg:text-3xl">
            Photographer and videographer behind Blokeshade.
          </p>
          <p className="mt-8 max-w-3xl text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
            {intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {services.map((service) => (
              <span
                key={service}
                className="border border-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/75"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href={contactLinks[2].href}
              className="inline-flex justify-center border border-black bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Book on WhatsApp
            </Link>
            <Link
              href="/gallery"
              className="inline-flex justify-center border border-black/30 px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              View Gallery
            </Link>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <figure className="relative aspect-square overflow-hidden bg-black">
            <Image
              src="/profile.png"
              alt="Abejat, photographer behind Blokeshade"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              priority
            />
          </figure>

          <div className="grid border-y border-black/15">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="grid gap-1 border-b border-black/15 py-4 last:border-b-0 sm:grid-cols-[120px_1fr] sm:items-center"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/45">
                  {link.label}
                </span>
                <span className="break-words text-sm font-semibold text-black transition-opacity hover:opacity-55 sm:text-base">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
