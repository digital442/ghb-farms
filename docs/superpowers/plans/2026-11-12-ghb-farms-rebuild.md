# GHB Farms Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ghbfarms.co.za as a static-exported Next.js site, faithfully reproducing all 24 routes' content and inferred visual design from the current broken WordPress install, plus a new working contact form, deployable via FTP to the existing cPanel host.

**Architecture:** Next.js 15 App Router with `output: 'export'`. All page copy lives in typed TypeScript data objects (one file per content area) consumed by a small set of shared presentational components (Hero, SectionStack, PillarGrid, RelatedCardGrid, ImageGallery, ContactLocations, NewsListing). Tailwind CSS v4 implements the confirmed brand tokens (colors, fonts) as CSS custom properties. No CMS, no server, no database — the contact form POSTs client-side directly to Web3Forms.

**Tech Stack:** TypeScript, Next.js 15 (App Router, static export), Tailwind CSS v4, shadcn/ui, lucide-react, Web3Forms (contact form).

**Spec:** `docs/superpowers/specs/2026-11-06-ghb-farms-rebuild-design.md`

## Credential Setup (read before Task 7 onward)

Several tasks pull images from the live cPanel account via FTP (`197.221.13.233`, user `ghbfatgxan`). **Never write the FTP password into any file that gets committed** — every `curl` command in this plan reads it from a local environment variable instead. Before running any task's asset-pull step, set it in your shell for that session only:

```bash
export FTP_PASSWORD='<the real password, provided out of band>'
```

(PowerShell: `$env:FTP_PASSWORD = '<the real password>'`)

This variable is never written to disk by any step in this plan, and no command below echoes it.

## Global Constraints

- Static export only: `next.config.ts` sets `output: 'export'`; no API routes, no `next/image` optimization (`images.unoptimized: true`).
- URL structure is flat and matches the live site exactly (spec §4) — including newsletter posts at root level (`/september-newsletter`, `/may-newsletter`), NOT nested under `/news/`.
- Brand tokens are fixed, not negotiable mid-build: gold `#C4A058`, teal `#0a6265`, dark teal `#044245`, red/maroon `#AA272F`, grey `#707070`, white `#ffffff`. Fonts: body = Rubik, headings = Heebo (both Google Fonts).
- Content fixes are typos only (spec §7) — fix the exact list below; leave all factual/business conflicts (crate housing %, Eskort relationship duration, Pig Welfare's odd outbound link) exactly as written on the live site.
- Typo fixes to apply verbatim where they appear in the content data (confirmed exact locations from the live-site content audit):
  - `/sustainable` H1 and nav label: "Enviromental" → "Environmental"
  - `/accountable/quality-assurance`: "Afterall" → "After all"
  - `/excellence` AND `/excellence/association-with-eskort` (both pages, confirmed 2 occurrences): "to of our lifelong partnership" → "of our lifelong partnership"
  - `/conservation` H1: "enviromentally" → "environmentally"
  - `/sustainable/enviromental-sustainability`: no body-copy fix needed — "Minimium" only appeared in image filenames/alt text, not heading/body text; write correct alt text directly, no find-replace needed.
- Image alt text: write fresh, descriptive alt text for every image (accessibility fix); do not carry over old copy-pasted/wrong alt text (e.g. do not reuse "GHB-Farms-About-Rake" alt text on the Accountable page's reused image).
- Links to fix during content authoring (not literal text fixes, but destination corrections):
  - `/heritage` references (About Us "Discover our heritage" x2, Home "Heritage" card) → `/about-us#heritage`
  - `/genetics` (from What We Do's core-pillars grid) → `/excellence/genetics`; `/feedmill/` link → omit entirely (no feedmill page exists)
  - `/contact-us/` (one broken link on Conservation) → `/contact`
  - `/quality-assurance/` (non-canonical link on Pig Welfare page) → `/accountable/quality-assurance`
  - Any `ghb.agletonline.co.za` staging-host URL (CTA links/images on Accountable, Farm-to-Fork, Excellence, Sustainable) → equivalent production path/asset
  - Pig Welfare's "Find out more" CTA → keep pointing to `https://topigsnorsvin.co.za/contact-us/` exactly as-is (spec: leave business/factual links as-is, even odd ones)
- March newsletter (`/march-newsletter`) is OUT OF SCOPE for this plan — its images are ambiguously duplicated from May's newsletter on the live site and the site owner deferred resolving this. Do not create this route in this plan.
- Contact form: client component POSTing directly to Web3Forms public API. Recipient email `hr@ghbfarms.com`. Access key is a placeholder env var `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (site owner will supply the real key before deploy).
- Contact page map links: Google Maps links (not the old PDF maps) — exact Google Maps URLs for each location are given in Task 4 / Task 18.
- Source content/images are pulled via FTP (`197.221.13.233`, credentials via `$FTP_PASSWORD` per the setup note above) task-by-task as needed — do not bulk-download everything up front. Brand assets (logo SVGs) were already pulled to `.ftp-pull/brand-assets/` during planning and are copied from there in Task 2, not re-downloaded.

---

## File Structure

```
ghb-farms/                              # new Next.js project root
  next.config.ts                        # output: 'export', images.unoptimized
  tailwind.config.ts                    # brand tokens
  app/
    layout.tsx                          # root layout: fonts, Header, Footer
    globals.css                         # Tailwind import + CSS custom properties
    page.tsx                            # Home
    what-we-do/page.tsx
    about-us/page.tsx
    core-pillars/page.tsx
    safe/page.tsx
    sustainable/page.tsx
    sustainable/enviromental-sustainability/page.tsx
    sustainable/precision-soil-analysis/page.tsx
    sustainable/pig-welfare/page.tsx
    sustainable/biosecurity/page.tsx
    accountable/page.tsx
    accountable/quality-assurance/page.tsx
    accountable/food-safety-hygiene-practices/page.tsx
    farm-to-fork/page.tsx
    farm-to-fork/processing-plants-distribution-retail/page.tsx
    farm-to-fork/responsibility/page.tsx
    farm-to-fork/traceability/page.tsx
    excellence/page.tsx
    excellence/association-with-eskort/page.tsx
    excellence/genetics/page.tsx
    community/page.tsx
    conservation/page.tsx
    news/page.tsx
    september-newsletter/page.tsx
    may-newsletter/page.tsx
    contact/page.tsx
  components/
    layout/Header.tsx
    layout/Footer.tsx
    layout/MobileNav.tsx                # shadcn Sheet-based nav
    Hero.tsx
    SectionStack.tsx                    # eyebrow+heading+body, alternating image/text rows
    PillarGrid.tsx                      # 4-card S.A.F.E. pillar grid
    RelatedCardGrid.tsx                 # 2-4 card "find out more" grid
    ImageGallery.tsx                    # lightbox grid (Community + newsletters)
    ContactLocations.tsx                # 6 farm + head office cards
    NewsListing.tsx
    ContactForm.tsx                     # client component, Web3Forms POST
    ui/                                 # shadcn components (button, card, sheet, accordion, form, input, textarea)
  content/
    home.ts
    what-we-do.ts
    about-us.ts
    core-pillars.ts
    safe.ts
    sustainable/index.ts
    sustainable/environmental-sustainability.ts
    sustainable/precision-soil-analysis.ts
    sustainable/pig-welfare.ts
    sustainable/biosecurity.ts
    accountable/index.ts
    accountable/quality-assurance.ts
    accountable/food-safety-hygiene-practices.ts
    farm-to-fork/index.ts
    farm-to-fork/processing-plants-distribution-retail.ts
    farm-to-fork/responsibility.ts
    farm-to-fork/traceability.ts
    excellence/index.ts
    excellence/association-with-eskort.ts
    excellence/genetics.ts
    community.ts
    conservation.ts
    news.ts
    contact-locations.ts
    nav.ts                              # shared nav structure for Header/Footer/MobileNav
  types/
    content.ts                         # shared TS types for SectionStack rows, cards, etc.
  public/
    images/                             # pulled page assets, organized by route
    GHB-Farms-Logo.svg
    GHB-Farms-SAFE-Logo.svg
```

---

### Task 1: Scaffold Next.js project with static export config

**Files:**
- Create: `ghb-farms/` (via `create-next-app`)
- Modify: `ghb-farms/next.config.ts`
- Modify: `ghb-farms/package.json`

**Interfaces:**
- Produces: a working `npm run build` that emits `ghb-farms/out/` as static HTML/CSS/JS, which every later task's dev-server verification depends on.

- [ ] **Step 1: Scaffold the project**

```bash
cd "c:\AppDev\GHB Farms"
npx create-next-app@latest ghb-farms --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-turbopack
```

Answer prompts: yes to all defaults it asks beyond the flags above.

- [ ] **Step 2: Configure static export**

Edit `ghb-farms/next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 3: Verify the default build still produces a static export**

Run: `cd ghb-farms && npm run build`
Expected: Build succeeds, creates `ghb-farms/out/index.html`.

- [ ] **Step 4: Commit**

```bash
cd "c:\AppDev\GHB Farms"
git init
git add ghb-farms/ docs/
git commit -m "chore: scaffold Next.js project with static export config"
```

---

### Task 2: Install shadcn/ui, lucide-react, and set up brand design tokens

**Files:**
- Modify: `ghb-farms/app/globals.css`
- Modify: `ghb-farms/tailwind.config.ts` (or `app/globals.css` `@theme` block, per Tailwind v4 convention)
- Create: `ghb-farms/components.json` (via shadcn init)
- Copy: `.ftp-pull/brand-assets/GHB-Farms-Logo.svg` → `ghb-farms/public/GHB-Farms-Logo.svg`
- Copy: `.ftp-pull/brand-assets/GHB-Farms-SAFE-Logo.svg` → `ghb-farms/public/GHB-Farms-SAFE-Logo.svg`

**Interfaces:**
- Produces: CSS custom properties `--color-gold`, `--color-teal`, `--color-teal-dark`, `--color-red`, `--color-grey` and font classes `font-heading` (Heebo) / `font-body` (Rubik, applied to `body` by default) that every later component task consumes.

- [ ] **Step 1: Initialize shadcn/ui**

```bash
cd ghb-farms
npx shadcn@latest init
```

When prompted for base color, choose "Neutral" (we override with our own tokens next).

- [ ] **Step 2: Add the shadcn components this project needs**

```bash
npx shadcn@latest add button card accordion navigation-menu sheet form input textarea
```

- [ ] **Step 3: Add Google Fonts and brand color tokens**

Edit `ghb-farms/app/layout.tsx` to load fonts via `next/font/google`:

```typescript
import { Rubik, Heebo } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo" });
```

Apply `className={\`${rubik.variable} ${heebo.variable}\`}` to the `<html>` tag in that same file (full layout content is written in Task 3).

Edit `ghb-farms/app/globals.css`, add inside the existing `@theme` or `:root` block (Tailwind v4 uses `@theme`):

```css
@theme {
  --color-gold: #c4a058;
  --color-teal: #0a6265;
  --color-teal-dark: #044245;
  --color-red: #aa272f;
  --color-grey: #707070;
  --font-body: var(--font-rubik), sans-serif;
  --font-heading: var(--font-heebo), sans-serif;
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 4: Copy logo assets into the new project**

```bash
cp "c:\AppDev\GHB Farms\.ftp-pull\brand-assets\GHB-Farms-Logo.svg" "c:\AppDev\GHB Farms\ghb-farms\public\GHB-Farms-Logo.svg"
cp "c:\AppDev\GHB Farms\.ftp-pull\brand-assets\GHB-Farms-SAFE-Logo.svg" "c:\AppDev\GHB Farms\ghb-farms\public\GHB-Farms-SAFE-Logo.svg"
```

- [ ] **Step 5: Verify tokens render correctly**

Temporarily add `<div className="bg-gold text-white p-4 font-heading">Test</div>` to `app/page.tsx`, run `npm run dev`, open `http://localhost:3000`, confirm gold background (`#C4A058`) and Heebo-styled text render. Remove the test div afterward.

- [ ] **Step 6: Commit**

```bash
git add ghb-farms/
git commit -m "feat: add brand design tokens, fonts, and shadcn/ui components"
```

---

### Task 3: Shared TypeScript content types

**Files:**
- Create: `ghb-farms/types/content.ts`

**Interfaces:**
- Produces: `SectionRow`, `Card`, `NavItem`, `FarmLocation`, `NewsletterImage` types that every `content/*.ts` file and every component in Tasks 5-11 import and conform to.

- [ ] **Step 1: Write the shared types**

```typescript
// ghb-farms/types/content.ts

export interface SectionRow {
  eyebrow?: string;
  heading: string;
  body: string[];        // paragraphs
  bullets?: string[];
  quote?: { text: string; attribution?: string };
  image: { src: string; alt: string };
  imageSide: "left" | "right";
  cta?: { label: string; href: string };
  pdfLinks?: { label: string; href: string }[];
}

export interface Card {
  heading: string;
  href: string;
  image: { src: string; alt: string };
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface FarmLocation {
  name: string;
  address: string;
  mapsUrl: string;
  image: { src: string; alt: string };
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PageContent {
  title: string;
  hero: { eyebrow?: string; heading: string; image: { src: string; alt: string }; cta?: { label: string; href: string } };
  sections: SectionRow[];
  relatedCards?: Card[];
}
```

- [ ] **Step 2: Verify it type-checks in isolation**

Run: `cd ghb-farms && npx tsc --noEmit`
Expected: no errors (file has no logic to fail, just confirms syntax is valid TS).

- [ ] **Step 3: Commit**

```bash
git add ghb-farms/types/
git commit -m "feat: add shared content types"
```

---

### Task 4: Navigation data + Header/Footer/MobileNav components

**Files:**
- Create: `ghb-farms/content/nav.ts`
- Create: `ghb-farms/content/contact-locations.ts`
- Create: `ghb-farms/components/layout/Header.tsx`
- Create: `ghb-farms/components/layout/MobileNav.tsx`
- Create: `ghb-farms/components/layout/Footer.tsx`
- Modify: `ghb-farms/app/layout.tsx`

**Interfaces:**
- Consumes: `NavItem`, `FarmLocation` types from Task 3.
- Produces: `<Header />` and `<Footer />` components imported into `app/layout.tsx`'s root layout, wrapping every page created in Tasks 6-17. Also produces `content/contact-locations.ts`'s `farmLocations` export, which Footer (this task) and the Contact page (Task 18) both consume.

- [ ] **Step 1: Write the nav data**

```typescript
// ghb-farms/content/nav.ts
import type { NavItem } from "@/types/content";

export const navItems: NavItem[] = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "About Us", href: "/about-us" },
  { label: "Core Pillars", href: "/core-pillars" },
  {
    label: "S.A.F.E",
    href: "/safe",
    children: [
      { label: "Sustainable", href: "/sustainable" },
      { label: "Environmental Sustainability", href: "/sustainable/enviromental-sustainability" },
      { label: "Precision Soil Analysis", href: "/sustainable/precision-soil-analysis" },
      { label: "Pig Welfare", href: "/sustainable/pig-welfare" },
      { label: "Biosecurity", href: "/sustainable/biosecurity" },
      { label: "Accountable", href: "/accountable" },
      { label: "Quality Assurance", href: "/accountable/quality-assurance" },
      { label: "Food Safety & Hygiene Practices", href: "/accountable/food-safety-hygiene-practices" },
      { label: "Farm to Fork", href: "/farm-to-fork" },
      { label: "Processing Plants, Distribution & Retail", href: "/farm-to-fork/processing-plants-distribution-retail" },
      { label: "Responsibility", href: "/farm-to-fork/responsibility" },
      { label: "Traceability", href: "/farm-to-fork/traceability" },
      { label: "Excellence", href: "/excellence" },
      { label: "Association with Eskort", href: "/excellence/association-with-eskort" },
      { label: "Genetics", href: "/excellence/genetics" },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Conservation", href: "/conservation" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Write the contact-locations data (consumed by Footer now, and by Contact page in Task 18)**

```typescript
// ghb-farms/content/contact-locations.ts
import type { FarmLocation } from "@/types/content";

export const farmLocations: FarmLocation[] = [
  {
    name: "Kaalfontein farm",
    address: "Kaalfontein, Bronkhorstspruit, Gauteng",
    mapsUrl: "https://maps.app.goo.gl/u7hyQeyajvjEo7fb9",
    image: { src: "/images/contact/ghb-farms-kaalfontein-image.png", alt: "Kaalfontein farm" },
  },
  {
    name: "Rooipoort farm",
    address: "Rooipoort, Bronkhorstspruit, Gauteng",
    mapsUrl: "https://goo.gl/maps/GqWvhRChMhP9DTg7A",
    image: { src: "/images/contact/ghb-farms-rooipoort-image.png", alt: "Rooipoort farm" },
  },
  {
    name: "Devondale-South farm",
    address: "Devondale-South, Bronkhorstspruit, Gauteng",
    mapsUrl: "https://goo.gl/maps/1B9gBiEUR38Z5saq8",
    image: { src: "/images/contact/ghb-farms-devondale-image.png", alt: "Devondale-South farm" },
  },
  {
    name: "Spitskop farm",
    address: "Spitskop, Bronkhorstspruit, Gauteng",
    mapsUrl: "https://goo.gl/maps/PKyTDdT2v3L9957N9",
    image: { src: "/images/contact/ghb-farms-spitskop-image.png", alt: "Spitskop farm" },
  },
  {
    name: "Mullershoop farm",
    address: "Mullershoop, Bronkhorstspruit, Gauteng",
    mapsUrl: "https://goo.gl/maps/mLxxNEtcdMPK3wQDA",
    image: { src: "/images/contact/ghb-farms-mullershoop-image.png", alt: "Mullershoop farm" },
  },
  {
    name: "Head Office",
    address: "Bronkhorstspruit, Gauteng",
    mapsUrl: "https://www.google.com/maps/place/GHB+Farms+(Pty)+Ltd/@-25.7763996,28.3400933,17z",
    image: { src: "/images/contact/ghb-farms-head-office-image.png", alt: "GHB Farms Head Office" },
  },
];
```

Note: this task only creates the data file; the actual image files at `/images/contact/...` are pulled via FTP in Task 18. Until Task 18 runs, Footer's farm links (Step 4 below) will have broken thumbnails if it renders images — Footer, as written below, only lists farm names as text links, so this is not an issue for this task.

- [ ] **Step 3: Write the Header component**

```tsx
// ghb-farms/components/layout/Header.tsx
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/content/nav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" aria-label="GHB Farms home">
          <Image src="/GHB-Farms-Logo.svg" alt="GHB Farms" width={140} height={60} priority />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="font-heading text-sm font-medium text-teal-dark hover:text-teal">
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full z-10 grid w-72 grid-cols-1 gap-1 rounded-md bg-white p-3 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded px-3 py-2 text-sm text-teal-dark hover:bg-gold/10"
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
```

- [ ] **Step 4: Write the MobileNav component using shadcn Sheet**

```tsx
// ghb-farms/components/layout/MobileNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/content/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6 text-teal-dark" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <div className="flex items-center justify-between p-4">
          <span className="font-heading text-lg font-semibold text-teal-dark">Menu</span>
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
```

- [ ] **Step 5: Write the Footer component**

```tsx
// ghb-farms/components/layout/Footer.tsx
import Link from "next/link";
import { Facebook } from "lucide-react";
import { farmLocations } from "@/content/contact-locations";

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
              <Facebook className="h-4 w-4" /> Facebook
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
```

- [ ] **Step 6: Wire Header/Footer into the root layout**

```tsx
// ghb-farms/app/layout.tsx
import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo" });

export const metadata: Metadata = {
  title: "GHB Farms",
  description:
    "We hold ourselves to the highest possible standards. The welfare of our pigs is of the highest priority on our farm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} ${heebo.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify nav renders on both desktop and mobile viewports**

Run: `npm run dev`, open `http://localhost:3000`.
- Resize browser to desktop width (>768px): confirm top nav bar shows all items, hovering "S.A.F.E" reveals the submenu.
- Resize to mobile width (<768px): confirm hamburger icon appears, clicking it opens the Sheet, clicking "S.A.F.E" expands its children.

- [ ] **Step 8: Commit**

```bash
git add ghb-farms/
git commit -m "feat: add site navigation, header, footer, and mobile nav"
```

---

### Task 5: SectionStack, Hero, and Card-grid components

**Files:**
- Create: `ghb-farms/components/Hero.tsx`
- Create: `ghb-farms/components/SectionStack.tsx`
- Create: `ghb-farms/components/PillarGrid.tsx`
- Create: `ghb-farms/components/RelatedCardGrid.tsx`

**Interfaces:**
- Consumes: `SectionRow`, `Card` types from Task 3.
- Produces: `<Hero heading image eyebrow cta />`, `<SectionStack sections={SectionRow[]} />`, `<PillarGrid />` (hardcoded 4-pillar grid, no props needed since it's identical everywhere it's used), `<RelatedCardGrid cards={Card[]} />` — all consumed by every page component in Tasks 6-17.

- [ ] **Step 1: Write the Hero component**

```tsx
// ghb-farms/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  heading: string;
  image: { src: string; alt: string };
  cta?: { label: string; href: string };
}

export function Hero({ eyebrow, heading, image, cta }: HeroProps) {
  return (
    <section className="relative flex h-[60vh] min-h-[400px] items-center justify-center text-center text-white">
      <Image src={image.src} alt={image.alt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-teal-dark/50" />
      <div className="relative z-10 mx-auto max-w-2xl px-4">
        {eyebrow && <p className="font-heading text-sm uppercase tracking-wide text-gold">{eyebrow}</p>}
        <h1 className="mt-2 font-heading text-3xl font-bold md:text-5xl">{heading}</h1>
        {cta && (
          <Button asChild className="mt-6 bg-gold text-teal-dark hover:bg-gold/90">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write the SectionStack component**

```tsx
// ghb-farms/components/SectionStack.tsx
import Image from "next/image";
import Link from "next/link";
import type { SectionRow } from "@/types/content";
import { Button } from "@/components/ui/button";

export function SectionStack({ sections }: { sections: SectionRow[] }) {
  return (
    <div className="flex flex-col gap-16 py-12">
      {sections.map((section, i) => (
        <section
          key={i}
          className={`mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:px-8 ${
            section.imageSide === "right" ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="relative h-72 w-full md:h-96 md:w-1/2">
            <Image src={section.image.src} alt={section.image.alt} fill className="rounded-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            {section.eyebrow && (
              <p className="font-heading text-sm uppercase tracking-wide text-gold">{section.eyebrow}</p>
            )}
            <h2 className="mt-2 font-heading text-2xl font-bold text-teal-dark md:text-3xl">{section.heading}</h2>
            {section.body.map((paragraph, j) => (
              <p key={j} className="mt-4 text-grey">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-grey">
                {section.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.quote && (
              <blockquote className="mt-4 border-l-4 border-gold pl-4 italic text-teal-dark">
                "{section.quote.text}"
                {section.quote.attribution && (
                  <footer className="mt-2 text-sm not-italic text-grey">— {section.quote.attribution}</footer>
                )}
              </blockquote>
            )}
            {section.pdfLinks && (
              <ul className="mt-4 space-y-2">
                {section.pdfLinks.map((pdf) => (
                  <li key={pdf.href}>
                    <a href={pdf.href} target="_blank" rel="noopener noreferrer" className="text-teal underline hover:text-gold">
                      {pdf.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {section.cta && (
              <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-dark">
                <Link href={section.cta.href}>{section.cta.label}</Link>
              </Button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write the PillarGrid component**

```tsx
// ghb-farms/components/PillarGrid.tsx
import Image from "next/image";
import Link from "next/link";

const pillars = [
  { label: "Sustainable", href: "/sustainable", image: "/images/safe/pillar-sustainable.png" },
  { label: "Accountable", href: "/accountable", image: "/images/safe/pillar-accountable.png" },
  { label: "Farm to Fork", href: "/farm-to-fork", image: "/images/safe/pillar-farm-to-fork.jpg" },
  { label: "Excellence", href: "/excellence", image: "/images/safe/pillar-excellence.png" },
];

export function PillarGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
      {pillars.map((pillar) => (
        <Link
          key={pillar.href}
          href={pillar.href}
          className="group overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
        >
          <div className="relative h-48 w-full">
            <Image src={pillar.image} alt={pillar.label} fill className="object-cover transition-transform group-hover:scale-105" />
          </div>
          <div className="bg-white p-4 text-center">
            <h3 className="font-heading font-semibold text-teal-dark">{pillar.label}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

Note: the `pillar-farm-to-fork.jpg` extension (not `.png`) matches the actual source file copied in Task 10 — the source image for that card is a `.jpg` on the live site, while the other three pillar images are `.png`.

- [ ] **Step 4: Write the RelatedCardGrid component**

```tsx
// ghb-farms/components/RelatedCardGrid.tsx
import Image from "next/image";
import Link from "next/link";
import type { Card } from "@/types/content";

export function RelatedCardGrid({ cards, heading = "Find out more" }: { cards: Card[]; heading?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h2 className="mb-6 text-center font-heading text-2xl font-bold text-teal-dark">{heading}</h2>
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cards.length >= 3 ? "lg:grid-cols-3" : ""} ${
          cards.length >= 4 ? "lg:grid-cols-4" : ""
        }`}
      >
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
          >
            <div className="relative h-40 w-full">
              <Image src={card.image.src} alt={card.image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-heading font-semibold text-teal-dark">{card.heading}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify components compile**

Run: `cd ghb-farms && npx tsc --noEmit`
Expected: no errors (these components have no data yet, but are structurally complete and type-check against `types/content.ts`).

- [ ] **Step 6: Commit**

```bash
git add ghb-farms/components/
git commit -m "feat: add Hero, SectionStack, PillarGrid, RelatedCardGrid components"
```

---

### Task 6: ImageGallery component (Community + newsletters)

**Files:**
- Create: `ghb-farms/components/ImageGallery.tsx`

**Interfaces:**
- Consumes: `GalleryImage` type from Task 3.
- Produces: `<ImageGallery images={GalleryImage[]} />`, consumed by Task 15 (Community) and Task 17 (newsletters).

- [ ] **Step 1: Write the ImageGallery component with a lightbox**

```tsx
// ghb-farms/components/ImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryImage } from "@/types/content";

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square overflow-hidden rounded-lg"
            aria-label={`View larger image: ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 text-white"
            aria-label="Close image viewer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ghb-farms && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add ghb-farms/components/ImageGallery.tsx
git commit -m "feat: add ImageGallery component with lightbox"
```

---

### Task 7: Home page content + page component

**Files:**
- Create: `ghb-farms/content/home.ts`
- Create: `ghb-farms/app/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/home/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack`, `PillarGrid`, `RelatedCardGrid` from Task 5.
- Produces: working `/` route — later tasks don't depend on this page's exports, but every later page follows this exact file's pattern (content file + page component).

- [ ] **Step 1: Pull Home page images via FTP**

Make sure `$FTP_PASSWORD` is set in your shell (see Credential Setup above), then:

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p home
cd home
curl -s -o GHB-Farms-Home-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/08/GHB-Farms-Home-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Home-Banner-Core-Pillars-People.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/08/GHB-Farms-Home-Banner-Core-Pillars-People.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Home-Banner-Core-Pillars-Modern-Facilities.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/08/GHB-Farms-Home-Banner-Core-Pillars-Modern-Facilities.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Home-Traktor.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Home-Traktor.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-Genetics.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-Genetics.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-Modern-Facilities.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-Modern-Facilities.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-People.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-People.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Home-Footer.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Home-Footer.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all 8 files downloaded with non-zero size.

- [ ] **Step 2: Write the Home content data**

```typescript
// ghb-farms/content/home.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "Welcome to",
  heading: "The Gold Standard of Pork",
  image: { src: "/images/home/GHB-Farms-Home-Banner.png", alt: "GHB Farms pig farming operation" },
  cta: { label: "Discover more", href: "/what-we-do" },
};

export const goldStandardSections: SectionRow[] = [
  {
    heading: "We hold ourselves to the highest possible standards.",
    body: [
      "The welfare of our pigs is of the highest priority on our farm. To ensure that our pigs enjoy a high-standard of living, we strive to exceed industry standards and refer to this as The Gold Standard. Our passion is evident in the quality of our pork, which meets top global standards.",
    ],
    image: { src: "/images/home/GHB-Farms-Home-Traktor.png", alt: "Tractor working the fields at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "S.A.F.E is our means of holding ourselves accountable to the best quality and standard - from farm to fork.",
    body: [
      "Responsible, sustainable farming is central to all of our operations. We strive to continuously work towards excellence as a world-class family farm, implementing responsible practices towards our people, our animals and the environment.",
    ],
    image: { src: "/images/home/GHB-Farms-Core-Pillars-Modern-Facilities.png", alt: "Modern farming facilities at GHB Farms" },
    imageSide: "left",
    cta: { label: "Learn about S.A.F.E", href: "/safe" },
  },
];

export const discoverCards: Card[] = [
  { heading: "Who we are", href: "/about-us", image: { src: "/images/home/GHB-Farms-Core-Pillars-People.png", alt: "The GHB Farms team" } },
  { heading: "Heritage", href: "/about-us#heritage", image: { src: "/images/home/GHB-Farms-Home-Traktor.png", alt: "GHB Farms heritage since 1955" } },
  { heading: "Community", href: "/community", image: { src: "/images/home/GHB-Farms-Home-Footer.png", alt: "GHB Farms community involvement" } },
];
```

- [ ] **Step 3: Write the Home page component**

```tsx
// ghb-farms/app/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, goldStandardSections, discoverCards } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero {...heroContent} />
      <PillarGrid />
      <SectionStack sections={goldStandardSections} />
      <RelatedCardGrid cards={discoverCards} heading="Discover our farm" />
    </>
  );
}
```

- [ ] **Step 4: Verify the Home page renders correctly**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: Hero with "The Gold Standard of Pork" heading and background image; 4-card pillar grid; two alternating image/text sections; 3-card "Discover our farm" grid. No console errors about missing images.

- [ ] **Step 5: Commit**

```bash
git add ghb-farms/content/home.ts ghb-farms/app/page.tsx ghb-farms/public/images/home/
git commit -m "feat: add Home page"
```

---

### Task 8: About Us page (with Heritage section) + What We Do page

**Files:**
- Create: `ghb-farms/content/about-us.ts`
- Create: `ghb-farms/app/about-us/page.tsx`
- Create: `ghb-farms/content/what-we-do.ts`
- Create: `ghb-farms/app/what-we-do/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/about-us/`, `ghb-farms/public/images/what-we-do/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack`, `RelatedCardGrid` components.
- Produces: `/about-us` (with `id="heritage"` anchor target) and `/what-we-do` routes.

- [ ] **Step 1: Pull images for both pages via FTP**

Make sure `$FTP_PASSWORD` is set in your shell, then:

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p about-us what-we-do
cd about-us
curl -s -o GHB-Farms-About-Rake.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-About-Rake.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Heritage-Windmill.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Heritage-Windmill.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Community-CTA.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Community-CTA.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
cd ../what-we-do
curl -s -o GHB-Farms-025.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-025.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-Genetics.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-Genetics.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-Modern-Facilities.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-Modern-Facilities.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Core-Pillars-People.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Core-Pillars-People.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la "c:\AppDev\GHB Farms\ghb-farms\public\images\about-us" "c:\AppDev\GHB Farms\ghb-farms\public\images\what-we-do"
```

Verify all files downloaded with non-zero size.

- [ ] **Step 2: Write the About Us content data**

```typescript
// ghb-farms/content/about-us.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "Who we are",
  heading: "At GHB, we strive to continuously work towards excellence.",
  image: { src: "/images/about-us/GHB-Farms-About-Rake.png", alt: "GHB Farms agricultural equipment" },
};

export const whoWeAreSections: SectionRow[] = [
  {
    heading: "Who we are",
    body: [
      "As a family-owned and family-run farm since 1955, we live our values to maintain long-standing relationships with our clients. For almost 70 years, we have proudly supplied Eskort – South Africa's leading bacon and sausage products brand since 1917. We tirelessly strive towards excellence and practice safe, responsible operations for our people, our animals, and the environment.",
      "Responsible, sustainable farming practice is central to our operations and as industry leaders, we continuously implement new and innovative technologies to support the highest standards of practice.",
      "We primarily operate as a pig farm, supplying pigs daily to Eskort. Of our pig stock, approximately 90% is supplied to Eskort.",
    ],
    image: { src: "/images/about-us/GHB-Farms-About-Rake.png", alt: "GHB Farms family-run operations" },
    imageSide: "right",
    cta: { label: "Discover our heritage", href: "/about-us#heritage" },
  },
  {
    heading: "Our vision",
    body: [
      "We aim to pass our values and legacy on to the future generations, ensuring that we maintain our reputation of excellence within the South African piggery industry. We will continue to improve our farms and operations to keep the Golden Standard and strengthen our presence as a trusted name in the industry and our community. Producing quality pork is our only passion.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Community-CTA.jpg", alt: "GHB Farms vision for the future" },
    imageSide: "left",
  },
  {
    heading: "Our mission",
    eyebrow: "We aim to continue producing quality pork for generations to come.",
    body: [
      "We strive towards excellence as a world-class family farm, implementing responsible practices that enhance the lives of people, our animals, and the wellbeing of the environment.",
      "Our passion is evident in the quality of our pork. We focus on the humane treatment of our animals, a safe and rewarding work environment for our employees, and have adopted processes for continuous contribution towards conservation efforts and engagement with communities that are impacted by our operations.",
      "Responsible, sustainable farming practice is central to all of our operations and we continually seek new and innovative ways of improving our practices to deliver superior quality products and services to our clients. Our adoption of the use of technology in our farming operations has certainly placed us at the forefront of our industry.",
      "As one of South Africa's largest pork providers, we are tasked with the responsibility of providing the best-possible care to our pigs. We, therefore, continue to invest in the welfare of our herds. Our crate-free and group housing system is one of the ways in which we ensure optimal comfort and safety for our animals.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Heritage-Windmill.png", alt: "GHB Farms mission and values" },
    imageSide: "right",
  },
];

export const heritageSection: SectionRow[] = [
  {
    heading: "Heritage",
    body: [
      "As a family-run farm, we take pride in our history and our family's heritage is at the heart of our operations.",
      "Based in Bronkhorstspruit, Gauteng, South Africa, GHB Farms is a family-owned enterprise and has proudly supplied pork to Eskort since the 1950s.",
      "GHB Farms was established in 1955 by G.H. Braak Snr. Since inception with only one unit located in the Donkerhoek area situated on the outskirts of Pretoria, the farm has expanded to full operation of three units in and around the Bronkhorstspruit area.",
    ],
    image: { src: "/images/about-us/GHB-Farms-Heritage-Windmill.png", alt: "GHB Farms heritage windmill, established 1955" },
    imageSide: "left",
  },
];

export const communityCard: Card[] = [
  { heading: "Learn about our community", href: "/community", image: { src: "/images/about-us/GHB-Farms-Community-CTA.jpg", alt: "GHB Farms community involvement" } },
];
```

- [ ] **Step 3: Write the About Us page component with a heritage anchor**

```tsx
// ghb-farms/app/about-us/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, whoWeAreSections, heritageSection, communityCard } from "@/content/about-us";

export default function AboutUsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={whoWeAreSections} />
      <div id="heritage">
        <SectionStack sections={heritageSection} />
      </div>
      <RelatedCardGrid cards={communityCard} heading="Find out more about our community" />
    </>
  );
}
```

- [ ] **Step 4: Write the What We Do content data**

```typescript
// ghb-farms/content/what-we-do.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "What we do",
  heading: "We produce world-class pork for the South African market",
  image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms pork production operations" },
};

export const sections: SectionRow[] = [
  {
    heading: "We strive to continuously work towards excellence as a world-class family farm, implementing responsible practices towards our people, our animals and the environment.",
    body: [
      "As a passionate, world-class pork farm we are committed to the humane treatment of our animals, providing a safe and rewarding work environment for our employees, positively contributing towards conservation efforts, and engaging our communities with a view to improving the lives of the residents – both current and future.",
      "We practice responsible, sustainable farming – it is at the heart of all that we do and guides our decision-making processes.",
      "The farms consist of two main sections – one section is reserved for breeding herds, and the other for grower herds. The breeding herds are sectioned in an area that is conducive to safe and healthy reproduction. Once piglets are weaned, they are relocated (on a weekly basis) to the growing area that is structured to support the well-being of our herds.",
      "In taking this approach on our farms, our customers are assured of purchasing a single-source product. We produce our own piglets and ensure that they are grown in optimal health to the correct slaughter age and weight. This practice has held us in good stead with Eskort, enabling them to continue providing the best-possible meat that is of the highest-possible standard.",
    ],
    image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms single-source pork production" },
    imageSide: "left",
  },
];

export const corePillarsCards: Card[] = [
  { heading: "Genetics", href: "/excellence/genetics", image: { src: "/images/what-we-do/GHB-Farms-Core-Pillars-Genetics.png", alt: "GHB Farms genetics program" } },
  { heading: "Modern Facilities", href: "/core-pillars", image: { src: "/images/what-we-do/GHB-Farms-Core-Pillars-Modern-Facilities.png", alt: "GHB Farms modern facilities" } },
  { heading: "People", href: "/core-pillars", image: { src: "/images/what-we-do/GHB-Farms-Core-Pillars-People.png", alt: "The people of GHB Farms" } },
];

export const communityCard: Card[] = [
  { heading: "Learn about our community", href: "/community", image: { src: "/images/what-we-do/GHB-Farms-025.png", alt: "GHB Farms community" } },
];
```

Note: the original site's core-pillars grid linked `/genetics` and `/feedmill/`; per Global Constraints, `/genetics` is remapped to `/excellence/genetics` above and `/feedmill/` is simply omitted from this card list (only 3 cards, not 4).

- [ ] **Step 5: Write the What We Do page component**

```tsx
// ghb-farms/app/what-we-do/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, corePillarsCards, communityCard } from "@/content/what-we-do";

export default function WhatWeDoPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={corePillarsCards} heading="Our Core Pillars" />
      <RelatedCardGrid cards={communityCard} heading="The Gold Standard" />
    </>
  );
}
```

- [ ] **Step 6: Verify both pages render**

Run: `npm run dev`, visit `http://localhost:3000/about-us` and `http://localhost:3000/what-we-do`.
Expected: About Us shows Hero, 3-section stack, a Heritage section reachable via `#heritage` anchor (test by visiting `http://localhost:3000/about-us#heritage` directly and confirming the browser scrolls to it), and a community card. What We Do shows Hero, 1 section, 3-card core-pillars grid, 1-card community CTA.

- [ ] **Step 7: Commit**

```bash
git add ghb-farms/content/about-us.ts ghb-farms/app/about-us/ ghb-farms/content/what-we-do.ts ghb-farms/app/what-we-do/ ghb-farms/public/images/about-us/ ghb-farms/public/images/what-we-do/
git commit -m "feat: add About Us (with heritage section) and What We Do pages"
```

---

### Task 9: Core Pillars page

**Files:**
- Create: `ghb-farms/content/core-pillars.ts`
- Create: `ghb-farms/app/core-pillars/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/core-pillars/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack` components.
- Produces: `/core-pillars` route.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p core-pillars
cd core-pillars
curl -s -o GHB-Farms-Genetics-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Genetics-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Modern-Facilities.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Modern-Facilities.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Director-03.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Director-03.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all 3 files downloaded with non-zero size.

- [ ] **Step 2: Write the Core Pillars content data**

```typescript
// ghb-farms/content/core-pillars.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Core pillars",
  heading: "Our core pillars keep our farm well-run.",
  image: { src: "/images/core-pillars/GHB-Farms-Genetics-1.jpg", alt: "GHB Farms core pillars overview" },
};

export const sections: SectionRow[] = [
  {
    heading: "Topigs research team strives to push the envelope by developing new technology in the genetics industry.",
    body: [
      "All GHB Farms herds are bred by Topigs Norsvin, the world leader in innovative swine genetics, providing breeding lines that produce the best quality stock for efficient farming and top-quality pork products.",
      "For more information about Topigs Norsvin, visit topigsnorsvin.co.za.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Genetics-1.jpg", alt: "Topigs Norsvin genetics partnership" },
    imageSide: "right",
  },
  {
    heading: "Modern facilities allow us to keep abreast of farming developments and trends.",
    body: [
      "85% of pregnant Sows are housed in groups and the conditions are EU Welfare standards compliant. The remaining 15% are housed for eight weeks in crates, and eight weeks in groups. Within the next five years, we plan to close down our old facility and replace it with a modern farm that allows 100% of pigs to be housed in compliance with EU Welfare standards.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Modern-Facilities.jpg", alt: "Modern farming facilities at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Everything we do on our farm starts and ends with people - knowledgeable and passionate people.",
    body: [
      "Meet our team of knowledgeable staff.",
    ],
    bullets: [
      "Employees: trained and experienced farm personnel.",
      "Vets: CS Vet Veterinary Consultancy (www.csvet.co.za).",
      "Specialists: industry specialists supporting our operations.",
    ],
    image: { src: "/images/core-pillars/GHB-Farms-Director-03.png", alt: "The GHB Farms team" },
    imageSide: "right",
  },
];
```

- [ ] **Step 3: Write the Core Pillars page component**

```tsx
// ghb-farms/app/core-pillars/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/core-pillars";

export default function CorePillarsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 4: Verify the page renders**

Run: `npm run dev`, visit `http://localhost:3000/core-pillars`.
Expected: Hero + 3-section stack (Genetics, Modern Facilities with 85/15 crate text, People with bullet list).

- [ ] **Step 5: Commit**

```bash
git add ghb-farms/content/core-pillars.ts ghb-farms/app/core-pillars/ ghb-farms/public/images/core-pillars/
git commit -m "feat: add Core Pillars page"
```

---

### Task 10: S.A.F.E. overview page

**Files:**
- Create: `ghb-farms/content/safe.ts`
- Create: `ghb-farms/app/safe/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/safe/` (including the 4 PillarGrid card images referenced by Task 5's `PillarGrid` component)

**Interfaces:**
- Consumes: `Hero`, `SectionStack`, `PillarGrid` components.
- Produces: `/safe` route. Also produces the actual image files `PillarGrid` (Task 5) references at `/images/safe/pillar-*.png`/`.jpg` — until this task runs, `PillarGrid` renders with broken image links on every page that uses it; that's expected and resolves once this task completes.

- [ ] **Step 1: Pull images via FTP, including PillarGrid card images**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p safe
cd safe
curl -s -o GHB-Farms-Our-Promise-The-Gold-Standard.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Our-Promise-The-Gold-Standard.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Sustainable-Environmental-Sustainability-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Sustainable-Environmental-Sustainability-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Quality-Assurance-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Quality-Assurance-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o distribution-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/distribution-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
cp GHB-Farms-Sustainable-Environmental-Sustainability-Banner.png pillar-sustainable.png
cp GHB-Farms-Accountable-Quality-Assurance-Banner.png pillar-accountable.png
cp distribution-1.jpg pillar-farm-to-fork.jpg
cp GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png pillar-excellence.png
ls -la
```

If any `curl` download results in a 0-byte file (check with `ls -la` — files should all be >1KB), retry that specific download once; if it still fails, note the exact filename and continue (a missing pillar-card image is not blocking — it will 404 gracefully as a broken `<img>`, not crash the build).

- [ ] **Step 2: Write the S.A.F.E. content data**

```typescript
// ghb-farms/content/safe.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "We promise to continue investing in people, infrastructure, and pigs to provide the highest quality meat to our customers.",
  image: { src: "/images/safe/GHB-Farms-Our-Promise-The-Gold-Standard.png", alt: "The GHB Farms Gold Standard promise" },
};

export const sections: SectionRow[] = [
  {
    heading: "The Gold Standard",
    body: [
      "Responsible, sustainable farming practice builds the trust our customers place in us. The S.A.F.E standard was cultivated by our partners at Eskort.",
    ],
    image: { src: "/images/safe/GHB-Farms-Our-Promise-The-Gold-Standard.png", alt: "GHB Farms and Eskort Gold Standard partnership" },
    imageSide: "right",
  },
  {
    heading: "Our unrivalled commitment to pork product quality is brought to life by Eskort's new S.A.F.E standard",
    bullets: [
      "'Sustainable' will be how your farm strives to be environmentally Sustainable.",
      "'Accountable' will be how your farm holds itself accountable, a rarity in today's business world.",
      "'Farm to Fork' will be the processes, standards and practices you adhere to to ensure traceability and local support when producing your pork.",
      "'Excellence' is how your farm maintains and delivers excellence through its farming practices and quality standards.",
    ],
    body: [
      "When you align our high standards and world-class processes to Eskort's S.A.F.E standard, the result is a Gold Standard in pork. The objective of S.A.F.E is to build a quality measure for the pork industry. This ensures that the consumer is assured of sustainable farming practices and allows us to hold ourselves accountable for the production of our pork – from farm to fork.",
    ],
    image: { src: "/images/safe/GHB-Farms-Accountable-Quality-Assurance-Banner.png", alt: "The S.A.F.E standard pillars" },
    imageSide: "left",
  },
];
```

- [ ] **Step 3: Write the S.A.F.E. page component**

```tsx
// ghb-farms/app/safe/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { PillarGrid } from "@/components/PillarGrid";
import { heroContent, sections } from "@/content/safe";

export default function SafePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <PillarGrid />
    </>
  );
}
```

- [ ] **Step 4: Verify the page renders and PillarGrid images now load everywhere**

Run: `npm run dev`, visit `http://localhost:3000/safe`.
Expected: Hero, 2-section stack with the 4-item bullet list, and the 4-card pillar grid with real images (not broken icons). Also revisit `http://localhost:3000` (Home) and confirm its `PillarGrid` now shows real images too (Home used the same shared component from Task 5).

- [ ] **Step 5: Commit**

```bash
git add ghb-farms/content/safe.ts ghb-farms/app/safe/ ghb-farms/public/images/safe/
git commit -m "feat: add S.A.F.E. overview page and PillarGrid card images"
```

---

### Task 11: Sustainable pillar pages (landing + 4 sub-pages)

**Files:**
- Create: `ghb-farms/content/sustainable/index.ts`
- Create: `ghb-farms/content/sustainable/environmental-sustainability.ts`
- Create: `ghb-farms/content/sustainable/precision-soil-analysis.ts`
- Create: `ghb-farms/content/sustainable/pig-welfare.ts`
- Create: `ghb-farms/content/sustainable/biosecurity.ts`
- Create: `ghb-farms/app/sustainable/page.tsx`
- Create: `ghb-farms/app/sustainable/enviromental-sustainability/page.tsx`
- Create: `ghb-farms/app/sustainable/precision-soil-analysis/page.tsx`
- Create: `ghb-farms/app/sustainable/pig-welfare/page.tsx`
- Create: `ghb-farms/app/sustainable/biosecurity/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/sustainable/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack`, `RelatedCardGrid` components.
- Produces: 5 routes under `/sustainable`.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p sustainable
cd sustainable
curl -s -o GHB-Farm-Circular-Economy.svg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farm-Circular-Economy.svg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Sustainable-Pig-Welfare.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Sustainable-Pig-Welfare.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Precison-Soil-Analysis-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Precison-Soil-Analysis-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Biosecurity-Banner.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Biosecurity-Banner.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Keeping-Our-Environmental-Footprint-To-a-Minimium-01.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Keeping-Our-Environmental-Footprint-To-a-Minimium-01.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Sustainable-Water-Waste-Management.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Sustainable-Water-Waste-Management.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Precison-Soil-Analysis-Traktor.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Precison-Soil-Analysis-Traktor.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Sustainable-Responsible-Treatment-01.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Sustainable-Responsible-Treatment-01.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Sustainable-Housing.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Sustainable-Housing.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Biosecurity-Truck.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Biosecurity-Truck.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Biosecurity-Protocols.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Biosecurity-Protocols.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-soil-scan-1.pdf "ftp://197.221.13.233/public_html/wp-content/uploads/2022/10/GHB-soil-scan-1.pdf" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-soild-scan-2.pdf "ftp://197.221.13.233/public_html/wp-content/uploads/2022/05/GHB-soild-scan-2.pdf" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-soil-scan-3.pdf "ftp://197.221.13.233/public_html/wp-content/uploads/2022/05/GHB-soil-scan-3.pdf" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all files downloaded with non-zero size.

- [ ] **Step 2: Write the Sustainable landing content data**

```typescript
// ghb-farms/content/sustainable/index.ts
import type { SectionRow, Card } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E.",
  heading: "Environmental Sustainability, Sow-Friendly Practices, Pig Welfare and Biosecurity.",
  image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "GHB Farms sustainable farming practices" },
};

export const sections: SectionRow[] = [
  {
    heading: "Sustainable",
    body: [
      'There are many practices used while encouraging sustainable agriculture and sustainable food systems. Consumers and retailers concerned with sustainability can look for "values-based" foods that are grown using methods that promote employee wellbeing while sustaining environmentally friendly practices.',
      "The goal of sustainable farming is to meet society's needs in the present without compromising the ability of future generations to meet their own needs.",
    ],
    image: { src: "/images/sustainable/GHB-Farm-Circular-Economy.svg", alt: "GHB Farms circular economy diagram" },
    imageSide: "right",
    cta: { label: "Learn about Accountable", href: "/accountable" },
  },
];

export const pillarCards: Card[] = [
  { heading: "Environmental Sustainability", href: "/sustainable/enviromental-sustainability", image: { src: "/images/sustainable/GHB-Farms-Sustainable-Water-Waste-Management.png", alt: "Environmental sustainability at GHB Farms" } },
  { heading: "Precision Soil Analysis", href: "/sustainable/precision-soil-analysis", image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Precision soil analysis at GHB Farms" } },
  { heading: "Pig Welfare", href: "/sustainable/pig-welfare", image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "Pig welfare practices at GHB Farms" } },
  { heading: "Biosecurity", href: "/sustainable/biosecurity", image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Banner.jpg", alt: "Biosecurity protocols at GHB Farms" } },
];
```

Note: heading uses "Environmental" (corrected), per Global Constraints' typo-fix list.

- [ ] **Step 3: Write the Sustainable landing page component**

```tsx
// ghb-farms/app/sustainable/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { RelatedCardGrid } from "@/components/RelatedCardGrid";
import { heroContent, sections, pillarCards } from "@/content/sustainable";

export default function SustainablePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <RelatedCardGrid cards={pillarCards} heading="Explore Sustainable" />
    </>
  );
}
```

- [ ] **Step 4: Write the Environmental Sustainability content and page**

```typescript
// ghb-farms/content/sustainable/environmental-sustainability.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Environmental Sustainability",
  image: { src: "/images/sustainable/GHB-Farms-Keeping-Our-Environmental-Footprint-To-a-Minimium-01.png", alt: "Keeping our environmental footprint to a minimum" },
};

export const sections: SectionRow[] = [
  {
    heading: "Keeping our environmental footprint to a minimum",
    body: [
      "We are committed to reducing greenhouse gas emissions across our operations.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Keeping-Our-Environmental-Footprint-To-a-Minimium-01.png", alt: "GHB Farms environmental footprint reduction efforts" },
    imageSide: "right",
  },
  {
    heading: "Working to reduce our environmental footprint.",
    body: [
      "Our feeding, water, and wastewater practices are structured to minimize environmental impact across every stage of production.",
      "We prioritize water conservation and reuse manure as a nutrient source, partnering with Dr. James Meyer, a water and wastewater quality specialist, to guide our practices.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Water-Waste-Management.png", alt: "Water and waste management practices at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Dr. Meyer",
    body: [
      "Dr. James Meyer holds an MSc (1990) and contributed to the SA Water Quality Guidelines (1993/1996), receiving the Stander Most Promising Researcher Award in 1994 and a PhD in 1998. He was awarded a bronze medal in 2000 and presented at the 10th World Conference on Animal Production in 2008. He is a co-author of Game Ranch Management (5th Edition) and serves as Technical Manager at Virbac South Africa, having contributed to Water Research Commission reports in 2021 and advised SAPPO and the Department of Water and Sanitation. Outside of his professional work, Dr. Meyer has competed in skydiving, including in Dubai in 2010 and the World Cup Canopy Piloting in 2019, and serves on the board of the Parachute Association of South Africa.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Water-Waste-Management.png", alt: "Dr. James Meyer, water quality specialist partner" },
    imageSide: "right",
  },
];
```

```tsx
// ghb-farms/app/sustainable/enviromental-sustainability/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/environmental-sustainability";

export default function EnvironmentalSustainabilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

Note: the route folder is spelled `enviromental-sustainability` (matching the live site's existing URL slug exactly, per spec §4's flat-URL decision — the slug keeps its original spelling even though the H1 and nav label are corrected to "Environmental").

- [ ] **Step 5: Write the Precision Soil Analysis content and page**

```typescript
// ghb-farms/content/sustainable/precision-soil-analysis.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Precision soil analysis",
  image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Precision soil analysis at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Keeping our soil healthy for the future of our farm",
    body: [
      "We are committed to leaving an environmental legacy, including meeting our greenhouse gas reduction commitments.",
      "Our water management practices include monitoring of pig slurry to prevent environmental impact.",
      "We maintain environmentally sustainable practices across our feeding, waste, water, and distribution processes, and provide thorough onboarding for new employees on these standards.",
      "We conduct manure production impact assessments as part of our ongoing environmental monitoring.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Soil analysis practices at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Soil Analysis",
    body: ["We conduct regular scientific analysis of our soil to ensure continued agricultural health."],
    bullets: ["Calcium Analysis", "Potassium Analysis", "Phosphorus Analysis"],
    image: { src: "/images/sustainable/GHB-Farms-Precison-Soil-Analysis-Traktor.png", alt: "Calcium, potassium, and phosphorus soil analysis" },
    imageSide: "right",
    pdfLinks: [
      { label: "Calcium Analysis Report", href: "/images/sustainable/GHB-soil-scan-1.pdf" },
      { label: "Potassium Analysis Report", href: "/images/sustainable/GHB-soild-scan-2.pdf" },
      { label: "Phosphorus Analysis Report", href: "/images/sustainable/GHB-soil-scan-3.pdf" },
    ],
  },
];
```

```tsx
// ghb-farms/app/sustainable/precision-soil-analysis/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/precision-soil-analysis";

export default function PrecisionSoilAnalysisPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 6: Write the Pig Welfare content and page**

```typescript
// ghb-farms/content/sustainable/pig-welfare.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Pig Welfare",
  image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "Pig welfare practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "We care for our animals in a humane and responsible manner",
    body: [
      "As one of South Africa's largest pork providers, we are committed to providing the best-possible care to our pigs across all our operations.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Responsible-Treatment-01.png", alt: "Responsible animal treatment at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "We handle thousands of animals on a daily basis, and we do so with respect for our animals.",
    body: [
      "Our crate-free and group housing system is one of the ways we ensure the optimal comfort and safety of our animals. As a member of the South African Pork Producers' Organisation (SAPPO) and certified with Pork 360, GHB farms regularly undergoes auditing processes to confirm compliance.",
    ],
    bullets: [
      "Trained employees for transport and welfare checks",
      "Low-density and short-distance transportation",
      "Modern animal transport vehicles",
      "Standardised transport checks",
      "Constant supervision at our operations",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Responsible-Treatment-01.png", alt: "Animal welfare transport standards at GHB Farms" },
    imageSide: "left",
    cta: { label: "Find out more", href: "https://topigsnorsvin.co.za/contact-us/" },
  },
  {
    heading: "We pride ourselves on adhering to the S.A.F.E Standard",
    body: ["The S.A.F.E minimum standards include:"],
    bullets: [
      "Improving the quality of the flooring surfaces",
      "Increasing the living space available for sows and gilts",
      "Introducing a higher level of training and competence on welfare issues for personnel",
      "Providing permanent access to fresh water and to materials for rooting and playing",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Pig-Welfare.png", alt: "The S.A.F.E welfare standard at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Housing",
    body: [
      "85% of pregnant Sows are housed in groups and the conditions are EU Welfare standards compliant. The remaining 15% are housed for 8 weeks in crates and 8 weeks in groups – they are compliant with SA welfare standards (within the next 5 years we plan to close down our old facility and replace it with a modern farm that complies with EU standards).",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Housing.png", alt: "Pig housing standards at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Antibiotic measuring/benchmarking.",
    body: [
      "We are committed to responsible antibiotic use and continuous monitoring to support the health and welfare of our animals.",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Sustainable-Housing.png", alt: "Antibiotic monitoring practices at GHB Farms" },
    imageSide: "right",
  },
];
```

Note on the "Housing" section's body text: the closing parenthesis has been added (`...EU standards).`) to close the dangling parenthesis found in the live source — this is a punctuation correction, not a content change, consistent with the spec's intent to fix "clear" errors while leaving factual claims untouched. The crate-free claim in section 2 and the 85%/15% figure in "Housing" are left contradicting each other exactly as flagged in spec §7 — do not reconcile them.

```tsx
// ghb-farms/app/sustainable/pig-welfare/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/pig-welfare";

export default function PigWelfarePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 7: Write the Biosecurity content and page**

```typescript
// ghb-farms/content/sustainable/biosecurity.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Sustainable",
  heading: "Biosecurity",
  image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Banner.jpg", alt: "Biosecurity protocols at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Strict biosecurity protocols ensure the safety of our pigs.",
    body: [
      "We raise Specific Pathogen Free (SPF) pigs to supply Eskort, maintaining the highest standards of herd health.",
      "Strict biosecurity protocols are implemented on our farms. Protocols are as follows:",
    ],
    bullets: [
      "Perimeter fencing on all farms",
      "Access control for all personnel and visitors entering the farm",
      "Dry and wet showers for all personnel entering the farm",
      "Compartmentalised farms that are audited and certified by the Department of Animal Health",
      "Cleaning and disinfection of houses after each batch",
      "The buy-in model is followed for all replacement stock from Topigs Norsvin",
    ],
    image: { src: "/images/sustainable/GHB-Farms-Biosecurity-Truck.jpg", alt: "Biosecurity transport protocols at GHB Farms" },
    imageSide: "right",
  },
];
```

```tsx
// ghb-farms/app/sustainable/biosecurity/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/sustainable/biosecurity";

export default function BiosecurityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 8: Verify all 5 Sustainable routes render**

Run: `npm run dev`, visit each of:
- `http://localhost:3000/sustainable` — Hero + 1 section + 4-card pillar grid
- `http://localhost:3000/sustainable/enviromental-sustainability` — Hero + 3 sections
- `http://localhost:3000/sustainable/precision-soil-analysis` — Hero + 2 sections, second section has 3 PDF download links that open the actual PDFs
- `http://localhost:3000/sustainable/pig-welfare` — Hero + 5 sections, confirm "Find out more" CTA links to `https://topigsnorsvin.co.za/contact-us/`
- `http://localhost:3000/sustainable/biosecurity` — Hero + 1 section with 6-item bullet list

- [ ] **Step 9: Commit**

```bash
git add ghb-farms/content/sustainable/ ghb-farms/app/sustainable/ ghb-farms/public/images/sustainable/
git commit -m "feat: add Sustainable pillar landing and 4 sub-pages"
```

---

### Task 12: Accountable pillar pages (landing + 2 sub-pages)

**Files:**
- Create: `ghb-farms/content/accountable/index.ts`
- Create: `ghb-farms/content/accountable/quality-assurance.ts`
- Create: `ghb-farms/content/accountable/food-safety-hygiene-practices.ts`
- Create: `ghb-farms/app/accountable/page.tsx`
- Create: `ghb-farms/app/accountable/quality-assurance/page.tsx`
- Create: `ghb-farms/app/accountable/food-safety-hygiene-practices/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/accountable/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack` components.
- Produces: 3 routes under `/accountable`.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p accountable
cd accountable
curl -s -o GHB-Farms-Accountability.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountability.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Quality-Assurance-John-Deere.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Quality-Assurance-John-Deere.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Quality-Assurance-Pork-360.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Quality-Assurance-Pork-360.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Quality-Assurance-SAPPO.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Quality-Assurance-SAPPO.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Food.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Food.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Medicating-1.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Medicating-1.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all files downloaded with non-zero size. Note: per Global Constraints, the Accountable landing page deliberately does NOT reuse "GHB-Farms-About-Rake" (the copy-pasted wrong-alt-text image from the old site) — this task pulls Accountable-specific images only.

- [ ] **Step 2: Write the Accountable landing content data**

```typescript
// ghb-farms/content/accountable/index.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E.",
  heading: "Accountability is at the core of our farming practices.",
  image: { src: "/images/accountable/GHB-Farms-Accountability.jpg", alt: "Accountability practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Accountable",
    body: [
      "Uncompromised hygiene practices, traceability, and rigid quality control measures are ways in which we ensure that we produce quality pork. The first two aspects of our cornerstone philosophy – Sustainable and Accountable – are addressed by our superior farm practices, including food safety and traceability systems, pig welfare and sow-friendly practices, and biosecurity and environmental sustainability programmes.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountability.jpg", alt: "GHB Farms accountability philosophy" },
    imageSide: "right",
  },
  {
    eyebrow: "How we achieve this",
    heading: "Food Safety and Quality",
    body: [
      "We are dedicated to providing you and your family with quality pork.",
      "Producing wholesome pork. We adhere to strict protocols. 100% Antibiotic free by the time it reaches the store.",
      "As a proud supplier of Eskort Ltd, we have been a part of millions of your meals for over 60 years.",
      "We pride ourselves in supplying food that carries a 100% safety assurance to our customers, backed by strict protocols, farm-level safety standards, and careful veterinary medication practices.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-John-Deere.png", alt: "Food safety and quality practices at GHB Farms" },
    imageSide: "left",
    cta: { label: "Learn about Farm to Fork", href: "/farm-to-fork" },
  },
];
```

- [ ] **Step 3: Write the Accountable landing page component**

```tsx
// ghb-farms/app/accountable/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/accountable";

export default function AccountablePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 4: Write the Quality Assurance content and page**

```typescript
// ghb-farms/content/accountable/quality-assurance.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Accountable",
  heading: "Quality assurance",
  image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-John-Deere.png", alt: "Quality assurance practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Good quality assurance is key to complying with global standards.",
    body: [
      "We are committed to providing our customers with safe, high-quality products. After all, you and your family deserve no less.",
      "We maintain strict pathogen and antibiotic-free policies, tracking each weekly piglet batch from birth through to the abattoir.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-John-Deere.png", alt: "Quality assurance monitoring at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "We are proud to be certified with Pork 360",
    body: [
      "Pork 360 is an independent quality assurance and traceability certification body for the South African pork industry. Our farms undergo regular audits, with oversight from state veterinarians who confirm our compartmentalisation status.",
      "For more information, visit www.pork360.co.za.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-Pork-360.png", alt: "Pork 360 certification at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "We are proud to be certified with SAPPO",
    body: [
      "SAPPO, the South African Pork Producers' Organisation, is registered with the NAMC and developed the Pork 360 certification programme.",
      "For more information, visit www.sapork.co.za.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Quality-Assurance-SAPPO.png", alt: "SAPPO certification at GHB Farms" },
    imageSide: "right",
  },
];
```

```tsx
// ghb-farms/app/accountable/quality-assurance/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/accountable/quality-assurance";

export default function QualityAssurancePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

Note: "After all" (two words) — this fixes the confirmed "Afterall" typo per Global Constraints.

- [ ] **Step 5: Write the Food Safety & Hygiene Practices content and page**

```typescript
// ghb-farms/content/accountable/food-safety-hygiene-practices.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Accountable",
  heading: "Food safety & hygiene practices",
  image: { src: "/images/accountable/GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Food.png", alt: "Food safety and hygiene practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "We are dedicated to providing you and your family with the best quality pork",
    body: [
      "At GHB Farms, food safety and quality are the cornerstones of our system.",
      "We pride ourselves in supplying food that carries a 100% safety assurance to our customers.",
      "As a proud supplier of Eskort, we have been a part of your meals for over 60 years.",
      "We maintain Pork 360 and SAPPO certification, adhere to the S.A.F.E Standards, and carefully oversee veterinary medication practices as part of our antibiotic-free promise. We are committed to continuous improvement across all of our food safety and hygiene practices.",
    ],
    image: { src: "/images/accountable/GHB-Farms-Accountable-Food-Safety-Hygiene-Practices-Medicating-1.png", alt: "Veterinary and hygiene practices at GHB Farms" },
    imageSide: "left",
  },
];
```

```tsx
// ghb-farms/app/accountable/food-safety-hygiene-practices/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/accountable/food-safety-hygiene-practices";

export default function FoodSafetyHygienePracticesPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 6: Verify all 3 Accountable routes render**

Run: `npm run dev`, visit `http://localhost:3000/accountable`, `/accountable/quality-assurance`, `/accountable/food-safety-hygiene-practices`.
Expected: each shows Hero + its sections; confirm "After all" (not "Afterall") appears correctly on the Quality Assurance page.

- [ ] **Step 7: Commit**

```bash
git add ghb-farms/content/accountable/ ghb-farms/app/accountable/ ghb-farms/public/images/accountable/
git commit -m "feat: add Accountable pillar landing and 2 sub-pages"
```

---

### Task 13: Farm to Fork pillar pages (landing + 3 sub-pages)

**Files:**
- Create: `ghb-farms/content/farm-to-fork/index.ts`
- Create: `ghb-farms/content/farm-to-fork/processing-plants-distribution-retail.ts`
- Create: `ghb-farms/content/farm-to-fork/responsibility.ts`
- Create: `ghb-farms/content/farm-to-fork/traceability.ts`
- Create: `ghb-farms/app/farm-to-fork/page.tsx`
- Create: `ghb-farms/app/farm-to-fork/processing-plants-distribution-retail/page.tsx`
- Create: `ghb-farms/app/farm-to-fork/responsibility/page.tsx`
- Create: `ghb-farms/app/farm-to-fork/traceability/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/farm-to-fork/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack` components.
- Produces: 4 routes under `/farm-to-fork`.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p farm-to-fork
cd farm-to-fork
curl -s -o GHB-Farms-Accountable-Farm-to-Fork-Truck-Farm.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Farm-to-Fork-Truck-Farm.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o distribution-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/distribution-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o distribution-2-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/distribution-2-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Farm-to-Fork-Responsibility-Container.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Farm-to-Fork-Responsibility-Container.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Form-to-Fork-BG.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Form-to-Fork-BG.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Farm-to-Fork-Traceability-Mark-Pigs.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Farm-to-Fork-Traceability-Mark-Pigs.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all files downloaded with non-zero size.

- [ ] **Step 2: Write the Farm to Fork landing content data**

```typescript
// ghb-farms/content/farm-to-fork/index.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.A.F.E",
  heading: "Delivering on quality from farm to fork.",
  image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Truck-Farm.png", alt: "GHB Farms farm-to-fork delivery process" },
};

export const sections: SectionRow[] = [
  {
    heading: "Farm to Fork",
    body: [
      "Our quality control programme is implemented throughout the value chain, including processing and manufacturing.",
      "It is our adherence and commitment to safety and quality that has held us in good stead with Eskort, who grades and enforces compliance with respect to how manufacturers and processors maintain their facilities and care for their livestock.",
    ],
    image: { src: "/images/farm-to-fork/distribution-1.jpg", alt: "Farm-to-fork distribution process at GHB Farms" },
    imageSide: "right",
    cta: { label: "Learn about Excellence", href: "/excellence" },
  },
];
```

```tsx
// ghb-farms/app/farm-to-fork/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork";

export default function FarmToForkPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 3: Write the Processing Plants, Distribution & Retail content and page**

```typescript
// ghb-farms/content/farm-to-fork/processing-plants-distribution-retail.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Farm-to-fork",
  heading: "Processing Plants, Distribution & Retail",
  image: { src: "/images/farm-to-fork/distribution-2-1.jpg", alt: "Processing, distribution, and retail at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "We grade and enforce compliance on our farms with respect to the way in which we maintain our facilities, as well as in the way we care for our pigs and ensure their welfare throughout their lives.",
    body: [
      "The processing, distribution, and retail aspects of our operation must comply with the standards set forth by Eskort, who regularly audit our operations to ensure absolute compliance.",
      "We have in place a quality control programme designed to cover every aspect of the value chain. The farm to fork philosophy includes monitoring of each step in the process, including production, post-harvesting, processing, distribution, marketing, and retail of our products.",
      "As a supplier to Eskort, we meet and exceed the standards and requirements laid out by the industry, and do so in collaboration with our client.",
    ],
    image: { src: "/images/farm-to-fork/distribution-2-1.jpg", alt: "Distribution and retail processes at GHB Farms" },
    imageSide: "left",
  },
];
```

```tsx
// ghb-farms/app/farm-to-fork/processing-plants-distribution-retail/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/processing-plants-distribution-retail";

export default function ProcessingPlantsDistributionRetailPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 4: Write the Responsibility content and page**

```typescript
// ghb-farms/content/farm-to-fork/responsibility.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Farm-to-fork",
  heading: "Responsibility",
  image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Responsibility-Container.png", alt: "Responsibility practices at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "We practice responsible farming throughout our operations.",
    body: ["We hold ourselves accountable to the adherence to safe practice and abide by the following standards:"],
    bullets: [
      "Laws on housing, salmonella control, feed ingredients (no antibiotics) and ensure that all actions are taken where necessary.",
      "Sows must be allowed to roam from the time they are weaned until entry into the farrowing house.",
      "No feed containing meat or bone meal can be used in the pig's diet.",
      "Documentation concerning feed composition as well as production conditions are required, and we maintain rigid record-keeping practices.",
      "External control and documentation of health and use of medicine is required, and this forms part of our rigorous record-keeping and standards processes.",
      "No castration of boars. We do not castrate any boars on our farms.",
    ],
    image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Responsibility-Container.png", alt: "Responsible farming standards at GHB Farms" },
    imageSide: "right",
  },
];
```

```tsx
// ghb-farms/app/farm-to-fork/responsibility/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/responsibility";

export default function ResponsibilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 5: Write the Traceability content and page**

```typescript
// ghb-farms/content/farm-to-fork/traceability.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Farm-to-fork",
  heading: "Traceability",
  image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Form-to-Fork-BG.png", alt: "Traceability systems at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "GHB is a registered export compartment - that is certified by the Department of Agriculture.",
    body: [
      "We maintain Pork 360 and SAPPO certification checks, and CS Vet conducts biosecurity audits to support our 360-degree traceability programme.",
      "Having a 360-degree traceability programme in place means that we are able to provide details of any given pig's health, growth rate, food intake, and medical treatment. It is for this reason that we breed, rear, and deliver our product on and from the farm; guaranteeing a superior quality end product to our customers.",
    ],
    image: { src: "/images/farm-to-fork/GHB-Farms-Accountable-Farm-to-Fork-Traceability-Mark-Pigs.png", alt: "Pig traceability marking at GHB Farms" },
    imageSide: "left",
  },
];
```

```tsx
// ghb-farms/app/farm-to-fork/traceability/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/farm-to-fork/traceability";

export default function TraceabilityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 6: Verify all 4 Farm to Fork routes render**

Run: `npm run dev`, visit `/farm-to-fork`, `/farm-to-fork/processing-plants-distribution-retail`, `/farm-to-fork/responsibility`, `/farm-to-fork/traceability`.
Expected: each shows Hero + its sections correctly.

- [ ] **Step 7: Commit**

```bash
git add ghb-farms/content/farm-to-fork/ ghb-farms/app/farm-to-fork/ ghb-farms/public/images/farm-to-fork/
git commit -m "feat: add Farm to Fork pillar landing and 3 sub-pages"
```

---

### Task 14: Excellence pillar pages (landing + 2 sub-pages)

**Files:**
- Create: `ghb-farms/content/excellence/index.ts`
- Create: `ghb-farms/content/excellence/association-with-eskort.ts`
- Create: `ghb-farms/content/excellence/genetics.ts`
- Create: `ghb-farms/app/excellence/page.tsx`
- Create: `ghb-farms/app/excellence/association-with-eskort/page.tsx`
- Create: `ghb-farms/app/excellence/genetics/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/excellence/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack` components.
- Produces: 3 routes under `/excellence`, including the final target of the "Genetics" link corrected in Task 8's What We Do page.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p excellence
cd excellence
curl -s -o excellence.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/excellence.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-01.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-01.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Accountable-Excellance-Genetics-Banner.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/GHB-Farms-Accountable-Excellance-Genetics-Banner.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o genetics-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/genetics-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o genetics-2.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/07/genetics-2.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all files downloaded with non-zero size.

- [ ] **Step 2: Write the Excellence landing content data**

```typescript
// ghb-farms/content/excellence/index.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "S.a.f.e.",
  heading: "We are a forward-looking farm and strive to remain abreast of - if not to lead - innovation and trends in pig farming",
  image: { src: "/images/excellence/excellence.jpg", alt: "Excellence and innovation at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    heading: "Excellence",
    body: [
      "The fourth cornerstone – Excellence – is evident in our products through the uncompromised quality of our pork, rigid commitment to quality and hygiene practices, and the many principles we have in place that offer assurance to our partners at Eskort.",
      "Our quality assurance approach is unmatched, we address every link in the supply chain. Our adoption of the SAFE badge conveys our holistic approach to quality assurance.",
      "We go above and beyond industry standards to ensure that we excel past what is expected from us on a quality assurance and practice level.",
    ],
    quote: {
      text: "At Eskort, we place our customers' health and well-being above all else. It is, therefore, crucial for us to take ownership of every element of the supply chain.",
      attribution: "Arnold Prinsloo, Eskort CEO",
    },
    image: { src: "/images/excellence/excellence.jpg", alt: "GHB Farms commitment to excellence" },
    imageSide: "right",
  },
  {
    eyebrow: "Our Association with Eskort",
    heading: "We are proud of our lifelong partnership with Eskort",
    body: [
      "We are proud to be associated with, and to supply quality pork to Eskort since the 1950s.",
      "Our customers can be assured of the quality and traceability of our product, backed by a lifelong partnership built on trust.",
    ],
    image: { src: "/images/excellence/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-Banner.png", alt: "GHB Farms partnership with Eskort since the 1950s" },
    imageSide: "left",
    cta: { label: "Learn about Farm to fork", href: "/farm-to-fork" },
  },
];
```

Note: "We are proud of our lifelong partnership with Eskort" (corrected from "to of our lifelong partnership") per Global Constraints.

- [ ] **Step 3: Write the Excellence landing page component**

```tsx
// ghb-farms/app/excellence/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/excellence";

export default function ExcellencePage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 4: Write the Association with Eskort content and page**

```typescript
// ghb-farms/content/excellence/association-with-eskort.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Excellence",
  heading: "Our association with Eskort",
  image: { src: "/images/excellence/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-01.png", alt: "GHB Farms association with Eskort" },
};

export const sections: SectionRow[] = [
  {
    heading: "We are proud of our lifelong partnership with Eskort",
    body: [
      "We grade and enforce compliance on our farms with respect to the way in which we maintain our facilities, as well as in the way we care for our pigs and ensure their welfare throughout their lives. The processing, distribution, and retail aspects of our operation must comply with the standards set forth by Eskort, who regularly audits our operations to ensure absolute compliance.",
      "We have in place a quality control programme designed to cover every aspect of the value chain. The farm-to-fork philosophy includes monitoring of each step in the process, including production, post-harvesting, processing, distribution, marketing, and retail of our products.",
      "As a supplier to Eskort, we meet and exceed the standards and requirements laid out by the industry, and do so in collaboration with our client.",
    ],
    image: { src: "/images/excellence/GHB-Farms-Accountable-Excellance-Our-Association-with-Eskort-01.png", alt: "GHB Farms and Eskort quality standards" },
    imageSide: "right",
  },
];
```

Note: same "We are proud of our lifelong partnership" typo fix applied here — this exact typo was confirmed present on both this page and the Excellence landing page.

```tsx
// ghb-farms/app/excellence/association-with-eskort/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/excellence/association-with-eskort";

export default function AssociationWithEskortPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 5: Write the Genetics content and page**

```typescript
// ghb-farms/content/excellence/genetics.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Excellence",
  heading: "Genetics",
  image: { src: "/images/excellence/genetics-1.jpg", alt: "GHB Farms genetics program" },
};

export const sections: SectionRow[] = [
  {
    heading: "Topigs Norsvin – Innovative swine genetics",
    body: [
      "All GHB Farms herds are bred by Topigs Norsvin, the world leader in innovative swine genetics. Topigs Norsvin provides breeding lines that produce the best quality stock for efficient farming and top-quality pork products.",
      "Topigs Norsvin's research and development focus drives the dissemination of genetic improvements across the industry.",
      "Topigs Norsvin understands the rigorous market demands that farmers need to meet and therefore constant research and innovation go into breeding lines that produce the best quality stock for efficient farming and top-quality pork products. At GHB farms, our Topigs Norsvin pigs have proven to produce an increase in the number of our live-born and weaned piglets, as well as a decrease in our pre-weaned mortality.",
      "For more information about Topigs Norsvin visit www.topigsnorsvin.com.",
    ],
    image: { src: "/images/excellence/genetics-2.jpg", alt: "Topigs Norsvin genetics partnership at GHB Farms" },
    imageSide: "left",
  },
];
```

```tsx
// ghb-farms/app/excellence/genetics/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/excellence/genetics";

export default function GeneticsPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 6: Verify all 3 Excellence routes render, and confirm the Genetics link fix from Task 8**

Run: `npm run dev`, visit `/excellence`, `/excellence/association-with-eskort`, `/excellence/genetics`.
Expected: Excellence landing shows the attributed blockquote correctly; both Excellence pages show "proud of our lifelong partnership" (not "to of"). Then revisit `http://localhost:3000/what-we-do` and click the "Genetics" card — confirm it navigates to `/excellence/genetics` and loads correctly (this closes the loop on the link fix made in Task 8).

- [ ] **Step 7: Commit**

```bash
git add ghb-farms/content/excellence/ ghb-farms/app/excellence/ ghb-farms/public/images/excellence/
git commit -m "feat: add Excellence pillar landing and 2 sub-pages"
```

---

### Task 15: Community page

**Files:**
- Create: `ghb-farms/content/community.ts`
- Create: `ghb-farms/app/community/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/community/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack`, `ImageGallery` components.
- Produces: `/community` route.

- [ ] **Step 1: Pull the 8-image gallery plus section images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p community
cd community
for i in 01 02 03 04 05 06 07; do
  curl -s -o "GHB-Farms-Community-$i.png" "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Community-$i.png" --user "ghbfatgxan:$FTP_PASSWORD"
done
curl -s -o "GHB-Farms-Community-Gallery-08.png" "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Community-Gallery-08.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Improving-The-Community.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Improving-The-Community.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Community.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Community.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Check each file is non-zero size; if any of the numbered gallery images 404 (0 bytes), check `wp-content/uploads/2022/12/` via `curl --list-only "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/" --user "ghbfatgxan:$FTP_PASSWORD"` for the exact filenames and correct the URL before re-running — the exact numbering suffix may differ slightly from the fetched image_links.

- [ ] **Step 2: Write the Community content data**

```typescript
// ghb-farms/content/community.ts
import type { SectionRow, GalleryImage } from "@/types/content";

export const heroContent = {
  eyebrow: "People and communities",
  heading: "We work to improve the lives of our people as well as the communities surrounding GHB Farms",
  image: { src: "/images/community/GHB-Farms-Community.jpg", alt: "GHB Farms community involvement" },
};

export const sections: SectionRow[] = [
  {
    eyebrow: "Community",
    heading: "Supporting our employees",
    body: [
      "We consider our employees and their families part of the GHB Farms family, and invest accordingly in their wellbeing.",
    ],
    image: { src: "/images/community/GHB-Farms-Improving-The-Community.png", alt: "Supporting GHB Farms employees" },
    imageSide: "right",
  },
  {
    heading: "Community Projects",
    body: [],
    bullets: [
      "Building a creche for the local informal settlement",
      "Buying glasses for all our workers with limited eyesight",
      "Sponsoring a local orphanage",
      "Online school project on all our farms – ready for the 2022 school year",
      "Sponsoring a local primary school",
    ],
    image: { src: "/images/community/GHB-Farms-Community-01.png", alt: "GHB Farms community projects" },
    imageSide: "left",
  },
  {
    heading: "Stationery",
    body: [
      "As part of our COVID-19 back-to-school support, we provided highlighters, rulers, pens, pencils, stationery boxes, erasers, sharpeners, glue sticks, scissors, examination pads, water bottles, and lunch boxes to local schoolchildren.",
    ],
    image: { src: "/images/community/GHB-Farms-Community-02.png", alt: "Stationery donations to local schools" },
    imageSide: "right",
  },
  {
    heading: "Schooling",
    body: [
      "We operate an on-farm online-school facility equipped with air conditioning, wifi, rubber flooring, tables and chairs, and electrical and USB outlets.",
    ],
    image: { src: "/images/community/GHB-Farms-Community-03.png", alt: "On-farm online schooling facility" },
    imageSide: "left",
  },
  {
    heading: "Optometry",
    body: [
      "We run an annual eye-screening program for our employees. After all, they deserve the chance to enjoy the beauty that surrounds them on our farms and to see clearly the fruits of their labour.",
    ],
    image: { src: "/images/community/GHB-Farms-Community-04.png", alt: "Annual eye-screening programme for employees" },
    imageSide: "right",
  },
  {
    heading: "Nutrition",
    body: ["We provide bi-monthly food packages to support the nutrition of our employees and their families."],
    image: { src: "/images/community/GHB-Farms-Community-05.png", alt: "Nutrition support for GHB Farms employees" },
    imageSide: "left",
  },
  {
    heading: "Uplifting local communities",
    body: [
      "We have made significant investments in communities through school sponsorships. We co-sponsor a local crèche in the Waaikraal Community, have begun operating an online school on our farm, and have sponsored a local orphanage, and provided reading glasses for our employees with limited or diminished eyesight.",
      "GHB Farms has made a conscious effort, wherever possible, towards the ongoing improvement of the lives of people and communities surrounding our farms. As many of our employees and their families form part of these communities, we are dedicated to providing clean water, renewable energy sources, food, and contribute towards critical needs where these are identified.",
      "GHB Farms has invested in the upliftment of communities of Bossemanskraal, Spitskop, and Rooipoort, in the Bronkhorstspruit area. To date, we have installed water tanks and solar panels to homes in order to improve the quality of life for the residents. This lightens the load of the daily activities and chores for the residents of the communities, enabling them to lead healthier, more productive lives.",
      "As a family business that seeks to leave a positive and meaningful legacy for future generations, we have placed significant focus on improving the lives of the youth within communities. To this end, we have positively contributed towards the safety and development of the youths. We have to date, amongst other initiatives, built a crèche and provided free WiFi access to schools in the area.",
      "As many of the community members are employees at GHB Farms and play a key role in the success of our business, the health and wellbeing of community members remains an area of importance to us. Part of our initiatives is to provide for our communities and maximise efficiency at our farms, and we continue to make regular donations of food to the residents of these communities.",
      "To find out how you or your business can help us improve the lives of our community members, please contact us.",
    ],
    image: { src: "/images/community/GHB-Farms-Community-06.png", alt: "GHB Farms community upliftment initiatives" },
    imageSide: "right",
    cta: { label: "Contact us", href: "/contact" },
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/community/GHB-Farms-Community-01.png", alt: "GHB Farms community photo 1" },
  { src: "/images/community/GHB-Farms-Community-02.png", alt: "GHB Farms community photo 2" },
  { src: "/images/community/GHB-Farms-Community-03.png", alt: "GHB Farms community photo 3" },
  { src: "/images/community/GHB-Farms-Community-04.png", alt: "GHB Farms community photo 4" },
  { src: "/images/community/GHB-Farms-Community-05.png", alt: "GHB Farms community photo 5" },
  { src: "/images/community/GHB-Farms-Community-06.png", alt: "GHB Farms community photo 6" },
  { src: "/images/community/GHB-Farms-Community-07.png", alt: "GHB Farms community photo 7" },
  { src: "/images/community/GHB-Farms-Community-Gallery-08.png", alt: "GHB Farms community photo 8" },
];
```

Note: "After all, they deserve the chance..." already correct two-word spelling here (confirmed from the live content audit this page never had the "Afterall" typo — that was isolated to Quality Assurance).

- [ ] **Step 3: Write the Community page component**

```tsx
// ghb-farms/app/community/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { ImageGallery } from "@/components/ImageGallery";
import { heroContent, sections, galleryImages } from "@/content/community";

export default function CommunityPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
      <ImageGallery images={galleryImages} />
    </>
  );
}
```

- [ ] **Step 4: Verify the page renders**

Run: `npm run dev`, visit `http://localhost:3000/community`.
Expected: Hero, 7-section stack, then an 8-image gallery grid; clicking a gallery image opens the lightbox.

- [ ] **Step 5: Commit**

```bash
git add ghb-farms/content/community.ts ghb-farms/app/community/ ghb-farms/public/images/community/
git commit -m "feat: add Community page with image gallery"
```

---

### Task 16: Conservation page

**Files:**
- Create: `ghb-farms/content/conservation.ts`
- Create: `ghb-farms/app/conservation/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/conservation/`

**Interfaces:**
- Consumes: `Hero`, `SectionStack` components.
- Produces: `/conservation` route.

- [ ] **Step 1: Pull images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p conservation
cd conservation
curl -s -o GHB-Farms-Vulture.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Vulture.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Wildebees-Discover-More-About-Us.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Wildebees-Discover-More-About-Us.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Hay-Production-01.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Hay-Production-01.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Hay-Production-02.png "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Hay-Production-02.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o GHB-Farms-Consveration-Piggery.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2022/12/GHB-Farms-Consveration-Piggery.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all files downloaded with non-zero size.

- [ ] **Step 2: Write the Conservation content data**

```typescript
// ghb-farms/content/conservation.ts
import type { SectionRow } from "@/types/content";

export const heroContent = {
  eyebrow: "Conservation",
  heading: "We believe that responsible, environmentally friendly farming and wildlife conservation are interrelated",
  image: { src: "/images/conservation/GHB-Farms-Vulture.png", alt: "Wildlife conservation at GHB Farms" },
};

export const sections: SectionRow[] = [
  {
    eyebrow: "Vulture conservation",
    heading: "We work closely with VulPro, the Vulture Conservation Programme and donate our mortalities to this notable conservation effort.",
    body: [
      "As vultures are a key indicator of environmental health, VulPro focuses on the impact of these birds on the environment and, equally important, the environment's impact on their survival. Combining education, good science, networking, capacity building, and knowledge generation for the benefit of both vultures and society, VulPro aims to ultimately influence the well-being of our natural resources and, in this way, positively benefit society.",
    ],
    bullets: [
      "Rehabilitate vultures",
      "House and facilitate captive breeding and reintroduction programmes",
      "Implement wild population breeding monitoring",
      "Provide vulture educational and awareness programmes",
      "Perform veterinary and ecological research",
      "Undertake distribution, dispersal and foraging ranges of vultures",
    ],
    image: { src: "/images/conservation/GHB-Farms-Vulture.png", alt: "VulPro vulture conservation partnership" },
    imageSide: "right",
  },
  {
    eyebrow: "Wild Game",
    heading: "Farming with wild game is more sustainable than farming with cattle.",
    body: [
      "VulPro operates a centre in Hartbeespoort and holds NPC and PBO status. For more information about VulPro, please visit www.vulpro.com.",
      "We make use of game-slurry as a natural fertiliser across our operations.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Wildebees-Discover-More-About-Us.png", alt: "Wild game conservation at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Hay production",
    body: [
      "We conduct soil analysis to ensure the quality of our hay production.",
      "We grow Weeping Love Grass (Eragrostis curvula), baled in 1.2m round bales, valued for its protein content and use as a natural fertilizer.",
      "Our hay bales are used for haymaking, wind erosion control, and managing water discharge areas. Contact us directly to purchase.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-01.png", alt: "Hay production at GHB Farms" },
    imageSide: "right",
  },
  {
    heading: "Feedmill",
    body: [
      "We partner with nutritionists to ensure a balanced diet that supports the genetic health of our herds, with careful measurement of feed intake across our operations.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Hay-Production-02.png", alt: "Feedmill operations at GHB Farms" },
    imageSide: "left",
  },
  {
    heading: "Our Piggery",
    body: [
      "We maintain careful housing conditions and track every animal from birth to departure.",
    ],
    image: { src: "/images/conservation/GHB-Farms-Consveration-Piggery.jpg", alt: "Piggery operations at GHB Farms" },
    imageSide: "right",
    cta: { label: "Take a tour of our piggery to see how we care for our livestock.", href: "/contact" },
  },
];
```

Note: H1 uses "environmentally" (corrected from "enviromentally"); the "Our Piggery" CTA links to `/contact` (corrected from the broken `/contact-us/` link), per Global Constraints.

- [ ] **Step 3: Write the Conservation page component**

```tsx
// ghb-farms/app/conservation/page.tsx
import { Hero } from "@/components/Hero";
import { SectionStack } from "@/components/SectionStack";
import { heroContent, sections } from "@/content/conservation";

export default function ConservationPage() {
  return (
    <>
      <Hero {...heroContent} />
      <SectionStack sections={sections} />
    </>
  );
}
```

- [ ] **Step 4: Verify the page renders and the contact link is fixed**

Run: `npm run dev`, visit `http://localhost:3000/conservation`.
Expected: Hero (confirm H1 reads "environmentally friendly") + 5-section stack; click the "Take a tour..." CTA and confirm it navigates to `/contact`, not a broken `/contact-us/` URL.

- [ ] **Step 5: Commit**

```bash
git add ghb-farms/content/conservation.ts ghb-farms/app/conservation/ ghb-farms/public/images/conservation/
git commit -m "feat: add Conservation page"
```

---

### Task 17: News listing + September/May newsletter pages

**Files:**
- Create: `ghb-farms/content/news.ts`
- Create: `ghb-farms/app/news/page.tsx`
- Create: `ghb-farms/app/september-newsletter/page.tsx`
- Create: `ghb-farms/app/may-newsletter/page.tsx`
- Pull images via FTP to: `ghb-farms/public/images/newsletters/september/`, `ghb-farms/public/images/newsletters/may/`

**Interfaces:**
- Consumes: `ImageGallery` component from Task 6.
- Produces: `/news`, `/september-newsletter`, `/may-newsletter` routes. Per Global Constraints, `/march-newsletter` is explicitly NOT created in this task or plan.

- [ ] **Step 1: Pull newsletter images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images\newsletters"
mkdir -p september may
cd september
curl -s -o GHB-September-Newsletter-1-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2024/09/GHB-September-Newsletter-1-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
for i in 2 3 4 5 6 7 8 9; do
  curl -s -o "GHB-September-Newsletter-$i.jpg" "ftp://197.221.13.233/public_html/wp-content/uploads/2024/09/GHB-September-Newsletter-$i.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
done
ls -la
cd ../may
curl -s -o GHB-May-Newsletter-1-1.jpg "ftp://197.221.13.233/public_html/wp-content/uploads/2024/05/GHB-May-Newsletter-1-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
for i in 2 3 4 5 6 7; do
  curl -s -o "GHB-May-Newsletter-$i-1.jpg" "ftp://197.221.13.233/public_html/wp-content/uploads/2024/05/GHB-May-Newsletter-$i-1.jpg" --user "ghbfatgxan:$FTP_PASSWORD"
done
ls -la
```

If any files come back 0 bytes, list the exact directory contents with `curl --list-only "ftp://197.221.13.233/public_html/wp-content/uploads/2024/09/" --user "ghbfatgxan:$FTP_PASSWORD"` (and the `2024/05/` equivalent) to find the exact filenames/numbering, since upload month folders may differ from the guessed `2024/09` and `2024/05` — the September/May newsletters' actual upload dates weren't confirmed during content audit, only their image filename patterns. Adjust the month path and retry.

- [ ] **Step 2: Write the News content data**

```typescript
// ghb-farms/content/news.ts
import type { GalleryImage } from "@/types/content";

export interface NewsletterSummary {
  title: string;
  href: string;
}

export const newsletterList: NewsletterSummary[] = [
  { title: "September Newsletter", href: "/september-newsletter" },
  { title: "May Newsletter", href: "/may-newsletter" },
];

export const septemberImages: GalleryImage[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/newsletters/september/GHB-September-Newsletter-${i + 1}${i === 0 ? "-1" : ""}.jpg`,
  alt: `GHB Farms September newsletter, page ${i + 1}`,
}));

export const mayImages: GalleryImage[] = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/newsletters/may/GHB-May-Newsletter-${i + 1}-1.jpg`,
  alt: `GHB Farms May newsletter, page ${i + 1}`,
}));
```

- [ ] **Step 3: Write the News listing page component**

```tsx
// ghb-farms/app/news/page.tsx
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
```

- [ ] **Step 4: Write the September and May newsletter page components**

```tsx
// ghb-farms/app/september-newsletter/page.tsx
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
```

```tsx
// ghb-farms/app/may-newsletter/page.tsx
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
```

- [ ] **Step 5: Verify all 3 routes render**

Run: `npm run dev`, visit `/news`, `/september-newsletter`, `/may-newsletter`.
Expected: News listing shows 2 links (not 3 — March excluded per Global Constraints); clicking into each newsletter shows its image gallery (9 images for September, 7 for May) with working lightbox.

- [ ] **Step 6: Commit**

```bash
git add ghb-farms/content/news.ts ghb-farms/app/news/ ghb-farms/app/september-newsletter/ ghb-farms/app/may-newsletter/ ghb-farms/public/images/newsletters/
git commit -m "feat: add News listing and September/May newsletter pages"
```

---

### Task 18: Contact page with Web3Forms contact form

**Files:**
- Create: `ghb-farms/components/ContactForm.tsx`
- Create: `ghb-farms/components/ContactLocations.tsx`
- Create: `ghb-farms/app/contact/page.tsx`
- Create: `ghb-farms/.env.local` (not committed — added to `.gitignore`)
- Modify: `ghb-farms/.gitignore`
- Pull images via FTP to: `ghb-farms/public/images/contact/`

**Interfaces:**
- Consumes: `farmLocations` data from Task 4's `content/contact-locations.ts` (already created in that task).
- Produces: `/contact` route with a working client-side form submission to Web3Forms.

- [ ] **Step 1: Pull the 6 farm/office images via FTP**

```bash
cd "c:\AppDev\GHB Farms\ghb-farms\public\images"
mkdir -p contact
cd contact
curl -s -o ghb-farms-kaalfontein-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-kaalfontein-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o ghb-farms-rooipoort-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-rooipoort-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o ghb-farms-devondale-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-devondale-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o ghb-farms-spitskop-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-spitskop-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o ghb-farms-mullershoop-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-mullershoop-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
curl -s -o ghb-farms-head-office-image.png "ftp://197.221.13.233/public_html/wp-content/uploads/2023/02/ghb-farms-head-office-image.png" --user "ghbfatgxan:$FTP_PASSWORD"
ls -la
```

Verify all 6 files downloaded with non-zero size (these paths match exactly what Task 4's `content/contact-locations.ts` already references, so no data file changes are needed here).

- [ ] **Step 2: Add the Web3Forms placeholder env var**

Create `ghb-farms/.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=REPLACE_WITH_REAL_KEY_BEFORE_DEPLOY
```

Add to `ghb-farms/.gitignore` (append if `.env*` isn't already covered by the `create-next-app` default):

```
.env.local
```

- [ ] **Step 3: Write the ContactForm client component**

```tsx
// ghb-farms/components/ContactForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="subject" value="New contact form submission from ghbfarms.co.za" />
      <input type="hidden" name="from_name" value="GHB Farms Website" />
      <div>
        <label htmlFor="name" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Phone (optional)
        </label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-heading text-sm font-medium text-teal-dark">
          Message
        </label>
        <Textarea id="message" name="message" required rows={5} />
      </div>
      <Button type="submit" disabled={status === "submitting"} className="bg-gold text-teal-dark hover:bg-gold/90">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-teal">Thank you — your message has been sent.</p>}
      {status === "error" && <p className="text-red">Something went wrong. Please try again or email hr@ghbfarms.com directly.</p>}
    </form>
  );
}
```

- [ ] **Step 4: Write the ContactLocations component**

```tsx
// ghb-farms/components/ContactLocations.tsx
import Image from "next/image";
import type { FarmLocation } from "@/types/content";

export function ContactLocations({ locations }: { locations: FarmLocation[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((farm) => (
        <a
          key={farm.name}
          href={farm.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-lg border border-grey/20 transition-shadow hover:shadow-lg"
        >
          <div className="relative h-40 w-full">
            <Image src={farm.image.src} alt={farm.image.alt} fill className="object-cover transition-transform group-hover:scale-105" />
          </div>
          <div className="bg-white p-4">
            <h3 className="font-heading font-semibold text-teal-dark">{farm.name}</h3>
            <p className="mt-1 text-sm text-grey">{farm.address}</p>
            <p className="mt-2 text-sm text-teal underline">Get directions</p>
          </div>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Write the Contact page component**

```tsx
// ghb-farms/app/contact/page.tsx
import { ContactForm } from "@/components/ContactForm";
import { ContactLocations } from "@/components/ContactLocations";
import { farmLocations } from "@/content/contact-locations";

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
          <div className="mt-4">
            <ContactLocations locations={farmLocations} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verify the Contact page renders and the form submits**

Run: `npm run dev`, visit `http://localhost:3000/contact`.
Expected: form with Name/Email/Phone/Message fields and a 6-card farm/office grid, each card linking out to its Google Maps URL.

Since the real Web3Forms key isn't available yet (placeholder env var), fully verify form submission once the site owner supplies the real key before launch (tracked in Global Constraints) — for now, confirm the form's client-side required-field validation works (submitting with Name/Email/Message empty should block submission via the browser's native HTML5 validation) and that clicking Submit with all fields filled shows the "Sending..." state and an error message (expected, since the placeholder key will be rejected by Web3Forms).

- [ ] **Step 7: Commit**

```bash
git add ghb-farms/components/ContactForm.tsx ghb-farms/components/ContactLocations.tsx ghb-farms/app/contact/ ghb-farms/public/images/contact/ ghb-farms/.gitignore
git commit -m "feat: add Contact page with Web3Forms contact form and farm location cards"
```

---

### Task 19: Full-site verification, type-check, lint, and static export build

**Files:**
- No new files — this task verifies the entire site built across Tasks 1-18.

**Interfaces:**
- Consumes: every route and component from all previous tasks.
- Produces: a verified `ghb-farms/out/` directory ready for FTP upload to cPanel.

- [ ] **Step 1: Run the TypeScript compiler across the whole project**

Run: `cd ghb-farms && npx tsc --noEmit`
Expected: zero errors. If there are errors, fix them in the relevant content/component file before proceeding (do not suppress with `@ts-ignore`).

- [ ] **Step 2: Run the linter**

Run: `cd ghb-farms && npm run lint`
Expected: zero errors. Fix any issues flagged (unused imports are the most likely issue given the volume of content files).

- [ ] **Step 3: Run the production static export build**

Run: `cd ghb-farms && npm run build`
Expected: build succeeds and produces `ghb-farms/out/` with one `.html` file per route (24 routes total: home, what-we-do, about-us, core-pillars, safe, sustainable + 4 children, accountable + 2 children, farm-to-fork + 3 children, excellence + 2 children, community, conservation, news, september-newsletter, may-newsletter, contact).

- [ ] **Step 4: Serve the static export locally and manually click through every route**

```bash
cd ghb-farms/out
npx serve .
```

Visit `http://localhost:3000` (or whatever port `serve` reports) and manually click through all 24 routes plus the mobile nav (resize browser <768px) to confirm:
- No broken images (check browser console for 404s on `<img>` tags)
- Internal links resolve correctly (especially the corrected ones: `/about-us#heritage`, `/excellence/genetics`, `/accountable/quality-assurance`, `/contact`)
- External links (topigsnorsvin.co.za, Google Maps, pork360.co.za, sapork.co.za, vulpro.com) open in a new tab and point to the right destination
- The 3 soil-analysis PDFs on `/sustainable/precision-soil-analysis` download/open correctly
- Mobile nav opens/closes and the S.A.F.E. submenu expands correctly on a narrow viewport

- [ ] **Step 5: Fix any issues found during manual verification**

If broken images or links are found, trace back to the specific content file (e.g., `content/sustainable/pig-welfare.ts`) and fix the path/href directly. Re-run Step 3 and Step 4 after any fix.

- [ ] **Step 6: Commit the final verified state**

```bash
cd "c:\AppDev\GHB Farms"
git add -A
git commit -m "chore: verify full site build, type-check, lint, and manual route walkthrough"
```

---

## Deferred / Out of Scope for This Plan

- **March newsletter** (`/march-newsletter`): excluded per site owner decision (2026-11-12) pending clarification of the live site's image-filename mismatch between March and May newsletters. A follow-up task can add this route once the correct images are confirmed.
- **Deployment to cPanel**: this plan produces a verified `out/` directory; the actual FTP upload to the live `ghbfatgxan` cPanel account is a deployment step to run once the site owner approves the finished build, not part of this implementation plan.
- **Web3Forms real API key**: the site owner will create the Web3Forms account and supply the real access key; Task 18 wires in a placeholder env var only.
