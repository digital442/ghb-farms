import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/processing-plants-distribution-retail";

export default function ProcessingPlantsDistributionRetailPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
