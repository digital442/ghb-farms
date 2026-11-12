// ghb-farms/content/safe.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "We promise to continue investing in people, infrastructure, and pigs to provide the highest quality meat to our customers.",
  image: { src: "/images/safe/GHB-Farms-Our-Promise-The-Gold-Standard.png", alt: "The GHB Farms Gold Standard promise" },
};

export const sections: SectionRow[] = [
  {
    heading: "The Gold Standard",
    body: [
      "Responsible, sustainable farming practice builds the trust our customers place in us. The S.A.F.E standard was cultivated by our partners at Eskort.",
    ],
    image: { src: "/images/safe/GHB-Farms-Our-Promise-The-Gold-Standard.png", alt: "GHB Farms and Eskort Gold Standard partnership" },
    imageSide: "right",
  },
  {
    heading: "Our unrivalled commitment to pork product quality is brought to life by Eskort's new S.A.F.E standard",
    bullets: [
      "'Sustainable' will be how your farm strives to be environmentally Sustainable.",
      "'Accountable' will be how your farm holds itself accountable, a rarity in today's business world.",
      "'Farm to Fork' will be the processes, standards and practices you adhere to to ensure traceability and local support when producing your pork.",
      "'Excellence' is how your farm maintains and delivers excellence through its farming practices and quality standards.",
    ],
    body: [
      "When you align our high standards and world-class processes to Eskort's S.A.F.E standard, the result is a Gold Standard in pork. The objective of S.A.F.E is to build a quality measure for the pork industry. This ensures that the consumer is assured of sustainable farming practices and allows us to hold ourselves accountable for the production of our pork – from farm to fork.",
    ],
    image: { src: "/images/safe/GHB-Farms-Accountable-Banner.png", alt: "The S.A.F.E standard pillars" },
    imageSide: "left",
  },
];
