from astropy.coordinates import SkyCoord
import astropy.units as u

from app.models.prediction import ObservationTarget


def get_target_coordinate(target: ObservationTarget) -> SkyCoord:
    """
    Build the astronomical target coordinate.
    """

    if target.ra is not None and target.dec is not None:
        return SkyCoord(
            ra=target.ra * u.deg,
            dec=target.dec * u.deg,
            frame="icrs"
        )

    raise NotImplementedError(
        "Object name lookup not implemented."
    )