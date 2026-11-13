// ghb-farms/content/excellence/index.ts
import type { Card, SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "We are a forward-looking farm and strive to remain abreast of - if not to lead - innovation and trends in pig farming",
  image: { src: "/images/excellence/excellence.jpg", alt: "Excellence and innovation at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Excellence",
    body: [
      "The fourth cornerstone – Excellence – is evident in our products through the uncompromised quality of our pork, rigid commitment to quality and hygiene practices, and the many principles we have in place that offer assurance to our partners at Eskort.",
      "Our quality assurance approach is unmatched, we address every link in the supply chain. Our adoption of the SAFE badge conveys our holistic approach to quality assurance.",
      "We go above and beyond industry standards to ensure that we excel past what is expected from us on a quality assurance and practice level.",
    ],
    quote: {
      text: "At Eskort, we place our customers' health and well-being above all else. It is, therefore, crucial for us to take ownership of every element of the supply chain.",
      attribution: "Arnold Prinsloo, Eskort CEO",
    },
    image: { src: "/images/excellence/excellence.jpg", alt: "GHB Farms commitment to excellence" },
    imageSide: "right",
  },
  {
    eyebrow: "Our Association with Eskort",
    heading: "We are proud of our lifelong partnership with Eskort",
    body: [
      "We are proud to be associated with, and to supply quality pork to Eskort since the 1950s.",
      "Our customers can be assured of the quality and traceability of our product, backed by a lifelong partnership built on trust.",
    ],
    image: { src: "/images/excellence/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png", alt: "GHB Farms partnership with Eskort since the 1950s" },
    imageSide: "left",
    cta: { label: "Learn about Farm to fork", href: "/farm-to-fork" },
  },
];

export const pillarCards: Card[] = [
  { heading: "Association with Eskort", href: "/excellence/association-with-eskort", image: { src: "/images/excellence/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-01.png", alt: "GHB Farms association with Eskort" } },
  { heading: "Genetics", href: "/excellence/genetics", image: { src: "/images/excellence/genetics-1.jpg", alt: "GHB Farms genetics program" } },
];
