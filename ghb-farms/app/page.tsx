import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, goldStandardSections, discoverCards } from "@/content/home";

export const metadata: Metadata = {
  title: "GHB Farms | The Gold Standard of Pork",
  description:
    "The welfare of our pigs is of the highest priority on our farm. We strive to exceed industry standards and refer to this as The Gold Standard.",
};

export default function HomePage() {
  return (
    <>
      <Hero {...heroContent} />
      <PillarGrid />
      <SectionStack sections={goldStandardSections} />
      <RelatedCardGrid cards={discoverCards} heading="Discover our farm" />
    </>
  );
}
