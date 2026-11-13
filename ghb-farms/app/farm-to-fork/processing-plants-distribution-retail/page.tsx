import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/processing-plants-distribution-retail";

export const metadata: Metadata = {
  title: "Processing, Distribution & Retail | GHB Farms",
  description:
    "The processing, distribution, and retail aspects of our operation comply with the standards set forth by Eskort, who audit our operations regularly.",
};

export default function ProcessingPlantsDistributionRetailPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
