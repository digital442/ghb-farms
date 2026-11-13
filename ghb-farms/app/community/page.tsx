import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { ImageGallery } from "@/components/ImageGallery";
import { heroContent, sections, galleryImages } from "@/content/community";

export const metadata: Metadata = {
  title: "Community | GHB Farms",
  description:
    "We work to improve the lives of our people as well as the communities surrounding GHB Farms, investing in our employees and their families.",
};

export default function CommunityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <ImageGallery images={galleryImages} />
    </>
  );
}
