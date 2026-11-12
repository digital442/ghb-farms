import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/responsibility";

export default function ResponsibilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
