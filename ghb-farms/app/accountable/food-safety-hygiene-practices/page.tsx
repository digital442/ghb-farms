import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/accountable/food-safety-hygiene-practices";

export const metadata: Metadata = {
  title: "Food Safety & Hygiene Practices | GHB Farms",
  description:
    "At GHB Farms, food safety and quality are the cornerstones of our system — we pride ourselves on supplying food with a 100% safety assurance.",
};

export default function FoodSafetyHygienePracticesPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
