import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, whoWeAreSections, heritageSection, communityCard } from "@/content/about-us";

export const metadata: Metadata = {
  title: "About Us | GHB Farms",
  description:
    "A family-owned and family-run farm since 1955, proudly supplying Eskort for almost 70 years with safe, responsible pork farming.",
};

export default function AboutUsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={whoWeAreSections} />
      <div id="heritage" className="scroll-mt-24">
        <SectionStack sections={heritageSection} />
      </div>
      <RelatedCardGrid cards={communityCard} heading="Find out more about our community" />
    </>
  );
}
