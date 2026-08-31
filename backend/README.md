# ExoSight Backend

This is the part that does the heavy lifting.

The FastAPI backend takes an observing setup, figures out where the target is in the sky,
propagates active satellites across the requested time window, checks the telescope's field of
view, and asks AI to explain the result without dumping raw orbital math on the user.

## Architecture

```text
app/main.py
  `-- API routers
      |-- /api/exoplanets/search -> NASA planet autocomplete
      |-- /api/targets/resolve   -> exact planet name to RA/Dec
      `-- /api/predict/          -> full obstruction pipeline
                                      |
                                      v
                              astronomy modules
                         filter -> propagate -> FoV check
                                      |
                                      v
                              OpenAI explanation
```

### Main folders

| Path                                 | What lives there                                          |
| ------------------------------------ | --------------------------------------------------------- |
| `app/api/`                           | FastAPI routes and HTTP error mapping                     |
| `app/models/`                        | Pydantic request and response shapes                      |
| `app/services/exoplanet_service.py`  | NASA TAP search and exact-name resolution                 |
| `app/services/celestrak_service.py`  | Active satellite TLE download and `/tmp` cache            |
| `app/services/prediction_service.py` | Orchestrates the full prediction                          |
| `app/services/gpt_service.py`        | Turns obstruction data into plain language                |
| `app/astronomy/`                     | Target conversion, filtering, propagation, and FoV checks |

## What happens during a prediction

1. `get_target_coordinate()` uses supplied RA/Dec or resolves an exoplanet name through NASA.
2. `load_satellites()` loads the active CelesTrak TLE catalog.
3. `filter_satellites()` removes objects below the horizon and more than 10 degrees from the
   target at the observation start.
4. `propagate_satellites()` calculates each candidate's apparent position once per second for
   the whole exposure.
5. `satellites_in_fov()` transforms the target into Alt/Az at every sample and checks the
   rectangular horizontal and vertical FoV.
6. The first detected crossing for each satellite becomes a result.
7. `interpret_prediction()` sends that structured list to OpenAI and returns the explanation.

## Local setup

From the repository root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
```

Create a file named `backend/.env`:

```dotenv
OPENAI_API_KEY=your_key_here
```

Do not commit that file. It is already ignored by Git.

Start the server:

```powershell
uvicorn app.main:app --reload --app-dir backend
```

Useful URLs:

- API base: `http://127.0.0.1:8000`
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

## Environment variables

| Variable         | Required now? | Used for                                                        |
| ---------------- | ------------: | --------------------------------------------------------------- |
| `OPENAI_API_KEY` |           Yes | Creating the OpenAI client and generating the final explanation |

The OpenAI client is currently created at import time. That means a missing key can crash the
entire FastAPI function before routing begins, even if the request only needs planet search.
For Vercel, add the key in Project Settings -> Environment Variables and redeploy.

## External data and caching

### NASA Exoplanet Archive

Planet search uses `pscomppars` for one composite row per confirmed planet. Exact resolution
uses `ps` with `default_flag = 1`. Queries are sent to NASA's synchronous TAP endpoint with a
10-second timeout.

### CelesTrak

The backend downloads the active satellite TLE feed and lets Skyfield store
`active_satellites.txt` under `/tmp`. It considers that file fresh for three days.

That works as a per-instance cache, but `/tmp` is ephemeral and is not shared by Vercel
instances. Expect cold instances to fetch the catalog again.

## Error behavior

- Unknown planet during prediction: friendly `404`.
- Invalid target combination, such as only RA without Dec: `400`.
- NASA non-success HTTP response: `502`.
- Pydantic request validation failure: `422`.
- Network failures from NASA/CelesTrak and OpenAI errors are not fully normalized yet and can
  surface as `500` errors.

See [API.md](API.md) for every request and response shape.

## Current limitations

- No brightness or visual magnitude calculation yet.
- One-second sampling can miss a very fast crossing.
- No backend test suite yet.
- Numeric astronomy ranges are not comprehensively validated by Pydantic yet.
- The TLE cache is local to one runtime instance, not a shared Redis cache.
- Prediction latency grows with the exposure duration and number of candidate satellites.
