import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/environmental-sustainability";

export const metadata: Metadata = {
  title: "Environmental Sustainability | GHB Farms",
  description: "Keeping our environmental footprint to a minimum — we are committed to reducing greenhouse gas emissions across our operations.",
};

export default function EnvironmentalSustainabilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
