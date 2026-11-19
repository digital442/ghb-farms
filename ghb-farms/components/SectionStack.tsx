import Image from "next/image";
import Link from "next/link";
import type { SectionRow } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const WWW_URL_PATTERN = /www\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/gi;

function linkifyParagraph(paragraph: string) {
  const parts = paragraph.split(WWW_URL_PATTERN);
  const matches = paragraph.match(WWW_URL_PATTERN) ?? [];
  if (matches.length === 0) return paragraph;

  return parts.flatMap((part, i) => {
    const match = matches[i];
    const linkNode = match ? (
      <a
        key={`${match}-${i}`}
        href={`https://${match}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal underline hover:text-gold"
      >
        {match}
      </a>
    ) : null;
    return linkNode ? [part, linkNode] : [part];
  });
}

export function SectionStack({ sections }: { sections: SectionRow[] }) {
  return (
    <div className="flex flex-col gap-16 py-12">
      {sections.map((section, i) => (
        <Reveal key={i}>
          <section
            className={`mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:px-8 ${
              section.imageSide === "right" ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="relative h-72 w-full md:h-96 md:w-1/2">
              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                className={`rounded-lg ${section.imageFit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </div>
            <div className="w-full md:w-1/2">
              {section.eyebrow && (
                <p className="font-heading text-sm uppercase tracking-wide text-gold">{section.eyebrow}</p>
              )}
              <h2 className="mt-2 font-heading text-2xl font-bold text-teal-dark md:text-3xl">{section.heading}</h2>
              {section.bullets && section.bulletsPosition === "before" && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-grey">
                  {section.bullets.map((bullet, j) => (
                    <li key={j}>{linkifyParagraph(bullet)}</li>
                  ))}
                </ul>
              )}
              {section.body.map((paragraph, j) => (
                <p key={j} className="mt-4 text-grey">
                  {linkifyParagraph(paragraph)}
                </p>
              ))}
              {section.bullets && section.bulletsPosition !== "before" && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-grey">
                  {section.bullets.map((bullet, j) => (
                    <li key={j}>{linkifyParagraph(bullet)}</li>
                  ))}
                </ul>
              )}
              {section.quote && (
                <blockquote className="mt-4 border-l-4 border-gold pl-4 italic text-teal-dark">
                  &ldquo;{section.quote.text}&rdquo;
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
        </Reveal>
      ))}
    </div>
  );
}
