import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { heroContent, sections } from "@/content/safe";

export const metadata: Metadata = {
  title: "S.A.F.E | GHB Farms",
  description:
    "We promise to continue investing in people, infrastructure, and pigs to provide the highest quality meat to our customers.",
};

export default function SafePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <PillarGrid />
    </>
  );
}
