// ghb-farms/content/about-us.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "Who we are",
  heading: "At GHB, we strive to continuously work towards excellence.",
  image: { src: "/images/about-us/GHB-Farms-About-Rake.png", alt: "GHB Farms agricultural equipment" },
};

export const whoWeAreSections: SectionRow[] = [
  {
    heading: "Who we are",
    body: [
      "As a family-owned and family-run farm since 1955, we live our values to maintain long-standing relationships with our clients. For almost 70 years, we have proudly supplied Eskort – South Africa's leading bacon and sausage products brand since 1917. We tirelessly strive towards excellence and practice safe, responsible operations for our people, our animals, and the environment.",
      "Responsible, sustainable farming practice is central to our operations and as industry leaders, we continuously implement new and innovative technologies to support the highest standards of practice.",
      "We primarily operate as a pig farm, supplying pigs daily to Eskort. Of our pig stock, approximately 90% is supplied to Eskort.",
    ],
    image: { src: "/images/about-us/GHB-Farms-About-Rake.png", alt: "GHB Farms family-run operations" },
    imageSide: "right",
    cta: { label: "Discover our heritage", href: "/about-us#heritage" },
  },
  {
    heading: "Our vision",
    body: [
      "We aim to pass our values and legacy on to the future generations, ensuring that we maintain our reputation of excellence within the South African piggery industry. We will continue to improve our farms and operations to keep the Golden Standard and strengthen our presence as a trusted name in the industry and our community. Producing quality pork is our only passion.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Community-CTA.jpg", alt: "GHB Farms vision for the future" },
    imageSide: "left",
  },
  {
    heading: "Our mission",
    eyebrow: "We aim to continue producing quality pork for generations to come.",
    body: [
      "We strive towards excellence as a world-class family farm, implementing responsible practices that enhance the lives of people, our animals, and the wellbeing of the environment.",
      "Our passion is evident in the quality of our pork. We focus on the humane treatment of our animals, a safe and rewarding work environment for our employees, and have adopted processes for continuous contribution towards conservation efforts and engagement with communities that are impacted by our operations.",
      "Responsible, sustainable farming practice is central to all of our operations and we continually seek new and innovative ways of improving our practices to deliver superior quality products and services to our clients. Our adoption of the use of technology in our farming operations has certainly placed us at the forefront of our industry.",
      "As one of South Africa's largest pork providers, we are tasked with the responsibility of providing the best-possible care to our pigs. We, therefore, continue to invest in the welfare of our herds. Our crate-free and group housing system is one of the ways in which we ensure optimal comfort and safety for our animals.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Heritage-Windmill.png", alt: "GHB Farms mission and values" },
    imageSide: "right",
  },
];

export const heritageSection: SectionRow[] = [
  {
    heading: "Heritage",
    body: [
      "As a family-run farm, we take pride in our history and our family's heritage is at the heart of our operations.",
      "Based in Bronkhorstspruit, Gauteng, South Africa, GHB Farms is a family-owned enterprise and has proudly supplied pork to Eskort since the 1950s.",
      "GHB Farms was established in 1955 by G.H. Braak Snr. Since inception with only one unit located in the Donkerhoek area situated on the outskirts of Pretoria, the farm has expanded to full operation of three units in and around the Bronkhorstspruit area.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Heritage-Windmill.png", alt: "GHB Farms heritage windmill, established 1955" },
    imageSide: "left",
  },
];

export const communityCard: Card[] = [
  { heading: "Learn about our community", href: "/community", image: { src: "/images/about-us/GHB-Farms-Community-CTA.jpg", alt: "GHB Farms community involvement" } },
];
