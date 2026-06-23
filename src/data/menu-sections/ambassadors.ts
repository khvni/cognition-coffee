import type { MenuSection } from "../menu"

export const ambassadorsSection: MenuSection = {
  id: "ambassadors",
  title: "Ambassadors",
  subtitle: "Turn Devin's most active users into community leaders.",
  items: [
    {
      id: "roasters-guild",
      name: "The Roasters' Guild",
      image: "/menu/roasters-guild.jpg",
      subcaption: "Three tiers. One pipeline from power user to community leader.",
      description:
        "Find the people already doing the work, then give them a title and a seat at the table. Three tiers, each with more access and more to lose. Promotions are earned, not handed out.",
      breakdown: [
        "Source from usage data, GitHub, and community activity",
        "Open applications with tier-specific criteria",
        "Cohort onboarding with a 30-day activation sprint",
        "Quarterly tier reviews and public promotions",
        "Champions get a direct line to the product team",
      ],
      orderingOptions: [
        {
          label: "Recruitment Channels",
          multi: true,
          choices: ["Discord community", "X / Twitter outreach", "GitHub contributor pipeline", "Campus ambassador referrals", "Devin usage leaderboard"],
        },
        {
          label: "Incentive Package",
          multi: true,
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
      subcaption: "30 days from 'interested' to 'hosted their first event.'",
      description:
        "New ambassadors don't know what to do first. This gives them a calendar. Four weeks of async modules, two live calls, a welcome kit on their doorstep, and one concrete event to run by day 30.",
      breakdown: [
        "Week 1: welcome kit ships, async product deep-dive",
        "Week 2: live cohort call with current Champions",
        "Week 3: shadow an existing ambassador event",
        "Week 4: host your first micro-event",
        "Graduation: badge, public shoutout, tier placement",
      ],
      orderingOptions: [
        {
          label: "Onboarding Format",
          choices: ["Fully async (self-paced modules)", "Cohort-based (bi-weekly live calls)", "Hybrid (async + 2 live sessions)"],
        },
        {
          label: "Welcome Kit Contents",
          multi: true,
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
      subcaption: "What keeps ambassadors around after the honeymoon.",
      description:
        "Onboarding gets them in. This keeps them in. A private space to talk, monthly time with the people building Devin, fresh swag each season, and a real pipeline for their feedback to reach the product team.",
      breakdown: [
        "Private Slack, channels split by region and topic",
        "Monthly office hours with Cognition engineers",
        "Quarterly swag refresh with new exclusive items",
        "Annual Ambassador Summit, expenses paid for Champions",
        "Weekly digest of ambassador insights routed to PMs",
      ],
      orderingOptions: [
        {
          label: "Support Channels",
          multi: true,
          choices: ["Dedicated Slack workspace", "Discord server with role-gated channels", "Monthly 1:1 with community lead", "Async Loom check-ins"],
        },
        {
          label: "Recognition Program",
          multi: true,
          choices: ["Public leaderboard + badges", "Quarterly spotlight blog posts", "Annual awards ceremony", "LinkedIn endorsements from Cognition team"],
        },
        {
          label: "Office Hours Format",
          choices: ["Monthly group AMA (30 min)", "Bi-weekly topic deep-dives (45 min)", "Quarterly fireside with founders", "On-demand async Q&A thread"],
        },
      ],
    },
  ],
}
