import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, corePillarsCards, communityCard } from "@/content/what-we-do";

export default function WhatWeDoPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={corePillarsCards} heading="Our Core Pillars" />
      <RelatedCardGrid cards={communityCard} heading="The Gold Standard" />
    </>
  );
}
