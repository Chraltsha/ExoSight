from fastapi import APIRouter, HTTPException, Query

from app.models.exoplanet import ExoplanetTarget
from app.services.exoplanet_service import resolve_exoplanet

import httpx

router = APIRouter(
    prefix="/targets",
    tags=["Targets"],
)


@router.get("/resolve", response_model=ExoplanetTarget)
def resolve(name: str = Query(..., description="Exact exoplanet name, e.g. 'Kepler-22 b'")):
    """
    Resolve an exoplanet name to RA/Dec via the NASA Exoplanet Archive TAP service.
    """
    try:
        return resolve_exoplanet(name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"NASA TAP error: {e.response.status_code}")
