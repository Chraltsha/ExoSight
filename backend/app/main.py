from fastapi import FastAPI
from app.api.predict import router as predict_router

app = FastAPI(
    title="Satellite Obstruction Prediction API",
    description="API for predicting whether satellites obstruct telescope observations.",
    version="1.0.0"
)

# Register API routes
app.include_router(predict_router)


@app.get("/")
def root():
    return {
        "message": "Satellite Obstruction Prediction API",
        "status": "running"
    }