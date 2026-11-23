// ghb-farms/types/content.ts

export interface SectionRow {
  eyebrow?: string;
  heading: string;
  body: string[];        // paragraphs
  bullets?: string[];
  bulletsPosition?: "before" | "after"; // relative to body; defaults to "after"
  quote?: { text: string; attribution?: string };
  image: { src: string; alt: string };
  imageFit?: "cover" | "contain";
  imagePosition?: string; // CSS object-position value; defaults to "center"
  imageSide: "left" | "right";
  cta?: { label: string; href: string };
  pdfLinks?: { label: string; href: string }[];
}

export interface TextRow {
  eyebrow?: string;
  heading: string;
  body: string[];
}

export interface Card {
  heading: string;
  href: string;
  image: { src: string; alt: string };
}

export interface NavChild {
  label: string;
  href: string;
  children?: NavChild[];
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
