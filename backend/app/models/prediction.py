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


from datetime import datetime
from pydantic import BaseModel


class ObserverLocation(BaseModel):
    latitude: float
    longitude: float
    elevation: float


class ObservationTarget(BaseModel):
    ra: float | None = None
    dec: float | None = None
    object_name: str | None = None


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