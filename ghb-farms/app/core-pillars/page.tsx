import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/core-pillars";

export const metadata: Metadata = {
  title: "Core Pillars | GHB Farms",
  description: "Our core pillars keep our farm well-run — innovative genetics, modern facilities, and a knowledgeable, passionate team.",
};

export default function CorePillarsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
