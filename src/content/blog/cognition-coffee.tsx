import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "How I built Cognition Coffee using Devin",
  description:
    "A walkthrough of the features, the merged PRs that built them, and the workflow I used to build a Gatsby OS-style site with Devin.",
  date: "2026-06-29",
  category: "Field Notes",
  order: 6,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Cognition Coffee is a concept, not a real coffee company. It is a strategy site for Cognition's Devin developer community, built as a PostHog-style mock operating system: a desktop with draggable windows, a UNIX-like terminal, and a normal arranged-pages site view you can toggle at runtime. I built it by talking to Devin. Most of the code, the design system, and the UI polish came out of parallel sessions that produced small, reviewable PRs.
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
      The best way to argue for a Devin community strategy is to build the thing with Devin. Open the site in OS mode, drag a window, run the terminal, browse the menu like a coffee-shop order, and the argument is already made. The stack is Gatsby 5 with React 18 and TypeScript. Every page and blog post is a plain <code>.tsx</code> component, registered in <code>src/content/blog/index.ts</code> and <code>src/content/pages/index.ts</code>, then routed through <code>gatsby-node.ts</code>. No MDX, no filesystem sourcing, no CMS. The live admin editor writes to JSON via Cloudflare Functions; the rendered site is a Gatsby build.
    </p>

    <h2>What the site does now</h2>

    <h3>OS mode and site mode</h3>
    <p>
      The default desktop view is a mock OS. The Devin otter is the wallpaper, overlaid with a subtle CRT effect. Seven app icons sit on the desktop: Home, Menu, Blog, Community, About, Terminal, and a hidden <code>scott.png</code> easter egg. Double-clicking an icon opens a draggable, resizable, focusable window; a taskbar shows open windows, a clock, and the OS/Site toggle.
    </p>
    <p>
      <a href="https://github.com/khvni/cognition-coffee/pull/21">PR #21</a> replatformed from Astro to Gatsby and added the window manager. <a href="https://github.com/khvni/cognition-coffee/pull/36">PR #36</a> replaced ad-hoc React state with a single XState v5 machine in <code>src/os/osMachine.ts</code>, so window lifecycle, z-order, minimize/maximize, and mode switching all live in one place. <a href="https://github.com/khvni/cognition-coffee/pull/23">PR #23</a> bypasses the OS on mobile; <a href="https://github.com/khvni/cognition-coffee/pull/24">PR #24</a> added the macOS-style traffic-light controls and minimize animation.
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
      <code>src/pages/index.tsx</code> renders a hero image, a short explanation, social links, and a list of the site sections. The list comes from the same <code>APPS</code> registry in <code>src/lib/apps.ts</code> that drives the OS icons, so the home page and the desktop never drift. <a href="https://github.com/khvni/cognition-coffee/pull/47">PR #47</a> applied the Beautiful UI polish; <a href="https://github.com/khvni/cognition-coffee/pull/62">PR #62</a> made the mobile logo larger and added the brand name to the nav.
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
      <code>src/content/pages/menu.tsx</code> is the site as a coffee-shop menu. A sticky category nav highlights the current section. Each item is a photo-dominant card; clicking opens a lightbox with a full description, a numbered "What's Included" breakdown, radio-group customization options, and a special-instructions textarea. A quick-add button drops items into a floating cart scoped to the OS window (<code>src/components/menu/Cart.tsx</code>).
    </p>
    <p>
      Menu data lives in <code>src/data/menu.ts</code> and <code>src/data/menu-sections/*.ts</code>; the runtime menu is fetched from <code>/api/menu</code> so the admin can edit it live. <a href="https://github.com/khvni/cognition-coffee/pull/43">PR #43</a> was the first catalog rewrite, <a href="https://github.com/khvni/cognition-coffee/pull/58">PR #58</a> the DoorDash-style overhaul. Quick-add, special instructions, and the admin menu editor followed in <code>0c7f9c9</code>.
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
      <code>src/content/pages/community.tsx</code> is a single-column editorial: a polaroid photo carousel of real community builders, animated counters for cities, events, and attendees, a wall of real tweets, the ambassador program, consolidated get-involved links, and a FAQ accordion. Data and photos live in <code>src/data/community.ts</code>, <code>src/components/community/PhotoCarousel.tsx</code>, <code>src/components/community/TweetWall.tsx</code>, and <code>src/components/community/FAQ.tsx</code>. <a href="https://github.com/khvni/cognition-coffee/pull/46">PR #46</a> overhauled the UI; <a href="https://github.com/khvni/cognition-coffee/pull/65">PR #65</a> fixed the map viewBox and replaced AI-generated images with Unsplash photos.
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
      <code>src/content/pages/about.tsx</code> is Ali's personal page: avatar, bio, social links, work history from <code>src/data/experience.ts</code>, and a projects list. Work entries render as panel cards with mono dates and concentric radii. The shape came from <a href="https://github.com/khvni/cognition-coffee/pull/10">PR #10</a>, the UI overhaul from <a href="https://github.com/khvni/cognition-coffee/pull/44">PR #44</a>. The About page had a rough patch: <code>270bc62</code> removed it and the <code>/about</code> route entirely, then <code>ce6f1ef</code> brought it back with an Experience editor and logo upload in the admin.
    </p>

    <h3>Terminal</h3>
    <p>
      <code>src/components/Terminal.tsx</code> is a fake UNIX shell rendered as an OS window. It has a virtual filesystem with the site pages, blog posts, and menu items as files, plus a <code>.devin</code> directory that mirrors the actual skills. Commands include <code>ls</code>, <code>cd</code>, <code>pwd</code>, <code>cat</code>, <code>open</code>, <code>help</code>, <code>clear</code>, arrow-key history, and tab completion; <code>open menu.tsx</code> literally opens the Menu page in a new OS window. <a href="https://github.com/khvni/cognition-coffee/pull/40">PR #40</a> built it; <a href="https://github.com/khvni/cognition-coffee/pull/57">PR #57</a> added first-visit autoboot and fixed the focus ring.
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
      Blog posts are <code>.tsx</code> components in <code>src/content/blog/</code>; the index is <code>src/pages/blog.tsx</code>, the template <code>src/templates/blog-post.tsx</code>, which falls back to the static component if a post has not been edited through the admin.
    </p>
    <p>
      The admin is a password-protected page at <code>/admin</code> with a TipTap editor (<code>src/components/editor/Editor.tsx</code>) and Cloudflare Functions in <code>functions/api/</code> that read and write JSON through the GitHub Contents API. It started with posts, about, and menu (<a href="https://github.com/khvni/cognition-coffee/pull/34">PR #34</a>); <a href="https://github.com/khvni/cognition-coffee/pull/39">PR #39</a> seeded the existing posts for live editing. <code>4a2a3c6</code> added two endpoints: <code>/api/experience</code> reads and writes <code>content/experience.json</code> so the admin can add, reorder, and edit work entries; <code>/api/upload-logo</code> accepts a logo (png/jpeg/svg/webp, 2 MB max) and writes it to <code>static/logos/</code> via the Contents API, returning the URL the About page uses. Each save commits to the repo and triggers a Cloudflare Pages rebuild. <a href="https://github.com/khvni/cognition-coffee/pull/67">PR #67</a> kept the admin background always white via a <code>data-cc-admin</code> flag; <code>fb3dd6b</code> added image paste/drop/upload in the editor.
    </p>

    <h3>Design system, tests, and 404</h3>
    <p>
      The look is restrained: warm canvas, near-black ink, Devin blue as the single accent. Tokens live in <code>tailwind.config.js</code> and <code>src/styles/global.css</code>; UI primitives in <code>src/components/ui/</code> and <code>src/lib/tokens.ts</code>. <a href="https://github.com/khvni/cognition-coffee/pull/25">PR #25</a> set the palette and Geist typography, <a href="https://github.com/khvni/cognition-coffee/pull/33">PR #33</a> added the component library, and <a href="https://github.com/khvni/cognition-coffee/pull/41">PR #41</a> and <a href="https://github.com/khvni/cognition-coffee/pull/42">PR #42</a> applied the <code>/make-interfaces-feel-better</code> polish.
    </p>
    <p>
      The OS shell has 30 Vitest + React Testing Library tests in <code>src/components/__tests__/</code>. <a href="https://github.com/khvni/cognition-coffee/pull/50">PR #50</a> added the infrastructure; <a href="https://github.com/khvni/cognition-coffee/pull/49">PR #49</a> bundled usability fixes with the broken-icon-click fix. A <code>404.tsx</code> page (<code>beb23aa</code>) redirects unknown paths home.
    </p>

    <h2>Feature map</h2>
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
            <td><a href="https://github.com/khvni/cognition-coffee/pull/21">#21</a>, <a href="https://github.com/khvni/cognition-coffee/pull/23">#23</a></td>
          </tr>
          <tr>
            <td>Home page</td>
            <td><code>src/pages/index.tsx</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/47">#47</a>, <a href="https://github.com/khvni/cognition-coffee/pull/62">#62</a></td>
          </tr>
          <tr>
            <td>Menu catalog, lightbox, cart</td>
            <td><code>src/content/pages/menu.tsx</code>, <code>src/components/menu/*</code>, <code>src/data/menu.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/43">#43</a>, <a href="https://github.com/khvni/cognition-coffee/pull/58">#58</a>, <code>0c7f9c9</code></td>
          </tr>
          <tr>
            <td>Community page</td>
            <td><code>src/content/pages/community.tsx</code>, <code>src/components/community/*</code>, <code>src/data/community.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/46">#46</a>, <a href="https://github.com/khvni/cognition-coffee/pull/65">#65</a></td>
          </tr>
          <tr>
            <td>About page and Experience editor</td>
            <td><code>src/content/pages/about.tsx</code>, <code>src/data/experience.ts</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/10">#10</a>, <a href="https://github.com/khvni/cognition-coffee/pull/44">#44</a>, <code>ce6f1ef</code></td>
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
            <td><a href="https://github.com/khvni/cognition-coffee/pull/34">#34</a>, <a href="https://github.com/khvni/cognition-coffee/pull/39">#39</a>, <code>4a2a3c6</code>, <a href="https://github.com/khvni/cognition-coffee/pull/67">#67</a></td>
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
            <td>404 redirect</td>
            <td><code>src/pages/404.tsx</code></td>
            <td><code>beb23aa</code></td>
          </tr>
          <tr>
            <td>Brand and scott.png easter egg</td>
            <td><code>src/lib/apps.ts</code>, <code>src/components/AppIcon.tsx</code>, <code>src/pages/scott.tsx</code>, <code>static/scott.png</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/31">#31</a>, <a href="https://github.com/khvni/cognition-coffee/pull/32">#32</a>, <code>1492933</code></td>
          </tr>
          <tr>
            <td>Cloudflare Pages deploy</td>
            <td><code>.github/workflows/*</code>, <code>package.json</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/17">#17</a>, <a href="https://github.com/khvni/cognition-coffee/pull/38">#38</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>How I used Devin</h2>
    <p>
      I ran Devin Desktop on my laptop to orchestrate local and cloud agents. Pick the model for the job, not the model for everything:
    </p>
    <ul>
      <li>
        <strong>SWE-1.6</strong>, Devin's small model, handled tiny edits and one-line fixes.
      </li>
      <li>
        <strong>GLM-5.2</strong> did most of the frontend. Free in Devin at the time, surprisingly good at JSX, Tailwind, and layout. I stopped reaching for bigger models on UI once I saw it handle the shell components.
      </li>
      <li>
        <strong>Kimi K2.6</strong> got the vision-heavy work, anything that started from a screenshot. "Make this look like the reference image" is a different task than "write this function," and Kimi read screenshots well.
      </li>
      <li>
        <strong>Opus 4.8, 1M context</strong> came out for the heaviest workloads that needed the whole codebase at once. Rare, but nothing else fit.
      </li>
    </ul>
    <p>
      For the bigger changes I used Devin Cloud with Devin Ultra and let one coordinator fan out to subagents: it broke the problem into independent chunks, spun up a child Devin per chunk in parallel, then combined the results. The UI overhaul wave is the cleanest example: PRs #41 through #47 each touched a different surface, built in parallel against the same design token file.
    </p>
    <p>
      A few habits mattered more than the model choice:
    </p>
    <ul>
      <li>
        <strong>Delegate from anywhere.</strong> I used the Devin integration with <a href="https://poke.com">Poke</a> to kick off work on the go, or <a href="https://wisprflow.com">Wispr Flow</a> to dictate. On BART, walking to Elaichi SF, getting ready for bed. Most of my direction happened away from a desk.
      </li>
      <li>
        <strong>Brief up front, then let it cook.</strong> Before letting an agent work, I told it to ask anything that would fill in ambiguities up front. Give it everything it needs so it can work without stopping every few minutes. A two-minute brief saves an hour of round-trips.
      </li>
      <li>
        <strong>Give Devin the right skills.</strong> A short list of references kept the output from looking generic: Brian Lovin's site (<a href="https://brianlovin.com">brianlovin.com</a>) for the blog reading layout, Matt Palmer's <a href="https://mattpalmer.io/beautiful-ui/">Beautiful UI Libraries</a>, the <a href="http://impeccable.style/">Impeccable</a> skillset, the <a href="https://github.com/dabit3/deslop">deslop</a> slop gate run before every PR, the <code>poteto-mode</code> skill from <a href="https://github.com/cursor/plugins/tree/main/pstack">pstack</a>, and shadcn UI primitives for the dialog and keyboard-shortcut helpers.
      </li>
      <li>
        <strong>Let Devin write its own subagent prompts.</strong> My hand-written prompts were too vague; the child Devins wandered. Once I let Devin Ultra write its own child prompts, scope and file boundaries got sharp.
      </li>
      <li>
        <strong>Run a slop gate before every PR.</strong> <code>deslop -b main</code> and <code>deslop score</code> caught AI tells: obvious comments, triple null-checks, debug logs, empty catch blocks. The gate kept the code from feeling vibe-coded.
      </li>
      <li>
        <strong>Make the build the final review.</strong> Every PR had to pass <code>npm run build</code> and <code>npx vitest run</code>. A broken build meant no merge. That caught class-name typos, missing imports, and type errors before they reached the live site.
      </li>
    </ul>

    <h2>What broke</h2>
    <ul>
      <li>
        <strong>The first OS desktop was unusable.</strong> Icons would not open on click. A pointer-capture bug redirected synthetic clicks away from the inner button. <a href="https://github.com/khvni/cognition-coffee/pull/49">PR #49</a> fixed it, but I shipped a broken desktop for a stretch before I dug in.
      </li>
      <li>
        <strong>Too many small branches.</strong> PRs #40 through #46 landed in a wave, and several had to be combined and re-merged after conflicts on shared files. The fan-out was right in theory; the merge queue became its own bottleneck. Next time I would batch related UI work into fewer branches or merge the design-system PR first.
      </li>
      <li>
        <strong>The About page rendered unstyled once.</strong> It used Tailwind classes that did not exist in the stylesheet. Build was green, page was not. Agents do not always verify a class name resolves.
      </li>
      <li>
        <strong>Cart UI leaked out of the OS window.</strong> The floating cart button and toast were positioned against the browser viewport, so they sat on top of the taskbar and outside the window. <code>968180b</code> scoped them to the OS window.
      </li>
    </ul>

    <h2>Deployment</h2>
    <p>
      Every push to <code>main</code> runs a GitHub Actions workflow that builds the site with Gatsby and deploys to Cloudflare Pages. <a href="https://github.com/khvni/cognition-coffee/pull/17">PR #17</a> added the conditional deploy step; <a href="https://github.com/khvni/cognition-coffee/pull/38">PR #38</a> added <code>wrangler</code> to devDependencies to resolve a peer-dependency conflict. The live site is at <a href="https://cognitioncoffee.co">cognitioncoffee.co</a>.
    </p>

    <ProsePullQuote>
      The best way to argue for a Devin community strategy is to build the thing with Devin.
    </ProsePullQuote>
  </>
)

export default Content
