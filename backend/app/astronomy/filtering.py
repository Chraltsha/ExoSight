from astropy.coordinates import AltAz, EarthLocation
import astropy.units as u

from app.astronomy.propagation import propagate_satellite


# How far from the target a satellite can be and still
# be considered a candidate.
#
# This should be considerably larger than the telescope
# FoV because the satellite can move during the exposure.
CANDIDATE_RADIUS_DEGREES = 10.0


def filter_satellites(
    satellites,
    observer,
    target,
    observation_time,
):
    """
    Filter satellites before performing the full
    exposure propagation.

    A satellite is retained if:

    1. It is above the horizon.
    2. It is within a generous angular distance
       of the observation target.

    This is only a preliminary filter. The actual
    FoV calculation is still performed later.
    """

    observer_location = EarthLocation(
        lat=observer.latitude * u.deg,
        lon=observer.longitude * u.deg,
        height=observer.elevation * u.m,
    )

    altaz_frame = AltAz(
        obstime=observation_time,
        location=observer_location,
    )

    # Transform target from ICRS into the observer's
    # local Alt/Az coordinate system.
    target_altaz = target.transform_to(
        altaz_frame
    )

    candidates = []

    for satellite in satellites:

        position = propagate_satellite(
            satellite=satellite,
            observer=observer,
            observation_time=observation_time,
        )

        satellite_coordinate = position["coordinate"]

        # ------------------------------------------------
        # 1. Horizon filter
        # ------------------------------------------------

        if satellite_coordinate.alt.deg <= 0:
            continue

        # ------------------------------------------------
        # 2. Angular distance from target
        # ------------------------------------------------

        separation = (
            satellite_coordinate.separation(
                target_altaz
            )
        )

        if separation.deg > CANDIDATE_RADIUS_DEGREES:
            continue

        candidates.append(satellite)

    return candidates