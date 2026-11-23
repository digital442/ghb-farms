// ghb-farms/content/accountable/index.ts
import type { Card, SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "Accountability is at the core of our farming practices.",
  image: { src: "/images/accountable/GHB-Farms-Accountability.jpg", alt: "Accountability practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Accountable",
    body: [
      "Uncompromised hygiene practices, traceability, and rigid quality control measures are ways in which we ensure that we produce quality pork. The first two aspects of our cornerstone philosophy – Sustainable and Accountable – are addressed by our superior farm practices, including food safety and traceability systems, pig welfare and sow-friendly practices, and biosecurity and environmental sustainability programmes.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountability.jpg", alt: "GHB Farms accountability philosophy" },
    imageSide: "right",
  },
  {
    eyebrow: "How we achieve this",
    heading: "Food Safety and Quality",
    body: [
      "We are dedicated to providing you and your family with quality pork.",
      "Producing wholesome pork. We adhere to strict protocols. 100% Antibiotic free by the time it reaches the store.",
      "As a proud supplier of Eskort Ltd, we have been a part of millions of your meals for over 60 years.",
      "We pride ourselves in supplying food that carries a 100% safety assurance to our customers, backed by strict protocols, farm-level safety standards, and careful veterinary medication practices.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Food-Safety-Quality-Corn.jpg", alt: "Food safety and quality practices at GHB Farms" },
    imageSide: "left",
    cta: { label: "Learn about Farm to Fork", href: "/farm-to-fork" },
  },
];

export const pillarCards: Card[] = [
  { heading: "Quality Assurance", href: "/accountable/quality-assurance", image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Lab.jpg", alt: "Quality assurance practices at GHB Farms" } },
  { heading: "Food Safety & Hygiene Practices", href: "/accountable/food-safety-hygiene-practices", image: { src: "/images/accountable/GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Washdown.jpg", alt: "Food safety and hygiene practices at GHB Farms" } },
];
