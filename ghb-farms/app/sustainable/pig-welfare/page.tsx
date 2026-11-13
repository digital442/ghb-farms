import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/pig-welfare";

export const metadata: Metadata = {
  title: "Pig Welfare | GHB Farms",
  description:
    "We care for our animals in a humane and responsible manner — as one of South Africa's largest pork providers, we are committed to the best-possible care.",
};

export default function PigWelfarePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
