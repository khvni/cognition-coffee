import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "How I built Cognition Coffee using Devin",
  description:
    "The features, the PRs behind them, and how I used Devin to build a Gatsby OS-style site.",
  date: "2026-06-29",
  category: "Field Notes",
  order: 6,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Cognition Coffee is a concept for what Devin's community could be. I built it as a mock OS: a desktop of draggable windows that toggles into a normal arranged-pages site. It nods to PostHog.com's mock OS, to Devin's original pitch of cloud agents with their own VMs, and to the early-2000s internet cafes where the first developer communities formed.
    </p>
    <p>
      The stack is Gatsby 5, React 18, TypeScript. Every page and post is a plain <code>.tsx</code> component registered in <code>src/content/blog/index.ts</code> and <code>src/content/pages/index.ts</code>, routed through <code>gatsby-node.ts</code>. No MDX, no CMS, no filesystem sourcing. The admin writes JSON; the live site is a Gatsby build.
    </p>

    <ProseWaxFigure caption="The Cognition Coffee mark">
      <img
        src="/cognitioncoffee.png"
        alt="Cognition Coffee logo: the Devin otter holding a coffee mug"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <ProsePullQuote>
      The best way to argue for a Devin community strategy is to build the thing with Devin.
    </ProsePullQuote>

    <h2>The build</h2>

    <h3>OS mode and site mode</h3>
    <p>
      The default view is the OS. The Devin otter is the wallpaper under a faint CRT overlay; seven icons (Home, Menu, Blog, Community, About, Terminal, and a hidden <code>scott.png</code>) open draggable, resizable windows. A taskbar tracks them, with a clock and the OS/Site toggle.
    </p>
    <p>
      <a href="https://github.com/khvni/cognition-coffee/pull/21">PR #21</a> replatformed from Astro to Gatsby and added the window manager. <a href="https://github.com/khvni/cognition-coffee/pull/36">PR #36</a> moved window lifecycle, z-order, and mode switching into one XState v5 machine in <code>src/os/osMachine.ts</code>. <a href="https://github.com/khvni/cognition-coffee/pull/23">PR #23</a> skips the OS on mobile; <a href="https://github.com/khvni/cognition-coffee/pull/24">PR #24</a> added the macOS traffic-light controls.
    </p>
    <p>
      The first desktop was unusable. A pointer-capture bug ate icon clicks, so I shipped a broken desktop for a stretch before <a href="https://github.com/khvni/cognition-coffee/pull/49">PR #49</a> fixed it.
    </p>

    <ProseWaxFigure caption="The OS desktop: draggable windows, dock icons, and a UNIX-like terminal">
      <img
        src="/screenshots/desktop.jpg"
        alt="Screenshot of the OS desktop with the otter wallpaper, app icons, and a Terminal window open over the Welcome window"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Home page</h3>
    <p>
      <code>src/pages/index.tsx</code> is a hero, a short intro, and the list of sections, pulled from the same <code>APPS</code> registry (<code>src/lib/apps.ts</code>) that drives the desktop icons, so the home page and the OS never drift. <a href="https://github.com/khvni/cognition-coffee/pull/47">PR #47</a> polished it; <a href="https://github.com/khvni/cognition-coffee/pull/62">PR #62</a> fixed the mobile logo.
    </p>

    <ProseWaxFigure caption="The home page in site mode">
      <img
        src="/screenshots/homepage.jpg"
        alt="Screenshot of the Cognition Coffee home page in site mode"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>The Menu</h3>
    <p>
      The Menu is the site dressed as a coffee-shop order (<code>src/content/pages/menu.tsx</code>): a sticky category nav, photo-dominant cards, and a lightbox with a "What's Included" breakdown, customization options, and a special-instructions field. A quick-add button drops items into a cart scoped to the OS window. Data lives in <code>src/data/menu.ts</code> and is served from <code>/api/menu</code> so the admin can edit it live. <a href="https://github.com/khvni/cognition-coffee/pull/43">PR #43</a> built the catalog; <a href="https://github.com/khvni/cognition-coffee/pull/58">PR #58</a> gave it the DoorDash-style overhaul.
    </p>
    <p>
      The cart leaked out of the window once. The floating button and toast were positioned against the browser viewport, so they sat over the taskbar until <code>968180b</code> scoped them to the window.
    </p>

    <ProseWaxFigure caption="The Menu page in catalog mode">
      <img
        src="/screenshots/menu.jpg"
        alt="Screenshot of the Menu page showing category pills and photo cards"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Community</h3>
    <p>
      <code>src/content/pages/community.tsx</code> is a single-column editorial: a polaroid carousel of real community builders, animated counters for cities, events, and attendees, a wall of real tweets, the ambassador program, and an FAQ accordion. <a href="https://github.com/khvni/cognition-coffee/pull/46">PR #46</a> overhauled the UI; <a href="https://github.com/khvni/cognition-coffee/pull/65">PR #65</a> fixed the map and swapped AI-generated images for Unsplash photos.
    </p>

    <ProseWaxFigure caption="The Community page with the photo carousel">
      <img
        src="/screenshots/community.jpg"
        alt="Screenshot of the Community page showing the photo carousel and event counters"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>About</h3>
    <p>
      <code>src/content/pages/about.tsx</code> is Ali's page: bio, social links, and work history from <code>src/data/experience.ts</code> as panel cards with mono dates. <a href="https://github.com/khvni/cognition-coffee/pull/10">PR #10</a> set the shape, <a href="https://github.com/khvni/cognition-coffee/pull/44">PR #44</a> the UI. It had a rough patch: <code>270bc62</code> deleted the page and the <code>/about</code> route, then <code>ce6f1ef</code> restored it with an Experience editor in the admin.
    </p>
    <p>
      It rendered unstyled once, using Tailwind classes that weren't in the stylesheet. Build green, page broken. Agents don't always check that a class name resolves.
    </p>

    <h3>Terminal</h3>
    <p>
      <code>src/components/Terminal.tsx</code> is a fake UNIX shell with a virtual filesystem that mirrors the site: <code>ls</code>, <code>cd</code>, <code>cat</code>, <code>open</code>, tab completion, and arrow-key history. <code>open menu.tsx</code> opens the Menu in a new OS window. <a href="https://github.com/khvni/cognition-coffee/pull/40">PR #40</a> built it; <a href="https://github.com/khvni/cognition-coffee/pull/57">PR #57</a> added first-visit autoboot.
    </p>

    <ProseWaxFigure caption="The Terminal on first visit">
      <img
        src="/screenshots/terminal.jpg"
        alt="Screenshot of the Terminal window showing the ASCII banner and an ls listing"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Games</h3>
    <p>
      Three open-source games run as their own OS apps: Snake, Space Invaders, and Pong. Each is vendored as-is under <code>static/vendor/games/</code> and loaded in a same-origin iframe by <code>src/components/GamePage.tsx</code>, under a footer crediting the upstream repo. Because the frame shares the origin, it grabs keyboard focus on load and on click, so arrow and space keys reach the game instead of the window behind it. <a href="https://github.com/khvni/cognition-coffee/pull/68">PRs #68</a>–<a href="https://github.com/khvni/cognition-coffee/pull/70">#70</a> vendored the games; <a href="https://github.com/khvni/cognition-coffee/pull/71">#71</a> wired them in as apps; <a href="https://github.com/khvni/cognition-coffee/pull/72">#72</a> listed them in the terminal filesystem; and <a href="https://github.com/khvni/cognition-coffee/pull/73">#73</a> made them open windowed.
    </p>

    <ProseWaxFigure caption="Space Invaders running as an OS app">
      <img
        src="/screenshots/games.png"
        alt="Screenshot of the vendored Space Invaders game in play, with a grid of invaders and the player ship"
        width={720}
        className="h-auto w-full rounded-lg"
      />
    </ProseWaxFigure>

    <h3>Blog and admin</h3>
    <p>
      Blog posts are <code>.tsx</code> components in <code>src/content/blog/</code>. <code>src/templates/blog-post.tsx</code> renders the admin-edited JSON, falling back to the static component when a post hasn't been touched. The admin at <code>/admin</code> is a password-gated TipTap editor backed by Cloudflare Functions that read and write JSON through the GitHub Contents API: posts, menu, work history, and logo upload. Each save commits to the repo and triggers a Cloudflare rebuild. <a href="https://github.com/khvni/cognition-coffee/pull/34">PR #34</a> built it; <a href="https://github.com/khvni/cognition-coffee/pull/67">PR #67</a> forced the admin background white.
    </p>

    <h3>Design system, tests, 404</h3>
    <p>
      The palette is warm canvas, near-black ink, and Devin blue as the only accent, with Geist for type. Tokens live in <code>tailwind.config.js</code> and <code>src/styles/global.css</code>. <a href="https://github.com/khvni/cognition-coffee/pull/25">PR #25</a> set the palette; <a href="https://github.com/khvni/cognition-coffee/pull/33">PR #33</a>, <a href="https://github.com/khvni/cognition-coffee/pull/41">#41</a>, and <a href="https://github.com/khvni/cognition-coffee/pull/42">#42</a> built and polished the component library. The OS shell has 30 Vitest tests (<a href="https://github.com/khvni/cognition-coffee/pull/50">PR #50</a>); <code>404.tsx</code> redirects unknown paths home.
    </p>

    <h2>How I used Devin</h2>
    <p>
      I ran Devin Desktop to orchestrate local and cloud agents, and picked the model for each job.
    </p>
    <ul>
      <li>
        <strong>SWE-1.6</strong>, Devin's small model, took the one-line fixes.
      </li>
      <li>
        <strong>GLM-5.2</strong> did most of the frontend. Free in Devin at the time and unexpectedly good at JSX, Tailwind, and layout. I stopped reaching for bigger models on UI once I saw it handle the shell.
      </li>
      <li>
        <strong>Kimi K2.6</strong> got the vision work, anything that started from a screenshot. "Make this match the reference" is a different task than "write this function."
      </li>
      <li>
        <strong>Opus 4.8, 1M context</strong> came out for the rare job that needed the whole codebase at once.
      </li>
    </ul>
    <p>
      For big changes I let one Devin Ultra coordinator fan out to subagents working in parallel. The UI wave is the cleanest example: <a href="https://github.com/khvni/cognition-coffee/pull/41">PRs #41</a>–<a href="https://github.com/khvni/cognition-coffee/pull/47">#47</a> each took a different surface against the same token file. The cost is merge conflicts on shared files; next time I'd merge the design-system PR first.
    </p>
    <p>
      A few habits mattered more than the model choice.
    </p>
    <ul>
      <li>
        <strong>Delegate from anywhere.</strong> I kicked off work from BART and from bed using the Devin integration with <a href="https://poke.com">Poke</a> and dictation with <a href="https://wisprflow.com">Wispr Flow</a>. Most of my direction happened away from a desk.
      </li>
      <li>
        <strong>Brief up front, then let it cook.</strong> I told each agent to ask its questions before starting, so it could run without stopping every few minutes. A two-minute brief saves an hour of round-trips.
      </li>
      <li>
        <strong>Hand it the right references.</strong> Brian Lovin's <a href="https://brianlovin.com">site</a> for the reading layout, Matt Palmer's <a href="https://mattpalmer.io/beautiful-ui/">Beautiful UI Libraries</a>, the <a href="http://impeccable.style/">Impeccable</a> skillset, and shadcn primitives kept the output from looking generic.
      </li>
      <li>
        <strong>Let Devin write its own subagent prompts.</strong> Mine were too vague and the child Devins wandered; its own prompts drew sharp file boundaries.
      </li>
      <li>
        <strong>Gate every PR.</strong> <a href="https://github.com/dabit3/deslop">deslop</a> caught AI tells — obvious comments, triple null-checks, debug logs — and a green <code>npm run build</code> plus <code>vitest</code> caught class-name typos and missing imports before they reached the live site.
      </li>
    </ul>

    <h2>Deployment</h2>
    <p>
      Every push to <code>main</code> builds with Gatsby and deploys to Cloudflare Pages (<a href="https://github.com/khvni/cognition-coffee/pull/17">PR #17</a>). The live site is <a href="https://cognitioncoffee.co">cognitioncoffee.co</a>.
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
            <td>Games (Snake, Space Invaders, Pong)</td>
            <td><code>src/components/GamePage.tsx</code>, <code>src/pages/&#123;snake,space-invaders,pong&#125;.tsx</code>, <code>static/vendor/games/*</code></td>
            <td><a href="https://github.com/khvni/cognition-coffee/pull/68">#68</a>–<a href="https://github.com/khvni/cognition-coffee/pull/71">#71</a>, <a href="https://github.com/khvni/cognition-coffee/pull/73">#73</a></td>
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
  </>
)

export default Content
