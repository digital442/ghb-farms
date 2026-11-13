import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/excellence/genetics";

export const metadata: Metadata = {
  title: "Genetics | GHB Farms",
  description:
    "All GHB Farms herds are bred by Topigs Norsvin, the world leader in innovative swine genetics, producing the best quality stock for efficient farming.",
};

export default function GeneticsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
