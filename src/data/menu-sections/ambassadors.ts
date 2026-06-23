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
          label: "Advancement Path",
          choices: [
            "3-tier ladder (Contributor → Advocate → Champion)",
            "2-tier guild (Member → Lead)",
            "Points-based unlock system",
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
          label: "Onboarding Cadence",
          choices: [
            "Fully async (self-paced modules)",
            "Cohort-based (bi-weekly live calls)",
            "Hybrid (async + 2 live sessions)",
          ],
        },
        {
          label: "Welcome Kit",
          choices: [
            "Otter plushie + pin + sticker pack",
            "Heavyweight tee + notebook + pen",
            "Insulated bottle + keycap + tote",
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
        "Annual Ambassador Summit, expenses paid for Champions",
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
