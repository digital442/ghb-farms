import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, pillarCards } from "@/content/farm-to-fork";

export const metadata: Metadata = {
  title: "Farm to Fork | GHB Farms",
  description:
    "Our quality control programme is implemented throughout the value chain, including processing and manufacturing, in good stead with Eskort.",
};

export default function FarmToForkPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={pillarCards} heading="Explore Farm to Fork" />
    </>
  );
}
