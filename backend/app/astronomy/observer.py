from astropy.coordinates import EarthLocation
import astropy.units as u

from app.models.prediction import ObserverLocation


def get_observer(location: ObserverLocation) -> EarthLocation:
    """
    Convert the observer into an Astropy EarthLocation.
    """

    return EarthLocation(
        lat=location.latitude * u.deg,
        lon=location.longitude * u.deg,
        height=location.elevation * u.m,
    )