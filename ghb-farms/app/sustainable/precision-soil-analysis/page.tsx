import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/precision-soil-analysis";

export const metadata: Metadata = {
  title: "Precision Soil Analysis | GHB Farms",
  description: "Keeping our soil healthy for the future of our farm, with regular scientific analysis and environmental monitoring.",
};

export default function PrecisionSoilAnalysisPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
