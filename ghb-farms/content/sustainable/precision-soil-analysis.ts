// ghb-farms/content/sustainable/precision-soil-analysis.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Precision soil analysis",
  image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Precision soil analysis at GHB Farms" },
  imagePosition: "center bottom",
};

export const sections: SectionRow[] = [
  {
    heading: "Keeping our soil healthy for the future of our farm",
    body: [
      "We are committed to leaving an environmental legacy, including meeting our greenhouse gas reduction commitments.",
      "Our water management practices include monitoring of pig slurry to prevent environmental impact.",
      "We maintain environmentally sustainable practices across our feeding, waste, water, and distribution processes, and provide thorough onboarding for new employees on these standards.",
      "We conduct manure production impact assessments as part of our ongoing environmental monitoring.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Soil analysis practices at GHB Farms" },
    imagePosition: "center bottom",
    imageSide: "left",
  },
  {
    heading: "Soil Analysis",
    body: ["We conduct regular scientific analysis of our soil to ensure continued agricultural health."],
    bullets: ["Calcium Analysis", "Potassium Analysis", "Phosphorus Analysis"],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Soil-Analysis-Closeup.jpg", alt: "Calcium, potassium, and phosphorus soil analysis" },
    imageSide: "right",
    pdfLinks: [
      { label: "Calcium Analysis Report", href: "/images/sustainable/GHB-soil-scan-1.pdf" },
      { label: "Potassium Analysis Report", href: "/images/sustainable/GHB-soild-scan-2.pdf" },
      { label: "Phosphorus Analysis Report", href: "/images/sustainable/GHB-soil-scan-3.pdf" },
    ],
  },
];
