# # 1. Observer Location
#    - Latitude
#    - Longitude
#    - Elevation

# 2. Observation Date and Time
#    - Date
#    - Start Time (UTC or local time)

# 3. Exposure Duration
#    - Length of the observation/image (seconds)

# 4. Target Object
#    - Right Ascension (RA) and Declination (Dec)
#    - OR Object Name

# 5. Telescope Field of View (FoV)
#    - Horizontal FoV (degrees)
#    - Vertical FoV (degrees)


import re
from datetime import datetime
from pydantic import BaseModel, field_validator

# Allowed characters in a planet name:
# letters, digits, spaces, hyphens, dots, plus signs, single quotes
# Covers real names like "Kepler-22 b", "HD 209458 b", "55 Cnc b", "GJ 1214 b"
_PLANET_NAME_RE = re.compile(r"^[\w\s\-\.\+\']{1,100}$")


class ObserverLocation(BaseModel):
    latitude: float
    longitude: float
    elevation: float


class ObservationTarget(BaseModel):
    ra: float | None = None
    dec: float | None = None
    object_name: str | None = None

    @field_validator("object_name", mode="before")
    @classmethod
    def sanitise_object_name(cls, v: object) -> object:
        if v is None:
            return v
        if not isinstance(v, str):
            raise ValueError("object_name must be a string.")
        stripped = v.strip()
        if not stripped:
            return None
        if not _PLANET_NAME_RE.match(stripped):
            raise ValueError(
                "object_name contains invalid characters. "
                "Only letters, digits, spaces, hyphens, dots, "
                "plus signs and apostrophes are allowed."
            )
        return stripped


class TelescopeFieldOfView(BaseModel):
    horizontal: float
    vertical: float


class PredictionRequest(BaseModel):
    observer: ObserverLocation
    observation_time: datetime
    exposure_duration: float # in seconds
    target: ObservationTarget
    fov: TelescopeFieldOfView

class SatellitePrediction(BaseModel):
    satellite_name: str

    crossing_time: datetime

    altitude: float      # degrees
    azimuth: float       # degrees

    brightness: float | None = None


class PredictionResponse(BaseModel):
    obstructed: bool
    satellites: list[SatellitePrediction]
    interpretation: str | None = None