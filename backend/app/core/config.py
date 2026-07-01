from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    ANTHROPIC_API_KEY: str
    
    class Config:
        env_file = ".env"


settings = Settings()
