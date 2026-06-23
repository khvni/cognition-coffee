import type { MenuSection } from "../menu"

export const contentSection: MenuSection = {
  id: "content",
  title: "Content",
  subtitle: "Tutorials, demo scripts, and workshop materials that help developers adopt Devin.",
  items: [
    {
      id: "tutorial-library",
      name: "Tutorial Library",
      image: "/menu/tutorial-library.jpg",
      subcaption: "Step-by-step guides from first PR to fleet workflows. Video, written, and interactive.",
      description:
        "Step-by-step guides that take developers from their first Devin PR to running fleet workflows. Each one ships in video, written, and interactive playground formats with the same shape: context, walkthrough, exercises, next steps.",
      breakdown: [
        "Beginner: first PR, first automation, first playbook",
        "Intermediate: multi-repo projects, testing, CI/CD",
        "Advanced: fleet workflows, MCP servers, governance",
        "Every tutorial: 15-min video + written guide + playground",
        "Monthly releases tied to product launches",
      ],
      orderingOptions: [
        {
          label: "Format Mix",
          multi: true,
          choices: [
            "15-20 min video walkthrough",
            "Written guide with code snippets",
            "Interactive playground",
            "Full multi-format bundle",
          ],
        },
        {
          label: "Skill Level",
          choices: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Mixed (progressive)",
          ],
        },
        {
          label: "Topic Mix",
          choices: [
            "First workflows + setup",
            "Testing + code review",
            "Multi-repo projects",
            "CI/CD + deployment",
            "MCP + integrations",
            "Enterprise governance",
          ],
        },
      ],
    },
    {
      id: "demo-scripts",
      name: "Demo Scripts",
      image: "/menu/demo-scripts.jpg",
      subcaption: "Ready-to-run scripts that make Devin shine in live demos and sales calls.",
      description:
        "Pre-built scripts for live demos across audiences and contexts. Each one ships with a fork-ready repo, speaker notes, expected Devin behavior, and a recovery plan for when things go sideways.",
      breakdown: [
        "Developer demo: full-stack app from scratch in 10 minutes",
        "Executive demo: before/after velocity and cost numbers",
        "Student demo: Devin as study buddy (debug, explain, refactor)",
        "Each script: fork-ready repo + speaker notes + timing + FAQ",
        "Quarterly refresh as the product evolves",
      ],
      orderingOptions: [
        {
          label: "Audience Lens",
          choices: [
            "Developers (technical deep-dive)",
            "Executives (ROI + velocity)",
            "Students (learning + building)",
            "Mixed (keynote style)",
          ],
        },
        {
          label: "Runtime",
          choices: [
            "5-min lightning",
            "15-min standard",
            "30-min deep-dive",
            "60-min hands-on",
          ],
        },
        {
          label: "Complexity",
          choices: [
            "Simple (single task, guaranteed success)",
            "Medium (multi-step, some interaction)",
            "Advanced (live coding, real repo)",
          ],
        },
      ],
    },
    {
      id: "workshop-kits",
      name: "Workshop Kits",
      image: "/menu/workshop-kits.jpg",
      subcaption: "Complete session packs anyone can pick up and run.",
      description:
        "Complete workshop packages anyone can pick up and run. Each kit comes with slides, a facilitator script, handouts, exercises with solutions, and follow-up templates. Built so ambassadors and partners can teach without Cognition staff in the room.",
      breakdown: [
        "Slide deck in Figma, Google Slides, and PDF with speaker notes",
        "Facilitator guide: minute-by-minute run-of-show + troubleshooting",
        "Participant handout: concepts, exercise prompts, resource links",
        "3-5 hands-on exercises with solution repos and expected outputs",
        "Post-workshop: feedback survey + follow-up email sequence",
      ],
      orderingOptions: [
        {
          label: "Audience Level",
          choices: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Mixed (progressive exercises)",
          ],
        },
        {
          label: "Session Duration",
          choices: [
            "45 min (lunch-and-learn)",
            "90 min (standard)",
            "Half-day (3 hours)",
            "Full-day (6 hours)",
          ],
        },
        {
          label: "Delivery Mode",
          multi: true,
          choices: [
            "In-person (facilitator-led)",
            "Virtual (screen-share + breakouts)",
            "Self-paced (async + video guides)",
            "Train-the-trainer",
          ],
        },
      ],
    },
  ],
}
