# Transition Fix Plan

## Top-Level Overview

The current `{#key routeKey}` + `fly` approach in `+layout.svelte` causes a glitch because
SvelteKit's router swaps the page component *before* the outgoing `out:fly` has a chance to
run. The layout div never re-mounts between navigations, so the outgoing content vanishes
instantly and the incoming content pops in abruptly.

The correct fix uses SvelteKit's `onNavigate` lifecycle hook, which fires *before* the DOM
swap and accepts a Promise. By returning a Promise that resolves after the out-transition
duration, we hold the router until the old page has finished sliding out — then the new page
slides in cleanly.

The transition logic is encapsulated in a shared `PageTransition` component (Option A) so no
page has boilerplate beyond a single import and wrapper tag.

---

## Sub-Tasks

---

### Sub-Task 1 — Create `PageTransition` component

**Intent**
A single reusable component that wraps page content in a `fly` transition. It reads the
current transition direction from a shared module-level store so every page gets the right
direction without any per-page logic.

**Expected Outcomes**
- `frontend/src/lib/components/PageTransition.svelte` exists
- Wraps `{@render children()}` in a `<div>` with `in:fly` and `out:fly`
- Direction value comes from an exported `$state` in a small shared module
- Component is self-contained; pages only need to import and wrap their content

**Todo List**
1. Create `frontend/src/lib/transitionState.svelte.js` exporting:
   - `transitionState = $state({ direction: 1 })`
2. Create `frontend/src/lib/components/PageTransition.svelte` that:
   - Imports `transitionState` from the shared module
   - Accepts `children` via `$props()`
   - Renders a `<div in:fly out:fly>` using `transitionState.direction`
   - Uses `duration: 300` for both in and out, `delay: 0` on both (timing is now
     controlled by `onNavigate`'s Promise, not by a CSS delay)

**Relevant Context**
- `frontend/src/lib/searchState.svelte.js` — same module-level `$state` pattern to follow
- Svelte `fly` import from `svelte/transition`

**Status:** [ ] pending

---

### Sub-Task 2 — Rewire `+layout.svelte` to use `onNavigate`

**Intent**
Replace the `{#key routeKey}` hack with `onNavigate`, which holds the router until a
returned Promise resolves. This makes the out-transition run to completion *before* the DOM
is swapped, eliminating the glitch entirely.

**Expected Outcomes**
- `+layout.svelte` no longer uses `{#key}`, `beforeNavigate`, `afterNavigate`, or
  `routeKey`
- `onNavigate` sets `transitionState.direction` then returns a Promise that resolves after
  300ms (matching the out-transition duration)
- The `<div>` wrapper in the template has no transition directives (transitions live in
  `PageTransition` now)
- `direction` state and all related imports are removed from the layout

**Todo List**
1. Import `onNavigate` from `$app/navigation` and `transitionState` from the shared module
2. In `onNavigate`: compute direction from route indices, set `transitionState.direction`,
   return `new Promise(resolve => setTimeout(resolve, 300))`
3. Remove `beforeNavigate`, `afterNavigate`, `direction`, `routeKey` state, and `fly` import
4. Remove the `{#key}` block and transition directives from the wrapper div — leave a plain
   `<div class="page-transition-wrapper">` containing `{@render children()}`

**Relevant Context**
- `frontend/src/routes/+layout.svelte` — current file to edit
- `onNavigate` docs: the callback may return a Promise; SvelteKit awaits it before
  completing the navigation and updating the DOM
- `resolvedRoutes` array and `NAV_LINKS` remain unchanged

**Status:** [ ] pending

---

### Sub-Task 3 — Add `PageTransition` to each page

**Intent**
Wrap each page's content in `<PageTransition>` so the `in:fly` and `out:fly` directives are
active on the actual page elements rather than the persistent layout div.

**Expected Outcomes**
- `+page.svelte` (home), `search/+page.svelte`, and `about/+page.svelte` each wrap their
  top-level content in `<PageTransition>`
- Visually: old page slides out, new page slides in, no glitch, correct direction

**Todo List**
1. Add `<PageTransition>` wrapper to `frontend/src/routes/+page.svelte`
2. Add `<PageTransition>` wrapper to `frontend/src/routes/search/+page.svelte`
3. Add `<PageTransition>` wrapper to `frontend/src/routes/about/+page.svelte`

**Relevant Context**
- `search/+page.svelte` has a `.search-page` root div — wrap that whole div, don't replace it
- `about/+page.svelte` is currently a stub — wrap whatever is there

**Status:** [ ] pending

---

## Implementation Order

1 → 2 → 3  
Sub-tasks must be done in order: the component must exist before it's used in pages,
and the layout must be rewired before the per-page wrappers make visual sense.
