import Image from "next/image";
import Link from "next/link";
import type { SectionRow } from "@/types/content";
import { Button } from "@/components/ui/button";

export function SectionStack({ sections }: { sections: SectionRow[] }) {
  return (
    <div className="flex flex-col gap-16 py-12">
      {sections.map((section, i) => (
        <section
          key={i}
          className={`mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:px-8 ${
            section.imageSide === "right" ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="relative h-72 w-full md:h-96 md:w-1/2">
            <Image src={section.image.src} alt={section.image.alt} fill className="rounded-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            {section.eyebrow && (
              <p className="font-heading text-sm uppercase tracking-wide text-gold">{section.eyebrow}</p>
            )}
            <h2 className="mt-2 font-heading text-2xl font-bold text-teal-dark md:text-3xl">{section.heading}</h2>
            {section.body.map((paragraph, j) => (
              <p key={j} className="mt-4 text-grey">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-grey">
                {section.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.quote && (
              <blockquote className="mt-4 border-l-4 border-gold pl-4 italic text-teal-dark">
                "{section.quote.text}"
                {section.quote.attribution && (
                  <footer className="mt-2 text-sm not-italic text-grey">— {section.quote.attribution}</footer>
                )}
              </blockquote>
            )}
            {section.pdfLinks && (
              <ul className="mt-4 space-y-2">
                {section.pdfLinks.map((pdf) => (
                  <li key={pdf.href}>
                    <a href={pdf.href} target="_blank" rel="noopener noreferrer" className="text-teal underline hover:text-gold">
                      {pdf.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {section.cta && (
              <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-dark">
                <Link href={section.cta.href}>{section.cta.label}</Link>
              </Button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
