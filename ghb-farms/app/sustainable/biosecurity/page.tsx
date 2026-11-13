import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/biosecurity";

export const metadata: Metadata = {
  title: "Biosecurity | GHB Farms",
  description:
    "Strict biosecurity protocols ensure the safety of our pigs — we raise Specific Pathogen Free (SPF) pigs to supply Eskort.",
};

export default function BiosecurityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
