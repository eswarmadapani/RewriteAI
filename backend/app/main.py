# Main application file
from fastapi import FastAPI
from app.routes.rewrite import router as rewrite_router

app = FastAPI(title="Email Rewriter", version="1.0.0")

app.include_router(rewrite_router, prefix="/api")

@app.get("/")
def check_health():
    return {"Status": "OK"}
