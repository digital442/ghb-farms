// ghb-farms/content/home.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "Welcome to",
  heading: "The Gold Standard of Pork",
  image: { src: "/images/home/GHB-Farms-Home-Banner.png", alt: "GHB Farms pig farming operation" },
  cta: { label: "Discover more", href: "/what-we-do" },
};

export const goldStandardSections: SectionRow[] = [
  {
    heading: "We hold ourselves to the highest possible standards.",
    body: [
      "The welfare of our pigs is of the highest priority on our farm. To ensure that our pigs enjoy a high-standard of living, we strive to exceed industry standards and refer to this as The Gold Standard. Our passion is evident in the quality of our pork, which meets top global standards.",
    ],
    image: { src: "/images/home/GHB-Farms-Home-Traktor.png", alt: "Tractor working the fields at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "S.A.F.E is our means of holding ourselves accountable to the best quality and standard - from farm to fork.",
    body: [
      "Responsible, sustainable farming is central to all of our operations. We strive to continuously work towards excellence as a world-class family farm, implementing responsible practices towards our people, our animals and the environment.",
    ],
    image: { src: "/images/home/GHB-Farms-Core-Pillars-Modern-Facilities.png", alt: "Modern farming facilities at GHB Farms" },
    imageSide: "left",
    cta: { label: "Learn about S.A.F.E", href: "/safe" },
  },
];

export const discoverCards: Card[] = [
  { heading: "Who we are", href: "/about-us", image: { src: "/images/home/GHB-Farms-Core-Pillars-People.png", alt: "The GHB Farms team" } },
  { heading: "Heritage", href: "/about-us#heritage", image: { src: "/images/home/GHB-Farms-Home-Traktor.png", alt: "GHB Farms heritage since 1955" } },
  { heading: "Community", href: "/community", image: { src: "/images/home/GHB-Farms-Home-Footer.png", alt: "GHB Farms community involvement" } },
];
