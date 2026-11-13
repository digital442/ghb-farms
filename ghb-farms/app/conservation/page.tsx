import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/conservation";

export const metadata: Metadata = {
  title: "Conservation | GHB Farms",
  description:
    "We believe that responsible, environmentally friendly farming and wildlife conservation are interrelated, partnering with VulPro on vulture conservation.",
};

export default function ConservationPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
