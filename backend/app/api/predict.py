from fastapi import APIRouter
from app.models.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.prediction_service import predict as predict_service

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("/", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    return predict_service(request)
