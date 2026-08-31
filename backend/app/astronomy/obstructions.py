from datetime import datetime, timedelta, timezone
from typing import cast

import astropy.units as u
import numpy as np
from astropy.coordinates import AltAz, Angle, EarthLocation, SkyCoord
from astropy.time import Time
from skyfield.api import EarthSatellite, wgs84

from app.astronomy.fov import inside_fov
from app.astronomy.propagation import ts
from app.models.prediction import ObserverLocation, TelescopeFieldOfView


def find_satellite_crossings(
    satellites: list[EarthSatellite],
    target: SkyCoord,
    fov: TelescopeFieldOfView,
    observer: ObserverLocation,
    observation_time: datetime,
    exposure_duration: float,
) -> list[dict[str, object]]:
    """Propagate candidates and return their first sampled FoV crossing.

    The target track is transformed once for the entire observation. Each
    satellite is then propagated as a vector and discarded after its first
    crossing is recorded, keeping memory proportional to the exposure rather
    than satellites multiplied by exposure samples.
    """

    if not satellites:
        return []

    sample_count = int(exposure_duration) + 1
    sample_times = [
        observation_time + timedelta(seconds=offset)
        for offset in range(sample_count)
    ]
    utc_times = [
        sample_time.replace(tzinfo=timezone.utc)
        if sample_time.tzinfo is None
        else sample_time.astimezone(timezone.utc)
        for sample_time in sample_times
    ]

    observer_astropy = EarthLocation(
        lat=observer.latitude * u.deg,
        lon=observer.longitude * u.deg,
        height=observer.elevation * u.m,
    )
    target_track = target.transform_to(
        AltAz(
            obstime=Time(utc_times),
            location=observer_astropy,
        )
    )
    target_altitude_angles = cast(Angle, target_track.alt)
    target_azimuth_angles = cast(Angle, target_track.az)
    target_altitudes = np.atleast_1d(
        np.asarray(target_altitude_angles.degree, dtype=np.float64)
    )
    target_azimuths = np.atleast_1d(
        np.asarray(target_azimuth_angles.degree, dtype=np.float64)
    )

    skyfield_times = ts.from_datetimes(utc_times)
    observer_skyfield = wgs84.latlon(
        latitude_degrees=observer.latitude,
        longitude_degrees=observer.longitude,
        elevation_m=observer.elevation,
    )

    obstructing: list[dict[str, object]] = []

    for satellite in satellites:
        apparent = (satellite - observer_skyfield).at(skyfield_times)
        altitudes, azimuths, _ = apparent.altaz()
        satellite_altitudes = np.atleast_1d(cast(np.ndarray, altitudes.degrees))
        satellite_azimuths = np.atleast_1d(cast(np.ndarray, azimuths.degrees))

        horizontal_difference = np.abs(
            (satellite_azimuths - target_azimuths + 180.0) % 360.0 - 180.0
        )
        vertical_difference = np.abs(satellite_altitudes - target_altitudes)
        crossing_indices = np.flatnonzero(
            (horizontal_difference <= fov.horizontal / 2.0)
            & (vertical_difference <= fov.vertical / 2.0)
        )

        if crossing_indices.size == 0:
            continue

        crossing_index = int(crossing_indices[0])
        obstructing.append(
            {
                "satellite_name": satellite.name,
                "crossing_time": sample_times[crossing_index],
                "altitude": float(satellite_altitudes[crossing_index]),
                "azimuth": float(satellite_azimuths[crossing_index]),
                "brightness": None,
            }
        )

    return obstructing


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
