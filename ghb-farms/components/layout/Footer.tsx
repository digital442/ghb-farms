// ghb-farms/components/layout/Footer.tsx
import Image from "next/image";
import { farmLocations, headOffice } from "@/content/contact-locations";

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
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-xl font-bold uppercase text-gold">Contact</h3>
            <p className="mt-2 text-sm">Since 1955</p>
            <p className="mt-4 text-sm">hr@ghbfarms.com</p>
            <p className="mt-1 text-sm">+27 (0)12 940 4430</p>
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
            <h3 className="font-heading text-xl font-bold uppercase text-gold">Head Office</h3>
            <p className="mt-2 text-sm">{headOffice.address}</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold uppercase text-gold">Our Farms</h3>
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
          <div className="flex flex-col">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/safe/GHB-Farms-SAFE-Stamp.svg`}
              alt="S.A.F.E. - Sustainable, Accountable, Farm to Fork, Excellence"
              width={96}
              height={96}
            />
            <p className="mt-6 text-xs text-white/70">© {new Date().getFullYear()} GHB Farms. All rights reserved.</p>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/documents/GHB-Farms-Privacy-Statement.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-white/70 hover:text-gold"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
