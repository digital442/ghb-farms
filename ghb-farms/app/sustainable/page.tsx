import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, pillarCards } from "@/content/sustainable";

export const metadata: Metadata = {
  title: "Sustainable | GHB Farms",
  description:
    "The goal of sustainable farming is to meet society's needs in the present without compromising the ability of future generations to meet their own.",
};

export default function SustainablePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={pillarCards} heading="Explore Sustainable" />
    </>
  );
}
