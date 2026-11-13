// ghb-farms/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navItems } from "@/content/nav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" aria-label="GHB Farms home">
          <Image src="/GHB-Farms-Logo-Color.png" alt="GHB Farms" width={125} height={99} priority className="h-14 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setOpenMenu(null);
                    setOpenGroup(null);
                  }
                }}
              >
                <button
                  className="flex items-center gap-1 font-heading text-sm font-medium text-teal-dark hover:text-teal"
                  aria-expanded={openMenu === item.label}
                  onClick={() => {
                    setOpenMenu(openMenu === item.label ? null : item.label);
                    setOpenGroup(null);
                  }}
                >
                  {item.label}
                </button>
                <div
                  data-nav-root
                  className={`absolute left-0 top-full z-10 grid w-72 grid-cols-1 gap-1 rounded-md bg-white p-3 shadow-lg ${
                    openMenu === item.label ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {item.children.map((child) =>
                    child.children ? (
                      <div key={child.href}>
                        <div className="flex items-center justify-between rounded hover:bg-gold/10">
                          <Link
                            href={child.href}
                            className="flex-1 px-3 py-2 text-sm font-medium text-teal-dark"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenGroup(null);
                            }}
                          >
                            {child.label}
                          </Link>
                          <button
                            aria-label={`Toggle ${child.label} submenu`}
                            aria-expanded={openGroup === child.label}
                            onClick={() => setOpenGroup(openGroup === child.label ? null : child.label)}
                            className="px-3 py-2"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${openGroup === child.label ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                        {openGroup === child.label && (
                          <div className="grid grid-cols-1 gap-1 pl-4">
                            {child.children.map((grandchild) => (
                              <Link
                                key={grandchild.href}
                                href={grandchild.href}
                                className="rounded px-3 py-2 text-sm text-teal-dark hover:bg-gold/10"
                                onClick={() => {
                                  setOpenMenu(null);
                                  setOpenGroup(null);
                                }}
                              >
                                {grandchild.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded px-3 py-2 text-sm text-teal-dark hover:bg-gold/10"
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </Link>
                    ),
                  )}
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
