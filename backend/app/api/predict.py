from fastapi import APIRouter, HTTPException

import httpx

from app.models.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.exoplanet_service import ExoplanetNotFoundError
from app.services.prediction_service import predict as predict_service

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)


@router.post(
    "/",
    response_model=PredictionResponse,
)
def predict(request: PredictionRequest):
    try:
        return predict_service(request)
    except ExoplanetNotFoundError as exc:
        raise HTTPException(
            status_code=404,
            detail=(
                f"We couldn't find an exoplanet named '{exc.name}'. "
                "Please check the spelling and try again."
            ),
        ) from exc
    except ValueError as exc:
        # Invalid target combinations, such as providing only RA or only Dec.
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except httpx.HTTPStatusError as exc:
        # NASA TAP or CelesTrak returned a bad response
        raise HTTPException(
            status_code=502,
            detail=f"Upstream error from NASA: {exc.response.status_code}",
        ) from exc
