import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/traceability";

export default function TraceabilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
