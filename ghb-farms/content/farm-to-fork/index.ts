// ghb-farms/content/farm-to-fork/index.ts
import type { SectionRow } from "@/types/content";

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
