// ghb-farms/components/ContactLocations.tsx
import Image from "next/image";
import type { FarmLocation } from "@/types/content";
import { Reveal } from "@/components/Reveal";

export function ContactLocations({ locations }: { locations: FarmLocation[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((farm, i) => (
        <Reveal key={farm.name} delayMs={i * 80}>
          <a
            href={farm.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
          >
            <div className="relative h-40 w-full">
              <Image src={farm.image.src} alt={farm.image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-heading font-semibold text-teal-dark">{farm.name}</h3>
              <p className="mt-1 text-sm text-grey">{farm.address}</p>
              <p className="mt-2 text-sm text-teal underline">Get directions</p>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
