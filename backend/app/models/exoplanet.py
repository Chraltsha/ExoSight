from pydantic import BaseModel


class ExoplanetTarget(BaseModel):
    name: str
    ra: float   # degrees, ICRS
    dec: float  # degrees, ICRS


class ExoplanetSearchResult(BaseModel):
    name: str
    hostname: str
    ra: float   # degrees, ICRS
    dec: float  # degrees, ICRS


class ExoplanetSearchResponse(BaseModel):
    items: list[ExoplanetSearchResult]
    next_cursor: str | None   # pl_name of the first item on the next page, or null
    has_more: bool
