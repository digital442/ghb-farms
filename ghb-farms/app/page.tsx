import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, goldStandardSections, discoverCards } from "@/content/home";

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
