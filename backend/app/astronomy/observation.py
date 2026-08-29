from skyfield.api import load
from skyfield.api import EarthSatellite
from propagation import propagate_satellite
from backend.app.services.celestrak_service import load_satellites

def get_satellite_positions(
    observer,
    observation_time,
    exposure_duration,
):
    """
    Propagate every satellite over the observation period.
    """

    satellites = load_satellites()

    positions = []

    for satellite in satellites:

        position = propagate_satellite(
            satellite,
            observer,
            observation_time
        )

        positions.append(position)

    return positions