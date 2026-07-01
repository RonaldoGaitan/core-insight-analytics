from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.api import query, integrations, auth, oauth
from app.core.config import settings
from app.core.rate_limit import limiter, rate_limit_exceeded_handler
from app.core.logging_config import logger
from app.core.sentry_config import init_sentry
from slowapi.errors import RateLimitExceeded
import traceback

# Initialize Sentry
init_sentry()

app = FastAPI(
    title="Core Insight Analytics API",
    description="AI-powered analytics platform for multi-tenant data integration",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query.router, prefix="/api", tags=["query"])
app.include_router(integrations.router, prefix="/api", tags=["integrations"])
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(oauth.router, prefix="/api", tags=["oauth"])


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for logging and error responses"""
    logger.error(f"Unhandled exception: {str(exc)}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    
    return HTTPException(
        status_code=500,
        detail="Internal server error"
    )


@app.get("/")
@limiter.limit("100/minute")
async def root():
    return {
        "message": "Core Insight Analytics API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }
