import httpx

from app.models.exoplanet import ExoplanetTarget, ExoplanetSearchResult, ExoplanetSearchResponse

NASA_TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"


class ExoplanetNotFoundError(ValueError):
    """Raised when an exoplanet cannot be found in the NASA archive."""

    def __init__(self, name: str) -> None:
        self.name = name
        super().__init__(f"No exoplanet found with name '{name}'.")

# Exact-match lookup against the per-publication table (one default row per planet)
_RESOLVE_QUERY = (
    "SELECT pl_name, ra, dec "
    "FROM ps "
    "WHERE pl_name = '{name}' "
    "AND default_flag = 1"
)

# Search uses pscomppars (one composite row per confirmed planet — no duplicates)
# TOP is fetched as limit+1 so we can detect whether a next page exists.
# Cursor pagination: WHERE pl_name > '{cursor}' lets us skip to the next page
# without OFFSET, which NASA TAP does not reliably support.
_SEARCH_QUERY = (
    "SELECT TOP {fetch} pl_name, hostname, ra, dec "
    "FROM pscomppars "
    "WHERE lower(pl_name) LIKE '%{q}%' "
    "{cursor_clause}"
    "ORDER BY pl_name"
)


def resolve_exoplanet(name: str) -> ExoplanetTarget:
    """
    Look up an exoplanet by exact name in the NASA Exoplanet Archive
    and return its sky coordinates.

    Raises:
        ExoplanetNotFoundError: if the planet is not found.
        httpx.HTTPStatusError: if NASA TAP returns a non-200 response.
    """

    query = _RESOLVE_QUERY.format(name=name.replace("'", "''"))

    response = httpx.get(
        NASA_TAP_URL,
        params={"query": query, "format": "json"},
        timeout=10.0,
    )
    response.raise_for_status()

    rows = response.json()

    if not rows:
        raise ExoplanetNotFoundError(name)

    row = rows[0]

    return ExoplanetTarget(
        name=row["pl_name"],
        ra=row["ra"],
        dec=row["dec"],
    )


def search_exoplanets(
    q: str,
    limit: int = 5,
    cursor: str | None = None,
) -> ExoplanetSearchResponse:
    """
    Search for exoplanets whose name contains `q` (case-insensitive).

    Uses cursor-based pagination: pass the returned `next_cursor` value
    to retrieve the next page. NASA TAP does not support OFFSET so we
    use a WHERE pl_name > cursor clause instead.

    Args:
        q:      Substring to search for (minimum 2 characters enforced by the router).
        limit:  Maximum results to return per page (default 5, max 10).
        cursor: Opaque cursor from a previous response; None for the first page.

    Returns:
        ExoplanetSearchResponse with items, next_cursor, and has_more.
    """

    safe_q = q.replace("'", "''").lower()
    fetch = limit + 1  # fetch one extra to detect whether more pages exist

    cursor_clause = (
        f"AND pl_name > '{cursor.replace(chr(39), chr(39)*2)}' "
        if cursor
        else ""
    )

    adql = _SEARCH_QUERY.format(
        fetch=fetch,
        q=safe_q,
        cursor_clause=cursor_clause,
    )

    response = httpx.get(
        NASA_TAP_URL,
        params={"query": adql, "format": "json"},
        timeout=10.0,
    )
    response.raise_for_status()

    rows = response.json()

    has_more = len(rows) > limit
    page_rows = rows[:limit]  # drop the extra sentinel row if present

    items = [
        ExoplanetSearchResult(
            name=row["pl_name"],
            hostname=row["hostname"],
            ra=row["ra"],
            dec=row["dec"],
        )
        for row in page_rows
    ]

    next_cursor = page_rows[-1]["pl_name"] if (has_more and page_rows) else None

    return ExoplanetSearchResponse(
        items=items,
        next_cursor=next_cursor,
        has_more=has_more,
    )
