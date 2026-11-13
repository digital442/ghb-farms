import Image from "next/image";
import Link from "next/link";
import type { Card } from "@/types/content";

export function RelatedCardGrid({ cards, heading = "Find out more" }: { cards: Card[]; heading?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h2 className="mb-6 text-center font-heading text-2xl font-bold text-teal-dark">{heading}</h2>
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cards.length >= 3 ? "lg:grid-cols-3" : ""} ${
          cards.length >= 4 ? "lg:grid-cols-4" : ""
        }`}
      >
        {cards.map((card) => (
          <Link
            key={`${card.heading}-${card.href}`}
            href={card.href}
            className="group overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
          >
            <div className="relative h-40 w-full">
              <Image src={card.image.src} alt={card.image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-heading font-semibold text-teal-dark">{card.heading}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
