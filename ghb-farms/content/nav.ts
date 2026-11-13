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
      { label: "Overview", href: "/safe" },
      {
        label: "Sustainable",
        href: "/sustainable",
        children: [
          { label: "Environmental Sustainability", href: "/sustainable/enviromental-sustainability" },
          { label: "Precision Soil Analysis", href: "/sustainable/precision-soil-analysis" },
          { label: "Pig Welfare", href: "/sustainable/pig-welfare" },
          { label: "Biosecurity", href: "/sustainable/biosecurity" },
        ],
      },
      {
        label: "Accountable",
        href: "/accountable",
        children: [
          { label: "Quality Assurance", href: "/accountable/quality-assurance" },
          { label: "Food Safety & Hygiene Practices", href: "/accountable/food-safety-hygiene-practices" },
        ],
      },
      {
        label: "Farm to Fork",
        href: "/farm-to-fork",
        children: [
          { label: "Processing Plants, Distribution & Retail", href: "/farm-to-fork/processing-plants-distribution-retail" },
          { label: "Responsibility", href: "/farm-to-fork/responsibility" },
          { label: "Traceability", href: "/farm-to-fork/traceability" },
        ],
      },
      {
        label: "Excellence",
        href: "/excellence",
        children: [
          { label: "Association with Eskort", href: "/excellence/association-with-eskort" },
          { label: "Genetics", href: "/excellence/genetics" },
        ],
      },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Conservation", href: "/conservation" },
  { label: "Contact", href: "/contact" },
];
