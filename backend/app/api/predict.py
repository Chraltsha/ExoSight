from fastapi import APIRouter
from app.models.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.prediction_service import predict as predict_service
from app.services.gpt_service import interpret_prediction

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("/", response_model=PredictionResponse)
def predict(request: PredictionRequest):

    result = predict_service(request)

    interpretation = interpret_prediction(result)

    result["interpretation"] = interpretation

    return result