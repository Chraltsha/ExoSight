from app.astronomy.fov import inside_fov


def satellites_in_fov(
    satellites,
    target,
    fov,
):
    """
    Filter satellites that intersect
    the telescope FoV.
    """

    obstructing = []

    for satellite in satellites:

        if inside_fov(
            satellite,
            target,
            fov,
        ):
            obstructing.append(satellite)

    return obstructing