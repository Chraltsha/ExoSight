from fastapi import APIRouter
from app.models.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.prediction_service import predict

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

@router.post("/", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    """
    Predict whether any satellites will obstruct
    the telescope's field of view.
    """

    result = predict(request)
    return result