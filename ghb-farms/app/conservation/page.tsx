import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { TextRowStack } from "@/components/TextRowStack";
import { heroContent, vultureIntroRow, sections } from "@/content/conservation";

export const metadata: Metadata = {
  title: "Conservation | GHB Farms",
  description:
    "We believe that responsible, environmentally friendly farming and wildlife conservation are interrelated, partnering with VulPro on vulture conservation.",
};

export default function ConservationPage() {
  return (
    <>
      <Hero {...heroContent} />
      <div className="pt-12">
        <TextRowStack rows={[vultureIntroRow]} />
      </div>
      <SectionStack sections={sections} />
    </>
  );
}
