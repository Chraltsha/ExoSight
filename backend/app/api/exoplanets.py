from fastapi import APIRouter, HTTPException, Query

from app.models.exoplanet import ExoplanetSearchResponse
from app.services.exoplanet_service import search_exoplanets

import httpx

router = APIRouter(
    prefix="/exoplanets",
    tags=["Exoplanets"],
)


@router.get("/search", response_model=ExoplanetSearchResponse)
def search(
    q: str = Query(..., min_length=2, description="Substring to search for in planet names"),
    limit: int = Query(default=20, ge=1, le=100, description="Results per page"),
    cursor: str | None = Query(default=None, description="Pagination cursor from previous response"),
):
    """
    Search for exoplanets by name substring.

    Returns a paginated list of matches from the NASA Exoplanet Archive.
    Pass the returned `next_cursor` value to retrieve the next page.
    """
    try:
        return search_exoplanets(q=q, limit=limit, cursor=cursor)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"NASA TAP error: {e.response.status_code}")
