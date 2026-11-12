import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork";

export default function FarmToForkPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
