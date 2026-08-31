# ExoSight API Reference

The backend is a FastAPI app. All feature routes use the `/api` prefix.

| Environment               | Base URL                              |
| ------------------------- | ------------------------------------- |
| Local backend             | `http://127.0.0.1:8000`               |
| Current Vercel deployment | `https://exosight-xs-ight.vercel.app` |

When running locally, interactive docs are available at `/docs` and `/redoc`.

## Quick endpoint list

| Method | Path                     | Purpose                                                 |
| ------ | ------------------------ | ------------------------------------------------------- |
| `GET`  | `/api/exoplanets/search` | Search confirmed exoplanets with cursor pagination      |
| `GET`  | `/api/targets/resolve`   | Resolve one exact planet name to ICRS coordinates       |
| `POST` | `/api/predict/`          | Run the satellite obstruction prediction pipeline       |
| `GET`  | `/`                      | Backend health response when FastAPI is served directly |

## `GET /api/exoplanets/search`

Searches confirmed planet names through the NASA Exoplanet Archive `pscomppars` table.
Matching is case-insensitive and results are ordered by planet name.

### Query parameters

| Parameter | Type    | Required | Default | Rules                                     |
| --------- | ------- | -------: | ------: | ----------------------------------------- |
| `q`       | string  |      Yes |       - | Minimum 2 characters                      |
| `limit`   | integer |       No |    `20` | From 1 to 100                             |
| `cursor`  | string  |       No |  `null` | Use the previous response's `next_cursor` |

The frontend explicitly requests `limit=5` for both the first page and every Load more click.

### Example

```http
GET /api/exoplanets/search?q=kepler&limit=5
```

```json
{
  "items": [
    {
      "name": "Kepler-10 b",
      "hostname": "Kepler-10",
      "ra": 285.679,
      "dec": 50.241
    }
  ],
  "next_cursor": "Kepler-10 b",
  "has_more": true
}
```

### How pagination works

The backend fetches `limit + 1` rows. The extra row is only used to decide whether another page
exists and is not returned.

If another page exists:

- `has_more` is `true`.
- `next_cursor` is the name of the last planet returned on the current page.
- The next request adds `pl_name > cursor` and continues in alphabetical order.

Pass the cursor back exactly as returned. Do not build one manually.

### Errors

| Status | Meaning                                                        |
| -----: | -------------------------------------------------------------- |
|  `422` | Missing `q`, `q` shorter than 2 characters, or invalid `limit` |
|  `502` | NASA returned a non-success HTTP status                        |
|  `500` | Unhandled connection, parsing, or backend runtime failure      |

## `GET /api/targets/resolve`

Resolves an exoplanet name through a case-insensitive exact match in NASA and returns its ICRS
right ascension and declination in decimal degrees.

### Query parameters

| Parameter | Type   | Required | Example       |
| --------- | ------ | -------: | ------------- |
| `name`    | string |      Yes | `Kepler-22 b` |

### Example

```http
GET /api/targets/resolve?name=Kepler-22%20b
```

```json
{
  "name": "Kepler-22 b",
  "ra": 285.6794,
  "dec": 47.8989
}
```

### Errors

| Status | Meaning                                                   |
| -----: | --------------------------------------------------------- |
|  `404` | NASA returned no exact match                              |
|  `422` | `name` was not supplied                                   |
|  `502` | NASA returned a non-success HTTP status                   |
|  `500` | Unhandled connection, parsing, or backend runtime failure |

## `POST /api/predict/`

Predicts whether an active satellite enters a rectangular telescope FoV during an observation,
then asks OpenAI for a plain-language explanation.

The trailing slash is part of the declared route. FastAPI will normally redirect
`/api/predict` to `/api/predict/`.

### Request body using a planet name

```json
{
  "observer": {
    "latitude": 14.5995,
    "longitude": 120.9842,
    "elevation": 20
  },
  "observation_time": "2026-09-01T14:00:00Z",
  "exposure_duration": 60,
  "target": {
    "object_name": "Kepler-22 b"
  },
  "fov": {
    "horizontal": 1.0,
    "vertical": 1.0
  }
}
```

### Request body using coordinates

```json
{
  "observer": {
    "latitude": 14.5995,
    "longitude": 120.9842,
    "elevation": 20
  },
  "observation_time": "2026-09-01T14:00:00Z",
  "exposure_duration": 60,
  "target": {
    "ra": 285.6794,
    "dec": 47.8989
  },
  "fov": {
    "horizontal": 1.0,
    "vertical": 1.0
  }
}
```

### Request fields

| Field                | Type              | Unit         |    Required | Current behavior                                      |
| -------------------- | ----------------- | ------------ | ----------: | ----------------------------------------------------- |
| `observer.latitude`  | number            | degrees      |         Yes | Enforced range is -90 to 90                           |
| `observer.longitude` | number            | degrees      |         Yes | Enforced range is -180 to 180                         |
| `observer.elevation` | number            | metres       |         Yes | Enforced range is -500 to 10,000                      |
| `observation_time`   | ISO 8601 datetime | -            |         Yes | Naive datetimes are treated as UTC by Skyfield code   |
| `exposure_duration`  | number            | seconds      |         Yes | Greater than 0, at most 3,600; sampled every second   |
| `target.ra`          | number or `null`  | ICRS degrees | Conditional | Range 0 to 360; supply with `target.dec`              |
| `target.dec`         | number or `null`  | ICRS degrees | Conditional | Range -90 to 90; supply with `target.ra`              |
| `target.object_name` | string or `null`  | -            | Conditional | Exact NASA planet name; trimmed and character-checked |
| `fov.horizontal`     | number            | degrees      |         Yes | Greater than 0, at most 360                           |
| `fov.vertical`       | number            | degrees      |         Yes | Greater than 0, at most 180                           |

Use either RA and Dec together or an object name. If complete RA/Dec and an object name are all
provided, the current implementation uses RA/Dec and does not resolve the name.

The backend models enforce the types and numeric ranges shown above. Invalid values return a
`422` response before the calculation begins.

Allowed object-name characters are letters, digits, whitespace, hyphens, periods, plus signs,
and apostrophes, with a maximum length of 100 characters.

### Success response

```json
{
  "obstructed": true,
  "satellites": [
    {
      "satellite_name": "STARLINK-1234",
      "crossing_time": "2026-09-01T14:00:14Z",
      "altitude": 32.4,
      "azimuth": 214.7,
      "brightness": null
    }
  ],
  "interpretation": "One satellite is predicted to cross the telescope's field of view during the observation."
}
```

### Response fields

| Field                         | Type             | Unit      | Meaning                                               |
| ----------------------------- | ---------------- | --------- | ----------------------------------------------------- |
| `obstructed`                  | boolean          | -         | Whether at least one sampled position entered the FoV |
| `satellites`                  | array            | -         | One result per obstructing satellite                  |
| `satellites[].satellite_name` | string           | -         | Name from the CelesTrak TLE record                    |
| `satellites[].crossing_time`  | datetime         | UTC       | First sampled time inside the FoV                     |
| `satellites[].altitude`       | number           | degrees   | Apparent elevation above the observer's horizon       |
| `satellites[].azimuth`        | number           | degrees   | Apparent compass bearing, with north at 0 degrees     |
| `satellites[].brightness`     | number or `null` | magnitude | Always `null` in the current implementation           |
| `interpretation`              | string or `null` | -         | OpenAI explanation, or `null` when AI is unavailable  |

### Errors

| Status | Meaning                                                                  |
| -----: | ------------------------------------------------------------------------ |
|  `400` | Invalid target combination, such as only RA or only Dec                  |
|  `404` | Friendly error when the supplied planet does not exist in NASA's archive |
|  `422` | JSON body does not match the Pydantic request model                      |
|  `502` | NASA returned a non-success HTTP status while resolving a target         |
|  `503` | NASA connection or active satellite catalog is temporarily unavailable   |
|  `500` | Unexpected coordinate or backend runtime failure                         |

Example unknown-planet response:

```json
{
  "detail": "We couldn't find an exoplanet named 'Definitely Not A Planet'. Please check the spelling and try again."
}
```

## `GET /`

When FastAPI is served directly, its root returns:

```json
{
  "message": "Satellite Obstruction Prediction API",
  "status": "running"
}
```

In the combined Vercel deployment, `/` is routed to the SvelteKit frontend, so this backend root
is mainly useful during local development or when the backend is deployed separately.

## Coordinate and timing notes

- Target RA/Dec is ICRS in decimal degrees, not hours.
- Satellite altitude and azimuth are topocentric values for the supplied observer.
- The complete target track is transformed from ICRS into Alt/Az once per request.
- The observation is sampled once per second from the start through
  `int(exposure_duration)`, inclusive.
- The candidate filter checks the observation start only and uses a 10-degree radius.
- The obstruction test uses a rectangular FoV, not a circular angular-separation threshold.

## External services

| Service                    | Current use                                          |
| -------------------------- | ---------------------------------------------------- |
| NASA Exoplanet Archive TAP | Planet search and exact-name coordinate resolution   |
| CelesTrak GP feed          | Active satellite TLE data                            |
| OpenAI Chat Completions    | Plain-language interpretation of obstruction results |

## Deployment note

`OPENAI_API_KEY` is optional for calculation. The backend creates the client lazily; a missing
key, timeout, rate limit, or API error produces `interpretation: null` instead of failing the
prediction. The frontend already has a non-AI fallback summary for that case.
