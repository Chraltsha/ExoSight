# Search Page Flash Fix Plan

## Top-Level Overview

The idle-state content on the search page briefly appears at the bottom of the viewport
before snapping to the centre. This is not a transition timing issue — it is a broken
height chain.

`.search-page` uses `h-[calc(100vh-theme(spacing.24))]` to size itself, but none of its
ancestors (`body`, the layout divs, `.page-transition-wrapper`, the `PageTransition` div)
have an explicit height. Without a height chain, the browser resolves percentage/flex
heights against 0, so `.search-page` overflows into document flow and the content lands
at the bottom before flex centering can correct it.

The fix is to establish a full-height flex column from `body` down so every ancestor has a
resolved height, then simplify `.search-page` to `height: 100%` instead of the brittle
`calc(100vh - ...)`.

---

## Sub-Tasks

---

### Sub-Task 1 — Fix the height chain in CSS

**Intent**
Give every element between `body` and `.search-page` a resolved height so that
`.search-page` can size itself as `h-full` and the browser never falls back to document
flow for overflow.

**Expected Outcomes**
- `body` is `height: 100vh; display: flex; flex-direction: column`
- `.page-transition-wrapper` fills remaining space with `flex: 1` and `overflow: hidden`
- `.search-page` uses `h-full` instead of `h-[calc(100vh-theme(spacing.24))]`
- The idle view content renders centred on first paint — no bottom flash

**Todo List**
1. In `layout.css`, add `h-screen flex flex-col` to `body`
2. Change `.page-transition-wrapper` from `relative overflow-hidden` to
   `relative flex-1 overflow-hidden`
3. Change `.search-page` from `h-[calc(100vh-theme(spacing.24))]` to `h-full`

**Relevant Context**
- `frontend/src/routes/layout.css` — `body`, `.page-transition-wrapper`, `.search-page`
- The nav bar and `<hr>` are natural-height siblings; `flex-1` on the wrapper absorbs
  all remaining space correctly

**Status:** [ ] pending

---

### Sub-Task 2 — Give the PageTransition div full height

**Intent**
The `PageTransition` wrapper div sits between `.page-transition-wrapper` and the page
content. If it has no height, `.search-page`'s `h-full` resolves against 0 again.
It needs `h-full` so the chain is unbroken.

**Expected Outcomes**
- The `PageTransition` div renders at full height of its parent at all times
- `.search-page` inside it resolves `h-full` correctly

**Todo List**
1. In `PageTransition.svelte`, add `class="h-full"` to the wrapper `<div>`

**Relevant Context**
- `frontend/src/lib/components/PageTransition.svelte`
- Tailwind `h-full` = `height: 100%`

**Status:** [ ] pending

---

## Implementation Order

1 → 2. Sub-task 1 fixes the CSS chain; Sub-task 2 closes the one remaining gap in it.
Both are tiny and can be done in a single pass.
