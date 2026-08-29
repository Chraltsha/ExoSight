import astropy.units as u


def inside_fov(
    satellite,
    target,
    fov,
):
    """
    Returns True if the satellite lies inside
    the telescope's rectangular field of view.

    Parameters:
        satellite:
            Propagated satellite position dictionary.

        target:
            Target SkyCoord already transformed into
            the same Alt/Az frame as the satellite.

        fov:
            TelescopeFieldOfView.

    Returns:
        bool
    """

    satellite_coordinate = satellite["coordinate"]

    # Difference in azimuth.
    #
    # wrap_at(180 deg) is important because azimuth wraps
    # around at 360 degrees.
    azimuth_difference = (
        satellite_coordinate.az
        - target.az
    ).wrap_at(180 * u.deg)

    # Difference in altitude.
    altitude_difference = (
        satellite_coordinate.alt
        - target.alt
    )

    horizontal_difference = abs(
        azimuth_difference.deg
    )

    vertical_difference = abs(
        altitude_difference.deg
    )

    return (
        horizontal_difference <= fov.horizontal / 2
        and vertical_difference <= fov.vertical / 2
    )