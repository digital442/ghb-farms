// ghb-farms/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/content/nav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" aria-label="GHB Farms home">
          <Image src="/GHB-Farms-Logo-Color.png" alt="GHB Farms" width={125} height={99} priority className="h-14 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  className="flex items-center gap-1 font-heading text-sm font-medium text-teal-dark hover:text-teal"
                  aria-expanded={openMenu === item.label}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  {item.label}
                </button>
                <div
                  className={`absolute left-0 top-full z-10 grid w-72 grid-cols-1 gap-1 rounded-md bg-white p-3 shadow-lg ${
                    openMenu === item.label ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded px-3 py-2 text-sm text-teal-dark hover:bg-gold/10"
                      onClick={() => setOpenMenu(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading text-sm font-medium text-teal-dark hover:text-teal"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
