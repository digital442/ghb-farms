import { ImageGallery } from "@/components/ImageGallery";
import { mayImages } from "@/content/news";

export default function MayNewsletterPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <p className="font-heading text-sm uppercase tracking-wide text-gold">News</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-teal-dark md:text-4xl">May Newsletter</h1>
      <ImageGallery images={mayImages} />
    </section>
  );
}
