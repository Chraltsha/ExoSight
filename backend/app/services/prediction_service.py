from app.astronomy.observer import get_observer
from app.astronomy.target import get_target_coordinate
from app.astronomy.observation import get_satellite_positions
from app.astronomy.obstructions import satellites_in_fov


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

    return satellites_in_fov(
        satellites,
        target,
        request.fov,
    )