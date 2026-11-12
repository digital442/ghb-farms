// ghb-farms/content/sustainable/index.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E.",
  heading: "Environmental Sustainability, Sow-Friendly Practices, Pig Welfare and Biosecurity.",
  image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "GHB Farms sustainable farming practices" },
};

export const sections: SectionRow[] = [
  {
    heading: "Sustainable",
    body: [
      'There are many practices used while encouraging sustainable agriculture and sustainable food systems. Consumers and retailers concerned with sustainability can look for "values-based" foods that are grown using methods that promote employee wellbeing while sustaining environmentally friendly practices.',
      "The goal of sustainable farming is to meet society's needs in the present without compromising the ability of future generations to meet their own needs.",
    ],
    image: { src: "/images/sustainable/GHB-Farm-Circular-Economy.svg", alt: "GHB Farms circular economy diagram" },
    imageSide: "right",
    cta: { label: "Learn about Accountable", href: "/accountable" },
  },
];

export const pillarCards: Card[] = [
  { heading: "Environmental Sustainability", href: "/sustainable/enviromental-sustainability", image: { src: "/images/sustainable/GHB-Farms-Sustainable-Water-Waste-Management.png", alt: "Environmental sustainability at GHB Farms" } },
  { heading: "Precision Soil Analysis", href: "/sustainable/precision-soil-analysis", image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Precision soil analysis at GHB Farms" } },
  { heading: "Pig Welfare", href: "/sustainable/pig-welfare", image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "Pig welfare practices at GHB Farms" } },
  { heading: "Biosecurity", href: "/sustainable/biosecurity", image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Banner.jpg", alt: "Biosecurity protocols at GHB Farms" } },
];
