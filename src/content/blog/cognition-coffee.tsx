import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "How I built Cognition Coffee using Devin",
  description:
    "A walkthrough of the features, the merged PRs that built them, and the workflow I used to build a Gatsby OS-style site with Devin.",
  date: "2026-06-23",
  category: "Field Notes",
  order: 6,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Cognition Coffee is a concept, not a real coffee company. It is a strategy site for Cognition's Devin developer community, built as a PostHog-style mock operating system: a desktop with draggable windows, a UNIX-like terminal, and a normal arranged-pages site view you can toggle at runtime.
    </p>
    <p>
      I built it by talking to Devin. Most of the code, the design system, and the UI polish came out of parallel Devin sessions that produced small, reviewable PRs. This post is the field guide: what the site does, where each feature lives, which PRs actually built them, and the habits that made working with Devin fast instead of frustrating.
    </p>

    <ProseWaxFigure caption="The Cognition Coffee mark">
      <img
        src="/cognitioncoffee.png"
        alt="Cognition Coffee logo: a rounded cup mark on a warm tan field"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h2>The thesis</h2>
    <p>
      I wanted to prove that the best way to argue for a Devin community strategy is to build the thing with Devin. The site is a piece of collateral and a working demo at the same time. If visitors can open it in OS mode, drag a window, run the terminal, and browse the menu like a coffee-shop order, the argument is already made.
    </p>
    <p>
      The stack is Gatsby 5 with React 18 and TypeScript. Every page and blog post is a plain <code>.tsx</code> component. Content is registered in <code>src/content/blog/index.ts</code> and <code>src/content/pages/index.ts</code>, then routed through <code>gatsby-node.ts</code>. No MDX, no filesystem sourcing, no CMS for the static content. The live admin editor does write to a JSON file via Cloudflare Functions, but the rendered site is a Gatsby build.
    </p>

    <h2>What the site does now</h2>

    <h3>OS mode and site mode</h3>
    <p>
      The default desktop view is a mock OS. The Devin otter is the wallpaper, overlaid with a subtle CRT effect. Seven app icons sit on the desktop: Home, Menu, Blog, Community, About, Terminal, and a hidden-in-plain-sight <code>scott.png</code> easter egg. Double-clicking an icon opens a draggable, resizable, focusable window. A taskbar at the bottom shows open windows, a clock, and the OS/Site toggle.
    </p>
    <p>
      The foundation came in <a href="https://github.com/khvni/cognition-coffee/pull/21">PR #21</a>, which replatformed the site from Astro to Gatsby and added the OS window manager. <a href="https://github.com/khvni/cognition-coffee/pull/36">PR #36</a> replaced the ad-hoc React state with a single XState v5 machine in <code>src/os/osMachine.ts</code>, so window lifecycle, z-order, minimize/maximize, and mode switching all live in one place. <a href="https://github.com/khvni/cognition-coffee/pull/23">PR #23</a> bypasses the OS on mobile and shows the site view directly. <a href="https://github.com/khvni/cognition-coffee/pull/24">PR #24</a> added the macOS-style traffic-light window controls and the minimize animation.
    </p>

    <ProseWaxFigure caption="The OS desktop with draggable windows">
      <img
        src="/screenshots/desktop.png"
        alt="Screenshot of the OS desktop showing the otter wallpaper and several open windows"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Home page</h3>
    <p>
      <code>src/pages/index.tsx</code> renders a warm, minimal home page: a hero image of Devin's desktop, a short explanation, social links, and a list of the site sections. The list is generated from the same <code>APPS</code> registry in <code>src/lib/apps.ts</code> that drives the OS icons, so the home page and the desktop never drift. The Beautiful UI polish came in <a href="https://github.com/khvni/cognition-coffee/pull/47">PR #47</a>, and <a href="https://github.com/khvni/cognition-coffee/pull/62">PR #62</a> made the mobile logo larger and added the brand name in the nav.
    </p>

    <ProseWaxFigure caption="The home page in site mode">
      <img
        src="/screenshots/homepage.png"
        alt="Screenshot of the Cognition Coffee home page"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>The Menu</h3>
    <p>
      <code>src/content/pages/menu.tsx</code> is the site as a coffee-shop menu. A sticky category nav scrolls horizontally and highlights the current section. Each item is a photo-dominant card. Clicking a card opens a lightbox with a full description, a numbered "What's Included" breakdown, radio-group customization options, and a special-instructions textarea. The cards also have a quick-add button that drops items into a floating cart, scoped to the OS window in <code>src/components/menu/Cart.tsx</code>.
    </p>
    <p>
      The menu data lives in <code>src/data/menu.ts</code> and <code>src/data/menu-sections/*.ts</code>. The runtime menu is fetched from <code>/api/menu</code> (served by Cloudflare Functions) so the admin can edit it live. The first catalog rewrite was <a href="https://github.com/khvni/cognition-coffee/pull/43">PR #43</a>; the DoorDash-style overhaul was <a href="https://github.com/khvni/cognition-coffee/pull/58">PR #58</a>. Recent commits added quick-add, special instructions, and the admin menu editor.
    </p>

    <ProseWaxFigure caption="The Menu page in catalog mode">
      <img
        src="/screenshots/menu.png"
        alt="Screenshot of the Menu page showing category pills and photo cards"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Community</h3>
    <p>
      <code>src/content/pages/community.tsx</code> is now a single-column editorial narrative. It opens with a headline and CTA, runs a polaroid photo carousel of real community builders, shows animated counters for cities, events, and attendees, surfaces a wall of real tweets, explains the ambassador program, lists consolidated get-involved links, and closes with a FAQ accordion. The data and photos are in <code>src/data/community.ts</code>, <code>src/components/community/PhotoCarousel.tsx</code>, <code>src/components/community/TweetWall.tsx</code>, and <code>src/components/community/FAQ.tsx</code>.
    </p>
    <p>
      <a href="https://github.com/khvni/cognition-coffee/pull/46">PR #46</a> overhauled the UI, and <a href="https://github.com/khvni/cognition-coffee/pull/65">PR #65</a> fixed the map viewBox, replaced AI-generated images with Unsplash photos, and consolidated the get-involved links into the same entry-link pattern used on the home and about pages.
    </p>

    <ProseWaxFigure caption="The Community page with the photo carousel">
      <img
        src="/screenshots/community.png"
        alt="Screenshot of the Community page showing the polaroid photo carousel"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>About</h3>
    <p>
      <code>src/content/pages/about.tsx</code> is a clean personal page: Ali's avatar, a short bio, social links, work history from <code>src/data/experience.ts</code>, and a projects list. The work entries are rendered as panel cards with mono dates and concentric radii. The current shape came from <a href="https://github.com/khvni/cognition-coffee/pull/10">PR #10</a> and the UI overhaul from <a href="https://github.com/khvni/cognition-coffee/pull/44">PR #44</a>. Admin can edit the About copy via <code>/admin</code>.
    </p>

    <h3>Terminal</h3>
    <p>
      <code>src/components/Terminal.tsx</code> is a fake UNIX shell rendered as an OS window. It has a virtual filesystem with the site pages, blog posts, and menu items as files, plus a <code>.devin</code> directory that mirrors the actual skills. Commands include <code>ls</code>, <code>cd</code>, <code>pwd</code>, <code>cat</code>, <code>open</code>, <code>help</code>, <code>clear</code>, arrow-key history, and tab completion. <code>open menu.tsx</code> will literally open the Menu page in a new OS window. <a href="https://github.com/khvni/cognition-coffee/pull/40">PR #40</a> built the terminal, and <a href="https://github.com/khvni/cognition-coffee/pull/57">PR #57</a> added the first-visit autoboot and fixed the terminal focus ring.
    </p>

    <ProseWaxFigure caption="The Terminal window on first visit">
      <img
        src="/screenshots/terminal.png"
        alt="Screenshot of the Terminal window showing the ASCII banner and prompt"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Blog and admin</h3>
    <p>
      Blog posts are <code>.tsx</code> components in <code>src/content/blog/</code>. The blog index is <code>src/pages/blog.tsx</code>, and the post template is <code>src/templates/blog-post.tsx</code>. The post template falls back to the static component if the post has not been edited through the admin.
    </p>
    <p>
      The admin is a password-protected page at <code>/admin</code>. It uses a TipTap editor in <code>src/components/editor/Editor.tsx</code> and Cloudflare Functions in <code>functions/api/</code> to read and write <code>content/posts.json</code>, <code>content/about.json</code>, and <code>content/menu.json</code> through the GitHub Contents API. Each save commits to the repo and triggers a Cloudflare Pages rebuild. <a href="https://github.com/khvni/cognition-coffee/pull/34">PR #34</a> added the admin, and <a href="https://github.com/khvni/cognition-coffee/pull/39">PR #39</a> seeded the existing posts so they could be edited live. <a href="https://github.com/khvni/cognition-coffee/pull/45">PR #45</a> polished the blog listing and post template.
    </p>

    <h3>Design system and tests</h3>
    <p>
      The look is intentionally restrained: a warm canvas, near-black ink, and Devin blue as the single accent. The token layer is in <code>tailwind.config.js</code> and <code>src/styles/global.css</code>; shared UI primitives are in <code>src/components/ui/</code> and <code>src/lib/tokens.ts</code>. <a href="https://github.com/khvni/cognition-coffee/pull/25">PR #25</a> set the warm beige palette and Geist typography, <a href="https://github.com/khvni/cognition-coffee/pull/33">PR #33</a> added the component library, and <a href="https://github.com/khvni/cognition-coffee/pull/41">PR #41</a> and <a href="https://github.com/khvni/cognition-coffee/pull/42">PR #42</a> applied the <code>/make-interfaces-feel-better</code> polish across the shell and pages.
    </p>
    <p>
      The OS shell is covered by 30 Vitest + React Testing Library tests in <code>src/components/__tests__/</code> and <code>src/components/community/__tests__/</code>. <a href="https://github.com/khvni/cognition-coffee/pull/50">PR #50</a> added the infrastructure, and <a href="https://github.com/khvni/cognition-coffee/pull/49">PR #49</a> bundled the usability fixes with the broken-icon-click fix.
    </p>

    <h2>Feature map</h2>
    <p>
      Here is the same story in table form: feature, file path, and the PR or commit that landed it. The paths are all relative to the repo root.
    </p>
    <div className="prose-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Where it lives</th>
            <th>PR / commit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OS window manager and state machine</td>
            <td><code>src/os/osMachine.ts</code>, <code>src/context/App.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/21">#21</a>, <a href="https://github.com/khvni/cognition-coffee/pull/36">#36</a></td>
          </tr>
          <tr>
            <td>OS desktop and wallpaper</td>
            <td><code>src/components/Desktop.tsx</code>, <code>static/wallpapers/otter-desktop.jpg</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/26">#26</a>, <a href="https://github.com/khvni/cognition-coffee/pull/28">#28</a></td>
          </tr>
          <tr>
            <td>macOS-style window chrome</td>
            <td><code>src/components/AppWindow.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/24">#24</a>, <a href="https://github.com/khvni/cognition-coffee/pull/41">#41</a></td>
          </tr>
          <tr>
            <td>Draggable desktop icons</td>
            <td><code>src/components/Desktop.tsx</code>, <code>src/lib/apps.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/40">#40</a>, <a href="https://github.com/khvni/cognition-coffee/pull/49">#49</a></td>
          </tr>
          <tr>
            <td>OS/Site mode toggle</td>
            <td><code>src/components/ModeToggle.tsx</code>, <code>src/components/Wrapper.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/21">#21</a>, <a href="https://github.com/khvni/cognition-coffee/pull/23">#23</a>, <a href="https://github.com/khvni/cognition-coffee/pull/41">#41</a></td>
          </tr>
          <tr>
            <td>Home page</td>
            <td><code>src/pages/index.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/47">#47</a>, <a href="https://github.com/khvni/cognition-coffee/pull/62">#62</a></td>
          </tr>
          <tr>
            <td>Menu catalog and lightbox</td>
            <td><code>src/content/pages/menu.tsx</code>, <code>src/components/menu/*</code>, <code>src/data/menu.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/43">#43</a>, <a href="https://github.com/khvni/cognition-coffee/pull/58">#58</a>, <code>0c7f9c9</code></td>
          </tr>
          <tr>
            <td>Community page</td>
            <td><code>src/content/pages/community.tsx</code>, <code>src/components/community/*</code>, <code>src/data/community.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/46">#46</a>, <a href="https://github.com/khvni/cognition-coffee/pull/65">#65</a>, <code>bf5cac0</code></td>
          </tr>
          <tr>
            <td>About page</td>
            <td><code>src/content/pages/about.tsx</code>, <code>src/data/experience.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/10">#10</a>, <a href="https://github.com/khvni/cognition-coffee/pull/44">#44</a>, <code>1b5a941</code></td>
          </tr>
          <tr>
            <td>Terminal</td>
            <td><code>src/components/Terminal.tsx</code>, <code>src/pages/terminal.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/40">#40</a>, <a href="https://github.com/khvni/cognition-coffee/pull/57">#57</a></td>
          </tr>
          <tr>
            <td>Blog index and post template</td>
            <td><code>src/pages/blog.tsx</code>, <code>src/templates/blog-post.tsx</code>, <code>src/content/blog/*</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/12">#12</a>, <a href="https://github.com/khvni/cognition-coffee/pull/45">#45</a></td>
          </tr>
          <tr>
            <td>Admin editor and API</td>
            <td><code>src/pages/admin.tsx</code>, <code>src/components/editor/Editor.tsx</code>, <code>functions/api/*</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/34">#34</a>, <a href="https://github.com/khvni/cognition-coffee/pull/39">#39</a></td>
          </tr>
          <tr>
            <td>Design tokens and UI primitives</td>
            <td><code>src/styles/global.css</code>, <code>tailwind.config.js</code>, <code>src/lib/tokens.ts</code>, <code>src/components/ui/*</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/25">#25</a>, <a href="https://github.com/khvni/cognition-coffee/pull/33">#33</a>, <a href="https://github.com/khvni/cognition-coffee/pull/42">#42</a></td>
          </tr>
          <tr>
            <td>Tests</td>
            <td><code>vitest.config.ts</code>, <code>src/components/__tests__/*</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/50">#50</a>, <a href="https://github.com/khvni/cognition-coffee/pull/49">#49</a></td>
          </tr>
          <tr>
            <td>Brand and scott.png easter egg</td>
            <td><code>src/lib/apps.ts</code>, <code>src/components/AppIcon.tsx</code>, <code>src/pages/scott.tsx</code>, <code>static/scott.png</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/31">#31</a>, <a href="https://github.com/khvni/cognition-coffee/pull/32">#32</a></td>
          </tr>
          <tr>
            <td>Cloudflare Pages deploy</td>
            <td><code>.github/workflows/*</code>, <code>package.json</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/17">#17</a>, <a href="https://github.com/khvni/cognition-coffee/pull/38">#38</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>How I actually used Devin</h2>
    <p>
      I ran Devin Desktop on my laptop and used it to orchestrate both local and cloud agents. The biggest lesson was to pick the model for the job, not the model for everything.
    </p>
    <ul>
      <li>
        <strong>SWE-1.6</strong>, Devin's small model, handled tiny edits and quick fixes. Fast, cheap, and right-sized for a one-line change or a token rename.
      </li>
      <li>
        <strong>GLM-5.2</strong> did most of the frontend code. It was free in Devin at the time and was surprisingly good at JSX, Tailwind, and layout work. I stopped reaching for the bigger models for UI tasks once I saw how it handled the shell components.
      </li>
      <li>
        <strong>Kimi K2.6</strong> got the vision-heavy work, anything that started from a screenshot. "Make this look like the reference image" is a different task than "write this function," and Kimi read the screenshots well.
      </li>
      <li>
        <strong>Opus 4.8 with the 1M context window</strong> came out for the heaviest workloads, the ones that needed the whole codebase in context at once. Rare, but when I needed it, nothing else fit.
      </li>
    </ul>
    <p>
      For the bigger changes I used Devin Cloud with Devin Ultra and let one Devin fan out to subagents. The pattern: one coordinator Devin breaks the problem into independent chunks, spins up a child Devin per chunk in parallel, then combines the results. The cleanest example was the UI overhaul wave: PRs #41, #42, #43, #44, #45, #46, and #47 each touched a different surface, and they were built in parallel sessions against the same design token file.
    </p>
    <p>
      A few habits mattered more than any model choice:
    </p>
    <ul>
      <li>
        <strong>Do tons of things at once.</strong> I used the Devin integration with <a href="https://poke.com">Poke</a> to text Poke and kick off feature development on the go, or <a href="https://wisprflow.com">Wispr Flow</a> to dictate to it. On BART, walking to Elaichi SF, getting ready for bed. You can delegate from anywhere, and most of my direction happened away from a desk.
      </li>
      <li>
        <strong>Don't be a blocker.</strong> Before letting an agent work, I told it to ask any questions that would fill in ambiguities up front. Give it everything it needs, and then some, so it can cook without stopping to ask you every few minutes. A two-minute brief up front saves an hour of round-trips.
      </li>
      <li>
        <strong>Give Devin the right skills.</strong> I curated a short list of design references and skills so the output did not look generic:
        <ul>
          <li>Brian Lovin's site (<a href="https://brianlovin.com">brianlovin.com</a>) for the blog reading layout.</li>
          <li>Matt Palmer's <a href="https://mattpalmer.io/beautiful-ui/">Beautiful UI Libraries</a> collection.</li>
          <li>The <a href="http://impeccable.style/">Impeccable</a> skillset for design-system work.</li>
          <li>The <a href="https://github.com/dabit3/deslop">deslop</a> skill, run before every PR as a slop gate.</li>
          <li>The <code>poteto-mode</code> skill from <a href="https://github.com/cursor/plugins/tree/main/pstack">pstack</a> for disciplined engineering style.</li>
          <li>shadcn UI primitives for the dialog and keyboard-shortcut helpers.</li>
        </ul>
      </li>
      <li>
        <strong>Let Devin test itself.</strong> The 30 Vitest tests on the OS shell caught real regressions, and I let the agent write and run them instead of hand-rolling coverage.
      </li>
    </ul>

    <h2>Tips and tricks for building with Devin</h2>
    <ul>
      <li>
        <strong>Start with a design system file.</strong> A single source of truth for colors, type, radii, and shadows keeps every subagent from inventing its own palette. Our tokens are in <code>tailwind.config.js</code> and <code>src/styles/global.css</code>; every PR was told to use them.
      </li>
      <li>
        <strong>Use a registry for content.</strong> <code>src/content/blog/index.ts</code> and <code>src/content/pages/index.ts</code> let multiple agents add pages without touching routing code. The same pattern is why the OS desktop and the home page never drift.
      </li>
      <li>
        <strong>Fan out the big rewrites.</strong> The UI overhaul, the menu rebuild, and the community redesign were all split into parallel sessions. Each agent had a small context and a precise brief, so the quality per chunk was higher and the wall-clock time was shorter.
      </li>
      <li>
        <strong>Let Devin write its own subagent prompts.</strong> My hand-written subagent prompts were too vague. Devin Ultra's prompts were specific about scope, file boundaries, and what not to touch.
      </li>
      <li>
        <strong>Run a slop gate before every PR.</strong> <code>deslop -b main</code> and <code>deslop score</code> caught AI tells: obvious comments, triple null-checks, debug logs, empty catch blocks, and needless try/catch. The gate kept the code from feeling vibe-coded.
      </li>
      <li>
        <strong>Make the build the final review.</strong> Every PR had to pass <code>npm run build</code> and <code>npx vitest run</code>. If the build broke, the PR did not merge. This caught class-name typos, missing imports, and type errors before they reached the live site.
      </li>
      <li>
        <strong>Verify that classes actually exist.</strong> An early About page looked fine in the agent's sandbox because it used Tailwind classes that were not in the stylesheet. The build passed, but the page rendered unstyled. A visual smoke test or a PurgeCSS-style class check would have caught it.
      </li>
    </ul>

    <h2>What broke and what I learned</h2>
    <p>
      Most of the build went smoothly, but a few things cost real time.
    </p>
    <ul>
      <li>
        <strong>The first OS desktop was unusable.</strong> Icons would not open on click. The root cause was a pointer-capture bug that redirected synthetic clicks away from the inner button. <a href="https://github.com/khvni/cognition-coffee/pull/49">PR #49</a> fixed it, but I shipped a broken desktop view for a stretch before I dug in.
      </li>
      <li>
        <strong>Too many small branches caused merge conflicts.</strong> PRs #40 through #46 landed in a wave, and several had to be combined and re-merged after conflicts on shared files. The fan-out was correct in theory, but the merge queue became its own bottleneck. Next time I would batch related UI work into fewer branches or merge the shared design-system PR first.
      </li>
      <li>
        <strong>The About page rendered unstyled once.</strong> An early version used CSS classes that did not exist in the stylesheet. The lesson: agents do not always verify that a class name actually resolves. The build was green, but the visual result was not.
      </li>
      <li>
        <strong>Cart UI leaked out of the OS window.</strong> The floating cart button and toast were positioned against the browser viewport, so they appeared on top of the OS taskbar and outside the window. Commit <code>968180b</code> scoped them to the OS window instead.
      </li>
      <li>
        <strong>Hand-written subagent prompts were too vague.</strong> My first attempts at fan-out gave the child Devins loose briefs, and they wandered. Once I let Devin Ultra write its own child prompts, scope and file boundaries got sharp.
      </li>
    </ul>

    <h2>Deployment</h2>
    <p>
      Every push to <code>main</code> runs a GitHub Actions workflow that builds the site with Gatsby and deploys it to Cloudflare Pages. <a href="https://github.com/khvni/cognition-coffee/pull/17">PR #17</a> added the conditional deploy step, and <a href="https://github.com/khvni/cognition-coffee/pull/38">PR #38</a> added <code>wrangler</code> to devDependencies to resolve a peer-dependency conflict. The live site is at <a href="https://cognitioncoffee.co">cognitioncoffee.co</a>.
    </p>

    <ProsePullQuote>
      The best way to argue for a Devin community strategy is to build the thing with Devin.
    </ProsePullQuote>

    <p>
      If you are building something similar, start with a single design system file, a registry for your content, and a model cheat sheet. Pick the cheapest model that can do the job, fan out the big stuff, let Devin write its own subagent prompts, and never let a PR merge without a clean build and a slop score you can show your team.
    </p>
  </>
)

export default Content
