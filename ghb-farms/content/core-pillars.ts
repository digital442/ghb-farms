// ghb-farms/content/core-pillars.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Core pillars",
  heading: "Our core pillars keep our farm well-run.",
  image: { src: "/images/core-pillars/GHB-Farms-Core-Pillars-Genetics.png", alt: "GHB Farms core pillars overview" },
};

export const sections: SectionRow[] = [
  {
    heading: "Topigs research team strives to push the envelope by developing new technology in the genetics industry.",
    body: [
      "All GHB Farms herds are bred by Topigs Norsvin, the world leader in innovative swine genetics, providing breeding lines that produce the best quality stock for efficient farming and top-quality pork products.",
      "For more information about Topigs Norsvin, visit topigsnorsvin.co.za.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Core-Pillars-Genetics.png", alt: "Topigs Norsvin genetics partnership" },
    imageSide: "right",
  },
  {
    heading: "Modern facilities allow us to keep abreast of farming developments and trends.",
    body: [
      "85% of pregnant Sows are housed in groups and the conditions are EU Welfare standards compliant. The remaining 15% are housed for eight weeks in crates, and eight weeks in groups. Within the next five years, we plan to close down our old facility and replace it with a modern farm that allows 100% of pigs to be housed in compliance with EU Welfare standards.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Core-Pillars-Modern-Facilities.png", alt: "Modern farming facilities at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Everything we do on our farm starts and ends with people - knowledgeable and passionate people.",
    body: [
      "Meet our team of knowledgeable staff.",
    ],
    bullets: [
      "Employees: trained and experienced farm personnel.",
      "Vets: CS Vet Veterinary Consultancy (www.csvet.co.za).",
      "Specialists: industry specialists supporting our operations.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Director-03.png", alt: "The GHB Farms team" },
    imageSide: "right",
  },
];
