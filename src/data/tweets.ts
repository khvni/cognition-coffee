export type Tweet = {
  text: string
  author: string
  handle: string
  url: string
  avatar: string
  date?: string
}

const avatarUrl = (handle: string) => `https://unavatar.io/x/${handle.replace(/^@/, "")}`

export const tweets: Tweet[] = [
  {
    text: "Devin is single most impressive demo I've seen in the past decade. Worth a few minutes of your day to watch and get a glimpse of the future, it is surreal and deeply exciting.",
    author: "Eric Glyman",
    handle: "@eglyman",
    url: "https://x.com/eglyman/status/1767556597348470813",
    avatar: avatarUrl("@eglyman"),
    date: "Mar 12, 2024",
  },
  {
    text: "This is the kind of unprompted testing that @DevinAI does that I absolutely love. I didn't prompt it or ask for it to produce this - it just did it autonomously.",
    author: "Ryan Carson",
    handle: "@ryancarson",
    url: "https://x.com/ryancarson/status/2069412201044082867",
    avatar: avatarUrl("@ryancarson"),
    date: "Jun 23, 2026",
  },
  {
    text: "Devin really pulls it all together. It's the most intuitive option out there and lets you build with the models available now. It's not just some IDE with AI slapped on top. It's a top level partner in your builds.",
    author: "JoePro",
    handle: "@JoePro",
    url: "https://x.com/JoePro/status/2068147370102079548",
    avatar: avatarUrl("@JoePro"),
    date: "Jun 20, 2026",
  },
  {
    text: "I encourage everyone to try Devin at least once. Best via Linear which is a very pleasant experience for cloud background agents. Works best with gpt-5.5 in devin for massively concurrent ticket work.",
    author: "max.berlin",
    handle: "@maxjendrall",
    url: "https://x.com/maxjendrall/status/2069166723421311054",
    avatar: avatarUrl("@maxjendrall"),
    date: "Jun 22, 2026",
  },
  {
    text: "Devin feels like it's built by a smaller team that cares about the craft of creating perfect user experiences.",
    author: "Robin Ebers",
    handle: "@robinebers",
    url: "https://x.com/robinebers/status/2068503708657471889",
    avatar: avatarUrl("@robinebers"),
    date: "Jun 21, 2026",
  },
  {
    text: "Tinkering among different models in Devin Desktop is so fun: Adaptive mode is super fast, GLM 5.2 is really solid for execution, and free. Really polished IDE.",
    author: "Albert Gao",
    handle: "@albertgao",
    url: "https://x.com/albertgao/status/2068358130036056300",
    avatar: avatarUrl("@albertgao"),
    date: "Jun 20, 2026",
  },
  {
    text: "If you have @DevinAI / @cognition sub, don't miss out on GLM 5.2 and Kimi K2.7. Both are currently free. Having a great time with it in Devin CLI right now.",
    author: "brandon galang",
    handle: "@brandon_galang",
    url: "https://x.com/brandon_galang/status/2069043231699141103",
    avatar: avatarUrl("@brandon_galang"),
    date: "Jun 22, 2026",
  },
  {
    text: "Also, @DevinAI is my friend now.",
    author: "Taneem Ullah Jan",
    handle: "@taneemishere",
    url: "https://x.com/taneemishere/status/2069006888424104175",
    avatar: avatarUrl("@taneemishere"),
    date: "Jun 22, 2026",
  },
]
