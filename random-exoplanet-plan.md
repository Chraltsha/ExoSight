# Random Exoplanet Button Plan

## Overview

Add a "Pick random exoplanet" button to the right of the search bar on the search page. When clicked, it picks a random letter A–Z, calls the existing `/api/exoplanets/search?q={letter}&limit=20` endpoint, then randomly selects one result from the returned list and populates the planet name input field — exactly as if the user had clicked a search result from the dropdown.

No backend changes are required. This is a purely frontend addition.

---

## Sub-Tasks

---

### Sub-Task 1 — Add `pickRandomPlanet` function to the search page script

**Intent**  
Implement the random-pick logic as a new async function in the `<script>` block of `frontend/src/routes/search/+page.svelte`. It should:
1. Pick a random uppercase letter A–Z
2. Call `searchPlanets(letter)` from `exoplanetSearchState.svelte.js` (which hits `/api/exoplanets/search?q={letter}&limit=5`) — but we'll call it directly via `fetch` with a higher limit (20) to get more variety
3. From the returned items, pick one at random
4. Set `planetName` to that item's name and `showDropdown = false`

We should **not** reuse `searchPlanets()` for this because it mutates `searchState` (which drives the dropdown) and sets `isLoading` on the shared state. Instead, do a standalone `fetch` inside the function so the dropdown is never dirtied.

**Expected Outcomes**
- A new `pickRandomPlanet()` async function exists in the script
- It has its own local `isPickingRandom` `$state` boolean to disable the button while in flight
- On success, `planetName` is set to a random result and `showDropdown` stays `false`
- On error (network failure or empty results), the function retries with a different letter once before silently giving up

**Todo List**
1. Add `let isPickingRandom = $state(false);` alongside the other local state vars (around line 36–38)
2. Add `async function pickRandomPlanet()` after `handleLoadMore()` (around line 60). The function:
   - Returns early if `isPickingRandom` is true
   - Sets `isPickingRandom = true`
   - Tries up to 3 times (in case a letter returns 0 results):
     - Picks `String.fromCharCode(65 + Math.floor(Math.random() * 26))` (A–Z)
     - Fetches `/api/exoplanets/search?q=${letter}&limit=20`
     - If `items.length > 0`, picks `items[Math.floor(Math.random() * items.length)]`, sets `planetName = item.name`, `showDropdown = false`, breaks
   - Sets `isPickingRandom = false` in a `finally` block

**Relevant Context**
- File: `frontend/src/routes/search/+page.svelte`
- Existing state vars around line 22–38
- `searchPlanets` import from `$lib/exoplanetSearchState.svelte.js` (do NOT use for this — use raw fetch)
- API endpoint shape: `GET /api/exoplanets/search?q=k&limit=20` → `{ items: [{name, hostname, ra, dec}], next_cursor, has_more }`

**Status** — `[ ] pending`

---

### Sub-Task 2 — Add the button to the template beside the search bar

**Intent**  
Render the "Pick random exoplanet" button to the right of the search input. The input and button should sit in the same horizontal row, styled to look cohesive.

The current layout has `.planet-input-row` (a `position: relative` div) containing just the icon and input. We need to change `.planet-input-row` into a flex row that holds both the input wrapper and the new button side-by-side.

**Expected Outcomes**
- A button labelled "Pick random exoplanet" (with a 🎲 or dice icon, or a simple sparkle SVG) appears to the right of the search bar on the same line
- Button is disabled while `isPickingRandom` is true, showing "Picking…" text
- Button is visually distinct from the search submit button — smaller, outlined/subtle style using `border-accent` and `text-accent` tokens
- The search input still takes up most of the row width; the button is compact

**Todo List**
1. In `+page.svelte`, wrap the `<svg>` icon + `<input>` in a new inner `<div class="planet-input-inner">` so the icon stays anchored to just the input
2. Change `.planet-input-row` to `display: flex; gap: 0.75rem; align-items: center;`
3. Add the button after the inner wrapper:
   ```svelte
   <button
     class="random-planet-btn"
     onclick={pickRandomPlanet}
     disabled={isPickingRandom}
   >
     {isPickingRandom ? 'Picking…' : 'Pick random exoplanet'}
   </button>
   ```

**Relevant Context**
- File: `frontend/src/routes/search/+page.svelte`, lines 157–219
- File: `frontend/src/routes/layout.css` — all CSS goes here, not in `<style>` blocks

**Status** — `[ ] pending`

---

### Sub-Task 3 — Add `.random-planet-btn` CSS to layout.css

**Intent**  
Style the new button so it fits the design system. It should:
- Match the pill shape (`border-radius: 9999px`)
- Use the `text-accent` / `border-accent` colour tokens (border + text, transparent background)
- Use `Iosevka Charon Regular` font
- Have a hover state that fills with a subtle accent background
- Be compact (smaller padding than `.search-submit-btn`)
- Not stretch: `white-space: nowrap; flex-shrink: 0`

**Expected Outcomes**
- `.random-planet-btn` is defined in `layout.css` after the `.planet-name-input` block (around line 329)
- `.planet-input-inner` is also defined (to keep the icon anchor working correctly)
- The button does not break the row layout at normal viewport widths

**Todo List**
1. After `.planet-name-input` (~line 329), add `.planet-input-inner` as `position: relative; flex: 1; min-width: 0;`
2. Add `.random-planet-btn` with:
   - `border-radius: 9999px`
   - `border: 1.5px solid #d9a4d9` (accent)
   - `color: #d9a4d9`
   - `background: transparent`
   - `padding: 0.5rem 1.1rem`
   - `font-family: 'Iosevka Charon Regular', monospace`
   - `font-size: 0.95rem`
   - `white-space: nowrap; flex-shrink: 0; cursor: pointer`
   - `transition: background-color 0.2s, color 0.2s`
   - `disabled:opacity-50 disabled:cursor-not-allowed`
3. Add hover rule: `background-color: rgba(217, 164, 217, 0.12)` on hover when not disabled

**Relevant Context**
- File: `frontend/src/routes/layout.css`
- Existing accent colour token: `#D9A4D9` (also available as `@apply text-accent border-accent`)
- `.planet-input-row` currently at line 306 — needs updating to `display: flex` (this is a CSS change, but the rule lives in layout.css)

**Status** — `[ ] pending`

---

## Notes for Implementation

- Sub-tasks 1, 2, and 3 are all small and closely related; they can be implemented in a single agent pass, but reviewing the template change (Sub-Task 2) before the CSS (Sub-Task 3) is the natural order.
- The `pickRandomPlanet` function uses raw `fetch` (not the shared `searchState`) so it never contaminates the dropdown state.
- The retry loop (up to 3 attempts with different random letters) guards against rare letters like X, Q, Z which may have 0 results.
- No backend changes are needed.
