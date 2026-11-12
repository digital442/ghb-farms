// ghb-farms/content/conservation.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Conservation",
  heading: "We believe that responsible, environmentally friendly farming and wildlife conservation are interrelated",
  image: { src: "/images/conservation/GHB-Farms-Vulture.png", alt: "Wildlife conservation at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    eyebrow: "Vulture conservation",
    heading: "We work closely with VulPro, the Vulture Conservation Programme and donate our mortalities to this notable conservation effort.",
    body: [
      "As vultures are a key indicator of environmental health, VulPro focuses on the impact of these birds on the environment and, equally important, the environment's impact on their survival. Combining education, good science, networking, capacity building, and knowledge generation for the benefit of both vultures and society, VulPro aims to ultimately influence the well-being of our natural resources and, in this way, positively benefit society.",
    ],
    bullets: [
      "Rehabilitate vultures",
      "House and facilitate captive breeding and reintroduction programmes",
      "Implement wild population breeding monitoring",
      "Provide vulture educational and awareness programmes",
      "Perform veterinary and ecological research",
      "Undertake distribution, dispersal and foraging ranges of vultures",
    ],
    image: { src: "/images/conservation/GHB-Farms-Vulture.png", alt: "VulPro vulture conservation partnership" },
    imageSide: "right",
  },
  {
    eyebrow: "Wild Game",
    heading: "Farming with wild game is more sustainable than farming with cattle.",
    body: [
      "VulPro operates a centre in Hartbeespoort and holds NPC and PBO status. For more information about VulPro, please visit www.vulpro.com.",
      "We make use of game-slurry as a natural fertiliser across our operations.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Wildebees-Discover-More-About-Us.png", alt: "Wild game conservation at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Hay production",
    body: [
      "We conduct soil analysis to ensure the quality of our hay production.",
      "We grow Weeping Love Grass (Eragrostis curvula), baled in 1.2m round bales, valued for its protein content and use as a natural fertilizer.",
      "Our hay bales are used for haymaking, wind erosion control, and managing water discharge areas. Contact us directly to purchase.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-01.png", alt: "Hay production at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Feedmill",
    body: [
      "We partner with nutritionists to ensure a balanced diet that supports the genetic health of our herds, with careful measurement of feed intake across our operations.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-02.png", alt: "Feedmill operations at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Our Piggery",
    body: [
      "We maintain careful housing conditions and track every animal from birth to departure.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Consveration-Piggery.jpg", alt: "Piggery operations at GHB Farms" },
    imageSide: "right",
    cta: { label: "Take a tour of our piggery to see how we care for our livestock.", href: "/contact" },
  },
];
