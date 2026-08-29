from fastapi import FastAPI
from app.api.predict import router as predict_router
from app.api.targets import router as targets_router

app = FastAPI(
    title="Satellite Obstruction Prediction API",
    description="API for predicting whether satellites obstruct telescope observations.",
    version="1.0.0"
)

# Register API routes
app.include_router(predict_router, prefix="/api")
app.include_router(targets_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Satellite Obstruction Prediction API",
        "status": "running"
    }