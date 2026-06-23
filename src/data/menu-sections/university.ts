import type { MenuSection } from "../menu"

export const universitySection: MenuSection = {
  id: "university",
  title: "University",
  subtitle: "Campus networks, workshop curricula, and CS department partnerships.",
  items: [
    {
      id: "campus-network",
      name: "Campus Network",
      image: "/menu/campus-network.jpg",
      subcaption: "Student ambassadors or a full Devin Developers Club on campus.",
      description:
        "Two ways to plant Devin on campus. Run a lightweight ambassador who becomes the Devin person in the CS lounge, or charter a registered Devin Developers Club with officers and a semester calendar. Pilot a handful of schools, then expand where engagement holds.",
      breakdown: [
        "Ambassador model: 1-2 reps per campus, low overhead",
        "Club model: registered student org with officers and weekly meetings",
        "Quarterly campus event: hackathon, workshop, or demo night",
        "Pilot 5-10 campuses, expand on engagement",
        "Cross-campus Slack for peer learning and resource sharing",
      ],
      orderingOptions: [
        {
          label: "Campus Model",
          choices: [
            "Ambassador rep (1-2 students, low overhead)",
            "Devin Developers Club (registered student org)",
            "Hybrid (ambassador starts, upgrades to club if traction)",
          ],
        },
        {
          label: "Pilot Campuses",
          multi: true,
          choices: [
            "UC Berkeley",
            "Stanford",
            "MIT",
            "Georgia Tech",
            "UT Austin",
            "University of Waterloo",
            "Carnegie Mellon",
          ],
        },
        {
          label: "Student Incentives",
          multi: true,
          choices: [
            "Free Devin Pro for semester",
            "Resume line + LinkedIn badge",
            "Internship pipeline access",
            "Conference travel grant",
            "Monthly stipend ($200-500)",
          ],
        },
      ],
    },
    {
      id: "workshop-series",
      name: "Workshop Series",
      image: "/menu/workshop-series.jpg",
      subcaption: "Virtual sessions with Cognition engineers, plus IRL labs taught by ambassadors.",
      description:
        "Two tracks that teach software engineering with Devin as the teaching assistant. Virtual sessions are hosted by Cognition engineers; IRL labs run on campus with a set curriculum ambassadors teach. Students leave with portfolio projects and a completion certificate.",
      breakdown: [
        "Virtual: bi-weekly 60-min sessions with Cognition engineers, recorded",
        "IRL: 8-10 session semester curriculum taught by ambassadors",
        "Topics: first agent workflow, multi-repo, testing, deployment",
        "Materials built with Devin (teaching the tool with the tool)",
        "Completion certificates and portfolio projects",
      ],
      orderingOptions: [
        {
          label: "Format",
          choices: [
            "Virtual only (bi-weekly, 60 min)",
            "IRL only (weekly campus sessions)",
            "Hybrid (virtual lectures + IRL labs)",
          ],
        },
        {
          label: "Curriculum Track",
          multi: true,
          choices: [
            "Fundamentals (intro to AI-native dev)",
            "Intermediate (multi-repo, testing, CI/CD)",
            "Advanced (fleets, MCP, enterprise patterns)",
            "Full stack (all three tracks, one semester)",
          ],
        },
        {
          label: "Teaching Resources",
          multi: true,
          choices: [
            "Slide decks + speaker notes",
            "Interactive Devin playground exercises",
            "Video walkthroughs (pre-recorded)",
            "Live-coding templates + starter repos",
          ],
        },
      ],
    },
    {
      id: "dept-partnerships",
      name: "Dept. Partnerships",
      image: "/menu/dept-partnerships.jpg",
      subcaption: "CS department and student org partnerships for curriculum and events.",
      description:
        "Two partnership tracks. CS departments get guest lectures, coursework licenses, and research collaborations. Student orgs get event sponsorship and tool access. The long game: graduates enter the workforce already Devin-native.",
      breakdown: [
        "CS dept track: guest lecture series plus Devin licenses for coursework",
        "Student org track: sponsor existing CS clubs with Devin access and event budget",
        "Co-branded case studies showing student outcomes",
        "Research angle: Devin API access for HCI and SE papers",
        "Long game: graduates ship as Devin-native developers",
      ],
      orderingOptions: [
        {
          label: "Partner Type",
          multi: true,
          choices: [
            "CS Department (curriculum integration)",
            "Student Organization (event + tool sponsorship)",
            "Research Lab (API access + collaboration)",
            "Career Services (job prep workshops)",
          ],
        },
        {
          label: "Integration Level",
          choices: [
            "Light (guest lecture + trial access)",
            "Medium (semester-long tool integration in 1 course)",
            "Deep (co-designed curriculum module + research partnership)",
          ],
        },
        {
          label: "Resource Allocation",
          multi: true,
          choices: [
            "Devin Pro licenses (class-wide)",
            "Event budget ($1K-5K per semester)",
            "Dedicated Cognition engineer office hours",
            "Custom teaching materials + exercises",
          ],
        },
      ],
    },
  ],
}
