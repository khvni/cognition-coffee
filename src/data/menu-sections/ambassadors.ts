import type { MenuSection } from "../menu"

export const ambassadorsSection: MenuSection = {
  id: "ambassadors",
  title: "Ambassadors",
  subtitle: "Turn Devin's most active users into community leaders.",
  items: [
    {
      id: "recruitment",
      name: "Recruitment",
      image: "/menu/recruitment.jpg",
      subcaption: "Find the people already doing the work, then give them a seat at the table.",
      description:
        "Find the people already hosting events, helping in Discord, and shipping with Devin. Give them a title, a kit, and our full backing. No tiers, no ladders. Everyone who's in gets the same access and the same support.",
      breakdown: [
        "Source from usage data, GitHub, and community activity",
        "Open applications, rolling intake",
        "Cohort onboarding with a 30-day activation sprint",
        "Public welcome announcement for each new ambassador",
        "Direct line to the product team for everyone",
      ],
      orderingOptions: [
        {
          label: "Recruitment Radar",
          multi: true,
          choices: [
            "GitHub star-contributor feed",
            "Discord power-user leaderboards",
            "Campus referral network",
            "Devin usage signal pipeline",
          ],
        },
        {
          label: "Recognition Style",
          choices: [
            "Public welcome post + badge",
            "Ambassador spotlight blog series",
            "Annual ambassador awards ceremony",
            "LinkedIn endorsement from Cognition team",
          ],
        },
        {
          label: "Perk Signature",
          choices: [
            "Founder AMA + product feedback seat",
            "Revenue share on referrals",
            "Conference travel + Devin Max credits",
          ],
        },
      ],
    },
    {
      id: "onboarding",
      name: "Onboarding",
      image: "/menu/onboarding.jpg",
      subcaption: "30 days from 'interested' to 'hosted their first event.'",
      description:
        "New ambassadors don't know what to do first. This gives them a calendar. Four weeks of async modules, two live calls, a welcome kit on their doorstep, and one concrete event to run by day 30.",
      breakdown: [
        "Week 1: welcome kit ships, async product deep-dive",
        "Week 2: live cohort call with current Champions",
        "Week 3: shadow an existing ambassador event",
        "Week 4: host your first micro-event",
        "Graduation: badge, public shoutout, full ambassador access",
      ],
      orderingOptions: [
        {
          label: "Onboarding Cadence",
          choices: [
            "Fully async (self-paced modules)",
            "Cohort-based (bi-weekly live calls)",
            "Hybrid (async + 2 live sessions)",
          ],
        },
        {
          label: "Welcome Kit",
          multi: true,
          choices: [
            "Otter plushie",
            "Stickers",
            "Pin",
            "Heavyweight tee",
            "Notebook",
            "Pen",
            "Insulated bottle",
            "Keycap",
            "Tote",
            "Full premium box",
          ],
        },
        {
          label: "First Event Shape",
          choices: [
            "Coffee chat (3-5 people)",
            "Demo night (10-15 people)",
            "Study group (5-8 people)",
            "Twitter Space / Discord stage",
          ],
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
        "Annual Ambassador Summit, expenses paid",
        "Weekly digest of ambassador insights routed to PMs",
      ],
      orderingOptions: [
        {
          label: "Ambassador HQ",
          multi: true,
          choices: [
            "Private Slack with Cognition engineers",
            "Monthly AMA with product team",
            "Quarterly strategy sync",
            "Async Loom office hours",
          ],
        },
        {
          label: "Recognition Rhythm",
          choices: [
            "Public leaderboard + badges",
            "Quarterly spotlight blog",
            "Annual awards ceremony",
            "LinkedIn endorsements from Cognition team",
          ],
        },
        {
          label: "Office Hours Format",
          choices: [
            "Monthly group AMA (30 min)",
            "Bi-weekly deep-dive (45 min)",
            "Quarterly fireside with founders",
            "On-demand async Q&A thread",
          ],
        },
      ],
    },
  ],
}
