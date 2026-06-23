import type { MenuSection } from "../menu"

export const devEventsSection: MenuSection = {
  id: "dev-events",
  title: "Dev Events",
  subtitle: "Hackathons, meetups, and conference activations that put Devin in developers' hands.",
  items: [
    {
      id: "hack-with-devin",
      name: "Hack with Devin",
      image: "/menu/hack-with-devin.jpg",
      subcaption: "Devin Pro for every participant. Real builds, real prizes.",
      description:
        "Every participant gets Devin Pro and a 30-minute kickoff workshop to direct Devin on real builds. Judged on creativity, Devin usage depth, and shipping velocity. From 12-hour campus sprints to 500-person citywide buildathons.",
      breakdown: [
        "Partner with campus orgs or tech communities for venue and audience",
        "Provision time-boxed Devin Pro for all participants",
        "Run a 30-min Devin 101 workshop at kickoff",
        "Judge on creativity, Devin usage depth, and shipping velocity",
        "Ship a highlight reel, winner interviews, and usage metrics",
      ],
      orderingOptions: [
        {
          label: "Sprint Shape",
          choices: [
            "12-hour campus sprint",
            "24-hour classic",
            "48-hour weekend buildathon",
            "Virtual async (1 week)",
          ],
        },
        {
          label: "Winner's Bounty",
          multi: true,
          choices: [
            "6 months Devin Max",
            "$5K cash grand prize",
            "MacBook Pro for winners",
            "Cognition internship fast-track",
            "Conference tickets + travel",
          ],
        },
        {
          label: "Devin Fuel Plan",
          choices: [
            "1 month Devin Pro per participant",
            "$50 credits per team",
            "Unlimited during event window",
            "Tiered: more credits for advancing teams",
          ],
        },
      ],
    },
    {
      id: "cognition-coffee",
      name: "Cognition Coffee",
      image: "/menu/cafe-cognition.jpg",
      subcaption: "Take over a coffee shop. Pick up the tab. Hand out Devin credits.",
      description:
        "The signature Cognition Coffee meetup. Take over a third-wave coffee shop, pick up the tab, and hand out Devin credits while builders work side by side. 15 to 30 people, repeatable, community-run.",
      breakdown: [
        "Book a cafe with good wifi and 20-30 person capacity",
        "Open a $300-500 tab for coffee and pastries",
        "Hand each attendee a Devin Pro trial card and sticker pack",
        "Optional 10-min lightning talks from 2-3 community members",
        "Capture authentic photo and video for socials",
        "Close with a thank-you thread, survey, and next event date",
      ],
      orderingOptions: [
        {
          label: "Venue Vibe",
          choices: [
            "Third-wave specialty cafe",
            "Co-working rooftop lounge",
            "University campus cafe",
            "Rooftop bar (evening format)",
          ],
        },
        {
          label: "Format Energy",
          choices: [
            "Open coworking (no talks)",
            "Lightning talks + mingle",
            "Live demo + open hack",
            "Panel discussion + networking",
          ],
        },
        {
          label: "Swag Drop",
          multi: true,
          choices: [
            "Sticker pack + pin",
            "Custom drip bag coffee + mug",
            "T-shirt + tote bag",
            "Full welcome kit",
          ],
        },
      ],
    },
    {
      id: "conference-takeover",
      name: "Conference Takeover",
      image: "/menu/conference-takeover.jpg",
      subcaption: "A repeatable playbook for SF Tech Week, Figma Config, and beyond.",
      description:
        "A field-tested playbook for activating at major tech conferences. Pick your format, lock logistics eight weeks out, and make Devin the thing everyone talks about. From a lean side event to a title sponsorship.",
      breakdown: [
        "T-8 weeks: confirm conference, book side-event venue, open RSVP",
        "T-4 weeks: speaker outreach, content prep, swag production",
        "T-2 weeks: social campaign, influencer seeding, logistics lock",
        "Day-of: branded space, live demos, attendee Devin access, content capture",
        "Post-event: publish content in 48hr, follow-up emails, pipeline to sales",
      ],
      orderingOptions: [
        {
          label: "Activation Mix",
          multi: true,
          choices: [
            "Side event (own venue, 50-150 ppl)",
            "Sponsored booth on conference floor",
            "After-party / happy hour",
            "Workshop session (submitted to CFP)",
            "Guerrilla activation (pop-up outside venue)",
          ],
        },
        {
          label: "Target Circuit",
          choices: [
            "SF Tech Week",
            "Figma Config",
            "Web Summit Vancouver",
            "AWS re:Invent",
            "AIE World's Fair",
            "GitHub Universe",
            "Google I/O",
          ],
        },
        {
          label: "Budget Tier",
          choices: [
            "Lean ($5K: side event + swag)",
            "Standard ($15K: booth + event + content)",
            "Premium ($40K+: title sponsor + full activation)",
          ],
        },
      ],
    },
  ],
}
