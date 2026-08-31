from datetime import datetime

from astropy.coordinates import SkyCoord

from app.astronomy.filtering import filter_satellites
from app.astronomy.obstructions import find_satellite_crossings
from app.models.prediction import (
    ObserverLocation,
    TelescopeFieldOfView,
)
from app.services.celestrak_service import load_satellites


def get_satellite_obstructions(
    observer: ObserverLocation,
    target: SkyCoord,
    observation_time: datetime,
    exposure_duration: float,
    fov: TelescopeFieldOfView,
) -> list[dict[str, object]]:
    """
    Load and filter active satellites, then find FoV crossings without
    materializing every intermediate position.
    """

    satellites = load_satellites()

    candidates = filter_satellites(
        satellites=satellites,
        observer=observer,
        target=target,
        observation_time=observation_time,
    )

    return find_satellite_crossings(
        satellites=candidates,
        target=target,
        fov=fov,
        observer=observer,
        observation_time=observation_time,
        exposure_duration=exposure_duration,
    )
