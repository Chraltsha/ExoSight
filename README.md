# ExoSight

Space is getting crowded, and telescopes are paying the price.

ExoSight checks whether an active satellite could pass through a telescope's field of view
during an observation. You give it an exoplanet, your telescope settings, a time, and a
location. It does the annoying space math, then uses AI to explain the result like a normal
person.

We do the math. AI makes sense of it. You get the answer.

## What it does right now

1. Searches confirmed planets through the NASA Exoplanet Archive.
2. Resolves the selected planet into right ascension and declination.
3. Downloads active satellite TLE data from CelesTrak.
4. Filters out satellites that are below the horizon or nowhere near the target.
5. Uses Skyfield and Astropy to propagate the remaining satellites across the observation.
6. Checks whether any satellite enters the telescope's rectangular field of view.
7. Passes the result to an OpenAI model for a short, plain-language explanation.

The frontend currently has planet autocomplete, five-at-a-time pagination, telescope FoV
controls, date and time controls, observation length, browser geolocation, and a draggable
Leaflet map.

## How the pieces fit together

```text
SvelteKit frontend
    |
    | /api requests
    v
FastAPI backend
    |-- NASA Exoplanet Archive -> planet search and RA/Dec
    |-- CelesTrak              -> active satellite TLEs
    |-- Skyfield + Astropy     -> propagation and coordinate transforms
    |-- FoV checks             -> predicted satellite crossings
    `-- OpenAI                 -> readable observation report
```

| Part                     | Tech                                           | Job                                                         |
| ------------------------ | ---------------------------------------------- | ----------------------------------------------------------- |
| `frontend/`              | Svelte 5, SvelteKit 2, Tailwind CSS 4, Leaflet | Search UI and observation form                              |
| `backend/`               | FastAPI, Pydantic 2                            | API and request/response models                             |
| `backend/app/astronomy/` | Astropy, Skyfield, NumPy                       | Coordinates, filtering, propagation, and FoV math           |
| `backend/app/services/`  | HTTPX, OpenAI SDK                              | NASA, CelesTrak, and AI integrations                        |
| `vercel.json`            | Vercel Services                                | Routes the frontend and Python backend under one deployment |

## Run it locally

### Backend

From the repository root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
```

Create `backend/.env`:

```dotenv
OPENAI_API_KEY=your_key_here
```

Then start FastAPI:

```powershell
uvicorn app.main:app --reload --app-dir backend
```

The API will be at `http://127.0.0.1:8000`, with Swagger UI at
`http://127.0.0.1:8000/docs`.

### Frontend

Run frontend commands from `frontend/`:

```powershell
cd frontend
npm install
npm run dev
```

Heads-up: `frontend/vite.config.js` currently proxies `/api` to the deployed Vercel app. If
you want the frontend to use your local backend, temporarily point that proxy at
`http://127.0.0.1:8000`.

## Current reality check

This is a working challenge prototype, not an observatory-grade scheduling system yet.

- Satellite positions are sampled once per second, so crossings between samples can be missed.
- The preliminary filter only keeps satellites within 10 degrees of the target at the start.
- Brightness is not calculated yet; `brightness` is always `null`.
- CelesTrak data is cached in `/tmp` for up to three days. Serverless instances do not share
  that cache, so a cold instance may download the feed again.
- The OpenAI client is created when the backend starts. A missing `OPENAI_API_KEY` can currently
  stop the whole API from starting, including endpoints that do not use AI.
- There are no automated backend tests in the repository yet.

## Docs

- [Backend guide](backend/README.md)
- [Full API reference](backend/API.md)
- FastAPI also generates live OpenAPI docs at `/docs` and `/redoc` when the backend is running.

## Useful commands

From `frontend/`:

```powershell
npm run dev
npm run build
npm run lint
npm run test
```

From the repository root:

```powershell
uvicorn app.main:app --reload --app-dir backend
```
