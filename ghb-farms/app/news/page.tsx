import Link from "next/link";
import { newsletterList } from "@/content/news";

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <p className="font-heading text-sm uppercase tracking-wide text-gold">News</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-teal-dark md:text-4xl">Latest news</h1>
      <p className="mt-2 text-grey">Stay up to date with GHB Farms and the pork industry at large</p>
      <ul className="mt-8 space-y-4">
        {newsletterList.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg border border-grey/20 p-4 font-heading text-lg font-semibold text-teal-dark hover:bg-gold/10"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
