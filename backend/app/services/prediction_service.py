from app.astronomy.target import get_target_coordinate
from app.astronomy.observation import get_satellite_positions
from app.astronomy.obstructions import satellites_in_fov
from app.services.gpt_service import interpret_prediction


def predict(request):
    """
    Full pipeline:
      1. Resolve target coordinates
      2. Load + filter + propagate satellites
      3. Check FoV obstructions
      4. Send structured results to GPT for human-readable interpretation
    """

    # 1. Resolve target (RA/Dec or object name via NASA TAP)
    target = get_target_coordinate(request.target)

    # 2. Load TLEs, filter to candidates, propagate over exposure
    positions = get_satellite_positions(
        observer=request.observer,
        target=target,
        observation_time=request.observation_time,
        exposure_duration=request.exposure_duration,
    )

    # 3. Find satellites that actually enter the telescope FoV
    obstructing = satellites_in_fov(
        satellites=positions,
        target=target,
        fov=request.fov,
        observer=request.observer,
    )

    # 4. Ask GPT to explain the result in plain language
    interpretation = interpret_prediction(obstructing)

    return {
        "obstructed": len(obstructing) > 0,
        "satellites": obstructing,
        "interpretation": interpretation,
    }