import type { Metadata } from "next";
import { ImageGallery } from "@/components/ImageGallery";
import { mayImages } from "@/content/news";

export const metadata: Metadata = {
  title: "May Newsletter | GHB Farms",
  description: "Read the GHB Farms May newsletter — stay up to date with GHB Farms and the pork industry at large.",
};

export default function MayNewsletterPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <p className="font-heading text-sm uppercase tracking-wide text-gold">News</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-teal-dark md:text-4xl">May Newsletter</h1>
      <ImageGallery images={mayImages} />
    </section>
  );
}
