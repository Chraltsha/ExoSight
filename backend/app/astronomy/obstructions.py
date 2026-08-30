from astropy.coordinates import AltAz, EarthLocation

import astropy.units as u

from app.astronomy.fov import inside_fov


def _get_target_at_time(
    target,
    observer,
    observation_time,
):
    """
    Transform the target's ICRS coordinates into
    the observer's apparent Alt/Az coordinates
    at a specific time.
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

    return target.transform_to(
        altaz_frame
    )


def satellites_in_fov(
    satellites,
    target,
    fov,
    observer,
):
    """
    Find satellites that enter the telescope FoV
    during the observation.

    Parameters:
        satellites:
            List of propagated satellite positions.

        target:
            Target SkyCoord in ICRS.

        fov:
            TelescopeFieldOfView.

        observer:
            ObserverLocation.

    Returns:
        List of dictionaries compatible with
        SatellitePrediction.
    """

    obstructing = []

    # Group propagated positions by satellite.
    grouped = {}

    for position in satellites:

        satellite_name = position["satellite_name"]

        if satellite_name not in grouped:
            grouped[satellite_name] = []

        grouped[satellite_name].append(position)

    # Check each satellite independently.
    for satellite_name, positions in grouped.items():

        # Make sure samples are chronological.
        positions.sort(
            key=lambda position: position["time"]
        )

        for position in positions:

            current_time = position["time"]

            # Transform the target into Alt/Az
            # at this exact point in time.
            target_at_time = _get_target_at_time(
                target=target,
                observer=observer,
                observation_time=current_time,
            )

            # Check whether the satellite is inside
            # the telescope's FoV.
            if inside_fov(
                satellite=position,
                target=target_at_time,
                fov=fov,
            ):

                obstructing.append(
                    {
                        "satellite_name": satellite_name,
                        "crossing_time": current_time,
                        "altitude": position["altitude"],
                        "azimuth": position["azimuth"],
                        "brightness": None,
                    }
                )

                # We only need the first crossing for
                # each satellite.
                break

    return obstructing


# def satellites_in_fov(
#     satellites,
#     target,
#     fov,
#     observer
# ):
#     """
#     TEST VERSION.

#     Forces the first satellite to be considered
#     an obstruction so that the API pipeline can
#     be tested end-to-end.
#     """

#     if not satellites:
#         return []

#     first_satellite = satellites[0]

#     return [
#         {
#             "satellite_name": first_satellite["satellite_name"],
#             "crossing_time": first_satellite["time"],
#             "altitude": first_satellite["altitude"],
#             "azimuth": first_satellite["azimuth"],
#             "brightness": None,
#         }
#     ]