# Search Page Plan

## Top-Level Overview

Build the `/search` page as a three-state chat interface backed by a (future) LLM backend.
The page lives entirely in `frontend/src/routes/search/+page.svelte` with styles added to
`frontend/src/routes/layout.css`. No new files or libraries are introduced — only native
Svelte 5 runes, Svelte transitions, and Tailwind v4 utility classes matching the existing
project conventions.

**States:**
1. **Idle** — full-screen centered prompt, wide search bar, "Surprise me" button
2. **Searching** — chat view: message bubbles + bottom input bar + collapsible left sidebar

**Corrections from review:**
- Sidebar is always visible (both idle and searching states), not only during chat
- The nav bar sits above everything; the chat/idle view fills the space below the `<hr>`
- Loading indicator: pulsing dots (`...`)

Chat history is held in a Svelte `$state` array so it survives in-app navigation but
resets on a hard refresh.

---

## Sub-Tasks

---

### Sub-Task 1 — Idle State UI

**Intent**
Render the default view the user sees when no conversation has started. Matches the
home page's visual language (dark background, accent colours, Tailwind tokens from
`layout.css`).

**Expected Outcomes**
- Page shows a centred heading "What exoplanet are you looking for?"
- A wide search bar below it (reuses `.home-searchbar` style or a local variant)
- A "Surprise me" button below the search bar
- Pressing Enter in the search bar or clicking "Surprise me" calls a `startChat(query)`
  function (stubbed for now — logs to console, transitions to Searching state)

**Todo List**
1. Replace the stub `<h1>` in `search/+page.svelte` with idle-state markup
2. Add `$state` variable `chatStarted = false` and `messages = []`
3. Bind the search input value to a `$state` variable `inputValue`
4. Wire `keydown` (Enter) on the input → `startChat(inputValue)`
5. Wire "Surprise me" button → `startChat("Tell me about a random exoplanet")`
6. `startChat` stub: push user message to `messages`, set `chatStarted = true`, clear input
7. Add CSS classes for idle layout to `layout.css`

**Relevant Context**
- `frontend/src/routes/+page.svelte` — copy the `.home-content` centering pattern
- `frontend/src/routes/layout.css` — `.home-searchbar` style to reuse/extend
- Tailwind tokens: `bg-background`, `bg-card`, `text-text-color`, `bg-accent`, `text-accent`

**Status:** [ ] pending

---

### Sub-Task 2 — Chat State UI (message bubbles + input bar)

**Intent**
Once `chatStarted` is true, replace the idle view with a classic chat layout:
scrollable message history above a pinned bottom input bar. User bubbles right,
bot bubbles left. A spinner/loading indicator appears while waiting for the API.

**Expected Outcomes**
- Idle view is hidden (`{#if !chatStarted}`) and chat view is shown (`{:else}`)
- Scrollable message list fills available vertical space
- User message bubbles: right-aligned, accent background
- Bot message bubbles: left-aligned, card background
- While `isLoading` is true, a pulsing ellipsis / spinner bubble appears on the left
- Bottom bar: text input + send button; Enter or click sends the message
- Sending a message appends it to `messages`, sets `isLoading = true`, calls the
  (still-stubbed) API function, then appends the bot reply and sets `isLoading = false`
- After each new message, the list auto-scrolls to the bottom

**Todo List**
1. Add `$state` variables: `isLoading = false`
2. Add `sendMessage()` function: appends user message, sets isLoading, calls stub API
   (resolves after a `setTimeout` with a placeholder bot reply), appends bot reply
3. Build chat layout HTML: outer flex-col taking full height, scrollable message area,
   fixed bottom input bar
4. Render messages with `{#each messages}`, applying right/left bubble classes by role
5. Add loading indicator bubble that renders when `isLoading` is true
6. Add `afterUpdate` or `$effect` to scroll the message container to the bottom
7. Wire bottom input: Enter key and send button both call `sendMessage()`
8. Add CSS classes for chat layout, bubbles, and loading indicator to `layout.css`

**Relevant Context**
- `frontend/src/routes/+layout.svelte` — `fly` transition pattern for enter/exit animations
- Svelte 5 `$effect` replaces `afterUpdate` for DOM side-effects
- Tailwind `overflow-y-auto`, `flex-1`, `sticky bottom-0` for the layout structure

**Status:** [ ] pending

---

### Sub-Task 3 — Left Sidebar (config panel scaffold)

**Intent**
Add a collapsible sidebar on the left edge of the chat view. Hovering the left edge
reveals a pull-tab arrow; clicking it slides the sidebar open/closed with a smooth
Svelte transition. The inner content is an empty placeholder panel for future settings.

**Expected Outcomes**
- A thin hover zone on the left edge (always present, zero width or 2–4px wide)
- On hover, a small arrow/tab becomes visible using a CSS transition
- Clicking the arrow sets `sidebarOpen = true` and slides the panel in from the left
- A visible sidebar panel (~280px wide) slides in with `fly` or a CSS `transition`
- The sidebar has a close arrow/button to collapse it
- Inside: heading "Search Settings" and a placeholder paragraph
- The sidebar does NOT push page content; it overlays (absolute/fixed positioned)

**Todo List**
1. Add `$state` variable `sidebarOpen = false` and `hovering = false`
2. Add a thin `hover-zone` div on the left edge; bind `mouseenter`/`mouseleave`
3. Inside the hover zone, add the pull-tab arrow button; bind click → toggle `sidebarOpen`
4. Use `{#if sidebarOpen}` with `in:fly={{ x: -300 }}` / `out:fly={{ x: -300 }}` for the panel
5. Panel content: "Search Settings" heading, a close button (×), placeholder text
6. Style hover zone, pull-tab, and sidebar panel in `layout.css`
7. Keep sidebar `position: fixed` so it overlays without affecting chat layout

**Relevant Context**
- `frontend/src/routes/+layout.svelte` — existing `fly` usage: `{ x: direction * 300, duration: 300 }`
- The sidebar is always rendered regardless of `chatStarted`

**Status:** [ ] pending

---

### Sub-Task 4 — Session-persisted chat state

**Intent**
Move `messages`, `chatStarted`, and `isLoading` out of the component's local scope into
a Svelte module-level store (or a `$state` at module scope) so they survive in-app
navigation but reset on refresh.

**Expected Outcomes**
- Navigating from `/search` → `/` → `/search` restores the full conversation
- A hard refresh starts back at the Idle state
- No external store library needed — Svelte 5 module-level `$state` in a `.svelte.js`
  file is sufficient

**Todo List**
1. Create `frontend/src/lib/searchState.svelte.js` exporting `chatState` as a reactive
   object with `messages`, `chatStarted`, `isLoading` properties using Svelte 5 runes
2. Import and use `chatState` in `search/+page.svelte` instead of local `$state`
3. Verify navigation away and back restores the conversation

**Relevant Context**
- Svelte 5 module-level state: `export const chatState = $state({ messages: [], chatStarted: false, isLoading: false })`
- `frontend/src/lib/index.js` is currently empty — this is a sibling file, not an edit to index.js

**Status:** [ ] pending

---

## Implementation Order

Sub-tasks are designed to be done sequentially:
1 → 2 → 3 → 4

Sub-tasks 1–3 build the UI incrementally; Sub-task 4 lifts state without changing UI.
