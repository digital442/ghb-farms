import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, pillarCards } from "@/content/accountable";

export const metadata: Metadata = {
  title: "Accountable | GHB Farms",
  description:
    "Uncompromised hygiene practices, traceability, and rigid quality control measures ensure we produce quality pork, from food safety to biosecurity.",
};

export default function AccountablePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={pillarCards} heading="Explore Accountable" />
    </>
  );
}
