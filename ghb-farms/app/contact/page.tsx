// ghb-farms/app/contact/page.tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactLocations } from "@/components/ContactLocations";
import { farmLocations, headOffice } from "@/content/contact-locations";

export const metadata: Metadata = {
  title: "Contact | GHB Farms",
  description: "Stay up to date with GHB Farms and the pork industry at large. Send us a message or get directions to our farms.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <p className="font-heading text-sm uppercase tracking-wide text-gold">Contact Us</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-teal-dark md:text-4xl">
        Stay up to date with GHB Farms and the pork industry at large
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-teal-dark">Send us a message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-teal-dark">Get Directions</h2>
          <div className="mt-4 rounded-lg border border-grey/20 bg-white p-4">
            <h3 className="font-heading font-semibold text-teal-dark">Head Office</h3>
            <p className="mt-2 text-sm text-grey">{headOffice.address}</p>
            <p className="mt-2 text-sm text-grey">{headOffice.phone}</p>
            <p className="text-sm text-grey">{headOffice.email}</p>
          </div>
          <div className="mt-6">
            <ContactLocations locations={farmLocations} />
          </div>
        </div>
      </div>
    </section>
  );
}
