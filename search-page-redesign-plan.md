# Search Page Redesign Plan

## Top-Level Overview

Replace the existing `/search` route (which had a two-state IdleView/ChatView flow + Sidebar) with a single all-in-one page. The new page is a vertically stacked form: exoplanet name with live autocomplete → telescope settings → date/time → location (with Leaflet map) → a "Search" button → an "Exosight says…" output box. One LLM call is fired per submit; the result replaces the previous output. No chat history, no navigation to other pages.

All old search-specific components (`IdleView`, `ChatView`, `Sidebar`, `MessageInput`, `TypingIndicator`, `ChatBubble`) are deleted. Shared components (`PageTransition`, `StarBackground`) are kept.

---

## Sub-Tasks

---

### Sub-Task 1 — Delete Old Search Components & Clean Up State

**Intent**
Remove all the files and state that belong to the old IdleView/ChatView/Sidebar flow so they don't clutter the codebase and can't be accidentally reused.

**Expected Outcomes**
- `frontend/src/lib/components/search/` directory is emptied (all 5 component files deleted)
- `frontend/src/lib/searchState.svelte.js` (chat state: messages, chatStarted, isLoading, sendToLLM, resetChat) is deleted
- `exoplanetSearchState.svelte.js` is **kept** — its `searchPlanets` / `loadMorePlanets` logic will be reused for the autocomplete field
- No broken imports remain anywhere

**Todo List**
1. Delete `frontend/src/lib/components/search/IdleView.svelte`
2. Delete `frontend/src/lib/components/search/ChatBubble.svelte`
3. Delete `frontend/src/lib/components/search/MessageInput.svelte`
4. Delete `frontend/src/lib/components/search/TypingIndicator.svelte`
5. Delete `frontend/src/lib/components/search/Sidebar.svelte`
6. Delete `frontend/src/lib/searchState.svelte.js`
7. Remove the import of `searchState` from `frontend/src/routes/search/+page.svelte` (the whole file will be replaced in Sub-Task 3, but removing the import first prevents lint errors during transition)

**Relevant Context**
- Files to delete live in `frontend/src/lib/components/search/`
- `frontend/src/lib/searchState.svelte.js` — chat state (delete)
- `frontend/src/lib/exoplanetSearchState.svelte.js` — planet search state (keep)
- Status: `[ ] pending`

---

### Sub-Task 2 — Build New Input-Section Svelte Components

**Intent**
Create three small, focused components that encapsulate each input group. Keeping them as separate files makes the main page file readable and each section independently testable/styled.

**Expected Outcomes**
- `TelescopeSettings.svelte` — two number inputs for horizontal and vertical FOV in degrees, bound via `$props`
- `DateTimeSettings.svelte` — native `<input type="date">`, `<input type="time">`, and a number input for observation length in minutes, all bound via `$props`; all styled to match dark theme (background `bg-card`, accent border on focus, `text-text-color`)
- `LocationSettings.svelte` — two number inputs (latitude, longitude) + a Leaflet/OpenStreetMap map with a draggable marker; moving the marker updates the lat/lon inputs and vice-versa; Leaflet is loaded as a client-side-only import (no SSR)

**Todo List**
1. Install `leaflet` npm package in `frontend/` (`npm install leaflet`)
2. Create `frontend/src/lib/components/TelescopeSettings.svelte` with `hFov` and `vFov` bindable number props
3. Create `frontend/src/lib/components/DateTimeSettings.svelte` with `date`, `time`, and `observationLength` bindable props; apply dark-theme CSS to native date/time inputs via `layout.css` or scoped styles
4. Create `frontend/src/lib/components/LocationSettings.svelte`:
   - On mount, call `navigator.geolocation.getCurrentPosition()` to request the user's browser location
   - If granted: pre-fill `lat`/`lon` with the result and centre the map there
   - If denied or unavailable: fall back to a random location (random lat between -60 and 60, random lon between -180 and 180)
   - Bindable `lat` and `lon` props
   - Import Leaflet inside `onMount` (SSR-safe)
   - Render a 300–400px tall map centred on the current lat/lon
   - Draggable marker: on drag-end, update `lat`/`lon`
   - Watch `lat`/`lon` changes from the text inputs and move the marker accordingly

**Relevant Context**
- Svelte 5 runes: use `$props()`, `$state`, `$effect`, `onMount` from `svelte`
- No `<style>` blocks for layout concerns — add CSS classes to `frontend/src/routes/layout.css` instead
- Design tokens: `bg-background` (#1A1C20), `bg-card` (#222222), `text-text-color` (#FDFDFD), `border-accent` / `text-accent` (#D9A4D9)
- Leaflet requires `import 'leaflet/dist/leaflet.css'` and must only run in the browser (`onMount` or `browser` guard)
- Status: `[ ] pending`

---

### Sub-Task 3 — Build the New `/search` Page

**Intent**
Replace `frontend/src/routes/search/+page.svelte` with the new single-page layout that composes all input sections, the autocomplete field, the Search button, and the Exosight output box.

**Expected Outcomes**
- Page renders a vertically stacked, scrollable form
- Top: small heading "What exoplanet are we looking for?"
- Below: exoplanet name text input with live autocomplete dropdown (reuses `exoplanetSearchState` — same debounce/search logic; selecting a result populates the field and closes the dropdown)
- Below: `<TelescopeSettings>` section with section label
- Below: `<DateTimeSettings>` section with section label
- Below: `<LocationSettings>` section with section label
- Below: "Search" button (accent-styled, full-width or prominent)
- Bottom: "Exosight says…" label + output box (empty until first search, then shows LLM response; loading state shows a subtle indicator while awaiting response)
- All state is local to this page component (no new shared state file needed)

**Todo List**
1. Rewrite `frontend/src/routes/search/+page.svelte` from scratch
2. Import and compose `TelescopeSettings`, `DateTimeSettings`, `LocationSettings`
3. Wire up exoplanet autocomplete:
   - Input field bound to a local `planetName` string
   - On input, call `searchPlanets(planetName)` from `exoplanetSearchState`
   - Render results dropdown below the input
   - On result click: set `planetName = item.name`, close dropdown
4. Wire the "Search" button: collect all field values, call `sendToLLM(payload)` (reuse/adapt the existing stub in `exoplanetSearchState` or create a new local `sendToLLM` function), set a local `isLoading` and `llmOutput` state
5. Render the output box: before any search, show placeholder text "Fill in the fields above and hit Search to get your observation report"; when `isLoading`, show a pulsing/spinner placeholder; when `llmOutput` has content, display it
6. Wrap the page root in `<PageTransition>` (required by project conventions)

**Relevant Context**
- `frontend/src/lib/exoplanetSearchState.svelte.js` for `searchPlanets`, `results`, `isLoading`, `hasMore`, `loadMorePlanets`
- `frontend/src/lib/components/PageTransition.svelte` — must wrap root element
- `frontend/src/routes/layout.css` — add any new layout classes here
- The LLM call endpoint is not yet implemented on the backend; for now use the stub pattern (timeout + echo) matching what `searchState.svelte.js` had, but accept the full payload object — leave a `// TODO: wire to real endpoint` comment
- Status: `[ ] pending`

---

### Sub-Task 4 — Style & CSS Cleanup

**Intent**
Add all new CSS classes to `layout.css`, remove stale classes from the old search layout, and ensure dark-theme styling on native date/time inputs.

**Expected Outcomes**
- All new section headers, input groups, the output box, and the Search button have consistent styling that matches existing tokens
- Native `<input type="date">` and `<input type="time">` are dark-themed (no white flash from browser defaults)
- Old CSS classes (`search-page`, `idle-view`, `search-results-list`, `bubble--user`, `bubble--bot`, `typing-indicator`, `message-input-bar`, `sidebar-panel`) are removed from `layout.css`
- No layout regressions on home (`/`) or about (`/about`) pages

**Todo List**
1. Open `frontend/src/routes/layout.css` and remove all classes that only existed for the old search flow
2. Add classes for the new layout: `.search-new-page`, `.search-section`, `.search-section-label`, `.exosight-output-box`, `.search-submit-btn`
3. Style native date/time inputs: target `input[type="date"]`, `input[type="time"]`, `input[type="number"]` globally with dark background, `text-text-color`, `border-accent` on focus, remove browser default calendar-icon tint where possible
4. Run `npm run lint` and `npm run build` from `frontend/` to confirm no errors

**Relevant Context**
- `frontend/src/routes/layout.css` is the single source of truth for all CSS
- Tailwind v4 `@apply` directives are used; use existing token names
- `tailwindStylesheet` in `prettier.config.js` points here — Prettier will auto-sort class order on format
- Status: `[ ] pending`

---

## Implementation Order

Sub-tasks must be executed in order: 1 → 2 → 3 → 4. Sub-task 2 produces the components that Sub-task 3 consumes. Sub-task 4 is a cleanup pass after everything is assembled.
