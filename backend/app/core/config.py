from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    ANTHROPIC_API_KEY: str
    SECRET_KEY: str = "default-secret-key-change-in-production"
    ENCRYPTION_KEY: Optional[str] = None
    ALLOWED_ORIGINS: str = "http://localhost:3000,https://www.coreinsight.solutions,https://coreinsight.solutions"
    SENTRY_DSN: Optional[str] = None
    
    class Config:
        env_file = ".env"


settings = Settings()
