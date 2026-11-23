// ghb-farms/content/sustainable/pig-welfare.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Pig Welfare",
  image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "Pig welfare practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "We care for our animals in a humane and responsible manner",
    body: [
      "As one of South Africa's largest pork providers, we are committed to providing the best-possible care to our pigs across all our operations.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Responsible-Treatment-01.png", alt: "Responsible animal treatment at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "We handle thousands of animals on a daily basis, and we do so with respect for our animals.",
    body: [
      "Our crate-free and group housing system is one of the ways we ensure the optimal comfort and safety of our animals. As a member of the South African Pork Producers' Organisation (SAPPO) and certified with Pork 360, GHB farms regularly undergoes auditing processes to confirm compliance.",
    ],
    bullets: [
      "Trained employees for transport and welfare checks",
      "Low-density and short-distance transportation",
      "Modern animal transport vehicles",
      "Standardised transport checks",
      "Constant supervision at our operations",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Responsible-Treatment-01.png", alt: "Animal welfare transport standards at GHB Farms" },
    imagePosition: "center bottom",
    imageSide: "left",
    cta: { label: "Find out more", href: "https://topigsnorsvin.co.za/contact-us/" },
  },
  {
    heading: "We pride ourselves on adhering to the S.A.F.E Standard",
    body: ["The S.A.F.E minimum standards include:"],
    bullets: [
      "Improving the quality of the flooring surfaces",
      "Increasing the living space available for sows and gilts",
      "Introducing a higher level of training and competence on welfare issues for personnel",
      "Providing permanent access to fresh water and to materials for rooting and playing",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "The S.A.F.E welfare standard at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Housing",
    body: [
      "85% of pregnant Sows are housed in groups and the conditions are EU Welfare standards compliant. The remaining 15% are housed for 8 weeks in crates and 8 weeks in groups – they are compliant with SA welfare standards (within the next 5 years we plan to close down our old facility and replace it with a modern farm that complies with EU standards).",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Housing.png", alt: "Pig housing standards at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Antibiotic measuring/benchmarking.",
    body: [
      "We are committed to responsible antibiotic use and continuous monitoring to support the health and welfare of our animals.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Lab.jpg", alt: "Antibiotic monitoring practices at GHB Farms" },
    imageSide: "right",
  },
];
