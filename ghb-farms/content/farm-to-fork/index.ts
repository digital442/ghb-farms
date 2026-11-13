// ghb-farms/content/farm-to-fork/index.ts
import type { Card, SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "Delivering on quality from farm to fork.",
  image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Truck-Farm.png", alt: "GHB Farms farm-to-fork delivery process" },
};

export const sections: SectionRow[] = [
  {
    heading: "Farm to Fork",
    body: [
      "Our quality control programme is implemented throughout the value chain, including processing and manufacturing.",
      "It is our adherence and commitment to safety and quality that has held us in good stead with Eskort, who grades and enforces compliance with respect to how manufacturers and processors maintain their facilities and care for their livestock.",
    ],
    image: { src: "/images/farm-to-fork/distribution-1.jpg", alt: "Farm-to-fork distribution process at GHB Farms" },
    imageSide: "right",
    cta: { label: "Learn about Excellence", href: "/excellence" },
  },
];

export const pillarCards: Card[] = [
  { heading: "Processing Plants, Distribution & Retail", href: "/farm-to-fork/processing-plants-distribution-retail", image: { src: "/images/farm-to-fork/distribution-2-1.jpg", alt: "Processing, distribution, and retail at GHB Farms" } },
  { heading: "Responsibility", href: "/farm-to-fork/responsibility", image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Responsibility-Container.png", alt: "Responsibility practices at GHB Farms" } },
  { heading: "Traceability", href: "/farm-to-fork/traceability", image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Form-to-Fork-BG.png", alt: "Traceability systems at GHB Farms" } },
];
