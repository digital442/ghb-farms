import type { TextRow } from "@/types/content";
import { Reveal } from "@/components/Reveal";

export function TextRowStack({ rows }: { rows: TextRow[] }) {
  return (
    <div className="flex flex-col gap-16">
      {rows.map((row, i) => (
        <Reveal key={i}>
          <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:px-8">
            <div className="w-full md:w-1/2">
              {row.eyebrow && (
                <p className="font-heading text-sm uppercase tracking-wide text-gold">{row.eyebrow}</p>
              )}
              <h2 className="mt-2 font-heading text-2xl font-bold text-teal-dark md:text-3xl">{row.heading}</h2>
            </div>
            <div className="w-full md:w-1/2">
              {row.body.map((paragraph, j) => (
                <p key={j} className={j === 0 ? "text-grey" : "mt-4 text-grey"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
