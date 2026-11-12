# GHB Farms Website Rebuild — Design Spec

Date: 2026-11-06
Status: Draft for review

## 1. Background

The current site, https://ghbfarms.co.za, runs on WordPress with the "aglet" theme,
which can no longer be updated. The theme's SCSS build is broken on the live server
(a `wp-scss` plugin cannot write its CSS cache due to file permissions), so a layer
of styling never compiled. Visible symptoms on nearly every page include raw PHP
warnings printed into the page body, a "Sass Compiling Error" notice, and (per the
site owner) alignment/spacing/appearance problems caused by missing CSS.

Decision (confirmed with site owner): rather than repair the broken WordPress/theme
stack — which would require full server access, fixing file permissions, and then
discovering and patching whatever further breakage sits behind the missing
stylesheet, all inside a theme that's explicitly described as a dead end — this is
a **full rebuild** on a modern stack, not a repair and not a design overhaul. Content,
structure, and intended visual hierarchy carry over; only the implementation changes.

## 2. Goals / non-goals

**Goals**
- Reproduce the site's existing information architecture and content faithfully.
- Infer and restore the intended visual design where the current CSS is broken,
  using markup structure, repeated patterns across pages, and sound defaults —
  not a redesign.
- Fix clear typos. Leave factual/business claims as-is, flagged for owner review.
- Ship a static site deployable to the existing cPanel/FTP hosting, no Node server.
- Add a working contact form (current site has none).

**Non-goals**
- No new visual direction, no rebranding, no new sections/features beyond what
  exists today (except the contact form, explicitly requested).
- No CMS. No server-side rendering. No database.

## 3. Tech stack

| Concern | Choice |
|---|---|
| Language | TypeScript |
| Framework | Next.js 15, App Router, `output: 'export'` (static export) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (button, card, accordion, navigation-menu, sheet/dialog for mobile nav, form, input, textarea) |
| Icons | lucide-react |
| Content | Local MDX/TSX data files (no CMS) — page copy as typed TS objects, newsletters as MDX |
| Images | `next/image` with `unoptimized: true` (required for static export); source assets pre-optimized at build/author time |
| Contact form | Client component, POSTs directly to Web3Forms' public API (no backend needed) |
| Hosting | Existing cPanel account — deploy via FTP/File Manager, upload the static `out/` directory as-is |

### Why static export

The hosting account is plain PHP/static (no "Setup Node.js App" in cPanel). Next.js
static export produces plain HTML/CSS/JS, which drops onto this hosting exactly like
the old WordPress export would, with no runtime. This rules out API routes, so the
contact form must call an external form endpoint directly from the browser —
Web3Forms (free tier, no backend, single API key) fits that constraint.

## 4. Information architecture

Carries over the current nav almost exactly. Two changes:
- Nav label typo fixed: "Enviromental Sustainability" → "Environmental Sustainability"
  (display text only; see §7 for the URL-slug decision).
- Drop `/our-promise` (footer badge link) — nothing links to it from in-nav content,
  and no live page was found at that path during the content survey. If the owner
  has content intended for this page, it can be added back.

```
/                                           Home
/what-we-do
/about-us
/core-pillars
/safe                                       S.A.F.E overview
/sustainable
  /sustainable/environmental-sustainability
  /sustainable/precision-soil-analysis
  /sustainable/pig-welfare
  /sustainable/biosecurity
/accountable
  /accountable/quality-assurance
  /accountable/food-safety-hygiene-practices
/farm-to-fork
  /farm-to-fork/processing-plants-distribution-retail
  /farm-to-fork/responsibility
  /farm-to-fork/traceability
/excellence
  /excellence/association-with-eskort
  /excellence/genetics
/community
/conservation
/news                                       newsletter listing
/[slug]                                     single newsletter, root-level (confirmed live URLs:
                                             /september-newsletter, /may-newsletter, /march-newsletter —
                                             NOT nested under /news/, corrected 2026-11-12)
/contact
```

Decision (confirmed with site owner): URL structure stays **flat**, matching the
current live site exactly, rather than nesting S.A.F.E. sub-pages under `/safe/...`.
This is a true like-for-like rebuild with zero risk to existing search ranking,
backlinks, or bookmarks. The `/safe` landing page still exists and still links to
each pillar; the pillars just keep their existing root-level URLs rather than
moving under `/safe/`.

Pages the current site links to but which 404 or point off-site, **not carried over
as working links** (content, if any existed, could not be recovered — see §9):
- `/heritage/` — 404. Linked from About Us ("Discover our heritage" x2) and the
  homepage "Heritage" card. The rebuild will point these at `/about-us#heritage`
  (an in-page section) since About Us already contains a "Heritage" heading and
  heritage copy (G.H. Braak Snr., 1955, Bronkhorstspruit) — see About Us template below.
- `/genetics`, `/feedmill/` — linked from `/what-we-do/`'s core-pillars grid, not in
  nav, not found elsewhere. Rebuild points these at `/safe/excellence/genetics` and
  omits the feedmill link (no feedmill content exists on the site) respectively.
- `/contact-us/` — one broken link on `/conservation/`; corrected to `/contact`.
- CTA links to the `ghb.agletonline.co.za` staging host (on Accountable, Farm-to-Fork,
  Excellence, Sustainable pages) — these are leftover staging URLs; corrected to the
  equivalent production path.

## 5. Page templates (built once, reused across the site)

Based on the full content survey, every page on the site is a variation of a small
set of templates:

1. **`SectionStack`** — eyebrow + heading + body copy, in alternating image/text rows.
   Covers About Us, What We Do, Core Pillars, Conservation, S.A.F.E. overview, and
   every S.A.F.E. pillar/sub-pillar page (Sustainable, Accountable, Farm-to-Fork,
   Excellence, and their children). This is the workhorse template — it needs to
   support optional sub-blocks: bullet lists, a highlighted quote, a bold-lead
   paragraph, and a linked PDF/image grid (used for the soil analysis scan reports).
2. **`PillarGrid`** — 4-card grid linking to Sustainable/Accountable/Farm to
   Fork/Excellence. Used on Home and `/safe`.
3. **`RelatedCardGrid`** — 2–4 card "Find out more about X" grid linking to sibling
   pages. Used at the bottom of nearly every S.A.F.E. sub-page.
4. **`ImageGallery`** — grid of images with lightbox. Used on Community (8 images)
   and each newsletter post (7–9 images).
5. **`ContactLocations`** — card grid of the 6 farms + head office, each linking to
   its map/PDF, plus the new contact form.
6. **`NewsListing`** + **`NewsPost`** — MDX-driven newsletter list/detail.
7. **Shared chrome**: `Header` (mega-menu nav matching the S.A.F.E. submenu structure),
   `Footer` (phone/email/Facebook, head office, 6 farm directions, privacy policy),
   `Hero`.

## 6. Visual design — restored from the theme's compiled CSS

Update (2026-11-12): FTP access to the live cPanel account was provided. The child
theme (`wp-content/themes/aglet-child/`) turned out to contain not only the broken
SCSS source but a **compiled `css/ai-main.css`** (103KB) from an earlier successful
build, dated before the SCSS started failing (the theme's own `scss/error_log.log`
shows compile failures going back to 2021). This is a real, non-inferred source for
brand colors and fonts — no guessing needed.

**Confirmed palette** (from `ai-main.css` utility classes and the logo SVGs):

| Token | Hex | Usage seen in CSS |
|---|---|---|
| Gold | `#C4A058` | `.ai-bg-gold`, SAFE badge icon fill |
| Teal (primary green) | `#0a6265` | `.ai-bg-green` |
| Dark teal | `#044245` | `.ai-bg-d-green` |
| Red/maroon | `#AA272F` | `.ai-bg-red`, GHB wordmark |
| Grey | `#707070` | `.ai-bg-grey` |
| White | `#ffffff` | `.ai-bg-white` |

**Confirmed fonts** (Google Fonts, both already used via `font-family` declarations
in the compiled CSS):
- Body / primary: **Rubik**
- Headings (h1 and `.ai-h1`/secondary font class): **Heebo**

**Confirmed logo**: `GHB-Farms-Logo.svg` — red "GHB" wordmark, teal "FARMS" wordmark
and underline, "Since 1955" tagline. `GHB-Farms-SAFE-Logo.svg` — gold pig-silhouette
badge icon. Both pulled from `wp-content/uploads/2022/07/` and saved to
`.ftp-pull/brand-assets/` for use as the rebuild's actual logo files (not placeholders).

This replaces the earlier plan to mock up 2–3 untested palette options — the real
brand system is now locked in directly from source.

Layout patterns (inferred from markup structure, since component CSS for layout —
as opposed to color/type utility classes — still isn't fully recoverable):
- **Hero sections**: full-width image with overlaid eyebrow + heading + CTA button
  (consistent across Home, What We Do, S.A.F.E. pages — all show this pattern).
- **Alternating image/text rows**: every long-form page alternates a full-bleed or
  large image with a text block (sometimes image-left, sometimes image-right) —
  I'll alternate sides row by row for visual rhythm, since the source markup doesn't
  preserve left/right intent after the CSS break.
- **Card grids**: consistently 2, 3, or 4 cards, image-on-top + heading + link,
  equal-width in a responsive grid (stacking to 1 column on mobile). This pattern
  repeats so often (pillar grids, related-card grids, contact location cards) it
  clearly was the theme's intended grid component — I'll build one reusable `Card`
  and vary column count.
- **Mobile nav**: current theme has a hamburger "Menu"/"Close" toggle — rebuilt as
  a shadcn `Sheet` with the same nested S.A.F.E. submenu as the desktop mega-menu.

## 7. Content fixes (confirmed scope: typos only)

Per your direction, I will fix clear spelling/typo errors, and leave factual/business
claims untouched even where they conflict with each other (flagged below for the
business to resolve on its own timeline — not a blocker for launch).

**Typos to fix:**
- "Enviromental" → "Environmental" (nav label and any body-copy occurrences; see
  §4 for the URL-slug question)
- "Afterall" → "After all" (Quality Assurance page)
- "to of our lifelong partnership" → "of our lifelong partnership" (Excellence /
  Association with Eskort — grammatical typo, not a factual claim)
- "enviromentally friendly" → "environmentally friendly" (Conservation page)
- "Minimium" → "Minimum" (Environmental Sustainability image alt/heading)
- Stray literal `';` text fragments appearing after related-card blocks on
  Accountable, Food Safety, Excellence, and Genetics pages — this is leftover
  broken template code, not content; removed entirely.
- Copy-pasted/wrong `alt` text (e.g. "GHB-Farms-About-Rake" and "Walt Farms Our
  Promise Excellance" appearing on unrelated images) — will write correct,
  descriptive alt text for every image as part of the rebuild (also an accessibility
  fix the current site needs).

**Factual/business conflicts flagged, NOT changed (left as-is per your direction):**
- Crate housing: About Us claims a "crate-free and group housing system," while
  both Core Pillars and Pig Welfare state "85% of pregnant sows are housed in
  groups... the remaining 15% are housed for 8 weeks in crates."
- Eskort relationship start date: "since 1955" / "since the 1950s" / "over 60 years"
  / "over 70 years" appear in different places (About Us, Excellence, Accountable,
  Food Safety) — these aren't all consistent with each other depending on which
  year the page was last edited.
- Pig Welfare's "Find out more" link points to `topigsnorsvin.co.za/contact-us/`,
  an odd destination for a welfare-standards link — looks like a copy-paste error
  from the Genetics page. Carried over as-is unless you say otherwise.

## 8. Contact page

Current page has no form — just phone, email, address, and 6 map/PDF links (one
per farm + head office). Rebuild adds:
- The existing 6-card farm/head-office grid, each linking to Google Maps (switching
  away from the PDF map links, which seem like a legacy workaround — flag if you'd
  rather keep linking to the PDFs).
- A new contact form (name, email, phone optional, message) submitting directly to
  Web3Forms. Needs a Web3Forms access key (free signup) — I'll need you to create
  an account and share the key, or create one myself if you'd rather I just account
  for a placeholder env var and you fill it in before deploy.

## 9. Open items — resolved 2026-11-12

1. **Brand assets**: Resolved. Logo SVGs, brand colors, and fonts pulled via FTP
   from the live cPanel account — see §6. Saved to `.ftp-pull/brand-assets/`.
2. **Images**: Resolved. FTP access confirmed working; page images will be pulled
   from `wp-content/uploads/...` (also readable directly over HTTPS at
   `ghbfarms.co.za/wp-content/uploads/...`) during implementation, per page.
3. **Heritage page**: Resolved. Confirmed — merge into `/about-us#heritage` per §4.
4. **Email address**: Resolved. Contact form submissions go to `hr@ghbfarms.com`
   (existing footer address kept).
5. **Web3Forms account**: Resolved. Site owner will create the Web3Forms account
   and provide the API key before deploy; implementation wires in a placeholder
   env var (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) in the meantime.
6. **Map links**: Resolved. Contact page switches to Google Maps links (confirmed
   live-site Google Maps URLs already present per farm — see §8); PDF map links
   dropped.

## 10. Testing

- Type-check (`tsc --noEmit`) and lint as the baseline correctness gate (no backend
  logic to unit-test; this is a content/presentation site).
- Manual pass through every route on mobile and desktop viewport sizes before launch.
- Static export build (`next build`) verified to produce working relative links
  when the `out/` directory is served from a sub-path or root on the cPanel host.
- Contact form tested end-to-end against the live Web3Forms endpoint before launch.

## 11. Decisions needed from you before implementation planning

- [x] URL structure: flat, matching current site exactly (confirmed).
- [x] Image/brand asset source: FTP access provided (confirmed).
- [x] Brand palette/fonts: confirmed from theme source, no mockup needed (§6).
- [x] Heritage page: merge into `/about-us#heritage` (confirmed).
- [x] Contact form recipient (`hr@ghbfarms.com`) and Web3Forms account ownership
      (site owner) confirmed.
- [x] Google Maps links (not PDF) confirmed for the Contact page.

All open items resolved — proceeding to implementation plan.
