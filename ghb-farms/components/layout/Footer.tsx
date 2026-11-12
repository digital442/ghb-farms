// ghb-farms/components/layout/Footer.tsx
import Link from "next/link";
import { farmLocations } from "@/content/contact-locations";

// lucide-react 1.72 (installed in this project) dropped brand/social icons,
// so the Facebook glyph is inlined here instead.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-teal-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-lg font-semibold">GHB Farms</h3>
            <p className="mt-2 text-sm">Since 1955</p>
            <p className="mt-4 text-sm">hr@ghbfarms.com</p>
            <a
              href="https://www.facebook.com/ghbfarms/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-gold"
            >
              <FacebookIcon className="h-4 w-4" /> Facebook
            </a>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">Our Farms</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {farmLocations.map((farm) => (
                <li key={farm.name}>
                  <a href={farm.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                    {farm.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">Legal</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="/wp-content/uploads/2023/02/1.Privacy-Statement.docx.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-white/70">© {new Date().getFullYear()} GHB Farms. All rights reserved.</p>
      </div>
    </footer>
  );
}
