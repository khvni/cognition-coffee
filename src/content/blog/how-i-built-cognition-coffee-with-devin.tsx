import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "How I built Cognition Coffee using Devin",
  description:
    "Models, workflows, and lessons from building a concept site mostly by talking to Devin.",
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
      I built it by talking to Devin. Most of the code, the design system, and the UI polish came out of parallel Devin sessions that produced small, reviewable PRs. This post is the part I usually leave out: which models I used, how I orchestrated local and cloud agents, and the habits that actually made it fast.
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

    <h2>Models and Devin Desktop</h2>
    <p>
      I ran Devin Desktop on my laptop to orchestrate both local and cloud agents from one place. The biggest lesson: pick the model for the job, not the model for everything.
    </p>
    <ul>
      <li>
        <strong>SWE-1.6</strong>, Devin's small model, handled small edits and quick fixes. Fast, cheap, and right-sized for a one-line change or a token rename.
      </li>
      <li>
        <strong>GLM-5.2</strong> did most of the frontend code. It is free in Devin right now, and it was surprisingly good at JSX, Tailwind, and layout work. I stopped reaching for the bigger models for UI tasks once I saw how it handled the shell components.
      </li>
      <li>
        <strong>Kimi K2.6</strong> got the vision-heavy work, anything that started from a screenshot. "Make this look like the reference image" is a different task than "write this function," and Kimi read the screenshots well.
      </li>
      <li>
        <strong>Opus 4.8 with the 1M context window</strong> came out for the heaviest workloads, the ones that needed the whole codebase in context at once. Rare, but when I needed it, nothing else fit.
      </li>
    </ul>
    <p>
      The practical takeaway: GLM-5.2 free for frontend, SWE-1.6 for trivia, Kimi for vision, Opus for the rare huge-context job. I spent almost nothing on the bulk of the build.
    </p>

    <h2>Agent fan-out with Devin Cloud</h2>
    <p>
      For the bigger changes I used Devin Cloud with Devin Ultra and let one Devin fan out to subagents. The pattern: one coordinator Devin breaks the problem into independent chunks, spins up a child Devin per chunk in parallel, then combines the results.
    </p>
    <p>
      This works for two reasons. First, agents are smartest when their context is small and their task is small and precise. Context windows are finite, and too much in view becomes a distraction. A child Devin with one focused job outperforms one Devin holding the whole plan. Second, agents are good at helping you split a large problem into independent, parallelizable pieces. You do not have to do the decomposition yourself.
    </p>
    <p>
      Every Devin is its own VM, so fan-out is also a way to move faster in wall-clock terms. The cleanest example I have seen is a React Native to Swift migration: Devin broke it into six pieces and spun up six Devins to work in parallel. The same shape applies to a UI overhaul, split the shell, the pages, the menu, the blog, and let them run at once.
    </p>
    <p>
      Use Devin Ultra for this and let Devin write its own prompts for the child Devins. It is way better at writing agent prompts than humans are. My hand-written prompts were too vague; Devin's were specific about scope, file boundaries, and what not to touch.
    </p>

    <h2>How I actually worked</h2>
    <p>
      A few habits mattered more than any single model choice.
    </p>
    <ul>
      <li>
        <strong>Do tons of things at once.</strong> I used the Devin integration with <a href="https://poke.com">Poke</a> to text Poke and kick off feature development on the go, or <a href="https://wisprflow.com">Wispr Flow</a> to dictate to it. On BART, walking to Elaichi SF on 3rd and Harrison, getting ready for bed. You can delegate from anywhere, and most of my direction happened away from a desk.
      </li>
      <li>
        <strong>Don't be a blocker.</strong> Before letting an agent work, I told it to ask any questions that would fill in ambiguities up front. Give it everything it needs, and then some, so it can cook without stopping to ask you every few minutes. A two-minute brief up front saves an hour of round-trips.
      </li>
      <li>
        <strong>Give Devin the right skills.</strong> I curated a short list of design references and skills so the output did not look generic:
        <ul>
          <li>Brian Lovin's site (<a href="https://brianlovin.com">brianlovin.com</a>). The briOS writing layout inspired the blog page.</li>
          <li>Matt Palmer's <a href="https://mattpalmer.io/beautiful-ui/">Beautiful UI Libraries</a> collection.</li>
          <li>The <a href="http://impeccable.style/">Impeccable</a> skillset for design-system and component work.</li>
          <li>The <a href="https://github.com/dabit3/deslop">deslop</a> skill, run before every PR as a slop gate.</li>
          <li>The <code>poteto-mode</code> skill from <a href="https://github.com/cursor/plugins/tree/main/pstack">pstack</a> for disciplined engineering style.</li>
          <li>shadcn UI components for the dialog and keyboard-shortcut primitives.</li>
        </ul>
      </li>
      <li>
        <strong>Let Devin test itself.</strong> Integration sanity tests are pretty much solved. The 30 Vitest tests on the OS shell caught real regressions, and I let the agent write and run them instead of hand-rolling coverage.
      </li>
    </ul>

    <h2>The build history</h2>
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

    <p>
      <a href="https://app.devin.ai/sessions/e7dfd17b2abd431ca911bc1b482ae4f2">PR #49</a> fixed the OS click bug and added 30 usability tests with Vitest and React Testing Library. <a href="https://app.devin.ai/sessions/1978167c3043482c924ab3e0ea51cca3">PR #57</a> bundled four smaller OS fixes: terminal focus ring, blog window navigation, terminal autoboot on first visit, and a cleaner hover state on the home page entries.
    </p>
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

    <h2>What didn't work</h2>
    <p>
      The honest part. Most of the build went smoothly, but a few things cost real time.
    </p>
    <ul>
      <li>
        <strong>The first OS desktop was unusable.</strong> Icons would not open on click. The root cause was a pointer-capture bug that redirected synthetic clicks away from the inner button. PR #49 fixed it, but I shipped a broken desktop view for a stretch before I dug in.
      </li>
      <li>
        <strong>Too many small branches caused merge conflicts.</strong> PRs #40 through #46 landed in a wave, and several had to be combined and re-merged after conflicts on shared files. The fan-out was correct in theory, but the merge queue became its own bottleneck. Next time I would batch related UI work into fewer branches.
      </li>
      <li>
        <strong>The About page rendered completely unstyled.</strong> An early version used CSS classes that did not exist in the stylesheet. It looked fine in the agent's sandbox and broke in production until someone noticed. The lesson: agents do not always verify that a class name actually resolves. A build check for unknown classes would have caught it.
      </li>
      <li>
        <strong>Hand-written subagent prompts were too vague.</strong> My first attempts at fan-out gave the child Devins loose briefs, and they wandered. Once I let Devin Ultra write its own child prompts, scope and file boundaries got sharp. I wasted a session or two learning this.
      </li>
    </ul>

    <h2>Deployment</h2>
    <p>
      Every push to <code>main</code> runs a GitHub Actions workflow that builds the site and deploys it to Cloudflare Pages. The live site is at <a href="https://cognitioncoffee.co">cognitioncoffee.co</a>.
    </p>

    <h2>What worked</h2>
    <ul>
      <li>
        <strong>Right model for the job.</strong> GLM-5.2 free for frontend, SWE-1.6 for trivia, Kimi for vision, Opus for the rare huge-context job. The bulk of the build cost almost nothing.
      </li>
      <li>
        <strong>Agent fan-out.</strong> One coordinator Devin, many child Devins, each with a small context and a precise task. Faster in wall-clock and higher quality per chunk.
      </li>
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
        <strong>Verified copy only.</strong> Every PR number, every commit, and every stat in this post comes from the actual history. No invented milestones.
      </li>
    </ul>

    <ProsePullQuote>
      The best way to argue for a Devin community strategy is to build the thing with Devin.
    </ProsePullQuote>

    <p>
      If you are building something similar, start with a single design system file, a registry for your content, and a model cheat sheet. Pick the cheapest model that can do the job, fan out the big stuff, and let Devin write its own subagent prompts.
    </p>
  </>
)

export default Content
