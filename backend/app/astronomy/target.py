from astropy.coordinates import SkyCoord
import astropy.units as u

from app.models.prediction import ObservationTarget
from app.services.exoplanet_service import resolve_exoplanet


def get_target_coordinate(target: ObservationTarget) -> SkyCoord:
    """
    Convert the user's target into an Astropy SkyCoord.

    Accepts either explicit RA/Dec or an exoplanet name that is
    resolved via the NASA Exoplanet Archive TAP service.
    """

    # User supplied RA/Dec directly
    if target.ra is not None and target.dec is not None:
        return SkyCoord(
            ra=target.ra * u.deg,
            dec=target.dec * u.deg,
            frame="icrs",
        )

    # Resolve object name through NASA TAP
    if target.object_name is not None:
        result = resolve_exoplanet(target.object_name)
        return SkyCoord(
            ra=result.ra * u.deg,
            dec=result.dec * u.deg,
            frame="icrs",
        )

    raise ValueError(
        "Target must specify either RA/Dec or an object name."
    )