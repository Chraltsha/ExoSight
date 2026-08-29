from app.astronomy.observer import get_observer
from app.astronomy.target import get_target_coordinate
from app.astronomy.observation import get_satellite_positions
from app.astronomy.obstructions import satellites_in_fov
from app.services.gpt_service import interpret_prediction


def predict(request):

    observer = get_observer(
        request.observer
    )

    target = get_target_coordinate(
        request.target
    )

    satellites = get_satellite_positions(
        observer,
        request.observation_time,
        request.exposure_duration,
    )

    obstructing = satellites_in_fov(
        satellites,
        target,
        request.fov,
    )

    interpretation = interpret_prediction(
        obstructing
    )

    return {
        "obstructed": len(obstructing) > 0,
        "satellites": obstructing,
        "interpretation": interpretation,
    }