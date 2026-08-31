import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient

from app.main import app
from app.models.exoplanet import ExoplanetTarget
from app.models.prediction import PredictionRequest
from app.services.celestrak_service import SatelliteDataError
from app.services.prediction_service import predict


VALID_PAYLOAD = {
    "observer": {
        "latitude": 14.5995,
        "longitude": 120.9842,
        "elevation": 20,
    },
    "observation_time": "2026-09-01T18:00:00Z",
    "exposure_duration": 3_600,
    "target": {"object_name": "kepler 1146 b"},
    "fov": {"horizontal": 5.0, "vertical": 5.0},
}


class PredictionApiTests(unittest.TestCase):
    def test_hour_long_lowercase_planet_request_reaches_pipeline(self) -> None:
        request = PredictionRequest.model_validate(VALID_PAYLOAD)

        with (
            patch(
                "app.astronomy.target.resolve_exoplanet",
                return_value=ExoplanetTarget(name="Kepler-1146 b", ra=1, dec=1),
            ),
            patch("app.astronomy.observation.load_satellites", return_value=[]),
            patch("app.services.prediction_service.interpret_prediction", return_value=None),
        ):
            result = predict(request)

        self.assertEqual(result["obstructed"], False)
        self.assertEqual(result["satellites"], [])
        self.assertIsNone(result["interpretation"])

    def test_invalid_datetime_returns_422(self) -> None:
        client = TestClient(app)
        payload = {**VALID_PAYLOAD, "observation_time": "<tonight's UTC date>T18:00:00Z"}

        response = client.post("/api/predict/", json=payload)

        self.assertEqual(response.status_code, 422)

    def test_satellite_catalog_failure_returns_friendly_503(self) -> None:
        client = TestClient(app)

        with patch(
            "app.api.predict.predict_service",
            side_effect=SatelliteDataError("catalog unavailable"),
        ):
            response = client.post("/api/predict/", json=VALID_PAYLOAD)

        self.assertEqual(response.status_code, 503)
        self.assertEqual(
            response.json()["detail"],
            "Satellite data is temporarily unavailable. Please try again.",
        )


if __name__ == "__main__":
    unittest.main()
