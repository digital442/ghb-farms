// ghb-farms/content/accountable/quality-assurance.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Accountable",
  heading: "Quality assurance",
  image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Lab.jpg", alt: "Quality assurance practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Good quality assurance is key to complying with global standards.",
    body: [
      "We are committed to providing our customers with safe, high-quality products. After all, you and your family deserve no less.",
      "We maintain strict pathogen and antibiotic-free policies, tracking each weekly piglet batch from birth through to the abattoir.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Soil.jpg", alt: "Quality assurance monitoring at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "We are proud to be certified with Pork 360",
    body: [
      "Pork 360 is an independent quality assurance and traceability certification body for the South African pork industry. Our farms undergo regular audits, with oversight from state veterinarians who confirm our compartmentalisation status.",
      "For more information, visit www.pork360.co.za.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Pork-360.png", alt: "Pork 360 certification at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "We are proud to be certified with SAPPO",
    body: [
      "SAPPO, the South African Pork Producers' Organisation, is registered with the NAMC and developed the Pork 360 certification programme.",
      "For more information, visit www.sapork.co.za.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-SAPPO.png", alt: "SAPPO certification at GHB Farms" },
    imageSide: "right",
  },
];
