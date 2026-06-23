import type { MenuSection } from "../menu"

export const cultureSection: MenuSection = {
  id: "culture",
  title: "Culture",
  subtitle:
    "Community engagement that builds goodwill, FOMO, and authentic connection.",
  items: [
    {
      id: "sf-scavenger-hunt",
      name: "SF Scavenger Hunt",
      image: "/menu/sf-scavenger-hunt.jpg",
      subcaption:
        "Hide free Devin Max codes around SF. Post cryptic clues. Let the city run.",
      description:
        "We hide physical cards with Devin Max activation codes in spots across SF. Post a vague photo or short video of each location. First to find it posts a photo, we flip on their subscription. Pure chaos, pure engagement.",
      breakdown: [
        "Scout 10 to 20 spots: cafes, parks, murals, bookstores",
        "Design collectible cards with unique activation codes",
        "Drip 1 to 2 clues a day on X and Instagram Stories",
        "Finder posts a photo with the card, we activate their sub",
        "Recap video plus engagement metrics after the run",
        "Repeat in other cities once the format works",
      ],
      orderingOptions: [
        {
          label: "Prize Duration",
          choices: [
            "3 months Devin Max",
            "6 months Devin Max",
            "1 year Devin Max",
            "Mix (varying durations per drop)",
          ],
        },
        {
          label: "Drop Density",
          choices: [
            "10 cards (1 per day, 2 weeks)",
            "20 cards (2 per day, 10 days)",
            "50 cards (city-wide blitz, 1 week)",
            "Ongoing (5 per week for a month)",
          ],
        },
        {
          label: "Clue Style",
          multi: true,
          choices: [
            "Photo of surroundings (vague)",
            "15-sec video with ambient audio",
            "Cryptic riddle + neighborhood hint",
            "Geocache-style GPS coordinates",
          ],
        },
      ],
    },
    {
      id: "otter-conservation",
      name: "Otter Conservation",
      image: "/menu/otter-conservation.jpg",
      subcaption:
        "Build free software for otter nonprofits with Devin. Document everything.",
      description:
        "Partner with an otter conservation nonprofit and build real tools for them using Devin, free of charge. Scope what they actually need, build it in the open, and turn the whole thing into a content series. Goodwill plus a PR moment that fits the otter mascot.",
      breakdown: [
        "Reach out to otter nonprofits in Monterey and beyond",
        "Scope 2 to 3 projects they actually need",
        "Build with Devin, document every session publicly",
        "Mini-doc or blog series showing the build",
        "Press push: AI company ships free tools for otter conservation",
        "Maintain the tools, reuse as a sales case study",
      ],
      orderingOptions: [
        {
          label: "Nonprofit Partner",
          choices: [
            "Monterey Bay Aquarium (sea otters)",
            "Sea Otter Foundation & Trust",
            "Friends of the Sea Otter",
            "Multiple orgs (one project each)",
          ],
        },
        {
          label: "Project Scope",
          choices: [
            "Data dashboard (population tracking)",
            "Volunteer management platform",
            "Donation and fundraising site rebuild",
            "Educational content portal",
            "Full suite (2 to 3 projects)",
          ],
        },
        {
          label: "Story Format",
          multi: true,
          choices: [
            "Blog series (5 to 7 posts)",
            "Mini-documentary (10 to 15 min video)",
            "Live-stream build sessions",
            "Technical case study + press kit",
          ],
        },
      ],
    },
    {
      id: "swag-lab",
      name: "Swag Lab",
      image: "/menu/swag-lab.jpg",
      subcaption:
        "Merch people actually want. Limited runs, real quality, no junk.",
      description:
        "A rotating catalog of merch that clears the 'would I buy this?' bar. Designed with independent artists, produced in limited runs, and handed out through events, milestones, and community achievements. No landfill swag.",
      breakdown: [
        "Design partnerships with independent artists",
        "Seasonal drops, 4 per year, new items each quarter",
        "Tiered rarity: common at events, rare for milestones, legendary for champs",
        "Quality gate: every item must pass the 'would I buy this?' test",
        "Eco-friendly materials, minimal packaging, local production where possible",
      ],
      orderingOptions: [
        {
          label: "Item Lineup",
          multi: true,
          choices: [
            "Otter plushie (collector series)",
            "Mechanical keycaps (artisan)",
            "Water bottles (insulated, branded)",
            "T-shirts (heavyweight, minimal)",
            "Sticker packs (die-cut, holographic)",
            "Enamel pins (limited edition)",
            "Coasters (cork, illustrated)",
            "Tote bags (canvas, screenprinted)",
            "Pens (machined aluminum)",
          ],
        },
        {
          label: "Distribution Method",
          choices: [
            "Event giveaways",
            "Ambassador milestone rewards",
            "Community achievement unlocks",
            "Online store (limited drops)",
            "Scavenger hunt prizes",
            "Conference booth handouts",
          ],
        },
        {
          label: "Production Run",
          choices: [
            "Limited (50 to 100 units)",
            "Standard (250 to 500 units)",
            "Large (1000+ units)",
            "Made-to-order (on-demand)",
          ],
        },
      ],
    },
    {
      id: "cognition-coffee-co",
      name: "Cognition Coffee Co.",
      image: "/cognitioncoffee.png",
      subcaption:
        "We send coffee, brewing gear, and Devin credits to your meetup. You fuel the builders.",
      description:
        "Cognition sponsors coffee for community events. Send a care package of beans, brewing gear, and Devin credits to any meetup host who needs fuel for their builders. We cover the caffeine, you cover the energy.",
      breakdown: [
        "Coffee beans from a SF roaster",
        "Branded brewing kit",
        "Devin credit cards to hand out",
        "Sticker pack",
        "Photo checklist for socials",
      ],
      orderingOptions: [
        {
          label: "Coffee Origin",
          choices: [
            "SF Bay roaster",
            "Local roaster in your city",
            "Subscription (monthly restock)",
          ],
        },
        {
          label: "Kit Size",
          choices: [
            "Solo (5 cups)",
            "Meetup (15 to 20 cups)",
            "Hackathon (50+ cups)",
            "Conference (200+ cups)",
          ],
        },
        {
          label: "Add-ons",
          multi: true,
          choices: [
            "Branded mugs",
            "Otter plushie",
            "Sticker pack",
            "Devin credit cards",
            "Tasting notes card",
          ],
        },
      ],
    },
    {
      id: "team-profiles",
      name: "Team Profiles",
      image: "/menu/team-profiles.jpg",
      subcaption:
        "A series profiling the people behind Devin. Hobbies, quirks, side projects, pets.",
      description:
        "A content series that profiles the people behind Devin. Engineers, researchers, designers, their side projects, weird hobbies, and the things that make them human. Builds FOMO for working at Cognition and shows the company has a pulse.",
      breakdown: [
        "Monthly profile on the blog",
        "Behind-the-scenes video tour",
        "Day-in-the-life threads on X",
        "Office dog and pet spotlight",
        "What they are building with Devin",
      ],
      orderingOptions: [
        {
          label: "Format Mix",
          multi: true,
          choices: [
            "Long-form blog profile",
            "5-min video",
            "Twitter thread",
            "Instagram carousel",
            "LinkedIn post",
          ],
        },
        {
          label: "Cadence",
          choices: ["Weekly", "Bi-weekly", "Monthly", "Quarterly"],
        },
        {
          label: "Featured Roles",
          choices: [
            "Engineers",
            "Research scientists",
            "Product designers",
            "GTMs and ops",
            "Founders",
            "Interns",
          ],
        },
      ],
    },
  ],
}
