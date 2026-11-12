import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  heading: string;
  image: { src: string; alt: string };
  cta?: { label: string; href: string };
}

export function Hero({ eyebrow, heading, image, cta }: HeroProps) {
  return (
    <section className="relative flex h-[60vh] min-h-[400px] items-center justify-center text-center text-white">
      <Image src={image.src} alt={image.alt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-teal-dark/50" />
      <div className="relative z-10 mx-auto max-w-2xl px-4">
        {eyebrow && <p className="font-heading text-sm uppercase tracking-wide text-gold">{eyebrow}</p>}
        <h1 className="mt-2 font-heading text-3xl font-bold md:text-5xl">{heading}</h1>
        {cta && (
          <Button asChild className="mt-6 bg-gold text-teal-dark hover:bg-gold/90">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
