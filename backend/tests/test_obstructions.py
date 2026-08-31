import sys
import unittest
from datetime import datetime, timezone
from pathlib import Path
from typing import cast

import astropy.units as u
import numpy as np
from astropy.coordinates import AltAz, Angle, EarthLocation, SkyCoord
from astropy.time import Time
from astropy.utils import iers
from pydantic import ValidationError
from skyfield.api import EarthSatellite

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.astronomy.obstructions import find_satellite_crossings
from app.models.prediction import (
    ObserverLocation,
    PredictionRequest,
    TelescopeFieldOfView,
)


class _Angles:
    def __init__(self, degrees: np.ndarray) -> None:
        self.degrees = degrees


class _Apparent:
    def __init__(self, altitudes: np.ndarray, azimuths: np.ndarray) -> None:
        self.altitudes = altitudes
        self.azimuths = azimuths

    def altaz(self) -> tuple[_Angles, _Angles, None]:
        return _Angles(self.altitudes), _Angles(self.azimuths), None


class _Difference:
    def __init__(self, altitudes: np.ndarray, azimuths: np.ndarray) -> None:
        self.altitudes = altitudes
        self.azimuths = azimuths

    def at(self, _times: object) -> _Apparent:
        return _Apparent(self.altitudes, self.azimuths)


class _Satellite:
    name = "TEST SATELLITE"

    def __init__(self, altitudes: np.ndarray, azimuths: np.ndarray) -> None:
        self.altitudes = altitudes
        self.azimuths = azimuths

    def __sub__(self, _observer: object) -> _Difference:
        return _Difference(self.altitudes, self.azimuths)


class ObstructionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        iers.conf.auto_download = False
        iers.conf.auto_max_age = None

    def test_returns_first_crossing_without_materializing_positions(self) -> None:
        observer = ObserverLocation(latitude=14.5995, longitude=120.9842, elevation=20)
        observation_time = datetime(2026, 9, 1, 18, 0, tzinfo=timezone.utc)
        sample_times = [
            observation_time,
            observation_time.replace(second=1),
            observation_time.replace(second=2),
            observation_time.replace(second=3),
        ]
        target = SkyCoord(ra=285.6794 * u.deg, dec=47.8989 * u.deg, frame="icrs")
        location = EarthLocation(
            lat=observer.latitude * u.deg,
            lon=observer.longitude * u.deg,
            height=observer.elevation * u.m,
        )
        target_track = target.transform_to(
            AltAz(obstime=Time(sample_times), location=location)
        )
        target_altitudes = np.asarray(
            cast(Angle, target_track.alt).to_value(u.deg),
            dtype=np.float64,
        )
        target_azimuths = np.asarray(
            cast(Angle, target_track.az).to_value(u.deg),
            dtype=np.float64,
        )

        satellite = _Satellite(
            altitudes=target_altitudes + np.array([5.0, 5.0, 0.0, 0.0]),
            azimuths=target_azimuths,
        )

        results = find_satellite_crossings(
            satellites=[cast(EarthSatellite, satellite)],
            target=target,
            fov=TelescopeFieldOfView(horizontal=1, vertical=1),
            observer=observer,
            observation_time=observation_time,
            exposure_duration=3,
        )

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["satellite_name"], "TEST SATELLITE")
        self.assertEqual(results[0]["crossing_time"], sample_times[2])

    def test_rejects_exposures_longer_than_one_hour(self) -> None:
        with self.assertRaises(ValidationError):
            PredictionRequest.model_validate(
                {
                    "observer": {"latitude": 0, "longitude": 0, "elevation": 0},
                    "observation_time": "2026-09-01T18:00:00Z",
                    "exposure_duration": 3_601,
                    "target": {"object_name": "Kepler-1146 b"},
                    "fov": {"horizontal": 5, "vertical": 5},
                }
            )


if __name__ == "__main__":
    unittest.main()
