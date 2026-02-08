# Main application file
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.rewrite import router as rewrite_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Email Rewriter", version="1.0.0")

# Get allowed origins from environment variable, default to localhost for development
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rewrite_router, prefix="/api")

@app.get("/")
def check_health():
    return {"Status": "OK"}
