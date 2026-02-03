# Main application file
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.rewrite import router as rewrite_router

app = FastAPI(title="Email Rewriter", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rewrite_router, prefix="/api")

@app.get("/")
def check_health():
    return {"Status": "OK"}
