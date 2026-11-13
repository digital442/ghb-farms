import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, pillarCards } from "@/content/excellence";

export const metadata: Metadata = {
  title: "Excellence | GHB Farms",
  description:
    "Excellence is evident in our products through the uncompromised quality of our pork and our rigid commitment to quality and hygiene practices.",
};

export default function ExcellencePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={pillarCards} heading="Explore Excellence" />
    </>
  );
}
