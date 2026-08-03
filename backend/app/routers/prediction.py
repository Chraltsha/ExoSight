from fastapi import APIRouter
from app.models.prediction import PredictionRequest
from app.services.prediction_service import predict

router = APIRouter()

@router.post("/predict")
def predict(request: PredictionRequest):
    return {
        "obstructed": predict(request)
    }