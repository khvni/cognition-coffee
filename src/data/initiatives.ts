/**
 * THE MENU — the three signature community programs.
 *
 * Each is framed as a coffee "roast" (the artisan-coffee half of the brand)
 * but carries concrete, executable DevRel substance (the AI-lab half).
 * Derived from the strategy in the Obsidian vault + Cursor playbook analysis.
 *
 * Cloud-Devin note: keep `slug` stable — pages and anchors depend on it.
 */

export type Initiative = {
  slug: string;
  index: string; // "01" — Cognition-style section number
  roast: string; // coffee-side name
  title: string; // plain-English program name
  tagline: string;
  problem: string; // the gap at Cognition today
  summary: string;
  pillars: { name: string; detail: string }[];
  proof: string; // why Ali specifically can run this
  metric?: { value: string; label: string };
  cursorParallel: string; // what Cursor does; how this differs/wins
};

export const INITIATIVES: Initiative[] = [
  {
    slug: "house-roast",
    index: "01",
    roast: "The House Roast",
    title: "Devin Mastery Curriculum & Certification",
    tagline: "Turn curious developers into certified Devin orchestrators.",
    problem:
      "Devin University exists, but there is no structured path or credential. " +
      "Cursor has Lee Robinson's content; nobody has formal certification yet.",
    summary:
      "A 3-track curriculum — Devin 101 → Advanced Workflows → Devin for Teams — " +
      "with hands-on labs, community-contributed playbooks, and earnable certification badges. " +
      "Heavy emphasis on the underserved non-coding use cases (research, data, docs).",
    pillars: [
      { name: "Devin 101", detail: "First agent workflow, the orchestrator mindset, PR review basics." },
      { name: "Advanced Workflows", detail: "Multi-repo, fleets of Devins, MCP, automations, Playbooks." },
      { name: "Devin for Teams", detail: "Rollout patterns, knowledge onboarding, enterprise governance." },
      { name: "Certification", detail: "Earnable, verifiable badges. Developers love credentials." },
    ],
    proof:
      "Ali TA'd Berkeley CS 61B (1,800 students, 90 staff) and ran MTC Uni weekly leadership lectures — " +
      "he has built teaching systems that scale.",
    metric: { value: "1,800", label: "students taught at Berkeley" },
    cursorParallel:
      "Cursor ships great educational videos but no formal certification. Greenfield for Cognition.",
  },
  {
    slug: "single-origin",
    index: "02",
    roast: "Single-Origin Series",
    title: "Cafe Cognition — Global Meetup Network",
    tagline: "A sustained local-chapter network, not just one-off pop-ups.",
    problem:
      "Cursor runs 700+ events across 200+ cities via Cafe Cursor. Cognition has Luma + a Discord, " +
      "but no repeatable local-chapter engine. This is the single biggest reach gap.",
    summary:
      "Cafe Cognition pop-ups + quarterly 'Devin Days' in major hubs (SF, NYC, Austin, London, Bangalore), " +
      "powered by a 'meetup-in-a-box' kit: decks, demos, swag templates, run-of-show, and a host leaderboard. " +
      "Centralized on Luma, the way Cursor centralizes theirs.",
    pillars: [
      { name: "Cafe Cognition", detail: "Take over a cafe for a day. Coffee, credits, and builders." },
      { name: "Devin Days", detail: "Quarterly flagship hack days in tech hubs." },
      { name: "Meetup-in-a-box", detail: "Everything a host needs to run a great event in one kit." },
      { name: "Host leaderboard", detail: "Recognition + perks that turn hosts into a flywheel." },
    ],
    proof:
      "Ali scaled MTC from one Berkeley club to 30+ university chapters and 4 city hubs in 18 months — " +
      "the exact chapter-network motion this needs.",
    metric: { value: "30+", label: "chapters scaled at MTC" },
    cursorParallel:
      "Cursor does events brilliantly but pop-up-first. A sustained chapter network compounds.",
  },
  {
    slug: "roasters-guild",
    index: "03",
    roast: "The Roasters' Guild",
    title: "Devin Ambassador Program",
    tagline: "Turn the top power users into an evangelist flywheel.",
    problem:
      "Cognition's ambassador 'program' is currently a Google Form. There is no tier system, " +
      "no portal, and no structured feedback-to-product loop.",
    summary:
      "A three-tier ambassador program — Contributor → Advocate → Champion — with a portal for " +
      "resources, tracking, and recognition. Ambassadors run Cafe Cognition events, create content, " +
      "and feed a weekly 'Devin Office Hours' loop straight back to the product team.",
    pillars: [
      { name: "Contributor", detail: "Entry tier: share builds, host first events, early access." },
      { name: "Advocate", detail: "Consistent organizers + creators. Co-branded workshops, swag." },
      { name: "Champion", detail: "Regional leaders. Product-feedback seat, flagship event budget." },
      { name: "Feedback loop", detail: "Weekly office hours → community playbooks → product team." },
    ],
    proof:
      "Ali is already a top-200 global Devin power user (Max plan) and has run online communities " +
      "of 2-3k members since high school — he is the program's first archetype.",
    metric: { value: "Top 200", label: "global Devin power user" },
    cursorParallel:
      "Cursor has 300+ ambassadors but a loose structure. Formal tiers create a clear progression.",
  },
];
