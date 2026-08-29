from pydantic import BaseModel


class ExoplanetTarget(BaseModel):
    name: str
    ra: float   # degrees, ICRS
    dec: float  # degrees, ICRS
