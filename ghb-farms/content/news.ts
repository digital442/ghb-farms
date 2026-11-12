// ghb-farms/content/news.ts
import type { GalleryImage } from "@/types/content";

export interface NewsletterSummary {
  title: string;
  href: string;
}

export const newsletterList: NewsletterSummary[] = [
  { title: "September Newsletter", href: "/september-newsletter" },
  { title: "May Newsletter", href: "/may-newsletter" },
];

export const septemberImages: GalleryImage[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/newsletters/september/GHB-September-Newsletter-${i + 1}${i < 7 ? "-1" : ""}.jpg`,
  alt: `GHB Farms September newsletter, page ${i + 1}`,
}));

export const mayImages: GalleryImage[] = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/newsletters/may/GHB-May-Newsletter-${i + 1}-1.jpg`,
  alt: `GHB Farms May newsletter, page ${i + 1}`,
}));
