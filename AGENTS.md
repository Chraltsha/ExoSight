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

- **TLE caching uses Vercel KV (Upstash Redis)** — [`celestrak_service.py`](backend/app/services/celestrak_service.py) calls `Redis.from_env()` which requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. These are injected automatically when you link a KV store in the Vercel dashboard. Without them the backend crashes at startup locally — set them in `backend/.env` for local dev.
- **TLE cache TTL is 6 hours** — `CACHE_KEY = "active_satellites_tle"`. First request after expiry hits CelesTrak (~15s), all others are in-memory parses of the cached string.
- **Vercel filesystem is read-only** — never use `load.tle_file(url)` or any disk-based Skyfield caching. Always go through the Redis cache.
- **`routers/prediction.py` is deleted** — the only active router is `backend/app/api/predict.py`.
- Models use Pydantic v2 (`pydantic==2.x`). Use `model_validator`, `field_validator`, etc. (not v1 `@validator`).
- **`interpretation` in `PredictionResponse` is `str | None = None`** — `prediction_service.py` does not call GPT; the field will be `null` until wired up.

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
