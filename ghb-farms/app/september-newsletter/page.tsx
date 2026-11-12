import { ImageGallery } from "@/components/ImageGallery";
import { septemberImages } from "@/content/news";

export default function SeptemberNewsletterPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <p className="font-heading text-sm uppercase tracking-wide text-gold">News</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-teal-dark md:text-4xl">September Newsletter</h1>
      <ImageGallery images={septemberImages} />
    </section>
  );
}
