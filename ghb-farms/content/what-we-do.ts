// ghb-farms/content/what-we-do.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "What we do",
  heading: "We produce world-class pork for the South African market",
  image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms pork production operations" },
};

export const sections: SectionRow[] = [
  {
    heading: "We strive to continuously work towards excellence as a world-class family farm, implementing responsible practices towards our people, our animals and the environment.",
    body: [
      "As a passionate, world-class pork farm we are committed to the humane treatment of our animals, providing a safe and rewarding work environment for our employees, positively contributing towards conservation efforts, and engaging our communities with a view to improving the lives of the residents – both current and future.",
      "We practice responsible, sustainable farming – it is at the heart of all that we do and guides our decision-making processes.",
      "The farms consist of two main sections – one section is reserved for breeding herds, and the other for grower herds. The breeding herds are sectioned in an area that is conducive to safe and healthy reproduction. Once piglets are weaned, they are relocated (on a weekly basis) to the growing area that is structured to support the well-being of our herds.",
      "In taking this approach on our farms, our customers are assured of purchasing a single-source product. We produce our own piglets and ensure that they are grown in optimal health to the correct slaughter age and weight. This practice has held us in good stead with Eskort, enabling them to continue providing the best-possible meat that is of the highest-possible standard.",
    ],
    image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms single-source pork production" },
    imageSide: "left",
  },
];

export const corePillarsCards: Card[] = [
  { heading: "Genetics", href: "/excellence/genetics", image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms genetics program" } },
  { heading: "Modern Facilities", href: "/core-pillars", image: { src: "/images/what-we-do/GHB-Farms-Core-Pillars-Modern-Facilities.png", alt: "GHB Farms modern facilities" } },
  { heading: "People", href: "/core-pillars", image: { src: "/images/what-we-do/GHB-Farms-Core-Pillars-People.png", alt: "The people of GHB Farms" } },
];

export const communityCard: Card[] = [
  { heading: "Learn about our community", href: "/community", image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms community" } },
];
