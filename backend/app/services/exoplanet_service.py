import httpx

from app.models.exoplanet import ExoplanetTarget

NASA_TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"

# Columns we actually need — keeps the response small
_ADQL_QUERY = (
    "SELECT pl_name, ra, dec "
    "FROM ps "
    "WHERE pl_name = '{name}' "
    "AND default_flag = 1"
)


def resolve_exoplanet(name: str) -> ExoplanetTarget:
    """
    Look up an exoplanet by exact name in the NASA Exoplanet Archive
    and return its sky coordinates.

    Raises:
        ValueError: if the planet is not found.
        httpx.HTTPStatusError: if NASA TAP returns a non-200 response.
    """

    query = _ADQL_QUERY.format(name=name.replace("'", "''"))  # escape single quotes

    response = httpx.get(
        NASA_TAP_URL,
        params={"query": query, "format": "json"},
        timeout=10.0,
    )
    response.raise_for_status()

    rows = response.json()

    if not rows:
        raise ValueError(f"No exoplanet found with name '{name}'.")

    row = rows[0]

    return ExoplanetTarget(
        name=row["pl_name"],
        ra=row["ra"],
        dec=row["dec"],
    )
