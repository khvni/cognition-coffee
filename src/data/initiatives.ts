/**
 * THE MENU — the three signature community programs.
 *
 * Each is framed as a coffee "roast" (the artisan-coffee half of the brand)
 * but carries concrete, executable DevRel substance (the AI-lab half).
 *
 * Keep `slug` stable — pages and anchors depend on it.
 */

export type Phase = {
  name: string;
  timeline: string;
  deliverables: string[];
};

export type KPI = {
  value: string;
  label: string;
};

export type Initiative = {
  slug: string;
  index: string;
  roast: string;
  title: string;
  tagline: string;
  problem: string;
  summary: string;
  pillars: { name: string; detail: string }[];
  proof: string;
  metric?: { value: string; label: string };
  cursorParallel: string;
  phases?: Phase[];
  kpis?: KPI[];
  cursorDetail?: string;
  proofPoints?: string[];
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
    phases: [
      {
        name: "Foundation",
        timeline: "Months 1\u20132",
        deliverables: [
          "Audit Devin University content, identify gaps in non-coding use cases",
          "Design 3-track syllabus: 101 \u2192 Advanced \u2192 Teams",
          "Build first 5 hands-on labs with real Devin sessions as source material",
        ],
      },
      {
        name: "Launch",
        timeline: "Months 3\u20134",
        deliverables: [
          "Ship Devin 101 track with community beta cohort",
          "Open community-contributed Playbook submissions",
          "Launch certification badge system with verifiable credentials",
        ],
      },
      {
        name: "Scale",
        timeline: "Months 5\u20136",
        deliverables: [
          "Release Advanced Workflows and Devin for Teams tracks",
          "Partner with enterprise customers for Teams track case studies",
          "Publish leaderboard of certified orchestrators",
        ],
      },
    ],
    kpis: [
      { value: "500+", label: "certified Devin orchestrators in Year 1" },
      { value: "50+", label: "community-contributed Playbooks" },
      { value: "3", label: "certification tracks shipped" },
      { value: "<5%", label: "churn among certified users vs. baseline" },
    ],
    cursorDetail:
      "Cursor invests heavily in YouTube tutorials and Lee Robinson's educational content, " +
      "but neither Cursor nor any AI-coding tool offers a formal certification path. " +
      "Developers love credentials \u2014 AWS, Stripe, and Twilio all proved that. " +
      "Cognition can own this category by shipping first: a structured curriculum that " +
      "converts trial users into power users with a verifiable badge to show for it.",
    proofPoints: [
      "TA'd Berkeley CS 61B \u2014 1,800 students, 90 course staff, one of the largest CS courses in the country",
      "Ran weekly MTC Uni leadership lectures that trained chapter leads across 30+ campuses",
      "7M+ views on Quora as a teen \u2014 teaching complex concepts to broad audiences is a native skill",
      "Power user of Devin (Max plan, top-200 globally) \u2014 the curriculum would be built by someone who actually uses the product daily",
    ],
  },
  {
    slug: "single-origin",
    index: "02",
    roast: "Single-Origin Series",
    title: "Cafe Cognition \u2014 Global Meetup Network",
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
      "Ali scaled MTC from one Berkeley club to 30+ university chapters and 4 city hubs in 18 months \u2014 " +
      "the exact chapter-network motion this needs.",
    metric: { value: "30+", label: "chapters scaled at MTC" },
    cursorParallel:
      "Cursor does events brilliantly but pop-up-first. A sustained chapter network compounds.",
    phases: [
      {
        name: "Seed",
        timeline: "Months 1\u20132",
        deliverables: [
          "Design meetup-in-a-box kit: slide deck, demo script, swag templates, run-of-show",
          "Recruit 10 founding hosts from existing Devin power users and Discord community",
          "Launch pilot Cafe Cognition events in SF and NYC",
        ],
      },
      {
        name: "Grow",
        timeline: "Months 3\u20134",
        deliverables: [
          "Expand to 5 cities: add Austin, London, Bangalore",
          "Run first quarterly Devin Days flagship events",
          "Ship host leaderboard with recognition tiers and Devin credit perks",
        ],
      },
      {
        name: "Compound",
        timeline: "Months 5\u20136",
        deliverables: [
          "Hit 20+ active local chapters with self-sustaining host pipelines",
          "Centralize all events on Luma for discovery and analytics",
          "Publish community event playbook as open-source template",
        ],
      },
    ],
    kpis: [
      { value: "20+", label: "active local chapters by Month 6" },
      { value: "100+", label: "community-hosted events in Year 1" },
      { value: "50+", label: "cities with at least one Cafe Cognition event" },
      { value: "4", label: "quarterly Devin Days flagship events per year" },
    ],
    cursorDetail:
      "Cafe Cursor is the gold standard: 700+ events, 200+ cities, all centralized on Luma. " +
      "But their model is pop-up-first \u2014 events happen, then the community disperses. " +
      "A sustained chapter network (like what MTC built for Muslim tech professionals) compounds: " +
      "each chapter runs monthly, builds local identity, and feeds members into the next event. " +
      "Cognition can leapfrog Cursor's reach by building the infrastructure that keeps communities alive between events.",
    proofPoints: [
      "Founded MTC and scaled it from one Berkeley club to 30+ university chapters and 4 city hubs in 18 months",
      "Built the three-tier org model (Campus \u2192 City \u2192 National) that MTC still runs on today",
      "Created the meetup-in-a-box playbook that let non-technical chapter leads run professional events",
      "Co-founded Bloom \u2014 shipped a conference matchmaking product in 6 days, ran live for 550+ TechWadi attendees",
    ],
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
      "A three-tier ambassador program \u2014 Contributor \u2192 Advocate \u2192 Champion \u2014 with a portal for " +
      "resources, tracking, and recognition. Ambassadors run Cafe Cognition events, create content, " +
      "and feed a weekly 'Devin Office Hours' loop straight back to the product team.",
    pillars: [
      { name: "Contributor", detail: "Entry tier: share builds, host first events, early access." },
      { name: "Advocate", detail: "Consistent organizers + creators. Co-branded workshops, swag." },
      { name: "Champion", detail: "Regional leaders. Product-feedback seat, flagship event budget." },
      { name: "Feedback loop", detail: "Weekly office hours \u2192 community playbooks \u2192 product team." },
    ],
    proof:
      "Ali is already a top-200 global Devin power user (Max plan) and has run online communities " +
      "of 2-3k members since high school \u2014 he is the program's first archetype.",
    metric: { value: "Top 200", label: "global Devin power user" },
    cursorParallel:
      "Cursor has 300+ ambassadors but a loose structure. Formal tiers create a clear progression.",
    phases: [
      {
        name: "Design",
        timeline: "Months 1\u20132",
        deliverables: [
          "Define tier criteria: Contributor \u2192 Advocate \u2192 Champion with clear promotion thresholds",
          "Build ambassador portal for resources, event tracking, and content submission",
          "Recruit founding cohort of 25 ambassadors from top Devin power users",
        ],
      },
      {
        name: "Activate",
        timeline: "Months 3\u20134",
        deliverables: [
          "Launch weekly Devin Office Hours with product team participation",
          "Ship co-branded workshop templates and swag kit for Advocates",
          "Establish feedback-to-product pipeline: community insights \u2192 product team weekly",
        ],
      },
      {
        name: "Flywheel",
        timeline: "Months 5\u20136",
        deliverables: [
          "Scale to 100+ ambassadors across all three tiers",
          "Champions run regional Cafe Cognition events independently",
          "Publish monthly ambassador impact report to Cognition leadership",
        ],
      },
    ],
    kpis: [
      { value: "100+", label: "active ambassadors by Month 6" },
      { value: "25+", label: "community-created content pieces per month" },
      { value: "52", label: "Devin Office Hours sessions per year (weekly)" },
      { value: "3", label: "ambassador tiers with clear progression" },
    ],
    cursorDetail:
      "Cursor has 300+ ambassadors, but the program is loosely structured \u2014 there's no public tier system, " +
      "no portal, and limited feedback-to-product infrastructure. " +
      "Programs like GitHub Stars, AWS Heroes, and Twilio Champions prove that " +
      "formal tiers with clear progression (and real perks) create a self-sustaining flywheel. " +
      "Cognition can build the ambassador program Cursor hasn't \u2014 one that turns power users into regional leaders " +
      "who run events, create content, and feed insights directly back to the product team.",
    proofPoints: [
      "Top-200 global Devin power user (Max plan) \u2014 the program's first archetype and most credible recruiter",
      "Ran MTC's three-tier leadership model: Chapter Lead \u2192 Regional Coordinator \u2192 National Board",
      "Managed online communities of 2\u20133k members since high school \u2014 understands community dynamics at every scale",
      "Built Tinker, an open-source AI workspace, as a Devin power user \u2014 the kind of builder-content ambassadors would create",
    ],
  },
];
