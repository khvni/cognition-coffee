/**
 * ALI KHANI — bio, proof points, and experience.
 * Sourced from the Obsidian vault dossier + the replitdotcv narrative.
 * Cloud-Devin note: every claim here is verified. Do not inflate numbers.
 */

export const BIO = {
  name: "Ali Khani",
  location: "San Francisco Bay Area",
  // The hero pattern that worked on replitdotcv, adapted for Cognition.
  hook: "Hey Cognition \u2014 heard you're hiring.",
  oneLiner:
    "I'm a community builder and AI-native GTM engineer. I scaled a national tech " +
    "nonprofit from one Berkeley club to 30+ chapters \u2014 and I'm a top-200 global Devin " +
    "power user. I built this site with Devin to show, not tell, what I'd build for your community.",
  // The metaphor (a Cognition/coffee remix of replitdotcv's "superpowers").
  thesis:
    "Devin gives engineers superpowers. I build the community that teaches the world how to use them.",
};

/** Headline proof points (every claim is a number — the replitdotcv playbook). */
export const PROOF_POINTS = [
  { value: "30+", label: "MTC chapters scaled in 18 months" },
  { value: "1,800", label: "Berkeley CS 61B students taught" },
  { value: "6M+", label: "views written on Quora as a teen" },
  { value: "Top 200", label: "global Devin power user (Max plan)" },
  { value: "6 days", label: "idea to live product at Bloom" },
];

/** The narrative arc: Build / Teach / Connect (reused + sharpened from replitdotcv). */
export const PILLARS = [
  {
    verb: "Build",
    title: "I ship with agents.",
    body:
      "Top-200 global Devin power user. I build OSS agent harnesses (Tinker) and ship " +
      "internal AI tooling at Keysight. This whole site was orchestrated with Devin.",
  },
  {
    verb: "Teach",
    title: "I make hard things shippable.",
    body:
      "TA'd Berkeley's CS 61B (1,800 students, 90 staff) and ran weekly MTC leadership " +
      "lectures. 6M+ Quora views as a teen. I turn complex tools into things people actually use.",
  },
  {
    verb: "Connect",
    title: "I build operating systems for communities.",
    body:
      "Founded MTC and scaled it to 30+ university chapters and 4 city hubs \u2014 a three-tier " +
      "model with a meetup-in-a-box playbook. I don't just join communities; I architect them.",
  },
];

/** Experience timeline. Logo paths relative to /public/logos/. */
export const EXPERIENCE = [
  {
    org: "Keysight Technologies",
    role: "Growth Insights / GTM Engineer",
    when: "Dec 2025 \u2013 present",
    logo: "/logos/keysight.svg",
    detail:
      "AI-native GTM engineer driving RapidCanvas partnerships and Clay-powered lead-gen " +
      "across 6+ business verticals. One of the main operators for internal AI tooling.",
  },
  {
    org: "Bloom",
    role: "Co-founder & CEO",
    when: "Feb \u2013 Apr 2025",
    logo: "/logos/bloom.svg",
    detail:
      "AI-powered conference matchmaking. Idea to live product in 6 days; first paying customer " +
      "(TechWadi) in 4. Ran live for 550+ attendees with a 85% match-accept rate.",
    note: "First customer: TechWadi",
  },
  {
    org: "Muslim Tech Collaborative (MTC)",
    role: "Founder & National Lead",
    when: "2023 \u2013 present",
    logo: "/logos/mtc.svg",
    detail:
      "Scaled from one Berkeley club to 30+ university chapters and 4 city hubs across a " +
      "three-tier org model. North America's largest Muslim tech ecosystem.",
  },
  {
    org: "UC Berkeley",
    role: "B.S. Computer Science \u00b7 CS 61B TA",
    when: "Grad. Dec 2024",
    logo: "/logos/berkeley.svg",
    detail:
      "Taught Data Structures to 1,800 students alongside 90 course staff \u2014 the scaling " +
      "lesson that became the MTC playbook. SCET Entrepreneurship & Technology certificate.",
  },
  {
    org: "Five9",
    role: "Product Security Intern",
    when: "2023",
    logo: "/logos/five9.svg",
    detail: "Product security on contact-center infrastructure used by CVS, Alaska Airlines, and more.",
  },
];

/** Why this role, why now. */
export const WHY_COGNITION = [
  "Cognition is early in community \u2014 that's the greenfield I do my best work in.",
  "Cursor is ahead on events; I can bring a sustained chapter network they don't have.",
  "I'm a power user first, community builder second \u2014 technical credibility plus reach.",
  "Permissionless apprenticeship: I'd rather build the strategy than just pitch it.",
];
