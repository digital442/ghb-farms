// ghb-farms/content/sustainable/biosecurity.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Biosecurity",
  image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Banner.jpg", alt: "Biosecurity protocols at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Strict biosecurity protocols ensure the safety of our pigs.",
    body: [
      "We raise Specific Pathogen Free (SPF) pigs to supply Eskort, maintaining the highest standards of herd health.",
      "Strict biosecurity protocols are implemented on our farms. Protocols are as follows:",
    ],
    bullets: [
      "Perimeter fencing on all farms",
      "Access control for all personnel and visitors entering the farm",
      "Dry and wet showers for all personnel entering the farm",
      "Compartmentalised farms that are audited and certified by the Department of Animal Health",
      "Cleaning and disinfection of houses after each batch",
      "The buy-in model is followed for all replacement stock from Topigs Norsvin",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Truck.jpg", alt: "Biosecurity transport protocols at GHB Farms" },
    imageSide: "right",
  },
];
