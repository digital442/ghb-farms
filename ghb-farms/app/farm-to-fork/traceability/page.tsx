import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/traceability";

export const metadata: Metadata = {
  title: "Traceability | GHB Farms",
  description:
    "GHB is a registered export compartment certified by the Department of Agriculture, with a 360-degree traceability programme for every pig.",
};

export default function TraceabilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
