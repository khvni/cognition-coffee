<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog across both the client-side Gatsby/React frontend and the server-side Cloudflare Pages Functions. The existing `posthog-js` client was extended with meaningful event captures, while `posthog-node` was added as a new dependency for server-side tracking in Cloudflare Functions.

**Client-side additions** (`posthog-js` via the existing `src/lib/posthog.ts` wrapper):
- `captureException` export added to `src/lib/posthog.ts` for manual error reporting
- `ModeToggle` now tracks when users switch between the OS desktop and plain site experiences
- `MenuLightbox` fires `menu_item_viewed` when a lightbox opens and `menu_item_added_to_cart` on "Add to Order"
- `Cart` fires `cart_order_sent` with item count when an order is submitted
- `AppProvider` (`context/App.tsx`) fires `app_window_opened` with the app title and path when a window is launched
- `ErrorBoundary` forwards caught React errors to PostHog via `captureException`
- Admin page calls `identifyUser("admin")` on successful login to correlate events

**Server-side additions** (`posthog-node` via a new `functions/lib/posthog.ts` helper):
- `functions/api/auth.ts` — `admin_logged_in` on successful password check
- `functions/api/posts/index.ts` — `post_created` with title and slug; `captureException` in error handler
- `functions/api/posts/[slug].ts` — `post_updated` and `post_deleted` with metadata; `captureException` in each error handler
- `functions/api/menu.ts` — `menu_updated` with section count; `captureException` in error handler

All server-side PostHog calls are guarded by `POSTHOG_KEY` / `POSTHOG_HOST` presence checks and use `flushAt: 1` / `flushInterval: 0` with `await posthog.shutdown()` for correct serverless (Cloudflare Workers) behavior.

| Event | Description | File |
|---|---|---|
| `menu_item_viewed` | User opens a menu item lightbox to view details | `src/components/menu/MenuLightbox.tsx` |
| `menu_item_added_to_cart` | User adds a menu item to their order | `src/components/menu/MenuLightbox.tsx` |
| `cart_order_sent` | User submits their coffee order from the cart | `src/components/menu/Cart.tsx` |
| `mode_switched` | User toggles between the OS desktop experience and the plain site | `src/components/ModeToggle.tsx` |
| `app_window_opened` | User opens an app window on the desktop OS | `src/context/App.tsx` |
| `admin_logged_in` | Admin successfully authenticates to the admin panel | `functions/api/auth.ts` |
| `post_created` | Admin publishes a new blog post | `functions/api/posts/index.ts` |
| `post_updated` | Admin updates an existing blog post | `functions/api/posts/[slug].ts` |
| `post_deleted` | Admin deletes a blog post | `functions/api/posts/[slug].ts` |
| `menu_updated` | Admin saves changes to the service menu | `functions/api/menu.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/469524/dashboard/1775626)
- [Menu Ordering Funnel](https://us.posthog.com/project/469524/insights/GSzmS03S) — conversion from view → add → order
- [Orders Over Time](https://us.posthog.com/project/469524/insights/8jm8jyYv) — daily order volume
- [Experience Mode Preference](https://us.posthog.com/project/469524/insights/qcKgRdQb) — OS vs Site mode switches by day
- [Content Management Activity](https://us.posthog.com/project/469524/insights/n5FXT316) — post creates, updates, and deletes per week
- [App Window Engagement](https://us.posthog.com/project/469524/insights/hhwtOPS3) — most opened apps by title

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite (`npm test`) — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_KEY` and `POSTHOG_HOST` to `.env.example` (or equivalent onboarding docs) and set them as Cloudflare Pages environment variables so the server-side events actually fire in production.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or Gatsby's build output) into CI so production stack traces de-minify in PostHog Error Tracking.
- [ ] Confirm the returning-visitor admin path also calls `identifyUser("admin")` — currently identification only happens on fresh login, so returning sessions refreshed without re-logging in will start on an anonymous distinct ID.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
