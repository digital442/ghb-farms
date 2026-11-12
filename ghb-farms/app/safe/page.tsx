import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { heroContent, sections } from "@/content/safe";

export default function SafePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <PillarGrid />
    </>
  );
}
