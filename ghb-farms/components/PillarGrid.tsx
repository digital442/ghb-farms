import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const pillars = [
  { label: "Sustainable", href: "/sustainable", image: "/images/safe/pillar-sustainable.png" },
  { label: "Accountable", href: "/accountable", image: "/images/safe/pillar-accountable.png" },
  { label: "Farm to Fork", href: "/farm-to-fork", image: "/images/safe/pillar-farm-to-fork.jpg" },
  { label: "Excellence", href: "/excellence", image: "/images/safe/pillar-excellence.png" },
];

export function PillarGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
      {pillars.map((pillar, i) => (
        <Reveal key={pillar.href} delayMs={i * 80}>
          <Link
            href={pillar.href}
            className="group block overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image src={pillar.image} alt={pillar.label} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="bg-gold p-4 text-center">
              <h3 className="font-heading text-[21px] font-semibold uppercase text-white">
                <span className="text-[26px]">{pillar.label.charAt(0)}</span>
                {pillar.label.slice(1)}
              </h3>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
