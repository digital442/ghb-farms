import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/accountable/quality-assurance";

export const metadata: Metadata = {
  title: "Quality Assurance | GHB Farms",
  description:
    "We are committed to providing our customers with safe, high-quality products, certified with Pork 360 and SAPPO.",
};

export default function QualityAssurancePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
