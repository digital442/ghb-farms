import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, corePillarsCards, communityCard } from "@/content/what-we-do";

export const metadata: Metadata = {
  title: "What We Do | GHB Farms",
  description: "We produce world-class pork for the South African market, committed to the humane treatment of our animals and responsible farming.",
};

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
