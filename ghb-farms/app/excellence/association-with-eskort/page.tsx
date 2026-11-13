import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/excellence/association-with-eskort";

export const metadata: Metadata = {
  title: "Our Association with Eskort | GHB Farms",
  description:
    "We are proud of our lifelong partnership with Eskort, who regularly audits our operations to ensure absolute compliance with their standards.",
};

export default function AssociationWithEskortPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
