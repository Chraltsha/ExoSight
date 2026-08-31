from app.astronomy.target import get_target_coordinate
from app.astronomy.observation import get_satellite_obstructions
from app.models.prediction import PredictionRequest
from app.services.gpt_service import interpret_prediction


def predict(request: PredictionRequest) -> dict[str, object]:
    """
    Full pipeline:
      1. Resolve target coordinates
      2. Load + filter + propagate satellites
      3. Check FoV obstructions
      4. Send structured results to GPT for human-readable interpretation
    """

    # 1. Resolve target (RA/Dec or object name via NASA TAP)
    target = get_target_coordinate(request.target)

    # 2. Load TLEs, filter candidates, and find first FoV crossings.
    obstructing = get_satellite_obstructions(
        observer=request.observer,
        target=target,
        observation_time=request.observation_time,
        exposure_duration=request.exposure_duration,
        fov=request.fov,
    )

    # 3. Ask GPT to explain the result in plain language.
    interpretation = interpret_prediction(obstructing)

    return {
        "obstructed": len(obstructing) > 0,
        "satellites": obstructing,
        "interpretation": interpretation,
    }
