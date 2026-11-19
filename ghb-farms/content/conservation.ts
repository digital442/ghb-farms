// ghb-farms/content/conservation.ts
import type { SectionRow, TextRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Conservation",
  heading: "We believe that responsible, environmentally friendly farming and wildlife conservation are interrelated",
  image: { src: "/images/conservation/GHB-Farms-Conservation.jpg", alt: "Wildlife conservation at GHB Farms" },
};

export const vultureIntroRow: TextRow = {
  eyebrow: "Vulture Conservation",
  heading: "We work closely with VulPro, the Vulture Conservation Programme and donate our mortalities to this notable conservation effort.",
  body: [
    "Despite the best efforts and necessary measures taken to produce and raise healthy pigs, nature occasionally takes its course – even at GHB Farms. In order to deal with unforeseen deaths in the most humane and environmentally friendly way, we elected to aid conservation by donating our mortalities to the Vulture Conservation Programme, or VulPro, an important and notable effort in vulture rehabilitation.",
    "As vultures are a key indicator of environmental health, VulPro focuses on the impact of these birds on the environment and, equally important, the environment's impact on their survival. Combining education, good science, networking, capacity building, and knowledge generation for the benefit of both vultures and society, VulPro aims to ultimately influence the well-being of our natural resources and, in this way, positively benefit society.",
  ],
};

export const sections: SectionRow[] = [
  {
    heading: "VulPro strives to:",
    bullets: [
      "Rehabilitate vultures",
      "House and facilitate captive breeding and reintroduction programmes",
      "Implement wild population breeding monitoring",
      "Provide vulture educational and awareness programmes",
      "Perform veterinary and ecological research",
      "Undertake distribution, dispersal and foraging ranges of vultures",
    ],
    bulletsPosition: "before",
    body: [
      "At both formal and informal venues in South Africa, most notably the rehabilitation and educational centre in Hartbeespoort, in the North West Province, VulPro offers educational talks and interactions for various demographic, age, interest, and expert groups. VulPro, a registered NPC with PBO status, accepts and acknowledges both individual and corporate contributions.",
      "For more information about Vulpro, please visit www.vulpro.com",
    ],
    image: { src: "/images/conservation/GHB-Farms-Vulture.png", alt: "VulPro vulture conservation partnership" },
    imageSide: "left",
  },
  {
    eyebrow: "Wild Game",
    heading: "Farming with wild game is more sustainable than farming with cattle.",
    body: [
      "Farming with wild game is more sustainable than farming with cattle. Wild game contributes to the farm's ecosystem and allows us to refrain from using chemical fertilisers. We use the game slurry to fertilise our crops and grass. By using natural fertiliser we are able to grow and produce more grass and crops, which we sell as a by-product.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Wildebees-Discover-More-About-Us.png", alt: "Wild game conservation at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Hay production",
    body: [
      "To provide top quality hay, our soil is analysed annually so that we can be certain to maintain a healthy level of nutrient-rich soil. This enables us to produce and sell high-quality Weeping Love Grass (Eragrostis curvula) in 1,2 metre round bales.",
      "To ensure that you're purchasing the best possible quality hay, you can purchase directly from GHB Farms.",
      "Contact us for more information.",
      "We grow weeping love grass, which is a popular hay variety throughout South Africa. Weeping love grass is very palatable and provides a good amount of fibre without providing too high an energy value for animals like horses. For weaner calves, buying the best quality hay directly affects their live weight gain.",
      "What sets our grass apart and ensures an optimum grass yield, is the natural fertiliser that we use and, importantly, the soil analysis that we conduct annually.",
      "The fertiliser that we use increases the grass protein percentage, therefore ensuring a high quality yield of hay. You can purchase hay directly from GHB Farms to get the best value hay at the best possible price.",
      "Hay is available in 1,2 metre round bales. These are suitable for haymaking, countering wind erosion, for use in water discharge areas, and so much more. Purchase directly from us and be sure to receive great quality at a low cost.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-01.png", alt: "Hay production at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Feedmill",
    body: [
      "An integral part of caring for the wellbeing of our pigs, is working closely with a nutritionist to be sure that our pigs receive all the necessary nutrients to support healthy growth. By providing our pigs with a nutritionally balanced diet ensures that we maintain a healthy genetic line within our breeding programme and minimise the chance of genetically-related illness. The feed intake of our pigs is measured and this ensures that our pigs receive sufficient food and nutrients to support healthy growth and development.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-02.png", alt: "Feedmill operations at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Our Piggery",
    body: [
      "Our pigs are housed in safe, comfortable, and ethical environments. Providing a comfortable and stress-free home to our pigs, in which they are able to grow, move, and interact is vital to our ability to deliver a top-quality product to our customers.",
      "The lives of our pigs are tracked from birth until they leave the farm. This tracking allows us to deliver stock for which we can account in terms of age, nutritional intake, medical history, and importantly to ensure that customers receive pigs that are free of antibiotics at the time of delivery.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Consveration-Piggery.jpg", alt: "Piggery operations at GHB Farms" },
    imageSide: "right",
    cta: { label: "Take a tour of our piggery to see how we care for our livestock.", href: "/contact" },
  },
];
