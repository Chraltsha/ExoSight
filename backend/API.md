# API Reference

Base URL (dev): `http://127.0.0.1:8000`
All routes are prefixed with `/api`.
Interactive docs: `http://127.0.0.1:8000/docs`

---

## GET /api/exoplanets/search

Search for exoplanets by name substring. Uses cursor-based pagination.
Queries the `pscomppars` table (one composite row per confirmed planet — no duplicates).

**Query parameters**

| Parameter | Type   | Required | Default | Description                              |
|-----------|--------|----------|---------|------------------------------------------|
| `q`       | string | yes      | —       | Substring to match against planet names (min 2 chars) |
| `limit`   | int    | no       | 20      | Results per page (1–100)                 |
| `cursor`  | string | no       | null    | `next_cursor` value from a previous response |

**Example request**
```
GET /api/exoplanets/search?q=kepler&limit=20
```

**200 OK**
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
  "next_cursor": "Kepler-19 c",
  "has_more": true
}
```

**Pagination**

Pass `next_cursor` from the previous response as `cursor` to get the next page.
When `has_more` is `false`, you are on the last page.
`cursor` values are planet names — do not construct them manually.

**Error responses**

| Status | Reason                                     |
|--------|--------------------------------------------|
| 422    | `q` is missing or shorter than 2 characters |
| 502    | NASA TAP service returned an error         |

---

## GET /api/targets/resolve

Resolves an exoplanet name to sky coordinates by querying the
[NASA Exoplanet Archive TAP service](https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html).
Use this before submitting a prediction if you only have a planet name.

**Query parameters**

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `name`    | string | yes      | Exact planet name e.g. `Kepler-22 b` |

**Example request**
```
GET /api/targets/resolve?name=Kepler-22%20b
```

**200 OK**
```json
{
  "name": "Kepler-22 b",
  "ra": 285.6794,
  "dec": 47.8989
}
```

All coordinates are decimal degrees, ICRS frame.

**Error responses**

| Status | Reason                                  |
|--------|-----------------------------------------|
| 404    | No planet found with that exact name    |
| 502    | NASA TAP service returned an error      |

---

## POST /api/predict/

Predicts whether any active satellites will pass through a telescope's
field of view during an observation window. The target can be supplied
as explicit RA/Dec coordinates or as an exoplanet name — if a name is
given, the backend resolves it via NASA TAP automatically.

**Request body**

```json
{
  "observer": {
    "latitude":  14.5995,
    "longitude": 120.9842,
    "elevation": 20
  },
  "observation_time": "2025-08-29T22:00:00Z",
  "exposure_duration": 30,
  "target": {
    "ra": 285.6794,
    "dec": 47.8989,
    "object_name": null
  },
  "fov": {
    "horizontal": 1.0,
    "vertical": 1.0
  }
}
```

**Fields**

| Field                       | Type           | Unit         | Required | Notes                                      |
|-----------------------------|----------------|--------------|----------|--------------------------------------------|
| `observer.latitude`         | float          | degrees      | yes      | −90 to +90                                 |
| `observer.longitude`        | float          | degrees      | yes      | −180 to +180                               |
| `observer.elevation`        | float          | metres       | yes      |                                            |
| `observation_time`          | ISO 8601 string| UTC          | yes      | Start of the exposure window               |
| `exposure_duration`         | float          | seconds      | yes      | Length of the observation                  |
| `target.ra`                 | float          | degrees ICRS | either   | Required if `object_name` is not supplied  |
| `target.dec`                | float          | degrees ICRS | either   | Required if `object_name` is not supplied  |
| `target.object_name`        | string         | —            | either   | Exact NASA exoplanet name; backend resolves to RA/Dec |
| `fov.horizontal`            | float          | degrees      | yes      | Full angular width of the telescope frame  |
| `fov.vertical`              | float          | degrees      | yes      | Full angular height of the telescope frame |

Supply either `ra` + `dec` **or** `object_name` — not both. If `object_name`
is given, `ra` and `dec` are ignored.

**200 OK**
```json
{
  "obstructed": true,
  "satellites": [
    {
      "satellite_name": "STARLINK-1234",
      "crossing_time": "2025-08-29T22:00:14Z",
      "altitude": 32.4,
      "azimuth": 214.7,
      "brightness": null
    }
  ],
  "interpretation": "One satellite (STARLINK-1234) is predicted to cross your field of view approximately 14 seconds into the exposure..."
}
```

**Response fields**

| Field                          | Type    | Unit    | Notes                                      |
|--------------------------------|---------|---------|--------------------------------------------|
| `obstructed`                   | bool    | —       | `true` if any satellite intersects the FoV |
| `satellites`                   | array   | —       | Empty if no obstructions                   |
| `satellites[].satellite_name`  | string  | —       | NORAD catalogue name                       |
| `satellites[].crossing_time`   | string  | UTC ISO | Moment of closest approach within the FoV |
| `satellites[].altitude`        | float   | degrees | Elevation above horizon at crossing time   |
| `satellites[].azimuth`         | float   | degrees | Compass bearing at crossing time (N = 0)   |
| `satellites[].brightness`      | float?  | mag     | Visual magnitude — `null` until implemented|
| `interpretation`               | string  | —       | GPT plain-language summary of the result   |

**Error responses**

| Status | Reason                                                      |
|--------|-------------------------------------------------------------|
| 422    | Request body failed validation (missing or wrong-type field)|
| 404    | `object_name` was given but NASA returned no match          |
| 502    | NASA TAP unreachable while resolving `object_name`          |
| 500    | Internal error (e.g. OpenAI API failure)                    |

---

## GET /

Health check.

**200 OK**
```json
{
  "message": "Satellite Obstruction Prediction API",
  "status": "running"
}
```

---

## Coordinate system

All sky positions throughout the API are **decimal degrees, ICRS frame**.

- RA: 0 – 360 (not hours)
- Dec: −90 to +90
- Same format NASA TAP returns, same format Astropy/Skyfield consume — no conversion needed at any layer.

## Data sources

| Source | Used for |
|--------|----------|
| [CelesTrak active TLE feed](https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle) | Current satellite positions (fetched live, cached by Skyfield) |
| [NASA Exoplanet Archive TAP](https://exoplanetarchive.ipac.caltech.edu/TAP/sync) | Resolving exoplanet names to RA/Dec |
| OpenAI Chat Completions | Plain-language interpretation of prediction results |
