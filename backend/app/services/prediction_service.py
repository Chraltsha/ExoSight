from app.astronomy.target import get_target_coordinate
from app.astronomy.observation import get_satellite_positions
from app.astronomy.obstructions import satellites_in_fov


def predict(request):
    """
    Perform the complete satellite obstruction prediction.
    """

    # Convert the requested target into an Astropy SkyCoord.
    target = get_target_coordinate(
        request.target,
    )

    # Load, filter, and propagate satellites.
    positions = get_satellite_positions(
        observer=request.observer,
        target=target,
        observation_time=request.observation_time,
        exposure_duration=request.exposure_duration,
    )

    # Determine which satellites actually enter
    # the telescope's FoV.
    obstructing = satellites_in_fov(
        satellites=positions,
        target=target,
        fov=request.fov,
        observer=request.observer,
    )

    return {
        "obstructed": len(obstructing) > 0,
        "satellites": obstructing,
    }