from astropy.coordinates import SkyCoord
import astropy.units as u

from app.models.prediction import ObservationTarget


def get_target_coordinate(target: ObservationTarget) -> SkyCoord:
    """
    Convert the user's target into an Astropy SkyCoord.

    Supports:
    - Right Ascension + Declination

    Future support:
    - Object name lookup (e.g. "M31", "Jupiter")
    """

    # User supplied RA/Dec
    if target.ra is not None and target.dec is not None:
        return SkyCoord(
            ra=target.ra * u.deg,
            dec=target.dec * u.deg,
            frame="icrs",
        )

    # User supplied object name
    if target.object_name is not None:
        raise NotImplementedError(
            "Object name lookup has not been implemented."
        )

    raise ValueError(
        "Target must specify either RA/Dec or an object name."
    )