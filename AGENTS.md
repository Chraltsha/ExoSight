# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview

Full-stack satellite obstruction predictor: a SvelteKit 5 frontend (in `frontend/`) and a FastAPI + Astropy/Skyfield backend (in `backend/`). All frontend commands must be run from `frontend/`, not the repo root.

## Commands

### Frontend (run from `frontend/`)
```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # prettier --check + eslint
npm run format       # prettier --write
npm run test         # run all tests once (--run flag)
npm run test:unit    # vitest in watch mode
```
**Single test:** `npx vitest run src/lib/vitest-examples/greet.spec.js` (from `frontend/`)

### Backend (run from repo root or `backend/`)
```bash
uvicorn backend.app.main:app --reload   # dev server
pip install -r backend/requirements.txt
```

## Frontend Architecture

- **Svelte 5 runes mode is enforced globally** via `vite.config.js` — every non-`node_modules` file runs in runes mode. Use `$state`, `$props`, `$derived` etc., never the legacy `writable()` store API.
- **Module-level `$state` files** (`*.svelte.js`) are the shared state pattern — see [`searchState.svelte.js`](frontend/src/lib/searchState.svelte.js) and [`transitionState.svelte.js`](frontend/src/lib/transitionState.svelte.js). Global state lives here, not in stores.
- **Page transitions** require wrapping each page's root element in `<PageTransition>` from `$lib/components/PageTransition.svelte`. The direction is driven by `transitionState` set inside `onNavigate` in `+layout.svelte` — the 220 ms Promise delay there is intentional (gate for the out-transition).
- **All CSS is in `src/routes/layout.css`** using named semantic classes (`@apply`). Do not add scoped `<style>` blocks in components for layout-level concerns; add classes to `layout.css` instead. Tailwind v4 is used — config is CSS-based (`@theme`, `@plugin`), not `tailwind.config.js`.
- **Custom Tailwind tokens**: `bg-background` (#1A1C20), `bg-card` (#222222), `text-text-color` (#FDFDFD), `text-accent`/`border-accent` (#D9A4D9). Use these instead of raw hex.
- `tailwindStylesheet` in `prettier.config.js` points to `./src/routes/layout.css` — Prettier uses this to sort Tailwind classes.

## Backend Architecture

- **Two duplicate router files exist**: `backend/app/routers/prediction.py` and `backend/app/api/predict.py`. The `api/predict.py` version is the correct one (has `response_model`, proper prefix, tags). The `routers/` version is stale.
- **`celestrak_service.py`** uses Skyfield's `load.tle_file()` which downloads and caches TLEs from CelesTrak live on first call. The older commented-out implementation using `requests` is obsolete.
- **`propagation.py` has stub implementations** — both `propagate_satellite()` and `propagate_satellites()` have empty bodies. The observation pipeline is not yet functional end-to-end.
- **`observation.py` has a broken import**: `from propagation import propagate_satellite` (missing `app.astronomy.` prefix). Fix before running.
- **`target.py` imports `Target`** from `app.models.prediction` but the model is named `ObservationTarget`. The import will fail at runtime.
- Models use Pydantic v2 (`pydantic==2.x`). Use `model_validator`, `field_validator`, etc. (not v1 `@validator`).

## Code Style

### Frontend (enforced by ESLint/Prettier)
- Single quotes, semicolons required, `===` always, curly braces always
- Tabs (not spaces), `printWidth: 100`, trailing commas everywhere
- Import order: Svelte built-ins → `$app/*` → `$lib/*` → relative

### Backend
- Type annotations on all function signatures (Pydantic models auto-validate)
- Units must be explicit via `astropy.units` (e.g. `* u.deg`, `* u.m`) — never pass raw floats to Astropy/Skyfield constructors

## Svelte MCP Tools (available in this project)
Use `list-sections` → `get-documentation` → `svelte-autofixer` before sending any Svelte code. Run `svelte-autofixer` until it returns no issues.
