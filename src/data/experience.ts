/**
 * ALI KHANI - bio, proof points, and experience.
 * Every claim here is verified. Do not inflate numbers.
 */

export const BIO = {
  name: "Ali Khani",
  location: "San Francisco Bay Area",
  hook: "We're brewing the community for the first AI software engineer.",
  oneLiner:
    "I'm a community builder. I scaled a national tech nonprofit from one Berkeley club " +
    "to 30+ chapters. I use Devin daily on the Max plan, and I built this site with " +
    "Devin to prove what a community for Devin could be.",
  thesis:
    "Devin gives engineers superpowers. I build the community that teaches the world how to use them.",
};

export type Social = { label: string; href: string };

export const SOCIALS: Social[] = [
  { label: "X", href: "https://x.com/alikhvni" },
  { label: "GitHub", href: "https://github.com/khvni" },
  { label: "LinkedIn", href: "https://linkedin.com/in/khni" },
];

export type WorkEntry = { mark: string; markClass: string; company: string; role: string; date: string };

export const WORK: WorkEntry[] = [
  { mark: "K", markClass: "bg-[#5f7f62]", company: "Keysight", role: "Growth Insights & AI", date: "Current" },
  { mark: "M", markClass: "bg-[#527899]", company: "MTC", role: "Founder", date: "2023-present" },
  { mark: "B", markClass: "bg-[#151515]", company: "Bloom AI", role: "Co-Founder & CEO", date: "2025" },
  { mark: "F", markClass: "bg-[#777]", company: "Five9", role: "Security SWE Intern", date: "2024" },
];

export type Project = { title: string; href: string; desc: string };

export const PROJECTS: Project[] = [
  { title: "Cognition Coffee", href: "https://cognitioncoffee.co", desc: "A collection of ideas for building Cognition's developer community" },
  { title: "Tinker", href: "https://tinker.so", desc: "Open-source Ramp Glass for GTM teams" },
  { title: "Monkeybot", href: "https://monkeybot-demo.pages.dev", desc: "Voice-driven computer-use agent for SaaS workflows" },
];


