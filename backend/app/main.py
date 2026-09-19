import logging
import sys
import os

# Add backend dir and project root to path so both `app` and `ai` packages are importable
_backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # .../backend
_project_root = os.path.dirname(_backend_dir)                                  # .../schemesaathi-ai
for _p in [_backend_dir, _project_root]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import get_settings
from app.database.connection import init_db
from app.routes import health, profile, schemes, eligibility, documents, chat, applications

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(name)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(
    title="SchemeSaathi AI",
    description="AI-powered government scheme discovery for Indian citizens.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=settings.origins_list != ['*'],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "An unexpected error occurred. Please try again later.", "detail": str(exc)[:200]}
    )

@app.on_event("startup")
async def startup():
    init_db()
    logger.info(f"SchemeSaathi AI started. Env: {settings.app_env}. Mock AI: {settings.use_mock_ai}")

for r in [health.router, profile.router, schemes.router, eligibility.router, documents.router, chat.router, applications.router]:
    app.include_router(r)
