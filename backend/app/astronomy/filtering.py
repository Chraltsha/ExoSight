import math

import numpy as np
from astropy.coordinates import AltAz, EarthLocation, SkyCoord
import astropy.units as u
from skyfield.api import wgs84

from app.astronomy.propagation import _to_skyfield_time

# How far from the target a satellite can be and still
# be considered a candidate.
#
# This should be considerably larger than the telescope
# FoV because the satellite can move during the exposure.
CANDIDATE_RADIUS_DEGREES = 10.0


def filter_satellites(
    satellites,
    observer,
    target,
    observation_time,
):
    """
    Filter satellites before performing the full
    exposure propagation.

    A satellite is retained if:

    1. It is above the horizon.
    2. It is within a generous angular distance
       of the observation target.

    The Skyfield loop is unavoidable for EarthSatellite
    objects, but all filtering math is done in numpy
    after the loop — no Astropy objects are created
    inside the loop.
    """

    if not satellites:
        return []

    t = _to_skyfield_time(observation_time)

    observer_sf = wgs84.latlon(
        observer.latitude,
        observer.longitude,
        observer.elevation,
    )

    # --------------------------------------------------
    # 1. Propagate all satellites — collect raw degrees
    # --------------------------------------------------
    # Build plain numpy arrays of alt/az for every satellite.
    # No Astropy SkyCoord construction happens here — that
    # is the expensive part we are avoiding inside the loop.

    n = len(satellites)
    alts_deg = np.empty(n, dtype=np.float64)
    azs_deg  = np.empty(n, dtype=np.float64)

    for i, sat in enumerate(satellites):
        apparent = (sat - observer_sf).at(t)
        alt, az, _ = apparent.altaz()
        alts_deg[i] = float(alt.degrees)
        azs_deg[i]  = float(az.degrees)

    # --------------------------------------------------
    # 2. Horizon filter — pure numpy boolean mask
    # --------------------------------------------------

    above_mask: np.ndarray = alts_deg > 0.0
    above_indices = np.where(above_mask)[0]

    if above_indices.size == 0:
        return []

    # --------------------------------------------------
    # 3. Angular separation filter
    # --------------------------------------------------
    # Transform the ICRS target to AltAz once, then use
    # the haversine formula directly on the numpy arrays
    # — avoids building a SkyCoord array for ~5,000 sats.

    observer_astropy = EarthLocation(
        lat=observer.latitude * u.deg,
        lon=observer.longitude * u.deg,
        height=observer.elevation * u.m,
    )
    altaz_frame = AltAz(obstime=observation_time, location=observer_astropy)
    target_altaz = target.transform_to(altaz_frame)

    t_alt = math.radians(float(target_altaz.alt.deg))
    t_az  = math.radians(float(target_altaz.az.deg))

    # Haversine angular separation (radians) for all above-horizon satellites
    s_alts = np.radians(alts_deg[above_mask])
    s_azs  = np.radians(azs_deg[above_mask])

    d_az  = s_azs - t_az
    d_alt = s_alts - t_alt

    a = np.sin(d_alt / 2) ** 2 + np.cos(t_alt) * np.cos(s_alts) * np.sin(d_az / 2) ** 2
    sep_rad = 2 * np.arcsin(np.sqrt(np.clip(a, 0.0, 1.0)))
    sep_deg = np.degrees(sep_rad)

    within_mask: np.ndarray = sep_deg <= CANDIDATE_RADIUS_DEGREES
    candidate_indices = above_indices[within_mask]

    return [satellites[i] for i in candidate_indices]
