import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "How I built Cognition Coffee using Devin",
  description:
    "A concise behind-the-scenes look at building a concept site for Cognition's developer community — mostly by talking to Devin.",
  date: "2026-06-22",
  category: "Field Notes",
  order: 6,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Cognition Coffee is a concept, not a real coffee company. It is a strategy site for Cognition's Devin developer community, built as a PostHog-style mock operating system: a desktop with draggable windows, a terminal, and a normal arranged-pages site view you can toggle at runtime.
    </p>
    <p>
      I built it by talking to Devin. Most of the code, the design system, and the UI polish came out of parallel Devin sessions that produced small, reviewable PRs. This is the story of how that worked.
    </p>

    <ProseWaxFigure caption="The Cognition Coffee mark">
      <img
        src="/cognitioncoffee.png"
        alt="Cognition Coffee logo: a rounded cup mark on a warm tan field"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h2>The starting idea</h2>
    <p>
      I wanted the site to feel like an operating system for the community strategy. White canvas, near-black ink, Devin blue as the only accent, and the Devin otter as the desktop wallpaper under a subtle CRT overlay. The user can switch between OS mode and site mode without reloading.
    </p>
    <p>
      The stack is Gatsby 5 with React 18 and TypeScript. Every page and blog post is a plain <code>.tsx</code> component. No MDX, no filesystem sourcing, no CMS.
    </p>

    <h2>How I built it</h2>
    <p>
      The work happened in short, scoped PRs reviewed and merged into <code>main</code>. Devin handled the implementation; I set the direction, reviewed diffs, and merged when the build was clean.
    </p>
    <p>
      <a href="https://app.devin.ai/sessions/3b665725bfda428380c2356ea0e90f2c">PR #40</a> got the OS mechanics in place: a UNIX-like terminal, draggable desktop icons, and the removal of URL query-state routing so window state lives purely in XState.
    </p>
    <p>
      Then came the UI overhaul wave: <a href="https://app.devin.ai/sessions/0fb54bacec67470cac68823210a78869">PR #41</a> polished the shell components; <a href="https://app.devin.ai/sessions/db3b2f6f47d14d0e93f420e786bcbd79">PR #42</a> applied the same treatment to content pages and templates; <a href="https://app.devin.ai/sessions/49b17f18ab734d4e9e78f1c5e7cd879f">PR #43</a> rebuilt the menu as a coffee-shop catalog with sections, cards, and a lightbox; <a href="https://app.devin.ai/sessions/6e80a4ffcf0b4bad93016105152bbbc4">PR #44</a> overhauled the About page; <a href="https://app.devin.ai/sessions/fd1cd94220e0462f97ceca8781a7604c">PR #45</a> reworked the Blog listing and post template; and <a href="https://app.devin.ai/sessions/9b52faf031c04c7bacc95425f65061ab">PR #46</a> did the Community page.
    </p>
    <p>
      That was a lot of surface area, but the shared design system kept it from falling apart. Each PR used the same tokens, the same motion helpers, and the same no-hardcoded-hex rule.
    </p>

    <img
      src="/wallpapers/otter-desktop.jpg"
      alt="The Devin otter as the OS desktop wallpaper"
      width={720}
      className="h-auto w-full rounded-lg"
    />

    <h2>Fixing what broke</h2>
    <p>
      The OS view was unusable at first: desktop icons would not open on click. <a href="https://app.devin.ai/sessions/e7dfd17b2abd431ca911bc1b482ae4f2">PR #49</a> fixed the root cause, a pointer-capture bug that redirected synthetic clicks away from the inner button, and added 30 usability tests with Vitest and React Testing Library.
    </p>
    <p>
      <a href="https://app.devin.ai/sessions/1978167c3043482c924ab3e0ea51cca3">PR #57</a> bundled four smaller OS fixes: terminal focus ring, blog window navigation, terminal autoboot on first visit, and a cleaner hover state on the home page entries.
    </p>

    <h2>The menu rebuild</h2>
    <p>
      The latest big change was <a href="https://app.devin.ai/sessions/44bcd8ed5a2c45729605a01197c7aadd">PR #58</a>, which renamed Programs to Menu and rebuilt the page as a DoorDash-style ordering experience: sticky category pills, photo-dominant cards, a constrained lightbox with radio-group customizations, and a responsive grid.
    </p>

    <ProseWaxFigure caption="The Menu catalog">
      <img
        src="/menu/first-brew.jpg"
        alt="First Brew menu item: a generated illustration for the Devin community starter kit"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <p>
      Since then I have kept iterating directly on main: Linear-style single-letter keyboard shortcuts, accessibility improvements, drag clamping, a rebuilt About page matching my personal site, a Blog page rewritten to match my writing layout, and copy cleanup across the site.
    </p>

    <h2>Deployment</h2>
    <p>
      Every push to <code>main</code> runs a GitHub Actions workflow that builds the site and deploys it to Cloudflare Pages. The live site is at <a href="https://cognitioncoffee.co">cognitioncoffee.co</a>.
    </p>

    <h2>What worked</h2>
    <ul>
      <li>
        <strong>Parallel Devin sessions.</strong> With clear registries, a shared design system, and scoped tasks, multiple sessions could touch the same codebase without colliding.
      </li>
      <li>
        <strong>Small PRs.</strong> Each change was reviewable in a few minutes. When something broke, the rollback target was obvious.
      </li>
      <li>
        <strong>Tests before polish.</strong> PR #49's 30 tests caught regressions in the OS shell before they reached the live site.
      </li>
      <li>
        <strong>The medium is the message.</strong> Building a site about Devin community with Devin made the pitch feel less theoretical.
      </li>
      <li>
        <strong>Verified copy only.</strong> Every PR number, every commit, and every stat in this post comes from the actual history. No invented milestones.
      </li>
    </ul>

    <ProsePullQuote>
      The best way to argue for a Devin community strategy is to build the thing with Devin.
    </ProsePullQuote>

    <p>
      If you are building something similar, start with a single design system file and a registry for your content. Everything else is easier once those are in place.
    </p>
  </>
)

export default Content
