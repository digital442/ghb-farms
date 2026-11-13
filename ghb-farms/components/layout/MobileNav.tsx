// ghb-farms/components/layout/MobileNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/content/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6 text-teal-dark" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm" showCloseButton={false}>
        <div className="flex items-center justify-between p-4">
          <SheetTitle className="font-heading text-lg font-semibold text-teal-dark">Menu</SheetTitle>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6 text-teal-dark" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="flex w-full items-center justify-between py-2 font-heading text-base font-medium text-teal-dark"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                </button>
                {expanded === item.label && (
                  <div className="flex flex-col gap-1 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-sm text-teal-dark"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 font-heading text-base font-medium text-teal-dark"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
