import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/responsibility";

export const metadata: Metadata = {
  title: "Responsibility | GHB Farms",
  description:
    "We practice responsible farming throughout our operations, holding ourselves accountable to the adherence to safe, documented practice.",
};

export default function ResponsibilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
