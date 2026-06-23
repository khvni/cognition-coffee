/**
 * Menu catalog — structured like a coffee-shop ordering system.
 * Each section is a "menu category"; items are "menu options" with
 * ordering variations (like customizing a DoorDash catering order).
 */

export type OrderingOption = {
  label: string
  choices: string[]
}

export type MenuItem = {
  id: string
  name: string
  image: string
  subcaption: string
  description: string
  breakdown: string[]
  orderingOptions: OrderingOption[]
}

export type MenuSection = {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "ambassadors",
    title: "Ambassadors",
    subtitle: "Turn Devin's most active users into community leaders.",
    items: [
      {
        id: "roasters-guild",
        name: "The Roasters' Guild",
        image: "/menu/roasters-guild.jpg",
        subcaption: "A three-tier ambassador program that turns power users into community leaders",
        description:
          "A structured recruiting engine that identifies top Devin power users and converts them into community leaders. Three tiers — Contributor, Advocate, Champion — with escalating access, recognition, and product-feedback seats.",
        breakdown: [
          "Identify top power users via usage data, GitHub activity, and community engagement",
          "Open applications with clear criteria for each tier (builds shared, events hosted, content created)",
          "Run cohort-based onboarding with a 30-day activation sprint",
          "Quarterly tier reviews with promotions and recognition ceremonies",
          "Champions get a direct Slack channel with the product team",
        ],
        orderingOptions: [
          {
            label: "Recruitment Channels",
            choices: ["Discord community", "X / Twitter outreach", "GitHub contributor pipeline", "Campus ambassador referrals", "Devin usage leaderboard"],
          },
          {
            label: "Incentive Package",
            choices: ["Extended Devin Pro access", "Co-branded swag drops", "Conference travel stipends", "Product feedback seat", "Revenue share on referrals"],
          },
          {
            label: "Tier Structure",
            choices: ["3-tier (Contributor → Advocate → Champion)", "2-tier (Member → Lead)", "Points-based with unlockable perks"],
          },
        ],
      },
      {
        id: "first-brew",
        name: "First Brew",
        image: "/menu/first-brew.jpg",
        subcaption: "A 30-day onboarding that takes new ambassadors from interested to hosting their first event",
        description:
          "A structured 30-day program that takes new ambassadors from 'interested' to 'hosting their first event.' Includes async modules, live cohort calls, a welcome kit, and a clear first-event playbook.",
        breakdown: [
          "Week 1: Welcome kit ships + async orientation (product deep-dive, community norms)",
          "Week 2: Live cohort call with existing Champions + first content assignment",
          "Week 3: Shadow an existing ambassador event (virtual or IRL)",
          "Week 4: Host your first micro-event (coffee chat, study session, demo night)",
          "Graduation: badge, public shoutout, tier placement",
        ],
        orderingOptions: [
          {
            label: "Onboarding Format",
            choices: ["Fully async (self-paced modules)", "Cohort-based (bi-weekly live calls)", "Hybrid (async + 2 live sessions)"],
          },
          {
            label: "Welcome Kit Contents",
            choices: ["Otter plushie + stickers + pin", "T-shirt + notebook + pen", "Water bottle + coasters + keycaps", "Full premium box (all items)"],
          },
          {
            label: "First Event Type",
            choices: ["Coffee chat (3-5 people)", "Demo night (10-15 people)", "Study group (5-8 people)", "Online Twitter Space"],
          },
        ],
      },
      {
        id: "support-hub",
        name: "Support Hub",
        image: "/menu/support-hub.jpg",
        subcaption: "The support backbone \u2014 dedicated channels, swag, and a direct line to the product team",
        description:
          "The operational backbone that keeps ambassadors engaged long-term. Dedicated Slack channels, monthly swag drops, quarterly recognition, and a direct feedback pipeline to Cognition's product team.",
        breakdown: [
          "Private Slack workspace with channels per region and topic",
          "Monthly office hours with Cognition engineers (AMA format)",
          "Quarterly swag refresh — new exclusive items each season",
          "Annual Ambassador Summit (IRL, all-expenses-paid for Champions)",
          "Product feedback loop: weekly digest of ambassador insights → PM team",
        ],
        orderingOptions: [
          {
            label: "Support Channels",
            choices: ["Dedicated Slack workspace", "Discord server with role-gated channels", "Monthly 1:1 with community lead", "Async Loom check-ins"],
          },
          {
            label: "Recognition Program",
            choices: ["Public leaderboard + badges", "Quarterly spotlight blog posts", "Annual awards ceremony", "LinkedIn endorsements from Cognition team"],
          },
          {
            label: "Office Hours Format",
            choices: ["Monthly group AMA (30 min)", "Bi-weekly topic deep-dives (45 min)", "Quarterly fireside with founders", "On-demand async Q&A thread"],
          },
        ],
      },
    ],
  },
  {
    id: "dev-events",
    title: "Dev Events",
    subtitle: "Hackathons, meetups, and conference activations that put Devin in developers' hands.",
    items: [
      {
        id: "hack-with-devin",
        name: "Hack with Devin",
        image: "/menu/hack-with-devin.jpg",
        subcaption: "Sponsor and run hackathons where Devin is the secret weapon — from campus hacks to citywide buildathons",
        description:
          "Hackathons where every participant gets Devin Pro access and learns to orchestrate AI-native development. From intimate campus hacks to 500+ person citywide buildathons with industry judges and real prizes.",
        breakdown: [
          "Partner with campus orgs or tech communities for venue + audience",
          "Provision Devin Pro for all participants (time-boxed access)",
          "Run a 30-min 'Devin 101' workshop at kickoff so everyone starts strong",
          "Judging criteria: creativity, Devin usage depth, and shipping velocity",
          "Post-event: highlight reel content, winner interviews, usage metrics",
        ],
        orderingOptions: [
          {
            label: "Format",
            choices: ["12-hour sprint (campus)", "24-hour classic", "48-hour weekend buildathon", "Virtual async (1-week)"],
          },
          {
            label: "Prizes",
            choices: ["6 months Devin Max", "$5K cash grand prize", "MacBook Pro for winners", "Cognition internship fast-track", "Conference tickets + travel"],
          },
          {
            label: "Devin Credits Allocation",
            choices: ["1 month Devin Pro per participant", "$50 credits per team", "Unlimited during event window", "Tiered: more credits for advancing teams"],
          },
        ],
      },
      {
        id: "cafe-cognition",
        name: "Cafe Cognition",
        image: "/menu/cafe-cognition.jpg",
        subcaption: "Take over a local cafe for a day — coffee, Devin credits, and builder energy in an intimate setting",
        description:
          "The signature Cognition meetup format. Take over a local third-wave coffee shop, buy everyone's coffee, hand out Devin credits, and let builders build together. Intimate (15-30 people), repeatable, and community-driven.",
        breakdown: [
          "Scout and book a cafe with good wifi and 20-30 person capacity",
          "Open bar tab for coffee/pastries ($300-500 budget)",
          "Each attendee gets a Devin Pro trial card + sticker pack",
          "Optional: 10-min lightning talks from 2-3 community members",
          "Photo/video content for socials — authentic, not staged",
          "Post-event: thank-you thread + feedback survey + next event announcement",
        ],
        orderingOptions: [
          {
            label: "Venue Vibe",
            choices: ["Third-wave specialty cafe", "Co-working space lounge", "University campus cafe", "Rooftop bar (evening format)"],
          },
          {
            label: "Programming",
            choices: ["Open coworking (no talks)", "2-3 lightning talks (10 min each)", "Live coding demo + open hack", "Panel discussion + networking"],
          },
          {
            label: "Swag Items",
            choices: ["Sticker pack + pin", "Custom drip bag coffee + mug", "T-shirt + tote bag", "Full welcome kit (all items)"],
          },
        ],
      },
      {
        id: "conference-takeover",
        name: "Conference Takeover",
        image: "/menu/conference-takeover.jpg",
        subcaption: "Repeatable playbook for SF Tech Week, Figma Config, Web Summit Vancouver, AWS re:Invent, and beyond",
        description:
          "A battle-tested playbook for activating at major tech conferences. Whether it's a side event, a sponsored booth, or an after-party — this is the repeatable system for making Devin the talk of the conference.",
        breakdown: [
          "T-minus 8 weeks: confirm conference, book venue for side event, open RSVP",
          "T-minus 4 weeks: speaker outreach, content prep, swag production",
          "T-minus 2 weeks: social media campaign, influencer seeding, logistics lock",
          "Day-of: branded space, live demos, attendee Devin access, content capture",
          "Post-event: content publish (48hr), follow-up emails, pipeline handoff to sales",
        ],
        orderingOptions: [
          {
            label: "Activation Type",
            choices: ["Side event (own venue, 50-150 ppl)", "Sponsored booth on conference floor", "After-party / happy hour", "Workshop session (submitted to CFP)", "Guerrilla activation (pop-up outside venue)"],
          },
          {
            label: "Target Conferences",
            choices: ["SF Tech Week", "Figma Config", "Web Summit Vancouver", "AWS re:Invent", "AIE World's Fair", "GitHub Universe", "Google I/O"],
          },
          {
            label: "Budget Tier",
            choices: ["Lean ($5K — side event + swag)", "Standard ($15K — booth + event + content)", "Premium ($40K+ — title sponsor + full activation)"],
          },
        ],
      },
    ],
  },
  {
    id: "university",
    title: "University",
    subtitle: "Campus networks, workshop curricula, and CS department partnerships.",
    items: [
      {
        id: "campus-network",
        name: "Campus Network",
        image: "/menu/campus-network.jpg",
        subcaption: "Student ambassadors as campus point-of-contact, or a full Devin Developers Club as a registered student org",
        description:
          "Two models for campus presence: lightweight ambassador reps who are the 'Devin person' on campus, or a full registered student org (Devin Developers Club) with officers, budget, and a semester programming calendar.",
        breakdown: [
          "Model A (Ambassador): recruit 1-2 students per campus, lightweight commitment",
          "Model B (Club): register as student org, elect officers, run weekly meetings",
          "Both models: quarterly campus event (hackathon, workshop, or demo day)",
          "Pilot at 5-10 campuses, expand based on engagement metrics",
          "Cross-campus Slack for peer learning and resource sharing",
        ],
        orderingOptions: [
          {
            label: "Campus Model",
            choices: ["Ambassador rep (1-2 students, low overhead)", "Devin Developers Club (registered student org)", "Hybrid (ambassador starts, upgrades to club if traction)"],
          },
          {
            label: "Pilot Campuses",
            choices: ["UC Berkeley", "Stanford", "MIT", "Georgia Tech", "UT Austin", "University of Waterloo", "Carnegie Mellon"],
          },
          {
            label: "Student Incentives",
            choices: ["Free Devin Pro for semester", "Resume line + LinkedIn badge", "Internship pipeline access", "Conference travel grant", "Monthly stipend ($200-500)"],
          },
        ],
      },
      {
        id: "workshop-series",
        name: "Workshop Series",
        image: "/menu/workshop-series.jpg",
        subcaption: "Virtual events with Cognition engineers + IRL sessions led by student ambassadors teaching SE fundamentals with Devin",
        description:
          "A dual-track curriculum: virtual workshops hosted by Cognition engineers covering advanced Devin orchestration, plus an IRL track with a set curriculum that student ambassadors teach on campus — software engineering fundamentals where Devin is the teaching assistant.",
        breakdown: [
          "Virtual track: bi-weekly 60-min sessions with Cognition engineers (recorded)",
          "IRL track: semester-long curriculum (8-10 sessions) taught by ambassadors",
          "Curriculum covers: first agent workflow, multi-repo orchestration, testing with Devin, deployment automation",
          "All materials built with Devin (meta: using the tool to teach the tool)",
          "Completion certificates + portfolio projects for students",
        ],
        orderingOptions: [
          {
            label: "Format",
            choices: ["Virtual only (bi-weekly, 60 min)", "IRL only (weekly campus sessions)", "Hybrid (virtual lectures + IRL labs)"],
          },
          {
            label: "Curriculum Track",
            choices: ["Fundamentals (intro to AI-native dev)", "Intermediate (multi-repo, testing, CI/CD)", "Advanced (fleets, MCP, enterprise patterns)", "Full stack (all three tracks, one semester)"],
          },
          {
            label: "Teaching Resources",
            choices: ["Slide decks + speaker notes", "Interactive Devin playground exercises", "Video walkthroughs (pre-recorded)", "Live-coding templates + starter repos"],
          },
        ],
      },
      {
        id: "dept-partnerships",
        name: "Dept. Partnerships",
        image: "/menu/dept-partnerships.jpg",
        subcaption: "Formal partnerships with CS departments for curriculum integration and student org sponsorships for events and tools",
        description:
          "Two partnership tracks: CS departments (curriculum integration, guest lectures, research collaborations) and student organizations (event sponsorship, tool access, co-branded programming). Each track has different execution playbooks.",
        breakdown: [
          "CS Department track: pitch to department chair, offer guest lecture series + Devin licenses for coursework",
          "Student Org track: sponsor existing CS clubs with Devin access + event budgets",
          "Both: co-branded case studies showing student outcomes",
          "Research angle: offer Devin API access for HCI/SE research papers",
          "Long game: graduates enter workforce as Devin-native developers",
        ],
        orderingOptions: [
          {
            label: "Partner Type",
            choices: ["CS Department (curriculum integration)", "Student Organization (event + tool sponsorship)", "Research Lab (API access + collaboration)", "Career Services (job prep workshops)"],
          },
          {
            label: "Integration Level",
            choices: ["Light (guest lecture + trial access)", "Medium (semester-long tool integration in 1 course)", "Deep (co-designed curriculum module + research partnership)"],
          },
          {
            label: "Resource Allocation",
            choices: ["Devin Pro licenses (class-wide)", "Event budget ($1K-5K per semester)", "Dedicated Cognition engineer office hours", "Custom teaching materials + exercises"],
          },
        ],
      },
    ],
  },
  {
    id: "content",
    title: "Content",
    subtitle: "Tutorials, demo scripts, and workshop materials that help developers adopt Devin.",
    items: [
      {
        id: "tutorial-library",
        name: "Tutorial Library",
        image: "/menu/tutorial-library.jpg",
        subcaption: "Step-by-step guides from 'Hello Devin' to advanced multi-repo orchestration — video, written, and interactive",
        description:
          "A comprehensive library of tutorials spanning beginner to advanced. Each tutorial is available in multiple formats (video, written, interactive playground) and follows a consistent structure: context, walkthrough, exercises, next steps.",
        breakdown: [
          "Beginner: 'Hello Devin' → first PR, first automation, first playbook",
          "Intermediate: multi-repo projects, testing strategies, CI/CD integration",
          "Advanced: fleet orchestration, MCP servers, enterprise governance",
          "Each tutorial: 15-min video + written companion + playground exercise",
          "Monthly releases tied to product launches and feature drops",
        ],
        orderingOptions: [
          {
            label: "Format",
            choices: ["Video walkthrough (15-20 min)", "Written guide with code snippets", "Interactive playground (hands-on)", "All three (full multi-format)"],
          },
          {
            label: "Skill Level",
            choices: ["Beginner (never used Devin)", "Intermediate (regular user, want depth)", "Advanced (power user, enterprise patterns)", "Mixed (progressive difficulty)"],
          },
          {
            label: "Topic Areas",
            choices: ["First workflows + setup", "Testing + code review", "Multi-repo orchestration", "CI/CD + deployment", "MCP + integrations", "Enterprise governance"],
          },
        ],
      },
      {
        id: "demo-scripts",
        name: "Demo Scripts",
        image: "/menu/demo-scripts.jpg",
        subcaption: "Ready-to-run showcase scripts that make Devin shine in presentations, sales calls, and live events",
        description:
          "Pre-built demo scripts designed for different audiences and contexts. Each script includes a repo to fork, talking points, expected Devin behavior, and recovery plans for when things go sideways live.",
        breakdown: [
          "Developer demos: build a full-stack app from scratch in 10 minutes",
          "Executive demos: show ROI — before/after velocity metrics, cost analysis",
          "Student demos: 'Devin as study buddy' — debug, explain, refactor",
          "Each script: fork-ready repo + speaker notes + timing guide + FAQ",
          "Quarterly refresh as product capabilities evolve",
        ],
        orderingOptions: [
          {
            label: "Audience",
            choices: ["Developers (technical deep-dive)", "Executives (ROI + velocity)", "Students (learning + building)", "Mixed (conference keynote style)"],
          },
          {
            label: "Duration",
            choices: ["5-min lightning (elevator pitch)", "15-min standard (feature showcase)", "30-min deep-dive (full workflow)", "60-min workshop (hands-on)"],
          },
          {
            label: "Complexity",
            choices: ["Simple (single task, guaranteed success)", "Medium (multi-step, some audience interaction)", "Advanced (live coding, real repo, high risk/reward)"],
          },
        ],
      },
      {
        id: "workshop-kits",
        name: "Workshop Kits",
        image: "/menu/workshop-kits.jpg",
        subcaption: "Full session packs with slides, exercises, facilitator guides, and follow-up resources for any audience",
        description:
          "Complete workshop packages that anyone can pick up and run. Includes slide deck, facilitator script, participant handouts, exercises with solutions, and post-workshop follow-up templates. Built so ambassadors and partners can teach without Cognition staff present.",
        breakdown: [
          "Slide deck (Figma + Google Slides + PDF) with speaker notes",
          "Facilitator guide: minute-by-minute run-of-show + troubleshooting tips",
          "Participant handout: key concepts, exercise prompts, resource links",
          "3-5 hands-on exercises with solution repos and expected outputs",
          "Post-workshop: feedback survey template + follow-up email sequence",
        ],
        orderingOptions: [
          {
            label: "Audience Level",
            choices: ["Beginner (first-time users)", "Intermediate (regular users)", "Advanced (enterprise teams)", "Mixed (progressive exercises)"],
          },
          {
            label: "Session Duration",
            choices: ["45 min (lunch-and-learn)", "90 min (standard workshop)", "Half-day (3 hours, deep immersion)", "Full-day (6 hours, certification prep)"],
          },
          {
            label: "Delivery Mode",
            choices: ["In-person (facilitator-led)", "Virtual (screen-share + breakout rooms)", "Self-paced (async with video guides)", "Train-the-trainer (teach facilitators)"],
          },
        ],
      },
    ],
  },
  {
    id: "merch",
    title: "Merch",
    subtitle: "Creative merch and distribution plays that build community goodwill.",
    items: [
      {
        id: "sf-scavenger-hunt",
        name: "SF Scavenger Hunt",
        image: "/menu/sf-scavenger-hunt.jpg",
        subcaption: "Hide free Devin Max subscriptions in niche SF locations, post cryptic clues, and let the community run wild",
        description:
          "A city-wide scavenger hunt where we hide physical cards with Devin Max activation codes in iconic and hidden SF locations. Post a vague photo or short-form video of each location's surroundings, let people race to find them, and activate their subscription when they post about it.",
        breakdown: [
          "Source 10-20 unique locations across SF (cafes, parks, murals, bookstores)",
          "Design collectible physical cards with unique activation codes",
          "Drip-release clues: 1-2 per day via X/Twitter and Instagram Stories",
          "Finders post a photo with the card → we activate their subscription",
          "Document the whole thing: recap video, engagement metrics, community reactions",
          "Expandable to other cities as the format proves out",
        ],
        orderingOptions: [
          {
            label: "Subscription Duration",
            choices: ["3 months Devin Max", "6 months Devin Max", "1 year Devin Max", "Mix (varying durations for different drops)"],
          },
          {
            label: "Number of Drops",
            choices: ["10 cards (1 per day, 2 weeks)", "20 cards (2 per day, 10 days)", "50 cards (city-wide blitz, 1 week)", "Ongoing (5 per week for a month)"],
          },
          {
            label: "Clue Format",
            choices: ["Photo of surroundings (vague)", "15-sec video with ambient audio", "Cryptic riddle + neighborhood hint", "Geocache-style GPS coordinates"],
          },
        ],
      },
      {
        id: "otter-conservation",
        name: "Otter Conservation",
        image: "/menu/otter-conservation.jpg",
        subcaption: "Partner with an otter conservation nonprofit — build solutions publicly with Devin and document the impact",
        description:
          "Partner with an otter conservation nonprofit (e.g., Monterey Bay Aquarium, Sea Otter Foundation) and build real software solutions for them using Devin — completely free, fully documented. Great PR, authentic goodwill, and a showcase of Devin's capabilities on a real-world project.",
        breakdown: [
          "Identify and reach out to otter conservation nonprofits in Monterey, CA",
          "Scope 2-3 projects they actually need (data dashboards, volunteer management, donation flows)",
          "Build everything with Devin, documenting every session publicly",
          "Create a mini-documentary or blog series showing the build process",
          "Launch with press outreach: 'AI company builds free tools for otter conservation'",
          "Ongoing: maintain the tools, use as a case study in sales + marketing",
        ],
        orderingOptions: [
          {
            label: "Nonprofit Selection",
            choices: ["Monterey Bay Aquarium (sea otters)", "Sea Otter Foundation & Trust", "Friends of the Sea Otter", "Multiple orgs (one project each)"],
          },
          {
            label: "Project Scope",
            choices: ["Data dashboard (population tracking)", "Volunteer management platform", "Donation + fundraising site rebuild", "Educational content portal", "Full suite (2-3 projects)"],
          },
          {
            label: "Documentation Format",
            choices: ["Blog series (5-7 posts)", "Mini-documentary (10-15 min video)", "Live-stream build sessions", "Technical case study + press kit", "All of the above"],
          },
        ],
      },
      {
        id: "swag-lab",
        name: "Swag Lab",
        image: "/menu/swag-lab.jpg",
        subcaption: "Curated, high-quality merch that people actually want — from otter plushies to mechanical keycaps",
        description:
          "A rotating catalog of unique, high-quality merch that goes beyond the typical tech swag. Items people actually want to keep and use — designed with care, produced in limited runs, and distributed through events, ambassador milestones, and community achievements.",
        breakdown: [
          "Design partnerships with independent artists for limited-edition items",
          "Seasonal drops (4x/year) with new items each quarter",
          "Tiered distribution: common (events), rare (milestones), legendary (championships)",
          "Quality-first: items must pass the 'would I buy this?' test",
          "Sustainability: eco-friendly materials, minimal packaging, local production where possible",
        ],
        orderingOptions: [
          {
            label: "Item Type",
            choices: ["Otter plushie (collector series)", "Mechanical keycaps (artisan)", "Water bottles (insulated, branded)", "T-shirts (heavyweight, minimal)", "Sticker packs (die-cut, holographic)", "Enamel pins (limited edition)", "Coasters (cork, illustrated)", "Tote bags (canvas, screenprinted)", "Pens (machined aluminum)"],
          },
          {
            label: "Distribution Method",
            choices: ["Event giveaways", "Ambassador milestone rewards", "Community achievement unlocks", "Online store (limited drops)", "Scavenger hunt prizes", "Conference booth handouts"],
          },
          {
            label: "Production Run",
            choices: ["Limited (50-100 units)", "Standard (250-500 units)", "Large (1000+ units)", "Made-to-order (on-demand)"],
          },
        ],
      },
    ],
  },
]
