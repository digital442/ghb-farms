import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, whoWeAreSections, heritageSection, communityCard } from "@/content/about-us";

export default function AboutUsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={whoWeAreSections} />
      <div id="heritage">
        <SectionStack sections={heritageSection} />
      </div>
      <RelatedCardGrid cards={communityCard} heading="Find out more about our community" />
    </>
  );
}
