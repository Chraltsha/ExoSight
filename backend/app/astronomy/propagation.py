from datetime import datetime, timezone

from astropy.coordinates import AltAz, EarthLocation, SkyCoord
import astropy.units as u

from skyfield.api import load, wgs84


# Skyfield time scale
ts = load.timescale()


def _to_skyfield_time(observation_time: datetime):
    """
    Convert a Python datetime into a Skyfield Time object.

    Naive datetimes are treated as UTC.
    """

    if observation_time.tzinfo is None:
        observation_time = observation_time.replace(
            tzinfo=timezone.utc
        )
    else:
        observation_time = observation_time.astimezone(
            timezone.utc
        )

    return ts.from_datetime(observation_time)


def propagate_satellite(
    satellite,
    observer,
    observation_time,
):
    """
    Compute the apparent position of one satellite
    as seen by the observer.

    Returns:
        dict containing:
        - satellite_name
        - time
        - altitude
        - azimuth
        - distance
        - coordinate
    """

    skyfield_time = _to_skyfield_time(
        observation_time
    )

    # Create Skyfield observer.
    observer_location = wgs84.latlon(
        latitude_degrees=observer.latitude,
        longitude_degrees=observer.longitude,
        elevation_m=observer.elevation,
    )

    # Compute the satellite's topocentric position
    # relative to the observer.
    difference = satellite - observer_location

    apparent = difference.at(skyfield_time)

    altitude, azimuth, distance = apparent.altaz()

    # Create an Astropy EarthLocation for coordinate
    # transformations later.
    astropy_location = EarthLocation(
        lat=observer.latitude * u.deg,
        lon=observer.longitude * u.deg,
        height=observer.elevation * u.m,
    )

    # Create the corresponding Astropy Alt/Az coordinate.
    altaz_frame = AltAz(
        obstime=observation_time,
        location=astropy_location,
    )

    satellite_coordinate = SkyCoord(
        alt=altitude.degrees * u.deg,
        az=azimuth.degrees * u.deg,
        distance=distance.km * u.km,
        frame=altaz_frame,
    )

    return {
        "satellite_name": satellite.name,
        "time": observation_time,
        "altitude": altitude.degrees,
        "azimuth": azimuth.degrees,
        "distance": distance.km,
        "coordinate": satellite_coordinate,
        "satellite": satellite,
    }


def propagate_satellites(
    satellites,
    observer,
    observation_time,
    exposure_duration,
):
    """
    Propagate all satellites throughout the observation.

    The exposure is sampled once per second.

    Returns:
        list of satellite positions at each sampled time.
    """

    positions = []

    # We sample the beginning of the exposure and then
    # every second after that.
    number_of_samples = int(exposure_duration) + 1

    for i in range(number_of_samples):

        elapsed_seconds = float(i)

        # Do not go beyond the requested exposure duration.
        if elapsed_seconds > exposure_duration:
            break

        from datetime import timedelta

        current_time = (
            observation_time
            + timedelta(seconds=elapsed_seconds)
        )

        for satellite in satellites:

            position = propagate_satellite(
                satellite=satellite,
                observer=observer,
                observation_time=current_time,
            )

            positions.append(position)

    return positions