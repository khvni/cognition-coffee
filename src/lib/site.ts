/**
 * Global site configuration: metadata + navigation.
 * Single source of truth for the nav so every page stays in sync.
 */

export const SITE = {
  name: "The Cognition Coffee Company",
  shortName: "Cognition Coffee Co.",
  domain: "cognitioncoffee.co",
  url: "https://cognitioncoffee.co",
  tagline: "Freshly brewed community for the first AI software engineer.",
  description:
    "A community strategy for the people who build with Devin, designed and built with Devin. " +
    "Curriculum, a global meetup network, and an ambassador program.",
  author: "Ali Khani",
  authorUrl: "https://alikhani.co",
  authorX: "https://x.com/alikhvni",
  authorGithub: "https://github.com/khvni",
  authorEmail: "byalikhani@gmail.com",
} as const;

/**
 * Primary navigation. "Resources" is a hover dropdown (Blog / Community / About),
 * exactly as specified. Keep labels coffee-flavored but legible.
 */
export type NavLink = { label: string; href: string; note?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const NAV: NavItem[] = [
  { label: "The Menu", href: "/#menu", note: "The 3-program community proposal" },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog", note: "Field notes on community + agents" },
      { label: "Community", href: "/community", note: "A redesigned Devin community home" },
      { label: "About", href: "/about", note: "Who is Ali Khani?" },
    ],
  },
];

export const CTA = { label: "Let's talk", href: "/about#contact", emoji: "\u2615" }; // ☕
