// ghb-farms/types/content.ts

export interface SectionRow {
  eyebrow?: string;
  heading: string;
  body: string[];        // paragraphs
  bullets?: string[];
  quote?: { text: string; attribution?: string };
  image: { src: string; alt: string };
  imageSide: "left" | "right";
  cta?: { label: string; href: string };
  pdfLinks?: { label: string; href: string }[];
}

export interface Card {
  heading: string;
  href: string;
  image: { src: string; alt: string };
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface FarmLocation {
  name: string;
  address: string;
  mapsUrl: string;
  image: { src: string; alt: string };
}

export interface GalleryImage {
  src: string;
  alt: string;
}
