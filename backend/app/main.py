# Main application file
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.rewrite import router as rewrite_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Email Rewriter", version="1.0.0")

# Get allowed origins from environment variable, default to localhost for development
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
allowed_origins = allowed_origins_str.split(",")

# Allow all vercel.app subdomains for deployment flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app$",
    allow_origins=allowed_origins,  # Also allow explicit origins from env
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rewrite_router, prefix="/api")

@app.get("/")
def check_health():
    return {"Status": "OK"}
