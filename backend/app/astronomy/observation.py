from app.astronomy.filtering import filter_satellites
from app.astronomy.propagation import propagate_satellites
from app.services.celestrak_service import load_satellites


def get_satellite_positions(
    observer,
    target,
    observation_time,
    exposure_duration,
):
    """
    Load active satellites, filter out satellites that
    cannot possibly be relevant, and propagate the
    remaining candidates throughout the exposure.
    """

    satellites = load_satellites()

    # ------------------------------------------------
    # TESTING LIMIT
    # ------------------------------------------------

    # Only use the first 100 satellites for now.
    # satellites = satellites[:100]

    # ------------------------------------------------
    # PRELIMINARY FILTER
    # ------------------------------------------------

    candidates = filter_satellites(
        satellites=satellites,
        observer=observer,
        target=target,
        observation_time=observation_time,
    )

    # ------------------------------------------------
    # FULL EXPOSURE PROPAGATION
    # ------------------------------------------------

    positions = propagate_satellites(
        satellites=candidates,
        observer=observer,
        observation_time=observation_time,
        exposure_duration=exposure_duration,
    )

    return positions