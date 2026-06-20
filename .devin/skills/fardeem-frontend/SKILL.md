---
name: fardeem-frontend
description: Fardeem Munir's frontend architecture principles for building billion-dollar web apps. Covers API codegen, data fetching, routing, state management, real-time, and deployment. Use when architecting a new frontend, making foundational stack decisions, or reviewing frontend architecture. Invoke with /fardeem-frontend.
user-invocable: true
---

# Fardeem Frontend

Architecting the frontend of a web app that's meant to scale to a billion-dollar company. These are day-1 decisions that prevent expensive rework later. You don't have to learn anything — tell your agents to do it.

## When to apply

- Starting a new web app or SPA from scratch
- Making foundational frontend architecture decisions (routing, data fetching, state, real-time)
- Reviewing an existing frontend architecture for scalability gaps
- Deciding whether to use Next.js or a plain SPA
- Setting up API client code generation
- Choosing state management strategy
- Architecting real-time features (websockets, SSE) for AI apps

## Principles

### 1. Generate client code from OpenAPI specs

Never hand-type backend types. Make your server code generate an OpenAPI spec, then generate all relevant client-side code from it. Typing backend types by hand should be banned.

### 2. Use TanStack Query for server state

Decide how the client talks to the backend (REST or GraphQL). Either way, use TanStack Query. Other libraries look similar but TanStack Query is the GOAT.

### 3. Architect sync/offline from day 1

If you want linear-style sync setups or offline mode, think about this HARD and architect it from day 1. Bolting this on later is tedious.

### 4. Use a real router with data loaders

Don't use plain React Router. Use TanStack Router or React Router's framework mode. Use route data loaders.

### 5. Make query params type-safe first-class citizens

If you store a lot of state in query params, make that a first-class citizen and ensure it's type-safe. Use nuqs or TanStack Query.

### 6. One state management solution for server state is enough

Most apps just need a single state management solution for server state. For bespoke needs beyond that, zustand and xstate/store are good choices.

### 7. Model interactive apps as state machines with XState

For super interactive apps — things coming in and out of view, lots of frontend state to maintain, music playing — learn XState. Model your frontend as a state machine or you'll be deep in useEffect hell.

### 8. React Compiler eliminates useMemo/useCallback

React Compiler is here. The days of useMemo and useCallback are gone. Update your priors accordingly. Don't manually memoize.

### 9. Use an agent-first design system, not raw Tailwind

Tailwind is easy and fun but makes it hard to maintain a large app with consistent styling. You need an agent-first design system / component library.

### 10. Hack your router to fit your needs

Don't be afraid to hack your routing library. Apps have "drawers" for additional info — you should be able to say "here's a route, make it a drawer" and have everything handled from there.

### 11. Use Suspense and ErrorBoundary, not isPending/isError

Managing loading and error states using isPending and isError is madness. Lean into Suspense and ErrorBoundary.

### 12. Pick a blessed path for WebSockets and SSE on day 1

Figuring out a blessed path for websockets and SSE on day 1 pays dividends long-term, especially if you're building anything AI-related.

### 13. Don't use Next.js for SPAs

If you're building an SPA, don't use Next.js. It makes no sense.

### 14. Deploy on Cloudflare or Vercel

Deploy on Cloudflare or Vercel. Other services have weird missing features.

### 15. Build the factory that builds the thing

Assuming you build something people want, the next job is to build the factory so it can efficiently build the thing. Act accordingly.

## Attribution

Based on [Fardeem Munir's post on X](https://x.com/FardeemM) on architecting frontends for billion-dollar companies.
