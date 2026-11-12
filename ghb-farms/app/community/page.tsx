import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { ImageGallery } from "@/components/ImageGallery";
import { heroContent, sections, galleryImages } from "@/content/community";

export default function CommunityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <ImageGallery images={galleryImages} />
    </>
  );
}
