from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    ANTHROPIC_API_KEY: str
    SECRET_KEY: str = "default-secret-key-change-in-production"
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    SENTRY_DSN: Optional[str] = None
    
    class Config:
        env_file = ".env"


settings = Settings()
